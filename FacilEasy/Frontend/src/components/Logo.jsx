import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ className = "", size = "md" }) => {
  const { isDarkMode } = useTheme();
  
  // Size variants
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-32 h-32"
  };

  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <div className={`${sizeClass} ${className} relative flex items-center justify-center`}>
      <motion.div
        className={`w-full h-full ${
          isDarkMode ? 
          'bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900' : 
          'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800'
        } rounded-full flex items-center justify-center overflow-hidden shadow-lg relative`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-tr from-transparent ${
          isDarkMode ? 'via-blue-500/10 to-white/20' : 'via-blue-400/20 to-white/30'
        }`}></div>
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-white/30 rounded-full blur-sm"></div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 200 200" 
          className="w-full h-full p-1 relative z-10"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#e2e8f0" : "#ffffff"} />
              <stop offset="100%" stopColor={isDarkMode ? "#cbd5e1" : "#e2e8f0"} />
            </linearGradient>
            <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#60a5fa" : "#38bdf8"} />
              <stop offset="50%" stopColor={isDarkMode ? "#818cf8" : "#818cf8"} />
              <stop offset="100%" stopColor={isDarkMode ? "#a78bfa" : "#c084fc"} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={isDarkMode ? "2" : "3"} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g>
            {/* Background Circle with slight glow */}
            <circle cx="100" cy="100" r="80" fill="url(#logo-gradient)" />
            
            {/* Stylized 'F' letter using overlapping shapes */}
            <path 
              d="M100,60 L140,60 C145,60 150,65 150,70 V80 H100 V60 Z" 
              fill="url(#accent-gradient)" 
              filter="url(#glow)"
            />
            <path 
              d="M100,90 L135,90 C140,90 145,95 145,100 V110 H100 V90 Z" 
              fill="url(#accent-gradient)" 
              filter="url(#glow)"
            />
            <path 
              d="M60,60 C60,55 65,50 70,50 H90 V150 H70 C65,150 60,145 60,140 V60 Z" 
              fill="url(#accent-gradient)" 
              filter="url(#glow)"
            />
            
            {/* Decorative accents */}
            <circle cx="145" cy="55" r="6" fill="white" opacity={isDarkMode ? "0.8" : "0.9"} />
            <circle cx="130" cy="130" r="8" fill="url(#accent-gradient)" opacity={isDarkMode ? "0.6" : "0.7"} />
            <circle cx="150" cy="130" r="4" fill="white" opacity={isDarkMode ? "0.5" : "0.6"} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default Logo; 