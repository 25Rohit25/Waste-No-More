'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function CreateDonationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Baked Goods',
        quantity: '',
        unit: 'items',
        pickupAddress: '',
        expiresAt: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mock location for now
            const location = { type: 'Point', coordinates: [-73.935242, 40.730610] };

            await api.post('/donations', {
                ...formData,
                quantity: Number(formData.quantity),
                pickupLocation: location
            });
            router.push('/dashboard/donor');
        } catch (error) {
            console.error('Failed to create donation', error);
            alert('Failed to create donation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Donation</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Surplus Bread"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                                <option>Baked Goods</option>
                                <option>Cooked Food</option>
                                <option>Produce</option>
                                <option>Dairy</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Unit</label>
                            <input
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                placeholder="e.g. loaves, kg, boxes"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                        <input
                            name="pickupAddress"
                            value={formData.pickupAddress}
                            onChange={handleChange}
                            placeholder="123 Main St, City"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expires At</label>
                        <input
                            type="datetime-local"
                            name="expiresAt"
                            value={formData.expiresAt}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Donation'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
