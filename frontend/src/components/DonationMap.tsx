"use client";

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// Dynamically import the map component with SSR disabled
const DonationMapInner = dynamic(
    () => import('./DonationMapInner'),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-8 h-8 animate-bounce text-primary" />
                    <p>Loading Map...</p>
                </div>
            </div>
        )
    }
);

export default function DonationMap() {
    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-border z-0 relative">
            <DonationMapInner />
        </div>
    );
}
