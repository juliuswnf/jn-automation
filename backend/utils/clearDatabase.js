import dotenv from 'dotenv';
import mongoose from 'mongoose';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import Payment from '../models/Payment.js';
import Employee from '../models/Employee.js';
import Appointment from '../models/Appointment.js';
import BusinessSettings from '../models/BusinessSettings.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.log('\n✅ Database connected\n');
  } catch (error) {
    logger.error('\n❌ Database connection error:', error.message, '\n');
    process.exit(1);
  }
};

export const getCollectionCounts = async () => {
  try {
    const counts = {
      users: await User.countDocuments(),
      customers: await Customer.countDocuments(),
      services: await Service.countDocuments(),
      bookings: await Booking.countDocuments(),
      reviews: await Review.countDocuments(),
      payments: await Payment.countDocuments(),
      employees: await Employee.countDocuments(),
      appointments: await Appointment.countDocuments(),
      businessSettings: await BusinessSettings.countDocuments(),
      notifications: await Notification.countDocuments(),
      auditLogs: await AuditLog.countDocuments()
    };
    return counts;
  } catch (error) {
    logger.error('❌ Error getting collection counts:', error.message);
    throw error;
  }
};

export const showDatabaseStatus = async () => {
  try {
    const counts = await getCollectionCounts();

    logger.log('\n📊 Database Status:\n');
    logger.log(`   Users: ${counts.users}`);
    logger.log(`   Customers: ${counts.customers}`);
    logger.log(`   Services: ${counts.services}`);
    logger.log(`   Bookings: ${counts.bookings}`);
    logger.log(`   Reviews: ${counts.reviews}`);
    logger.log(`   Payments: ${counts.payments}`);
    logger.log(`   Employees: ${counts.employees}`);
    logger.log(`   Appointments: ${counts.appointments}`);
    logger.log(`   Business Settings: ${counts.businessSettings}`);
    logger.log(`   Notifications: ${counts.notifications}`);
    logger.log(`   Audit Logs: ${counts.auditLogs}\n`);

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    logger.log(`   📈 TOTAL DOCUMENTS: ${total}\n`);

    return total;
  } catch (error) {
    logger.error('❌ Error showing database status:', error.message);
    throw error;
  }
};

export const clearAllCollections = async () => {
  try {
    logger.log('🗑️  Clearing all collections...\n');

    const collections = [
      { model: User, name: 'Users' },
      { model: Customer, name: 'Customers' },
      { model: Service, name: 'Services' },
      { model: Booking, name: 'Bookings' },
      { model: Review, name: 'Reviews' },
      { model: Payment, name: 'Payments' },
      { model: Employee, name: 'Employees' },
      { model: Appointment, name: 'Appointments' },
      { model: BusinessSettings, name: 'Business Settings' },
      { model: Notification, name: 'Notifications' },
      { model: AuditLog, name: 'Audit Logs' }
    ];

    let totalDeleted = 0;

    for (const collection of collections) {
      const result = await collection.model.deleteMany({});
      logger.log(`   ✅ ${collection.name}: ${result.deletedCount} documents deleted`);
      totalDeleted += result.deletedCount;
    }

    logger.log(`\n✅ Total ${totalDeleted} documents deleted\n`);
    return totalDeleted;
  } catch (error) {
    logger.error('❌ Error clearing collections:', error.message, '\n');
    throw error;
  }
};

export const clearCollection = async (collectionName) => {
  try {
    const collections = {
      users: User,
      customers: Customer,
      services: Service,
      bookings: Booking,
      reviews: Review,
      payments: Payment,
      employees: Employee,
      appointments: Appointment,
      businessSettings: BusinessSettings,
      notifications: Notification,
      auditLogs: AuditLog
    };

    const model = collections[collectionName];

    if (!model) {
      throw new Error(`Unknown collection: ${collectionName}`);
    }

    const result = await model.deleteMany({});
    logger.log(`\n✅ Cleared ${collectionName}: ${result.deletedCount} documents deleted\n`);
    return result.deletedCount;
  } catch (error) {
    logger.error('❌ Error clearing collection:', error.message, '\n');
    throw error;
  }
};

export const dropDatabase = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    logger.log('\n✅ Database dropped successfully\n');
  } catch (error) {
    logger.error('❌ Error dropping database:', error.message, '\n');
    throw error;
  }
};

export const backupBeforeClear = async () => {
  try {
    const counts = await getCollectionCounts();
    const backupData = {
      timestamp: new Date().toISOString(),
      collectionCounts: counts,
      totalDocuments: Object.values(counts).reduce((sum, count) => sum + count, 0)
    };

    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const fileName = `backup-${Date.now()}.json`;
    const filePath = path.join(backupDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));
    logger.log(`✅ Backup created: ${filePath}\n`);

    return filePath;
  } catch (error) {
    logger.error('❌ Error creating backup:', error.message);
    throw error;
  }
};

const interactiveMode = async () => {
  try {
    logger.log('================================');
    logger.log('  🗑️  DATABASE CLEANUP TOOL');
    logger.log('================================\n');

    await showDatabaseStatus();

    const confirm = await question('Are you sure you want to clear the database? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes') {
      logger.log('\n❌ Operation cancelled\n');
      rl.close();
      process.exit(0);
    }

    const backup = await question('Create backup before clearing? (yes/no): ');

    if (backup.toLowerCase() === 'yes') {
      await backupBeforeClear();
    }

    logger.log('\nClear options:');
    logger.log('1. Clear all collections');
    logger.log('2. Clear specific collection');
    logger.log('3. Drop entire database\n');

    const option = await question('Choose option (1-3): ');

    if (option === '1') {
      await clearAllCollections();
    } else if (option === '2') {
      const collectionName = await question('Enter collection name: ');
      await clearCollection(collectionName);
    } else if (option === '3') {
      const confirmDrop = await question('⚠️  Are you sure? This will drop the entire database (yes/no): ');
      if (confirmDrop.toLowerCase() === 'yes') {
        await dropDatabase();
      } else {
        logger.log('\n❌ Operation cancelled\n');
      }
    } else {
      logger.log('\n❌ Invalid option\n');
    }

    logger.log('📊 Final status:');
    await showDatabaseStatus();

    logger.log('✅ Cleanup completed\n');

    rl.close();
    process.exit(0);
  } catch (error) {
    logger.error('\n❌ Fatal error:', error.message, '\n');
    rl.close();
    process.exit(1);
  }
};

const handleCommandLineArgs = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    await interactiveMode();
    return;
  }

  try {
    const command = args[0];

    if (command === '--status') {
      logger.log('\n📊 Database Status:\n');
      await showDatabaseStatus();
      process.exit(0);
    } else if (command === '--clear-all') {
      const confirm = args[1] === '--force';
      if (!confirm) {
        logger.log('⚠️  Use --force flag to confirm: npm run clear -- --clear-all --force');
        process.exit(0);
      }
      await clearAllCollections();
      logger.log('✅ Database cleared\n');
      process.exit(0);
    } else if (command === '--clear' && args[1]) {
      await clearCollection(args[1]);
      process.exit(0);
    } else if (command === '--drop') {
      const confirm = args[1] === '--force';
      if (!confirm) {
        logger.log('⚠️  Use --force flag to confirm: npm run clear -- --drop --force');
        process.exit(0);
      }
      await dropDatabase();
      logger.log('✅ Database dropped\n');
      process.exit(0);
    } else if (command === '--backup') {
      await backupBeforeClear();
      process.exit(0);
    } else {
      logger.log('Invalid command\nUsage:\n  npm run clear (interactive mode)\n  npm run clear -- --status\n  npm run clear -- --clear-all --force\n  npm run clear -- --clear [collection]\n  npm run clear -- --drop --force\n  npm run clear -- --backup\n');
      process.exit(0);
    }
  } catch (error) {
    logger.error('❌ Error:', error.message, '\n');
    process.exit(1);
  }
};

const main = async () => {
  try {
    await connectDB();
    await handleCommandLineArgs();
  } catch (error) {
    logger.error('\n❌ Fatal error:', error.message, '\n');
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default {
  showDatabaseStatus,
  clearAllCollections,
  clearCollection,
  dropDatabase,
  backupBeforeClear,
  getCollectionCounts
};
