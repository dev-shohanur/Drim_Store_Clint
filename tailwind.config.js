/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorTheme: {
          primary: '#684EFB',
          secondary: '#ff136f',
          accent: '#3A4256',
          neutral: "#291334",
          "base-100": "#FAF7F5",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
