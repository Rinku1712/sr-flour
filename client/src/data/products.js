// Single source of truth for products.
export const NUTRITION_NOTE = 'A balanced multigrain atta designed for everyday Indian meals and wholesome family rotis.'

export const products = [
  {
    id: 'high-protein-multigrain-atta',
    name: 'High Protein Multigrain Atta',
    category: 'Atta',
    shortDescription: 'Multigrain flour for soft everyday rotis.',
    description:
      'SR Flour blends wheat with wholesome grains and seeds so the roti your family already loves can be a little more nourishing and satisfying.',
    images: [],
    variants: [
      { id: '1kg', weight: '1 kg', price: 129, compareAtPrice: 149 },
      { id: '5kg', weight: '5 kg', price: 599, compareAtPrice: 699 },
    ],
    ingredients: ['Wheat', 'Oats', 'Chickpea', 'Millets', 'Sesame & flax seeds'],
    nutrition: { note: NUTRITION_NOTE, rows: [['Energy', '340 kcal per 100g'], ['Protein', '14 g per 100g'], ['Carbohydrates', '62 g per 100g'], ['Fibre', '8 g per 100g'], ['Fat', '4.5 g per 100g']] },
    benefits: ['Made with a smart grain blend', 'Suits everyday Indian meals', 'Kneads and cooks like regular atta'],
    howToUse: ['Take the atta and add water gradually.', 'Knead into a soft dough and rest for 15 to 20 minutes.', 'Roll and cook rotis on a hot tawa.'],
    stock: 50,
    rating: 4.8,
    reviewCount: 182,
  },
]

export const getProductById = (id) => products.find((p) => p.id === id)
