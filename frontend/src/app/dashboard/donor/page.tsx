import { AlertCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DonorDashboard() {
    return (
        <div className="min-h-screen bg-background p-6 pt-24">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Donor Dashboard</h1>
                    <Button variant="outline" size="icon">
                        <Edit2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Urgent Request
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Local shelter "Safe Haven" is in urgent need of bread and dairy products for tonight's service.
                        </p>
                        <Link href="/donate">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Respond to Request
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium">Volunteer John picked up your donation.</p>
                                        <p className="text-xs text-muted-foreground">10 mins ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
