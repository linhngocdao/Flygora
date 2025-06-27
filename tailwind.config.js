/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geomanist': ['Geomanist', 'sans-serif'],
        'sans': ['Geomanist', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6c8a1f',
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
