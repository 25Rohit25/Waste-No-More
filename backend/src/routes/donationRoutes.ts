import express from 'express';
import { createDonation, getDonations, getDonationById, updateDonation } from '../controllers/donationController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, authorize('DONOR'), createDonation)
    .get(protect, getDonations);

router.route('/:id')
    .get(protect, getDonationById)
    .patch(protect, authorize('DONOR', 'ADMIN'), updateDonation);

import { claimDonation } from '../controllers/claimController';

router.post('/:id/claim', protect, authorize('RECEIVER', 'VOLUNTEER'), claimDonation);

export default router;
