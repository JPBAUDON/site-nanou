/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          50: '#faf8f5',
          100: '#f2ebe4',
          200: '#e6d7c8',
          300: '#d4b9a0',
          400: '#B8956A',
          500: '#A0826D',
          600: '#8B6F47',
          700: '#705838',
          800: '#5c472d',
          900: '#4a3a24',
        },
        beige: {
          50: '#fdfbf7',
          100: '#f9f4eb',
          200: '#f3eadb',
          300: '#E8DCC4',
          400: '#dcc9a8',
          500: '#cfb58c',
          600: '#c0a172',
          700: '#a88760',
          800: '#896d4f',
          900: '#6f5941',
        },
        terracotta: {
          50: '#faf6f5',
          100: '#f5ebe9',
          200: '#ead9d6',
          300: '#D4A59A',
          400: '#c88b7d',
          500: '#b97163',
          600: '#a65c4f',
          700: '#8a4d43',
          800: '#73433b',
          900: '#5f3a35',
        }
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'body': ['Work Sans', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
      }
    }
  },
  plugins: []
}
