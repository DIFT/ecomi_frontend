const colors = require('tailwindcss/colors')

module.exports = {
  // purge: false,
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}',
  //   './blocks/**/*.{js,ts,jsx,tsx}', './templates/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.yellow,
      pink: colors.pink,
      'blue-gray': colors.blueGray,
      'cool-gray': colors.coolGray,
      orange: colors.orange,
      amber: colors.amber,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      violet: colors.violet,
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-neumorphism')],
}
