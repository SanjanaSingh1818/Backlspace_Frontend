/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ✅ Global default font
        // heading: ['Montserrat', 'sans-serif'], // (optional) For headings
      },
    },
  },
  plugins: [],
};
