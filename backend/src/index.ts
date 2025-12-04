import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import donationRoutes from './routes/donationRoutes';
import claimRoutes from './routes/claimRoutes';
import taskRoutes from './routes/taskRoutes';
import chatRoutes from './routes/chatRoutes';
import Message from './models/Message';

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for now, restrict in production
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Serve uploads statically
app.use('/uploads', express.static(uploadDir));

// File Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = req.file.mimetype.startsWith('image/') ? 'image' :
        req.file.mimetype.startsWith('video/') ? 'video' : 'file';

    res.json({ url: fileUrl, type: fileType, originalName: req.file.originalname });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('Waste-No-More API is running');
});

// Store connected users: socketId -> { userId, role }
const connectedUsers = new Map();

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room with the user's ID (if provided in handshake query)
    const userId = socket.handshake.query.userId as string;
    const userRole = socket.handshake.query.userRole as string;

    if (userId) {
        socket.join(userId);
        // Add to connected users map
        connectedUsers.set(socket.id, { id: userId, name: userId, role: userRole || 'GUEST' });
        console.log(`User ${userId} joined their private room`);

        // Broadcast updated user list to ALL clients
        io.emit('online_users', Array.from(connectedUsers.values()));
    }

    // Global Chat
    socket.on('chat_message', async (msg) => {
        // Save to DB
        try {
            const newMessage = new Message({
                sender: msg.user,
                recipient: 'global',
                role: msg.role,
                text: msg.text,
                type: msg.type || 'text',
                fileUrl: msg.fileUrl,
                originalName: msg.originalName,
                timestamp: new Date() // Use server time
            });
            await newMessage.save();

            // Emit with the saved timestamp to ensure sync
            io.emit('chat_message', { ...msg, timestamp: newMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        } catch (err) {
            console.error('Error saving global message:', err);
        }
    });

    // Private Chat
    socket.on('private_message', async (data) => {
        const { to, from, message, timestamp, role, type, fileUrl, originalName } = data;

        try {
            const newMessage = new Message({
                sender: from,
                recipient: to,
                role: role,
                text: message || '',
                type: type || 'text',
                fileUrl: fileUrl,
                originalName: originalName,
                timestamp: new Date()
            });
            await newMessage.save();

            const msg = {
                id: Date.now().toString(),
                user: from, // sender name
                text: message || '',
                timestamp: newMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                role,
                isPrivate: true,
                otherUser: to, // helper to identify conversation on frontend
                type: type || 'text',
                fileUrl,
                originalName
            };

            // Send to the recipient
            io.to(to).emit('private_message', { ...msg, conversationId: from });

            // Send back to sender (so it appears in their chat window)
            io.to(from).emit('private_message', { ...msg, conversationId: to });

        } catch (err) {
            console.error('Error saving private message:', err);
        }
    });

    // Typing Indicators
    socket.on('typing', (data) => {
        const { to, from, isPrivate } = data;
        if (isPrivate) {
            io.to(to).emit('typing', { from, isPrivate: true });
        } else {
            socket.broadcast.emit('typing', { from, isPrivate: false });
        }
    });

    socket.on('stop_typing', (data) => {
        const { to, from, isPrivate } = data;
        if (isPrivate) {
            io.to(to).emit('stop_typing', { from, isPrivate: true });
        } else {
            socket.broadcast.emit('stop_typing', { from, isPrivate: false });
        }
    });

    // Read Receipts
    socket.on('mark_read', async (data) => {
        const { messageId, readerId, senderId } = data;
        // Update DB
        try {
            await Message.findByIdAndUpdate(messageId, { read: true });
            // Notify sender
            if (senderId) {
                io.to(senderId).emit('message_read', { messageId, readerId });
            }
        } catch (err) {
            console.error('Error marking message read:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (connectedUsers.has(socket.id)) {
            connectedUsers.delete(socket.id);
            // Broadcast updated user list
            io.emit('online_users', Array.from(connectedUsers.values()));
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
