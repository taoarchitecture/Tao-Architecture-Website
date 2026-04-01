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
          'red-dark': '#cc1720',
          gold: '#c8b273',
          'gold-light': '#d4c08a',
          'gold-dark': '#b09a5e',
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
          'bg-warm': '#fafaf8',
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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 28px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translate3d(0, -20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translate3d(-28px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translate3d(28px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-up': 'fadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-down': 'fadeInDown 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-left': 'fadeInLeft 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-right': 'fadeInRight 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 28px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
        'elegant': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'lift': '0 6px 20px rgba(0, 0, 0, 0.08)',
        'red-glow': '0 6px 20px rgba(238, 28, 37, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
