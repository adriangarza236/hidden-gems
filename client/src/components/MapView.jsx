import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

const MapView = () => {
  return (
    <MapContainer 
      center={[29.7858, -95.8245]} // Katy, TX
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapView;

