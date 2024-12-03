import React, { createContext, useContext, useState } from 'react';
import { ObjectId } from 'mongoose';

interface Props {
  children: React.ReactNode;
}

interface AppContextType {
  backendUrl: string;
  userId?: ObjectId | null;
  userRole?: string | null;
  setUserId: (id: ObjectId | null) => void;
  setUserRole: (role: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userId, setUserId] = useState<ObjectId | null>(null);
  const [userRole, setUserRole] = useState<string>('');

  // Retrieve userId from localStorage or authentication state
  const storedUser = localStorage.getItem('user');
  const storedUserId = storedUser ? JSON.parse(storedUser).id : null;
  const storedUserRole = storedUser ? JSON.parse(storedUser).role : '';

  // If a user is stored, set it in state
  React.useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId);
      setUserRole(storedUserRole);
    }
  }, [storedUserId]);

  return (
    <AppContext.Provider value={{ backendUrl, userId, userRole, setUserId, setUserRole }}>
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
