/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  mode: 'jit',

  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        'h1': '48px',
        'h2': '36px',
        'h3': '30px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
      }

    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: 'rgb(0, 111, 238)',
            foreground: "#FFFFFF",
          },
          secondary: {
            DEFAULT: 'rgb(229, 231, 235)',
            foreground: 'black'
          }
        },
      }
    },

  })],
}

