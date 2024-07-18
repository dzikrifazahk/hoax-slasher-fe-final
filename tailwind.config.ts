/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.vue", "./nuxt.config.{js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};
