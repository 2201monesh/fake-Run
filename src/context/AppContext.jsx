import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalDistance, setTotalDistance] = useState(false);

  return (
    <AppContext.Provider value={{ totalDistance, setTotalDistance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
