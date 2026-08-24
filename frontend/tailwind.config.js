/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0d2140",
          deep: "#071328",
          ink: "#0a1128",
        },
        accent: {
          DEFAULT: "#12b886",
          soft: "#d9f5ea",
        },
        sand: "#fbf8f3",
        muted: "#647087",
        surface: {
          dark: "#102844",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
