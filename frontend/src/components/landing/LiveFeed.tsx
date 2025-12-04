"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const ACTIVITIES = [
    { city: "New York", item: "50kg Bread", time: "2m ago" },
    { city: "London", item: "20 Meals", time: "5m ago" },
    { city: "San Francisco", item: "100 Apples", time: "12m ago" },
    { city: "Mumbai", item: "Rice Bags", time: "15m ago" },
    { city: "Berlin", item: "Canned Goods", time: "22m ago" },
];

export default function LiveFeed() {
    const [activities, setActivities] = useState(ACTIVITIES);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivities((prev) => {
                const newActivity = { ...prev[0], time: "Just now" };
                return [...prev.slice(1), newActivity];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 border-y border-border bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Live Activity
                        </h3>
                        <p className="text-sm text-muted-foreground">Real-time impact across the globe.</p>
                    </div>

                    <div className="md:w-3/4 overflow-hidden relative">
                        <div className="flex gap-4 animate-scroll">
                            {/* We duplicate for infinite scroll effect if we were using CSS animation, 
                   but for now let's just show a static list that updates */}
                            <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
                                {activities.map((activity, i) => (
                                    <motion.div
                                        key={i}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex-shrink-0 bg-background border border-border rounded-full px-4 py-2 flex items-center gap-3 shadow-sm min-w-[200px]"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{activity.item}</p>
                                            <p className="text-xs text-muted-foreground">{activity.city} • {activity.time}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none md:block hidden" />
                    </div>
                </div>
            </div>
        </section>
    );
}
