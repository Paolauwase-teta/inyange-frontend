"use client";

import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Location {
    id: number;
    name: string;
    city: string;
    lat: number;
    lng: number;
}

interface ReachOutMapProps {
    selected: Location;
    locations: Location[];
    onSelect: (id: number) => void;
}

function MapMarkers({ selected, locations, onSelect }: ReachOutMapProps) {
    const RL = require('react-leaflet') as any;
    const useMap = RL.useMap as () => any;
    const map = useMap();

    React.useEffect(() => {
        const layers: L.Layer[] = [];

        locations.forEach((loc) => {
            const isActive = selected.id === loc.id;
            
            // Custom SVG Pin Icon
            const icon = L.divIcon({
                className: 'custom-pin',
                html: `
                    <div class="relative flex items-center justify-center translate-y-[-50%] transition-transform duration-500 ${isActive ? 'scale-125' : 'hover:scale-110'}">
                        <svg width="34" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${isActive ? '#1668b2' : 'rgba(22, 104, 178, 0.7)'}" stroke="white" stroke-width="1.5"/>
                            <circle cx="12" cy="10" r="3" fill="white"/>
                        </svg>
                        <div class="absolute -bottom-2 w-1.5 h-1.5 bg-[#1668b2]/20 rounded-full blur-[2px]" />
                    </div>
                `,
                iconSize: [34, 42],
                iconAnchor: [17, 42],
            });

            const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

            marker.on('click', () => onSelect(loc.id));
            layers.push(marker);

            if (isActive) {
                map.setView([loc.lat, loc.lng], 12, { animate: true });
            }
        });

        return () => {
            layers.forEach((layer) => map.removeLayer(layer));
        };
    }, [map, selected, locations, onSelect]);

    return null;
}

export default function ReachOutMap({ selected, locations, onSelect }: ReachOutMapProps) {
    const RL = require('react-leaflet') as any;
    const MapContainer = RL.MapContainer as React.ComponentType<any>;
    const TileLayer = RL.TileLayer as React.ComponentType<any>;

    return (
        <MapContainer
            center={[-1.9441, 30.0619]}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', background: '#f8f8f8' }}
        >
            <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapMarkers selected={selected} locations={locations} onSelect={onSelect} />
        </MapContainer>
    );
}
