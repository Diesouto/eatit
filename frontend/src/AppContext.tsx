import { createContext, useContext } from 'react';

// Crea el contexto
const AppContext = createContext();

// Componente de proveedor de contexto
// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Declara la variable aquí

  return (
    <AppContext.Provider value={{ backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
