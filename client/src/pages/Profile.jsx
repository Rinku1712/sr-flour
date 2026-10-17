import { useState } from 'react'
import { Check, CircleUserRound, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import { formatPrice } from '../utils/format'
import { readOrders, readProfile, saveProfile } from '../utils/orderStorage'
import { showSwalSuccess } from '../utils/sweetAlert'

const inputClass = 'mt-2 w-full rounded-xl border border-forest/15 bg-[#FFFEFA] px-4 py-3 text-sm text-forest shadow-sm transition duration-200 placeholder:text-bark/45 focus:border-forest focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/60'

export default function Profile() {
  useTitle('Profile')
  const [profile, setProfile] = useState(readProfile())
  const [saved, setSaved] = useState(false)
  const orders = readOrders()
  const lastOrder = orders[0]

  const update = (event) => {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  const submit = (event) => {
    event.preventDefault()
    saveProfile(profile)
    setSaved(true)
    showSwalSuccess('Profile updated', 'Your delivery details have been saved.')
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <CircleUserRound className="mx-auto text-wheat" size={38} />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat">Profile</p>
        <h1 className="mt-2 text-4xl font-bold">Your account details</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={submit} className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Personal information</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-forest">
              Full name
              <input name="fullName" value={profile.fullName} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest">
              Email address
              <input type="email" name="email" value={profile.email} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest">
              Phone number
              <input type="tel" name="phone" value={profile.phone} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest">
              Postal code
              <input name="postalCode" value={profile.postalCode} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest sm:col-span-2">
              Street address
              <input name="address" value={profile.address} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest">
              City
              <input name="city" value={profile.city} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest">
              State
              <input name="state" value={profile.state} onChange={update} className={inputClass} />
            </label>
            <label className="text-sm font-semibold text-forest sm:col-span-2">
              Delivery note
              <textarea name="note" rows="3" value={profile.note} onChange={update} className={`${inputClass} resize-none`} />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-forest px-5 py-3 text-sm font-bold text-cream transition hover:bg-forest-light">Save changes</button>
            {saved && <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest"><Check size={16} /> Saved</span>}
          </div>
        </form>

        <aside className="space-y-6">
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Quick summary</h2>
            <dl className="mt-4 space-y-3 text-sm text-bark">
              <div className="flex justify-between gap-4"><dt>Name</dt><dd className="font-semibold text-forest">{profile.fullName || 'Not added yet'}</dd></div>
              <div className="flex justify-between gap-4"><dt>Email</dt><dd className="font-semibold text-forest">{profile.email || 'Not added yet'}</dd></div>
              <div className="flex justify-between gap-4"><dt>Phone</dt><dd className="font-semibold text-forest">{profile.phone || 'Not added yet'}</dd></div>
            </dl>
          </section>

          <section className="card p-6">
            <div className="flex items-center gap-2 text-forest">
              <ShoppingBag size={18} className="text-wheat" />
              <h2 className="text-2xl font-bold">Latest order</h2>
            </div>
            {lastOrder ? (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.15em] text-bark/75">{lastOrder.id}</p>
                <p className="mt-2 text-lg font-bold text-forest">{formatPrice(lastOrder.total)}</p>
                <p className="mt-1 text-sm text-bark">{new Date(lastOrder.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <Link to={`/orders/${lastOrder.id}`} className="mt-4 inline-flex text-sm font-semibold text-forest underline underline-offset-4">View details</Link>
              </div>
            ) : (
              <p className="mt-4 text-sm text-bark">No orders yet. Place your first order to see it here.</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
