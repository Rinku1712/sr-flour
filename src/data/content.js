// Editable site copy. Reviews and certificate entries are DEMO data only.
const buildCertificatePreview = (title, accent, subtitle = 'Document preview') => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="${title}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#FAF6EC"/>
        <stop offset="100%" stop-color="#F1E9D9"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" rx="24" fill="url(#bg)"/>
    <rect x="52" y="52" width="796" height="496" rx="18" fill="#FFFDF8" stroke="#D9D1C2" stroke-width="3"/>
    <rect x="96" y="96" width="708" height="80" rx="12" fill="${accent}" opacity="0.12"/>
    <circle cx="160" cy="136" r="30" fill="${accent}" opacity="0.9"/>
    <path d="M145 136h30v18h-30zm0 24h30" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    <text x="220" y="148" font-size="34" font-family="Georgia, serif" fill="#1B2E24" font-weight="700">${title}</text>
    <text x="220" y="188" font-size="20" font-family="Arial, sans-serif" fill="#5E665F">${subtitle}</text>
    <line x1="96" y1="250" x2="804" y2="250" stroke="#D9D1C2" stroke-width="3"/>
    <rect x="120" y="290" width="220" height="110" rx="12" fill="#F3ECDE"/>
    <rect x="370" y="290" width="270" height="22" rx="11" fill="#D9D1C2"/>
    <rect x="370" y="328" width="200" height="18" rx="9" fill="#E1D8C9"/>
    <rect x="370" y="360" width="240" height="18" rx="9" fill="#E1D8C9"/>
    <rect x="680" y="286" width="130" height="110" rx="12" fill="${accent}" opacity="0.12"/>
    <text x="716" y="332" font-size="18" font-family="Arial, sans-serif" fill="#1B2E24" font-weight="700">Status</text>
    <text x="708" y="365" font-size="18" font-family="Arial, sans-serif" fill="#1B2E24">Demo</text>
    <rect x="120" y="440" width="230" height="52" rx="10" fill="#173D2E" opacity="0.9"/>
    <text x="136" y="474" font-size="20" font-family="Arial, sans-serif" fill="#F6F0E6" font-weight="700">Certificate document</text>
  </svg>
`)}`

export const features = [
  { icon: 'Wheat', title: 'Multigrain goodness', text: 'A thoughtful blend of grains in one atta.' },
  { icon: 'Utensils', title: 'Everyday nutrition', text: 'Made to fit the meals you already cook.' },
  { icon: 'ShieldCheck', title: 'Quality ingredients', text: 'Carefully sourced grains and seeds.' },
  { icon: 'Home', title: 'Made for Indian meals', text: 'Soft rotis, parathas and more.' },
]

export const certificates = [
  {
    id: 'quality-documentation',
    title: 'Quality & Transparency',
    category: 'Demo document',
    issuer: 'Add issuing authority',
    certificateNumber: 'Not configured',
    issueDate: 'Issue date — add verified date',
    expiryDate: 'Expiry — not configured',
    description: 'This section is a placeholder. Replace with your real certificate PDF or image before publishing.',
    image: buildCertificatePreview('Quality & Transparency', '#173D2E', 'Document preview'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Demo placeholder',
    accent: '#173D2E',
    rotation: -4,
  },
  {
    id: 'ingredient-record',
    title: 'Ingredient Record',
    category: 'Demo document',
    issuer: 'Add supplier or internal approval body',
    certificateNumber: 'Not configured',
    issueDate: 'Issue date — add verified date',
    expiryDate: 'Expiry — not configured',
    description: 'Upload your actual ingredient or batch documentation to replace this placeholder.',
    image: buildCertificatePreview('Ingredient Record', '#356448', 'Batch document'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Demo placeholder',
    accent: '#356448',
    rotation: 3,
  },
  {
    id: 'food-safety-brief',
    title: 'Food Safety Brief',
    category: 'Demo document',
    issuer: 'Add authority or internal compliance team',
    certificateNumber: 'Not configured',
    issueDate: 'Issue date — add verified date',
    expiryDate: 'Expiry — not configured',
    description: 'This card is intentionally marked as a placeholder and must be replaced with real documentation before launch.',
    image: buildCertificatePreview('Food Safety Brief', '#B96F50', 'Safety overview'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Demo placeholder',
    accent: '#B96F50',
    rotation: -2,
  },
  {
    id: 'production-verification',
    title: 'Production & Verification',
    category: 'Demo document',
    issuer: 'Add verification authority',
    certificateNumber: 'Not configured',
    issueDate: 'Issue date — add verified date',
    expiryDate: 'Expiry — not configured',
    description: 'Use this slot for a genuine certificate, compliance page, or product verification PDF from your approved vendor.',
    image: buildCertificatePreview('Production & Verification', '#6F7C67', 'Compliance record'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Demo placeholder',
    accent: '#6F7C67',
    rotation: 4,
  },
]

export const dayPlan = [
  { time: 'Morning', meal: 'Breakfast', text: 'Parathas and stuffed rotis.' },
  { time: 'Afternoon', meal: 'Lunch', text: 'Fresh rotis with dal and sabzi.' },
  { time: 'Evening', meal: 'Snack', text: 'Theplas, cheelas and more.' },
  { time: 'Night', meal: 'Dinner', text: 'Simple, soft phulkas.' },
]
export const reviews = [
  { name: 'Demo Customer A', rating: 5, text: 'Placeholder review. Real customer reviews will appear here.' },
  { name: 'Demo Customer B', rating: 5, text: 'Placeholder review. Real customer reviews will appear here.' },
  { name: 'Demo Customer C', rating: 4, text: 'Placeholder review. Real customer reviews will appear here.' },
]
export const faqs = [
  { q: 'What is Sanjay Atta?', a: 'Sanjay Atta is a multigrain atta made for everyday Indian rotis.' },
  { q: 'How should I store it?', a: 'Keep it in a cool, dry place in an airtight container.' },
  { q: 'How should I use it?', a: 'Knead it like regular atta and cook rotis as usual.' },
  { q: 'What ingredients are used?', a: 'Wheat, oats, chickpea, millets and seeds. Exact details will be confirmed on the final pack.' },
  { q: 'What pack sizes are available?', a: 'See the product page for current pack sizes.' },
  { q: 'How do I place an order?', a: 'Add the product to your cart and continue to checkout.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Payment options will be confirmed at checkout.' },
  { q: 'How long does delivery take?', a: 'Delivery availability and timing will be confirmed at checkout.' },
]
