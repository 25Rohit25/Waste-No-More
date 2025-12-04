import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
    ASSIGNED = 'ASSIGNED',
    IN_TRANSIT = 'IN_TRANSIT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface IVolunteerTask extends Document {
    donation: mongoose.Types.ObjectId;
    volunteer: mongoose.Types.ObjectId;
    pickupEta?: Date;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

const VolunteerTaskSchema: Schema = new Schema({
    donation: { type: Schema.Types.ObjectId, ref: 'Donation', required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pickupEta: { type: Date },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.ASSIGNED }
}, { timestamps: true });

export default mongoose.model<IVolunteerTask>('VolunteerTask', VolunteerTaskSchema);
