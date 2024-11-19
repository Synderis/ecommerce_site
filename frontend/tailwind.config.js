/** @type {import('tailwindcss').Config} */
// import mtConfig from '@material-tailwind/react/utils/withMT';
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  height: {
    'innerHeight': 'innerHeight',
    'screenHeight': 'calc(innerHeight + 121px)',
  },
  theme: {
    extend: {},
  },
  plugins: [],
});
