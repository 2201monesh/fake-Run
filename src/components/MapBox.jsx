import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

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

// Make Path logic extracted outside
async function makePathFromPoints(points, setPathCoords) {
  if (points.length < 2) {
    alert("Please select at least two points.");
    return;
  }

  try {
    const coordinatesStr = points.map((p) => `${p[1]},${p[0]}`).join(";");
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordinatesStr}?overview=full&geometries=polyline`
    );
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const decoded = polyline.decode(data.routes[0].geometry); // [lat, lng]
      setPathCoords(decoded);
    } else {
      alert("Unable to create route.");
    }
  } catch (error) {
    console.error("Routing error:", error);
    alert("Failed to fetch route.");
  }
}

function MapBox() {
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]);
  const [searchTerm, setSearchTerm] = useState("");
  const [points, setPoints] = useState([]);
  const [pathCoords, setPathCoords] = useState([]); // Stores routed polyline

  const addPoint = (point) => {
    setPoints((prev) => [...prev, point]);
  };

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
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 w-[250px]"
        />
        <button
          onClick={handleSearch}
          className="bg-black cursor-pointer text-white px-4 py-1"
        >
          Search
        </button>
        <div>
          <button
            onClick={() => makePathFromPoints(points, setPathCoords)}
            className="bg-black text-white px-4 py-2 cursor-pointer"
          >
            Make Path
          </button>
        </div>
      </div>

      {/* Map Container */}
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

          <ClickHandler addPoint={addPoint} />
          <MapFlyTo coordinates={coordinates} />

          {/* Markers */}
          {points.map((point, idx) => (
            <Marker key={idx} position={point}>
              <Tooltip direction="top" offset={[0, -10]} permanent>
                Point {idx + 1}
              </Tooltip>
            </Marker>
          ))}

          {/* Direct Polyline */}
          {points.length > 1 && (
            <Polyline positions={points} color="gray" weight={2} />
          )}

          {/* Routed Polyline */}
          {pathCoords.length > 1 && (
            <Polyline positions={pathCoords} color="blue" weight={4} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapBox;
