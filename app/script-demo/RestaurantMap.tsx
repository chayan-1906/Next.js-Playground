"use client";

import Script from "next/script";
import {useRef, useState} from "react";
import {GOOGLE_MAPS_API_KEY} from "@/lib/config";

function RestaurantMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState<string | null>(null);

    // Show message if API key is not configured
    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <section className={'bg-orange-50 p-6 rounded-lg mt-6'}>
                <h2 className={'text-xl font-semibold mb-3'}>Google Maps Demo</h2>
                <p className={'text-orange-700'}>
                    To see the map, add your Google Maps API key to <code>.env</code>:
                </p>
                <pre className={'bg-orange-100 p-3 rounded mt-2 text-sm'}>
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_key
                </pre>
            </section>
        );
    }

    const initializeMap = () => {
        console.log('[SCRIPT] Google Maps API loaded, initializing map...');

        // Check if google.maps is available
        if (typeof google === 'undefined' || !google.maps || !google.maps.Map) {
            console.error('Google Maps not fully loaded yet');
            setMapError('Google Maps failed to load properly. Check your API key and allowed domains.');
            return;
        }

        try {
            // Create the map
            const map = new google.maps.Map(mapRef.current!, {
                center: {lat: 12.9716, lng: 77.5946}, // Bangalore
                zoom: 14,
            });

            // Add restaurant marker
            new google.maps.Marker({
                position: {lat: 12.9716, lng: 77.5946},
                map: map,
                title: 'Pizza Place',
            });

            console.log('[SCRIPT] Map initialized successfully!');
        } catch (error) {
            console.error('Error initializing map:', error);
            setMapError('Error initializing map. Check console for details.');
        }
    };

    return (
        <section className={'mt-6'}>
            <h2 className={'text-xl font-semibold mb-3'}>Google Maps Demo (using next/script)</h2>

            {/* Load Google Maps API - using callback for proper initialization */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=Function.prototype`}
                strategy={'lazyOnload'}
                onLoad={() => {
                    // Small delay to ensure google.maps is fully initialized
                    setTimeout(initializeMap, 100);
                }}
                onError={(e) => {
                    console.error('Failed to load Google Maps script:', e);
                    setMapError('Failed to load Google Maps script.');
                }}
            />

            {mapError && (
                <div className={'bg-red-100 text-red-700 p-4 rounded mb-4'}>{mapError}</div>
            )}

            <div ref={mapRef} className={'rounded-lg border border-gray-300'} style={{width: '100%', height: '400px'}}/>
        </section>
    );
}

export {RestaurantMap};
