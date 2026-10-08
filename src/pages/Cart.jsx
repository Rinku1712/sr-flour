import { ShoppingBag } from 'lucide-react';
import useTitle from '../hooks/useTitle';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import PriceSummary from '../components/PriceSummary';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function Cart() {
  useTitle('Your Cart');
  const cart = useCart() || {};
  const items = Array.isArray(cart.items) ? cart.items : [];

  if (!items.length) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          text="Add Sanjay Atta to get started."
          actionLabel="Shop Now"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-page scroll-reveal py-10 sm:py-14">
      <div className="mb-8 border-b border-forest/10 pb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-bark">
          Review your selection
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Your cart</h1>
        <p className="mt-2 text-sm text-bark">
          {items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout
        </p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4 scroll-reveal-stagger">
          {items.map((i) => (
            <CartItem key={`${i.productId}-${i.variantId}`} item={i} />
          ))}
        </ul>
        <div className="lg:sticky lg:top-24">
          <PriceSummary>
            <Button to="/checkout" className="w-full">
              Proceed to Checkout
            </Button>
            <Button to="/shop" variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </PriceSummary>
        </div>
      </div>
    </div>
  );
}
