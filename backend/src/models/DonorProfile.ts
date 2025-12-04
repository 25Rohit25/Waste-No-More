import mongoose, { Document, Schema } from 'mongoose';

export interface IDonorProfile extends Document {
    user: mongoose.Types.ObjectId;
    businessName: string;
    address: string;
    location: {
        type: string;
        coordinates: number[]; // [longitude, latitude]
    };
    openingHours?: any;
}

const DonorProfileSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    openingHours: { type: Schema.Types.Mixed }
});

DonorProfileSchema.index({ location: '2dsphere' });

export default mongoose.model<IDonorProfile>('DonorProfile', DonorProfileSchema);
