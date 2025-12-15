import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats,
  createSession,
  getProjectSessions,
  updateSession,
  completeSession,
  uploadSessionPhotos,
  createConsent,
  getCustomerConsents,
  signConsent,
  downloadConsentPDF,
  getPortfolio
} from '../controllers/tattooController.js';
import { protect } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

// ==================== PROJECTS ====================
router.post('/projects', protect, checkRole(['business', 'ceo']), createProject);
router.get('/projects', protect, checkRole(['business', 'ceo']), getProjects);
router.get('/projects/stats', protect, checkRole(['business', 'ceo']), getProjectStats);
router.get('/projects/:id', protect, checkRole(['business', 'ceo']), getProject);
router.put('/projects/:id', protect, checkRole(['business', 'ceo']), updateProject);
router.delete('/projects/:id', protect, checkRole(['business', 'ceo']), deleteProject);

// ==================== SESSIONS ====================
router.post('/sessions', protect, checkRole(['business', 'ceo']), createSession);
router.get('/sessions/:projectId', protect, checkRole(['business', 'ceo']), getProjectSessions);
router.put('/sessions/:id', protect, checkRole(['business', 'ceo']), updateSession);
router.post('/sessions/:id/complete', protect, checkRole(['business', 'ceo']), completeSession);
router.post('/sessions/:id/photos', protect, checkRole(['business', 'ceo']), uploadSessionPhotos);

// ==================== CONSENTS ====================
router.post('/consents', protect, checkRole(['business', 'ceo']), createConsent);
router.get('/consents/:customerId', protect, checkRole(['business', 'ceo']), getCustomerConsents);
router.post('/consents/:id/sign', protect, signConsent); // Customers can also sign
router.get('/consents/:id/pdf', protect, checkRole(['business', 'ceo']), downloadConsentPDF);

// ==================== PORTFOLIO (Public) ====================
router.get('/portfolio/:salonId', getPortfolio); // No auth - public gallery

export default router;
