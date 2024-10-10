/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
    },
  },
  plugins: [
    require('daisyui'),
    
  ],
  daisyui: {
    themes: ["retro", "dark", "cmyk"],
  },
}
