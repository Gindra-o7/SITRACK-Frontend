/** @type {import('tailwindcss').Config} */

export default {
<<<<<<< HEAD
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
=======
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
>>>>>>> ff05f1fe7ae548cbcef241fb4a9dba31e5a7f575
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
  plugins: [require("flowbite/plugin")],
};
