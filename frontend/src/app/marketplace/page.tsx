"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Gift, Coffee, Ticket, ArrowRight, Star, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const REWARDS = [
    {
        id: 1,
        title: "$10 Grocery Voucher",
        cost: 500,
        icon: ShoppingBag,
        color: "text-green-500",
        bg: "bg-green-500/10",
        description: "Valid at Whole Foods, Trader Joe's, and local partners.",
        category: "Voucher"
    },
    {
        id: 2,
        title: "Free Coffee",
        cost: 150,
        icon: Coffee,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        description: "Enjoy a medium coffee at any participating cafe.",
        category: "Food & Drink"
    },
    {
        id: 3,
        title: "Movie Ticket",
        cost: 800,
        icon: Ticket,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        description: "One standard admission ticket to AMC or Regal cinemas.",
        category: "Entertainment"
    },
    {
        id: 4,
        title: "Donation Boost",
        cost: 1000,
        icon: Gift,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        description: "We donate $5 to a food bank on your behalf.",
        category: "Charity"
    },
    {
        id: 5,
        title: "Premium Badge",
        cost: 2000,
        icon: Star,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        description: "Unlock the 'Gold Donor' badge on your profile.",
        category: "Profile"
    },
    {
        id: 6,
        title: "Local Bakery Box",
        cost: 600,
        icon: ShoppingBag,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        description: "A surprise box of pastries from local bakeries.",
        category: "Food & Drink"
    }
];

export default function MarketplacePage() {
    const [points, setPoints] = useState(1250);

    const handleRedeem = (cost: number) => {
        if (points >= cost) {
            setPoints(points - cost);
            alert("Reward redeemed! Check your email for details.");
        } else {
            alert("Not enough points!");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary" className="px-3 py-1 text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Sparkles className="w-3 h-3 mr-1" /> Rewards Store
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Redeem Your Impact
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Turn your community contributions into real-world rewards. Every meal saved earns you points towards these exclusive perks.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card px-8 py-6 rounded-3xl flex items-center gap-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Your Balance</p>
                            <p className="text-4xl font-extrabold text-primary tabular-nums">{points.toLocaleString()}</p>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
                            <Star className="w-8 h-8 fill-current" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {REWARDS.map((reward, index) => (
                        <motion.div
                            key={reward.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card rounded-3xl p-1 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="bg-card/50 rounded-[20px] p-6 h-full flex flex-col relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-32 h-32 ${reward.bg} rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out`} />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl ${reward.bg} ${reward.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sm`}>
                                        <reward.icon className="w-8 h-8" />
                                    </div>
                                    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20">
                                        {reward.category}
                                    </Badge>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{reward.title}</h3>
                                <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">
                                    {reward.description}
                                </p>

                                <div className="flex items-center justify-between gap-4 mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground font-medium uppercase">Cost</span>
                                        <span className="text-xl font-bold text-primary">{reward.cost} pts</span>
                                    </div>
                                    <Button
                                        onClick={() => handleRedeem(reward.cost)}
                                        disabled={points < reward.cost}
                                        className={`rounded-xl px-6 h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all ${points < reward.cost ? 'opacity-50' : 'hover:scale-105'}`}
                                        variant={points < reward.cost ? "secondary" : "default"}
                                    >
                                        {points < reward.cost ? "Need Points" : "Redeem"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
