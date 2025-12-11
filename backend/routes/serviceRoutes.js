import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { checkTenantAccess, enforceTenantFilter } from '../middleware/tenantMiddleware.js';
import logger from '../utils/logger.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware.protect);

// Apply tenant filter
router.use(enforceTenantFilter);

// Get all services for salon (filtered by tenant)
router.get('/', async (req, res) => {
  try {
    const { Service } = await import('../models/index.js').then(m => m.default);

    // Use tenantFilter from middleware (CEO can see all if no filter)
    const filter = req.tenantFilter.salonId
      ? { salonId: req.tenantFilter.salonId }
      : {};

    const services = await Service.find(filter)
      .select('-__v')
      .limit(100);

    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get service by ID (with tenant check)
router.get('/:id', checkTenantAccess('service'), async (req, res) => {
  try {
    // Resource already loaded by middleware
    res.json({ success: true, data: req.resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create service (uses tenant's salonId)
router.post('/', async (req, res) => {
  try {
    const { Service } = await import('../models/index.js').then(m => m.default);

    // Use salonId from tenant filter (user's salon)
    const salonId = req.tenantFilter.salonId || req.user.salonId || req.user._id;

    const service = new Service({
      ...req.body,
      salonId
    });

    await service.save();
    logger.log(`âœ… Service created: ${service.name} for salon ${salonId}`);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update service (with tenant check)
router.put('/:id', checkTenantAccess('service'), async (req, res) => {
  try {
    const { Service } = await import('../models/index.js').then(m => m.default);

    // Prevent changing salonId - extract and discard it from the update
    // eslint-disable-next-line no-unused-vars
    const { salonId, ...updateData } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    logger.log(`âœ… Service updated: ${service.name}`);
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete service (with tenant check)
router.delete('/:id', checkTenantAccess('service'), async (req, res) => {
  try {
    const { Service } = await import('../models/index.js').then(m => m.default);
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    logger.log(`ðŸ—‘ï¸ Service deleted: ${service.name}`);
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
