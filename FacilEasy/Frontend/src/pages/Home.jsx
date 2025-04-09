import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { isDarkMode } = useTheme();
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Auditorium Booking",
      description: "Book the auditorium for events and activities.",
      bgColor: "bg-blue-50",
      iconGradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Canteen Services",
      description: "Pre-order meals, book catering for events, and manage special dietary requests.",
      bgColor: "bg-blue-50",
      iconGradient: "from-red-500 to-pink-600",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Sports Services",
      description: "Book sports facilities, borrow equipment, and reserve sports halls for practice.",
      bgColor: "bg-blue-50",
      iconGradient: "from-green-500 to-teal-600",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Stationery Services",
      description: "Request printing, binding, and other stationery services for academic purposes.",
      bgColor: "bg-blue-50",
      iconGradient: "from-amber-500 to-orange-600",
    },
  ];

  const processSteps = [
    {
      title: "Sign Up",
      description: "Create your account using your college email.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      title: "Book Services",
      description: "Browse services and select your time slot or requirements.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
    },
    {
      title: "Track & Manage",
      description: "Monitor bookings and receive notifications.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className={`${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0c2461] text-white'
      } relative py-12 lg:py-16 overflow-hidden`}>
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[70px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute -bottom-20 left-0 w-[350px] h-[350px] rounded-full mix-blend-overlay filter blur-[70px] opacity-20 ${
          isDarkMode ? 'bg-indigo-700' : 'bg-indigo-500'
        }`}></div>
        <div className={`absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full mix-blend-multiply filter blur-[60px] opacity-10 ${
          isDarkMode ? 'bg-sky-600' : 'bg-sky-400'
        }`}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 space-y-3">
                  <div className="flex justify-center mt-4">
                    <Logo size="xl" />
                  </div>
                  <motion.div
                    className="flex flex-col items-center mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-3xl font-bold text-white">FacilEasy</span>
                    <span className="text-sm text-blue-200 tracking-wider">CAMPUS SOLUTION</span>
                  </motion.div>
                  <motion.p 
                    className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    FacilEasy makes managing college services effortless and efficient.
                    Our user-friendly platform connects students, faculty, and administrators in one seamless system. Say goodbye to long queues and endless paperwork — with real-time tracking, instant booking, FacilEasy ensures every campus resource is just a click away. Equipment and event spaces, manage it all with ease and transparency.
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 text-lg flex items-center justify-center relative overflow-hidden group">
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                      <span className="absolute top-0 left-0 w-20 h-full bg-white/10 transform -skew-x-12 -translate-x-32 group-hover:translate-x-64 transition-transform duration-700 z-10"></span>
                      <span className="relative z-20 flex items-center">
                        Create Account
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className={`pt-16 pb-12 ${
        isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800/40' 
        : 'bg-gradient-to-b from-gray-50 via-white to-indigo-50/40'
      } relative overflow-hidden`}>
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="relative inline-block mb-3">
              <span className={`inline-block px-5 py-2 ${
                isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300' : 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40 text-blue-900'
              } rounded-full text-xs font-bold tracking-wider shadow-md`}>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  OUR OFFERINGS
                </span>
              </span>
              <div className={`absolute -bottom-2 -right-2 w-full h-full ${
                isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/10'
              } rounded-full blur-sm`}></div>
            </div>
            <h2 className={`text-4xl font-bold ${
              isDarkMode 
              ? 'text-white' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900'
            } mb-3 tracking-tight relative inline-block`}>
              Our <span className={isDarkMode ? "text-blue-400 relative" : "text-blue-700 relative"}>
                Services
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 3C50 0.5 150 0.5 200 3" stroke={isDarkMode ? "#60a5fa" : "#3b82f6"} strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Solutions for your campus needs
            </p>
          </motion.div>
          
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className={`card-modern ${
                    isDarkMode 
                    ? 'bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden border border-gray-700/80 hover:border-blue-500/30 group' 
                    : 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden border border-gray-100/80 hover:border-blue-200 group'
                  }`}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 }}}
                >
                  <div className="p-4 sm:p-5 relative">
                    <div className={`absolute inset-0 ${
                      isDarkMode 
                      ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20' 
                      : 'bg-gradient-to-br from-blue-50/40 to-indigo-50/40'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${
                      isDarkMode 
                      ? 'bg-gradient-to-br from-blue-700/10 to-indigo-700/20' 
                      : 'bg-gradient-to-br from-blue-100/20 to-indigo-200/30'
                    } rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}></div>
                    <div className="relative z-10 mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:translate-y-1">
                      <div className={`bg-gradient-to-br ${service.iconGradient} w-16 h-16 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden`}>
                        {service.icon}
                        <div className="absolute inset-0 w-20 h-full bg-white/20 -skew-x-30"></div>
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold ${
                      isDarkMode 
                      ? 'text-white group-hover:text-blue-400' 
                      : 'text-gray-900 group-hover:text-blue-700'
                    } mb-1 transition-colors relative`}>{service.title}</h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } mb-4 leading-relaxed relative`}>{service.description}</p>
                    <Link 
                      to="/login" 
                      className={`inline-block ${
                        isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300 border-b border-blue-400/30 hover:border-blue-300' 
                        : 'text-blue-600 hover:text-blue-800 border-b border-blue-600/30 hover:border-blue-800'
                      } font-medium transition-colors duration-300`}
                    >
                      {service.actionText}
                    </Link>
                  </div>
                  <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Enhanced further */}
      <section className={`pt-4 pb-8 ${
        isDarkMode 
        ? 'bg-gradient-to-b from-gray-800/40 via-gray-900 to-gray-900' 
        : 'bg-gradient-to-b from-indigo-50/30 via-white to-white'
      } relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-br from-indigo-300/20 to-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl"></div>
        
        {/* Animated patterns */}
        <div className={`absolute top-1/4 left-10 w-6 h-6 border-2 ${isDarkMode ? 'border-indigo-500/20' : 'border-indigo-500/30'} rounded-full`}></div>
        <div className={`absolute top-1/3 right-10 w-4 h-12 bg-gradient-to-b ${isDarkMode ? 'from-blue-500/10' : 'from-blue-500/20'} to-transparent rounded-full`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-10 h-10 border-2 ${isDarkMode ? 'border-blue-500/10' : 'border-blue-500/20'} rounded-lg rotate-12`}></div>
        
        {/* Light grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-6 mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="relative inline-block mb-3">
              <span className={`inline-block px-5 py-2 ${
                isDarkMode ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300' : 'bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-indigo-900'
              } rounded-full text-xs font-bold tracking-wider shadow-md`}>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  HOW IT WORKS
                </span>
              </span>
              <div className={`absolute -bottom-1 -right-1 w-full h-full ${
                isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-500/20'
              } rounded-full blur-sm`}></div>
            </div>
            <h2 className={`text-4xl font-bold ${
              isDarkMode 
              ? 'text-white' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900'
            } mb-1 tracking-tight`}>How It <span className={isDarkMode ? "text-indigo-400" : "text-indigo-700"}>Works</span></h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              How to use our platform in three easy steps
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 relative">
              {/* Connecting arrows */}
              <div className={`hidden md:block absolute top-1/3 left-1/3 w-1/6 h-0.5 ${isDarkMode ? 'bg-indigo-500/30' : 'bg-indigo-200'}`}></div>
              <div className={`hidden md:block absolute top-1/3 right-1/3 w-1/6 h-0.5 ${isDarkMode ? 'bg-indigo-500/30' : 'bg-indigo-200'}`}></div>
              
              {/* Process Steps */}
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={`${
                    isDarkMode 
                    ? 'bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-gray-700/80 hover:shadow-indigo-900/20' 
                    : 'bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-gray-100/80 hover:shadow-xl'
                  } transition-all duration-500 relative group hover:translate-y-[-8px]`}
                  variants={fadeIn}
                >
                  <div className="absolute -top-6 left-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-110">
                    <span className="relative">{index + 1}</span>
                    <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-sm group-hover:blur-md transition-all"></div>
                  </div>
                  <div className="mt-6 mb-4 relative">
                    <div className="h-1 w-0 group-hover:w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 absolute -top-2 left-0 transition-all duration-700 rounded-full"></div>
                    <h3 className={`text-xl font-bold ${
                      isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-700'
                    } mb-2 transition-colors`}>{step.title}</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
                  </div>
                  <div className="h-1.5 w-0 group-hover:w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 absolute bottom-0 left-0 transition-all duration-700 rounded-full"></div>
                </motion.div>
              ))}
            </div>
            
            {/* Action Button */}
            <motion.div 
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/login" className="inline-flex items-center justify-center px-12 py-4 min-w-[240px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group relative overflow-hidden">
                <span className={`absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'group-hover:opacity-70' : 'group-hover:opacity-100'}`}></span>
                <span className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 blur-sm opacity-0 ${isDarkMode ? 'group-hover:opacity-50' : 'group-hover:opacity-30'} transition-opacity duration-500 animate-pulse-slow`}></span>
                <span className="text-lg relative">Start Now</span>
                <svg className="w-6 h-6 ml-2 relative group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${
        isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-blue-50 text-gray-900'
      } relative overflow-hidden`}>
        {/* ... rest of CTA section ... */}
      </section>
    </div>
  );
}

export default Home; 