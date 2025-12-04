import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component or use standard div
import { Calendar, Package } from 'lucide-react';

interface Donation {
    _id: string;
    title: string;
    category: string;
    quantity: number;
    unit: string;
    status: string;
    expiresAt: string;
}

export default function DonationList({ role, queryParams }: { role: string, queryParams?: string }) {
    const { data: donations, isLoading, error } = useQuery({
        queryKey: ['donations', role, queryParams],
        queryFn: async () => {
            const res = await api.get(`/donations${queryParams || ''}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-muted-foreground text-center py-4">Loading donations...</div>;
    if (error) return <div className="text-destructive text-center py-4">Error loading donations</div>;

    return (
        <div className="space-y-4">
            {donations.length === 0 ? (
                <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed border-border">
                    <p className="text-muted-foreground">No donations found.</p>
                    {role === 'DONOR' && (
                        <Link href="/donations/create">
                            <Button className="mt-4">Create your first donation</Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className={role === 'RECEIVER' ? "space-y-4" : "grid gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                    {donations.map((donation: Donation) => (
                        <div key={donation._id} className="bg-card p-5 rounded-xl shadow-sm border border-border hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">{donation.title}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${donation.status === 'OPEN' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                                    donation.status === 'CLAIMED' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                        'bg-muted text-muted-foreground'
                                    }`}>
                                    {donation.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Package className="w-4 h-4 mr-2 opacity-70" />
                                    <span>{donation.quantity} {donation.unit} • {donation.category}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                    <span>Expires: {new Date(donation.expiresAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Link href={`/donations/${donation._id}`} className="block">
                                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground border-primary/20">View Details</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
