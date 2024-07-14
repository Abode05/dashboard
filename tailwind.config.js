/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#D5D5D5",
        subtitle: "#202224",
        secondary: "#F1F4F9",
        blue: {
          1:"#4880FF",
        },
        dark: {
          1: "#1B2431",
          2: "#273142",
          3:"#4B5668"
        }

          
        
      }
    },
  },
  plugins: [],
}
