import { MapPin, PackageCheck, ReceiptText, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import { formatPrice } from '../utils/format'
import { readOrders } from '../utils/orderStorage'

export default function OrderDetails() {
  const { id } = useParams()
  const order = readOrders().find((entry) => entry.id === id)
  useTitle(order ? `Order ${order.id}` : 'Order Details')

  if (!order) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
          <ReceiptText className="mx-auto text-wheat" size={42} />
          <h1 className="mt-4 text-4xl font-bold">Order not found</h1>
          <p className="mt-3 text-bark">We couldn’t find the order you’re looking for.</p>
          <Link to="/orders" className="mt-6 inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-bold text-cream">Back to orders</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-wheat">Delivery details</p>
        <h1 className="mt-2 text-4xl font-bold">Order {order.id}</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-bark/70">Placed on</p>
                <p className="mt-2 font-bold text-forest">{new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <span className="rounded-full bg-sage px-3 py-1 font-semibold text-forest">{order.status}</span>
            </div>
          </section>

          <section className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-forest">
              <PackageCheck size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Items</h2>
            </div>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.name}-${item.weight}`} className="flex items-center justify-between gap-4 border-b border-forest/10 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-forest">{item.name}</p>
                    <p className="text-sm text-bark">{item.weight} • Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold text-forest">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-forest">
              <MapPin size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Delivery to</h2>
            </div>
            <p className="font-bold text-forest">{order.customer?.name}</p>
            <p className="mt-1 text-sm text-bark">{order.customer?.address}</p>
            <p className="text-sm text-bark">{order.customer?.city}, {order.customer?.state} {order.customer?.postalCode}</p>
            <p className="mt-2 text-sm text-bark">{order.customer?.phone || 'Phone not provided'}</p>
          </section>

          <section className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-forest">
              <Truck size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Summary</h2>
            </div>
            <div className="space-y-2 text-sm text-bark">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{order.delivery ? formatPrice(order.delivery) : 'Free'}</span></div>
              {order.savings > 0 && <div className="flex justify-between text-forest"><span>Savings</span><span>-{formatPrice(order.savings)}</span></div>}
              <hr className="border-forest/10" />
              <div className="flex justify-between text-base font-bold text-forest"><span>Total</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
