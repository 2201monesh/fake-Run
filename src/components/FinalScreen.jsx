import React from "react";
import { useAppContext } from "../context/AppContext";

function FinalScreen() {
  const { totalDistance, duration, stepsTaken, speed, unit } = useAppContext();

  const cards = [
    { title: "Distance", value: `${totalDistance} km` },
    { title: "Duration", value: `${duration} mins` },
    { title: "Steps", value: `${stepsTaken}` },
    { title: "Speed", value: `${speed} ${unit}` },
  ];

  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center border">
      <div className="w-[65%] h-[75%] border mt-6">
        <p className="text-xl font-semibold">final screen</p>
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
