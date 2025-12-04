"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, TrendingUp, Crown, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Green Earth Cafe", role: "DONOR", points: 12500, meals: 450, badge: "Eco Hero", avatar: "green" },
    { rank: 2, name: "John Doe", role: "VOLUNTEER", points: 9800, meals: 320, badge: "Speedster", avatar: "john" },
    { rank: 3, name: "City Bakery", role: "DONOR", points: 8400, meals: 280, badge: "Community Pillar", avatar: "city" },
    { rank: 4, name: "Sarah Smith", role: "VOLUNTEER", points: 7200, meals: 210, badge: "Reliable", avatar: "sarah" },
    { rank: 5, name: "Fresh Market", role: "DONOR", points: 6500, meals: 190, badge: "Supporter", avatar: "fresh" },
    { rank: 6, name: "Mike Ross", role: "VOLUNTEER", points: 5400, meals: 150, badge: "Rookie", avatar: "mike" },
    { rank: 7, name: "Daily Bread", role: "DONOR", points: 4200, meals: 120, badge: "Contributor", avatar: "daily" },
];

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4"
                    >
                        <Trophy className="w-8 h-8 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Impact Leaderboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Celebrating the top changemakers who are driving our mission forward.
                    </motion.p>
                </div>

                {/* Top 3 Podium */}
                <div className="flex justify-center items-end gap-4 md:gap-8 mb-20 h-80 px-4">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "70%", opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        className="w-1/3 max-w-[180px] glass-card rounded-t-3xl flex flex-col items-center justify-end p-6 border-t border-x border-white/20 relative group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute -top-12 md:-top-16 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-300 shadow-xl overflow-hidden mb-2"
                            >
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[1].avatar}`} />
                                    <AvatarFallback>2</AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold shadow-lg -mt-6 z-10">
                                2
                            </div>
                        </div>
                        <div className="text-center mt-8 w-full">
                            <p className="font-bold truncate w-full text-lg">{LEADERBOARD_DATA[1].name}</p>
                            <p className="text-sm text-primary font-semibold">{LEADERBOARD_DATA[1].points.toLocaleString()} pts</p>
                            <div className="mt-2 flex justify-center">
                                <span className="text-[10px] px-2 py-0.5 bg-gray-500/10 text-gray-500 rounded-full font-bold uppercase tracking-wider">
                                    {LEADERBOARD_DATA[1].role}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100%", opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                        className="w-1/3 max-w-[200px] glass-card bg-gradient-to-b from-primary/20 to-transparent rounded-t-3xl flex flex-col items-center justify-end p-6 border-t border-x border-primary/30 relative z-10 group hover:from-primary/30 transition-colors shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                    >
                        <div className="absolute -top-16 md:-top-20 flex flex-col items-center">
                            <div className="absolute -top-8 text-yellow-500 animate-bounce">
                                <Crown className="w-8 h-8 fill-current" />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden mb-2"
                            >
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[0].avatar}`} />
                                    <AvatarFallback>1</AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xl shadow-lg -mt-8 z-10">
                                1
                            </div>
                        </div>
                        <div className="text-center mt-12 w-full">
                            <p className="font-bold text-xl truncate w-full">{LEADERBOARD_DATA[0].name}</p>
                            <p className="text-lg font-bold text-primary">{LEADERBOARD_DATA[0].points.toLocaleString()} pts</p>
                            <div className="mt-2 flex justify-center">
                                <span className="px-3 py-1 bg-yellow-400/20 text-yellow-600 text-xs rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    {LEADERBOARD_DATA[0].badge}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "50%", opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                        className="w-1/3 max-w-[180px] glass-card rounded-t-3xl flex flex-col items-center justify-end p-6 border-t border-x border-white/20 relative group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute -top-12 md:-top-16 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.9 }}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-400 shadow-xl overflow-hidden mb-2"
                            >
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[2].avatar}`} />
                                    <AvatarFallback>3</AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-orange-900 font-bold shadow-lg -mt-6 z-10">
                                3
                            </div>
                        </div>
                        <div className="text-center mt-8 w-full">
                            <p className="font-bold truncate w-full text-lg">{LEADERBOARD_DATA[2].name}</p>
                            <p className="text-sm text-primary font-semibold">{LEADERBOARD_DATA[2].points.toLocaleString()} pts</p>
                            <div className="mt-2 flex justify-center">
                                <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-600 rounded-full font-bold uppercase tracking-wider">
                                    {LEADERBOARD_DATA[2].role}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Full List */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card rounded-3xl overflow-hidden shadow-xl"
                >
                    <div className="grid grid-cols-12 gap-4 p-5 border-b border-white/10 bg-black/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                        <div className="col-span-6 md:col-span-5">User</div>
                        <div className="col-span-2 md:col-span-3 text-right hidden md:block">Meals Saved</div>
                        <div className="col-span-4 md:col-span-3 text-right">Points</div>
                    </div>

                    <div className="divide-y divide-white/10">
                        {LEADERBOARD_DATA.slice(3).map((user, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + (index * 0.1) }}
                                key={index}
                                className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                                <div className="col-span-2 md:col-span-1 text-center font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                    #{user.rank}
                                </div>
                                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                    <Avatar className="w-10 h-10 border-2 border-transparent group-hover:border-primary transition-all">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm group-hover:text-primary transition-colors">{user.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{user.role}</p>
                                    </div>
                                </div>
                                <div className="col-span-2 md:col-span-3 text-right font-mono text-sm hidden md:block text-muted-foreground">
                                    {user.meals}
                                </div>
                                <div className="col-span-4 md:col-span-3 text-right font-bold text-primary flex items-center justify-end gap-2">
                                    {user.points.toLocaleString()}
                                    <Star className="w-3 h-3 fill-current opacity-50" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
