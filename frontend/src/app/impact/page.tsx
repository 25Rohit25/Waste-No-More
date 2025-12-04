"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Utensils, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
    {
        label: "Meals Saved",
        value: "12,500+",
        icon: Utensils,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        delay: 0.1
    },
    {
        label: "CO2 Prevented",
        value: "4,200 kg",
        icon: Leaf,
        color: "text-green-500",
        bg: "bg-green-500/10",
        delay: 0.2
    },
    {
        label: "People Served",
        value: "8,900+",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        delay: 0.3
    },
    {
        label: "Active Partners",
        value: "150+",
        icon: TrendingUp,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        delay: 0.4
    }
];

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 mb-20">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Making a <span className="text-primary">Measurable Difference</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Transparency is at our core. Track the real-time environmental and social impact of the Waste-No-More community.
                        </p>
                    </motion.div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            </section>

            {/* Stats Grid */}
            <section className="px-4 sm:px-6 lg:px-8 mb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Visual Impact Section */}
            <section className="px-4 sm:px-6 lg:px-8 mb-24">
                <div className="max-w-7xl mx-auto bg-secondary/30 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Every Meal Counts</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                When you donate food, you're not just feeding someone; you're preventing methane emissions from landfills and saving the water and energy used to produce that food.
                            </p>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Monthly Goal</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "85%" }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-primary rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Community Growth</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "92%" }}
                                            transition={{ duration: 1, delay: 0.4 }}
                                            className="h-full bg-blue-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <Link href="/register">
                                    <Button size="lg" className="rounded-full px-8">
                                        Start Your Impact <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/impact.jpg"
                                    alt="Environmental Impact"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-xl border border-border max-w-[200px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <Leaf className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-lg">Active</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Reducing carbon footprint daily.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
