
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { LessonDetail } from './pages/LessonDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { About } from './pages/About';

const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* Main Landing Page (Public) */}
              <Route path="/" element={<About />} />
              
              {/* Dashboard (Protected - Old Home) */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              
              <Route path="/lesson/:id" element={
                <PrivateRoute>
                  <LessonDetail />
                </PrivateRoute>
              } />
              
              <Route path="/admin" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
