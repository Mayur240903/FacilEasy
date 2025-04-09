import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const DepartmentAdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Timetable related state
  const [timetableType, setTimetableType] = useState('student'); // 'student' or 'faculty'
  const [selectedClass, setSelectedClass] = useState('CSE-3A');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [editMode, setEditMode] = useState(false);
  const [currentTimetableCell, setCurrentTimetableCell] = useState(null);
  
  // Add new state variables for button functionality
  const [isPublished, setIsPublished] = useState(false);
  const [showPublishMessage, setShowPublishMessage] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');
  
  // Sample time slots
  const timeSlots = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
    '4:00 - 5:00'
  ];
  
  // Sample classes/sections
  const classes = [
    'CSE-1A', 'CSE-1B', 'CSE-2A', 'CSE-2B', 'CSE-3A', 'CSE-3B', 'CSE-4A', 'CSE-4B',
    'IT-1A', 'IT-1B', 'IT-2A', 'IT-2B', 'IT-3A', 'IT-3B', 'IT-4A', 'IT-4B'
  ];
  
  // Sample faculty list
  const facultyList = [];
  
  // Sample subjects
  const subjects = [];
  
  // Sample classrooms
  const classrooms = [];
  
  // Sample empty timetable structure
  const emptyTimetable = {
    monday: Array(timeSlots.length).fill(null),
    tuesday: Array(timeSlots.length).fill(null),
    wednesday: Array(timeSlots.length).fill(null),
    thursday: Array(timeSlots.length).fill(null),
    friday: Array(timeSlots.length).fill(null)
  };
  
  // Sample timetable data (mapped by class/section)
  const [timetables, setTimetables] = useState({});
  
  // Initialize timetable for a class if it doesn't exist
  const initializeTimetable = (className) => {
    if (!timetables[className]) {
      setTimetables(prev => ({
        ...prev,
        [className]: JSON.parse(JSON.stringify(emptyTimetable))
      }));
    }
  };
  
  // Handle timetable cell edit
  const handleEditCell = (day, timeIndex) => {
    const currentData = timetables[selectedClass]?.[day]?.[timeIndex] || null;
    setCurrentTimetableCell({
      day,
      timeIndex,
      data: currentData ? { ...currentData } : { subject: '', faculty: '', room: '' }
    });
    setEditMode(true);
  };
  
  // Save timetable cell data
  const saveTimeTableCell = (cellData) => {
    if (!currentTimetableCell) return;
    
    const { day, timeIndex } = currentTimetableCell;
    const updatedTimetables = { ...timetables };
    
    if (!updatedTimetables[selectedClass]) {
      updatedTimetables[selectedClass] = JSON.parse(JSON.stringify(emptyTimetable));
    }
    
    // Check if this is actually a change
    const currentValue = updatedTimetables[selectedClass][day][timeIndex];
    const isNewValue = JSON.stringify(currentValue) !== JSON.stringify(cellData);
    
    updatedTimetables[selectedClass][day][timeIndex] = cellData.subject ? cellData : null;
    setTimetables(updatedTimetables);
    
    // If we made an actual change, reset the published state
    if (isNewValue && isPublished) {
      setIsPublished(false);
      setShowPublishMessage(true);
      setPublishMessage(`Changes made. Timetable needs to be republished.`);
      
      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowPublishMessage(false);
      }, 3000);
    }
    
    setEditMode(false);
    setCurrentTimetableCell(null);
  };

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

  // Replace the mock data with empty arrays and objects
  const pendingRequests = [];
  
  const profileData = {
    name: 'Department Admin',
    id: '',
    department: '',
    email: '',
    specialization: ''
  };

  const recentActivities = [];

  // Function to handle PDF export
  const handleExportPDF = () => {
    // In a real application, this would generate and download a PDF
    alert(`Timetable for ${selectedClass} (${timetableType}) has been exported as PDF.`);
  };
  
  // Function to handle publishing the timetable
  const handlePublishTimetable = () => {
    setIsPublished(true);
    setPublishMessage(`${selectedClass} timetable has been published successfully!`);
    setShowPublishMessage(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowPublishMessage(false);
    }, 3000);
  };
  
  // Function to clear the entire timetable
  const handleClearTimetable = () => {
    if (window.confirm(`Are you sure you want to clear the entire timetable for ${selectedClass}?`)) {
      // Create an empty timetable for the selected class
      const updatedTimetables = { ...timetables };
      updatedTimetables[selectedClass] = JSON.parse(JSON.stringify(emptyTimetable));
      setTimetables(updatedTimetables);
      setIsPublished(false);
    }
  };

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
          <span className="mr-2 text-blue-100 font-medium">Department Admin</span>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden ring-2 ring-blue-300 ring-opacity-50 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-blue-100 font-semibold">D</span>
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
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-lg font-semibold text-blue-100">Department Dashboard</span>
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
                    onClick={() => setActiveTab('faculty')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'faculty' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span className="text-sm">Faculty Management</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'requests' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    <span className="text-sm">Faculty Requests</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'courses' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span className="text-sm">Course Management</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('timetable')}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'timetable' 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm">Timetable</span>
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
                        <span className="text-white font-semibold">D</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-blue-100">Department Admin</p>
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
                            <span className="text-white text-xl font-semibold">D</span>
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-800 shadow-md"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-blue-100">Department Admin</h2>
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
                    Department Statistics
                  </h2>
                  <div className="grid grid-cols-3 gap-4 relative z-10">
                    <div className="text-center p-3 rounded-lg bg-amber-900/30 text-amber-200 shadow-lg border border-amber-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-amber-600/20">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm">Pending</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-900/30 text-green-200 shadow-lg border border-green-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-green-600/20">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm">Faculty</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-blue-900/30 text-blue-200 shadow-lg border border-blue-800/30 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-600/20">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm">Courses</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 relative z-10">
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                      Active Students: 0
                    </div>
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-purple-500 rounded-full"></span>
                      Research Projects: 0
                    </div>
                    <div className="inline-flex items-center bg-gray-700/70 rounded-full px-3 py-1 text-sm text-gray-200 shadow-inner">
                      <span className="mr-2 h-2 w-2 bg-green-500 rounded-full"></span>
                      Upcoming Events: 0
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pending Faculty Requests */}
              <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <h2 className="text-xl font-bold flex items-center text-blue-100">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Faculty Requests
                  </h2>
                  <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-xs shadow-md">
                    {pendingRequests.length}
                  </span>
                </div>
                
                {pendingRequests.length > 0 ? (
                  <div className="relative z-10">
                    {pendingRequests.map(request => (
                      <div 
                        key={request.id}
                        className="p-4 rounded-lg border-l-4 border-amber-500 mb-3 bg-gray-700/50 shadow-lg hover:shadow-amber-600/20 transition-all duration-300 transform hover:translate-x-1 hover:scale-[1.01] group"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-amber-200">{request.type}</h3>
                            <p className="text-sm text-gray-300">{request.faculty} • {request.date}</p>
                            <p className="text-sm text-gray-400">{request.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md text-sm shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-red-600/30">
                              Reject
                            </button>
                            <button className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md text-sm shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-green-600/30">
                              Approve
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 relative z-10">
                    <div className="text-8xl opacity-20 text-blue-300">📋</div>
                    <p className="mt-4 text-gray-300">No pending requests at the moment</p>
                    <p className="text-sm text-gray-500">New requests will appear here when submitted</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-end relative z-10">
                  <button 
                    onClick={() => setActiveTab('requests')}
                    className="text-blue-400 hover:text-blue-300 flex items-center group"
                  >
                    View All Requests <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">»</span>
                  </button>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="rounded-lg shadow-xl p-6 backdrop-blur-sm bg-gray-800/70 border border-blue-900/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h2 className="text-xl font-bold flex items-center text-blue-100 mb-4 relative z-10">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Recent Activity
                </h2>
                
                {recentActivities.length > 0 ? (
                  <div className="space-y-4 relative z-10">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start">
                        <div className={`mt-1 mr-3 flex-shrink-0 w-3 h-3 rounded-full ${
                          activity.type === 'approved' ? 'bg-green-500' : 
                          activity.type === 'rejected' ? 'bg-red-500' : 
                          activity.type === 'schedule' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-gray-300">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 relative z-10">
                    <div className="text-6xl opacity-20 text-blue-300">🕒</div>
                    <p className="mt-4 text-gray-300">No recent activities</p>
                    <p className="text-sm text-gray-500">Your activities will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'faculty' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Faculty Management
              </h2>
              
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">Faculty Management content will be implemented in subsequent edits</p>
              </div>
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Faculty Requests
              </h2>
              
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">Faculty Requests content will be implemented in subsequent edits</p>
              </div>
            </div>
          )}
          
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Course Management
              </h2>
              
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">Course Management content will be implemented in subsequent edits</p>
              </div>
            </div>
          )}
          
          {activeTab === 'timetable' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Timetable Management
              </h2>
              
              {/* Timetable Controls */}
              <div className="bg-gray-800/70 rounded-lg p-4 mb-6 shadow-md backdrop-blur-sm border border-blue-900/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Timetable Type Switch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Timetable Type</label>
                    <div className="flex rounded-md overflow-hidden border border-blue-900/30">
                      <button
                        className={`flex-1 py-2 px-4 text-sm ${
                          timetableType === 'student' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        } transition-colors`}
                        onClick={() => {
                          setTimetableType('student');
                          setIsPublished(false);
                        }}
                      >
                        Student
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 text-sm ${
                          timetableType === 'faculty' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        } transition-colors`}
                        onClick={() => {
                          setTimetableType('faculty');
                          setIsPublished(false);
                        }}
                      >
                        Faculty
                      </button>
                    </div>
                  </div>
                  
                  {/* Class/Section Selector */}
                  <div>
                    <label htmlFor="class-select" className="block text-sm font-medium text-gray-300 mb-2">
                      {timetableType === 'student' ? 'Class/Section' : 'Faculty'}
                    </label>
                    <select
                      id="class-select"
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        initializeTimetable(e.target.value);
                        setIsPublished(false);
                      }}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                    >
                      {timetableType === 'student' ? (
                        classes.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))
                      ) : (
                        facultyList.map((faculty) => (
                          <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  {/* Day Selector */}
                  <div>
                    <label htmlFor="day-select" className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                    <select
                      id="day-select"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Timetable Display */}
              <div className="bg-gray-800/70 rounded-lg p-4 shadow-md backdrop-blur-sm border border-blue-900/20 overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 text-left text-sm font-semibold text-blue-300 border-b border-gray-700">Time</th>
                      <th className="p-3 text-left text-sm font-semibold text-blue-300 border-b border-gray-700">Subject</th>
                      <th className="p-3 text-left text-sm font-semibold text-blue-300 border-b border-gray-700">Faculty</th>
                      <th className="p-3 text-left text-sm font-semibold text-blue-300 border-b border-gray-700">Room No.</th>
                      <th className="p-3 text-center text-sm font-semibold text-blue-300 border-b border-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot, index) => {
                      const cellData = timetables[selectedClass]?.[selectedDay]?.[index] || null;
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-700/20'}>
                          <td className="p-3 text-gray-300 border-b border-gray-700">{timeSlot}</td>
                          <td className="p-3 border-b border-gray-700">
                            {cellData?.subject ? (
                              <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-200">
                                {subjects.find(s => s.code === cellData.subject)?.name || cellData.subject}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-3 text-gray-300 border-b border-gray-700">
                            {cellData?.faculty || <span className="text-gray-500">-</span>}
                          </td>
                          <td className="p-3 text-gray-300 border-b border-gray-700">
                            {cellData?.room ? (
                              <span className="px-2 py-1 rounded bg-gray-700/50 text-gray-300">
                                {cellData.room}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <button
                              onClick={() => handleEditCell(selectedDay, index)}
                              className="inline-flex items-center px-2 py-1 text-xs bg-blue-600/90 hover:bg-blue-500 text-white rounded transition-colors"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                              </svg>
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Weekly View Tabs */}
              <div className="bg-gray-800/70 rounded-lg p-4 mt-6 shadow-md backdrop-blur-sm border border-blue-900/20">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Weekly Schedule</h3>
                <div className="flex flex-row overflow-x-auto space-x-2 mb-4 justify-center">
                  {Object.keys(emptyTimetable).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap ${
                        selectedDay === day
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                
                {/* Quick Weekly Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-2">
                  {Object.keys(emptyTimetable).map((day) => {
                    const daySchedule = timetables[selectedClass]?.[day] || [];
                    const classCount = daySchedule.filter(Boolean).length;
                    return (
                      <div key={day} className="bg-gray-700/30 p-3 rounded-lg shadow-sm border border-gray-700/50">
                        <div className="text-xs text-gray-400 capitalize">{day}</div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm text-gray-300">{classCount || 0} classes</span>
                          <span className={`w-2 h-2 rounded-full ${
                            classCount > 6 ? 'bg-red-500' : classCount > 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Bulk Actions */}
              <div className="bg-gray-800/70 rounded-lg p-4 mt-6 shadow-md backdrop-blur-sm border border-blue-900/20">
                <div className="flex flex-wrap justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-300 mb-2 md:mb-0">Timetable Actions</h3>
                  <div className="flex flex-row space-x-2">
                    <button 
                      onClick={handleExportPDF}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Export PDF
                    </button>
                    <button 
                      onClick={handlePublishTimetable}
                      className={`px-3 py-2 ${isPublished ? 'bg-green-700' : 'bg-green-600 hover:bg-green-500'} text-white rounded-lg transition-colors text-sm flex items-center`}
                      disabled={isPublished}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {isPublished ? 'Published' : 'Publish'}
                    </button>
                    <button 
                      onClick={handleClearTimetable}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Clear All
                    </button>
                  </div>
                </div>
                
                {/* Publish success message */}
                {showPublishMessage && (
                  <div className="mt-3 p-2 bg-green-900/50 text-green-200 rounded-md flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {publishMessage}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              {/* Profile Banner */}
              <div className="rounded-lg overflow-hidden mb-6 relative">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                
                <div className="absolute bottom-4 left-6 flex items-end">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-blue-500 border-4 border-gray-900 flex items-center justify-center relative z-10 overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-white text-2xl">D</span>
                      )}
                      <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                  </div>
                  <div className="ml-4 text-white">
                    <h2 className="text-2xl font-bold">Department Admin</h2>
                    <p className="text-sm">Admin ID</p>
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
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditingProfile(false);
                  }}>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-700">
                          {profileImage ? (
                            <img 
                              src={profileImage} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-3xl">D</span>
                            </div>
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border-2 border-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleProfileImageChange}
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
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            defaultValue={profileData.name}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Admin ID</label>
                          <input 
                            type="text" 
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            defaultValue={profileData.id}
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Department</label>
                          <input 
                            type="text" 
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            defaultValue={profileData.department}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input 
                            type="email" 
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            defaultValue={profileData.email}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <input 
                            type="tel" 
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            placeholder="Enter phone number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Specialization</label>
                          <input 
                            type="text" 
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
                            defaultValue={profileData.specialization}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-3">
                      <button 
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
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
                    {/* Admin Information */}
                    <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-blue-900/20' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-100">Admin Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">ID</p>
                          <p className="text-gray-200">{profileData.id || 'Not assigned'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className="text-gray-200">{profileData.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Specialization</p>
                          <p className="text-gray-200">{profileData.specialization || 'Not specified'}</p>
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
                          <span className="text-gray-200">{profileData.email || 'Not provided'}</span>
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
                          <span className="text-gray-200">Department Building, Room 301</span>
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
                            <p className="text-sm text-gray-400">Receive email for new requests</p>
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
        </div>
      </div>
    </div>
  );
};

export default DepartmentAdminDashboard;