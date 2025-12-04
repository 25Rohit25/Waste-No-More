"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Sparkles, Send, Paperclip, FileIcon, User, VideoIcon, ImageIcon, Search, Check, CheckCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define Message interface
interface Message {
    id: string;
    _id?: string; // MongoDB ID
    user: string;
    text: string;
    timestamp: string;
    role: string;
    type?: 'text' | 'image' | 'video' | 'file';
    fileUrl?: string;
    originalName?: string;
    to?: string;
    from?: string;
    conversationId?: string;
    message?: string;
    isPrivate?: boolean;
    otherUser?: string;
    read?: boolean;
}

export default function CommunityChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [privateMessages, setPrivateMessages] = useState<Record<string, Message[]>>({});
    const [activeChat, setActiveChat] = useState<string>("global");
    const [inputText, setInputText] = useState("");
    const [user, setUser] = useState<any>(null);
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    // New Features State
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUserProfile, setSelectedUserProfile] = useState<any>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const activeChatRef = useRef(activeChat);

    // Keep activeChatRef in sync
    useEffect(() => {
        activeChatRef.current = activeChat;
    }, [activeChat]);

    // Initialize User & Socket
    useEffect(() => {
        const userData = localStorage.getItem("user");
        let currentUser = null;

        if (userData) {
            currentUser = JSON.parse(userData);
            setUser(currentUser);
        }

        if (currentUser) {
            // Request Notification Permission
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }

            const newSocket = io("http://localhost:5000", {
                query: {
                    userId: currentUser.name,
                    userRole: currentUser.role
                }
            });
            setSocket(newSocket);

            newSocket.on("connect", () => {
                console.log("Connected to socket server");
            });

            newSocket.on("chat_message", (msg: Message) => {
                setMessages((prev) => [...prev, msg]);
                if (document.hidden && Notification.permission === "granted") {
                    new Notification("New Global Message", { body: `${msg.user}: ${msg.text || 'Sent a file'}` });
                }
            });

            newSocket.on("private_message", (msg: any) => {
                const conversationId = msg.conversationId;
                setPrivateMessages(prev => ({
                    ...prev,
                    [conversationId]: [...(prev[conversationId] || []), msg]
                }));

                if (document.hidden && Notification.permission === "granted" && msg.user !== currentUser.name) {
                    new Notification(`New Message from ${msg.user}`, { body: msg.text || 'Sent a file' });
                }
            });

            newSocket.on("online_users", (users: any[]) => {
                const uniqueUsers = Array.from(new Map(users.map(u => [u.name, u])).values());
                setOnlineUsers(uniqueUsers.filter((u: any) => u.name !== currentUser.name));
            });

            // Typing Listeners
            newSocket.on("typing", (data: any) => {
                const currentChat = activeChatRef.current;
                // If private typing, only show if I'm chatting with that person
                if (data.isPrivate && data.from !== currentChat) return;
                // If global typing, only show if I'm in global chat
                if (!data.isPrivate && currentChat !== 'global') return;
                // If private typing and I'm chatting with them (redundant check but safe)
                if (data.isPrivate && currentChat !== data.from) return;

                setTypingUsers(prev => new Set(prev).add(data.from));
            });

            newSocket.on("stop_typing", (data: any) => {
                setTypingUsers(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(data.from);
                    return newSet;
                });
            });

            // Read Receipt Listener
            newSocket.on("message_read", (data: any) => {
                const { messageId, readerId } = data;
                setPrivateMessages(prev => {
                    const newMap = { ...prev };
                    for (const key in newMap) {
                        newMap[key] = newMap[key].map(m =>
                            (m.id === messageId || m._id === messageId) ? { ...m, read: true } : m
                        );
                    }
                    return newMap;
                });
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, []); // Removed activeChat dependency

    // Fetch Messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            try {
                let url = '';
                if (activeChat === 'global') {
                    url = `http://localhost:5000/api/chat/messages?room=global&search=${searchQuery}`;
                } else {
                    url = `http://localhost:5000/api/chat/messages?user1=${user.name}&user2=${activeChat}&search=${searchQuery}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (activeChat === 'global') {
                    setMessages(data);
                } else {
                    setPrivateMessages(prev => ({ ...prev, [activeChat]: data }));
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        // Debounce search
        const timeoutId = setTimeout(() => fetchMessages(), 300);
        return () => clearTimeout(timeoutId);
    }, [activeChat, user, searchQuery]);

    const currentMessages = activeChat === "global" ? messages : (privateMessages[activeChat] || []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages.length, activeChat]);

    useEffect(() => {
        // Mark messages as read when viewing
        if (activeChat !== 'global' && privateMessages[activeChat]) {
            const unreadMessages = privateMessages[activeChat].filter(m => !m.read && m.user !== user?.name);
            unreadMessages.forEach(m => {
                if (socket) {
                    socket.emit('mark_read', { messageId: m._id || m.id, readerId: user.name, senderId: m.user });
                }
            });
        }
    }, [currentMessages, activeChat, user, socket]);

    const handleTyping = () => {
        if (!socket || !user) return;
        socket.emit('typing', { to: activeChat === 'global' ? undefined : activeChat, from: user.name, isPrivate: activeChat !== 'global' });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stop_typing', { to: activeChat === 'global' ? undefined : activeChat, from: user.name, isPrivate: activeChat !== 'global' });
        }, 1000);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user || !socket) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.url) {
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const messageData = {
                    to: activeChat === "global" ? undefined : activeChat,
                    from: user.name,
                    message: "",
                    timestamp,
                    role: user.role,
                    type: data.type,
                    fileUrl: `http://localhost:5000${data.url}`,
                    originalName: data.originalName
                };

                if (activeChat === "global") {
                    socket.emit("chat_message", { ...messageData, id: Date.now().toString(), user: user.name, text: "" });
                } else {
                    socket.emit("private_message", messageData);
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !user || !socket) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (activeChat === "global") {
            const messageData = {
                id: Date.now().toString(),
                user: user.name,
                text: inputText,
                timestamp,
                role: user.role,
                type: 'text'
            };
            socket.emit("chat_message", messageData);
        } else {
            const messageData = {
                to: activeChat,
                from: user.name,
                message: inputText,
                timestamp,
                role: user.role,
                type: 'text'
            };
            socket.emit("private_message", messageData);
        }

        setInputText("");
        socket.emit('stop_typing', { to: activeChat === 'global' ? undefined : activeChat, from: user.name, isPrivate: activeChat !== 'global' });
    };

    const startPrivateChat = (targetUser: any) => {
        if (targetUser.name === user.name) return;
        setActiveChat(targetUser.name);
        if (!privateMessages[targetUser.name]) {
            setPrivateMessages(prev => ({ ...prev, [targetUser.name]: [] }));
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-card/80 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Users className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Join the Community</h2>
                    <p className="text-muted-foreground mb-8 text-lg">Connect with other donors, volunteers, and receivers.</p>
                    <Button onClick={() => window.location.href = '/login'} className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
                        Log In to Chat
                    </Button>
                    <Button variant="ghost" onClick={() => {
                        const guest = { name: "Guest_" + Math.floor(Math.random() * 1000), role: "GUEST" };
                        setUser(guest);
                        localStorage.setItem("user", JSON.stringify(guest));
                        window.location.reload();
                    }} className="w-full h-12 rounded-xl">
                        Continue as Guest
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-4 px-4 md:px-8 flex flex-col">
            <div className="container mx-auto max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6 h-[calc(100vh-7rem)]">

                {/* Main Chat Area */}
                <div className="flex flex-col bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
                    {/* Decorative background blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Chat Header */}
                    <div className="p-4 border-b border-border/50 bg-white/50 dark:bg-black/20 backdrop-blur-md flex justify-between items-center z-10">
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                {activeChat === "global" ? (
                                    <>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        Community Hub
                                    </>
                                ) : (
                                    <>
                                        <span className="w-3 h-3 rounded-full bg-blue-500" />
                                        Chat with {activeChat}
                                    </>
                                )}
                            </h1>
                            <p className="text-xs text-muted-foreground mt-1">
                                {typingUsers.size > 0 ? (
                                    <span className="text-primary animate-pulse">
                                        {Array.from(typingUsers).join(", ")} is typing...
                                    </span>
                                ) : (
                                    activeChat === "global" ? "Live discussions & coordination" : "Private Conversation"
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9 pl-9 w-48 bg-background/50 border-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <AnimatePresence initial={false}>
                            {currentMessages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id || msg._id}
                                    className={`flex gap-4 ${msg.user === user.name ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        onClick={() => setSelectedUserProfile({ name: msg.user, role: msg.role })}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm cursor-pointer hover:scale-110 transition-transform ${msg.role === 'DONOR' ? 'bg-blue-100 text-blue-600' :
                                            msg.role === 'VOLUNTEER' ? 'bg-orange-100 text-orange-600' :
                                                'bg-green-100 text-green-600'
                                            }`}
                                    >
                                        <User className="w-5 h-5" />
                                    </div>

                                    <div className={`max-w-[75%] group relative`}>
                                        <div className={`flex items-baseline gap-2 mb-1 ${msg.user === user.name ? "flex-row-reverse" : ""}`}>
                                            <span className="text-xs font-bold opacity-90">{msg.user}</span>
                                            <span className="text-[10px] opacity-40">{msg.timestamp}</span>
                                        </div>

                                        <div className={`p-4 rounded-2xl shadow-sm ${msg.user === user.name
                                            ? "bg-gradient-to-br from-primary to-green-600 text-white rounded-tr-none"
                                            : "bg-white dark:bg-gray-800 border border-border rounded-tl-none"
                                            }`}>
                                            {msg.type === 'image' && msg.fileUrl && <img src={msg.fileUrl} className="rounded-lg max-w-full h-auto max-h-64 object-cover mb-2" />}
                                            {msg.type === 'video' && msg.fileUrl && <video controls src={msg.fileUrl} className="rounded-lg max-w-full h-auto max-h-64 mb-2" />}
                                            {msg.type === 'file' && msg.fileUrl && (
                                                <div className="flex items-center gap-2 p-2 bg-black/10 rounded-lg mb-2">
                                                    <FileIcon className="w-4 h-4" />
                                                    <a href={msg.fileUrl} target="_blank" className="text-sm underline">{msg.originalName}</a>
                                                </div>
                                            )}
                                            {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                                        </div>

                                        {/* Read Receipt */}
                                        {msg.user === user.name && activeChat !== 'global' && (
                                            <div className="flex justify-end mt-1">
                                                {msg.read ? (
                                                    <CheckCheck className="w-3 h-3 text-blue-500" />
                                                ) : (
                                                    <Check className="w-3 h-3 text-muted-foreground" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-5 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t border-border/50 z-10">
                        <form onSubmit={sendMessage} className="flex gap-3 items-center">
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                            <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Input
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                    handleTyping();
                                }}
                                placeholder="Type a message..."
                                className="flex-1 h-12 rounded-xl"
                            />
                            <Button type="submit" size="icon" disabled={!inputText.trim()}>
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="hidden lg:flex flex-col gap-6">
                    <div className="bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg flex-1 flex flex-col">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Conversations
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveChat("global")}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeChat === "global" ? "bg-primary/10 border border-primary/20" : "hover:bg-white/50"}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
                                <div className="text-left"><div className="font-bold text-sm">Global Chat</div></div>
                            </button>
                            {Object.keys(privateMessages).map((chatUser) => (
                                <button
                                    key={chatUser}
                                    onClick={() => setActiveChat(chatUser)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeChat === chatUser ? "bg-primary/10 border border-primary/20" : "hover:bg-white/50"}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><User className="w-5 h-5" /></div>
                                    <div className="text-left"><div className="font-bold text-sm">{chatUser}</div></div>
                                </button>
                            ))}
                        </div>

                        <div className="my-6 border-t border-border/50" />

                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            Online Users
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {onlineUsers.map((onlineUser) => (
                                <button
                                    key={onlineUser.id}
                                    onClick={() => startPrivateChat(onlineUser)}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer text-left group"
                                >
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold opacity-70">
                                            {onlineUser.name.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium group-hover:text-primary transition-colors">{onlineUser.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{onlineUser.role}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile Modal */}
            <Dialog open={!!selectedUserProfile} onOpenChange={() => setSelectedUserProfile(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                    </DialogHeader>
                    {selectedUserProfile && (
                        <div className="flex flex-col items-center py-4">
                            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <User className="w-10 h-10" />
                            </div>
                            <h2 className="text-xl font-bold">{selectedUserProfile.name}</h2>
                            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mt-2">
                                {selectedUserProfile.role}
                            </span>
                            <p className="text-center text-muted-foreground mt-4">
                                Active community member.
                                {selectedUserProfile.role === 'DONOR' ? ' Has contributed to multiple causes.' :
                                    selectedUserProfile.role === 'VOLUNTEER' ? ' Helping deliver donations.' : ' Part of our growing network.'}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
