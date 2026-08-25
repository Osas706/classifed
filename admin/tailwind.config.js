/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0d2140",
          deep: "#071328",
        },
        accent: {
          DEFAULT: "#12b886",
          soft: "#d9f5ea",
        },
        sand: "#fbf8f3",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
