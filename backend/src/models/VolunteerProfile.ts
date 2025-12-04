import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteerProfile extends Document {
    user: mongoose.Types.ObjectId;
    homeAddress: string;
    homeLocation: {
        type: string;
        coordinates: number[];
    };
    maxRadiusKm?: number;
}

const VolunteerProfileSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    homeAddress: { type: String, required: true },
    homeLocation: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    maxRadiusKm: { type: Number, default: 10 }
});

VolunteerProfileSchema.index({ homeLocation: '2dsphere' });

export default mongoose.model<IVolunteerProfile>('VolunteerProfile', VolunteerProfileSchema);
