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
    userLocation?: { lat: number; lng: number } | null;
    mapAction?: { type: 'center-user' | 'fit-bounds', timestamp: number } | null;
}

function MapMarkers({ selected, locations, onSelect, userLocation, mapAction }: ReachOutMapProps) {
    const RL = require('react-leaflet') as any;
    const useMap = RL.useMap as () => any;
    const map = useMap();
    const initialFit = React.useRef(false);
    const lastActionRef = React.useRef<number>(0);

    // 1. Manual Selection Panning (Fixes sidebar buttons)
    React.useEffect(() => {
        const layers: L.Layer[] = [];

        locations.forEach((loc) => {
            const isActive = selected.id === loc.id;
            const icon = L.divIcon({
                className: 'custom-pin',
                html: `
                    <div class="relative flex items-center justify-center translate-y-[-50%] transition-transform duration-500 ${isActive ? 'scale-125' : 'hover:scale-110'}">
                        <svg width="34" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${isActive ? '#0d55a0' : 'rgba(13, 85, 160, 0.7)'}" stroke="white" stroke-width="1.5"/>
                            <circle cx="12" cy="10" r="3" fill="white"/>
                        </svg>
                        <div class="absolute -bottom-2 w-1.5 h-1.5 bg-[#0d55a0]/20 rounded-full blur-[2px]" />
                    </div>
                `,
                iconSize: [34, 42],
                iconAnchor: [17, 42],
            });

            const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);
            marker.on('click', () => onSelect(loc.id));
            layers.push(marker);
        });

        // Always pan to selected location if it's NOT the first load (which is handled by actions)
        if (initialFit.current) {
            map.setView([selected.lat, selected.lng], map.getZoom(), { animate: true });
        } else {
            // First load default view
            map.setView([selected.lat, selected.lng], 12);
            initialFit.current = true;
        }

        return () => { layers.forEach((layer) => map.removeLayer(layer)); };
    }, [map, selected.id, locations, onSelect]);

    // 2. User Location Logic
    React.useEffect(() => {
        if (!userLocation) return;

        const userIcon = L.divIcon({
            className: 'custom-user-pin',
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-10 h-10 bg-[#0d55a0]/10 rounded-full border border-[#0d55a0]/20"></div>
                    <div class="w-[14px] h-[14px] bg-[#33a4df] border-2 border-white rounded-full shadow-[0_0_10px_rgba(51,164,223,0.8)] z-[600]"></div>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });
        const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
        return () => { map.removeLayer(userMarker); };
    }, [map, userLocation]);

    // 3. Coordinate Actions (Center User vs Fit Bounds)
    React.useEffect(() => {
        if (!mapAction || mapAction.timestamp <= lastActionRef.current) return;

        if (mapAction.type === 'center-user' && userLocation) {
            map.setView([userLocation.lat, userLocation.lng], 14, { animate: true });
            lastActionRef.current = mapAction.timestamp;
        } else if (mapAction.type === 'fit-bounds' && userLocation && locations.length > 0) {
            const bounds = L.latLngBounds(
                [userLocation.lat, userLocation.lng],
                [locations[0].lat, locations[0].lng]
            );
            map.fitBounds(bounds, { padding: [60, 60], animate: true, maxZoom: 12 });
            lastActionRef.current = mapAction.timestamp;
        }
    }, [map, mapAction, userLocation, locations]);

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
        return () => { container.removeEventListener('wheel', handleWheel); };
    }, [map]);

    return null;
}

export default function ReachOutMap({ selected, locations, onSelect, userLocation, mapAction }: ReachOutMapProps) {
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
            <TrackpadScroll />
            <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapMarkers 
                selected={selected} 
                locations={locations} 
                onSelect={onSelect} 
                userLocation={userLocation} 
                mapAction={mapAction}
            />
        </MapContainer>
    );
}

