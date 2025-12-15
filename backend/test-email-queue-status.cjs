/**
 * Check Email Queue Status
 * Zeigt aktuelle Queue Status an
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const emailQueueSchema = new mongoose.Schema({
  to: String,
  subject: String,
  type: String,
  scheduledFor: Date,
  sentAt: Date,
  status: String,
  attempts: Number,
  error: String
}, { timestamps: true });

const EmailQueue = mongoose.model('EmailQueue', emailQueueSchema);

const checkStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('\nðŸ“Š EMAIL QUEUE STATUS\n');
    console.log('='.repeat(50));

    const allEmails = await EmailQueue.find({}).sort({ createdAt: -1 }).limit(10);

    console.log(`\nðŸ“§ Last 10 emails in queue:\n`);

    for (const email of allEmails) {
      const statusEmoji =
        email.status === 'sent' ? 'âœ…' :
        email.status === 'pending' ? 'â³' :
        email.status === 'failed' ? 'âŒ' :
        email.status === 'sending' ? 'ðŸ“¤' : 'â“';

      console.log(`${statusEmoji} ${email.status.toUpperCase().padEnd(10)} | ${email.type.padEnd(12)} | ${email.to}`);
      console.log(`   Subject: ${email.subject}`);
      console.log(`   Scheduled: ${email.scheduledFor.toISOString()}`);
      if (email.sentAt) console.log(`   Sent: ${email.sentAt.toISOString()}`);
      if (email.error) console.log(`   Error: ${email.error}`);
      console.log(`   Attempts: ${email.attempts}`);
      console.log('');
    }

    // Summary
    const summary = await EmailQueue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\nðŸ“ˆ SUMMARY:');
    summary.forEach(s => {
      console.log(`   ${s._id}: ${s.count}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('âŒ Error:', error);
    process.exit(1);
  }
};

checkStatus();
