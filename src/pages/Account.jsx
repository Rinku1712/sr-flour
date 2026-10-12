import { Link } from 'react-router-dom'
import { ArrowRight, CircleUserRound, PackageCheck, ShieldCheck, UserRound } from 'lucide-react'
import useTitle from '../hooks/useTitle'

export default function Account() {
  useTitle('My Account')

  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <CircleUserRound aria-hidden="true" className="mx-auto text-wheat" size={34} strokeWidth={1.5} />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat">Your SR Flour</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Your account, your way.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-bark">
            Sign in to manage your account. New here? Create an account to get started.
          </p>
        </header>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <section className="card p-6 sm:p-8">
            <UserRound aria-hidden="true" className="text-wheat" size={25} />
            <h2 className="mt-4 text-2xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-bark">Sign in to access your account details and order history.</p>
            <Link to="/login" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-bold text-cream transition hover:bg-forest-light">
              Sign in <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
          <section className="card p-6 sm:p-8">
            <PackageCheck aria-hidden="true" className="text-wheat" size={25} />
            <h2 className="mt-4 text-2xl font-bold">New to SR Flour?</h2>
            <p className="mt-2 text-sm leading-6 text-bark">Create an account and keep your details close for your next visit.</p>
            <Link to="/signup" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-forest/20 px-5 py-3 text-sm font-bold text-forest transition hover:bg-sage/50">
              Create account <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
        </div>
        <p className="mt-6 flex items-start gap-2 rounded-2xl border border-forest/10 bg-white/70 p-4 text-sm leading-6 text-bark">
          <ShieldCheck aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-forest" />
          Authentication is provided only when a secure account service is configured. Your cart remains available without signing in.
        </p>
      </div>
    </div>
  )
}
