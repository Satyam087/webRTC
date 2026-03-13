import { Router } from 'express';
import { interviewController } from '../controllers/interview.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protected routes (Admin/HR only)
router.post('/', authenticate, interviewController.createInterview);
router.get('/', authenticate, interviewController.getAllInterviews);

// Public routes (Candidate/HR with roomId)
router.get('/:roomId', interviewController.getInterview);
router.get('/:roomId/token', interviewController.getToken);

export default router;
