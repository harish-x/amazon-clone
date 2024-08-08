/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131921",
        secondary: "#232F3E",
        text_color: "#0f1111",
        background: "#E3E6E6",
        amazonYellow: "#febd69",
      },
      fontFamily: {
        // amazon: ["Amazon Ember", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio")
  ],
};
