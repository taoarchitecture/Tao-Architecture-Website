import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#ee1c25',
          gold: '#c8b273',
        },
        neutral: {
          black: '#000000',
          'off-black': '#1d1d1d',
          'dark-grey': '#231f20',
          'medium-grey': '#333333',
          'light-grey': '#929292',
          'date-grey': '#acb0b8',
          'border-grey': '#ededed',
          'bg-light': '#f7f7f7',
        }
      },
      fontFamily: {
        agenda: ['Agenda', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
