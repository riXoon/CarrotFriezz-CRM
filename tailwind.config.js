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
        },
        friezGreen: '#1DAE00',
        friezYellow: '#E9E461',
      }
    },
  },
  plugins: [],
}

