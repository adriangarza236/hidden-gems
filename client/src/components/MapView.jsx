import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import React from 'react';
import { selectGem } from '../features/gemSlice';

const MapView = ({ onMapClick }) => {

  const dispatch = useDispatch()
  const gems = useSelector((state) => state.gems.gems)
  
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

  const validGems = gems?.filter(
    gem => gem && typeof gem.latitude === 'number' && typeof gem.longitude === 'number'
  )

  return (

    <MapContainer 
      center={[29.7858, -95.8245]} // Katy, TX
      zoom={13}
      className="top-16 h-full w-full relative z-0" 
    >
      <ClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
      {validGems.map(gem => (
        <Marker 
          key={gem.id} 
          position={[gem.latitude, gem.longitude]} 
          icon={gemIcon}
          eventHandlers={{ click: () => dispatch(selectGem(gem)) }}
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

