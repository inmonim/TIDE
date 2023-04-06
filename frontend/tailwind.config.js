/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    // './pages/**/*.{js,ts,jsx,tsx}',
    // './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {
      screens: {
        // pretiier-ignore
        md50: '500px',
        md86: '860px',
        lg12: '1200px'
      },
      keyframes: {
        pong: {
          '90%, 100%': {transform: 'scale(1.5)', opacity: 0}
        },
        ring: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '10%': {
            transform: 'rotate(45deg)'
          },
          '20%': {
            transform: 'rotate(-45deg)'
          },
          '30%': {
            transform: 'rotate(30deg)'
          },
          '40%': {
            transform: 'rotate(-30deg)'
          },
          '50%': {
            transform: 'rotate(10deg)'
          },
          '60%': {
            transform: 'rotate(-10deg)'
          },
          '70%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('tailwindcss-textshadow')
  ],
  variants: {
    scrollbar: ['rounded']
  }
};
