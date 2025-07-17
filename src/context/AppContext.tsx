"use client"; // Required if you want to use it in a Client Component

import { NAVBAR_OPTIONS } from "@/utils/constants";
import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  activeTab: string;
  setActiveTab: (val: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(NAVBAR_OPTIONS[0]);

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useMyContext must be used within MyContextProvider");
  return context;
};
