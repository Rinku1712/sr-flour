import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-forest text-cream hover:bg-forest-light',
  gold: 'bg-wheat text-forest hover:bg-wheat-light',
  outline: 'border-2 border-forest text-forest hover:bg-forest hover:text-cream',
}
// Renders a <Link> when `to` is given, otherwise a <button>.
export default function Button({ variant = 'primary', to, className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition disabled:opacity-50 ${styles[variant]} ${className}`
  return to ? <Link to={to} className={cls} {...props}>{children}</Link> : <button className={cls} {...props}>{children}</button>
}
