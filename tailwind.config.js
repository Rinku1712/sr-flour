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
          DEFAULT: 'rgb(var(--c-terracotta) / <alpha-value>)',
          light: 'rgb(var(--c-sage) / <alpha-value>)',
        },
        bark: 'rgb(var(--c-bark) / <alpha-value>)',
        onaccent: 'rgb(var(--c-onaccent) / <alpha-value>)',
        sage: 'rgb(var(--c-sage) / <alpha-value>)',
        protein: 'rgb(var(--c-terracotta) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 12px 30px rgba(24, 58, 45, 0.08)' },
    },
  },
  plugins: [],
}
