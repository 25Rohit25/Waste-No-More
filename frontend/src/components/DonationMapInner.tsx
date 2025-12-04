"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Donation {
    _id: string;
    title: string;
    pickupAddress: string;
    quantity: number;
    unit: string;
    pickupLocation: {
        coordinates: number[];
    };
}

export default function DonationMapInner() {
    const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        // Fix for default marker icon
        const icon = L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        setCustomIcon(icon);

        // Fetch real donations
        const fetchDonations = async () => {
            try {
                const res = await api.get('/donations');
                setDonations(res.data);
            } catch (err) {
                console.error("Failed to fetch map donations", err);
            }
        };
        fetchDonations();
    }, []);

    const handleClaim = async (id: string) => {
        try {
            await api.post(`/donations/${id}/claim`);
            alert("Donation claimed successfully!");
            // Refresh donations
            const res = await api.get('/donations');
            setDonations(res.data);
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to claim donation");
        }
    };

    if (!customIcon) return null;

    return (
        <MapContainer
            center={[40.7128, -74.0060]} // Default to NY, or use user location
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {donations.map((donation) => (
                // GeoJSON is [lng, lat], Leaflet wants [lat, lng]
                <Marker
                    key={donation._id}
                    position={[donation.pickupLocation.coordinates[1], donation.pickupLocation.coordinates[0]]}
                    icon={customIcon}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-sm">{donation.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                                {donation.quantity} {donation.unit} • {donation.pickupAddress}
                            </p>
                            <button
                                onClick={() => handleClaim(donation._id)}
                                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full w-full font-medium hover:bg-primary/90 transition-colors"
                            >
                                Claim Donation
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
