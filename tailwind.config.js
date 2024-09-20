/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-default': '#F7F6FB',
        'btn-primary': '#007FFF',
        'border-1': '#EBEBEB',
        'blue-300-1': '#00B7FF99',
        'bg-icon': '#D6EEFF',
        'bg-logout': '#F8EAEF',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
      textColor: {
        'black': '#171717',
        'gray': '#737373',
        'logout': '#FF5865',
      },
      fontSize: {
        '11': '11px',
        '13': '13px',
        '17': '17px',
        '19': '19px',
        '15': '15px'
      },
    },
  },
  plugins: [],
}
