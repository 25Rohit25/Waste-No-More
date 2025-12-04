import express from 'express';
import { getMyClaims, updateClaimStatus } from '../controllers/claimController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, authorize('RECEIVER'), getMyClaims);
router.patch('/:id', protect, authorize('DONOR', 'ADMIN'), updateClaimStatus);

export default router;
