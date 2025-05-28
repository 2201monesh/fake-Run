import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { IoFootstepsOutline } from "react-icons/io5";
import { SiSpeedtest } from "react-icons/si";

function RunCard() {
  const {
    totalDistance,
    unit,
    setUnit,
    duration,
    setDuration,
    stepsTaken,
    setStepsTaken,
    speed,
    setSpeed,
    pace,
    setPace,
    runName,
    setRunName,
    setSelectedDate,
    selectedDate,
    description,
    setDescription,
  } = useAppContext();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setPace(value);
    console.log("Pace:", value);
  };

  const handleChange = (e) => {
    setUnit(e.target.value);
    console.log("Selected Pace Unit:", e.target.value);
  };

  useEffect(() => {
    console.log("useEffect", totalDistance);
  }, []);

  return (
    <div className="w-[35%] h-[88vh] border m-4 p-2 overflow-y-scroll">
      <p>Run Details</p>
      <div className="flex w-full items-center justify-between mt-3 p-2">
        <p>Pace Unit</p>
        <select
          value={unit}
          onChange={handleChange}
          className="border px-2 py-1 text-sm cursor-pointer outline-none"
        >
          <option value="min/km">min/km</option>
          <option value="min/miles">min/miles</option>
        </select>
      </div>
      <div className="run-stats bg-gray-50 w-[100%] h-[40%] mt-3 p-2">
        <p className="mb-1">Run Stats</p>
        <div className="grid grid-cols-2 gap-2 h-[85%]">
          <div className="bg-white border p-2 flex items-center justify-center flex-col">
            <span>
              <GiPathDistance size={20} />
            </span>
            <p className="text-center">
              Distance <br /> {totalDistance} {totalDistance ? "km" : ""}
            </p>
          </div>
          <div className="bg-white border p-2 flex items-center justify-center flex-col">
            <span>
              <MdOutlineTimer size={20} />
            </span>
            <p className="text-center">
              Duration <br /> {duration} {duration ? "mins" : ""}
            </p>
          </div>
          <div className="bg-white border p-2 flex items-center justify-center flex-col">
            <span>
              <IoFootstepsOutline size={20} />
            </span>
            <p className="text-center">
              Steps <br /> {stepsTaken}
            </p>
          </div>
          <div className="bg-white border p-2 flex items-center justify-center flex-col">
            <span>
              <SiSpeedtest size={20} />
            </span>
            <p className="text-center">
              Speed <br /> {speed} {speed ? unit : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="pace-maker w-[100%] mt-2 p-2">
        <div className="flex items-center justify-between">
          <p>Pace - {unit}</p>
          <p>
            {pace} {unit}
          </p>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={pace}
          onChange={handleSliderChange}
          className="w-full mt-4 cursor-pointer"
        />
      </div>
      <div className="w-[100%] mt-2 p-2">
        <p className="mb-2">Run Name</p>
        <input
          value={runName}
          type="text"
          className="border w-full px-2 py-1"
          placeholder="Enter Run Name here..."
          onChange={(e) => setRunName(e.target.value)}
        />
      </div>
      <div className="w-[100%] mt-2 p-2">
        <div className="w-full items-center justify-between flex">
          <p>Select Date</p>
          <input
            type="date"
            onChange={handleDateChange}
            className="border px-2 py-1 rounded"
          />
        </div>

        {selectedDate && (
          <div className="mt-4 p-2 bg-gray-100 rounded border">
            <p className="text-sm font-medium">Selected Date:</p>
            <p>{selectedDate}</p>
          </div>
        )}
      </div>
      <div className="w-[100%] mt-2 p-2">
        <p className="mb-1">Description</p>
        <textarea
          value={description}
          name="textarea"
          className="w-full p-2 text-sm border"
          placeholder="Enter description here..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="w-[100%] mt-2 p-2">
        <button className="w-full border py-1 bg-black text-white cursor-pointer">
          Make Run File
        </button>
      </div>
    </div>
  );
}

export default RunCard;
