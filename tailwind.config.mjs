/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E0F',
        paper: '#F4F1EA',
        accent: '#E8632A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero-sm': ['64px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero': ['96px', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'hero-lg': ['160px', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'body-lg': ['20px', { lineHeight: '1.5' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'feeling': ['12px', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      gridTemplateColumns: {
        '12-fluid': 'repeat(12, minmax(0, 1fr))',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
