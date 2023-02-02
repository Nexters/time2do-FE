/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      gridTemplateRows: {
        'header-footer': 'auto 1fr auto',
      },
      colors: {
        grey: {
          50: '#F9FAFB',
          100: '#F2F4F6',
          200: '#E5E8EB',
          300: '#D1D6DB',
          400: '#B0B8C1',
          500: '#8B95A1',
          600: '#6B7684',
          700: '#4E5968',
          800: '#333D4B',
          900: '#232B38',
          1000: '#191F28',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#786DFF',
          'primary-focus': '#6E64E7',
          secondary: '#BEFF7C',
          'secondary-focus': '#56CB2D',
          accent: '#FF6D6D',
        },
      },
    ],
  },
}
