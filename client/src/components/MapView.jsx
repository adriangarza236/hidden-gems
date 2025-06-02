import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import React from 'react';

const MapView = ({ gems, onSelectedGem, onMapClick }) => {
  
  const gemIcon = new L.Icon({
    iconUrl: "/gem-icon.png",
    iconSize: [32, 32],
    iconAnchor: [0, -32],
    className: "gem-marker"
  })

  const ClickHandler = ({ onMapClick }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        onMapClick({ lat, lng })
      }
    })
    return null
  }

  return (

    <MapContainer 
      center={[29.7858, -95.8245]} // Katy, TX
      zoom={13}
      className="fixed top-16 h-full w-full" 
    >
      <ClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {gems.map(gem => (
        <Marker 
          key={gem.id} 
          position={[gem.latitude, gem.longitude]} 
          icon={gemIcon}
          eventHandlers={{ click: () => onSelectedGem(gem) }}
        >
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

