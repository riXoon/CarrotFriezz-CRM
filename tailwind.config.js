/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        friezOrange: {
          700: '#FE8235',
          500: '#FFBA8F',
          // Dark Mode variations
          800: '#C76A27', // Darker shade for dark mode
          600: '#D8824A', // Lighter shade for dark mode
        },
        friezGreen: {
          DEFAULT: '#1DAE00',
          // Dark Mode variations
          800: '#148B00', // Darker shade for dark mode
        },
        friezYellow: {
          DEFAULT: '#E9E461',
          // Dark Mode variations
          800: '#D4C13A', // Darker yellow for dark mode
        },
        // Add background and text colors for dark mode
  // Dark background for main areas
        darkText: '#E0E0E0',        // Light text color for dark mode
        darkAccent: '#888888',      // Subtle text or border accent
        darkBackground: '#181818', // Dark background color
        darkInput: '#333333',       // Dark input background
        darkDropdown: '#222222', 
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out", // Existing slide-up animation
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeInUp: 'fadeInUp 0.5s ease-in-out',
        hoverGlow: 'hoverGlow 1.5s infinite alternate',
        iconBounce: 'iconBounce 0.8s ease-in-out infinite',
        pulse: 'pulse 3s infinite',
        slideUp: 'slideUp 0.7s ease-in-out',
        spinSlow: 'spin 10s linear infinite',
        fadeSlideUp: 'fadeSlideUp 0.5s ease-out', // Existing transition for slideshow
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        hoverGlow: {
          '0%': { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
          '100%': { boxShadow: '0 4px 40px rgba(0,0,0,0.2)' },
        },
        iconBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideUp: {
          '0%': { opacity: 0, transform: 'translateY(100%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  darkMode: 'class', // Enabling dark mode via class
  plugins: [],
}

