"use client";

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  lat?: number | string | null;
  long?: number | string | null;
  title?: string;
}

const Map = ({ lat, long }: MapProps) => {
  return (
    <>
      {lat && (
        <MapContainer
          center={[9.082, 8.6753]}
          zoom={5}
          scrollWheelZoom={false}
          className="w-full h-full rounded-[10px] z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={[Number(lat), Number(long)]} radius={5200} />
        </MapContainer>
      )}
    </>
  );
};

export default Map;
