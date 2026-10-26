/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        senja: {
          ink: "#2b1b24",
          berry: "#e0689a",
          dusk: "#fff0f6",
          pink: "#f7a8c4",
          rose: "#c81e3a",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
