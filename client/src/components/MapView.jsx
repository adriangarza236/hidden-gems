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
  
  const tagColors = {
    bar: '#ff33ff', //pink
    food: '#f1f418', //yellow
    art: '#f43618', //red
    music: '#b818f4', //purple
    nature: '#18f41f', //green
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

  
  const createGemIcon = (tags) => {
    if (!tags || tags.length === 0) {
      return L.divIcon({
        html: '<div class="gem-marker" style="background-color: #3b82f6"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })
    }

    if (tags.length === 1) {
      const color = tagColors[tags[0].name?.toLowerCase()] || '#64748b'
      return L.divIcon({
        html: `
          <div class="gem-marker">
            <svg width="48" height="48" viewBox="-47.62 -47.62 322.02 322.02" xmlns="http://www.w3.org/2000/svg">
              <g>
                <polygon fill="${color}" points="61.354,106.638 164.52,106.638 113.339,31.45"/>
                <polygon fill="${color}" points="113.104,207.363 165.086,113.644 60.621,113.644"/>
                <path fill="${color}" d="M109.103,25.26H66.04c0,0.109,0.013,0.214,0.003,0.324l-6.645,71.566L109.103,25.26z"/>
                <path fill="${color}" d="M117.598,25.26l48.842,71.749l-6.449-71.433c-0.009-0.107,0.005-0.209,0.005-0.315H117.598z"/>
                <polygon fill="${color}" points="173.401,113.24 122.363,205.322 224.58,102.282"/>
                <polygon fill="${color}" points="51.553,105.877 59.039,25.26 54.674,25.26 -0.096,94.63"/>
                <polygon fill="${color}" points="2.008,102.258 103.941,205.285 52.379,113.227"/>
                <polygon fill="${color}" points="174.275,105.889 226.782,94.647 171.142,25.26 166.996,25.26"/>
              </g>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })
    }

    if (tags.length > 1) {
      // Repeat tag colors to fill all 8 facets
      const baseColors = tags
        .map(tag => tagColors[tag.name?.toLowerCase()])
        .filter(Boolean);
      const facetColors = Array.from({ length: 8 }, (_, i) => baseColors[i % baseColors.length]);

      return L.divIcon({
        html: `
          <div class="gem-marker" style="padding:0;">
            <svg width="100%" height="100%" viewBox="-47.62 -47.62 322.02 322.02" xmlns="http://www.w3.org/2000/svg" style="display:block;">
              <g>
                <polygon fill="${facetColors[0]}" points="61.354,106.638 164.52,106.638 113.339,31.45"/>
                <polygon fill="${facetColors[1]}" points="113.104,207.363 165.086,113.644 60.621,113.644"/>
                <path fill="${facetColors[2]}" d="M109.103,25.26H66.04c0,0.109,0.013,0.214,0.003,0.324l-6.645,71.566L109.103,25.26z"/>
                <path fill="${facetColors[3]}" d="M117.598,25.26l48.842,71.749l-6.449-71.433c-0.009-0.107,0.005-0.209,0.005-0.315H117.598z"/>
                <polygon fill="${facetColors[4]}" points="173.401,113.24 122.363,205.322 224.58,102.282"/>
                <polygon fill="${facetColors[5]}" points="51.553,105.877 59.039,25.26 54.674,25.26 -0.096,94.63"/>
                <polygon fill="${facetColors[6]}" points="2.008,102.258 103.941,205.285 52.379,113.227"/>
                <polygon fill="${facetColors[7]}" points="174.275,105.889 226.782,94.647 171.142,25.26 166.996,25.26"/>
              </g>
            </svg>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        className: ''
      });
    }
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
      className="h-full w-2/3 relative z-0" 
      style={{ height: "100%", width: "100%" }}
    >
      <ClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validGems.map(gem => {
        const icon = createGemIcon(gem.tags)
        {console.log('Gem tags:', gem.tags)}
        return (
          <Marker
            key={gem.id}
            position={[gem.latitude, gem.longitude]}
            icon={icon}
            eventHandlers={{ click: () => dispatch(selectGem(gem)) }}
          >
            <Popup>
              <strong>{gem.title}</strong><br />
              {gem.description}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default MapView;

