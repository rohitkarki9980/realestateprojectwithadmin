import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import  'leaflet/dist/leaflet.css';
import icon  from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

let DefaultIcon =L.icon({
  iconUrl:icon,
  shadowUrl:iconShadow
})
L.Marker.prototype.options.icon =DefaultIcon

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([33.7172, 83.3240]);
console.log(address)
  useEffect(() => {
    // Use OpenStreetMap geocoding provider
    const provider = new OpenStreetMapProvider();
    
    // Geocode the address to get latitude and longitude
    provider.search({ query: address })
      .then((results) => {
        if (results.length > 0) {
          const { x, y } = results[0];
          setPosition([y, x]);
          map.flyTo([y,x],13)
          console.log('Geocoded position:', position); // Log the position
        }
      })
      .catch((error) => {
        console.error('Geocoding error:', error);
      });
  }, [address]);

  console.log('Current position:', position); // Log the current position

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
