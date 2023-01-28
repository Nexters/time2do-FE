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
      textColor: {
        primary: '#191f28',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    // 다크모드여도 라이트 모드를 우선 설정
    darkTheme: 'light',
  },
}
