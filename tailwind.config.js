const dimensions = {}
const negativeDimensions = {}

for (const dimension of Array.from(Array(101).keys())) {
  if (dimension === 0) {
    continue
  }
  dimensions[dimension] = `${dimension / 10}rem`
  negativeDimensions[`-${dimension}`] = `-${dimension / 10}rem`
}

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      billz: {
        DEFAULT: '#0065ff'
      },
      white: {
        100: '#ffffff',
        200: '#F9F9F9',
        300: '#E1E1E1'
      },
      's-green': {
        100: '#a5b5b5',
        200: '#76908f',
        300: '#4a6c6a',
        400: '#1c4745'
      },
      'd-green': {
        100: '#9bbab9',
        200: '#699795',
        300: '#367572',
        400: '#015350'
      },
      'f-green': {
        100: '#b0eac2',
        200: '#88e1a3',
        300: '#5fd484',
        400: '#34cc66',
        500: '#00AD6D'
      },
      'd-gray': {
        100: '#adadad',
        200: '#858585',
        300: '#5c5c5c',
        400: '#333333'
      },
      gray: {
        100: '#e1e1e1',
        200: '#d6d6d6',
        300: '#c2c2c2',
        400: '#999999',
        500: '#878897'
      },
      'f-yellow': {
        100: '#fff4c5',
        200: '#ffe783',
        300: '#ffe14f',
        400: '#ffe11b'
      },
      'f-blue': {
        100: '#9fbdcb',
        200: '#79adcc',
        300: '#5297cb',
        400: '#3886cb',
        500: '#3786CC'
      },
      'f-red': {
        100: '#e1a3a3',
        200: '#e28382',
        300: '#e26161',
        400: '#e54040',
        500: '#EB1515'
      },
      'd-orange': {
        100: '#ceb191',
        200: '#d3a266',
        300: '#d78f2f',
        400: '#db8303'
      },
      'd-blue': {
        100: '#90b3c4',
        200: '#90b3c4',
        300: '#11456b',
        400: '#012a4e'
      },
      'd-red': {
        100: '#eba4a4',
        200: '#c74f4f',
        300: '#a02424',
        400: '#7f0002',
      }
    },
    fontSize: {
      12: '1.2rem',
      13: '1.3rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      17: '1.7rem',
      18: '1.8rem',
      20: '2rem',
      26: '2.6rem',
      24: '2.4rem',
      32: '3.2rem'
    },
    lineHeight: {
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      17: '1.7rem',
      18: '1.8rem',
      19: '1.9rem',
      20: '2rem',
      21: '2.1rem',
      23: '2.3rem',
      28: '2.8rem',
      30: '3rem',
      37: '3.7rem'
    },
    borderRadius: {
      full: '50%',
      DEFAULT: '4px'
    },
    container: {
      center: true
    },
    extend: {
      margin: {
        ...dimensions,
        115: '11.5rem'
      },
      padding: dimensions,
      height: {
        ...dimensions,
        160: '16rem',
        280: '28rem',
        460: '46rem',
        560: '56rem'
      },
      inset: {
        ...dimensions,
        ...negativeDimensions,
        'container-space': 'calc((100vw - 1110px) / 2)'
      },
      width: {
        ...dimensions,
        110: '11rem',
        140: '14rem',
        160: '16rem',
        405: '40.5rem',
        512: '51.2rem'
      },
      maxWidth: {
        40: '4rem',
        50: '5rem',
        540: '54rem',
        1440: '144rem'
      },
      minWidth: {
        160: '16rem',
        205: '20.5rem'
      },
      minHeight: {
        40: '4rem'
      },
      maxHeight: {
        72: '7.2rem',
        180: '18rem',
        264: '26.4rem',
        'screen-50': '50vh'
      },
      borderWidth: {
        3: '.3rem'
      },
      gap: {
        30: '3rem',
        16: '1.6rem'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.f-green.500'),
              'text-decoration': 'none',
              '&:hover': {
                'text-decoration': 'underline'
              }
            },
            p: {
              'font-size': '1.5rem',
              'line-height': '2.1rem',
              'margin-bottom': '2rem',
              color: theme('colors.d-gray.300')
            }
          }
        }
      })
    },
    screens: {
      sm: '345px',
      md: '640px',
      lg: '1000px',
      xl: '1110px'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      display: ['group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
