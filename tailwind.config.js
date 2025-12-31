/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Green - represents savings and trust
        secondary: '#3b82f6', // Blue - represents electricity
        danger: '#ef4444', // Red - for high costs
      },
    },
  },
  plugins: [],
}

