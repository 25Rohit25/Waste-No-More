import { Request, Response } from 'express';
import Donation, { DonationStatus } from '../models/Donation';
import DonationClaim, { ClaimStatus } from '../models/DonationClaim';
import { AuthRequest } from '../middleware/authMiddleware';

export const claimDonation = async (req: AuthRequest, res: Response) => {
    try {
        const donationId = req.params.id;
        const receiverId = req.user.id;

        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.status !== DonationStatus.OPEN) {
            return res.status(400).json({ message: 'Donation is not available' });
        }

        const existingClaim = await DonationClaim.findOne({ donation: donationId, receiver: receiverId });
        if (existingClaim) {
            return res.status(400).json({ message: 'You have already claimed this donation' });
        }

        const claim = await DonationClaim.create({
            donation: donationId,
            receiver: receiverId,
            status: ClaimStatus.PENDING
        });

        // Update donation status to CLAIMED (or keep OPEN until approved? Requirements say "Claim donation". Usually implies reservation.)
        // Let's set it to CLAIMED to prevent others from claiming it for now, or keep it OPEN if multiple people can request.
        // "Once claimed, it becomes unavailable for others" implies immediate reservation or approval needed.
        // "Donor approves/rejects" implies it might be pending.
        // Let's set donation status to CLAIMED for now to lock it, or maybe a new status PENDING_APPROVAL.
        // The requirements list: CREATED -> CLAIMED -> VOLUNTEER_ASSIGNED...
        // And "Donor approves/rejects".
        // If donor approves, it stays CLAIMED. If rejected, it goes back to OPEN.

        donation.status = DonationStatus.CLAIMED;
        await donation.save();

        res.status(201).json(claim);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyClaims = async (req: AuthRequest, res: Response) => {
    try {
        const claims = await DonationClaim.find({ receiver: req.user.id }).populate('donation');
        res.json(claims);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClaimStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body; // APPROVED, REJECTED
        const claim = await DonationClaim.findById(req.params.id).populate('donation');

        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        const donation = await Donation.findById(claim.donation);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Only donor of the donation can approve/reject
        if (donation.donor.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        claim.status = status;
        await claim.save();

        if (status === ClaimStatus.REJECTED) {
            donation.status = DonationStatus.OPEN;
            await donation.save();
        } else if (status === ClaimStatus.APPROVED) {
            // Stays CLAIMED, ready for volunteer
        }

        res.json(claim);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
