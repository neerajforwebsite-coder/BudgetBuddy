/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",   // ⭐ REQUIRED for global dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f4c81",
          light: "#3f78b5",
          dark: "#072f4f",
        },
        soft: {
          blue: "#eef6ff",
          teal: "#e6fffa",
          pink: "#ffe6f2",
        },
      },

      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        smooth: "0 6px 20px rgba(0,0,0,0.12)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },

      backgroundImage: {
        "gradient-holistic":
          "linear-gradient(135deg, #eef7ff 0%, #e7f4ff 40%, #ffffff 100%)",
      },

      transitionDuration: {
        fast: "250ms",
        smooth: "450ms",
      },
    },
  },
  plugins: [],
};
