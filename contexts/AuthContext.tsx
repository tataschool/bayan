
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { INITIAL_USERS } from '../constants';
import * as Security from '../services/security';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  allUsers: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('bayan_users');
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Persistence for Users (Database simulation)
  useEffect(() => {
    localStorage.setItem('bayan_users', JSON.stringify(allUsers));
  }, [allUsers]);

  // Session Restoration (Simulating HttpOnly Cookie check on load)
  useEffect(() => {
    const restoreSession = async () => {
      // In a real app, the refresh token is in an HttpOnly cookie, not accessible to JS.
      // Here we use localStorage to simulate persistence across reloads.
      const storedRefreshToken = localStorage.getItem('bayan_refresh_token');
      
      if (storedRefreshToken) {
        const payload = await Security.verifyToken(storedRefreshToken);
        if (payload && payload.sub) {
          const foundUser = allUsers.find(u => u.id === payload.sub);
          if (foundUser) {
            // Generate new short-lived access token
            const newAccessToken = await Security.generateAccessToken(foundUser);
            setAccessToken(newAccessToken);
            setUser(foundUser);
          }
        }
      }
      setIsInitialized(true);
    };
    
    restoreSession();
  }, [allUsers]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const foundUser = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass
    );

    if (foundUser) {
      // 1. Generate Tokens
      const newAccessToken = await Security.generateAccessToken(foundUser);
      const newRefreshToken = await Security.generateRefreshToken(foundUser.id);

      // 2. Store Access Token in Memory (Secure against XSS)
      setAccessToken(newAccessToken);
      setUser(foundUser);

      // 3. Store Refresh Token (Simulate HttpOnly Cookie)
      localStorage.setItem('bayan_refresh_token', newRefreshToken);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('bayan_refresh_token');
  };

  const addUser = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: Date.now().toString() };
    setAllUsers([...allUsers, userWithId]);
  };

  const updateUser = (updatedUser: User) => {
    setAllUsers(users => users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    if (user && user.id === updatedUser.id) {
      setUser(updatedUser);
    }
  };

  const deleteUser = (id: string) => {
    if (id === "admin-1") return; 
    setAllUsers(users => users.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      accessToken, 
      login, 
      logout, 
      allUsers, 
      addUser, 
      updateUser, 
      deleteUser,
      isInitialized 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
