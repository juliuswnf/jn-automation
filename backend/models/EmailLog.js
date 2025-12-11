import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const emailLogSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,  // âœ… ADDED: Multi-tenant support
      index: true
    },

    recipientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255  // âœ… ADDED: Validation
    },

    status: {
      type: String,
      enum: ['sent', 'failed', 'pending', 'bounced'],  // âœ… ADDED: bounced status
      default: 'pending',
      index: true
    },

    error: {
      type: String,
      default: null,
      maxlength: 1000,  // âœ… ADDED: Limit error msg
      sparse: true  // âœ… ADDED: Sparse index
    },

    sentAt: {
      type: Date,
      default: Date.now,
      index: true
    },

    emailType: {
      type: String,
      enum: ['booking-confirmation', 'booking-reminder', 'cancellation', 'review-request', 'password-reset', 'general'],  // âœ… IMPROVED: Specific types
      default: 'general',
      index: true  // âœ… ADDED: Index for filtering
    },

    attempts: {
      type: Number,
      default: 1,
      min: 1,  // âœ… ADDED: Validation
      max: 10  // âœ… ADDED: Max retries
    },

    lastAttemptAt: {
      type: Date,
      default: Date.now,
      sparse: true  // âœ… ADDED: Sparse index
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,  // âœ… ADDED: Index
      sparse: true  // âœ… ADDED: Sparse index
    },

    recipientName: {
      type: String,
      default: null,
      sparse: true  // âœ… ADDED
    },

    emailContent: {
      type: String,
      default: null,
      sparse: true  // âœ… ADDED: Store template used
    },

    templateUsed: {
      type: String,
      default: null,
      sparse: true  // âœ… ADDED: Track template
    },

    variables: {
      type: Map,
      of: String,
      default: {},
      sparse: true  // âœ… ADDED: Store template variables
    },

    responseCode: {
      type: Number,
      default: null,
      sparse: true  // âœ… ADDED: SMTP response code
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


// ==================== INDEXES (OPTIMIZED) ====================

// âœ… Primary queries - per company
emailLogSchema.index({ companyId: 1, recipientEmail: 1, sentAt: -1 });
emailLogSchema.index({ companyId: 1, status: 1, sentAt: -1 });
emailLogSchema.index({ companyId: 1, createdAt: -1 });

// âœ… Email type queries
emailLogSchema.index({ companyId: 1, emailType: 1, status: 1 });

// âœ… User email queries
emailLogSchema.index({ companyId: 1, userId: 1, sentAt: -1 }, { sparse: true });

// âœ… Failed email queries
emailLogSchema.index({ companyId: 1, status: 1, attempts: -1 });

// âœ… TTL Index - auto-delete after 90 days
emailLogSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 7776000  // 90 days in seconds
  }
);


// ==================== VIRTUALS ====================

emailLogSchema.virtual('isSuccess').get(function() {
  return this.status === 'sent';
});

emailLogSchema.virtual('isFailed').get(function() {
  return this.status === 'failed';
});

emailLogSchema.virtual('isPending').get(function() {
  return this.status === 'pending';
});

emailLogSchema.virtual('canRetry').get(function() {
  return this.status === 'failed' && this.attempts < 10;
});

emailLogSchema.virtual('successRate').get(function() {
  if (this.attempts === 0) {return 0;}
  return ((this.attempts - 1) / this.attempts * 100).toFixed(1);
});

emailLogSchema.virtual('daysSinceCreated').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});


// ==================== METHODS ====================

emailLogSchema.methods.markAsRetry = async function() {
  try {
    if (this.attempts >= 10) {
      throw new Error('Maximum retry attempts exceeded');
    }

    this.attempts += 1;
    this.lastAttemptAt = new Date();
    this.status = 'pending';
    logger.log(`ðŸ”„ Email retry scheduled: ${this.recipientEmail} (Attempt ${this.attempts})`);
    return await this.save();
  } catch (err) {
    logger.error('âŒ Mark as retry error:', err.message);
    throw err;
  }
};

emailLogSchema.methods.markAsSent = async function(responseCode = 250) {
  try {
    this.status = 'sent';
    this.sentAt = new Date();
    this.responseCode = responseCode;
    logger.log(`âœ… Email sent: ${this.recipientEmail}`);
    return await this.save();
  } catch (err) {
    logger.error('âŒ Mark as sent error:', err.message);
    throw err;
  }
};

emailLogSchema.methods.markAsFailed = async function(errorMessage, errorCode = 'SEND_ERROR') {
  try {
    this.status = 'failed';
    this.error = errorMessage;
    this.responseCode = errorCode;
    logger.error(`âŒ Email failed: ${this.recipientEmail} - ${errorMessage}`);
    return await this.save();
  } catch (err) {
    logger.error('âŒ Mark as failed error:', err.message);
    throw err;
  }
};

emailLogSchema.methods.markAsBounced = async function(bounceType = 'permanent') {
  try {
    this.status = 'bounced';
    this.error = `Email bounced (${bounceType})`;
    logger.warn(`âš ï¸ Email bounced: ${this.recipientEmail} - ${bounceType}`);
    return await this.save();
  } catch (err) {
    logger.error('âŒ Mark as bounced error:', err.message);
    throw err;
  }
};

emailLogSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  // Don't expose sensitive data
  if (obj.emailContent) {
    obj.emailContent = 'redacted';
  }
  return obj;
};


// ==================== STATICS ====================

emailLogSchema.statics.getFailedEmails = function(companyId, limit = 50) {
  try {
    return this.find({
      companyId,
      status: 'failed',
      canRetry: true  // âœ… Only retry-able emails
    })
      .sort({ lastAttemptAt: 1 })
      .limit(limit);
  } catch (err) {
    logger.error('âŒ Get failed emails error:', err.message);
    throw err;
  }
};

emailLogSchema.statics.getSentCount = async function(companyId, startDate, endDate) {
  try {
    return this.countDocuments({
      companyId,
      status: 'sent',
      sentAt: { $gte: startDate, $lte: endDate }
    });
  } catch (err) {
    logger.error('âŒ Get sent count error:', err.message);
    throw err;
  }
};

emailLogSchema.statics.getFailedCount = async function(companyId, startDate, endDate) {
  try {
    return this.countDocuments({
      companyId,
      status: 'failed',
      sentAt: { $gte: startDate, $lte: endDate }
    });
  } catch (err) {
    logger.error('âŒ Get failed count error:', err.message);
    throw err;
  }
};

emailLogSchema.statics.getStatistics = async function(companyId, startDate, endDate) {
  try {
    return this.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgAttempts: { $avg: '$attempts' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
  } catch (err) {
    logger.error('âŒ Get statistics error:', err.message);
    throw err;
  }
};

// âœ… NEW: Get email stats by type
emailLogSchema.statics.getStatsByType = async function(companyId, startDate, endDate) {
  try {
    return this.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$emailType',
          totalSent: { $sum: 1 },
          success: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
          bounced: { $sum: { $cond: [{ $eq: ['$status', 'bounced'] }, 1, 0] } }
        }
      }
    ]);
  } catch (err) {
    logger.error('âŒ Get stats by type error:', err.message);
    throw err;
  }
};

// âœ… NEW: Get recipient email history
emailLogSchema.statics.getRecipientHistory = function(companyId, recipientEmail, limit = 20) {
  try {
    return this.find({
      companyId,
      recipientEmail: recipientEmail.toLowerCase()
    })
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (err) {
    logger.error('âŒ Get recipient history error:', err.message);
    throw err;
  }
};

// âœ… NEW: Get pending emails for retry
emailLogSchema.statics.getPendingForRetry = function(companyId, maxAttempts = 10) {
  try {
    return this.find({
      companyId,
      status: 'failed',
      attempts: { $lt: maxAttempts }
    })
      .sort({ lastAttemptAt: 1 })
      .limit(100);  // Batch processing
  } catch (err) {
    logger.error('âŒ Get pending for retry error:', err.message);
    throw err;
  }
};

// âœ… NEW: Get bounced emails
emailLogSchema.statics.getBouncedEmails = function(companyId, days = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.find({
      companyId,
      status: 'bounced',
      createdAt: { $gte: startDate }
    }).sort({ createdAt: -1 });
  } catch (err) {
    logger.error('âŒ Get bounced emails error:', err.message);
    throw err;
  }
};

// âœ… NEW: Get email delivery rate
emailLogSchema.statics.getDeliveryRate = async function(companyId, days = 7) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await this.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
          bounced: { $sum: { $cond: [{ $eq: ['$status', 'bounced'] }, 1, 0] } }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          sent: 1,
          failed: 1,
          bounced: 1,
          deliveryRate: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              { $multiply: [{ $divide: ['$sent', '$total'] }, 100] }
            ]
          }
        }
      }
    ]);

    return stats[0] || { total: 0, sent: 0, failed: 0, bounced: 0, deliveryRate: 0 };
  } catch (err) {
    logger.error('âŒ Get delivery rate error:', err.message);
    throw err;
  }
};


// ==================== PRE-SAVE HOOKS ====================

emailLogSchema.pre('save', async function(next) {
  try {
    this.updatedAt = new Date();

    // Validate email format
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (!emailRegex.test(this.recipientEmail)) {
      throw new Error(`Invalid email format: ${this.recipientEmail}`);
    }

    next();
  } catch (err) {
    logger.error('âŒ Pre-save hook error:', err.message);
    next(err);
  }
});


// ==================== EXPORT ====================

export default mongoose.model('EmailLog', emailLogSchema);
