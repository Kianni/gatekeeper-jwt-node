import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to serve the dashboard
router.get('/dashboard', authMiddleware, dashboardController.serveDashboard);

export default router;