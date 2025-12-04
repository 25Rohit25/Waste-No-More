"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VideoModal } from "@/components/VideoModal";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse delay-2000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-border text-primary font-medium text-sm shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live in 50+ Cities
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                            Food recovery <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 animate-gradient-x">
                                reimagined.
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                            The enterprise-grade platform connecting surplus food with communities in need. Automated, traceable, and impactful.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <VideoModal />
                        </div>

                        <div className="pt-8 border-t border-border/50">
                            <p className="text-sm text-muted-foreground mb-4 font-medium">Trusted by innovative organizations</p>
                            <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Placeholders for logos with better styling */}
                                <div className="h-8 w-24 bg-foreground/10 rounded-md animate-pulse" />
                                <div className="h-8 w-24 bg-foreground/10 rounded-md animate-pulse delay-100" />
                                <div className="h-8 w-24 bg-foreground/10 rounded-md animate-pulse delay-200" />
                                <div className="h-8 w-24 bg-foreground/10 rounded-md animate-pulse delay-300" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
                        className="lg:w-1/2 relative perspective-1000"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-3 transform transition-transform hover:scale-[1.02] duration-500">
                            <div className="rounded-2xl overflow-hidden bg-background aspect-[4/3] relative group">
                                {/* High-quality Unsplash Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                                    alt="Community food sharing"
                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                                {/* Floating Cards with Glassmorphism */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 max-w-[220px] z-10"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-300 font-medium">Donation Verified</p>
                                            <p className="font-bold text-sm text-white">50kg Fresh Produce</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-12 left-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 max-w-[240px] z-10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50">
                                            JD
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-white">John Doe (Volunteer)</p>
                                            <p className="text-xs text-gray-300 font-medium flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                En route • 5 mins away
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] -z-10 animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
