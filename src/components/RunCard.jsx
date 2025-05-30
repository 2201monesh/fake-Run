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
    setSubmitted,
  } = useAppContext();

  const [errors, setErrors] = useState({
    runName: "",
    selectedDate: "",
    description: "",
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (errors.selectedDate) {
      setErrors((prev) => ({ ...prev, selectedDate: "" }));
    }
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

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = {
      runName: "",
      selectedDate: "",
      description: "",
    };

    if (!runName.trim()) {
      newErrors.runName = "Run name is required.";
      hasError = true;
    }
    if (!selectedDate) {
      newErrors.selectedDate = "Please select a date.";
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Submit logic here
      console.log("Run data valid, proceed to save.");
      setSubmitted(true);
    }
  };

  return (
    // <div className="w-[35%] h-[88vh] border m-4 p-2 overflow-y-scroll">
    // <div className="w-full lg:w-[35%] h-[70vh] lg:h-[88vh] border m-4 p-2 overflow-y-scroll">
    <div className="w-full lg:w-[35%] lg:h-[88vh] border m-4 p-2 overflow-y-auto">
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
      <div className="run-stats bg-gray-50 w-[100%] mt-3 p-2 mb-6 sm:mb-4 lg:h-[40%]">
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
      <div className="pace-maker w-full mt-10 sm:mt-2 p-2">
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
          //   onChange={(e) => setRunName(e.target.value) }
          onChange={(e) => {
            setRunName(e.target.value);
            if (errors.runName) {
              setErrors((prev) => ({ ...prev, runName: "" }));
            }
          }}
        />
        {errors.runName && (
          <p className="text-red-500 text-sm mt-1">{errors.runName}</p>
        )}
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
        {errors.selectedDate && (
          <p className="text-red-500 text-sm mt-1">{errors.selectedDate}</p>
        )}

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
          //   onChange={(e) => setDescription(e.target.value)}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) {
              setErrors((prev) => ({ ...prev, description: "" }));
            }
          }}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div className="w-[100%] mt-2 p-2">
        <button
          className="w-full border py-1 bg-black text-white cursor-pointer"
          onClick={handleSubmit}
        >
          Make Run File
        </button>
      </div>
    </div>
  );
}

export default RunCard;
