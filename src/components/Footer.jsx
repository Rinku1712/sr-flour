import { Link } from 'react-router-dom'
import { navLinks } from './Navbar'
import { INSTAGRAM_URL, SUPPORT_EMAIL } from '../config/config'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">Sanjay Atta</p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">Healthy everyday nutrition through an Indian staple: roti.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {navLinks.map((l) => <Link key={l.to} to={l.to} className="hover:text-wheat-light">{l.label}</Link>)}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-wheat-light">{SUPPORT_EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-wheat-light">Instagram</a>
        </div>
      </div>
      <p className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">© {new Date().getFullYear()} Sanjay Atta. Product details are subject to final testing.</p>
    </footer>
  )
}
