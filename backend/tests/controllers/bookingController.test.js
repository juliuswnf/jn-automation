/**
 * Booking Controller Unit Tests
 * Tests for booking CRUD operations
 */

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { createMockRequest, createMockResponse } from '../mocks/request.js';

// Mock dependencies before importing controller
const mockBookingFindById = jest.fn();
const mockBookingFindOne = jest.fn();
const mockBookingFind = jest.fn();
const mockBookingCreate = jest.fn();
const mockBookingFindByIdAndUpdate = jest.fn();
const mockBookingFindByIdAndDelete = jest.fn();
const mockBookingCountDocuments = jest.fn();
const mockServiceFindById = jest.fn();

// Mock Booking model
jest.unstable_mockModule('../../models/Booking.js', () => ({
  default: {
    findById: mockBookingFindById,
    findOne: mockBookingFindOne,
    find: mockBookingFind,
    create: mockBookingCreate,
    findByIdAndUpdate: mockBookingFindByIdAndUpdate,
    findByIdAndDelete: mockBookingFindByIdAndDelete,
    countDocuments: mockBookingCountDocuments
  }
}));

// Mock Service model
jest.unstable_mockModule('../../models/Service.js', () => ({
  default: {
    findById: mockServiceFindById
  }
}));

// Mock logger
jest.unstable_mockModule('../../utils/logger.js', () => ({
  default: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
  }
}));

// Mock cache service
jest.unstable_mockModule('../../services/cacheService.js', () => ({
  default: {
    invalidate: jest.fn(),
    get: jest.fn(),
    set: jest.fn()
  }
}));

// Import controller after mocking
const { createBooking, getBooking, getBookings, updateBooking, cancelBooking } =
  await import('../../controllers/bookingController.js');

describe('Booking Controller', () => {
  let req, res;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create fresh request/response
    req = createMockRequest();
    res = createMockResponse();
  });

  // ==================== CREATE BOOKING ====================

  describe('createBooking', () => {
    const validBookingData = {
      salonId: '507f1f77bcf86cd799439012',
      serviceId: '507f1f77bcf86cd799439013',
      bookingDate: '2025-12-10T10:00:00Z',
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      customerPhone: '+49123456789'
    };

    const mockService = {
      _id: '507f1f77bcf86cd799439013',
      name: 'Haircut',
      price: 35,
      duration: 30
    };

    it('should create booking with valid data', async () => {
      req.body = validBookingData;

      mockServiceFindById.mockResolvedValue(mockService);
      mockBookingFindOne.mockResolvedValue(null); // No conflict

      const createdBooking = {
        _id: '507f1f77bcf86cd799439011',
        ...validBookingData,
        status: 'pending',
        populate: jest.fn().mockResolvedValue({
          _id: '507f1f77bcf86cd799439011',
          ...validBookingData,
          serviceId: mockService,
          status: 'pending'
        })
      };
      mockBookingCreate.mockResolvedValue(createdBooking);

      await createBooking(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.booking).toBeDefined();
    });

    it('should return 400 if required fields are missing', async () => {
      req.body = { salonId: '123' }; // Missing other required fields

      await createBooking(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.success).toBe(false);
      expect(res.jsonData.message).toContain('required fields');
    });

    it('should return 404 if service not found', async () => {
      req.body = validBookingData;
      mockServiceFindById.mockResolvedValue(null);

      await createBooking(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.jsonData.success).toBe(false);
      expect(res.jsonData.message).toContain('Service not found');
    });

    it('should return 409 if time slot is already booked', async () => {
      req.body = validBookingData;
      mockServiceFindById.mockResolvedValue(mockService);
      mockBookingFindOne.mockResolvedValue({ _id: 'existing-booking' }); // Conflict

      await createBooking(req, res);

      expect(res.statusCode).toBe(409);
      expect(res.jsonData.success).toBe(false);
      expect(res.jsonData.message).toContain('already booked');
    });

    it('should lowercase email', async () => {
      req.body = { ...validBookingData, customerEmail: 'TEST@EXAMPLE.COM' };
      mockServiceFindById.mockResolvedValue(mockService);
      mockBookingFindOne.mockResolvedValue(null);

      const createdBooking = {
        populate: jest.fn().mockResolvedValue({ _id: '123', customerEmail: 'test@example.com' })
      };
      mockBookingCreate.mockResolvedValue(createdBooking);

      await createBooking(req, res);

      expect(mockBookingCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          customerEmail: 'test@example.com'
        })
      );
    });
  });

  // ==================== GET BOOKING ====================

  describe('getBooking', () => {
    const mockBooking = {
      _id: '507f1f77bcf86cd799439011',
      customerName: 'Test Customer',
      status: 'pending'
    };

    it('should return booking if found', async () => {
      req.params = { id: '507f1f77bcf86cd799439011' };

      mockBookingFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockBooking)
        })
      });

      await getBooking(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.booking).toEqual(mockBooking);
    });

    it('should return 404 if booking not found', async () => {
      req.params = { id: 'nonexistent-id' };

      mockBookingFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null)
        })
      });

      await getBooking(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.jsonData.success).toBe(false);
    });
  });

  // ==================== GET BOOKINGS (LIST) ====================

  describe('getBookings', () => {
    const mockBookings = [
      { _id: '1', customerName: 'Customer 1', status: 'pending' },
      { _id: '2', customerName: 'Customer 2', status: 'confirmed' }
    ];

    it('should return paginated bookings', async () => {
      req.query = { page: 1, limit: 10 };
      req.user = { role: 'salon_owner', salonId: '123' };

      mockBookingCountDocuments.mockResolvedValue(2);
      mockBookingFind.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                  lean: jest.fn().mockResolvedValue(mockBookings)
                })
              })
            })
          })
        })
      });

      await getBookings(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.bookings).toHaveLength(2);
      expect(res.jsonData.total).toBe(2);
    });

    it('should filter by status', async () => {
      req.query = { status: 'confirmed', page: 1, limit: 10 };
      req.user = { role: 'ceo' };

      mockBookingCountDocuments.mockResolvedValue(1);
      mockBookingFind.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                  lean: jest.fn().mockResolvedValue([mockBookings[1]])
                })
              })
            })
          })
        })
      });

      await getBookings(req, res);

      expect(mockBookingFind).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'confirmed' })
      );
    });

    it('should return 400 for invalid pagination', async () => {
      req.query = { page: -1, limit: 10 };

      await getBookings(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('pagination');
    });
  });

  // ==================== UPDATE BOOKING ====================

  describe('updateBooking', () => {
    it('should update booking status', async () => {
      req.params = { id: '507f1f77bcf86cd799439011' };
      req.body = { status: 'confirmed' };

      const updatedBooking = {
        _id: '507f1f77bcf86cd799439011',
        status: 'confirmed'
      };

      mockBookingFindByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(updatedBooking)
      });

      await updateBooking(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.booking.status).toBe('confirmed');
    });

    it('should return 404 if booking not found for update', async () => {
      req.params = { id: 'nonexistent' };
      req.body = { status: 'confirmed' };

      mockBookingFindByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await updateBooking(req, res);

      expect(res.statusCode).toBe(404);
    });
  });

  // ==================== CANCEL BOOKING ====================

  describe('cancelBooking', () => {
    it('should cancel booking and update status', async () => {
      req.params = { id: '507f1f77bcf86cd799439011' };
      req.body = { reason: 'Customer request' };

      const cancelledBooking = {
        _id: '507f1f77bcf86cd799439011',
        status: 'cancelled',
        cancellationReason: 'Customer request'
      };

      mockBookingFindByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(cancelledBooking)
      });

      await cancelBooking(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.booking.status).toBe('cancelled');
    });
  });
});
