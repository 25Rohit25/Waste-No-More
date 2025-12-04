import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String, // 'global' or username
        required: true
    },
    role: {
        type: String,
        enum: ['DONOR', 'VOLUNTEER', 'RECEIVER', 'GUEST'],
        default: 'GUEST'
    },
    text: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'file'],
        default: 'text'
    },
    fileUrl: {
        type: String
    },
    originalName: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
