import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
    DONOR = 'DONOR',
    RECEIVER = 'RECEIVER',
    VOLUNTEER = 'VOLUNTEER',
    ADMIN = 'ADMIN'
}

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    phone: { type: String },
    avatar: { type: String },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
