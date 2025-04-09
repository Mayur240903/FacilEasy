import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AuditoriumBookingForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    attendees: '',
    department: '',
    eventType: 'seminar',
    auditoriumLocation: '',
    description: '',
    facultyEmail: '',
    equipmentNeeded: {
      projector: false,
      microphone: false,
      speakers: false,
      laptops: false,
      videoConference: false
    },
    additionalRequirements: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.eventDate);
    
    if (!formData.eventName.trim()) newErrors.eventName = 'Event name is required';
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else if (selectedDate < today) {
      newErrors.eventDate = 'Event date cannot be in the past';
    }
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    if (!formData.attendees) {
      newErrors.attendees = 'Number of attendees is required';
    } else if (isNaN(formData.attendees) || parseInt(formData.attendees) <= 0) {
      newErrors.attendees = 'Please enter a valid number';
    } else if (parseInt(formData.attendees) > 500) {
      newErrors.attendees = 'Maximum capacity is 500';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.auditoriumLocation) newErrors.auditoriumLocation = 'Auditorium location is required';
    
    // Validate faculty email
    if (!formData.facultyEmail.trim()) {
      newErrors.facultyEmail = 'Faculty email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.facultyEmail)) {
      newErrors.facultyEmail = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('equipmentNeeded.')) {
      const equipment = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        equipmentNeeded: {
          ...prev.equipmentNeeded,
          [equipment]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    // Mock API request
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would submit to your backend here
      console.log('Booking submitted:', formData);
      
      // Redirect to success page or dashboard
      navigate('/student-dashboard', { 
        state: { 
          bookingSuccess: true,
          service: 'auditorium',
          eventName: formData.eventName,
          eventDate: formData.eventDate
        } 
      });
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header with back button */}
      <header className={`${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
        } border-b px-6 py-4 sticky top-0 z-10`}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link 
              to="/student-dashboard"
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4`}
              aria-label="Go back to dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Auditorium Booking</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            } rounded-xl border p-6 shadow-lg overflow-hidden relative`}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-transparent opacity-10 rounded-bl-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-100 to-transparent opacity-10 rounded-tr-full -ml-20 -mb-20"></div>
          
          <div className="mb-6 relative z-10">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">Book the Auditorium</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fill in the details below to request a booking for the college auditorium.
            </p>
          </div>

          {errors.submit && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
            >
              {errors.submit}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Details Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 bg-gradient-to-r from-indigo-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Event Name */}
                <div>
                  <label htmlFor="eventName" className="block text-sm font-medium mb-1">
                    Event Name*
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.eventName ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter event name"
                  />
                  {errors.eventName && (
                    <p className="mt-1 text-sm text-red-500">{errors.eventName}</p>
                  )}
                </div>
                
                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium mb-1">
                    Department/Organization*
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.department ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter department name"
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Event Date */}
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-1">
                    Event Date*
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.eventDate ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>
                  )}
                </div>
                
                {/* Start Time */}
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                    Start Time*
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.startTime ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>
                  )}
                </div>
                
                {/* End Time */}
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                    End Time*
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.endTime ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Number of Attendees */}
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium mb-1">
                    Number of Attendees*
                  </label>
                  <input
                    type="number"
                    id="attendees"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    min="1"
                    max="500"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.attendees ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter number of attendees"
                  />
                  {errors.attendees && (
                    <p className="mt-1 text-sm text-red-500">{errors.attendees}</p>
                  )}
                </div>
                
                {/* Event Type */}
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="seminar">Seminar/Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="cultural">Cultural Event</option>
                    <option value="meeting">Meeting</option>
                    <option value="ceremony">Ceremony</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Auditorium Location */}
              <div>
                <label htmlFor="auditoriumLocation" className="block text-sm font-medium mb-1">
                  Auditorium Location*
                </label>
                <select
                  id="auditoriumLocation"
                  name="auditoriumLocation"
                  value={formData.auditoriumLocation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.auditoriumLocation ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">-- Select Auditorium --</option>
                  <option value="main-auditorium">Seminar Hall Architecture Building (1000 seats)</option>
                  <option value="conference-hall">Main Auditorium Mechanical Building (200 seats)</option>
                  <option value="mini-auditorium">LRDC Hall (200 seats)</option>
                  
                </select>
                {errors.auditoriumLocation && (
                  <p className="mt-1 text-sm text-red-500">{errors.auditoriumLocation}</p>
                )}
              </div>

              {/* Event Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Event Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : ''
                    }`}
                  placeholder="Briefly describe the event"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Faculty Email for Approval */}
              <div>
                <label htmlFor="facultyEmail" className="block text-sm font-medium mb-1">
                  Faculty Email for Approval*
                </label>
                <input
                  type="email"
                  id="facultyEmail"
                  name="facultyEmail"
                  value={formData.facultyEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.facultyEmail ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter faculty email for approval"
                />
                {errors.facultyEmail && (
                  <p className="mt-1 text-sm text-red-500">{errors.facultyEmail}</p>
                )}
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  The booking request will be sent to this faculty member for approval
                </p>
              </div>
            </motion.div>

            {/* Equipment Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 bg-gradient-to-r from-indigo-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 10h4a4 4 0 014 4v2a2 2 0 01-2 2h-4.88a4 4 0 01-7.905 0H3a2 2 0 01-2-2v-2a4 4 0 014-4z" />
                </svg>
                Equipment & Requirements
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipmentNeeded.projector"
                    name="equipmentNeeded.projector"
                    checked={formData.equipmentNeeded.projector}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="equipmentNeeded.projector" className="ml-2 block text-sm">
                    Projector
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipmentNeeded.microphone"
                    name="equipmentNeeded.microphone"
                    checked={formData.equipmentNeeded.microphone}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="equipmentNeeded.microphone" className="ml-2 block text-sm">
                    Microphone System
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipmentNeeded.speakers"
                    name="equipmentNeeded.speakers"
                    checked={formData.equipmentNeeded.speakers}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="equipmentNeeded.speakers" className="ml-2 block text-sm">
                    Speaker System
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipmentNeeded.laptops"
                    name="equipmentNeeded.laptops"
                    checked={formData.equipmentNeeded.laptops}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="equipmentNeeded.laptops" className="ml-2 block text-sm">
                    Laptop/Computer
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipmentNeeded.videoConference"
                    name="equipmentNeeded.videoConference"
                    checked={formData.equipmentNeeded.videoConference}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="equipmentNeeded.videoConference" className="ml-2 block text-sm">
                    Video Conferencing
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalRequirements" className="block text-sm font-medium mb-1">
                  Additional Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Any additional requirements or setup instructions"
                ></textarea>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm shadow-sm ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                } transition-all duration-300`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit Booking Request'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AuditoriumBookingForm; 