import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]
const linkCls = ({ isActive }) => `font-medium transition hover:text-wheat ${isActive ? 'text-wheat' : ''}`
const iconBtn = 'relative rounded-full p-2 hover:bg-cream-deep'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <button className="rounded-full p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <Link to="/" className="font-display text-2xl font-bold">Sanjay Atta</Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/shop" aria-label="Search" className={`${iconBtn} hidden md:block`}><Search size={22} /></Link>
          <Link to="/account" aria-label="Account" className={`${iconBtn} hidden md:block`}><User size={22} /></Link>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className={iconBtn}>
            <ShoppingBag size={22} />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-wheat px-1 text-xs font-bold">{count}</span>}
          </Link>
        </div>
      </div>
      {open && (
        <nav className="container-page flex flex-col gap-1 pb-4 md:hidden" aria-label="Mobile">
          {[...navLinks, { to: '/account', label: 'Account' }].map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={(s) => `rounded-xl px-3 py-3 ${linkCls(s)}`}>{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
