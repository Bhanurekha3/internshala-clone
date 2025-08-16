import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };

const LocationTracker: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported on this device.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setLocation(coords);

                const geoRes = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
                );

                const weatherRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}&units=metric`
                );


                setWeather({
                    address: geoRes.data.results[0]?.formatted_address,
                    temp: weatherRes.data.main.temp,
                    humidity: weatherRes.data.main.humidity,
                });
            },
            (err) => {
                alert("Unable to fetch location. Please allow location permissions.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div>
            <button
                onClick={fetchLocation}
                style={{
                    background: "#007bff",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "16px",
                    width: "100%",
                    marginBottom: "10px"
                }}
            >
                📍 Obtain Location
            </button>

            {location && isLoaded && (
                <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
                    <Marker position={location} />
                </GoogleMap>
            )}

            {weather && (
                <div style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    marginTop: '10px',
                    borderRadius: '8px',
                    color: '#333',
                    fontSize: '16px',
                    maxWidth: '400px', // keeps it mobile-friendly
                    wordWrap: 'break-word'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>{weather.address}</h3>
                    <p>🌡️ Temperature: {weather.temp} °C</p>
                    <p>💧 Humidity: {weather.humidity}%</p>
                </div>
            )}
        </div>
    );
};

export default LocationTracker;
