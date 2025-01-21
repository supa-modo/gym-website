/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        secondary: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
