import mongoose, { Document, Schema } from 'mongoose';

export interface IReceiverProfile extends Document {
    user: mongoose.Types.ObjectId;
    orgName: string;
    address: string;
    location: {
        type: string;
        coordinates: number[];
    };
    preferences?: {
        foodTypes?: string[];
        maxDistanceKm?: number;
    };
}

const ReceiverProfileSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    orgName: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    preferences: {
        foodTypes: [String],
        maxDistanceKm: Number
    }
});

ReceiverProfileSchema.index({ location: '2dsphere' });

export default mongoose.model<IReceiverProfile>('ReceiverProfile', ReceiverProfileSchema);
