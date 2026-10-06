// Single source of truth for products. Later this file is replaced by GET /api/products.
export const NUTRITION_NOTE = 'Final nutritional values will be updated after product testing.'

export const products = [
  {
    id: 'high-protein-multigrain-atta',
    name: 'High Protein Multigrain Atta',
    category: 'Atta',
    shortDescription: 'Multigrain flour for soft everyday rotis.',
    description:
      'Sanjay Atta blends wheat with other wholesome grains and seeds so the roti your family already loves can be a little more thoughtful. Final recipe details will be confirmed after product testing.',
    images: [], // add imported image files here, e.g. [packImg]. Empty = placeholder pack art.
    // Each variant is a pack size. Prices are placeholders.
    variants: [
      { id: '1kg', weight: '1 kg', price: 129, compareAtPrice: 149 },
      { id: '5kg', weight: '5 kg', price: 599, compareAtPrice: 699 },
    ],
    ingredients: ['Wheat', 'Oats', 'Chickpea', 'Millets', 'Seeds'],
    nutrition: { note: NUTRITION_NOTE, rows: [['Energy', 'TBD'], ['Protein', 'TBD'], ['Carbohydrates', 'TBD'], ['Fibre', 'TBD'], ['Fat', 'TBD']] },
    benefits: ['Made with a blend of grains', 'Suits everyday Indian meals', 'Knead and cook like regular atta'],
    howToUse: ['Take the atta and add water gradually.', 'Knead into a soft dough and rest for 15 to 20 minutes.', 'Roll and cook rotis on a hot tawa.'],
    stock: 50,
    rating: 4.5, // demo value
    reviewCount: 0,
  },
]

export const getProductById = (id) => products.find((p) => p.id === id)
