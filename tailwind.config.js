export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff3b3b',
          600: '#ff2f2f',
          500: '#ff6b6b'
        },
        accent: {
          DEFAULT: '#b76cff',
          500: '#b76cff'
        },
        neon: {
          DEFAULT: '#00e6ff'
        },
        surface: {
          DEFAULT: '#0b0f17',
          100: '#0f1620',
          200: '#0b0f17'
        },
        brand: {
          DEFAULT: '#06070a',
          surface: '#0b0f17'
        },
        muted: {
          DEFAULT: '#9aa6b2',
          600: '#7f8b95'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}