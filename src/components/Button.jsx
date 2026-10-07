import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-forest text-cream hover:bg-forest-light',
  gold: 'bg-wheat text-forest hover:bg-wheat-light',
  outline: 'border-2 border-forest text-forest hover:bg-forest hover:text-cream',
}
// Renders a <Link> when `to` is given, otherwise a <button>.
export default function Button({ variant = 'primary', to, className = '', children, ...props }) {
  const cls = `button-motion group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`
  return to ? <Link to={to} className={cls} {...props}>{children}</Link> : <button className={cls} {...props}>{children}</button>
}
