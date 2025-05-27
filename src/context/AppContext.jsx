import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalDistance, setTotalDistance] = useState(false);
  const [paceUnit, setPaceUnit] = useState();
  const [duration, setDuration] = useState();
  const [elevation, setElevation] = useState();
  const [speed, setSpeed] = useState();
  const [pace, setPace] = useState();
  const [runName, setRunName] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();

  return (
    <AppContext.Provider
      value={{
        totalDistance,
        setTotalDistance,
        paceUnit,
        setPaceUnit,
        duration,
        setDuration,
        elevation,
        setElevation,
        speed,
        setSpeed,
        pace,
        setPace,
        runName,
        setRunName,
        date,
        setDate,
        description,
        setDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
