/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030711',
        night: '#07111f',
        mist: '#9eb2d7',
        cyanGlow: '#56d6ff',
        aquaGlow: '#79f2ff',
        limeGlow: '#95ffb6',
        amberGlow: '#ffd46c',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(122, 234, 255, 0.16), 0 24px 80px rgba(6, 17, 32, 0.45)',
        cyan: '0 12px 40px rgba(86, 214, 255, 0.2)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top, rgba(86, 214, 255, 0.15), transparent 34%), radial-gradient(circle at 80% 20%, rgba(149, 255, 182, 0.12), transparent 26%), linear-gradient(180deg, rgba(4, 9, 19, 0.95), rgba(3, 7, 17, 1))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.35', transform: 'scaleX(1)' },
          '50%': { opacity: '1', transform: 'scaleX(1.05)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'pulse-line': 'pulseLine 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
