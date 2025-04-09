import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const CanteenOrderForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    location: 'main-canteen',
    paymentMethod: 'meal-card',
    facultyEmail: '',
    specialInstructions: '',
    items: [
      { id: 1, name: '', quantity: 1, price: 0 }
    ]
  });
  const [errors, setErrors] = useState({});

  // Menu items
  const menuItems = [
    { 
      category: 'Breakfast',
      items: [
        { id: 'breakfast1', name: 'Idli Sambar', price: 40 },
        { id: 'breakfast2', name: 'Masala Dosa', price: 60 },
        { id: 'breakfast3', name: 'Poha', price: 30 },
        { id: 'breakfast4', name: 'Upma', price: 35 },
        { id: 'breakfast5', name: 'Bread Omelette', price: 50 }
      ]
    },
    { 
      category: 'Lunch',
      items: [
        { id: 'lunch1', name: 'Veg Thali', price: 80 },
        { id: 'lunch2', name: 'Non-Veg Thali', price: 120 },
        { id: 'lunch3', name: 'Veg Pulao', price: 70 },
        { id: 'lunch4', name: 'Chole Bhature', price: 90 },
        { id: 'lunch5', name: 'Rajma Chawal', price: 85 }
      ]
    },
    { 
      category: 'Snacks',
      items: [
        { id: 'snack1', name: 'Samosa', price: 15 },
        { id: 'snack2', name: 'Vada Pav', price: 25 },
        { id: 'snack3', name: 'French Fries', price: 50 },
        { id: 'snack4', name: 'Sandwich', price: 45 },
        { id: 'snack5', name: 'Kachori', price: 20 }
      ]
    },
    { 
      category: 'Beverages',
      items: [
        { id: 'beverage1', name: 'Tea', price: 15 },
        { id: 'beverage2', name: 'Coffee', price: 20 },
        { id: 'beverage3', name: 'Cold Coffee', price: 35 },
        { id: 'beverage4', name: 'Fresh Juice', price: 40 },
        { id: 'beverage5', name: 'Buttermilk', price: 25 }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.pickupDate);
    
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    } else if (selectedDate < today) {
      newErrors.pickupDate = 'Pickup date cannot be in the past';
    }
    
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    
    // Validate if at least one item is selected
    const hasItems = formData.items.some(item => item.name.trim() !== '');
    if (!hasItems) {
      newErrors.items = 'Please enter at least one item';
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    
    if (field === 'name') {
      updatedItems[index][field] = value;
      
      if (value.trim() !== '') {
        // Auto-fetch price from menu items based on item name
        const flatMenuItems = menuItems.flatMap(category => category.items);
        
        // Try exact match first (case-insensitive)
        let matchingItem = flatMenuItems.find(menuItem => 
          menuItem.name.toLowerCase() === value.toLowerCase()
        );
        
        // If no exact match, try partial match
        if (!matchingItem) {
          matchingItem = flatMenuItems.find(menuItem => 
            menuItem.name.toLowerCase().includes(value.toLowerCase())
          );
        }
        
        if (matchingItem) {
          updatedItems[index].price = matchingItem.price;
          
          // If partial match, set the full name for better UX
          if (value.toLowerCase() !== matchingItem.name.toLowerCase()) {
            updatedItems[index].name = matchingItem.name;
          }
        }
      } else {
        // Reset price if item field is cleared
        updatedItems[index].price = 0;
      }
    } else if (field === 'quantity') {
      updatedItems[index][field] = value;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: prev.items.length + 1, name: '', quantity: 1, price: 0 }
      ]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) {
      setFormData(prev => ({
        ...prev,
        items: [{ id: 1, name: '', quantity: 1, price: 0 }]
      }));
    } else {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: updatedItems
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);
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
      console.log('Order submitted:', formData);
      
      // Redirect to success page or dashboard
      navigate('/student-dashboard', { 
        state: { 
          orderSuccess: true,
          service: 'canteen',
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime
        } 
      });
    } catch (error) {
      console.error('Order error:', error);
      setErrors({ submit: 'Failed to submit order. Please try again.' });
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
            <h1 className="text-xl font-bold">Canteen Order</h1>
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
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100 to-transparent opacity-10 rounded-bl-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-100 to-transparent opacity-10 rounded-tr-full -ml-10 -mb-10"></div>
          
          <div className="mb-6 relative z-10">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Order Food from Canteen</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fill in your order details to place an advance order from the canteen.
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
            {/* Pickup Details Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Pickup Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Date */}
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
                      } transition-all duration-200`}
                  />
                  {errors.pickupDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>
                  )}
                </div>
                
                {/* Pickup Time */}
                <div>
                  <label htmlFor="pickupTime" className="block text-sm font-medium mb-1">
                    Pickup Time*
                  </label>
                  <input
                    type="time"
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.pickupTime ? 'border-red-500' : ''
                      } transition-all duration-200`}
                  />
                  {errors.pickupTime && (
                    <p className="mt-1 text-sm text-red-500">{errors.pickupTime}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Canteen Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    Canteen Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                  >
                    <option value="main-canteen">Main Canteen</option>
                    <option value="hostel-canteen">Cafeteria</option>
                  </select>
                </div>
                
                {/* Payment Method */}
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                  >
                    <option value="cash">Cash on Pickup</option>
                    <option value="upi">UPI Payment</option>
                  </select>
                </div>
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
                    } transition-all duration-200`}
                  placeholder="Enter faculty email for approval"
                />
                {errors.facultyEmail && (
                  <p className="mt-1 text-sm text-red-500">{errors.facultyEmail}</p>
                )}
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  The order request will be sent to this faculty member for approval
                </p>
              </div>
            </motion.div>

            {/* Order Items Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 bg-gradient-to-r from-green-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Items
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addItem}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center bg-blue-50 dark:bg-gray-700 px-3 py-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </motion.button>
              </div>
              
              {errors.items && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">{errors.items}</p>
              )}
              
              {formData.items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-2 items-end bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="col-span-5 sm:col-span-6">
                    <label htmlFor={`item-${index}`} className="block text-sm font-medium mb-1">
                      {index === 0 ? 'Item*' : ''}
                    </label>
                    <input
                      type="text"
                      id={`item-${index}`}
                      list="menu-items"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                      placeholder="Enter food item name"
                    />
                    <datalist id="menu-items">
                      {menuItems.flatMap(category => 
                        category.items.map(item => (
                          <option key={item.id} value={item.name} />
                        ))
                      )}
                    </datalist>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor={`quantity-${index}`} className="block text-sm font-medium mb-1">
                      {index === 0 ? 'Qty*' : ''}
                    </label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      max="10"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                    />
                  </div>
                  
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor={`price-${index}`} className="block text-sm font-medium mb-1">
                      {index === 0 ? 'Price (₹)' : ''}
                    </label>
                    <div
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                        } transition-all duration-200`}>
                      ₹{item.price}
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeItem(index)}
                      className={`p-2 rounded-full ${
                        isDarkMode 
                          ? 'hover:bg-red-900/20 text-red-400' 
                          : 'hover:bg-red-100 text-red-600'
                      }`}
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Total:</p>
                  <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">₹{calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </motion.div>

            {/* Special Instructions */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                Additional Information
              </h3>
              
              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium mb-1">
                  Special Instructions
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                  placeholder="Any dietary restrictions or special preparation instructions"
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
                className={`w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm shadow-sm ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                } transition-all duration-300`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Place Order'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </main>

      {/* Menu Section */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Canteen Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((category) => (
              <div key={category.category} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
                <h4 className="font-semibold mb-2">{category.category}</h4>
                <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                  {category.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanteenOrderForm;