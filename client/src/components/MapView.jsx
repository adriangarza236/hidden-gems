import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import React from 'react';

const MapView = ({ gems }) => {
  console.log(gems)
  const gemIcon = new L.Icon({
    iconUrl: "/gem-icon.png",
    iconSize: [32, 32],
    iconAnchor: [0, -32],
    className: "gem-marker"
  })
  return (

    <MapContainer 
      center={[29.7858, -95.8245]} // Katy, TX
      zoom={13}
      style={{ height: '75vh', width: '75%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {gems.map((gem) => (
        <Marker key={gem.id} position={[gem.latitude, gem.longitude]} icon={gemIcon}>
          <Popup>
            <strong>{gem.title}</strong><br />
            {gem.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

