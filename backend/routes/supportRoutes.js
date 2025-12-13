import express from 'express';
import * as supportController from '../controllers/supportController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateContentType } from '../middleware/securityMiddleware.js';

const router = express.Router();

/**
 * Customer Support Routes
 * All routes require authentication
 */

// Create a new support ticket
router.post(
  '/tickets',
  authenticateToken,
  validateContentType,
  supportController.createTicket
);

// Get all tickets for current user
router.get(
  '/tickets',
  authenticateToken,
  supportController.getMyTickets
);

// Get single ticket details
router.get(
  '/tickets/:ticketId',
  authenticateToken,
  supportController.getTicketDetails
);

// Add message to ticket
router.post(
  '/tickets/:ticketId/messages',
  authenticateToken,
  validateContentType,
  supportController.addMessage
);

// Close ticket
router.patch(
  '/tickets/:ticketId/close',
  authenticateToken,
  supportController.closeTicket
);

export default router;
