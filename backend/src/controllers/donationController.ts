import { Request, Response } from 'express';
import Donation, { DonationStatus } from '../models/Donation';
import { AuthRequest } from '../middleware/authMiddleware';

export const createDonation = async (req: AuthRequest, res: Response) => {
    try {
        const { title, category, quantity, unit, pickupAddress, pickupLocation, expiresAt, notes } = req.body;

        const donation = await Donation.create({
            donor: req.user.id,
            title,
            category,
            quantity,
            unit,
            pickupAddress,
            pickupLocation,
            expiresAt,
            notes,
            status: DonationStatus.OPEN
        });

        res.status(201).json(donation);
    } catch (error: any) {
        console.error('createDonation Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getDonations = async (req: AuthRequest, res: Response) => {
    try {
        const { role, id } = req.user;

        if (role === 'DONOR') {
            const donations = await Donation.find({ donor: id }).sort({ createdAt: -1 });
            return res.json(donations);
        }

        if (role === 'RECEIVER' || role === 'VOLUNTEER') {
            const { lat, lng, radius, category } = req.query;

            let query: any = { status: DonationStatus.OPEN };

            if (category) {
                query.category = category;
            }

            if (lat && lng) {
                const distanceInMeters = (Number(radius) || 10) * 1000;
                query.pickupLocation = {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(lng), Number(lat)]
                        },
                        $maxDistance: distanceInMeters
                    }
                };
            }

            const donations = await Donation.find(query);
            return res.json(donations);
        }

        // Admin sees all?
        if (role === 'ADMIN') {
            const donations = await Donation.find({}).sort({ createdAt: -1 });
            return res.json(donations);
        }

        res.status(403).json({ message: 'Unauthorized' });
    } catch (error: any) {
        console.error('getDonations Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getDonationById = async (req: Request, res: Response) => {
    try {
        const donation = await Donation.findById(req.params.id).populate('donor', 'name email phone');
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.json(donation);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDonation = async (req: AuthRequest, res: Response) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.donor.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDonation);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const claimDonation = async (req: AuthRequest, res: Response) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.status !== DonationStatus.OPEN) {
            return res.status(400).json({ message: 'Donation is not available' });
        }

        donation.status = DonationStatus.CLAIMED;
        donation.claimedBy = req.user.id;
        await donation.save();

        res.json(donation);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
