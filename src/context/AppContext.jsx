import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalDistance, setTotalDistance] = useState("");
  const [unit, setUnit] = useState("min/km");
  const [duration, setDuration] = useState();
  const [stepsTaken, setStepsTaken] = useState();
  const [speed, setSpeed] = useState();
  const [pace, setPace] = useState(5.5);
  const [runName, setRunName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [showMarkers, setShowMarkers] = useState(true);
  const [firstLocationName, setFirstLocationName] = useState("");
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]);
  const [searchTerm, setSearchTerm] = useState("");
  const [points, setPoints] = useState([]);
  const [pathCoords, setPathCoords] = useState([]); // Stores routed polyline
  const [submitted, setSubmitted] = useState(false);

  const calculateDurationAndSpeed = ({
    pace,
    unit,
    totalDistance,
    setDuration,
    setSpeed,
  }) => {
    if (!pace || !totalDistance) return;

    // pace is in minutes per unit
    // duration = pace * distance
    const durationInMinutes = pace * totalDistance;
    const durationInHours = durationInMinutes / 60;

    // speed = distance / time
    const speed = totalDistance / durationInHours;

    const steps = Math.round(totalDistance * 1300);

    setStepsTaken(steps);
    setDuration(durationInMinutes.toFixed(2)); // total time in minutes
    setSpeed(speed.toFixed(2)); // speed in km/h or miles/h
  };

  useEffect(() => {
    calculateDurationAndSpeed({
      pace,
      unit,
      totalDistance,
      setDuration,
      setSpeed,
    });
  }, [totalDistance, pace, unit]);

  return (
    <AppContext.Provider
      value={{
        totalDistance,
        setTotalDistance,
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
        showMarkers,
        setShowMarkers,
        firstLocationName,
        setFirstLocationName,
        coordinates,
        setCoordinates,
        searchTerm,
        setSearchTerm,
        points,
        setPoints,
        pathCoords,
        setPathCoords,
        submitted,
        setSubmitted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
