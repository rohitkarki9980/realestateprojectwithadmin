import React ,{useState,useEffect} from 'react';
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

import { Marker,Popup,useMap } from 'react-leaflet';

let DefaultIcon =L.icon({
    iconUrl:icon,
    shadowUrl:iconShadow
})
L.Marker.prototype.options.icon =DefaultIcon

const GeoCoderMarker = ({address}) => {

    const map =useMap()

    const [position, setPosition] = useState([33.7172, 83.3240]);
    useEffect(()=>{
        
    })
  return (
  
      <Marker position={position} icon={DefaultIcon}>
        <Popup/>
      </Marker>
    
  );
}

export default GeoCoderMarker;
