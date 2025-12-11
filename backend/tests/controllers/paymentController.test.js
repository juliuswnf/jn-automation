/**
 * Payment Controller Unit Tests
 * Tests for payment operations
 */

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { createMockRequest, createMockResponse } from '../mocks/request.js';

// Mock Stripe
const mockPaymentIntentsCreate = jest.fn();
const mockPaymentIntentsRetrieve = jest.fn();
const mockRefundsCreate = jest.fn();

jest.unstable_mockModule('stripe', () => ({
  default: jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: mockPaymentIntentsCreate,
      retrieve: mockPaymentIntentsRetrieve
    },
    refunds: {
      create: mockRefundsCreate
    }
  }))
}));

// Mock Booking model
const mockBookingFindById = jest.fn();
const mockBookingFindByIdAndUpdate = jest.fn();

jest.unstable_mockModule('../../models/Booking.js', () => ({
  default: {
    findById: mockBookingFindById,
    findByIdAndUpdate: mockBookingFindByIdAndUpdate
  }
}));

// Mock Payment model
const mockPaymentCreate = jest.fn();
const mockPaymentFindOne = jest.fn();

jest.unstable_mockModule('../../models/Payment.js', () => ({
  default: {
    create: mockPaymentCreate,
    findOne: mockPaymentFindOne
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

// Set env before importing
process.env.STRIPE_SECRET_KEY = 'sk_test_mock';

// Import controller after mocking
const { createPaymentIntent, processPayment, getPaymentStatus, refundPayment } =
  await import('../../controllers/paymentController.js');

describe('Payment Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = createMockRequest();
    res = createMockResponse();
  });

  // ==================== CREATE PAYMENT INTENT ====================

  describe('createPaymentIntent', () => {
    const mockBooking = {
      _id: '507f1f77bcf86cd799439011',
      customerEmail: 'test@example.com',
      status: 'pending'
    };

    it('should create payment intent with valid data', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        amount: 35.00
      };

      mockBookingFindById.mockResolvedValue(mockBooking);
      mockPaymentIntentsCreate.mockResolvedValue({
        id: 'pi_test_123',
        client_secret: 'pi_test_123_secret_abc'
      });

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.clientSecret).toBe('pi_test_123_secret_abc');
      expect(res.jsonData.paymentIntentId).toBe('pi_test_123');
    });

    it('should return 400 if bookingId is missing', async () => {
      req.body = { amount: 35.00 };

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.success).toBe(false);
    });

    it('should return 400 if amount is missing', async () => {
      req.body = { bookingId: '123' };

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(400);
    });

    it('should return 400 for invalid amount (negative)', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        amount: -10
      };

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('Invalid amount');
    });

    it('should return 400 for amount exceeding maximum', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        amount: 1000000.00
      };

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('Invalid amount');
    });

    it('should return 404 if booking not found', async () => {
      req.body = {
        bookingId: 'nonexistent',
        amount: 35.00
      };

      mockBookingFindById.mockResolvedValue(null);

      await createPaymentIntent(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.jsonData.message).toContain('Booking not found');
    });

    it('should convert amount to cents for Stripe', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        amount: 35.50
      };

      mockBookingFindById.mockResolvedValue(mockBooking);
      mockPaymentIntentsCreate.mockResolvedValue({
        id: 'pi_test',
        client_secret: 'secret'
      });

      await createPaymentIntent(req, res);

      expect(mockPaymentIntentsCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 3550, // 35.50 * 100 = 3550 cents
          currency: 'eur'
        })
      );
    });
  });

  // ==================== PROCESS PAYMENT ====================

  describe('processPayment', () => {
    it('should process successful payment', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        paymentIntentId: 'pi_test_123',
        amount: 35.00,
        paymentMethod: 'card'
      };

      mockPaymentIntentsRetrieve.mockResolvedValue({
        id: 'pi_test_123',
        status: 'succeeded'
      });

      mockBookingFindByIdAndUpdate.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        paymentStatus: 'paid'
      });

      mockPaymentCreate.mockResolvedValue({
        _id: 'payment_123',
        status: 'completed'
      });

      await processPayment(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
    });

    it('should return 400 if required fields missing', async () => {
      req.body = { bookingId: '123' }; // Missing paymentIntentId and amount

      await processPayment(req, res);

      expect(res.statusCode).toBe(400);
    });

    it('should return 400 if payment not succeeded', async () => {
      req.body = {
        bookingId: '507f1f77bcf86cd799439011',
        paymentIntentId: 'pi_test_123',
        amount: 35.00
      };

      mockPaymentIntentsRetrieve.mockResolvedValue({
        id: 'pi_test_123',
        status: 'pending' // Not succeeded
      });

      await processPayment(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('Payment not successful');
    });
  });

  // ==================== GET PAYMENT STATUS ====================

  describe('getPaymentStatus', () => {
    it('should return payment status for booking', async () => {
      req.params = { bookingId: '507f1f77bcf86cd799439011' };

      mockPaymentFindOne.mockResolvedValue({
        _id: 'payment_123',
        bookingId: '507f1f77bcf86cd799439011',
        status: 'completed',
        amount: 35.00
      });

      await getPaymentStatus(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.payment.status).toBe('completed');
    });

    it('should return 404 if no payment found', async () => {
      req.params = { bookingId: 'no-payment' };

      mockPaymentFindOne.mockResolvedValue(null);

      await getPaymentStatus(req, res);

      expect(res.statusCode).toBe(404);
    });
  });

  // ==================== REFUND PAYMENT ====================

  describe('refundPayment', () => {
    it('should process refund successfully', async () => {
      req.body = {
        paymentId: 'payment_123',
        reason: 'Customer request'
      };

      mockPaymentFindOne.mockResolvedValue({
        _id: 'payment_123',
        paymentIntentId: 'pi_test_123',
        amount: 35.00,
        status: 'completed'
      });

      mockRefundsCreate.mockResolvedValue({
        id: 'refund_123',
        status: 'succeeded'
      });

      await refundPayment(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
    });

    it('should return 400 if paymentId missing', async () => {
      req.body = { reason: 'Test' };

      await refundPayment(req, res);

      expect(res.statusCode).toBe(400);
    });
  });
});
