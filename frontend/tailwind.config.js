/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A0F2C",
        danger: "#FF3B3B",
        warning: "#FFB800",
        safe: "#00C853"
      }
    }
  },
  plugins: []
}