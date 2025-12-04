"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary -z-20" />

            {/* Animated Background Circles */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 -z-10"
            />

            <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                >
                    Ready to eliminate food waste?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl opacity-90 mb-10 max-w-2xl mx-auto"
                >
                    Join thousands of businesses and volunteers making a tangible difference today.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/register?role=DONOR">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto font-bold text-primary shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Register as Donor
                        </Button>
                    </Link>
                    <Link href="/register?role=VOLUNTEER">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all hover:scale-105">
                            Join as Volunteer
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
