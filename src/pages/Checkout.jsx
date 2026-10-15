import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, MapPin, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import useTitle from '../hooks/useTitle'
import { formatPrice } from '../utils/format'
import { addOrder, readProfile, saveProfile } from '../utils/orderStorage'

const inputClass = 'mt-2 w-full rounded-xl border border-forest/15 bg-[#FFFEFA] px-4 py-3 text-sm text-forest shadow-sm transition duration-200 placeholder:text-bark/45 focus:border-forest focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/60'

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Checkout() {
  useTitle('Checkout')
  const navigate = useNavigate()
  const cart = useCart() || {}
  const items = Array.isArray(cart.items) ? cart.items : []
  const savedProfile = useMemo(() => readProfile(), [])
  const [values, setValues] = useState({
    fullName: savedProfile.fullName,
    email: savedProfile.email,
    phone: savedProfile.phone,
    address: savedProfile.address,
    city: savedProfile.city,
    state: savedProfile.state,
    postalCode: savedProfile.postalCode,
    note: savedProfile.note,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!items.length) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={Truck}
          title="Your cart is empty"
          text="Add a few essentials before you continue to checkout."
          actionLabel="Shop now"
          actionTo="/shop"
        />
      </div>
    )
  }

  const update = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Please add your full name.'
    if (!validEmail(values.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    if (!values.address.trim()) nextErrors.address = 'Please enter your delivery address.'
    if (!values.city.trim()) nextErrors.city = 'Please enter your city.'
    if (!values.state.trim()) nextErrors.state = 'Please enter your state.'
    if (!values.postalCode.trim()) nextErrors.postalCode = 'Please add your pin code.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    const order = {
      id: `SR-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      status: 'Confirmed',
      customer: {
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        postalCode: values.postalCode.trim(),
      },
      note: values.note.trim(),
      items: items.map(({ product, variant, qty }) => ({
        productId: product.id,
        name: product.name,
        weight: variant.weight,
        qty,
        price: variant.price,
      })),
      subtotal: cart.subtotal,
      savings: cart.savings,
      delivery: cart.delivery,
      total: cart.total,
    }

    saveProfile(values)
    addOrder(order)
    cart.clearCart()
    navigate(`/order-success?orderId=${order.id}`)
    setSubmitting(false)
  }

  const orderTotal = cart.total || 0

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-wheat">Almost there</p>
        <h1 className="mt-2 text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={submit} noValidate className="card space-y-6 p-5 sm:p-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-forest">
              <MapPin size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Delivery details</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-forest">
                Full name
                <input name="fullName" value={values.fullName} onChange={update} className={inputClass} aria-invalid={Boolean(errors.fullName)} />
                {errors.fullName && <span className="mt-1 block text-xs font-medium text-red-700">{errors.fullName}</span>}
              </label>
              <label className="text-sm font-semibold text-forest">
                Email address
                <input type="email" name="email" value={values.email} onChange={update} className={inputClass} aria-invalid={Boolean(errors.email)} />
                {errors.email && <span className="mt-1 block text-xs font-medium text-red-700">{errors.email}</span>}
              </label>
              <label className="text-sm font-semibold text-forest">
                Phone number
                <input type="tel" name="phone" value={values.phone} onChange={update} className={inputClass} placeholder="Optional" />
              </label>
              <label className="text-sm font-semibold text-forest">
                Postal code
                <input name="postalCode" value={values.postalCode} onChange={update} className={inputClass} aria-invalid={Boolean(errors.postalCode)} />
                {errors.postalCode && <span className="mt-1 block text-xs font-medium text-red-700">{errors.postalCode}</span>}
              </label>
              <label className="text-sm font-semibold text-forest sm:col-span-2">
                Street address
                <input name="address" value={values.address} onChange={update} className={inputClass} aria-invalid={Boolean(errors.address)} />
                {errors.address && <span className="mt-1 block text-xs font-medium text-red-700">{errors.address}</span>}
              </label>
              <label className="text-sm font-semibold text-forest">
                City
                <input name="city" value={values.city} onChange={update} className={inputClass} aria-invalid={Boolean(errors.city)} />
                {errors.city && <span className="mt-1 block text-xs font-medium text-red-700">{errors.city}</span>}
              </label>
              <label className="text-sm font-semibold text-forest">
                State
                <input name="state" value={values.state} onChange={update} className={inputClass} aria-invalid={Boolean(errors.state)} />
                {errors.state && <span className="mt-1 block text-xs font-medium text-red-700">{errors.state}</span>}
              </label>
              <label className="text-sm font-semibold text-forest sm:col-span-2">
                Delivery notes
                <textarea name="note" rows="3" value={values.note} onChange={update} className={`${inputClass} resize-none`} placeholder="Leave near the gate / ring at the bell" />
              </label>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-forest">
              <CreditCard size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Payment</h2>
            </div>
            <div className="rounded-2xl border border-forest/10 bg-cream-deep p-4 text-sm text-bark">
              <p className="font-semibold text-forest">Cash on delivery</p>
              <p className="mt-1">Pay when your order reaches your doorstep.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-forest/10 bg-sage/40 p-3 text-sm text-bark">
            <ShieldCheck size={18} className="text-forest" />
            Secure checkout for SR Flour orders. Your details are stored locally in this demo store.
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Placing order...' : `Place order • ${formatPrice(orderTotal)}`}
          </Button>
        </form>

        <aside className="card h-fit p-6">
          <h2 className="text-2xl font-bold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map(({ product, variant, qty }) => (
              <div key={`${product.id}-${variant.id}`} className="flex items-center justify-between gap-4 border-b border-forest/10 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-bark">{variant.weight} × {qty}</p>
                </div>
                <p className="font-semibold">{formatPrice(variant.price * qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-bark">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{cart.delivery ? formatPrice(cart.delivery) : 'Free'}</span></div>
            {cart.savings > 0 && <div className="flex justify-between text-forest"><span>Savings</span><span>-{formatPrice(cart.savings)}</span></div>}
            <hr className="border-forest/10" />
            <div className="flex justify-between text-base font-bold text-forest"><span>Total</span><span>{formatPrice(cart.total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
