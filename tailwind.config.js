/** Brand theme: change colours/fonts here and the whole site updates. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'rgb(var(--c-cream) / <alpha-value>)',
          deep: 'rgb(var(--c-cream-deep) / <alpha-value>)',
        },
        forest: {
          DEFAULT: 'rgb(var(--c-forest) / <alpha-value>)',
          light: 'rgb(var(--c-forest-light) / <alpha-value>)',
        },
        wheat: {
          DEFAULT: 'rgb(var(--c-wheat) / <alpha-value>)',
          light: 'rgb(var(--c-wheat-light) / <alpha-value>)',
        },
        bark: 'rgb(var(--c-bark) / <alpha-value>)',
        onaccent: 'rgb(var(--c-onaccent) / <alpha-value>)',
        protein: '#D35400',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 4px 12px rgba(20,35,28,0.08)' },
    },
  },
  plugins: [],
}
