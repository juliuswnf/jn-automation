/**
 * Mock Models for Unit Tests
 * Isolates tests from database
 */

import { jest } from '@jest/globals';

// Mock Booking Model
export const mockBooking = {
  _id: '507f1f77bcf86cd799439011',
  salonId: '507f1f77bcf86cd799439012',
  serviceId: '507f1f77bcf86cd799439013',
  employeeId: null,
  bookingDate: new Date('2025-12-10T10:00:00Z'),
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  customerPhone: '+49123456789',
  status: 'pending',
  notes: 'Test booking',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Service Model
export const mockService = {
  _id: '507f1f77bcf86cd799439013',
  salonId: '507f1f77bcf86cd799439012',
  name: 'Haircut',
  price: 35,
  duration: 30,
  description: 'Standard haircut'
};

// Mock User Model
export const mockUser = {
  _id: '507f1f77bcf86cd799439014',
  email: 'owner@test.com',
  name: 'Test Owner',
  role: 'salon_owner',
  salonId: '507f1f77bcf86cd799439012',
  isActive: true,
  toJSON: function() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role
    };
  }
};

// Mock Salon Model
export const mockSalon = {
  _id: '507f1f77bcf86cd799439012',
  name: 'Test Salon',
  slug: 'test-salon',
  email: 'salon@test.com',
  subscription: {
    plan: 'pro',
    status: 'active'
  },
  settings: {
    bookingEnabled: true
  }
};

// Mock Payment Model
export const mockPayment = {
  _id: '507f1f77bcf86cd799439015',
  bookingId: '507f1f77bcf86cd799439011',
  amount: 35,
  status: 'completed',
  paymentIntentId: 'pi_test_123',
  paymentMethod: 'card'
};

// Create mock functions for Mongoose operations
export const createMockModel = (mockData) => ({
  findById: jest.fn().mockImplementation((id) => ({
    populate: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(mockData),
    exec: jest.fn().mockResolvedValue(mockData)
  })),
  findOne: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(null),
    exec: jest.fn().mockResolvedValue(null)
  })),
  find: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([mockData]),
    exec: jest.fn().mockResolvedValue([mockData])
  })),
  create: jest.fn().mockResolvedValue({
    ...mockData,
    populate: jest.fn().mockResolvedValue(mockData)
  }),
  findByIdAndUpdate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockResolvedValue(mockData)
  })),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockData),
  countDocuments: jest.fn().mockResolvedValue(1)
});
