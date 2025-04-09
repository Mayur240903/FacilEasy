import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

// Modern navbar with clean, attractive design
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-sm shadow-md border-b border-gray-800/80' 
            : 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100/80'
          : isDarkMode 
            ? 'bg-gray-900 shadow-sm' 
            : 'bg-white shadow-sm'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center group">
            <Logo size="md" className="group-hover:shadow-xl transition-all duration-300" />
            <div className="ml-2 flex flex-col">
              <span className={`font-bold text-lg leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FacilEasy</span>
              <span className={`text-xs leading-none ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>CAMPUS SOLUTION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Link to="/login">
                <motion.div 
                  whileHover={{ y: -1 }}
                  className={`py-1.5 px-5 font-medium border rounded-md transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-blue-400 border-gray-700 hover:bg-gray-800/50' 
                      : 'text-blue-700 border-blue-100 hover:bg-blue-50/50'
                  }`}
                >
                  Login
                </motion.div>
              </Link>
              <Link to="/register">
                <motion.div 
                  whileHover={{ y: -1 }}
                  className="py-1.5 px-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-md shadow-sm hover:shadow transition-all duration-300"
                >
                  Register
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={toggleMenu}
              className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'} focus:outline-none p-2`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden backdrop-blur-sm border-t overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900/95 border-gray-800 shadow-lg' 
                : 'bg-white/95 border-gray-100 shadow-lg'
            }`}
          >
            <div className="px-4 py-3">
              <div className="pt-2 pb-1 grid grid-cols-2 gap-2">
                <Link to="/login" 
                  className={`py-2 px-3 text-center font-medium border rounded-md transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-blue-400 border-gray-700 hover:bg-gray-800/50' 
                      : 'text-blue-700 border-blue-100 hover:bg-blue-50/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link to="/register" 
                  className="py-2 px-3 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-md shadow-sm transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Modern Navigation Link with subtle animation
const ModernNavLink = ({ to, children, isDarkMode }) => {
  return (
    <Link 
      to={to} 
      className={`font-medium relative py-1 group transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
        isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
      }`}></span>
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, onClick, children, isDarkMode }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center justify-between py-2 px-1 font-medium ${
        isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'
      }`} 
      onClick={onClick}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default Navbar; 