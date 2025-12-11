/**
 * Jest Test Setup
 * Runs before all tests
 */

import { jest } from '@jest/globals';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-for-unit-tests';
process.env.JWT_EXPIRE = '1d';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key';

// Global test timeout
jest.setTimeout(10000);

// Mock console.error to keep test output clean
// Uncomment if you want to suppress error logs during tests
// jest.spyOn(console, 'error').mockImplementation(() => {});

// Clean up after all tests
afterAll(async () => {
  // Close any open connections
  await new Promise(resolve => setTimeout(resolve, 100));
});
