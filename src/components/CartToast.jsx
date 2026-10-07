import { Check } from 'lucide-react'

export default function CartToast({ show }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!show}
      className={`pointer-events-none fixed bottom-20 right-5 z-[60] flex items-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-bold text-cream shadow-lg transition-all duration-200 ${show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <Check size={16} aria-hidden="true" /> Added to cart
    </div>
  )
}
