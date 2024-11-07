/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#00b4d8",
        "accent-variant": "#00738a",
      },
      gridTemplateColumns: {
        "2-auto": "repeat(2, minmax(auto, 1fr))",
      },
      fontSize: {
        "6xl": ["3.75rem", "1.2"],
      },
    },
  },
  plugins: [],
};
