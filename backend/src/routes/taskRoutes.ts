import express from 'express';
import { getAvailableTasks, claimTask, updateTaskStatus, getMyTasks } from '../controllers/taskController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/available', protect, authorize('VOLUNTEER'), getAvailableTasks);
router.post('/:donationId/claim', protect, authorize('VOLUNTEER'), claimTask);
router.patch('/:id/status', protect, authorize('VOLUNTEER'), updateTaskStatus);
router.get('/my-tasks', protect, authorize('VOLUNTEER'), getMyTasks);

export default router;
