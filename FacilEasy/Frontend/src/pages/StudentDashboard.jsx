import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const StudentDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  
  // Empty initial states - to be populated from the database
  const [profileData, setProfileData] = useState({
    name: '',
    id: '',
    department: '',
    email: '',
    phone: '',
    address: '',
    academicYear: '',
    gender: '',
    profileImage: ''
  });
  
  // For development - add some default service cards to test navigation
  useEffect(() => {
    if (serviceCards.length === 0) {
      setServiceCards([
        {
          id: 'SRV001',
          title: 'Auditorium',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          description: 'Book auditorium for events',
          link: '/auditorium-booking',
          gradient: 'from-purple-500 to-indigo-600'
        },
        {
          id: 'SRV002',
          title: 'Canteen',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          ),
          description: 'Order food and refreshments',
          link: '/canteen-order',
          gradient: 'from-red-500 to-pink-600'
        },
        {
          id: 'SRV003',
          title: 'Sports Facilities',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          description: 'Reserve sports facilities and equipment',
          link: '/sports-booking',
          gradient: 'from-green-500 to-teal-600'
        },
        {
          id: 'SRV004',
          title: 'Stationery',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
          description: 'Request printouts and stationery',
          link: '/stationery-request',
          gradient: 'from-amber-500 to-orange-600'
        }
      ]);
    }
  }, []);
  
  // State for various dashboard data
  const [studentInfo, setStudentInfo] = useState({});
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [semesterTimetable, setSemesterTimetable] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [serviceCards, setServiceCards] = useState([]);
  const [weekDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [currentDayName] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  
  // In a real application, these would be API calls to fetch data
  useEffect(() => {
    // Here you would make actual API calls to fetch data
    fetchUserProfile();
    fetchTodaySchedule();
    fetchSemesterTimetable();
    fetchRecentBookings();
    fetchUpcomingEvents();
    fetchServices();
  }, []);
  
  // API functions to be implemented with real backend
  const fetchUserProfile = () => {
    // API call to get user profile data
    console.log("Fetching user profile");
    // setStudentInfo(response.data);
  };
  
  const fetchTodaySchedule = () => {
    // API call to get today's schedule
    console.log("Fetching today's schedule");
    // setTodaySchedule(response.data);
  };
  
  const fetchSemesterTimetable = () => {
    // API call to get semester timetable
    console.log("Fetching semester timetable");
    // setSemesterTimetable(response.data);
  };
  
  const fetchRecentBookings = () => {
    // API call to get recent bookings
    console.log("Fetching recent bookings");
    // setRecentBookings(response.data);
  };
  
  const fetchUpcomingEvents = () => {
    // API call to get upcoming events
    console.log("Fetching upcoming events");
    // setUpcomingEvents(response.data);
  };
  
  const fetchServices = () => {
    // API call to get services
    console.log("Fetching services");
    // setServiceCards(response.data);
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle service card click
  const handleServiceClick = (serviceId) => {
    // Debug info to track what's happening
    console.log("Service clicked:", serviceId);
    setDebugInfo(`Navigating to service: ${serviceId}`);
    
    // Find the service to get its link
    const service = serviceCards.find(s => s.id === serviceId);
    if (!service) {
      console.error("Service not found:", serviceId);
      setDebugInfo(`Error: Service ${serviceId} not found`);
      return;
    }
    
    // Navigate directly using the link from the service object
    console.log("Navigating to:", service.link);
    navigate(service.link);
  };
  
  // Direct navigation functions for each service
  const goToAuditoriumBooking = () => {
    console.log("Going to auditorium booking");
    navigate('/auditorium-booking');
  };
  
  const goToCanteenOrder = () => {
    console.log("Going to canteen order");
    navigate('/canteen-order');
  };
  
  const goToSportsBooking = () => {
    console.log("Going to sports booking");
    navigate('/sports-booking');
  };
  
  const goToStationeryRequest = () => {
    console.log("Going to stationery request");
    navigate('/stationery-request');
  };
  
  // Handle logout functionality
  const handleLogout = () => {
    // Close sidebar first
    setSidebarOpen(false);
    // In a real app, you would clear authentication tokens/cookies here
    navigate('/login');
  };

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload for profile image
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save the base64 string to profileData
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setIsEditingProfile(false);
    // Update the student info with the new profile data
    setStudentInfo(profileData);
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Dashboard tabs
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'services', label: 'Services' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'auditoriumTracker', label: 'Auditorium Tracker' },
    { id: 'profile', label: 'Profile' }
  ];
  
  // Animation variants for sidebar
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  // Overlay variants
  const overlayVariants = {
    open: {
      opacity: 0.5,
      display: "block"
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none"
      }
    }
  };
  
  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark overlay when sidebar is open on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed left-0 top-0 h-full w-72 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700' 
            : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'
          } border-r shadow-sm z-20 flex flex-col`}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Logo/Dashboard Title with Close Button */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <h1 className="text-xl font-bold truncate whitespace-nowrap mr-2">Student Dashboard</h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-grow py-6 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Close sidebar automatically after selecting a tab
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === tab.id 
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.id === 'overview' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  )}
                  {tab.id === 'bookings' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  )}
                  {tab.id === 'services' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  )}
                  {tab.id === 'timetable' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {tab.id === 'auditoriumTracker' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  )}
                  {tab.id === 'profile' && (
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  )}
                  <span className="transition-transform duration-200 transform group-hover:translate-x-1">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile Summary */}
        <div className={`mx-4 my-2 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-blue-50'
        }`}>
          <div className="flex items-center space-x-3">
            <img 
              src={studentInfo.profileImage} 
              alt={studentInfo.name}
              className="h-10 w-10 rounded-full border-2 border-blue-500" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{studentInfo.name}</p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {studentInfo.id}
              </p>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            } transition-all shadow-sm hover:shadow-md`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <header className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 border-gray-700' 
            : 'bg-gradient-to-r from-white via-white to-blue-50 border-gray-200'
          } border-b px-6 py-4 sticky top-0 z-10 shadow-sm`}>
          <div className="flex justify-between items-center">
            {/* Menu toggle button */}
            <button 
              onClick={toggleSidebar}
              className={`p-2.5 rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center ${
                sidebarOpen 
                  ? isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600' 
                  : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {!sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
            
            {/* Page title - shows current tab */}
            <div className="hidden sm:block relative">
              <h2 className="text-xl font-semibold">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full bg-blue-500"></div>
            </div>
            
            {/* Right: User Info and Notifications */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img
                    src={studentInfo.profileImage}
                    alt={studentInfo.name}
                    className="h-10 w-10 rounded-full border-2 border-blue-500 cursor-pointer transition-transform hover:scale-105 hover:border-opacity-80"
                    onClick={() => {
                      setActiveTab('profile');
                      setSidebarOpen(false);
                    }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <span className="font-medium hidden sm:block">{studentInfo.name}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="px-6 py-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Info Card */}
                <motion.div
                  variants={fadeInUp}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mt-16 -mr-16"></div>
                  <div className="flex items-center space-x-4 mb-6 relative">
                    <div className="relative">
                      <img
                        src={studentInfo.profileImage}
                        alt={studentInfo.name}
                        className="h-16 w-16 rounded-full border-4 border-blue-500"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{studentInfo.name}</h2>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        ID: {studentInfo.id}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className={`w-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Department:</span>
                      <span className="font-medium">{studentInfo.department}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email:</span>
                      <span className="font-medium">{studentInfo.email}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`inline-flex items-center text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline font-medium`}
                    >
                      View Profile
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
                
                {/* Today's Schedule Card */}
                <motion.div
                  variants={fadeInUp}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mt-16 -mr-16"></div>
                  <div className="flex justify-between items-center mb-4 relative">
                    <h2 className="text-xl font-bold">Today's Schedule</h2>
                    <div className={`px-3 py-1.5 rounded-lg ${
                      isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {currentDayName}
                    </div>
                  </div>
                  
                  {todaySchedule.length > 0 ? (
                    <div className="space-y-3 mt-2">
                      {todaySchedule.map((item, index) => (
                        <div 
                          key={index}
                          className={`${
                            isDarkMode 
                              ? 'bg-gray-700/50' 
                              : 'bg-gray-50'
                            } rounded-lg p-3 transition-all hover:shadow-md group`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold group-hover:text-blue-500 transition-colors">{item.subject}</h3>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.professor}
                              </p>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.time}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Room {item.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No classes today!</p>
                    </div>
                  )}
                  
                  <div className="mt-4 text-right">
                    <button 
                      onClick={() => setActiveTab('timetable')}
                      className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline font-medium flex items-center justify-end ml-auto group`}
                    >
                      View full timetable
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
                
                {/* Quick Stats */}
                <motion.div
                  variants={fadeInUp}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mt-16 -mr-16"></div>
                  <h2 className="text-xl font-bold mb-6 relative">Quick Stats</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/20' 
                        : 'bg-gradient-to-br from-blue-50 to-blue-100'
                      } rounded-lg p-4 text-center transform transition-transform hover:scale-105 hover:shadow-md`}
                    >
                      <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>0</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Active Bookings</p>
                    </div>
                    <div className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-green-600/20 to-green-700/20' 
                        : 'bg-gradient-to-br from-green-50 to-green-100'
                      } rounded-lg p-4 text-center transform transition-transform hover:scale-105 hover:shadow-md`}
                    >
                      <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>0</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Completed</p>
                    </div>
                    <div className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-purple-600/20 to-purple-700/20' 
                        : 'bg-gradient-to-br from-purple-50 to-purple-100'
                      } rounded-lg p-4 text-center transform transition-transform hover:scale-105 hover:shadow-md`}
                    >
                      <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>0</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Upcoming Events</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Recent Bookings */}
              <motion.div
                variants={fadeInUp}
                className={`${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                  } rounded-xl border p-6 shadow-sm mt-6`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Bookings</h2>
                  <button 
                    onClick={() => {
                      setActiveTab('bookings');
                      setSidebarOpen(false);
                    }}
                    className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                  >
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Service
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{booking.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`${booking.statusColor} font-medium`}>{booking.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <button
                              onClick={() => {
                                // Navigate to the booking form
                                setSidebarOpen(false);
                                navigate(booking.link);
                              }}
                              className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
              
              {/* Service Cards in Overview tab */}
              <motion.div
                variants={fadeInUp}
                className="mt-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Quick Access</h2>
                  <button 
                    onClick={() => {
                      setActiveTab('services');
                      setSidebarOpen(false);
                    }}
                    className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline group flex items-center`}
                  >
                    View all services
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {serviceCards.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => {
                        // Use the appropriate direct navigation function based on service.id
                        if (service.id === 'SRV001') goToAuditoriumBooking();
                        else if (service.id === 'SRV002') goToCanteenOrder();
                        else if (service.id === 'SRV003') goToSportsBooking();
                        else if (service.id === 'SRV004') goToStationeryRequest();
                        
                        // Log for debugging
                        console.log(`Clicked ${service.title}, navigating to ${service.link}`);
                      }}
                      className={`${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                        } block rounded-xl border p-6 shadow-sm transition-all duration-300 group hover:shadow-md relative overflow-hidden cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:via-transparent group-hover:to-blue-500/10 transition-all duration-500"></div>
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-4 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-md`}>
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                      <div className={`mt-4 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center`}>
                        Access now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Upcoming Events */}
              <motion.div
                variants={fadeInUp}
                className={`${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                  } rounded-xl border p-6 shadow-sm mt-6`}
              >
                <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id}
                      className={`${
                        isDarkMode 
                          ? 'bg-gray-700/50' 
                          : 'bg-gray-50'
                        } p-4 rounded-lg`}
                    >
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.time}</span>
                        </div>
                        <div className="flex items-center sm:col-span-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <button 
                          onClick={() => {
                            // In a real app, this would navigate to event details
                            setSidebarOpen(false);
                          }}
                          className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                } rounded-xl border p-6 shadow-sm`}
            >
              <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{booking.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`${booking.statusColor} font-medium`}>{booking.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <button
                            onClick={() => {
                              // Navigate to the booking form
                              setSidebarOpen(false);
                              navigate(booking.link);
                            }}
                            className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Services</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Access all campus services in one place
                </p>
              </div>
              
              {/* Remove debug info, direct navigation buttons, and direct links sections */}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCards.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => {
                      // Use the appropriate direct navigation function based on service.id
                      if (service.id === 'SRV001') goToAuditoriumBooking();
                      else if (service.id === 'SRV002') goToCanteenOrder();
                      else if (service.id === 'SRV003') goToSportsBooking();
                      else if (service.id === 'SRV004') goToStationeryRequest();
                    }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/80' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } block rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:via-transparent group-hover:to-blue-500/10 transition-all duration-500"></div>
                    <div className="flex items-start mb-6">
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white transform transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-sm group-hover:shadow`}>
                        {service.icon}
                      </div>
                      <div className="absolute top-0 right-0 mt-6 mr-6">
                        <div className={`h-8 w-8 rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-700/80 text-gray-300' 
                            : 'bg-gray-100 text-gray-600'
                          } flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{service.description}</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'
                    } group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors`}>
                      Book now
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Timetable Tab */}
          {activeTab === 'timetable' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Semester Timetable</h2>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Your class schedule for the current semester
                </p>
              </div>
              
              {/* Tabs for each day */}
              <div className={`mb-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-wrap -mb-px">
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => {}} // No functionality needed for this mockup
                      className={`mr-2 inline-block py-4 px-4 text-sm font-medium text-center ${
                        day === currentDayName
                          ? isDarkMode
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-blue-600 border-b-2 border-blue-600'
                          : isDarkMode
                            ? 'text-gray-400 hover:text-gray-300 hover:border-gray-300 border-transparent border-b-2'
                            : 'text-gray-500 hover:text-gray-600 hover:border-gray-300 border-transparent border-b-2'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Timetable content */}
              <div className="grid grid-cols-1 gap-6">
                {weekDays.map((day) => (
                  <div key={day} className={day !== currentDayName ? 'opacity-70' : ''}>
                    <div className="flex items-center mb-4">
                      <h3 className="text-xl font-bold">{day}</h3>
                      {day === currentDayName && (
                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                          isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                        }`}>
                          Today
                        </span>
                      )}
                    </div>
                    
                    <div className={`${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                      } rounded-xl border shadow-sm overflow-hidden`}
                    >
                      {semesterTimetable[day] && semesterTimetable[day].length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {semesterTimetable[day].map((item, index) => (
                            <div 
                              key={index}
                              className={`p-4 ${
                                isDarkMode 
                                  ? 'hover:bg-gray-700/50' 
                                  : 'hover:bg-gray-50'
                              } transition-colors`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div className="mb-2 sm:mb-0">
                                  <h4 className="font-semibold">{item.subject}</h4>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.professor}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      Room {item.room}
                                    </span>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {item.time}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No classes scheduled for {day}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-8 p-4 rounded-lg ${
                isDarkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-100'
              }`}>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mt-0.5 mr-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Note</h3>
                    <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      This timetable is managed by your department admin. If you notice any discrepancies, please contact your department office.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Auditorium Tracker Tab */}
          {activeTab === 'auditoriumTracker' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Auditorium Availability Tracker</h2>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Check auditorium availability before making a booking request
                </p>
              </div>
              
              {/* Auditorium selection tabs */}
              <div className={`mb-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-wrap -mb-px">
                  {['Main Auditorium', 'Seminar Hall', 'LRDC Hall'].map((auditorium) => (
                    <button
                      key={auditorium}
                      className={`mr-2 inline-block py-4 px-4 text-sm font-medium text-center 
                        ${auditorium === 'Main Auditorium'
                          ? isDarkMode
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-blue-600 border-b-2 border-blue-600'
                          : isDarkMode
                            ? 'text-gray-400 hover:text-gray-300 hover:border-gray-300 border-transparent border-b-2'
                            : 'text-gray-500 hover:text-gray-600 hover:border-gray-300 border-transparent border-b-2'
                        }`}
                    >
                      {auditorium}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Date navigation */}
              <div className="flex justify-between items-center mb-4">
                <button className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="font-medium text-lg">May 2023</h3>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Calendar grid */}
              <div className={`rounded-xl overflow-hidden border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-md`}>
                {/* Day header */}
                <div className="grid grid-cols-7 text-center border-b border-gray-200 dark:border-gray-700">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={`py-2 font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for previous month */}
                  {[...Array(3)].map((_, i) => (
                    <div key={`empty-${i}`} className={`h-28 p-2 border-b border-r ${isDarkMode ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'}`}></div>
                  ))}
                  
                  {/* Actual days */}
                  {[...Array(28)].map((_, i) => {
                    const day = i + 1;
                    // Example bookings - would come from API in real app
                    const bookings = [
                      { day: 5, status: 'booked', title: 'Technical Conference', time: '10:00 AM - 2:00 PM' },
                      { day: 12, status: 'booked', title: 'Cultural Event', time: '3:00 PM - 7:00 PM' },
                      { day: 15, status: 'pending', title: 'Department Meeting', time: '1:00 PM - 3:00 PM' },
                      { day: 20, status: 'booked', title: 'Workshop', time: '9:00 AM - 5:00 PM' },
                    ];
                    
                    const dayBooking = bookings.find(b => b.day === day);
                    
                    return (
                      <div 
                        key={`day-${day}`} 
                        className={`h-28 p-2 border-b border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${
                          day === 15 ? (isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50') : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className={day === 15 ? 'font-bold' : ''}>{day}</span>
                          {dayBooking && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              dayBooking.status === 'booked' 
                                ? isDarkMode ? 'bg-red-900/60 text-red-200' : 'bg-red-100 text-red-800'
                                : isDarkMode ? 'bg-amber-900/60 text-amber-200' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {dayBooking.status === 'booked' ? 'Booked' : 'Pending'}
                            </span>
                          )}
                        </div>
                        
                        {dayBooking && (
                          <div className={`mt-1 p-1 rounded text-xs ${
                            dayBooking.status === 'booked'
                              ? isDarkMode ? 'bg-red-900/40 text-red-200' : 'bg-red-100 text-red-800'
                              : isDarkMode ? 'bg-amber-900/40 text-amber-200' : 'bg-amber-100 text-amber-800'
                          }`}>
                            <div className="font-medium truncate">{dayBooking.title}</div>
                            <div>{dayBooking.time}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-green-900/60' : 'bg-green-100'} mr-2`}></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Available</span>
                </div>
                <div className="flex items-center">
                  <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-amber-900/60' : 'bg-amber-100'} mr-2`}></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Pending Approval</span>
                </div>
                <div className="flex items-center">
                  <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-red-900/60' : 'bg-red-100'} mr-2`}></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Booked</span>
                </div>
              </div>
              
              {/* Book now button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate('/auditorium-booking')}
                  className={`px-6 py-2 rounded-lg shadow-md transition-all ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Book Auditorium
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              {/* Profile Banner */}
              <div className={`rounded-lg overflow-hidden mb-6 relative`}>
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="absolute bottom-4 left-6 flex items-end">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-blue-500 border-4 border-gray-900 flex items-center justify-center relative z-10 overflow-hidden">
                      {profileData.profileImage ? (
                        <img src={profileData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-white text-2xl">S</span>
                      )}
                      <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                  </div>
                  <div className="ml-4 text-white">
                    <h2 className="text-2xl font-bold">{profileData.name || 'Student'}</h2>
                    <p className="text-sm">{profileData.id || 'Student ID'}</p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
              
              {/* Editing form or Profile view */}
              {isEditingProfile ? (
                <div className={`rounded-lg shadow p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-700">
                          {profileData.profileImage ? (
                            <img 
                              src={profileData.profileImage} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-3xl">S</span>
                            </div>
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={() => document.getElementById('studentProfileImageUpload').click()}
                          className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border-2 border-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        id="studentProfileImageUpload"
                        type="file" 
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-sm text-gray-500">Click the icon to upload a new profile picture</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Student ID</label>
                          <input 
                            type="text" 
                            name="id"
                            value={profileData.id}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Department</label>
                          <input 
                            type="text" 
                            name="department"
                            value={profileData.department}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                            placeholder="Enter phone number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Academic Year</label>
                          <input 
                            type="text" 
                            name="academicYear"
                            value={profileData.academicYear}
                            onChange={handleProfileChange}
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} border`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-3">
                      <button 
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Student Information */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-600'}`}>Student Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">ID</p>
                          <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.id || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.department || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Academic Year</p>
                          <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.academicYear || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Gender</p>
                          <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.gender || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Details */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-600'}`}>Contact Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.email || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.address || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Account Settings */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-blue-100' : 'text-blue-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive email for booking updates</p>
                          </div>
                          <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform translate-x-6"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Dark Mode</p>
                            <p className="text-sm text-gray-400">Toggle dark/light theme</p>
                          </div>
                          <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-blue-600 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform dark:translate-x-6"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Two-Factor Authentication</p>
                            <p className="text-sm text-gray-400">Enhance your account security</p>
                          </div>
                          <div>
                            <button className={`px-3 py-1 rounded-lg border ${
                              isDarkMode 
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            } text-sm font-medium transition-colors`}>
                              Setup
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button 
                          onClick={() => setIsEditingProfile(true)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard; 