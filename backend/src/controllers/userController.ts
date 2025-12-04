import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Donation from '../models/Donation';
import VolunteerTask from '../models/VolunteerTask';
import DonationClaim from '../models/DonationClaim';

// Update Profile (Name, Phone, Email, Avatar)
export const updateProfile = async (req: any, res: Response) => {
    const userId = req.user.id;
    const { name, phone, email, avatar } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
            token: req.headers.authorization.split(' ')[1]
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update Password
export const updatePassword = async (req: any, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Activity
export const getUserActivity = async (req: any, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let activity: any[] = [];

        if (role === 'DONOR') {
            activity = await Donation.find({ donor: userId }).sort({ createdAt: -1 }).limit(10);
        } else if (role === 'VOLUNTEER') {
            activity = await VolunteerTask.find({ assignedTo: userId }).sort({ createdAt: -1 }).limit(10);
        } else if (role === 'RECEIVER') {
            activity = await DonationClaim.find({ receiver: userId }).sort({ createdAt: -1 }).limit(10);
        }

        res.json(activity);
    } catch (error: any) {
        console.error("Error fetching activity:", error);
        res.status(500).json({ message: 'Error fetching activity' });
    }
};

// Get User Stats (Overview)
export const getUserStats = async (req: any, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let stats = {};

        if (role === 'DONOR') {
            const donationCount = await Donation.countDocuments({ donor: userId });
            stats = { totalDonations: donationCount };
        } else if (role === 'VOLUNTEER') {
            const taskCount = await VolunteerTask.countDocuments({ assignedTo: userId, status: 'COMPLETED' });
            stats = { tasksCompleted: taskCount };
        } else if (role === 'RECEIVER') {
            const claimCount = await DonationClaim.countDocuments({ receiver: userId });
            stats = { itemsReceived: claimCount };
        }

        res.json(stats);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
