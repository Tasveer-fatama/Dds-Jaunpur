/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
       colors: {
        primary: '#e63946',
        dark: '#1a202c',
        light: '#f1faee'
      }
    },
  },
   animation: {
    'fade-in-right': 'fade-in-right 0.6s ease-out',
  },
  plugins: [],
}

