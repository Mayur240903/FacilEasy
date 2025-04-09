import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AuditoriumBookingForm from './pages/AuditoriumBookingForm';
import CanteenOrderForm from './pages/CanteenOrderForm';
import SportsBookingForm from './pages/SportsBookingForm';
import StationeryRequestForm from './pages/StationeryRequestForm';
import AuditoriumAdminDashboard from './pages/AuditoriumAdminDashboard';
import CanteenAdminDashboard from './pages/CanteenAdminDashboard';
import SportsAdminDashboard from './pages/SportsAdminDashboard';
import StationeryAdminDashboard from './pages/StationeryAdminDashboard';
import DepartmentAdminDashboard from './pages/DepartmentAdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

// AnimatePresence needs to be wrapped inside a component to use the useLocation hook
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/auditorium-booking" element={<AuditoriumBookingForm />} />
        <Route path="/canteen-order" element={<CanteenOrderForm />} />
        <Route path="/sports-booking" element={<SportsBookingForm />} />
        <Route path="/stationery-request" element={<StationeryRequestForm />} />
        <Route path="/auditorium-admin-dashboard" element={<AuditoriumAdminDashboard />} />
        <Route path="/canteen-admin-dashboard" element={<CanteenAdminDashboard />} />
        <Route path="/sports-admin-dashboard" element={<SportsAdminDashboard />} />
        <Route path="/stationery-admin-dashboard" element={<StationeryAdminDashboard />} />
        <Route path="/department-admin-dashboard" element={<DepartmentAdminDashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboardPage = location.pathname === '/student-dashboard' || 
                         location.pathname === '/faculty-dashboard' ||
                         location.pathname === '/auditorium-admin-dashboard' ||
                         location.pathname === '/canteen-admin-dashboard' ||
                         location.pathname === '/sports-admin-dashboard' ||
                         location.pathname === '/stationery-admin-dashboard' ||
                         location.pathname === '/department-admin-dashboard' ||
                         location.pathname === '/admin-dashboard';
  const isFormPage = [
    '/auditorium-booking',
    '/canteen-order',
    '/sports-booking',
    '/stationery-request'
  ].includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {!isAuthPage && !isDashboardPage && !isFormPage && <Navbar />}
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      {!isAuthPage && !isDashboardPage && !isFormPage && <Footer />}
    </div>
  );
}

export default App;
