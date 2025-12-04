import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { room, user1, user2, search } = req.query;

        let query: any = {};
        if (search) {
            query.text = { $regex: search, $options: 'i' };
        }

        let messages;

        if (room === 'global') {
            messages = await Message.find({ recipient: 'global', ...query }).sort({ timestamp: 1 });
        } else if (user1 && user2) {
            // Fetch private messages between user1 and user2
            messages = await Message.find({
                $or: [
                    { sender: user1, recipient: user2 },
                    { sender: user2, recipient: user1 }
                ],
                ...query
            }).sort({ timestamp: 1 });
        } else {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        // Format messages for frontend
        const formattedMessages = messages.map(msg => ({
            id: msg._id,
            user: msg.sender,
            text: msg.text,
            timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            role: msg.role,
            type: msg.type,
            fileUrl: msg.fileUrl,
            originalName: msg.originalName,
            isPrivate: msg.recipient !== 'global',
            otherUser: msg.recipient === 'global' ? undefined : (msg.sender === String(user1) ? msg.recipient : msg.sender)
        }));

        res.json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
