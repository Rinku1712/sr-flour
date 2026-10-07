import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingBag, Wheat } from 'lucide-react'
import { useCart } from '../context/CartContext'
import SearchOverlay from './SearchOverlay'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]
const linkCls = ({ isActive }) => `editorial-link font-medium transition hover:text-forest-light ${isActive ? 'text-wheat' : ''}`
const iconBtn = 'relative rounded-full p-2 hover:bg-cream-deep'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchButtonRef = useRef(null)
  const { count } = useCart()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <>
      <header className={`navbar-enter sticky top-0 z-50 border-b border-forest/10 backdrop-blur transition-all duration-300 ${isScrolled ? 'bg-cream/95 shadow-soft' : 'bg-cream/75'}`}>
      <div className={`container-page flex items-center justify-between transition-[height] duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
        <button
          type="button"
          className="rounded-full p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <Link to="/" aria-label="Sanjay Atta home" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide sm:text-2xl">
          <Wheat aria-hidden="true" className="text-wheat" size={21} strokeWidth={1.6} />
          <span>SANJAY <span className="text-wheat">ATTA</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-1">
          <button
            ref={searchButtonRef}
            type="button"
            aria-label="Search products"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
            className={`${iconBtn} transition-colors hover:bg-cream-deep`}
          >
            <Search size={21} />
          </button>
          <Link to="/account" aria-label="Account" className={`${iconBtn} hidden md:block`}><User size={22} /></Link>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className={iconBtn}>
            <ShoppingBag key={`cart-icon-${count}`} size={22} className={count ? 'cart-icon' : ''} />
            {count > 0 && <span key={`cart-count-${count}`} className="cart-count absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-wheat px-1 text-xs font-bold">{count}</span>}
          </Link>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        inert={open ? undefined : ''}
        aria-hidden={!open}
        className={`mobile-navigation container-page flex-col gap-1 md:hidden ${open ? 'mobile-navigation-open' : ''}`}
        aria-label="Mobile"
      >
        {[...navLinks, { to: '/account', label: 'Account' }].map((l) => (
          <NavLink
            key={`${l.to}-${l.label}`}
            to={l.to}
            end={l.to === '/'}
            onClick={() => setOpen(false)}
            className={(s) => `rounded-xl px-3 py-3 ${linkCls(s)}`}
          >
            {l.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => { setOpen(false); setSearchOpen(true) }}
          className="rounded-xl px-3 py-3 text-left font-medium transition hover:bg-cream-deep"
        >
          Search products
        </button>
      </nav>
      </header>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} triggerRef={searchButtonRef} />
    </>
  )
}
