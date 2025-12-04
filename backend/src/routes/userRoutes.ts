import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { updatePassword, getUserActivity, getUserStats, updateProfile } from '../controllers/userController';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.get('/activity', protect, getUserActivity);
router.get('/stats', protect, getUserStats);

export default router;
