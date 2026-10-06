import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import QuantitySelector from './QuantitySelector'
import Button from './Button'

// Weight selector + quantity + Add to Cart / Buy Now. Reused on Home and Product page.
export default function ProductBuy({ product }) {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [qty, setQty] = useState(1)
  const variant = product.variants.find((v) => v.id === variantId)

  if (product.stock <= 0) return <p className="rounded-2xl bg-cream-deep p-4 font-bold">Currently unavailable.</p>

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-bold">{formatPrice(variant.price)}</span>
        {variant.compareAtPrice > variant.price && <span className="text-bark line-through">{formatPrice(variant.compareAtPrice)}</span>}
      </div>
      <div>
        <p className="mb-2 text-sm font-bold">Weight</p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button key={v.id} type="button" aria-pressed={v.id === variantId} onClick={() => setVariantId(v.id)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition ${v.id === variantId ? 'border-forest bg-forest text-cream' : 'border-forest/20 bg-white hover:border-forest'}`}>
              {v.weight}
            </button>
          ))}
        </div>
      </div>
      <QuantitySelector value={qty} onChange={setQty} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="flex-1" onClick={() => addItem(product.id, variantId, qty)}><ShoppingBag size={18} /> Add to Cart</Button>
        <Button className="flex-1" onClick={() => { addItem(product.id, variantId, qty); navigate('/checkout') }}>Buy Now</Button>
      </div>
    </div>
  )
}
