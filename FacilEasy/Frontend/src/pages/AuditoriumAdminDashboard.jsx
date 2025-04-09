import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AuditoriumAdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // New state variables for Auditorium Tracker functionality
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAuditorium, setSelectedAuditorium] = useState('seminar-hall');
  const [bookings, setBookings] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    pending: true,
    approved: true,
    rejected: true
  });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Database data - will be fetched from API
  const pendingForms = [];
  
  const profileData = {
    name: 'Auditorium Admin',
    id: '',
    department: 'Facilities Management',
    email: '',
    specialization: ''
  };

  const recentActivities = [];

  // Calendar helper functions
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const getYear = (date) => {
    return date.getFullYear();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilters({
      ...statusFilters,
      [status]: !statusFilters[status]
    });
  };

  const handleAuditoriumChange = (event) => {
    setSelectedAuditorium(event.target.value);
  };

  const handleApproveBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'approved' } 
        : booking
    ));
  };

  const handleRejectBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'rejected' } 
        : booking
    ));
  };
  
  // Sample bookings data - would come from API in a real app
  useEffect(() => {
    // Simulate fetching bookings data
    const fetchBookings = () => {
      // This will be replaced with a real API call
      setBookings([]);
    };
    
    fetchBookings();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950' : 'bg-gradient-to-br from-gray-50 to-gray-100'} text-white`}>
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-blue-900/30 bg-gradient-to-r from-blue-900/80 to-gray-900/90 backdrop-blur-md shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="mr-4 hover:bg-blue-600 p-2 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-center w-8 h-8 hover:scale-110 text-blue-100" 
            title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
          >
            <span className={`transition-transform duration-300 ${sidebarVisible ? '' : 'rotate-90'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
        <h1 className="text-xl font-bold border-b-2 border-blue-500 pb-1 px-6 py-1 rounded-t-lg bg-gray-800/50 backdrop-blur-sm shadow-md text-blue-100">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        <div className="flex items-center">
          <span className="mr-2 text-blue-100 font-medium">Auditorium Admin</span>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden ring-2 ring-blue-300 ring-opacity-50 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-blue-100 font-semibold">A</span>
            )}
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900 shadow-md"></div>
          </div>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex relative h-[calc(100vh-64px)]">
        {/* Sidebar - conditionally rendered based on sidebarVisible state */}
        <div className={`${sidebarVisible ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out h-full overflow-hidden bg-gradient-to-b from-blue-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md text-white border-r border-blue-900/20 shadow-xl`}>
          <div className="p-4 w-64">
            {/* Header with logo */}
            <div className="flex items-center mb-8 p-3 bg-gray-800/50 rounded-lg border border-blue-900/20 shadow-inner">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-10 w-10 rounded-md flex items-center justify-center mr-3 shadow-md transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-lg font-semibold text-blue-100">Auditorium Dashboard</span>
            </div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'overview' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('pendingApprovals')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'pendingApprovals' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm">Pending Approvals</span>
                    {pendingForms.length > 0 && (
                      <span className="ml-auto bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingForms.length}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('bookingCalendar')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'bookingCalendar' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm">Booking Tracker</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('forms')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'forms' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span className="text-sm">Faculty Forms</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile
                  </button>
                </li>
              </ul>
            </nav>

            {/* User info at bottom of sidebar */}
            {sidebarVisible && (
              <div className="absolute bottom-0 left-0 w-64 p-4">
                <div className="mx-4 my-2 p-4 rounded-lg bg-gray-800/50 backdrop-blur-md shadow-lg border border-blue-900/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden ring-2 ring-blue-400 shadow-md">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-white font-semibold">A</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-blue-100">Auditorium Admin</p>
                      <p className="text-xs truncate text-gray-400">
                        {profileData.id}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all shadow-md hover:shadow-lg mt-2 transform hover:translate-y-[-2px] hover:shadow-red-600/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main content area - adjust to take full width when sidebar is hidden */}
        <div 
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out h-full bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'}`}
          style={{ width: sidebarVisible ? 'calc(100% - 16rem)' : '100%' }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Profile and Statistics cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 transform transition-all duration-300 hover:shadow-blue-500/10 hover:scale-[1.01] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start relative z-10">
                    <div className="mr-4">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden ring-2 ring-blue-300 ring-opacity-50 shadow-lg">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-white text-xl font-semibold">A</span>
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-800 shadow-md"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-blue-100">Auditorium Admin</h2>
                      <p className="text-sm text-gray-400">ID: {profileData.id}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 relative z-10">
                    <div className="flex">
                      <span className="text-gray-400 w-32">Department:</span>
                      <span className="text-gray-200">{profileData.department}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-400 w-32">Email:</span>
                      <span className="text-gray-200">{profileData.email}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-400 w-32">Specialization:</span>
                      <span className="text-gray-200">{profileData.specialization}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end relative z-10">
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="text-blue-400 hover:text-blue-300 flex items-center group"
                    >
                      View Profile <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">»</span>
                    </button>
                  </div>
                </div>
                
                {/* Statistics Card */}
                <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 transform transition-all duration-300 hover:shadow-blue-500/10 hover:scale-[1.01] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h2 className="text-xl mb-4 font-bold flex items-center text-blue-100 relative z-10">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Auditorium Statistics
                  </h2>
                  <div className="grid grid-cols-3 gap-4 relative z-10">
                    <div className="text-center p-3 rounded-lg bg-amber-900/30 text-amber-200 shadow-lg border border-amber-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-amber-600/20">
                      <p className="text-2xl font-bold">{pendingForms.length}</p>
                      <p className="text-sm">Pending</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-900/30 text-green-200 shadow-lg border border-green-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-green-600/20">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm">Approved</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-red-900/30 text-red-200 shadow-lg border border-red-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-red-600/20">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm">Rejected</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 relative z-10">
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                      Today's Events: 0
                    </div>
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                      Total Bookings: 0
                    </div>
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-green-500 rounded-full"></span>
                      Available Halls: 0
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Auditorium Booking Tracker */}
              <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 relative overflow-hidden group mt-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h2 className="text-xl font-bold flex items-center text-blue-100">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Auditorium Booking Tracker
                  </h2>
                  
                  {/* Auditorium selector */}
                  <div className="flex items-center">
                    <select 
                      className={`rounded-md border px-3 py-1.5 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`}
                      value={selectedAuditorium}
                      onChange={handleAuditoriumChange}
                    >
                      <option value="seminar-hall">Seminar Hall Architecture Building</option>
                      <option value="main-auditorium">Main Auditorium Mechanical Building</option>
                      <option value="lrdc-hall">LRDC Hall</option>
                    </select>
                          </div>
                </div>
                
                {/* Date navigation */}
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <button 
                    className="p-2 rounded-lg text-gray-300 hover:bg-gray-700"
                    onClick={goToPreviousMonth}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                            </button>
                  <h3 className="font-medium text-lg text-blue-100">{getMonthName(currentDate)} {getYear(currentDate)}</h3>
                  <button 
                    className="p-2 rounded-lg text-gray-300 hover:bg-gray-700"
                    onClick={goToNextMonth}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                            </button>
                          </div>
                
                {/* Calendar grid */}
                <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg relative z-10">
                  {/* Day header */}
                  <div className="grid grid-cols-7 text-center border-b border-gray-700">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="py-2 font-medium text-xs bg-gray-700 text-gray-300">
                        {day}
                        </div>
                    ))}
                      </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7">
                    {/* Empty cells for previous month */}
                    {[...Array(getFirstDayOfMonth(currentDate))].map((_, i) => (
                      <div key={`empty-${i}`} className="h-20 p-1 border-b border-r border-gray-700 text-gray-600"></div>
                    ))}
                    
                    {/* Actual days */}
                    {[...Array(getDaysInMonth(currentDate))].map((_, i) => {
                      const day = i + 1;
                      
                      // Filter bookings based on selected auditorium and status filters
                      const filteredBookings = bookings.filter(b => 
                        b.day === day && 
                        b.auditorium === selectedAuditorium && 
                        statusFilters[b.status]
                      );
                      
                      const dayBooking = filteredBookings[0]; // Show the first booking for this day
                      const hasMultipleBookings = filteredBookings.length > 1;
                      
                      const statusColors = {
                        pending: 'bg-amber-900/40 text-amber-200',
                        approved: 'bg-green-900/40 text-green-200',
                        rejected: 'bg-red-900/40 text-red-200'
                      };
                      
                      return (
                        <div 
                          key={`overview-day-${day}`} 
                          className={`h-20 p-1 border-b border-r border-gray-700 ${
                            dayBooking ? 'bg-gray-700/50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{day}</span>
                            {hasMultipleBookings && (
                              <span className="text-xs px-1 py-0.5 rounded-full text-white bg-blue-500 text-[10px]">
                                {filteredBookings.length}
                              </span>
                            )}
                  </div>
                          
                          {dayBooking && (
                            <div className={`mt-1 rounded text-[10px] p-0.5 ${statusColors[dayBooking.status]}`}>
                              <div className="font-medium truncate">{dayBooking.title}</div>
                              <div className="truncate">{dayBooking.time}</div>
                              <div className="truncate">{dayBooking.department}</div>
                  </div>
                )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 relative z-10">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-900/60 mr-2"></div>
                    <span className="text-xs text-gray-300">Pending Approval</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-900/60 mr-2"></div>
                    <span className="text-xs text-gray-300">Approved</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-900/60 mr-2"></div>
                    <span className="text-xs text-gray-300">Rejected</span>
                  </div>
                </div>
                
                {/* View detailed calendar button */}
                <div className="mt-4 flex justify-end relative z-10">
                  <button 
                    onClick={() => setActiveTab('bookingCalendar')}
                    className="text-blue-400 hover:text-blue-300 flex items-center group"
                  >
                    View Full Calendar <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">»</span>
                  </button>
                </div>
              </div>
              
              {/* Recent Activities */}
              <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 relative overflow-hidden group mt-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h2 className="text-xl font-bold flex items-center text-blue-100">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Recent Activities
                  </h2>
                </div>
                
                {/* Recent activities content */}
                <div className="mt-4 relative z-10">
                  {/* Recent activities content */}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'forms' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Faculty Forms
              </h2>
              
              {pendingForms.length > 0 ? (
                <div className="space-y-4">
                  {pendingForms.map(form => (
                    <div 
                      key={form.id}
                      className={`rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      {/* Form details would go here */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-800/50 rounded-lg border border-gray-700 shadow-lg">
                  <div className="text-8xl opacity-20 text-blue-400">🎭</div>
                  <p className="mt-4 text-gray-300 text-xl font-light">No forms pending approval</p>
                  <p className="mt-2 text-gray-500">New booking forms will appear here once submitted</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              {/* Profile Banner */}
              <div className={`rounded-lg overflow-hidden mb-6 relative`}>
                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                
                <div className="absolute bottom-4 left-6 flex items-end">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-blue-500 border-4 border-gray-900 flex items-center justify-center relative z-10 overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-white text-2xl">A</span>
                      )}
                      <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                  </div>
                  <div className="ml-4 text-white">
                    <h2 className="text-2xl font-bold">Auditorium Admin</h2>
                    <p className="text-sm">Faculty ID</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Admin Information */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-100">Admin Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">ID</p>
                          <p className="text-gray-200">Not assigned</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className="text-gray-200">Facilities Management</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Specialization</p>
                          <p className="text-gray-200">Not specified</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Details */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-100">Contact Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-gray-200">Not provided</span>
                            </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span className="text-gray-200">Not provided</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="text-gray-200">Admin Building, Room 102</span>
                      </div>
                      </div>
                    </div>
                    </div>
                    
                  {/* Right column */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Account Settings */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 flex items-center text-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-gray-200">Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive email for new bookings</p>
                        </div>
                        <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform translate-x-6"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-gray-200">Dark Mode</p>
                            <p className="text-sm text-gray-400">Toggle dark/light theme</p>
                          </div>
                          <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-blue-600 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform dark:translate-x-6"></div>
                            </div>
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
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Admin Information */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-100">Admin Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">ID</p>
                          <p className="text-gray-200">Not assigned</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className="text-gray-200">Facilities Management</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Specialization</p>
                          <p className="text-gray-200">Not specified</p>
                        </div>
                      </div>
                        </div>
                        
                    {/* Contact Details */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-100">Contact Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-gray-200">Not provided</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span className="text-gray-200">Not provided</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="text-gray-200">Admin Building, Room 102</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Account Settings */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 flex items-center text-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-gray-200">Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive email for new bookings</p>
                          </div>
                          <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform translate-x-6"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-gray-200">Dark Mode</p>
                            <p className="text-sm text-gray-400">Toggle dark/light theme</p>
                          </div>
                          <div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-blue-600 rounded-full flex items-center p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full transform dark:translate-x-6"></div>
                            </div>
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
          
          {activeTab === 'pendingApprovals' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-100">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Pending Approvals
              </h2>
              
              {pendingForms.length > 0 || bookings.filter(b => b.status === 'pending').length > 0 ? (
                    <div className="space-y-4">
                  {/* Display pending forms */}
                  {pendingForms.map(form => (
                    <div 
                      key={`form-${form.id}`}
                      className="p-6 rounded-lg border-l-4 border-amber-500 bg-gray-800/70 shadow-lg hover:shadow-amber-600/20 transition-all duration-300 transform hover:scale-[1.01] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                        <div className="md:col-span-3">
                          <div className="flex items-start">
                            <div className="bg-amber-900/30 text-amber-200 p-3 rounded-lg mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                      <div>
                              <h3 className="text-xl font-bold text-amber-200">{form.eventName}</h3>
                              <p className="text-sm text-gray-300">{form.requester} • {form.department}</p>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-gray-200">{form.date} • {form.time}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  <span className="text-gray-200">Expected Attendees: {form.attendees}</span>
                                </div>
                              </div>
                              <p className="mt-2 text-gray-400">{form.description}</p>
                            </div>
                          </div>
                      </div>
                      
                        <div className="flex md:flex-col md:items-end justify-end space-y-2">
                          <div className="bg-amber-900/30 text-amber-200 px-3 py-1 rounded-full text-sm mb-4 inline-block">
                            Pending Approval
                      </div>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-green-600/30 flex items-center justify-center"
                            onClick={() => {
                              // Add logic to approve form
                              alert(`Form ${form.id} approved!`);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-red-600/30 flex items-center justify-center"
                            onClick={() => {
                              // Add logic to reject form
                              alert(`Form ${form.id} rejected!`);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-blue-600/30 flex items-center justify-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Display pending bookings */}
                  {bookings.filter(b => b.status === 'pending').map(booking => (
                    <div 
                      key={`booking-${booking.id}`}
                      className="p-6 rounded-lg border-l-4 border-amber-500 bg-gray-800/70 shadow-lg hover:shadow-amber-600/20 transition-all duration-300 transform hover:scale-[1.01] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                        <div className="md:col-span-3">
                          <div className="flex items-start">
                            <div className="bg-amber-900/30 text-amber-200 p-3 rounded-lg mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                      <div>
                              <h3 className="text-xl font-bold text-amber-200">{booking.title}</h3>
                              <p className="text-sm text-gray-300">Day {booking.day} • {booking.department}</p>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-gray-200">{getMonthName(currentDate)} {booking.day}, {getYear(currentDate)} • {booking.time}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  <span className="text-gray-200">Auditorium: {
                                    booking.auditorium === 'seminar-hall' 
                                      ? 'Seminar Hall Architecture Building' 
                                      : booking.auditorium === 'main-auditorium'
                                        ? 'Main Auditorium Mechanical Building'
                                        : 'LRDC Hall'
                                  }</span>
                                </div>
                              </div>
                            </div>
                      </div>
                    </div>
                    
                        <div className="flex md:flex-col md:items-end justify-end space-y-2">
                          <div className="bg-amber-900/30 text-amber-200 px-3 py-1 rounded-full text-sm mb-4 inline-block">
                            Pending Approval
                      </div>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-green-600/30 flex items-center justify-center"
                            onClick={() => handleApproveBooking(booking.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-red-600/30 flex items-center justify-center"
                            onClick={() => handleRejectBooking(booking.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                          <button 
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-blue-600/30 flex items-center justify-center"
                            onClick={() => setActiveTab('bookingCalendar')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Calendar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-800/50 rounded-lg border border-gray-700 shadow-lg">
                  <div className="text-8xl opacity-20 text-blue-400">📅</div>
                  <p className="mt-4 text-gray-300 text-xl font-light">No pending approvals</p>
                  <p className="mt-2 text-gray-500">Booking requests awaiting approval will appear here</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'bookingCalendar' && (
                      <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-100">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Auditorium Booking Calendar
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-gray-800/70 rounded-lg p-4 shadow-xl border border-blue-900/20">
                    <h3 className="text-lg font-bold mb-4 text-blue-100">Auditoriums</h3>
                    <div className="space-y-2">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg text-white cursor-pointer ${selectedAuditorium === 'seminar-hall' ? 'bg-blue-700' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                        onClick={() => setSelectedAuditorium('seminar-hall')}
                      >
                        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        <span>Seminar Hall Architecture Building</span>
                      </div>
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg text-white cursor-pointer ${selectedAuditorium === 'main-auditorium' ? 'bg-blue-700' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                        onClick={() => setSelectedAuditorium('main-auditorium')}
                      >
                        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        <span>Main Auditorium Mechanical Building</span>
                      </div>
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg text-white cursor-pointer ${selectedAuditorium === 'lrdc-hall' ? 'bg-blue-700' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                        onClick={() => setSelectedAuditorium('lrdc-hall')}
                      >
                        <span className="h-3 w-3 rounded-full bg-amber-500 mr-2"></span>
                        <span>LRDC Hall</span>
                      </div>
                      </div>
                      
                    <h3 className="text-lg font-bold mt-6 mb-4 text-blue-100">Status Filter</h3>
                    <div className="space-y-2">
                      <div className="flex items-center mb-2">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 mr-2 accent-blue-500" 
                          checked={statusFilters.pending}
                          onChange={() => handleStatusFilterChange('pending')}
                        />
                        <span className="text-gray-200">Show Pending</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 mr-2 accent-blue-500" 
                          checked={statusFilters.approved}
                          onChange={() => handleStatusFilterChange('approved')}
                        />
                        <span className="text-gray-200">Show Approved</span>
                    </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 mr-2 accent-blue-500" 
                          checked={statusFilters.rejected}
                          onChange={() => handleStatusFilterChange('rejected')} 
                        />
                        <span className="text-gray-200">Show Rejected</span>
                  </div>
                </div>
                    
                    <h3 className="text-lg font-bold mt-6 mb-4 text-blue-100">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 rounded-lg bg-gray-700/70 text-blue-200">
                        <p className="text-2xl font-bold">
                          {bookings.filter(b => 
                            b.auditorium === selectedAuditorium && 
                            new Date().getDate() <= b.day && 
                            b.day <= new Date().getDate() + 7
                          ).length}
                        </p>
                        <p className="text-xs">This Week</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-gray-700/70 text-green-200">
                        <p className="text-2xl font-bold">
                          {bookings.filter(b => b.auditorium === selectedAuditorium).length}
                        </p>
                        <p className="text-xs">This Month</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <div className="bg-gray-800/70 rounded-lg p-4 shadow-xl border border-blue-900/20">
                    {/* Calendar header with navigation */}
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        className="p-2 rounded-lg text-gray-300 hover:bg-gray-700"
                        onClick={goToPreviousMonth}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="font-medium text-lg text-blue-100">{getMonthName(currentDate)} {getYear(currentDate)}</h3>
                      <button 
                        className="p-2 rounded-lg text-gray-300 hover:bg-gray-700"
                        onClick={goToNextMonth}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Calendar view */}
                    <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                      {/* Day header */}
                      <div className="grid grid-cols-7 text-center border-b border-gray-700">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="py-2 font-medium text-xs bg-gray-700 text-gray-300">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar days */}
                      <div className="grid grid-cols-7">
                        {/* Empty cells for previous month */}
                        {[...Array(getFirstDayOfMonth(currentDate))].map((_, i) => (
                          <div key={`empty-${i}`} className="h-20 p-1 border-b border-r border-gray-700 text-gray-600"></div>
                        ))}
                        
                        {/* Actual days */}
                        {[...Array(getDaysInMonth(currentDate))].map((_, i) => {
                          const day = i + 1;
                          
                          // Filter bookings based on selected auditorium and status filters
                          const filteredBookings = bookings.filter(b => 
                            b.day === day && 
                            b.auditorium === selectedAuditorium && 
                            statusFilters[b.status]
                          );
                          
                          const dayBooking = filteredBookings[0]; // Show the first booking for this day
                          const hasMultipleBookings = filteredBookings.length > 1;
                          
                          const statusColors = {
                            pending: 'bg-amber-900/40 text-amber-200',
                            approved: 'bg-green-900/40 text-green-200',
                            rejected: 'bg-red-900/40 text-red-200'
                          };
                          
                          return (
                            <div 
                              key={`overview-day-${day}`} 
                              className={`h-20 p-1 border-b border-r border-gray-700 ${
                                dayBooking ? 'bg-gray-700/50' : ''
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium">{day}</span>
                                {hasMultipleBookings && (
                                  <span className="text-xs px-1 py-0.5 rounded-full text-white bg-blue-500 text-[10px]">
                                    {filteredBookings.length}
                                  </span>
                                )}
                              </div>
                              
                              {dayBooking && (
                                <div className={`mt-1 rounded text-[10px] p-0.5 ${statusColors[dayBooking.status]}`}>
                                  <div className="font-medium truncate">{dayBooking.title}</div>
                                  <div className="truncate">{dayBooking.time}</div>
                                  <div className="truncate">{dayBooking.department}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-900/60 mr-2"></div>
                        <span className="text-xs text-gray-300">Pending Approval</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-900/60 mr-2"></div>
                        <span className="text-xs text-gray-300">Approved</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-900/60 mr-2"></div>
                        <span className="text-xs text-gray-300">Rejected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditoriumAdminDashboard;