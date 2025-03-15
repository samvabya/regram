/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ead7c3",
        secondary: "#fbf6ef",
        tertiary: "#b2967d",
        accent: "#463f3a",
      },
    },
  },
  plugins: [],
}