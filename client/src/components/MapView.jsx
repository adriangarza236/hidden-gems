import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import React from 'react';
import { selectGem } from '../features/gemSlice';
import { setCenter, setLocation } from '../features/locationSlice';

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
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        onMapClick({ lat, lng })
      },
      moveend() {
        const center = map.getCenter()
        dispatch(setCenter([center.lat, center.lng]))
      }
    })
    return null
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        dispatch(setLocation({ lat: latitude, lng: longitude }))
        dispatch(setCenter([latitude, longitude]))
      })
    }
  }, [dispatch])

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

