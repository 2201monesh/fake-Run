import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// function ClickHandler({ setCoordinates }) {
//   useMapEvent("click", (e) => {
//     const { lat, lng } = e.latlng;
//     setCoordinates([lat, lng]);
//     console.log("Clicked coordinates:", lat, lng);
//   });
//   return null;
// }

// Handles clicking on the map to add points
function ClickHandler({ addPoint }) {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    addPoint([lat, lng]);
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
  const [points, setPoints] = useState([]);

  const addPoint = (point) => {
    setPoints((prev) => [...prev, point]);
  };

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
    <div className="w-full h-screen p-4">
      {/* Map Container with relative positioning */}
      <div className="w-full h-[80vh] border relative">
        {/* Search box on top of the map */}
        <div className="absolute top-4 left-20 z-[1000] bg-white p-2 rounded shadow flex gap-2">
          <input
            type="text"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded w-[250px]"
          />
          <button
            onClick={handleSearch}
            className="bg-black cursor-pointer text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>

        {/* Leaflet map */}
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler addPoint={addPoint} />
          <MapFlyTo coordinates={coordinates} />

          {/* Draw markers and tooltips */}
          {points.map((point, idx) => (
            <Marker key={idx} position={point}>
              <Tooltip direction="top" offset={[0, -10]} permanent>
                Point {idx + 1}
              </Tooltip>
            </Marker>
          ))}

          {/* Draw polyline connecting all points */}
          {points.length > 1 && (
            <Polyline positions={points} color="blue" weight={4} />
          )}

          {/* <Marker position={coordinates}>
            <Popup>
              Location: <br /> Lat: {coordinates[0].toFixed(4)} <br /> Lng:{" "}
              {coordinates[1].toFixed(4)}
            </Popup>
          </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapBox;
