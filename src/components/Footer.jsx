import { Link } from 'react-router-dom'
import { Wheat } from 'lucide-react'
import { navLinks } from './Navbar'
import { INSTAGRAM_URL, SUPPORT_EMAIL } from '../config/config'

export default function Footer() {
  return (
    <footer className="scroll-reveal bg-forest text-cream">
      <div className="container-page py-12 sm:py-16">
        <div className="mb-10 grid gap-8 border-b border-cream/15 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-bold tracking-wide"><Wheat size={19} className="text-wheat" strokeWidth={1.6} aria-hidden="true" /> SANJAY ATTA</p>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight sm:text-5xl">Better Grains.<br /><span className="italic text-wheat-light">Better Everyday.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-cream/70 md:justify-self-end">Thoughtful grains for the everyday meals families already love.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 scroll-reveal-stagger">
          <nav aria-label="Shop" className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-wheat-light">Shop</p>
            <Link to="/shop" className="footer-link hover:text-wheat-light">All products</Link>
            <Link to="/cart" className="footer-link hover:text-wheat-light">Your cart</Link>
          </nav>
          <nav aria-label="Company" className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-wheat-light">Company</p>
            {navLinks.filter((link) => ['/', '/about'].includes(link.to)).map((link) => <Link key={link.to} to={link.to} className="footer-link hover:text-wheat-light">{link.label === 'Home' ? 'Home' : 'Our Story'}</Link>)}
          </nav>
          <nav aria-label="Support" className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-wheat-light">Support</p>
            {navLinks.filter((link) => ['/faq', '/contact'].includes(link.to)).map((link) => <Link key={link.to} to={link.to} className="footer-link hover:text-wheat-light">{link.label}</Link>)}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-link hover:text-wheat-light">{SUPPORT_EMAIL}</a>
          </nav>
          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-wheat-light">Follow Us</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="footer-link hover:text-wheat-light">Instagram</a>
          </div>
        </div>
      </div>
      <p className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">© {new Date().getFullYear()} Sanjay Atta. Product details are subject to final testing.</p>
    </footer>
  )
}
