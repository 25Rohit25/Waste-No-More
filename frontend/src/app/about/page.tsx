"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Heart, Leaf, Target, Github, Linkedin, Mail, Globe, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="min-h-screen bg-background pt-20 md:pt-32 pb-20 overflow-hidden relative">
            {/* Custom Cursor Glow */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-screen"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div 
                    className={`transition-all duration-300 ease-out rounded-full blur-[80px] bg-primary/40 ${
                        isClicked ? 'w-64 h-64 md:w-[400px] md:h-[400px] bg-primary/60 blur-[100px]' : 'w-32 h-32 md:w-64 md:h-64'
                    }`}
                />
            </motion.div>

            {/* Background ambient glows */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-5xl mx-auto mb-20 md:mb-32 relative"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
                        <Globe className="w-4 h-4" />
                        <span>Empowering Communities Worldwide</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
                        Redefining Food <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-500 to-emerald-400">
                            Recovery Logistics
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                        We are building the world's most efficient food recovery network. By connecting surplus with need in real-time, we solve two monumental problems at once: food waste and hunger.
                    </p>
                </motion.div>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
                    {[
                        { label: "Meals Saved", value: "50K+", icon: Heart, color: "text-rose-500" },
                        { label: "Active Donors", value: "1,200", icon: Users, color: "text-blue-500" },
                        { label: "Cities Reached", value: "15", icon: Globe, color: "text-indigo-500" },
                        { label: "CO₂ Reduced (kg)", value: "25K", icon: Leaf, color: "text-green-500" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 text-center hover:bg-card/80 transition-colors shadow-sm"
                        >
                            <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color} opacity-80`} />
                            <h4 className="text-3xl md:text-4xl font-black mb-2">{stat.value}</h4>
                            <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Values Section */}
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2rem] overflow-hidden aspect-square md:aspect-[4/3] shadow-2xl group border border-border/50"
                    >
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                            alt="Volunteers helping"
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="font-black text-3xl md:text-4xl mb-3">Community First</p>
                            <p className="text-white/80 text-lg md:text-xl font-medium">Building bridges through shared meals and real-time logistics.</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col justify-center space-y-8 md:space-y-12">
                        <div className="mb-4">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Core Pillars</h2>
                            <p className="text-muted-foreground text-lg md:text-xl">Technology meets compassion. Here is how we operate.</p>
                        </div>
                        {[
                            { icon: Zap, title: "Real-time Efficiency", desc: "Our geospatial algorithms match surplus food with the nearest available volunteers instantly, ensuring zero spoilage.", color: "text-amber-500", bg: "bg-amber-500/10" },
                            { icon: Target, title: "Hyper-local Impact", desc: "We focus on neighborhood-level logistics. Neighbors helping neighbors creates the most resilient communities.", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: Shield, title: "Transparent & Safe", desc: "Every donation is tracked from pickup to delivery. We ensure food safety guidelines are met at every step.", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex gap-4 md:gap-6 group"
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-border/50`}>
                                    <item.icon className="w-7 h-7 md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-10 md:mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
                    
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Meet the Visionary</h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">The architect behind Waste-No-More's backend infrastructure and platform vision.</p>
                    </div>

                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-12 text-center hover:border-primary/30 transition-all duration-500 max-w-md w-full shadow-2xl hover:shadow-primary/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full p-1 bg-gradient-to-br from-primary via-blue-500 to-green-500 mb-8 group-hover:scale-105 transition-transform duration-500 shadow-xl">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-card bg-muted">
                                    <img src="/images/founder.jpg" alt="Rohit Singh" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="font-black text-3xl md:text-4xl mb-2 tracking-tight">Rohit Singh</h3>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                                    <Target className="w-4 h-4" />
                                    Founder & Lead Engineer
                                </div>
                                <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed">Passionate about designing robust, distributed systems to solve real-world problems and drive sustainable, global impact.</p>

                                <div className="flex justify-center gap-4 md:gap-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 duration-300">
                                    <a href="https://www.linkedin.com/in/rohit-singh-75428a311/" target="_blank" rel="noopener noreferrer">
                                        <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors border-border/50 shadow-sm"><Linkedin className="w-5 h-5" /></Button>
                                    </a>
                                    <a href="https://github.com/25Rohit25" target="_blank" rel="noopener noreferrer">
                                        <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors border-border/50 shadow-sm"><Github className="w-5 h-5" /></Button>
                                    </a>
                                    <a href="mailto:singhrohit14629@gmail.com">
                                        <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors border-border/50 shadow-sm"><Mail className="w-5 h-5" /></Button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
