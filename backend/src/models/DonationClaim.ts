import mongoose, { Document, Schema } from 'mongoose';

export enum ClaimStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED'
}

export interface IDonationClaim extends Document {
    donation: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    status: ClaimStatus;
    createdAt: Date;
    updatedAt: Date;
}

const DonationClaimSchema: Schema = new Schema({
    donation: { type: Schema.Types.ObjectId, ref: 'Donation', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(ClaimStatus), default: ClaimStatus.PENDING }
}, { timestamps: true });

export default mongoose.model<IDonationClaim>('DonationClaim', DonationClaimSchema);
