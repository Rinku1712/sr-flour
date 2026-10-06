/** Brand theme: change colours/fonts here and the whole site updates. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FAF6EC', deep: '#F1EAD7' },
        forest: { DEFAULT: '#1F3D2B', light: '#2F5A40' },
        wheat: { DEFAULT: '#C9962B', light: '#E8C873' },
        bark: '#6B4A2F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 8px 30px -12px rgba(31,61,43,0.25)' },
    },
  },
  plugins: [],
}
