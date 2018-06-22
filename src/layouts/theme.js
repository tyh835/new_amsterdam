const theme = {
  breakpoints: [
    '32rem',
    '48rem',
    '64rem',
    '80rem'
  ],

  fonts: {
    // Make sure to remove unused fonts in <link /> once site is finished!
    sans: `"Lato", Arial, sans-serif`,
    serif: `"Playfair Display", Times, serif`,
    header: `"Roboto Condensed", sans-serif`,
    title: `"Cabin Sketch", sans-serif`
  },

  color: {
    header: 'white',
    footer: 'PapayaWhip',
    info: 'white',
    hover: 'orange'
  },

  hover: {
    opacity: '0.75',
    transition: 'all 0.3s'
  },

  height: {
    header: '80',
    footer: '320'
  }
};

export default theme;
