import React, { createContext, useContext } from 'react';

interface AppContextType {
  backendUrl: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Asegúrate de que está en env

  return (
    <AppContext.Provider value={{ backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
