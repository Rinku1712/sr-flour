import { ShoppingBag } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import PriceSummary from '../components/PriceSummary'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'

export default function Cart() {
  useTitle('Your Cart')
  const { items } = useCart()
  if (!items.length) return <div className="container-page py-16"><EmptyState icon={ShoppingBag} title="Your cart is empty" text="Add Sanjay Atta to get started." actionLabel="Shop Now" actionTo="/shop" /></div>
  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-4xl font-bold">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">{items.map((i) => <CartItem key={`${i.productId}-${i.variantId}`} item={i} />)}</ul>
        <PriceSummary>
          <Button to="/checkout" className="w-full">Proceed to Checkout</Button>
          <Button to="/shop" variant="outline" className="w-full">Continue Shopping</Button>
        </PriceSummary>
      </div>
    </div>
  )
}
