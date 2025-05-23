import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapBox() {
  return (
    <div>
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        style={{ height: "50vh", width: "50%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.6139, 77.209]}>
          <Popup>Delhi</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapBox;
