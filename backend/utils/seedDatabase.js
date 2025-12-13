import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import readline from 'readline';

import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import Payment from '../models/Payment.js';
import Employee from '../models/Employee.js';
import Appointment from '../models/Appointment.js';
import logger from './logger.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function for readline questions (available if needed)
// const question = (query) => new Promise((resolve) => rl.question(query, resolve));

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

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const seedUsers = async (companyId) => {
  try {
    logger.log('📝 Seeding users...\n');

    const hashedPassword = await hashPassword('TestPassword123!');

    const users = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'admin',
        companyId,
        isActive: true,
        emailVerified: true,
        createdAt: new Date()
      },
      {
        name: 'Employee 1',
        email: 'employee1@test.com',
        password: hashedPassword,
        role: 'employee',
        companyId,
        isActive: true,
        emailVerified: true,
        createdAt: new Date()
      },
      {
        name: 'Employee 2',
        email: 'employee2@test.com',
        password: hashedPassword,
        role: 'employee',
        companyId,
        isActive: true,
        emailVerified: true,
        createdAt: new Date()
      }
    ];

    const createdUsers = await User.insertMany(users);
    logger.log(`✅ ${createdUsers.length} users seeded\n`);
    return createdUsers;
  } catch (error) {
    logger.error('❌ Error seeding users:', error.message, '\n');
    throw error;
  }
};

export const seedCustomers = async (companyId) => {
  try {
    logger.log('👥 Seeding customers...\n');

    const customers = [
      {
        name: 'Max Müller',
        email: 'max@example.com',
        phone: '+49123456789',
        companyId,
        address: {
          street: 'Hauptstraße 1',
          city: 'Berlin',
          zipCode: '10115',
          country: 'DE'
        },
        createdAt: new Date()
      },
      {
        name: 'Sarah Schmidt',
        email: 'sarah@example.com',
        phone: '+49987654321',
        companyId,
        address: {
          street: 'Alexanderplatz 2',
          city: 'Berlin',
          zipCode: '10178',
          country: 'DE'
        },
        createdAt: new Date()
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+49555666777',
        companyId,
        address: {
          street: 'Kurfürstendamm 3',
          city: 'Berlin',
          zipCode: '10719',
          country: 'DE'
        },
        createdAt: new Date()
      }
    ];

    const createdCustomers = await Customer.insertMany(customers);
    logger.log(`✅ ${createdCustomers.length} customers seeded\n`);
    return createdCustomers;
  } catch (error) {
    logger.error('❌ Error seeding customers:', error.message, '\n');
    throw error;
  }
};

export const seedServices = async (companyId) => {
  try {
    logger.log('🔧 Seeding services...\n');

    const services = [
      {
        name: 'Haarschnitt',
        description: 'Professioneller Haarschnitt',
        category: 'Haircut',
        price: 29.99,
        duration: 30,
        companyId,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: 'Färben',
        description: 'Haarfärbung mit hochwertigen Produkten',
        category: 'Coloring',
        price: 59.99,
        duration: 90,
        companyId,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: 'Styling',
        description: 'Professionelles Haarstyling',
        category: 'Styling',
        price: 39.99,
        duration: 45,
        companyId,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: 'Massage',
        description: 'Entspannende Kopfmassage',
        category: 'Massage',
        price: 49.99,
        duration: 60,
        companyId,
        isActive: true,
        createdAt: new Date()
      }
    ];

    const createdServices = await Service.insertMany(services);
    logger.log(`✅ ${createdServices.length} services seeded\n`);
    return createdServices;
  } catch (error) {
    logger.error('❌ Error seeding services:', error.message, '\n');
    throw error;
  }
};

export const seedAppointments = async (companyId, customers, services, employees) => {
  try {
    logger.log('📅 Seeding appointments...\n');

    const appointments = [
      {
        customerId: customers[0]._id,
        serviceId: services[0]._id,
        employeeId: employees[0]._id,
        companyId,
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: 30,
        status: 'confirmed',
        createdAt: new Date()
      },
      {
        customerId: customers[1]._id,
        serviceId: services[1]._id,
        employeeId: employees[1]._id,
        companyId,
        appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        duration: 90,
        status: 'confirmed',
        createdAt: new Date()
      },
      {
        customerId: customers[2]._id,
        serviceId: services[2]._id,
        employeeId: employees[0]._id,
        companyId,
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        duration: 45,
        status: 'pending',
        createdAt: new Date()
      }
    ];

    const createdAppointments = await Appointment.insertMany(appointments);
    logger.log(`✅ ${createdAppointments.length} appointments seeded\n`);
    return createdAppointments;
  } catch (error) {
    logger.error('❌ Error seeding appointments:', error.message, '\n');
    throw error;
  }
};

export const seedBookings = async (companyId, customers, services) => {
  try {
    logger.log('📋 Seeding bookings...\n');

    const bookings = [
      {
        customerId: customers[0]._id,
        serviceId: services[0]._id,
        companyId,
        bookingDate: new Date(),
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        totalPrice: 29.99,
        createdAt: new Date()
      },
      {
        customerId: customers[1]._id,
        serviceId: services[1]._id,
        companyId,
        bookingDate: new Date(),
        appointmentDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        status: 'pending',
        totalPrice: 59.99,
        createdAt: new Date()
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    logger.log(`✅ ${createdBookings.length} bookings seeded\n`);
    return createdBookings;
  } catch (error) {
    logger.error('❌ Error seeding bookings:', error.message, '\n');
    throw error;
  }
};

export const seedPayments = async (companyId, bookings) => {
  try {
    logger.log('💳 Seeding payments...\n');

    const payments = bookings.map(booking => ({
      bookingId: booking._id,
      companyId,
      amount: booking.totalPrice,
      currency: 'EUR',
      paymentMethod: 'card',
      status: 'completed',
      transactionId: `TXN-${Date.now()}`,
      createdAt: new Date()
    }));

    const createdPayments = await Payment.insertMany(payments);
    logger.log(`✅ ${createdPayments.length} payments seeded\n`);
    return createdPayments;
  } catch (error) {
    logger.error('❌ Error seeding payments:', error.message, '\n');
    throw error;
  }
};

export const seedReviews = async (companyId, customers, services) => {
  try {
    logger.log('⭐ Seeding reviews...\n');

    const reviews = [
      {
        customerId: customers[0]._id,
        serviceId: services[0]._id,
        companyId,
        rating: 5,
        comment: 'Sehr zufrieden! Professioneller Service.',
        createdAt: new Date()
      },
      {
        customerId: customers[1]._id,
        serviceId: services[1]._id,
        companyId,
        rating: 4,
        comment: 'Gutes Ergebnis, freundliches Personal.',
        createdAt: new Date()
      },
      {
        customerId: customers[2]._id,
        serviceId: services[2]._id,
        companyId,
        rating: 5,
        comment: 'Ausgezeichnet! Würde ich empfehlen.',
        createdAt: new Date()
      }
    ];

    const createdReviews = await Review.insertMany(reviews);
    logger.log(`✅ ${createdReviews.length} reviews seeded\n`);
    return createdReviews;
  } catch (error) {
    logger.error('❌ Error seeding reviews:', error.message, '\n');
    throw error;
  }
};

export const seedEmployees = async (companyId) => {
  try {
    logger.log('👨‍💼 Seeding employees...\n');

    const employees = [
      {
        userId: null,
        companyId,
        firstName: 'Hans',
        lastName: 'Meyer',
        email: 'employee1@test.com',
        phone: '+49111222333',
        specialties: ['Haarschnitt', 'Styling'],
        isActive: true,
        createdAt: new Date()
      },
      {
        userId: null,
        companyId,
        firstName: 'Maria',
        lastName: 'Schmidt',
        email: 'employee2@test.com',
        phone: '+49444555666',
        specialties: ['Färben', 'Massage'],
        isActive: true,
        createdAt: new Date()
      }
    ];

    const createdEmployees = await Employee.insertMany(employees);
    logger.log(`✅ ${createdEmployees.length} employees seeded\n`);
    return createdEmployees;
  } catch (error) {
    logger.error('❌ Error seeding employees:', error.message, '\n');
    throw error;
  }
};

const main = async () => {
  try {
    await connectDB();

    logger.log('================================');
    logger.log('  🌱 DATABASE SEEDING');
    logger.log('================================\n');

    const companyId = new mongoose.Types.ObjectId();

    const users = await seedUsers(companyId);
    const customers = await seedCustomers(companyId);
    const services = await seedServices(companyId);
    const employees = await seedEmployees(companyId);
    const appointments = await seedAppointments(companyId, customers, services, users.slice(1));
    const bookings = await seedBookings(companyId, customers, services);
    const payments = await seedPayments(companyId, bookings);
    const reviews = await seedReviews(companyId, customers, services);

    logger.log('================================');
    logger.log('  ✅ Database seeding completed!');
    logger.log('================================\n');

    logger.log('📊 Seeded Data Summary:');
    logger.log(`   Users: ${users.length}`);
    logger.log(`   Customers: ${customers.length}`);
    logger.log(`   Services: ${services.length}`);
    logger.log(`   Appointments: ${appointments.length}`);
    logger.log(`   Bookings: ${bookings.length}`);
    logger.log(`   Payments: ${payments.length}`);
    logger.log(`   Reviews: ${reviews.length}`);
    logger.log(`   Employees: ${employees.length}\n`);

    logger.log('🔐 Test Login Credentials:');
    logger.log('   Email: admin@test.com');
    logger.log('   Password: TestPassword123!\n');

    rl.close();
    process.exit(0);
  } catch (error) {
    logger.error('\n❌ Fatal error:', error.message, '\n');
    rl.close();
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default {
  seedUsers,
  seedCustomers,
  seedServices,
  seedAppointments,
  seedBookings,
  seedPayments,
  seedReviews,
  seedEmployees
};
