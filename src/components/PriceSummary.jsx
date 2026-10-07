import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

const Row = ({ label, value, bold }) => <div className={`flex justify-between ${bold ? 'text-lg font-bold' : ''}`}><span>{label}</span><span key={value} className="quantity-value">{value}</span></div>

export default function PriceSummary({ children }) {
  const { subtotal, savings, delivery, total } = useCart()
  return (
    <aside className="card h-fit space-y-3 p-6">
      <h2 className="text-xl font-bold">Order summary</h2>
      <Row label="Subtotal" value={formatPrice(subtotal)} />
      <Row label="Estimated delivery" value={delivery ? formatPrice(delivery) : 'Free'} />
      {savings > 0 && <p className="font-bold text-forest-light">You save {formatPrice(savings)}</p>}
      <hr className="border-forest/10" />
      <Row label="Total" value={formatPrice(total)} bold />
      <p className="text-xs text-bark">Final delivery charge is confirmed at checkout.</p>
      {children}
    </aside>
  )
}
