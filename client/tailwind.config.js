/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#050D08',
          dark: '#08140D',
          DEFAULT: '#0D2218',
          card: '#0B1E14',
          light: '#1A3B29',
          border: '#234B32',
        },
        mint: {
          DEFAULT: '#65D886',
          glow: '#4EBA6F',
          light: '#86EAA2',
          soft: '#A2F4B8',
          dark: '#2E8C4E',
        },
        jute: {
          gold: '#D4A373',
          tan: '#C69255',
          warm: '#E6C594',
          light: '#F3E5D0',
          dark: '#8F6335',
        },
        sand: '#132419',
        cream: '#0B1A12',
        charcoal: '#F5F8F6',
        borderMuted: '#1E3E2B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        script: ['Caveat', 'Dancing Script', 'cursive'],
      },
      boxShadow: {
        'neon-mint': '0 0 30px rgba(101, 216, 134, 0.35)',
        'neon-mint-lg': '0 0 60px rgba(101, 216, 134, 0.45)',
        'dark-glass': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(101, 216, 134, 0.15)',
        'organic': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(101, 216, 134, 0.08)',
        'organic-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(101, 216, 134, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

