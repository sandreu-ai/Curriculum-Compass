import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1f6a4f',
          light: '#2d8a68',
          dark: '#154d39',
        },
        cream: {
          DEFAULT: '#fdfcf8',
          dark: '#f5f0e8',
          darker: '#ede8dc',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
