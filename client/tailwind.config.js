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
          DEFAULT: '#1B3B2B',
          dark: '#12271D',
          light: '#28533E',
        },
        jute: {
          gold: '#D8A856',
          tan: '#C89D56',
          light: '#EAD7B5',
          pale: '#F9F4EB',
        },
        sand: '#F4EFE6',
        cream: '#FAF7F2',
        charcoal: '#24221E',
        borderMuted: '#E7DFD1',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 10px 30px -10px rgba(27, 59, 43, 0.08), 0 4px 12px rgba(27, 59, 43, 0.04)',
        'organic-hover': '0 20px 40px -12px rgba(27, 59, 43, 0.16), 0 6px 16px rgba(27, 59, 43, 0.06)',
      }
    },
  },
  plugins: [],
}

