"use client";

import { motion } from "framer-motion";
import { Users, Heart, Leaf, Target, ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-24 relative"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Our Mission is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Zero Hunger</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        We are building the world's most efficient food recovery network. By connecting surplus with need, we solve two problems at once: food waste and hunger.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                            alt="Volunteers helping"
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="font-bold text-2xl mb-2">Community First</p>
                            <p className="opacity-90">Building bridges through shared meals.</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col justify-center space-y-12">
                        {[
                            { icon: Target, title: "Efficiency First", desc: "We use technology to optimize logistics, ensuring food reaches those in need while it's still fresh.", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: Heart, title: "Community Driven", desc: "We believe in the power of local communities. Neighbors helping neighbors is the most sustainable model.", color: "text-rose-500", bg: "bg-rose-500/10" },
                            { icon: Leaf, title: "Environmental Impact", desc: "Reducing food waste is one of the most effective ways to combat climate change.", color: "text-green-500", bg: "bg-green-500/10" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex gap-6 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Meet the Founder</h2>
                        <p className="text-muted-foreground text-lg">The visionary behind the platform.</p>
                    </div>

                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group bg-card border border-border rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 max-w-md w-full"
                        >
                            <div className="w-48 h-48 mx-auto rounded-full p-1 bg-gradient-to-br from-primary to-blue-500 mb-8 group-hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-card">
                                    <img src="/images/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <h3 className="font-bold text-3xl mb-2">Rohit Singh</h3>
                            <p className="text-primary font-medium mb-6 text-lg">Visionary & Leader</p>
                            <p className="text-muted-foreground mb-8 text-lg">Passionate about using technology to solve real-world problems and create sustainable impact.</p>

                            <div className="flex justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <a href="https://www.linkedin.com/in/rohit-singh-75428a311/" target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary"><Linkedin className="w-6 h-6" /></Button>
                                </a>
                                <a href="https://github.com/25Rohit25" target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary"><Github className="w-6 h-6" /></Button>
                                </a>
                                <a href="mailto:singhrohit14629@gmail.com">
                                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary"><Mail className="w-6 h-6" /></Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
