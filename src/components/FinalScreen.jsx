import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ZoomAnimation({ targetZoom = 13 }) {
  const map = useMap();

  useEffect(() => {
    // Start zoomed out
    map.setZoom(3);

    // Smooth zoom to target
    setTimeout(() => {
      map.flyTo(map.getCenter(), targetZoom, {
        duration: 2, // seconds
      });
    }, 500); // half-second delay before animating
  }, [map, targetZoom]);

  return null;
}

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
    { title: "Distance covered", value: `${totalDistance} km` },
    { title: "Total Duration", value: `${duration} mins` },
    { title: "Steps taken", value: `${stepsTaken}` },
    { title: "Speed", value: `${speed} ${unit}` },
  ];

  const center = pathCoords.length > 0 ? pathCoords[0] : [28.6129, 77.2295];

  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center border">
      <div className="w-[65%] h-[75%] border overflow-hidden mt-6">
        <MapContainer
          center={coordinates}
          zoom={3}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomAnimation targetZoom={13} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          {pathCoords.length > 0 && (
            <Marker position={pathCoords[0]}>
              <Tooltip direction="top" offset={[0, -10]} permanent>
                Starting Point
              </Tooltip>
            </Marker>
          )}
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
            <h3 className="font-semibold text-md text-gray-600">
              {card.title}
            </h3>
            <p className="text-xl mt-2 font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinalScreen;
