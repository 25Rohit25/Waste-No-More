"use client";

import TaskList from '@/components/TaskList';
import AvailableTasks from '@/components/AvailableTasks';
import DonationMap from '@/components/DonationMap';
import RecipeGenerator from '@/components/RecipeGenerator';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function VolunteerDashboard() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Volunteer Dashboard</h1>
                    <p className="text-lg text-muted-foreground">Find tasks nearby and track your impact.</p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                    <MapPin className="w-5 h-5" />
                                </span>
                                Live Donation Map
                            </h2>
                            <DonationMap />
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
                            <AvailableTasks />
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <RecipeGenerator />
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
                            <TaskList />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
