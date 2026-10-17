import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getProductById } from '../data/products'
import { FREE_DELIVERY_ABOVE, DELIVERY_CHARGE } from '../config/config'
import { calculateCartTotals, MAX_CART_QUANTITY, normalizeCartLines } from '../utils/cart'

const CartContext = createContext(null)
const STORAGE_KEY = 'sanjay_cart'
// Cart stores only { productId, variantId, qty }. Prices are looked up so they never go stale.
const loadCart = () => {
  try {
    return normalizeCartLines(JSON.parse(localStorage.getItem(STORAGE_KEY)))
  } catch {
    return []
  }
}
const sameLine = (a, b) => a.productId === b.productId && a.variantId === b.variantId

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)
  const [persistenceError, setPersistenceError] = useState(false)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
      setPersistenceError(false)
    } catch {
      setPersistenceError(true)
    }
  }, [lines])

  const addItem = useCallback((productId, variantId, qty = 1) => {
    const product = getProductById(productId)
    const variant = product?.variants.find((item) => item.id === variantId)
    if (!product || !variant || !Number.isSafeInteger(qty) || qty < 1 || product.stock <= 0) return

    setLines((prev) => {
      const line = { productId, variantId }
      const found = prev.find((item) => sameLine(item, line))
      const otherProductQty = prev.reduce((total, item) => total + (item.productId === productId && !sameLine(item, line) ? item.qty : 0), 0)
      const maxQuantity = Math.min(MAX_CART_QUANTITY, product.stock - otherProductQty)
      if (maxQuantity < 1) return prev
      const nextQty = Math.min(maxQuantity, (found?.qty ?? 0) + qty)
      if (found?.qty === nextQty) return prev
      if (found) return prev.map((item) => (sameLine(item, line) ? { ...item, qty: nextQty } : item))
      return [...prev, { ...line, qty: nextQty }]
    })
  }, [])
  const setQty = useCallback((line, qty) =>
    setLines((prev) => {
      if (!Number.isSafeInteger(qty) || qty < 1) return prev
      const product = getProductById(line.productId)
      if (!product || product.stock <= 0) return prev
      const otherProductQty = prev.reduce((total, item) => total + (item.productId === line.productId && !sameLine(item, line) ? item.qty : 0), 0)
      const maxQuantity = Math.min(MAX_CART_QUANTITY, product.stock - otherProductQty)
      if (maxQuantity < 1) return prev.filter((item) => !sameLine(item, line))
      return prev.map((item) => (sameLine(item, line) ? { ...item, qty: Math.min(qty, maxQuantity) } : item))
    }), [])
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
    const totals = calculateCartTotals(items, FREE_DELIVERY_ABOVE, DELIVERY_CHARGE)
    return {
      items, ...totals,
      persistenceError,
      addItem, setQty, removeItem, clearCart,
    }
  }, [lines, persistenceError, addItem, setQty, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
