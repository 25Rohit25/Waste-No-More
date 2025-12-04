'use client';

import DonationList from '@/components/DonationList';
import DonationMap from '@/components/DonationMap';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion } from 'framer-motion';

export default function ReceiverDashboard() {
    // Fetch nearby donations
    const { data: donations = [] } = useQuery({
        queryKey: ['nearbyDonations'],
        queryFn: async () => {
            // Mock params for now
            const res = await api.get('/donations?lat=40.730610&lng=-73.935242&radius=10');
            return res.data;
        },
    });

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Receiver Dashboard</h1>
                    <p className="text-lg text-muted-foreground">Find and claim food donations near you.</p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Nearby Donations</h2>
                            <DonationList role="RECEIVER" queryParams="?lat=40.730610&lng=-73.935242&radius=10" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 h-[600px] sticky top-24"
                    >
                        <div className="bg-card border border-border rounded-xl p-1 shadow-sm h-full">
                            <DonationMap />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
