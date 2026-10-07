import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import useCartFeedback from '../hooks/useCartFeedback'
import PackShot from './PackShot'
import Button from './Button'
import CartToast from './CartToast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { showToast, notifyAdded } = useCartFeedback()
  const v = product.variants[0]

  const handleAdd = () => {
    addItem(product.id, v.id, 1)
    notifyAdded()
  }

  return (
    <>
      <article className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link to={`/product/${product.id}`} className="block overflow-hidden bg-cream-deep">
          <PackShot product={product} className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.025]" />
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-xl font-bold"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
          <p className="text-sm text-bark">{product.shortDescription}</p>
          <p className="flex items-center gap-1 text-sm"><Star size={14} className="fill-wheat text-wheat" /> {product.rating} · {v.weight}</p>
          <p className="mt-auto pt-2 text-lg font-bold">From {formatPrice(v.price)}</p>
          <div className="product-card-action">
            <Button variant="outline" className="w-full" onClick={handleAdd}>{showToast ? 'Added ✓' : 'Add to Cart'}</Button>
          </div>
        </div>
      </article>
      <CartToast show={showToast} />
    </>
  )
}
