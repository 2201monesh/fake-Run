import React from "react";
import { useAppContext } from "../context/AppContext";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FinalScreen() {
  const {
    totalDistance,
    duration,
    stepsTaken,
    speed,
    unit,
    coordinates,
    pathCoords,
  } = useAppContext();

  const cards = [
    { title: "Distance", value: `${totalDistance} km` },
    { title: "Duration", value: `${duration} mins` },
    { title: "Steps", value: `${stepsTaken}` },
    { title: "Speed", value: `${speed} ${unit}` },
  ];

  const center = pathCoords.length > 0 ? pathCoords[0] : [28.6129, 77.2295];

  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center border">
      <div className="w-[65%] h-[75%] border overflow-hidden mt-6">
        <MapContainer
          center={coordinates}
          zoom={13}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          {pathCoords.length > 1 && (
            <Polyline positions={pathCoords} color="blue" weight={4} />
          )}
        </MapContainer>
      </div>

      {/* Cards container */}
      <div className="w-[65%] cards flex justify-between mt-6 space-x-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-48 h-32 rounded-lg flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="text-sm mt-2 text-gray-600">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinalScreen;
