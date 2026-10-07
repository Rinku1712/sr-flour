import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, max = 20 }) {
  const btn = 'flex h-9 w-9 items-center justify-center rounded-full transition duration-150 hover:-translate-y-px hover:bg-cream-deep active:scale-95 disabled:opacity-40'
  return (
    <div className="inline-flex items-center rounded-full border border-forest/20 bg-white" role="group" aria-label="Quantity">
      <button type="button" className={btn} aria-label="Decrease quantity" disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus size={16} /></button>
      <span key={value} className="quantity-value w-8 text-center font-bold" aria-live="polite">{value}</span>
      <button type="button" className={btn} aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)}><Plus size={16} /></button>
    </div>
  )
}
