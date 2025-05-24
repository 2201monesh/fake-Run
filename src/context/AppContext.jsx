import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isModalOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
