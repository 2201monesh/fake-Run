import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
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

// Component to fly map to new position
function MapFlyTo({ coordinates }) {
  const map = useMap();
  map.setView(coordinates, 13);
  return null;
}

function MapBox() {
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchTerm
        )}&format=json`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCoords = [parseFloat(lat), parseFloat(lon)];
        setCoordinates(newCoords);
        console.log("Searched location:", newCoords);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error fetching location");
    }
  };

  return (
    // <div className="w-[65%] h-[80%] border m-4">
    //   <MapContainer
    //     center={coordinates}
    //     zoom={13}
    //     style={{ height: "80vh", width: "100%" }}
    //   >
    //     <TileLayer
    //       attribution="&copy; OpenStreetMap contributors"
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     {/* Handle click events */}
    //     <ClickHandler setCoordinates={setCoordinates} />

    //     <Marker position={coordinates}>
    //       <Popup>
    //         Selected Location: <br /> Lat: {coordinates[0].toFixed(4)} <br />{" "}
    //         Lng: {coordinates[1].toFixed(4)}
    //       </Popup>
    //     </Marker>
    //   </MapContainer>
    // </div>
    <div className="w-full h-screen p-4">
      {/* Search UI */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-[300px]"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[80vh] border">
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler setCoordinates={setCoordinates} />
          <MapFlyTo coordinates={coordinates} />

          <Marker position={coordinates}>
            <Popup>
              Location: <br /> Lat: {coordinates[0].toFixed(4)} <br /> Lng:{" "}
              {coordinates[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapBox;
