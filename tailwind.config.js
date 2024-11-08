/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        friezOrange: '#FE8235',
        friezGreen: '#24D900',
      }
    },
  },
  plugins: [],
}

