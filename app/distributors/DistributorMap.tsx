"use client";

import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type Availability = 'High' | 'Medium' | 'Low';

interface Distributor {
    id: number;
    name: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    availability: Availability;
    services: string[];
    hours: string;
}

function markerColor(level: Availability) {
    if (level === 'High') return '#00adef';
    if (level === 'Medium') return '#1668b2';
    return '#7aaed0';
}

interface DistributorMapProps {
    selected: Distributor;
    filtered: Distributor[];
    onSelect: (id: number) => void;
}

function MapMarkers({ selected, filtered, onSelect }: DistributorMapProps) {
    const RL = require('react-leaflet') as any;
    const useMap = RL.useMap as () => any;
    const map = useMap();

    React.useEffect(() => {
        const layers: L.Layer[] = [];

        const focusCircle = L.circle([selected.lat, selected.lng], {
            radius: 45000,
            color: '#1668b2',
            fillColor: '#00adef',
            fillOpacity: 0.16,
        }).addTo(map);
        layers.push(focusCircle);

        filtered.forEach((d) => {
            const color = markerColor(d.availability);
            const marker = L.circleMarker([d.lat, d.lng], {
                radius: selected.id === d.id ? 9 : 6,
                color,
                fillColor: color,
                fillOpacity: 0.95,
                weight: selected.id === d.id ? 3 : 1.5,
            }).addTo(map);
            marker.on('click', () => onSelect(d.id));
            layers.push(marker);
        });

        map.setView([selected.lat, selected.lng], 8, { animate: true });

        return () => {
            layers.forEach((layer) => map.removeLayer(layer));
        };
    }, [map, selected, filtered, onSelect]);

    return null;
}

export default function DistributorMap({ selected, filtered, onSelect }: DistributorMapProps) {
    const RL = require('react-leaflet') as any;
    const MapContainer = RL.MapContainer as React.ComponentType<any>;
    const TileLayer = RL.TileLayer as React.ComponentType<any>;

    return (
        <MapContainer
            center={[selected.lat, selected.lng] as [number, number]}
            zoom={8}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarkers selected={selected} filtered={filtered} onSelect={onSelect} />
        </MapContainer>
    );
}

