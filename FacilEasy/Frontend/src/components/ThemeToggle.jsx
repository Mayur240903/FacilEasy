import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      
      {/* Background track */}
      <span 
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-100/80 border border-blue-200'
        }`}
      />
      
      {/* Toggle circle */}
      <motion.span
        className={`absolute w-5 h-5 rounded-full transition-all duration-300 shadow-md flex items-center justify-center ${
          isDarkMode ? 'bg-indigo-600' : 'bg-white'
        }`}
        initial={false}
        animate={{
          left: isDarkMode ? 'calc(100% - 22px)' : '2px',
        }}
      >
        {/* Sun icon for light mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-100 text-yellow-500'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        
        {/* Moon icon for dark mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-100 text-white' : 'opacity-0'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle; 