/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Or 'media' if you prefer
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          orange: '#F97316',
        },
      },
    },
  },
  plugins: [],
}
