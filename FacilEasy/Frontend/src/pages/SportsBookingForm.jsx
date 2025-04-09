import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SportsBookingForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Sports facilities data
  const sportsFacilities = [
    { id: 'cricket', name: 'Cricket Ground', capacity: 22, indoor: false },
    { id: 'football', name: 'Football Field', capacity: 22, indoor: false },
    { id: 'volleyball', name: 'Volleyball Court', capacity: 14, indoor: false },
    { id: 'kabaddi', name: 'Kabaddi Ground', capacity: 14, indoor: false },
    { id: 'kho kho', name: 'Kho Kho Ground', capacity: 20, indoor: false },
    { id: 'basketball', name: 'Basketball Court', capacity: 10, indoor: true },
    { id: 'badminton', name: 'Badminton Court', capacity: 4, indoor: true },
    { id: 'tabletennis', name: 'Table Tennis Room', capacity: 4, indoor: true },
  ];
  
  // Sports equipment data
  const sportsEquipment = [
    { id: 'cricket-kit', name: 'Cricket Kit', available: 5 },
    { id: 'football', name: 'Football', available: 10 },
    { id: 'basketball', name: 'Basketball', available: 8 },
    { id: 'badminton-racket', name: 'Badminton Racket', available: 20 },
    { id: 'badminton-shuttle', name: 'Shuttlecock (Box)', available: 15 },
    { id: 'tabletennis-racket', name: 'Table Tennis Racket', available: 12 },
    { id: 'tabletennis-ball', name: 'Table Tennis Ball', available: 30 },
    { id: 'volleyball', name: 'Volleyball', available: 10 },
    { id: 'kabaddi', name: 'Kabaddi Equipment', available: 10 },
    { id: 'kho kho', name: 'Kho Kho Equipment', available: 10 },
    { id: 'yoga-mat', name: 'Yoga Mat', available: 25 }
  ];
  
  const [formData, setFormData] = useState({
    bookingType: 'facility',
    facilityId: '',
    equipmentList: {},
    date: '',
    startTime: '',
    endTime: '',
    numberOfPeople: '1',
    purpose: '',
    facultyEmail: '',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    
    if (formData.bookingType === 'facility') {
      if (!formData.facilityId) newErrors.facilityId = 'Please select a facility';
    } else {
      const hasEquipment = Object.values(formData.equipmentList).some(qty => qty > 0);
      if (!hasEquipment) newErrors.equipment = 'Please select at least one equipment item';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Date cannot be in the past';
    }
    
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    if (formData.bookingType === 'facility' && !formData.numberOfPeople) {
      newErrors.numberOfPeople = 'Number of people is required';
    }
    
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
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Reset facility id when changing booking type
    if (name === 'bookingType') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        facilityId: '',
        equipmentList: {}
      }));
    }
  };

  const handleEquipmentChange = (equipmentId, quantity) => {
    setFormData(prev => ({
      ...prev,
      equipmentList: {
        ...prev.equipmentList,
        [equipmentId]: parseInt(quantity)
      }
    }));
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
          service: 'sports',
          date: formData.date,
          bookingType: formData.bookingType
        } 
      });
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get selected facility details
  const selectedFacility = formData.facilityId 
    ? sportsFacilities.find(facility => facility.id === formData.facilityId)
    : null;

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
            <h1 className="text-xl font-bold">Sports Facilities</h1>
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-100 to-transparent opacity-10 rounded-bl-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100 to-transparent opacity-10 rounded-tr-full -ml-20 -mb-20"></div>
          <div className="mb-6 relative z-10">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">Sports Booking</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fill in the details below to book a sports facility or equipment.
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Type Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What would you like to book?</h3>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'bookingType', value: 'facility' } })}
                  className={`px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    formData.bookingType === 'facility'
                      ? 'bg-green-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Sports Facility
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'bookingType', value: 'equipment' } })}
                  className={`px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    formData.bookingType === 'equipment'
                      ? 'bg-green-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Sports Equipment
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Conditional Form Sections */}
            {formData.bookingType === 'facility' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Facility Details</h3>
                
                <div>
                  <label htmlFor="facilityId" className="block text-sm font-medium mb-1">
                    Select Facility*
                  </label>
                  <select
                    id="facilityId"
                    name="facilityId"
                    value={formData.facilityId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.facilityId ? 'border-red-500' : ''
                      }`}
                  >
                    <option value="">-- Select a facility --</option>
                    <optgroup label="Outdoor Facilities">
                      {sportsFacilities.filter(f => !f.indoor).map((facility) => (
                        <option key={facility.id} value={facility.id}>
                          {facility.name} (Capacity: {facility.capacity})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Indoor Facilities">
                      {sportsFacilities.filter(f => f.indoor).map((facility) => (
                        <option key={facility.id} value={facility.id}>
                          {facility.name} (Capacity: {facility.capacity})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.facilityId && (
                    <p className="mt-1 text-sm text-red-500">{errors.facilityId}</p>
                  )}
                </div>
                
                {selectedFacility && (
                  <div>
                    <label htmlFor="numberOfPeople" className="block text-sm font-medium mb-1">
                      Number of People*
                    </label>
                    <input
                      type="number"
                      id="numberOfPeople"
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      min="1"
                      max={selectedFacility.capacity}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.numberOfPeople ? 'border-red-500' : ''
                        }`}
                      placeholder={`Maximum capacity: ${selectedFacility.capacity}`}
                    />
                    {errors.numberOfPeople && (
                      <p className="mt-1 text-sm text-red-500">{errors.numberOfPeople}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Equipment Details</h3>
                
                {errors.equipment && (
                  <p className="text-sm text-red-500">{errors.equipment}</p>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sportsEquipment.map((equipment) => (
                    <div key={equipment.id} className="flex items-center justify-between">
                      <label htmlFor={`equipment-${equipment.id}`} className="block text-sm">
                        {equipment.name} <span className="text-xs text-gray-500 dark:text-gray-400">(Available: {equipment.available})</span>
                      </label>
                      <input
                        type="number"
                        id={`equipment-${equipment.id}`}
                        value={formData.equipmentList[equipment.id] || 0}
                        onChange={(e) => handleEquipmentChange(equipment.id, e.target.value)}
                        min="0"
                        max={equipment.available}
                        className={`w-20 px-2 py-1 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Details - Date & Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Date & Time Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.date ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
                
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
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Details</h3>
              
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium mb-1">
                  Purpose of Booking
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">-- Select purpose --</option>
                  <option value="personal">Personal Practice</option>
                  <option value="friendly">Friendly Match</option>
                  <option value="class">Class/Course Requirement</option>
                  <option value="tournament">Tournament/Competition</option>
                  <option value="club">Club Activity</option>
                  <option value="other">Other</option>
                </select>
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
              
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Any additional requests or information"
                ></textarea>
              </div>
            </div>


            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Facility/Equipment Info */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Booking Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h4 className="font-semibold mb-2">Booking Rules</h4>
              <ul className={`list-disc list-inside text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                <li>Bookings must be made at least 24 hours in advance</li>
                <li>Maximum booking duration is 12 hours</li>
                <li>Equipment must be returned on the same day</li>
                <li>No cancellations will be made</li>
              </ul>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h4 className="font-semibold mb-2">Facility Timings</h4>
              <ul className={`list-disc list-inside text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                <li>Indoor Facilities: 8:00 AM - 9:00 PM</li>
                <li>Outdoor Facilities: 8:00 AM - 8:00 PM</li>
                <li>Closed on Sunday</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SportsBookingForm; 