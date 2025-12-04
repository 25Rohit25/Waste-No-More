import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User, { UserRole } from './models/User';
import DonorProfile from './models/DonorProfile';
import ReceiverProfile from './models/ReceiverProfile';
import VolunteerProfile from './models/VolunteerProfile';
import Donation, { DonationStatus } from './models/Donation';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-no-more');
        console.log('MongoDB Connected');

        await User.deleteMany({});
        await DonorProfile.deleteMany({});
        await ReceiverProfile.deleteMany({});
        await VolunteerProfile.deleteMany({});
        await Donation.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('password123', salt);

        // Create Donors
        const donor1 = await User.create({
            name: 'Bakery One',
            email: 'donor1@example.com',
            passwordHash,
            role: UserRole.DONOR,
            phone: '1234567890'
        });

        await DonorProfile.create({
            user: donor1._id,
            businessName: 'Bakery One',
            address: '123 Main St',
            location: { type: 'Point', coordinates: [-73.935242, 40.730610] } // NYC example
        });

        // Create Receivers
        const receiver1 = await User.create({
            name: 'Shelter Hope',
            email: 'receiver1@example.com',
            passwordHash,
            role: UserRole.RECEIVER,
            phone: '0987654321'
        });

        await ReceiverProfile.create({
            user: receiver1._id,
            orgName: 'Shelter Hope',
            address: '456 Elm St',
            location: { type: 'Point', coordinates: [-73.945242, 40.740610] }
        });

        // Create Volunteer
        const volunteer1 = await User.create({
            name: 'John Doe',
            email: 'volunteer1@example.com',
            passwordHash,
            role: UserRole.VOLUNTEER,
            phone: '1122334455'
        });

        await VolunteerProfile.create({
            user: volunteer1._id,
            homeAddress: '789 Oak St',
            homeLocation: { type: 'Point', coordinates: [-73.955242, 40.750610] }
        });

        // Create Donation
        await Donation.create({
            donor: donor1._id,
            title: 'Surplus Bagels',
            category: 'Baked Goods',
            quantity: 50,
            unit: 'bagels',
            pickupAddress: '123 Main St',
            pickupLocation: { type: 'Point', coordinates: [-73.935242, 40.730610] },
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            status: DonationStatus.OPEN
        });

        console.log('Data Seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
