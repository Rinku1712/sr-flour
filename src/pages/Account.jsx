import { ArrowRight, CircleUserRound, PackageCheck, ShieldCheck, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import { readOrders, readProfile } from '../utils/orderStorage'

export default function Account() {
  useTitle('My Account')
  const profile = readProfile()
  const recentOrders = readOrders().slice(0, 2)

  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <CircleUserRound aria-hidden="true" className="mx-auto text-wheat" size={34} strokeWidth={1.5} />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat">Your SR Flour</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Your account, your way.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-bark">
            {profile.fullName ? `Welcome back, ${profile.fullName}.` : 'Sign in to manage your account. New here? Create an account to get started.'}
          </p>
        </header>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <section className="card p-6 sm:p-8">
            <UserRound aria-hidden="true" className="text-wheat" size={25} />
            <h2 className="mt-4 text-2xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-bark">Access your account details, saved delivery information, and recent orders.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/login" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-bold text-cream transition hover:bg-forest-light">
                Sign in <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-forest/20 px-5 py-3 text-sm font-bold text-forest transition hover:bg-sage/50">
                My profile
              </Link>
            </div>
          </section>
          <section className="card p-6 sm:p-8">
            <PackageCheck aria-hidden="true" className="text-wheat" size={25} />
            <h2 className="mt-4 text-2xl font-bold">Order and delivery</h2>
            <p className="mt-2 text-sm leading-6 text-bark">
              {recentOrders.length
                ? `You have ${recentOrders.length} recent order${recentOrders.length > 1 ? 's' : ''} ready to review.`
                : 'Track your purchases and keep your delivery information organized.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/orders" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#B86B4B] px-5 py-3 text-sm font-bold text-cream transition hover:bg-[#A75F3E]">
                View orders
              </Link>
              <Link to="/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-forest/20 px-5 py-3 text-sm font-bold text-forest transition hover:bg-sage/50">
                Update profile
              </Link>
            </div>
          </section>
        </div>
        <p className="mt-6 flex items-start gap-2 rounded-2xl border border-forest/10 bg-white/70 p-4 text-sm leading-6 text-bark">
          <ShieldCheck aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-forest" />
          Authentication is provided only when a secure account service is configured. Your cart, wishlist, and order history remain available without signing in.
        </p>
      </div>
    </div>
  )
}
