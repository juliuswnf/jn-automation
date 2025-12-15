import mongoose from 'mongoose';
import crypto from 'crypto';

const MarketingRecipientSchema = new mongoose.Schema(
  {
    // Campaign reference
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MarketingCampaign',
      required: true,
      index: true
    },

    // Customer reference
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // Contact info
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },

    // SMS tracking
    smsLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SMSLog'
    },

    // Status tracking
    status: {
      type: String,
      required: true,
      enum: ['pending', 'sent', 'delivered', 'failed', 'clicked', 'booked'],
      default: 'pending',
      index: true
    },

    // Discount tracking
    discountCode: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true
    },

    // Click tracking
    trackingLink: {
      type: String,
      unique: true,
      required: true,
      index: true
    },

    // Engagement timestamps
    sentAt: {
      type: Date
    },

    deliveredAt: {
      type: Date
    },

    clickedAt: {
      type: Date
    },

    bookedAt: {
      type: Date
    },

    // Booking conversion
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },

    revenue: {
      type: Number,
      default: 0,
      min: 0
    },

    // Error tracking
    errorMessage: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes
MarketingRecipientSchema.index({ campaignId: 1, customerId: 1 }, { unique: true });
MarketingRecipientSchema.index({ trackingLink: 1 }, { unique: true });
MarketingRecipientSchema.index({ discountCode: 1 }, { sparse: true });
MarketingRecipientSchema.index({ campaignId: 1, status: 1 });

// Static method: Generate unique tracking link
MarketingRecipientSchema.statics.generateTrackingLink = async function() {
  let trackingId;
  let exists = true;

  // Generate unique 8-character tracking ID
  while (exists) {
    trackingId = crypto.randomBytes(4).toString('hex'); // 8 chars
    exists = await this.findOne({ trackingLink: trackingId });
  }

  return trackingId;
};

// Static method: Generate unique discount code
MarketingRecipientSchema.statics.generateDiscountCode = async function(prefix = 'MKT') {
  let code;
  let exists = true;

  // Generate unique discount code (e.g., MKT-A1B2C3)
  while (exists) {
    const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
    code = `${prefix}-${randomPart}`;
    exists = await this.findOne({ discountCode: code });
  }

  return code;
};

// Instance method: Mark as sent
MarketingRecipientSchema.methods.markAsSent = function(smsLogId) {
  this.status = 'sent';
  this.sentAt = new Date();
  if (smsLogId) {
    this.smsLogId = smsLogId;
  }
  return this.save();
};

// Instance method: Mark as delivered
MarketingRecipientSchema.methods.markAsDelivered = function() {
  this.status = 'delivered';
  this.deliveredAt = new Date();
  return this.save();
};

// Instance method: Mark as clicked
MarketingRecipientSchema.methods.markAsClicked = function() {
  if (this.status === 'pending' || this.status === 'sent') {
    this.status = 'delivered'; // Auto-promote if not delivered yet
  }
  if (!this.clickedAt) {
    this.clickedAt = new Date();
    this.status = 'clicked';
  }
  return this.save();
};

// Instance method: Mark as booked
MarketingRecipientSchema.methods.markAsBooked = async function(bookingId, revenue) {
  this.status = 'booked';
  this.bookedAt = new Date();
  this.bookingId = bookingId;
  this.revenue = revenue || 0;

  // Update campaign stats
  await mongoose.model('MarketingCampaign').findByIdAndUpdate(
    this.campaignId,
    {
      $inc: {
        'stats.totalBooked': 1,
        'stats.totalRevenue': this.revenue
      }
    }
  );

  return this.save();
};

// Instance method: Mark as failed
MarketingRecipientSchema.methods.markAsFailed = function(errorMessage) {
  this.status = 'failed';
  this.errorMessage = errorMessage;
  return this.save();
};

// Virtual: Full tracking URL
MarketingRecipientSchema.virtual('fullTrackingUrl').get(function() {
  const baseUrl = process.env.FRONTEND_URL || 'https://jn-business-system.vercel.app';
  return `${baseUrl}/track/${this.trackingLink}`;
});

// Virtual: Click-through rate (CTR)
MarketingRecipientSchema.virtual('hasClicked').get(function() {
  return !!this.clickedAt;
});

// Virtual: Conversion achieved
MarketingRecipientSchema.virtual('hasConverted').get(function() {
  return this.status === 'booked';
});

// Static method: Get campaign stats
MarketingRecipientSchema.statics.getCampaignStats = async function(campaignId) {
  const recipients = await this.find({ campaignId });

  const stats = {
    total: recipients.length,
    pending: 0,
    sent: 0,
    delivered: 0,
    failed: 0,
    clicked: 0,
    booked: 0,
    totalRevenue: 0
  };

  recipients.forEach(r => {
    stats[r.status] = (stats[r.status] || 0) + 1;
    if (r.clickedAt) stats.clicked++;
    if (r.revenue) stats.totalRevenue += r.revenue;
  });

  return stats;
};

// Static method: Find by tracking link
MarketingRecipientSchema.statics.findByTrackingLink = function(trackingLink) {
  return this.findOne({ trackingLink })
    .populate('campaignId', 'name salonId')
    .populate('customerId', 'name email phoneNumber');
};

// Static method: Find by discount code
MarketingRecipientSchema.statics.findByDiscountCode = function(discountCode) {
  return this.findOne({ discountCode: discountCode.toUpperCase() })
    .populate('campaignId', 'name salonId message')
    .populate('customerId', 'name email');
};

// Ensure virtuals are included in JSON
MarketingRecipientSchema.set('toJSON', { virtuals: true });
MarketingRecipientSchema.set('toObject', { virtuals: true });

export default mongoose.model('MarketingRecipient', MarketingRecipientSchema);
