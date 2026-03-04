import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)'
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'serif'],
        sans: ['"Avenir Next"', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(7, 8, 10, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
