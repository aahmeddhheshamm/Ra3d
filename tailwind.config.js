const plugin = require("tailwindcss/plugin");

const colors = {
  primary: {
    200: "#FFFFFF",
    300: "#FFFFFF",
    100: "#000000",
  },

  error: {
    600: "#e74c3c",
    500: "#ED6B75",
    400: "#F85A40",
    300: "#E13545",
    200: "#F91216",
    150:"#dc3545"
  },

};
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./modules/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        // sm: "600px",
        // md: "728px",
        // lg: "984px",
        // xl: "1240px",
        "2xl": "1814px",
      },
      padding: {
        DEFAULT: "20px",
      },
    },
    extend: {
      colors,
      fontFamily: {
        Alexandria: ["Alexandria"],
      },
      boxShadow: {
        main: "0px 1px 3px 0px rgba(23, 102, 68, 0.03), 0px 10px 46px 0px rgba(23, 100, 67, 0.03)",
      },
      borderRadius: {
        xs: "9px",
        sm: "13px",
        md: "16px",
        lg: "1.5rem",
      },
      listStyleType: {
        square: "square",
      },
      lineHeight: {
        normal: "2.813rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: {
          "@media (max-width: 767px)": {
            fontSize: "12px",
          },
          "@media (min-width: 768px)": {
            fontSize: "13px",
          },
          "@media (min-width: 991px)": {
            fontSize: "14px",
          },
          "@media (min-width: 1600px)": {
            fontSize: "16px",
          },
        },
      });
    }),
  ],
};
