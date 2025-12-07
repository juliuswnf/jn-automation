/**
 * Mock Express Request/Response for Controller Tests
 */

import { jest } from '@jest/globals';

// Create mock request object
export const createMockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  user: null,
  headers: {},
  ...overrides
});

// Create mock response object with chainable methods
export const createMockResponse = () => {
  const res = {
    statusCode: 200,
    jsonData: null,
    
    status: jest.fn().mockImplementation(function(code) {
      this.statusCode = code;
      return this;
    }),
    
    json: jest.fn().mockImplementation(function(data) {
      this.jsonData = data;
      return this;
    }),
    
    send: jest.fn().mockImplementation(function(data) {
      this.jsonData = data;
      return this;
    }),
    
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    
    // Helper to get response data
    getResponse: function() {
      return {
        status: this.statusCode,
        data: this.jsonData
      };
    }
  };
  
  return res;
};

// Create mock next function
export const createMockNext = () => jest.fn();
