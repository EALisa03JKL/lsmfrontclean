/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {},
  },
  daysiui:{
    themes: ["retro"],
  },
  plugins: [require('daisyui')],
}

