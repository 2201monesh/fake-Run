import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { IoFootstepsOutline } from "react-icons/io5";
import { SiSpeedtest } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
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
    runName,
    description,
    selectedDate,
  } = useAppContext();

  const cards = [
    {
      title: "Distance covered",
      value: `${totalDistance} km`,
      icon: <GiPathDistance size={20} />,
    },
    {
      title: "Total Duration",
      value: `${duration} mins`,
      icon: <MdOutlineTimer size={20} />,
    },
    {
      title: "Steps taken",
      value: `${stepsTaken}`,
      icon: <IoFootstepsOutline size={20} />,
    },
    {
      title: "Speed",
      value: `${speed} ${unit}`,
      icon: <SiSpeedtest size={20} />,
    },
  ];

  const center = pathCoords.length > 0 ? pathCoords[0] : [28.6129, 77.2295];

  return (
    <div className="w-full h-full flex flex-col items-center px-2">
      <div className="w-full lg:w-[65%] h-[60vh] lg:h-[75%] border overflow-hidden mt-4 relative rounded-md">
        <div className="lg:absolute lg:top-2 lg:right-2 lg:bg-opacity-80 lg:z-[1000] bg-white text-sm px-3 py-2 rounded shadow max-w-xs mt-2">
          <p className="flex items-center font-semibold text-gray-700 mb-1">
            {/* <MdLocationOn className="mr-1 text-red-500" /> Location: {runName} */}
            Run Name: {runName}
          </p>
          <p className="text-gray-600 break-words">
            <span className="font-semibold">Description:</span> {description}
          </p>
          <p className="text-gray-500 text-xs mt-1">{selectedDate}</p>
        </div>
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
      <div className="w-full lg:w-[65%] flex flex-wrap justify-center lg:justify-between gap-4 mt-4 pb-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[45%] sm:w-40 h-28 rounded-lg flex flex-col items-center text-center p-2 bg-white shadow"
          >
            <span>{card.icon}</span>
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
