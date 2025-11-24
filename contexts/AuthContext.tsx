
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { INITIAL_USERS } from '../constants';
import * as Security from '../services/security';
import * as Crypto from '../services/crypto';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  allUsers: User[];
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  importUsers: (users: User[]) => Promise<void>;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load users from storage (encrypted) or fallback to initial
  useEffect(() => {
    const loadUsers = async () => {
      const storedEncryptedUsers = localStorage.getItem('bayan_users_encrypted');
      
      if (storedEncryptedUsers) {
        const decryptedUsers = await Crypto.decryptData<User[]>(storedEncryptedUsers);
        if (decryptedUsers) {
          setAllUsers(decryptedUsers);
        } else {
          // Fallback if decryption fails
          setAllUsers(INITIAL_USERS);
        }
      } else {
        setAllUsers(INITIAL_USERS);
      }
    };
    loadUsers();
  }, []);

  // Save users to storage (encrypted) whenever it changes
  useEffect(() => {
    const saveUsers = async () => {
      if (allUsers.length > 0) {
        const encrypted = await Crypto.encryptData(allUsers);
        localStorage.setItem('bayan_users_encrypted', encrypted);
      }
    };
    if (isInitialized) { // Only save after initial load to avoid overwriting with empty
       saveUsers();
    }
  }, [allUsers, isInitialized]);

  // Session Restoration
  useEffect(() => {
    const restoreSession = async () => {
      const storedRefreshToken = localStorage.getItem('bayan_refresh_token');
      
      if (storedRefreshToken) {
        const payload = await Security.verifyToken(storedRefreshToken);
        if (payload && payload.sub) {
          // Note: accessing allUsers state inside useEffect directly might be stale if not dependent,
          // but since allUsers loads async, we might need to wait.
          // For simplicity in this flow, we rely on the fact that allUsers will load roughly same time.
          // A better approach is to wait for users to be loaded.
        }
      }
      setIsInitialized(true);
    };
    
    restoreSession();
  }, []);

  // Effect to sync user if allUsers loads later than session restore
  useEffect(() => {
    const syncUser = async () => {
      const storedRefreshToken = localStorage.getItem('bayan_refresh_token');
      if (storedRefreshToken && allUsers.length > 0 && !user) {
         const payload = await Security.verifyToken(storedRefreshToken);
         if (payload && payload.sub) {
            const foundUser = allUsers.find(u => u.id === payload.sub);
            if (foundUser) {
              const newAccessToken = await Security.generateAccessToken(foundUser);
              setAccessToken(newAccessToken);
              setUser(foundUser);
            }
         }
      }
    };
    syncUser();
  }, [allUsers, user]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const hashedPassword = await Crypto.hashPassword(pass);
    
    const foundUser = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedPassword
    );

    if (foundUser) {
      const newAccessToken = await Security.generateAccessToken(foundUser);
      const newRefreshToken = await Security.generateRefreshToken(foundUser.id);

      setAccessToken(newAccessToken);
      setUser(foundUser);
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

  const addUser = async (newUser: Omit<User, 'id'>) => {
    // Hash the password before saving
    const hashedPassword = newUser.password ? await Crypto.hashPassword(newUser.password) : undefined;
    const userWithId = { 
      ...newUser, 
      password: hashedPassword,
      id: Date.now().toString() 
    };
    setAllUsers(prev => [...prev, userWithId]);
  };

  const updateUser = async (updatedUser: User) => {
    // Check if password changed (simple check: if it doesn't match existing hash format or we assume it's a new plain text)
    // In this simple app, the AdminDashboard sends plain text if changed.
    // We need to know if it's already hashed. 
    // SHA-256 hex is 64 chars. If input is different from current stored, we hash it.
    
    const currentUser = allUsers.find(u => u.id === updatedUser.id);
    let finalPassword = updatedUser.password;

    if (currentUser && updatedUser.password !== currentUser.password) {
       // Password has changed, so hash the new one
       if (updatedUser.password) {
         finalPassword = await Crypto.hashPassword(updatedUser.password);
       }
    }

    const userToSave = { ...updatedUser, password: finalPassword };

    setAllUsers(users => users.map(u => (u.id === userToSave.id ? userToSave : u)));
    if (user && user.id === userToSave.id) {
      setUser(userToSave);
    }
  };

  const deleteUser = async (id: string) => {
    if (id === "admin-1") return; 
    setAllUsers(users => users.filter(u => u.id !== id));
  };

  const importUsers = async (users: User[]) => {
    if (Array.isArray(users)) {
      setAllUsers(users);
    }
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
      importUsers,
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
