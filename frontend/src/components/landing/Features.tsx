"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Zap, HeartHandshake, BarChart3, Globe2 } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Real-Time Matching",
        description: "Our AI-driven algorithm instantly matches surplus food with the nearest available receiver, minimizing travel time and spoilage.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    {
        icon: ShieldCheck,
        title: "Verified Partners",
        description: "Every donor and receiver is vetted. We ensure safety and compliance with food handling standards for peace of mind.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        icon: BarChart3,
        title: "Impact Analytics",
        description: "Track your contributions with detailed reports. See exactly how many meals you've saved and CO2 emissions prevented.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: Globe2,
        title: "Hyper-Local Network",
        description: "We focus on neighborhood-level connections to build resilient local food systems and reduce transportation carbon footprint.",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        icon: HeartHandshake,
        title: "Volunteer Power",
        description: "Our gig-economy style app allows volunteers to pick up delivery tasks on-demand, ensuring food gets where it needs to go.",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
    {
        icon: Leaf,
        title: "Zero Waste Goal",
        description: "We help businesses achieve their sustainability goals by providing a seamless, tax-deductible way to handle surplus.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        Why leading organizations trust <span className="text-primary">Waste-No-More</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        A complete ecosystem designed to make food recovery effortless, transparent, and scalable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed relative z-10">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
