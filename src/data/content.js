// Copy for the SR Flour storefront. This is intentionally polished demo copy for a complete frontend experience.
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
    <text x="708" y="365" font-size="18" font-family="Arial, sans-serif" fill="#1B2E24">Verified</text>
    <rect x="120" y="440" width="230" height="52" rx="10" fill="#173D2E" opacity="0.9"/>
    <text x="136" y="474" font-size="20" font-family="Arial, sans-serif" fill="#F6F0E6" font-weight="700">Certificate document</text>
  </svg>
`)}`

export const features = [
  { icon: 'Wheat', title: 'Multigrain goodness', text: 'A balanced blend of hearty grains for fuller, softer rotis.' },
  { icon: 'Utensils', title: 'Everyday nutrition', text: 'Designed to support family meals without changing your routine.' },
  { icon: 'ShieldCheck', title: 'Quality ingredients', text: 'Carefully selected grains and seeds with a cleaner ingredient story.' },
  { icon: 'Home', title: 'Made for Indian meals', text: 'Perfect for rotis, parathas, theplas, and simple family dinners.' },
]

export const certificates = [
  {
    id: 'quality-documentation',
    title: 'Quality & Transparency',
    category: 'Vendor documentation',
    issuer: 'SR Flour quality team',
    certificateNumber: 'QR-2026-0481',
    issueDate: 'Issued 13 Feb 2026',
    expiryDate: 'Valid for 12 months',
    description: 'A clean, traceable overview of our product standards and quality assurance approach.',
    image: buildCertificatePreview('Quality & Transparency', '#173D2E', 'Document preview'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Verified',
    accent: '#173D2E',
    rotation: -4,
  },
  {
    id: 'ingredient-record',
    title: 'Ingredient Record',
    category: 'Ingredient overview',
    issuer: 'Procurement & sourcing',
    certificateNumber: 'ING-2026-091',
    issueDate: 'Updated 26 Jan 2026',
    expiryDate: 'Reviewed monthly',
    description: 'A quick proof of our ingredient sourcing and the grains that go into every pack.',
    image: buildCertificatePreview('Ingredient Record', '#356448', 'Batch document'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Accurate',
    accent: '#356448',
    rotation: 3,
  },
  {
    id: 'food-safety-brief',
    title: 'Food Safety Brief',
    category: 'Safety overview',
    issuer: 'Production compliance',
    certificateNumber: 'FS-2026-742',
    issueDate: 'Approved 10 Mar 2026',
    expiryDate: 'Annual refresh',
    description: 'A crisp snapshot of the storage, handling, and kitchen standards behind our flour.',
    image: buildCertificatePreview('Food Safety Brief', '#B96F50', 'Safety overview'),
    documentUrl: '',
    verificationUrl: '',
    status: 'In review',
    accent: '#B96F50',
    rotation: -2,
  },
  {
    id: 'production-verification',
    title: 'Production & Verification',
    category: 'Batch verification',
    issuer: 'Mill operations',
    certificateNumber: 'PV-2026-116',
    issueDate: 'Filed 18 Feb 2026',
    expiryDate: 'Updated per batch',
    description: 'A practical overview of packaging, milling, and quality checks before the product reaches your kitchen.',
    image: buildCertificatePreview('Production & Verification', '#6F7C67', 'Compliance record'),
    documentUrl: '',
    verificationUrl: '',
    status: 'Verified',
    accent: '#6F7C67',
    rotation: 4,
  },
]

export const dayPlan = [
  { time: 'Morning', meal: 'Breakfast', text: 'Parathas and stuffed rotis with a nourishing start.' },
  { time: 'Afternoon', meal: 'Lunch', text: 'Fresh rotis with dal, sabzi, and a simple home-cooked spread.' },
  { time: 'Evening', meal: 'Snack', text: 'Theplas, cheelas, and evening bites the whole family enjoys.' },
  { time: 'Night', meal: 'Dinner', text: 'Soft phulkas and comforting mains for a wholesome finish.' },
]
export const reviews = [
  { name: 'Aditi M.', rating: 5, text: 'The rotis feel softer and the family has been asking for more.' },
  { name: 'Rohan P.', rating: 5, text: 'A clean, practical flour that fits our everyday Indian meals perfectly.' },
  { name: 'Neha S.', rating: 4, text: 'Light, easy to knead, and a great addition to our weekly meal prep.' },
]
export const faqs = [
  { q: 'What is SR Flour?', a: 'SR Flour is a multigrain atta made for everyday Indian rotis, parathas, and family meals.' },
  { q: 'How should I store it?', a: 'Keep it in a cool, dry place in an airtight container to preserve freshness and texture.' },
  { q: 'How should I use it?', a: 'Knead it like regular atta and cook rotis, parathas, or theplas as usual.' },
  { q: 'What ingredients are used?', a: 'Our blend includes wheat, oats, chickpea, millets, and seeds for a softer, more nourishing everyday flour.' },
  { q: 'What pack sizes are available?', a: 'We currently offer convenient household pack sizes designed for daily use.' },
  { q: 'How do I place an order?', a: 'Add the product to your cart and continue to checkout for a quick purchase flow.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Cash on delivery is available where the order and location allow it at checkout.' },
  { q: 'How long does delivery take?', a: 'Delivery timing depends on your location and courier availability, and is shown during checkout.' },
]
