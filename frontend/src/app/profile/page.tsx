"use client";

import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Edit2, Camera, Save, Award, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Green Earth Cafe",
        email: "contact@greenearth.com",
        location: "New York, NY",
        joined: "October 2023",
        role: "Donor",
        bio: "Dedicated to serving fresh, organic food and minimizing waste in our community."
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Cover Image */}
                    <div className="h-64 bg-gradient-to-r from-primary/80 via-green-600 to-emerald-800 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <button className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="px-8 pb-12">
                        <div className="relative flex flex-col md:flex-row justify-between items-end -mt-20 mb-10 gap-4">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-3xl border-4 border-card bg-secondary overflow-hidden shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-300">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform hover:bg-primary/90">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 md:mb-4 md:ml-4">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider border border-primary/20 shadow-sm">
                                        {user.role}
                                    </span>
                                    <span className="flex items-center gap-1 text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {user.location}
                                    </span>
                                    <span className="flex items-center gap-1 text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Joined {user.joined}
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                variant={isEditing ? "default" : "outline"}
                                className={`rounded-xl h-12 px-6 shadow-lg transition-all hover:scale-105 active:scale-95 md:mb-4 ${isEditing ? "bg-primary hover:bg-primary/90" : "bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40"
                                    }`}
                            >
                                {isEditing ? (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </>
                                ) : (
                                    <>
                                        <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="grid lg:grid-cols-[1fr,350px] gap-10">
                            {/* Left Column: Personal Info */}
                            <div className="space-y-8">
                                <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <User className="w-5 h-5 text-primary" />
                                        Personal Information
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    value={user.name}
                                                    disabled={!isEditing}
                                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                    className="pl-11 h-12 rounded-xl bg-white/50 dark:bg-black/20 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    value={user.email}
                                                    disabled={!isEditing}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                    className="pl-11 h-12 rounded-xl bg-white/50 dark:bg-black/20 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    value={user.location}
                                                    disabled={!isEditing}
                                                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                                                    className="pl-11 h-12 rounded-xl bg-white/50 dark:bg-black/20 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Bio</label>
                                            <textarea
                                                value={user.bio}
                                                disabled={!isEditing}
                                                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                className="w-full min-h-[100px] p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-border/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Stats */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    Impact Overview
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-green-500/5 border border-primary/10 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-primary">1,250</p>
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Impact Points</p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/10 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600">
                                            <Heart className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-blue-600">45</p>
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Donations Made</p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/10 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600">
                                            <Leaf className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-orange-600">120kg</p>
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Food Saved</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                                    <h3 className="font-semibold mb-4">Achievements</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Early Adopter', 'Top Donor', 'Waste Warrior', 'Community Star'].map((badge, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/50 dark:bg-black/20 border border-border/50 rounded-full text-xs font-medium text-muted-foreground">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
