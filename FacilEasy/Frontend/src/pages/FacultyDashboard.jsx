import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const FacultyDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [forwardModalOpen, setForwardModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  
  // Empty initial states - to be populated from the database
  const [profileData, setProfileData] = useState({
    name: '',
    id: '',
    department: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    gender: '',
    profileImage: ''
  });
  // State to show profile image preview
  const [imagePreview, setImagePreview] = useState('');
  
  // State for various dashboard data
  const [facultyInfo, setFacultyInfo] = useState({});
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [facultyTimetable, setFacultyTimetable] = useState({});
  const [studentForms, setStudentForms] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [adminTypes, setAdminTypes] = useState([]);
  const [weekDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [currentDayName] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  
  // In a real application, these would be API calls to fetch data
  useEffect(() => {
    // Here you would make actual API calls to fetch data
    fetchUserProfile();
    fetchTodaySchedule();
    fetchFacultyTimetable();
    fetchStudentForms();
    fetchPendingApprovals();
    fetchAdminTypes();
  }, []);
  
  // API functions to be implemented with real backend
  const fetchUserProfile = () => {
    // API call to get user profile data
    console.log("Fetching faculty profile");
  };
  
  const fetchTodaySchedule = () => {
    console.log("Fetching today's schedule");
  };
  
  const fetchFacultyTimetable = () => {
    console.log("Fetching faculty timetable");
  };
  
  const fetchStudentForms = () => {
    console.log("Fetching student forms");
  };
  
  const fetchPendingApprovals = () => {
    console.log("Fetching pending approvals");
  };
  
  const fetchAdminTypes = () => {
    console.log("Fetching admin types");
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle desktop sidebar visibility
  const toggleDesktopSidebar = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };
  
  // Handle logout functionality
  const handleLogout = () => {
    setSidebarOpen(false);
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
        // Update preview
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    setFacultyInfo(profileData);
  };

  // Handle form approval - update to include forwarding option
  const handleFormApproval = (formId, action) => {
    // In real application, this would be an API call
    console.log(`Form ${formId} ${action}`);
    
    if (action === 'forward') {
      const form = studentForms.find(f => f.id === formId);
      handleForwardForm(form);
      return;
    }
    
    // Update forms list with new status
    setStudentForms(prevForms => 
      prevForms.map(form => 
        form.id === formId ? { ...form, status: action === 'approve' ? 'Approved' : 'Rejected' } : form
      )
    );
    
    // Update pending approvals
    setPendingApprovals(prevPending => 
      prevPending.filter(form => form.id !== formId)
    );
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
    { id: 'forms', label: 'Student Forms' },
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

  // Handle form forwarding
  const handleForwardForm = (form) => {
    setSelectedForm(form);
    setForwardModalOpen(true);
  };
  
  // Submit form forwarding
  const submitForwardForm = (adminId) => {
    // In a real app, this would be an API call to forward the form
    console.log(`Forwarding form ${selectedForm.id} to admin ${adminId}`);
    
    // Update the form status
    setStudentForms(prevForms => 
      prevForms.map(form => 
        form.id === selectedForm.id ? { ...form, status: 'Forwarded', forwardedTo: adminId } : form
      )
    );
    
    // Remove from pending approvals if it was there
    setPendingApprovals(prevPending => 
      prevPending.filter(form => form.id !== selectedForm.id)
    );
    
    // Close the modal
    setForwardModalOpen(false);
    setSelectedForm(null);
  };
  
  // Get the appropriate admin for a form type
  const getRecommendedAdmin = (formType) => {
    if (formType.includes('Auditorium')) return adminTypes.find(admin => admin.type === 'Auditorium');
    if (formType.includes('Sports')) return adminTypes.find(admin => admin.type === 'Sports');
    if (formType.includes('Canteen')) return adminTypes.find(admin => admin.type === 'Canteen');
    if (formType.includes('Stationery')) return adminTypes.find(admin => admin.type === 'Stationery');
    return adminTypes.find(admin => admin.type === 'Department');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`fixed inset-y-0 left-0 w-72 z-30 md:hidden flex flex-col ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden`}
          >
            {/* Logo/Dashboard Title with Close Button */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  F
                </div>
                <h1 className="text-xl font-bold truncate whitespace-nowrap mr-2">Faculty Dashboard</h1>
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
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        activeTab === tab.id 
                          ? isDarkMode 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                            : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                          : isDarkMode 
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-50' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {tab.id === 'overview' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      )}
                      
                      {tab.id === 'forms' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      
                      {tab.id === 'timetable' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      
                      {tab.id === 'profile' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      
                      {tab.id === 'auditoriumTracker' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      )}
                      
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* User Info */}
            <div className={`mx-4 my-2 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-purple-50'
            }`}>
              <div className="flex items-center space-x-3">
                <img 
                  src={facultyInfo.profileImage || "https://via.placeholder.com/150"} 
                  alt={facultyInfo.name || "Faculty Profile"}
                  className="h-10 w-10 rounded-full border-2 border-purple-500" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{facultyInfo.name || "Faculty Name"}</p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {facultyInfo.id || "Faculty ID"}
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
        )}
      </AnimatePresence>
      
      {/* Main Content with Desktop Sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden md:block bg-opacity-95 h-screen ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border-r transition-all duration-300 z-10 shadow-sm ${desktopSidebarOpen ? 'w-64' : 'w-0'}`}
        >
          {/* Only show content when sidebar is open */}
          {desktopSidebarOpen && (
            <div className="h-full flex flex-col">
              {/* Logo/Dashboard Title */}
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  F
                </div>
                <h1 className="text-xl font-bold ml-2">Faculty Dashboard</h1>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                  {tabs.map(tab => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                          activeTab === tab.id 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                              : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                            : isDarkMode 
                              ? 'text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {tab.id === 'overview' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        )}
                        
                        {tab.id === 'forms' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        
                        {tab.id === 'timetable' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        
                        {tab.id === 'profile' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        
                        {tab.id === 'auditoriumTracker' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        )}
                        
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* User Info */}
              <div className={`mx-4 my-2 p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-purple-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <img 
                    src={facultyInfo.profileImage || "https://via.placeholder.com/150"} 
                    alt={facultyInfo.name || "Faculty Profile"}
                    className="h-10 w-10 rounded-full border-2 border-purple-500" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{facultyInfo.name || "Faculty Name"}</p>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {facultyInfo.id || "Faculty ID"}
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
            </div>
          )}
        </aside>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Header */}
          <header className={`${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            } border-b sticky top-0 z-20`}>
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
              {/* Left: Mobile menu button, desktop sidebar toggle and page title */}
              <div className="flex items-center space-x-4">
                {/* Mobile sidebar toggle */}
                <button 
                  onClick={toggleSidebar}
                  className="block md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Desktop sidebar toggle */}
                <button 
                  onClick={toggleDesktopSidebar}
                  className="hidden md:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={desktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                >
                  {!desktopSidebarOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  )}
                </button>
                
                <div className="hidden sm:block relative">
                  <h2 className="text-xl font-semibold">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full bg-purple-500"></div>
                </div>
              </div>
              
              {/* Right: User Info and Notifications */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <img
                      src={facultyInfo.profileImage || "https://via.placeholder.com/150"}
                      alt={facultyInfo.name || "Faculty Profile"}
                      className="h-10 w-10 rounded-full border-2 border-purple-500 cursor-pointer transition-transform hover:scale-105 hover:border-opacity-80"
                      onClick={() => {
                        setActiveTab('profile');
                        setSidebarOpen(false);
                      }}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                    <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <span className="font-medium hidden sm:block">{facultyInfo.name || "Faculty"}</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
            {/* Content tabs go here */}
            {activeTab === 'overview' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Faculty Info Card */}
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
                          src={facultyInfo.profileImage || "https://via.placeholder.com/150"}
                          alt={facultyInfo.name || "Faculty Profile"}
                          className="h-16 w-16 rounded-full border-4 border-blue-500"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{facultyInfo.name || "Faculty Name"}</h2>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                          <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                          ID: {facultyInfo.id || "---"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className={`w-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Department:</span>
                        <span className="font-medium">{facultyInfo.department || "---"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`w-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email:</span>
                        <span className="font-medium">{facultyInfo.email || "---"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`w-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specialization:</span>
                        <span className="font-medium">{facultyInfo.specialization || "---"}</span>
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mt-16 -mr-16"></div>
                    <div className="flex justify-between items-center mb-6 relative">
                      <h3 className="text-lg font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Today's Schedule ({currentDayName})
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {new Date().toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {todaySchedule && todaySchedule.length > 0 ? (
                      <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {todaySchedule.map((item, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              isDarkMode 
                                ? 'border-gray-700 bg-gray-700/40' 
                                : 'border-gray-100 bg-gray-50'
                            } flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`h-10 w-10 rounded-md flex-shrink-0 flex items-center justify-center ${
                                item.classType === 'Lecture' 
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                                  : item.classType === 'Tutorial'
                                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                                    : item.classType === 'Lab'
                                      ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300'
                                      : 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300'
                              }`}>
                                {item.classType === 'Lecture' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                  </svg>
                                )}
                                {item.classType === 'Tutorial' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                  </svg>
                                )}
                                {item.classType === 'Lab' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                  </svg>
                                )}
                                {item.classType === 'Meeting' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{item.subject}</h4>
                                <div className="text-sm flex flex-wrap gap-x-4 mt-1">
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {item.location}
                                  </span>
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {item.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mb-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No classes scheduled for today</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>Your schedule will appear here when available</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 text-right">
                      <button
                        onClick={() => setActiveTab('timetable')}
                        className={`inline-flex items-center text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline font-medium`}
                      >
                        View Full Timetable
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Pending Approvals Card */}
                <motion.div
                  variants={fadeInUp}
                  className={`mt-6 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Pending Approvals
                    </h3>
                    <span className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium ${
                      isDarkMode
                        ? 'bg-amber-900/50 text-amber-300'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {pendingApprovals ? pendingApprovals.length : 0}
                    </span>
                  </div>
                  
                  {pendingApprovals && pendingApprovals.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Form ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Student
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                          {pendingApprovals.map((form) => (
                            <tr key={form.id} className={`${
                              isDarkMode 
                                ? 'hover:bg-gray-700/50' 
                                : 'hover:bg-gray-50'
                              } transition-colors`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium">{form.id}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium">{form.studentName}</div>
                                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{form.studentId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  form.formType.includes('Auditorium') 
                                    ? isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                    : form.formType.includes('Sports')
                                      ? isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                                      : form.formType.includes('Stationery')
                                        ? isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'
                                        : isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {form.formType}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {form.submittedOn}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                <div className="flex items-center justify-end space-x-2">
                                  <button 
                                    onClick={() => handleFormApproval(form.id, 'approve')}
                                    className={`px-3 py-1 rounded-md ${
                                      isDarkMode
                                        ? 'bg-green-900/50 text-green-300 hover:bg-green-900/70'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    } transition-colors`}
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    onClick={() => handleFormApproval(form.id, 'reject')}
                                    className={`px-3 py-1 rounded-md ${
                                      isDarkMode
                                        ? 'bg-red-900/50 text-red-300 hover:bg-red-900/70'
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    } transition-colors`}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mb-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No pending approvals at the moment</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>Form approvals will appear here when submitted</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setActiveTab('forms')}
                      className={`inline-flex items-center text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} hover:underline font-medium`}
                    >
                      View All Forms
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Timetable Tab */}
            {activeTab === 'timetable' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border p-6 shadow-sm overflow-hidden`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center mb-3 sm:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Faculty Timetable
                    </h3>

                    <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-blue-900/30 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      Semester: Spring 2023
                    </div>
                  </div>
                  
                  {/* Timetable Tabs */}
                  <div className="mb-6 overflow-x-auto">
                    <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
                      {weekDays.map((day) => (
                        <button
                          key={day}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            day === currentDayName
                              ? isDarkMode
                                ? 'border-blue-500 text-blue-400'
                                : 'border-blue-500 text-blue-700'
                              : isDarkMode
                                ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Timetable Content */}
                  <div className="space-y-6">
                    {weekDays.map((day) => (
                      <div key={day} className={`${day !== currentDayName && 'hidden'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">{day}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            isDarkMode 
                              ? 'bg-gray-700' 
                              : 'bg-gray-100'
                          }`}>
                            {facultyTimetable && facultyTimetable[day] ? facultyTimetable[day].length : 0} Classes
                          </span>
                        </div>
                        
                        {facultyTimetable && facultyTimetable[day] && facultyTimetable[day].length > 0 ? (
                          <div className="space-y-4">
                            {facultyTimetable[day].map((item, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg border ${
                                  isDarkMode 
                                    ? 'border-gray-700 bg-gray-700/40' 
                                    : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                  <div className="mb-3 sm:mb-0">
                                    <div className="flex items-center">
                                      <div className={`h-10 w-10 rounded-md flex-shrink-0 flex items-center justify-center mr-3 ${
                                        item.classType === 'Lecture' 
                                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                                          : item.classType === 'Tutorial'
                                            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                                            : item.classType === 'Lab'
                                              ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300'
                                              : 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300'
                                      }`}>
                                        {item.classType === 'Lecture' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                          </svg>
                                        )}
                                        {item.classType === 'Tutorial' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                          </svg>
                                        )}
                                        {item.classType === 'Lab' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                          </svg>
                                        )}
                                        {item.classType === 'Meeting' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                          </svg>
                                        )}
                                        {item.classType === 'Office Hours' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                          </svg>
                                        )}
                                        {item.classType === 'Seminar' && (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                          </svg>
                                        )}
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{item.subject}</h4>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                          isDarkMode 
                                            ? 'bg-gray-700 text-gray-300' 
                                            : 'bg-gray-200 text-gray-800'
                                        }`}>
                                          {item.classType}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2">
                                    <div className={`px-3 py-1 rounded-md flex items-center text-sm ${
                                      isDarkMode 
                                        ? 'bg-gray-700' 
                                        : 'bg-gray-100'
                                    }`}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {item.time}
                                    </div>
                                    
                                    <div className={`px-3 py-1 rounded-md flex items-center text-sm ${
                                      isDarkMode 
                                        ? 'bg-gray-700' 
                                        : 'bg-gray-100'
                                    }`}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {item.location}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-10 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg font-medium mb-1`}>No classes scheduled for {day}</p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} max-w-sm text-center`}>
                                Your timetable will be updated by the administrator
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Student Forms Tab */}
            {activeTab === 'forms' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                    } rounded-xl border shadow-sm overflow-hidden`}
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-bold flex items-center mb-3 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Student Submitted Forms
                      </h3>

                      <div className="flex space-x-2">
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                          isDarkMode 
                            ? 'bg-amber-900/30 text-amber-300' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                          Pending: {studentForms ? studentForms.filter(form => form.status === 'Pending').length : 0}
                        </div>
                        
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                          isDarkMode 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Approved: {studentForms ? studentForms.filter(form => form.status === 'Approved').length : 0}
                        </div>
                        
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                          isDarkMode 
                            ? 'bg-red-900/30 text-red-300' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          Rejected: {studentForms ? studentForms.filter(form => form.status === 'Rejected').length : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Form ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Student
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                        {studentForms && studentForms.length > 0 ? (
                          studentForms.map((form) => (
                            <tr key={form.id} className={`${
                              isDarkMode 
                                ? 'hover:bg-gray-700/50' 
                                : 'hover:bg-gray-50'
                              } transition-colors`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium">{form.id}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium">{form.studentName}</div>
                                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{form.studentId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  form.formType.includes('Auditorium') 
                                    ? isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                    : form.formType.includes('Sports')
                                      ? isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                                      : form.formType.includes('Stationery')
                                        ? isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'
                                        : isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {form.formType}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {form.submittedOn}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  form.status === 'Approved'
                                    ? isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                                    : form.status === 'Rejected'
                                      ? isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'
                                      : form.status === 'Forwarded'
                                        ? isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                        : isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {form.status}
                                  {form.status === 'Forwarded' && form.forwardedTo && (
                                    <span className="ml-1 text-xs opacity-75">
                                      {' '}to {adminTypes.find(admin => admin.id === form.forwardedTo)?.type || 'Admin'}
                                    </span>
                                  )}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                {form.status === 'Pending' ? (
                                  <div className="flex items-center justify-end space-x-2">
                                    <button 
                                      onClick={() => handleFormApproval(form.id, 'approve')}
                                      className={`px-3 py-1 rounded-md ${
                                        isDarkMode
                                          ? 'bg-green-900/50 text-green-300 hover:bg-green-900/70'
                                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                                      } transition-colors`}
                                    >
                                      Approve
                                    </button>
                                    <button 
                                      onClick={() => handleFormApproval(form.id, 'forward')}
                                      className={`px-3 py-1 rounded-md ${
                                        isDarkMode
                                          ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-900/70'
                                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                      } transition-colors`}
                                    >
                                      Forward
                                    </button>
                                    <button 
                                      onClick={() => handleFormApproval(form.id, 'reject')}
                                      className={`px-3 py-1 rounded-md ${
                                        isDarkMode
                                          ? 'bg-red-900/50 text-red-300 hover:bg-red-900/70'
                                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                                      } transition-colors`}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    className={`px-3 py-1 rounded-md ${
                                      isDarkMode
                                        ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-900/70'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    } transition-colors`}
                                  >
                                    View Details
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg font-medium mb-1`}>No forms submitted yet</p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} max-w-sm text-center`}>
                                  Student form submissions will appear here when available
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                {/* Profile Banner */}
                <div className={`rounded-lg overflow-hidden mb-6 relative`}>
                  <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                  
                  <div className="absolute bottom-4 left-6 flex items-end">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-purple-500 border-4 border-gray-900 flex items-center justify-center relative z-10 overflow-hidden">
                        {profileData.profileImage ? (
                          <img src={profileData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-white text-2xl">F</span>
                        )}
                        <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      </div>
                    </div>
                    <div className="ml-4 text-white">
                      <h2 className="text-2xl font-bold">{profileData.name || 'Faculty Member'}</h2>
                      <p className="text-sm">{profileData.id || 'Faculty ID'}</p>
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
                              <div className="h-full w-full bg-purple-500 flex items-center justify-center">
                                <span className="text-white text-3xl">F</span>
                              </div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => document.getElementById('profileImageUpload').click()}
                            className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border-2 border-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                        </div>
                        <input 
                          id="profileImageUpload"
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
                            <label className="block text-sm font-medium mb-1">Faculty ID</label>
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
                            <label className="block text-sm font-medium mb-1">Specialization</label>
                            <input 
                              type="text" 
                              name="specialization"
                              value={profileData.specialization}
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
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
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
                      {/* Faculty Information */}
                      <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-purple-900/20' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-purple-100' : 'text-purple-600'}`}>Faculty Information</h3>
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
                            <p className="text-gray-400 text-sm">Specialization</p>
                            <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.specialization || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Gender</p>
                            <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.gender || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Details */}
                      <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-purple-900/20' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-purple-100' : 'text-purple-600'}`}>Contact Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.email || 'Not provided'}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{profileData.phone || 'Not provided'}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                      <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-purple-900/20' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-purple-100' : 'text-purple-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Account Settings
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Notifications</p>
                              <p className="text-sm text-gray-400">Receive email for new student forms</p>
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
                              <div className="w-12 h-6 bg-gray-200 dark:bg-purple-600 rounded-full flex items-center p-1 cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full transform dark:translate-x-6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <button 
                            onClick={() => setIsEditingProfile(true)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center"
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
            
            {/* Auditorium Tracker Tab */}
            {activeTab === 'auditoriumTracker' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Auditorium Availability Tracker</h2>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    View auditorium bookings and student requests that need approval
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
                              ? 'text-purple-400 border-b-2 border-purple-400'
                              : 'text-purple-600 border-b-2 border-purple-600'
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
                
                {/* Dashboard stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-purple-900/30 border border-purple-800/30' : 'bg-purple-50 border border-purple-100'}`}>
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'} mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approvals</p>
                        <p className="text-2xl font-semibold">{pendingApprovals.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-green-900/30 border border-green-800/30' : 'bg-green-50 border border-green-100'}`}>
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-800/50' : 'bg-green-100'} mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved Bookings</p>
                        <p className="text-2xl font-semibold">12</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-blue-900/30 border border-blue-800/30' : 'bg-blue-50 border border-blue-100'}`}>
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'} mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events This Month</p>
                        <p className="text-2xl font-semibold">24</p>
                      </div>
                    </div>
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
                        { day: 5, status: 'booked', title: 'Technical Conference', time: '10:00 AM - 2:00 PM', organizer: 'Dr. Smith' },
                        { day: 12, status: 'booked', title: 'Cultural Event', time: '3:00 PM - 7:00 PM', organizer: 'Student Council' },
                        { day: 15, status: 'pending', title: 'Department Meeting', time: '1:00 PM - 3:00 PM', organizer: 'CS Department' },
                        { day: 18, status: 'pending', title: 'Guest Lecture', time: '2:00 PM - 4:00 PM', organizer: 'Dr. Johnson' },
                        { day: 20, status: 'booked', title: 'Workshop', time: '9:00 AM - 5:00 PM', organizer: 'Engineering Cell' },
                      ];
                      
                      const dayBooking = bookings.find(b => b.day === day);
                      
                      return (
                        <div 
                          key={`day-${day}`} 
                          className={`h-28 p-2 border-b border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${
                            day === 15 || day === 18 ? (isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50') : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className={day === 15 || day === 18 ? 'font-bold' : ''}>{day}</span>
                            {dayBooking && (
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                dayBooking.status === 'booked' 
                                  ? isDarkMode ? 'bg-green-900/60 text-green-200' : 'bg-green-100 text-green-800'
                                  : isDarkMode ? 'bg-purple-900/60 text-purple-200' : 'bg-purple-100 text-purple-800'
                              }`}>
                                {dayBooking.status === 'booked' ? 'Approved' : 'Needs Approval'}
                              </span>
                            )}
                          </div>
                          
                          {dayBooking && (
                            <div className={`mt-1 p-1 rounded text-xs ${
                              dayBooking.status === 'booked'
                                ? isDarkMode ? 'bg-green-900/40 text-green-200' : 'bg-green-100 text-green-800'
                                : isDarkMode ? 'bg-purple-900/40 text-purple-200' : 'bg-purple-100 text-purple-800'
                            }`}>
                              <div className="font-medium truncate">{dayBooking.title}</div>
                              <div>{dayBooking.time}</div>
                              <div className="text-xs opacity-75">{dayBooking.organizer}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Pending approvals list */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Pending Approval Requests</h3>
                  
                  <div className={`rounded-xl overflow-hidden border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-md mb-6`}>
                    {pendingApprovals.length > 0 ? (
                      pendingApprovals.map((form, index) => (
                        <div 
                          key={form.id} 
                          className={`p-4 flex flex-col md:flex-row md:items-center justify-between ${
                            index < pendingApprovals.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                          }`}
                        >
                          <div className="mb-3 md:mb-0">
                            <h4 className="font-medium">{form.event}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="mr-3">Student: {form.student}</span>
                              <span className="mr-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {form.date}
                              </span>
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {form.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => setForwardModalOpen(true)} 
                              className={`px-3 py-1 rounded-md text-sm ${
                                isDarkMode 
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                              }`}
                            >
                              Forward to Admin
                            </button>
                            <button 
                              className={`px-3 py-1 rounded-md text-sm ${
                                isDarkMode 
                                  ? 'bg-red-900/70 hover:bg-red-800 text-white'
                                  : 'bg-red-100 hover:bg-red-200 text-red-700'
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <div className="text-5xl mb-4 opacity-20">🎉</div>
                        <p className="text-gray-500 dark:text-gray-400">No pending approval requests</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-2`}></div>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-purple-900/60' : 'bg-purple-100'} mr-2`}></div>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Needs Faculty Approval</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full ${isDarkMode ? 'bg-green-900/60' : 'bg-green-100'} mr-2`}></div>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Approved Booking</span>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
      
      {/* Form Forwarding Modal */}
      {forwardModalOpen && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal content would go here */}
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard; 