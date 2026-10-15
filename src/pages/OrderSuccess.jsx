import { useEffect } from 'react'
import { CheckCircle2, PackageCheck, ShoppingBag } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import useTitle from '../hooks/useTitle'
import { formatPrice } from '../utils/format'
import { readOrders } from '../utils/orderStorage'
import { showSwalSuccess } from '../utils/sweetAlert'

export default function OrderSuccess() {
  useTitle('Order Success')
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const orders = readOrders()
  const order = orders.find((entry) => entry.id === orderId) || orders[0]

  useEffect(() => {
    if (order) {
      showSwalSuccess('Order placed', `Your order ${order.id} is confirmed.`)
    }
  }, [order])

  if (!order) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto text-forest" size={48} />
          <h1 className="mt-4 text-4xl font-bold">Your order is on its way</h1>
          <p className="mt-3 text-bark">We’ve received your request. Continue shopping for more essentials.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button to="/shop">Continue shopping</Button>
            <Button to="/orders" variant="outline">View orders</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-forest/10 bg-white p-8 shadow-soft sm:p-10">
        <div className="flex items-center gap-3 text-forest">
          <CheckCircle2 size={30} className="text-wheat" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wheat">Order confirmed</p>
        </div>

        <h1 className="mt-4 text-4xl font-bold">Thank you for shopping with SR Flour.</h1>
        <p className="mt-3 text-base text-bark">
          Your order <span className="font-bold text-forest">{order.id}</span> has been placed successfully. A confirmation has been saved in your account history.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-cream-deep p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-bark/75">Order</p>
            <p className="mt-2 font-bold text-forest">{order.id}</p>
          </div>
          <div className="rounded-2xl bg-cream-deep p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-bark/75">Status</p>
            <p className="mt-2 font-bold text-forest">{order.status}</p>
          </div>
          <div className="rounded-2xl bg-cream-deep p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-bark/75">Total</p>
            <p className="mt-2 font-bold text-forest">{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-forest/10 bg-sage/40 p-4 text-sm text-bark">
          <div className="flex items-center gap-2 font-semibold text-forest">
            <PackageCheck size={18} />
            Delivery timeline
          </div>
          <p className="mt-2">Your order is being prepared and will be dispatched soon. You’ll receive delivery updates once the courier confirms the pickup.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to={`/orders/${order.id}`}>Track order</Button>
          <Button to="/orders" variant="outline">View all orders</Button>
          <Button to="/shop" variant="outline" className="inline-flex items-center gap-2">
            <ShoppingBag size={18} /> Shop more
          </Button>
        </div>

        <p className="mt-6 text-sm text-bark">
          Need help? <Link to="/contact" className="font-semibold text-forest underline underline-offset-4">Contact SR Flour support</Link>
        </p>
      </div>
    </div>
  )
}
