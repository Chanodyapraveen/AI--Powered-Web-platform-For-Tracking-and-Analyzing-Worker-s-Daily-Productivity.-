/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ceylon-green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        "tea-green": {
          50: "#f0fdf5",
          100: "#dcfcec",
          200: "#b8f7d9",
          300: "#7feebf",
          400: "#3fdda0",
          500: "#1ac587",
          600: "#0ea06f",
          700: "#0e7f5b",
          800: "#10644a",
          900: "#0f523d",
          950: "#052e23",
        },
      },
    },
  },
  plugins: [],
};
