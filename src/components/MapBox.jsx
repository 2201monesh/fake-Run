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
import { useAppContext } from "../context/AppContext";

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
async function makePathFromPoints(
  points,
  setPathCoords,
  setTotalDistance,
  setElevation
) {
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
      const distanceInMeters = data.routes[0].distance;
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);
      console.log(`Total route distance: ${distanceInKm} km`);
      setTotalDistance(distanceInKm);
    } else {
      alert("Unable to create route.");
    }
  } catch (error) {
    console.error("Routing error:", error);
    alert("Failed to fetch route.");
  }
}

function MapBox() {
  const {
    setTotalDistance,
    setElevation,
    setDuration,
    setStepsTaken,
    setSpeed,
    setPace,
    setRunName,
    setSelectedDate,
    setDescription,
    setUnit,
    showMarkers,
    setShowMarkers,
    setFirstLocationName,
    coordinates,
    setCoordinates,
    searchTerm,
    setSearchTerm,
    points,
    setPoints,
    pathCoords,
    setPathCoords,
  } = useAppContext();

  const addPoint = async (point) => {
    setPoints((prev) => [...prev, point]);

    // Only fetch location name for the first point
    if (points.length === 0) {
      try {
        const [lat, lng] = point;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const name = data?.address?.city || "Unknown location";
        setFirstLocationName(name);
        console.log("📍 First point location:", name);
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        setFirstLocationName("Error fetching location");
      }
    }
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

  const handleReset = () => {
    setPoints([]);
    setPathCoords([]);
    setSearchTerm("");
    setTotalDistance("");
    setCoordinates([28.6139, 77.209]);
    setDescription("");
    setSelectedDate("");
    setRunName("");
    setPace(5.5);
    setSpeed();
    setStepsTaken();
    setDuration();
    setUnit("min/km");
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
        <div className="flex items-center">
          <button
            onClick={() =>
              makePathFromPoints(
                points,
                setPathCoords,
                setTotalDistance,
                setElevation
              )
            }
            className="bg-black text-white px-4 py-2 cursor-pointer mr-2"
          >
            Make Path
          </button>
          <button
            onClick={handleReset}
            className="bg-black text-white px-4 py-2 cursor-pointer mr-2"
          >
            Reset
          </button>
          <div className="ml-2">
            <label className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show Pointers</span>
              <label className="relative inline-block w-10 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMarkers}
                  onChange={() => setShowMarkers((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
              </label>
            </label>
          </div>
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
          {showMarkers &&
            points.map((point, idx) => (
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
