export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {





        primary: {
                  DEFAULT: '#00f3ff',
                  600: '#00d4e0',
                  500: '#00f3ff'
                },
        accent: {
          DEFAULT: '#b76cff',
          500: '#b76cff'
        },
        neon: {
                  DEFAULT: '#00f3ff'
                },
        surface: {
          DEFAULT: '#0b0f17',
          100: '#0f1620',
          200: '#0b0f17'
        },
                brand: {
          DEFAULT: '#050505',
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