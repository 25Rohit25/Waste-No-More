import { Request, Response } from 'express';
import Donation, { DonationStatus } from '../models/Donation';
import VolunteerTask, { TaskStatus } from '../models/VolunteerTask';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAvailableTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { lat, lng, radius } = req.query;

        // Find donations that are CLAIMED (ready for pickup) and not yet assigned to a volunteer?
        // Or maybe "CLAIMED" means receiver claimed it, now it needs transport.
        // So we look for donations with status CLAIMED.
        // And we filter by pickupLocation near volunteer.

        let query: any = { status: DonationStatus.CLAIMED };

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

        const donations = await Donation.find(query).populate('donor', 'name phone businessName address');
        res.json(donations);
    } catch (error: any) {
        console.error('getAvailableTasks Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const claimTask = async (req: AuthRequest, res: Response) => {
    try {
        const donationId = req.params.donationId;
        const volunteerId = req.user.id;

        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.status !== DonationStatus.CLAIMED) {
            return res.status(400).json({ message: 'Donation is not available for pickup' });
        }

        // Check if task already exists
        const existingTask = await VolunteerTask.findOne({ donation: donationId });
        if (existingTask) {
            return res.status(400).json({ message: 'Task already assigned' });
        }

        const task = await VolunteerTask.create({
            donation: donationId,
            volunteer: volunteerId,
            status: TaskStatus.ASSIGNED
        });

        donation.status = DonationStatus.ASSIGNED;
        await donation.save();

        res.status(201).json(task);
    } catch (error: any) {
        console.error('claimTask Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body; // IN_TRANSIT, COMPLETED
        const task = await VolunteerTask.findById(req.params.id).populate('donation');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.volunteer.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        task.status = status;
        await task.save();

        const donation = await Donation.findById(task.donation);
        if (donation) {
            if (status === TaskStatus.IN_TRANSIT) {
                donation.status = DonationStatus.IN_TRANSIT;
            } else if (status === TaskStatus.COMPLETED) {
                donation.status = DonationStatus.COMPLETED;
            }
            await donation.save();
        }

        res.json(task);
    } catch (error: any) {
        console.error('updateTaskStatus Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getMyTasks = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await VolunteerTask.find({ volunteer: req.user.id }).populate('donation');
        res.json(tasks);
    } catch (error: any) {
        console.error('getMyTasks Error:', error);
        res.status(500).json({ message: error.message });
    }
}
