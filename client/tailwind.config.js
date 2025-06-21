/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        warning: '#f39c12',
        info: '#1abc9c',
        dark: '#2c3e50',
        light: '#ecf0f1',
        'room-available': '#2ecc71',
        'room-occupied': '#e74c3c',
        'room-cleaning': '#f39c12',
        'room-maintenance': '#3498db',
      },
    },
  },
  plugins: [],
};
