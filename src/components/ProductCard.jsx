import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import PackShot from './PackShot'
import Button from './Button'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const v = product.variants[0]
  return (
    <article className="card flex flex-col overflow-hidden transition hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block bg-cream-deep">
        <PackShot product={product} className="aspect-square w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-bold"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="text-sm text-bark">{product.shortDescription}</p>
        <p className="flex items-center gap-1 text-sm"><Star size={14} className="fill-wheat text-wheat" /> {product.rating} · {v.weight}</p>
        <p className="mt-auto pt-2 text-lg font-bold">From {formatPrice(v.price)}</p>
        <Button variant="outline" onClick={() => addItem(product.id, v.id, 1)}>Add to Cart</Button>
      </div>
    </article>
  )
}
