import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { RestaurantPage } from './pages/RestaurantPage';
import {ExclusiveRestaurantPage} from './pages/ExclusiveRestaurantPage';
import { AuthPage } from './pages/AuthPage';
import { RegisterPage } from './pages/RegisterPage';
import { EditPage } from './pages/EditPage';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { UserProfile } from './pages/user/UserProfile';
import { UserSettings } from './pages/user/UserSettings';

// Business Pages
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessProfile } from './pages/business/BusinessProfile';
import { AddRestaurantPage } from './pages/business/AddRestaurantPage';
import { EditRestaurantPage } from './pages/business/EditRestaurantPage';
import { BusinessSettings } from './pages/business/BusinessSettings';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProfile } from './pages/profiles/AdminProfile';

import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  const renderAuthenticatedRoutes = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </>
        );
      case 'business':
        return (
          <>
            <Route path="/dashboard" element={<BusinessDashboard />} />
            <Route path="/business/profile" element={<BusinessProfile />} />
            <Route path="/business/settings" element={<BusinessSettings />} />
            <Route path="/add-restaurant" element={<AddRestaurantPage />} />
            <Route path="/edit-restaurant/:id" element={<EditRestaurantPage />} />
          </>
        );
      case 'user':
        return (
          <>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/settings" element={<UserSettings />} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated 
                  ? user?.role === 'admin'
                    ? <Navigate to="/admin" />
                    : <HomePage />
                  : <LandingPage />
              } 
            />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/edit/:id/:username" element={<EditPage />} />
            <Route path='/exclusive-restaurant/:id/:rating' element={<ExclusiveRestaurantPage />} />
            <Route path="/oedit-restaurant/:id" element={<EditRestaurantPage />} />
            <Route 
              path="/auth" 
              element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} 
            />
            {renderAuthenticatedRoutes()}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;