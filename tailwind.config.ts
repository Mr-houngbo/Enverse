import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6600',
          dark: '#FF7700',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        foreground: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#333333',
          dark: '#AAAAAA',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'content': '800px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000000',
            h1: { color: '#000000' },
            h2: { color: '#000000' },
            h3: { color: '#000000' },
            strong: { color: '#000000' },
            code: { color: '#FF6600' },
            blockquote: { 
              color: '#333333',
              borderLeftColor: '#FF6600',
            },
            a: { 
              color: '#FF6600',
              '&:hover': {
                color: '#FF7700',
              },
            },
          },
        },
        dark: {
          css: {
            color: '#FFFFFF',
            h1: { color: '#FFFFFF' },
            h2: { color: '#FFFFFF' },
            h3: { color: '#FFFFFF' },
            strong: { color: '#FFFFFF' },
            code: { color: '#FF7700' },
            blockquote: { 
              color: '#AAAAAA',
              borderLeftColor: '#FF7700',
            },
            a: { 
              color: '#FF7700',
              '&:hover': {
                color: '#FF8800',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;