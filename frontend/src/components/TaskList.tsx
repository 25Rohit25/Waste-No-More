import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

interface Task {
    _id: string;
    donation: {
        title: string;
        pickupAddress: string;
        quantity: number;
        unit: string;
    };
    status: string;
}

export default function TaskList() {
    const queryClient = useQueryClient();
    const { data: tasks, isLoading } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {
            const res = await api.get('/tasks/my-tasks');
            return res.data;
        },
    });

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/tasks/${id}/status`, { status });
            queryClient.invalidateQueries({ queryKey: ['myTasks'] });
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    if (isLoading) return <div className="p-4 text-center text-muted-foreground">Loading tasks...</div>;

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>No active tasks.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task: Task) => (
                <div key={task._id} className="bg-background p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{task.donation.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${task.status === 'ASSIGNED' ? 'bg-yellow-500/10 text-yellow-500' :
                                task.status === 'IN_TRANSIT' ? 'bg-blue-500/10 text-blue-500' :
                                    'bg-green-500/10 text-green-500'
                            }`}>
                            {task.status.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {task.donation.pickupAddress}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {task.status === 'ASSIGNED' && (
                            <Button size="sm" className="w-full" onClick={() => updateStatus(task._id, 'IN_TRANSIT')}>
                                <Navigation className="w-4 h-4 mr-2" /> Start Delivery
                            </Button>
                        )}
                        {task.status === 'IN_TRANSIT' && (
                            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700" onClick={() => updateStatus(task._id, 'COMPLETED')}>
                                <CheckCircle className="w-4 h-4 mr-2" /> Complete Delivery
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
