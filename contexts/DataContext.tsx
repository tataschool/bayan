
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lesson, Resource } from '../types';
import { INITIAL_LESSONS } from '../constants';
import { useAuth } from './AuthContext';
import * as Security from '../services/security';
import * as Crypto from '../services/crypto';

interface DataContextType {
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id' | 'resources'>) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  addResource: (lessonId: string, resource: Omit<Resource, 'id' | 'createdAt'>) => Promise<void>;
  updateResource: (lessonId: string, resource: Resource) => Promise<void>;
  deleteResource: (lessonId: string, resourceId: string) => Promise<void>;
  loadingData: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load lessons from encrypted storage
  useEffect(() => {
    const loadLessons = async () => {
      try {
        const savedLessons = localStorage.getItem('bayan_lessons_encrypted');
        if (savedLessons) {
          const decrypted = await Crypto.decryptData<Lesson[]>(savedLessons);
          if (decrypted) {
            setLessons(decrypted);
          } else {
            setLessons(INITIAL_LESSONS);
          }
        } else {
          setLessons(INITIAL_LESSONS);
        }
      } catch (e) {
        setLessons(INITIAL_LESSONS);
      } finally {
        setLoadingData(false);
        setIsInitialized(true);
      }
    };
    loadLessons();
  }, []);

  // Save lessons to storage (encrypted)
  useEffect(() => {
    const saveLessons = async () => {
      if (lessons.length > 0 || isInitialized) { // Save only if initialized to prevent overwriting with []
        const encrypted = await Crypto.encryptData(lessons);
        localStorage.setItem('bayan_lessons_encrypted', encrypted);
      }
    };
    
    if (isInitialized) {
        saveLessons();
    }
  }, [lessons, isInitialized]);

  // Security Gate: Verify Token before any mutation
  const verifyPermissions = async () => {
    if (!accessToken) {
      throw new Error("Access Denied: No access token provided.");
    }
    
    // Server-Side Verification Simulation
    const payload = await Security.verifyToken(accessToken);
    if (!payload) {
      throw new Error("Access Denied: Invalid or expired token.");
    }

    if (payload.role !== 'admin') {
      throw new Error("Access Denied: Insufficient permissions.");
    }
    
    return true;
  };

  const addLesson = async (lesson: Omit<Lesson, 'id' | 'resources'>) => {
    await verifyPermissions();
    const newLesson: Lesson = {
      ...lesson,
      id: Date.now().toString(),
      resources: []
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const deleteLesson = async (id: string) => {
    await verifyPermissions();
    if (window.confirm("هل أنت متأكد من حذف هذه الوحدة الدراسية بالكامل؟")) {
      setLessons(prev => prev.filter(l => l.id !== id));
    }
  };

  const addResource = async (lessonId: string, resource: Omit<Resource, 'id' | 'createdAt'>) => {
    await verifyPermissions();
    const newResource: Resource = {
      ...resource,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLessons(prev => prev.map(l => 
      l.id === lessonId ? { ...l, resources: [...l.resources, newResource] } : l
    ));
  };

  const updateResource = async (lessonId: string, resource: Resource) => {
    await verifyPermissions();
    setLessons(prev => prev.map(l => 
      l.id === lessonId ? {
        ...l,
        resources: l.resources.map(r => r.id === resource.id ? resource : r)
      } : l
    ));
  };

  const deleteResource = async (lessonId: string, resourceId: string) => {
    await verifyPermissions();
    if (window.confirm("هل أنت متأكد من حذف هذا المورد؟")) {
      setLessons(prev => prev.map(l => 
        l.id === lessonId ? {
          ...l,
          resources: l.resources.filter(r => r.id !== resourceId)
        } : l
      ));
    }
  };

  return (
    <DataContext.Provider value={{ lessons, addLesson, deleteLesson, addResource, updateResource, deleteResource, loadingData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
