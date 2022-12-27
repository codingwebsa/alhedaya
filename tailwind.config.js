/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#003A24",
        baseGreen: "#00C9A7",
        secondary: "#6748BC",
        light: "#E8F3F1",
        dark: "#252c33",
      },
      fontFamily: {
        hindSiliguri: ["Hind Siliguri"],
        nunito: ["Nunito"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
