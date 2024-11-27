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
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  darkMode: 'class', // Enabling dark mode via class
  plugins: [],
}

