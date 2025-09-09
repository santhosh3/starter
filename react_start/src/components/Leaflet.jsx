import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// Custom marker icon (default Leaflet marker sometimes breaks in React)
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const socket = io("http://localhost:4000");

export default function TrackingMap() {
    const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // start: Bangalore
    const [route, setRoute] = useState([]);

    useEffect(() => {
        socket.emit("startRide", {
            start: { lat: 12.9716, lng: 77.5946 }, // Bangalore
            end: { lat: 12.2958, lng: 76.6394 },   // Mysore
        });

        socket.on("locationUpdate", ({ current, path }) => {
            setLocation(current);
            setRoute(path); // entire path once
        });

        socket.on("rideComplete", () => {
            alert("Ride Completed!");
        });

        return () => {
            socket.off("locationUpdate");
            socket.off("rideComplete");
        };
    }, []);

    return (
        <MapContainer
            center={location}
            zoom={7}
            style={{ width: "100%", height: "500px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {/* Blue route line */}
            {route.length > 0 && (
                <Polyline positions={route} color="blue" weight={4} />
            )}
            {/* Moving marker */}
            <Marker position={location} icon={markerIcon} />
        </MapContainer>
    );
}

