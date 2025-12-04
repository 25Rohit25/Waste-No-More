import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { MapPin, Package } from 'lucide-react';
import { toast } from 'sonner'; // Assuming sonner is installed, or use alert for now but cleaner

interface Donation {
    _id: string;
    title: string;
    pickupAddress: string;
    quantity: number;
    unit: string;
}

export default function AvailableTasks() {
    const queryClient = useQueryClient();
    const { data: donations, isLoading } = useQuery({
        queryKey: ['availableTasks'],
        queryFn: async () => {
            // Hardcoded lat/lng for demo purposes
            const res = await api.get('/tasks/available?lat=40.730610&lng=-73.935242&radius=10');
            return res.data;
        },
    });

    const claimTask = async (id: string) => {
        try {
            await api.post(`/tasks/${id}/claim`);
            queryClient.invalidateQueries({ queryKey: ['availableTasks'] });
            queryClient.invalidateQueries({ queryKey: ['myTasks'] });
            // Ideally use a toast here
            toast.success('Task claimed successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to claim task');
        }
    };

    if (isLoading) return <div className="p-4 text-center text-muted-foreground">Loading available tasks...</div>;

    if (!donations || donations.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>No tasks available nearby.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {donations.map((d: Donation) => (
                <div key={d._id} className="bg-background p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{d.title}</h3>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            New
                        </span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {d.pickupAddress}
                        </div>
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            {d.quantity} {d.unit}
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => claimTask(d._id)}>
                        Accept Task
                    </Button>
                </div>
            ))}
        </div>
    );
}
