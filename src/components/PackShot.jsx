import { useState } from 'react'

// Placeholder pack art. Used until a real product photo is added to data/products.js.
export default function PackShot({ product, className = '' }) {
  const img = product?.images?.[0]
  const [imageLoaded, setImageLoaded] = useState(false)
  if (img) {
    return (
      <img
        src={img}
        alt={`${product.name} pack`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        className={`image-loaded object-contain ${className}`}
        style={{ opacity: imageLoaded ? undefined : 0 }}
      />
    )
  }
  return (
    <div role="img" aria-label="Sanjay Atta pack (placeholder artwork)" className={`flex items-center justify-center ${className}`}>
      <div className="flex h-[85%] w-[62%] max-w-[260px] flex-col items-center justify-between rounded-2xl bg-forest px-4 py-8 text-center text-cream shadow-soft">
        <span className="font-display text-2xl font-bold leading-tight">Sanjay<br />Atta</span>
        <span className="rounded-full bg-wheat px-3 py-1 text-xs font-bold text-forest">High Protein</span>
        <span className="text-sm text-wheat-light">Multigrain Atta</span>
      </div>
    </div>
  )
}
