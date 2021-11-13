module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: {
        100: '#FFF',
      },
      green: {
        100: '#6E7D60',
        200: '#7F977B',
        300: '#646464',
        400: '#65895F',
        500: '#737373',
      },
      gray: {
        100: '#E5E5E5',
        200: '#F9F9F9',
        300: '#C4C4C4',
        400: '#9E9E9E',
      },
      black: {
        100: '#1E1E1E',
        200: '#2F2F2F'
      },
      yellow: {
        100: '#E0DA48',
        200: '#BEA363'
      },
      orange: {
        100: '#FF725E'
      }
    },
    fontFamily: {
      'mochiy': ['Mochiy Pop P One', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {
      outlineWidth: ['focus']
    },
  },
  plugins: [],
}
