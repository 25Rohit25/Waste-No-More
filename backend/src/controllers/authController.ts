import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import DonorProfile from '../models/DonorProfile';
import ReceiverProfile from '../models/ReceiverProfile';
import VolunteerProfile from '../models/VolunteerProfile';

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role, phone, ...profileData } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            passwordHash,
            role,
            phone
        });

        // Create profile based on role
        if (role === 'DONOR') {
            await DonorProfile.create({
                user: user._id,
                businessName: profileData.businessName || name,
                address: profileData.address || 'Default Address',
                location: profileData.location || { type: 'Point', coordinates: [0, 0] }
            });
        } else if (role === 'RECEIVER') {
            await ReceiverProfile.create({
                user: user._id,
                orgName: profileData.orgName || name,
                address: profileData.address || 'Default Address',
                location: profileData.location || { type: 'Point', coordinates: [0, 0] }
            });
        } else if (role === 'VOLUNTEER') {
            await VolunteerProfile.create({
                user: user._id,
                homeAddress: profileData.homeAddress || 'Default Address',
                homeLocation: profileData.homeLocation || { type: 'Point', coordinates: [0, 0] }
            });
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            token: generateToken(user._id.toString(), user.role),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                token: generateToken(user._id.toString(), user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
