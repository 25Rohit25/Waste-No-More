"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Utensils, Truck, Globe } from "lucide-react";

const stats = [
    { label: "Meals Saved", value: 2500000, suffix: "+", icon: Utensils, color: "text-orange-500" },
    { label: "Active Donors", value: 15000, suffix: "+", icon: Users, color: "text-blue-500" },
    { label: "CO2 Prevented", value: 850, suffix: "t", icon: Globe, color: "text-green-500" },
    { label: "Cities Covered", value: 120, suffix: "+", icon: Truck, color: "text-purple-500" },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, value, spring]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function ImpactStats() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                    >
                        Our Collective Impact
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-lg"
                    >
                        Every donation counts. Together, we are building a more sustainable future.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all hover:-translate-y-1 duration-300 border border-transparent hover:border-primary/10"
                        >
                            <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl bg-background shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-2 tabular-nums tracking-tight">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
