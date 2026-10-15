import { PackageOpen, ReceiptText } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import useTitle from '../hooks/useTitle'
import { formatPrice } from '../utils/format'
import { readOrders } from '../utils/orderStorage'

export default function Orders() {
  useTitle('My Orders')
  const orders = readOrders()

  if (!orders.length) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          text="Start with a fresh order and your recent purchases will appear here."
          actionLabel="Shop now"
          actionTo="/shop"
        />
      </div>
    )
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-wheat">Your history</p>
        <h1 className="mt-2 text-4xl font-bold">My orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="card p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-bark/65">Order {order.id}</p>
                <h2 className="mt-1 text-2xl font-bold">{new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-sage px-3 py-1 font-semibold text-forest">{order.status}</span>
                <span className="font-bold text-forest">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-forest/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-bark">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {order.customer?.city || 'Delivery in progress'}
              </p>
              <Link to={`/orders/${order.id}`} className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-4">
                <ReceiptText size={16} /> View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
