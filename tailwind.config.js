/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        pulse1: 'pulse1 6s ease-in-out infinite alternate',
        pulse2: 'pulse2 8s ease-in-out infinite alternate',
      },
      keyframes: {
        pulse1: {
          from: { transform: 'scale(1)' },
          to:   { transform: 'scale(1.4)' },
        },
        pulse2: {
          from: { transform: 'scale(1)' },
          to:   { transform: 'scale(1.3)' },
        },
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(270deg,#1a001a,#2e0033,#480048,#1a0033)'
      }
    }
  },
  plugins: []
};
