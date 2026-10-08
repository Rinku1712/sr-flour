import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getProductById } from '../data/products'
import { FREE_DELIVERY_ABOVE, DELIVERY_CHARGE } from '../config/config'

const CartContext = createContext(null)
const STORAGE_KEY = 'sanjay_cart'
// Cart stores only { productId, variantId, qty }. Prices are looked up so they never go stale.
const loadCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(stored)) return []
    return stored.filter((line) => line && typeof line === 'object' && 'productId' in line && 'variantId' in line)
  } catch {
    return []
  }
}
const sameLine = (a, b) => a.productId === b.productId && a.variantId === b.variantId

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)) }, [lines])

  const addItem = useCallback((productId, variantId, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => sameLine(l, { productId, variantId }))
      if (found) return prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
      return [...prev, { productId, variantId, qty }]
    })
  }, [])
  const setQty = useCallback((line, qty) =>
    setLines((prev) => prev.map((l) => (sameLine(l, line) ? { ...l, qty: Math.max(1, qty) } : l))), [])
  const removeItem = useCallback((line) => setLines((prev) => prev.filter((l) => !sameLine(l, line))), [])
  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const items = lines
      .map((l) => {
        const product = getProductById(l.productId)
        const variant = product?.variants.find((v) => v.id === l.variantId)
        return product && variant ? { ...l, product, variant } : null
      })
      .filter(Boolean)
    const subtotal = items.reduce((s, i) => s + i.variant.price * i.qty, 0)
    const savings = items.reduce((s, i) => s + (i.variant.compareAtPrice - i.variant.price) * i.qty, 0)
    const delivery = items.length === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE
    return {
      items, subtotal, savings: Math.max(0, savings), delivery, total: subtotal + delivery,
      count: items.reduce((s, i) => s + i.qty, 0),
      addItem, setQty, removeItem, clearCart,
    }
  }, [lines, addItem, setQty, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
