import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ClickHandler({ setCoordinates }) {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates([lat, lng]);
    console.log("Clicked coordinates:", lat, lng);
  });
  return null;
}

function MapBox() {
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]);

  return (
    <div className="w-[65%] h-[80%] border m-4">
      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Handle click events */}
        <ClickHandler setCoordinates={setCoordinates} />

        <Marker position={coordinates}>
          <Popup>
            Selected Location: <br /> Lat: {coordinates[0].toFixed(4)} <br />{" "}
            Lng: {coordinates[1].toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapBox;
