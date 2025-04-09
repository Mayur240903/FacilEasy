/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#3d3d3d',
          500: '#4e4e4e',
          400: '#5f5f5f',
          300: '#7e7e7e',
          200: '#9e9e9e',
          100: '#cfcfcf',
        }
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        ping: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        spin: {
          'from': {
            transform: 'rotate(0deg)',
          },
          'to': {
            transform: 'rotate(360deg)',
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '600px',
          md: '768px',
          lg: '992px',
          xl: '1100px',
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {}
      newUtilities['.animation-delay-2000'] = {
        'animation-delay': '2s',
      }
      newUtilities['.animation-delay-4000'] = {
        'animation-delay': '4s',
      }
      newUtilities['.animation-delay-6000'] = {
        'animation-delay': '6s',
      }
      addUtilities(newUtilities)
    }
  ],
}

