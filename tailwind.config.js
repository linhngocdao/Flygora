/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          900: '#0c4a6e',
          darker: '#0369a1',
          DEFAULT: '#0ea5e9',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '2rem',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1200px',
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}
