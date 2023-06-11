/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        pretendard: "'Pretendard', sans-serif",
        montserrat: "'Montserrat', sans-serif",
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      height: {
        button: '3.75rem',
      },
      gridTemplateRows: {
        'header-footer': 'auto 1fr auto',
      },
      colors: {
        ...require('daisyui/src/colors'),
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
          850: '#232B38',
          900: '#191F28',
          1000: '#111417',
        },
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.265rem',
        11.5: '2.875rem',
      },
      fontSize: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.265rem',
        11.5: '2.875rem',

        display1: '3.75rem',
        display2: '2.5rem',
        display3: '1.875rem',
        display4: '1.75rem',
        display5: '1.5625rem',
        display6: '1.125rem',
        title1: '1.4375rem',
        title2: '1.25rem',
        body1: '1.1875rem',
        body2: '1.0625rem',
        body3: '0.9375rem',
        body4: '0.875rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
    require('tailwindcss-animate'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#6C5CFF',
          'primary-focus': '#6E64E7',
          'primary-content': '#ffffff',
          secondary: '#5FDF30',
          'secondary-focus': '#56CB2D',
          accent: '#FF6D6D',
          'secondary-content': '#6C5CFF',
          'accent-content': '#6C5CFF',
        },
      },
    ],
  },
}
