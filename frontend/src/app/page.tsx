"use client";

import Hero from "@/components/landing/Hero";
import LiveFeed from "@/components/landing/LiveFeed";
import ImpactStats from "@/components/landing/ImpactStats";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Hero />
      <LiveFeed />
      <ImpactStats />

      <Features />

      <CTA />
    </div>
  );
}
