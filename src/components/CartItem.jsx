import { Trash2 } from 'lucide-react'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import QuantitySelector from './QuantitySelector'
import PackShot from './PackShot'

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart()
  const { product, variant, qty } = item
  return (
    <li className="card flex gap-4 p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-deep"><PackShot product={product} className="h-full w-full" /></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div><h3 className="font-bold leading-tight">{product.name}</h3><p className="text-sm text-bark">{variant.weight}</p></div>
          <button aria-label={`Remove ${product.name}`} onClick={() => removeItem(item)} className="text-bark hover:text-red-700"><Trash2 size={18} /></button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <QuantitySelector value={qty} onChange={(q) => setQty(item, q)} />
          <span className="font-bold">{formatPrice(variant.price * qty)}</span>
        </div>
      </div>
    </li>
  )
}
