/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument sans", "sans-serif"],
      },
      colors: {
        primary: "#133E87",
        secondary: "#FF6F61",
        black: "#000000",
        white: "#FAFAFA",
        background: "#E6F5E8",
      },
      backgroundImage: {
        pattern: "url(./assets/pattern.svg)",
      },
    },
  },
};
