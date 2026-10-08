import { useState } from 'react'
import { Wheat } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

// Placeholder pack art. Used until a real product photo is added to data/products.js.
export default function PackShot({ product, className = '' }) {
  const img = product?.images?.[0]
  const [imageLoaded, setImageLoaded] = useState(false)
  const reduceMotion = useReducedMotion()
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
      <div className="relative flex h-[88%] w-[62%] max-w-[260px] flex-col items-center justify-between overflow-hidden rounded-[1.75rem] border border-wheat/45 bg-cream px-4 py-6 text-center text-forest shadow-[0_28px_45px_-20px_rgba(0,0,0,0.55)] sm:py-8">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-wheat" />
        <Wheat aria-hidden="true" className="text-wheat" size={22} strokeWidth={1.4} />
        <span className="font-display text-2xl font-bold leading-tight">Sanjay<br />Atta</span>
        <motion.span
          className="rounded-full bg-protein px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black"
          animate={reduceMotion ? undefined : { scale: [1, 1.03, 1], filter: ['brightness(1)', 'brightness(1.08)', 'brightness(1)'] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          High Protein
        </motion.span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-forest-light sm:text-sm">Multigrain Atta</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-bark sm:text-[9px]">Made for everyday rotis</span>
      </div>
    </div>
  )
}
