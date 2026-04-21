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
    if (level === 'High') return '#5bb63a';
    if (level === 'Medium') return '#0d55a0';
    return '#33a4df';
}

interface DistributorMapProps {
    selected: Distributor;
    filtered: Distributor[];
    onSelect: (id: number) => void;
    userLocation?: { lat: number; lng: number } | null;
}

function MapMarkers({ selected, filtered, onSelect, userLocation }: DistributorMapProps) {
    const RL = require('react-leaflet') as any;
    const useMap = RL.useMap as () => any;
    const map = useMap();
    const initialFit = React.useRef(false);

    React.useEffect(() => {
        const layers: L.Layer[] = [];

        const focusCircle = L.circle([selected.lat, selected.lng], {
            radius: 45000,
            color: '#0d55a0',
            fillColor: '#5bb63a',
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

        if (!initialFit.current) {
            map.setView([selected.lat, selected.lng], 8, { animate: true });
        }

        return () => {
            layers.forEach((layer) => map.removeLayer(layer));
        };
    }, [map, selected, filtered, onSelect]);

    React.useEffect(() => {
        if (!userLocation) return;

        const userIcon = L.divIcon({
            className: 'custom-user-pin',
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-12 h-12 bg-[#0d55a0]/20 rounded-full animate-ping"></div>
                    <div class="w-[14px] h-[14px] bg-[#33a4df] border-2 border-white rounded-full shadow-[0_0_10px_rgba(51,164,223,0.8)] z-[600]"></div>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });
        const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);

        if (!initialFit.current && filtered.length > 0) {
            initialFit.current = true;
            const bounds = L.latLngBounds(
                [userLocation.lat, userLocation.lng],
                [filtered[0].lat, filtered[0].lng]
            );
            map.fitBounds(bounds, { padding: [60, 60], animate: true, maxZoom: 12 });
        }

        return () => { map.removeLayer(userMarker); };
    }, [map, userLocation, filtered]);

    return null;
}

function TrackpadScroll() {
    const RL = require('react-leaflet') as any;
    const map = RL.useMap();

    React.useEffect(() => {
        const container = map.getContainer();
        
        map.scrollWheelZoom.disable();
        map.options.zoomSnap = 0;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (e.ctrlKey || e.metaKey) {
                const rect = container.getBoundingClientRect();
                const mousePoint = L.point(e.clientX - rect.left, e.clientY - rect.top);
                const zoomDelta = -(e.deltaY * 0.01);
                map.setZoomAround(mousePoint, map.getZoom() + zoomDelta, { animate: false });
            } else {
                map.panBy([e.deltaX, e.deltaY], { animate: false });
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [map]);

    return null;
}

export default function DistributorMap({ selected, filtered, onSelect, userLocation }: DistributorMapProps) {
    const RL = require('react-leaflet') as any;
    const MapContainer = RL.MapContainer as React.ComponentType<any>;
    const TileLayer = RL.TileLayer as React.ComponentType<any>;

    return (
        <MapContainer
            center={[selected.lat, selected.lng] as [number, number]}
            zoom={8}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TrackpadScroll />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarkers selected={selected} filtered={filtered} onSelect={onSelect} userLocation={userLocation} />
        </MapContainer>
    );
}

