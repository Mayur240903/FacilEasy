import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const StationeryRequestForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Stationery items data
  const stationeryItems = [
    { id: 'item1', name: 'Blue Pen', category: 'writing', available: 100, unit: 'piece' },
    { id: 'item2', name: 'Black Pen', category: 'writing', available: 100, unit: 'piece' },
    { id: 'item3', name: 'Red Pen', category: 'writing', available: 50, unit: 'piece' },
    { id: 'item4', name: 'Pencil', category: 'writing', available: 75, unit: 'piece' },
    { id: 'item5', name: 'Highlighter', category: 'writing', available: 30, unit: 'piece' },
    { id: 'item6', name: 'Eraser', category: 'writing', available: 40, unit: 'piece' },
    { id: 'item7', name: 'Ruler', category: 'writing', available: 25, unit: 'piece' },
    { id: 'item8', name: 'A4 Paper', category: 'paper', available: 1000, unit: 'sheet' },
    { id: 'item9', name: 'Notebook', category: 'paper', available: 20, unit: 'piece' },
    { id: 'item10', name: 'Sticky Notes', category: 'paper', available: 30, unit: 'pad' },
    { id: 'item11', name: 'Stapler', category: 'office', available: 15, unit: 'piece' },
    { id: 'item12', name: 'Staples', category: 'office', available: 50, unit: 'box' }
  ];
  
  const [formData, setFormData] = useState({
    requestType: 'stationery',
    stationeryItems: {},
    documentTitle: '',
    fileUrl: '',
    printType: 'black-white',
    copies: 1,
    paperSize: 'A4',
    doubleSided: false,
    bindingType: 'none',
    pickupDate: '',
    facultyEmail: '',
    urgentRequest: false,
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.pickupDate);
    
    if (formData.requestType === 'stationery') {
      const hasItems = Object.values(formData.stationeryItems).some(qty => qty > 0);
      if (!hasItems) {
        newErrors.stationeryItems = 'Please select at least one item';
      }
    } else { // Print request
      if (!formData.documentTitle.trim()) {
        newErrors.documentTitle = 'Document title is required';
      }
      
      if (!formData.fileUrl.trim()) {
        newErrors.fileUrl = 'Please provide a link to your document';
      }
      
      if (!formData.copies || formData.copies < 1) {
        newErrors.copies = 'At least 1 copy is required';
      } else if (formData.copies > 100) {
        newErrors.copies = 'Maximum 100 copies allowed';
      }
    }
    
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    } else if (selectedDate < today) {
      newErrors.pickupDate = 'Pickup date cannot be in the past';
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
  };

  const handleItemChange = (itemId, quantity) => {
    const parsedQty = parseInt(quantity);
    const item = stationeryItems.find(item => item.id === itemId);
    
    // Validate that quantity doesn't exceed available items
    if (parsedQty > item.available) {
      setErrors(prev => ({
        ...prev,
        [itemId]: `Maximum available: ${item.available}`
      }));
      return;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId];
      return newErrors;
    });
    
    setFormData(prev => ({
      ...prev,
      stationeryItems: {
        ...prev.stationeryItems,
        [itemId]: parsedQty
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...formErrors }));
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    // Mock API request
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would submit to your backend here
      console.log('Request submitted:', formData);
      
      // Redirect to success page or dashboard
      navigate('/student-dashboard', { 
        state: { 
          requestSuccess: true,
          service: 'stationery',
          requestType: formData.requestType,
          pickupDate: formData.pickupDate
        } 
      });
    } catch (error) {
      console.error('Request error:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Group stationery items by category
  const itemsByCategory = stationeryItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

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
            <h1 className="text-xl font-bold">Stationery & Printing</h1>
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100 to-transparent opacity-10 rounded-bl-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-100 to-transparent opacity-10 rounded-tr-full -ml-20 -mb-20"></div>
          
          <div className="mb-6 relative z-10">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">Stationery & Printing Request</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Request stationery items or printing services for your academic needs.
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
            {/* Request Type Selector */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                What would you like to request?
              </h3>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'requestType', value: 'stationery' } })}
                  className={`px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    formData.requestType === 'stationery'
                      ? 'bg-purple-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Stationery Items
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'requestType', value: 'printing' } })}
                  className={`px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    formData.requestType === 'printing'
                      ? 'bg-purple-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Printing Service
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Conditional Form Sections */}
            {formData.requestType === 'stationery' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stationery Items</h3>
                
                {errors.stationeryItems && (
                  <p className="text-sm text-red-500">{errors.stationeryItems}</p>
                )}
                
                {Object.entries(itemsByCategory).map(([category, items]) => (
                  <div key={category} className="mb-4">
                    <h4 className="text-md font-medium mb-2 capitalize">{category} Items</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <label htmlFor={`item-${item.id}`} className="block text-sm">
                            {item.name} <span className="text-xs text-gray-500 dark:text-gray-400">({item.available} available)</span>
                          </label>
                          <input
                            type="number"
                            id={`item-${item.id}`}
                            value={formData.stationeryItems[item.id] || 0}
                            onChange={(e) => handleItemChange(item.id, e.target.value)}
                            min="0"
                            max={item.available}
                            className={`w-20 px-2 py-1 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300'
                              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors[item.id] ? 'border-red-500' : ''
                              }`}
                          />
                          {errors[item.id] && (
                            <p className="text-xs text-red-500">{errors[item.id]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Printing Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="documentTitle" className="block text-sm font-medium mb-1">
                      Document Title*
                    </label>
                    <input
                      type="text"
                      id="documentTitle"
                      name="documentTitle"
                      value={formData.documentTitle}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.documentTitle ? 'border-red-500' : ''
                        }`}
                      placeholder="Enter document title"
                    />
                    {errors.documentTitle && (
                      <p className="mt-1 text-sm text-red-500">{errors.documentTitle}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="fileUrl" className="block text-sm font-medium mb-1">
                      Document Link (Google Drive/OneDrive)*
                    </label>
                    <input
                      type="text"
                      id="fileUrl"
                      name="fileUrl"
                      value={formData.fileUrl}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.fileUrl ? 'border-red-500' : ''
                        }`}
                      placeholder="Enter link to your document"
                    />
                    {errors.fileUrl && (
                      <p className="mt-1 text-sm text-red-500">{errors.fileUrl}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="printType" className="block text-sm font-medium mb-1">
                      Print Type
                    </label>
                    <select
                      id="printType"
                      name="printType"
                      value={formData.printType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="black-white">Black & White</option>
                      <option value="color">Color</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="copies" className="block text-sm font-medium mb-1">
                      Number of Copies*
                    </label>
                    <input
                      type="number"
                      id="copies"
                      name="copies"
                      value={formData.copies}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.copies ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.copies && (
                      <p className="mt-1 text-sm text-red-500">{errors.copies}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="paperSize" className="block text-sm font-medium mb-1">
                      Paper Size
                    </label>
                    <select
                      id="paperSize"
                      name="paperSize"
                      value={formData.paperSize}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="Letter">Letter (8.5" x 11")</option>
                      <option value="Legal">Legal (8.5" x 14")</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="doubleSided"
                      name="doubleSided"
                      checked={formData.doubleSided}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="doubleSided" className="ml-2 block text-sm font-medium">
                      Double-sided printing
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="bindingType" className="block text-sm font-medium mb-1">
                      Binding Type
                    </label>
                    <select
                      id="bindingType"
                      name="bindingType"
                      value={formData.bindingType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="none">None</option>
                      <option value="staple">Staple</option>
                      <option value="spiral">Spiral Binding</option>
                      <option value="thermal">Thermal Binding</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Common Details - Pickup Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pickup Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium mb-1">
                    Pickup Date*
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.pickupDate ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.pickupDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="urgentRequest" className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgentRequest"
                      name="urgentRequest"
                      checked={formData.urgentRequest}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm font-medium">Mark as Urgent Request</span>
                  </label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Urgent requests may be processed faster but are subject to availability
                  </p>
                </div>
                
                {/* Faculty Email for Approval */}
                <div className="md:col-span-2">
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
                    The request will be sent to this faculty member for approval
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Request Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Additional Notes */}
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
                    placeholder="Any additional requirements or information"
                  ></textarea>
                </div>
              </div>
            </div>

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
                className={`w-full py-3 px-6 text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm shadow-sm ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                } transition-all duration-300`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit Request'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default StationeryRequestForm; 