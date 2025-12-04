import mongoose, { Document, Schema } from 'mongoose';

export enum DonationStatus {
    OPEN = 'OPEN',
    CLAIMED = 'CLAIMED',
    ASSIGNED = 'ASSIGNED',
    IN_TRANSIT = 'IN_TRANSIT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED'
}

export interface IDonation extends Document {
    donor: mongoose.Types.ObjectId;
    title: string;
    category: string;
    quantity: number;
    unit: string;
    pickupAddress: string;
    pickupLocation: {
        type: string;
        coordinates: number[];
    };
    expiresAt: Date;
    status: DonationStatus;
    notes?: string;
    claimedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const DonationSchema: Schema = new Schema({
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    pickupLocation: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    expiresAt: { type: Date, required: true },
    status: { type: String, enum: Object.values(DonationStatus), default: DonationStatus.OPEN },
    notes: { type: String },
    claimedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

DonationSchema.index({ pickupLocation: '2dsphere' });

export default mongoose.model<IDonation>('Donation', DonationSchema);
