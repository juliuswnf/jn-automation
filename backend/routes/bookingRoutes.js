import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { checkTenantAccess, enforceTenantFilter } from '../middleware/tenantMiddleware.js';
import bookingController from '../controllers/bookingController.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware.protect);

// Apply tenant filter to all list/query operations
router.use(enforceTenantFilter);

// Get all bookings for salon (filtered by tenant)
router.get('/', bookingController.getBookings);

// Get booking stats (filtered by tenant)
router.get('/stats', bookingController.getBookingStats);

// Get bookings by date (filtered by tenant)
router.get('/by-date', bookingController.getBookingsByDate);

// Get booking by ID (tenant access check)
router.get('/:id', checkTenantAccess('booking'), bookingController.getBooking);

// Create booking (authenticated)
router.post('/', bookingController.createBooking);

// Update booking (tenant access check)
router.put('/:id', checkTenantAccess('booking'), bookingController.updateBooking);

// Confirm booking (tenant access check)
router.patch('/:id/confirm', checkTenantAccess('booking'), bookingController.confirmBooking);

// Cancel booking (tenant access check)
router.patch('/:id/cancel', checkTenantAccess('booking'), bookingController.cancelBooking);

// Complete booking (tenant access check)
router.patch('/:id/complete', checkTenantAccess('booking'), bookingController.completeBooking);

// Delete booking (tenant access check)
router.delete('/:id', checkTenantAccess('booking'), bookingController.deleteBooking);

export default router;
