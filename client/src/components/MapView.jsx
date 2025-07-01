import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const pinVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opactity: 1, y:0, transition: { type: "spring", stiffness: 120, damping: 8 } }
  }

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
      className="h-full w-full relative z-0" 
      style={{ height: "100%", width: "100%" }}
    >
      <ClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
      {validGems.map(gem => (
        <motion.div
          key={gem.id} 
          initial="hidden"
          animate="visible"
          variants={pinVariants}
        >
          <Marker
            position={[gem.latitude, gem.longitude]} 
            icon={gemIcon}
            eventHandlers={{ click: () => dispatch(selectGem(gem)) }}
          >
            <Popup>
              <strong>{gem.title}</strong><br />
              {gem.description}
            </Popup>
          </Marker>
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapView;

