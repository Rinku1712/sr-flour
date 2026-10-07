import { Trash2 } from 'lucide-react'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import QuantitySelector from './QuantitySelector'
import PackShot from './PackShot'

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart()
  const { product, variant, qty } = item
  return (
    <li className="card flex gap-4 border border-forest/5 p-4 sm:gap-5 sm:p-5">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-deep sm:h-32 sm:w-32"><PackShot product={product} className="h-full w-full" /></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div><h3 className="font-bold leading-tight">{product.name}</h3><p className="mt-1 text-sm text-bark">{variant.weight}</p></div>
          <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(item)} className="rounded-lg p-2 text-bark transition hover:bg-cream-deep hover:text-forest"><Trash2 size={18} /></button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <QuantitySelector value={qty} onChange={(q) => setQty(item, q)} />
          <span key={variant.price * qty} className="quantity-value font-bold">{formatPrice(variant.price * qty)}</span>
        </div>
      </div>
    </li>
  )
}
