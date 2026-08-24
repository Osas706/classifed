import React from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, long, title }) => {
  return (
    <>
      {lat && (
        <MapContainer
          center={[9.0820, 8.6753]}
          zoom={5}
          scrollWheelZoom={false}
          className="w-full h-full rounded-[10px] z-0 max-lg:h-[200px]"
          
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={[lat, long]} radius={5200}/>
          {/* <Marker position={[lat, long]}>
            <Popup>{title}</Popup>
          </Marker> */}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
