/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ev: {
          accent: '#84cc16',   
          sidebar: '#181a25',  
          card: '#222534',     
          darker: '#12141c',   
          main: '#e5effa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}