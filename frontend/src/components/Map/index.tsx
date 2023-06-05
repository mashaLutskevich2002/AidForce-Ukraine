import * as React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface GoogleMapUiProps {
    location: string;
}

export const GoogleMapUi = ({ location }: GoogleMapUiProps) => {
    const regionName = location; // Замените на нужное название области
    const apiKey = 'AIzaSyD3OpRY8QYxfBBC9qmgIJlD8JWh0zncfq8'; // Замените на свой API-ключ Google Maps

    const [coordinates, setCoordinates] = useState<any>({});
    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        regionName,
                    )}&key=${apiKey}`,
                );
                const data = await response.json();
                const result = data.results[0];
                if (result) {
                    const { lat, lng } = result.geometry.location;
                    setCoordinates({ lat, lng });
                }
            } catch (error) {
                console.error('Ошибка при получении координат:', error);
            }
        };

        fetchCoordinates();
    }, [regionName, apiKey]);

    const mapOptions = {
        center: {
            lat: coordinates.lat,
            lng: coordinates.lng,
        },
        zoom: 8,
    };

    return (
        <>
            <GoogleMap
                center={mapOptions.center}
                zoom={mapOptions.zoom}
                mapContainerStyle={{ width: '300px', height: '300px' }}
            ></GoogleMap>
        </>
    );
};
