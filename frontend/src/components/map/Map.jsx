import React from "react";
import "./Map.css";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, long, title }) => {
  return (
    <>
      {lat && (
        <MapContainer
          center={lat ? [lat, long] : [52.4797, -1.90269]}
          zoom={12}
          scrollWheelZoom={false}
          className="map"
          
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={[lat, long]} radius={2200}/>
          {/* <Marker position={[lat, long]}>
            <Popup>{title}</Popup>
          </Marker> */}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
