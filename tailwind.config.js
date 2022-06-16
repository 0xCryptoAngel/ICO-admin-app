/*eslint-env node*/
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        15: '3.6rem',
        19: '4.5rem',
        13: '2.8rem',
      },
      height: {
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        90: '22.5rem',
        100: '35rem',
      },
      width: {
        100: '35rem',
        22: '5.5rem',
        '4/9': '46%',
      },
      minHeight: {
        6: '1.5rem',
      },
      minWidth: {
        28: '7rem',
      },
      fontFamily: {
        Poppins: "'Poppins-SemiBold'",
      },
      fontSize: {
        xxs: '0.6rem',
        xxxs: '0.9rem',
        '3xxl': [
          '32px',
          {
            lineHeight: '40px',
          },
        ],
      },

      colors: {
        gray: {
          40: '#F9F9F9', 
          55: '#8E8EA1', 
        },
        
        blue: {
          650: '#109CF1',
        },
        purple: {
          450: '#6160DC'
        }
      },
      borderWidth: {
        1: '1px',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'checked'],
      borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
      display: ['group-hover'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
