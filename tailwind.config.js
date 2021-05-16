module.exports = {
  
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    maxWidth: {
      '1/4': '25%',
      '3/10':'30%',
      '1/2': '50%',
      '9/20':'45%',
      '3/4': '75%',
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '3/10':'30%',
      '9/20':'45%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
    extend: {
      width: {
        '1/4': '25%',
        '3/10':'30%',
        '1/2': '50%',
        '9/20':'45%',
        '3/4': '75%',
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    objectFit: ["responsive", "hover", "focus"],
    fontSize: ["responsive", "hover"],
    borderWidth: ["responsive", "focus"],
  },
  
  plugins: [],
}
