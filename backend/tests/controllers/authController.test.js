/**
 * Auth Controller Unit Tests
 * Tests for authentication operations
 */

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { createMockRequest, createMockResponse } from '../mocks/request.js';

// Mock User model
const mockUserFindOne = jest.fn();
const mockUserFindById = jest.fn();
const mockUserCreate = jest.fn();

jest.unstable_mockModule('../../models/User.js', () => ({
  default: {
    findOne: mockUserFindOne,
    findById: mockUserFindById,
    create: mockUserCreate
  }
}));

// Mock jsonwebtoken
const mockJwtSign = jest.fn();
const mockJwtVerify = jest.fn();

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: mockJwtSign,
    verify: mockJwtVerify
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

// Mock crypto
jest.unstable_mockModule('crypto', () => ({
  default: {
    randomBytes: jest.fn().mockReturnValue({ toString: () => 'mock-token' })
  }
}));

// Mock otplib
jest.unstable_mockModule('otplib', () => ({
  authenticator: {
    generateSecret: jest.fn().mockReturnValue('MOCK_SECRET'),
    verify: jest.fn().mockReturnValue(true),
    keyuri: jest.fn().mockReturnValue('otpauth://mock')
  }
}));

// Mock QRCode
jest.unstable_mockModule('qrcode', () => ({
  default: {
    toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,mock')
  }
}));

// Set env before importing
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRE = '7d';

// Import controller after mocking
const { register, login, getProfile } =
  await import('../../controllers/authController.js');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = createMockRequest();
    res = createMockResponse();
  });

  // ==================== REGISTER ====================

  describe('register', () => {
    const validUserData = {
      email: 'newuser@example.com',
      password: 'SecurePass123',
      name: 'New User',
      role: 'customer'
    };

    it('should register user with valid data', async () => {
      req.body = validUserData;

      mockUserFindOne.mockResolvedValue(null); // No existing user

      const createdUser = {
        _id: 'user_123',
        email: 'newuser@example.com',
        name: 'New User',
        role: 'customer',
        toJSON: () => ({
          _id: 'user_123',
          email: 'newuser@example.com',
          name: 'New User',
          role: 'customer'
        })
      };
      mockUserCreate.mockResolvedValue(createdUser);
      mockJwtSign.mockReturnValue('mock-jwt-token');

      await register(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.token).toBe('mock-jwt-token');
      expect(res.jsonData.user.email).toBe('newuser@example.com');
    });

    it('should return 400 if email is missing', async () => {
      req.body = { password: 'test123', name: 'Test' };

      await register(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.success).toBe(false);
      expect(res.jsonData.message).toContain('email');
    });

    it('should return 400 if password is too short', async () => {
      req.body = { email: 'test@test.com', password: 'short', name: 'Test' };

      await register(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('8 characters');
    });

    it('should return 400 if user already exists', async () => {
      req.body = validUserData;

      mockUserFindOne.mockResolvedValue({ email: 'newuser@example.com' }); // Existing user

      await register(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonData.message).toContain('already in use');
    });

    it('should combine firstName and lastName', async () => {
      req.body = {
        email: 'test@test.com',
        password: 'SecurePass123',
        firstName: 'John',
        lastName: 'Doe'
      };

      mockUserFindOne.mockResolvedValue(null);
      mockUserCreate.mockResolvedValue({
        _id: '123',
        name: 'John Doe',
        toJSON: () => ({ name: 'John Doe' })
      });
      mockJwtSign.mockReturnValue('token');

      await register(req, res);

      expect(mockUserCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe'
        })
      );
    });

    it('should default role to customer if invalid role provided', async () => {
      req.body = {
        email: 'test@test.com',
        password: 'SecurePass123',
        name: 'Test User',
        role: 'superadmin' // Invalid role
      };

      mockUserFindOne.mockResolvedValue(null);
      mockUserCreate.mockResolvedValue({
        _id: '123',
        role: 'customer',
        toJSON: () => ({ role: 'customer' })
      });
      mockJwtSign.mockReturnValue('token');

      await register(req, res);

      expect(mockUserCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'customer'
        })
      );
    });
  });

  // ==================== LOGIN ====================

  describe('login', () => {
    it('should login with valid credentials', async () => {
      req.body = {
        email: 'user@test.com',
        password: 'correctpassword'
      };

      const mockUser = {
        _id: 'user_123',
        email: 'user@test.com',
        name: 'Test User',
        role: 'customer',
        isActive: true,
        matchPassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
        toJSON: () => ({
          _id: 'user_123',
          email: 'user@test.com',
          name: 'Test User'
        })
      };

      mockUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });
      mockJwtSign.mockReturnValue('mock-jwt-token');

      await login(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.token).toBe('mock-jwt-token');
    });

    it('should return 400 if email/password missing', async () => {
      req.body = { email: 'test@test.com' }; // Missing password

      await login(req, res);

      expect(res.statusCode).toBe(400);
    });

    it('should return 401 if user not found', async () => {
      req.body = {
        email: 'nonexistent@test.com',
        password: 'password123'
      };

      mockUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await login(req, res);

      expect(res.statusCode).toBe(401);
      expect(res.jsonData.message).toContain('Invalid');
    });

    it('should return 401 if password is incorrect', async () => {
      req.body = {
        email: 'user@test.com',
        password: 'wrongpassword'
      };

      const mockUser = {
        _id: 'user_123',
        matchPassword: jest.fn().mockResolvedValue(false) // Wrong password
      };

      mockUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await login(req, res);

      expect(res.statusCode).toBe(401);
    });

    it('should return 403 if user is deactivated', async () => {
      req.body = {
        email: 'user@test.com',
        password: 'password123'
      };

      const mockUser = {
        _id: 'user_123',
        isActive: false,
        matchPassword: jest.fn().mockResolvedValue(true)
      };

      mockUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await login(req, res);

      expect(res.statusCode).toBe(403);
      expect(res.jsonData.message).toContain('deactivated');
    });
  });

  // ==================== GET PROFILE ====================

  describe('getProfile', () => {
    it('should return current user profile', async () => {
      req.user = {
        _id: 'user_123',
        email: 'user@test.com',
        name: 'Test User',
        role: 'customer'
      };

      const mockUser = {
        _id: 'user_123',
        email: 'user@test.com',
        name: 'Test User',
        role: 'customer'
      };

      mockUserFindById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await getProfile(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonData.success).toBe(true);
      expect(res.jsonData.user.email).toBe('user@test.com');
    });

    it('should return 404 if user not found', async () => {
      req.user = { _id: 'deleted_user' };

      mockUserFindById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await getProfile(req, res);

      expect(res.statusCode).toBe(404);
    });
  });
});
