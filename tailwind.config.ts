/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/**/*.vue", "./components/**/*.vue", "./nuxt.config.{js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};
