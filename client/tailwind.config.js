/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#303137',
        secondary: "#3C4BD1"
      },
      width: {
        '1/4.5': '22%',
      }

    },
  },  
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        }
      })
    })
  ],
  
}

