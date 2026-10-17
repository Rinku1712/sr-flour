import { getProductById } from '../data/products.js'

export const MAX_CART_QUANTITY = 20

const validQuantity = (qty) => Number.isSafeInteger(qty) && qty > 0

export function normalizeCartLines(value) {
  if (!Array.isArray(value)) return []

  const normalized = new Map()
  for (const line of value) {
    if (!line || typeof line !== 'object' || typeof line.productId !== 'string' || typeof line.variantId !== 'string') continue
    const product = getProductById(line.productId)
    const variant = product?.variants.find((item) => item.id === line.variantId)
    if (!product || !variant || !validQuantity(line.qty) || product.stock <= 0) continue

    const key = `${product.id}:${variant.id}`
    const maxQuantity = Math.min(MAX_CART_QUANTITY, product.stock)
    const previous = normalized.get(key)?.qty ?? 0
    normalized.set(key, { productId: product.id, variantId: variant.id, qty: Math.min(maxQuantity, previous + line.qty) })
  }

  return [...normalized.values()]
}

export function calculateCartTotals(items, freeDeliveryAbove, deliveryCharge) {
  const subtotalCents = items.reduce((total, item) => total + Math.round(item.variant.price * 100) * item.qty, 0)
  const savingsCents = items.reduce((total, item) => {
    const saving = Math.max(0, item.variant.compareAtPrice - item.variant.price)
    return total + Math.round(saving * 100) * item.qty
  }, 0)
  const deliveryCents = items.length === 0 || subtotalCents >= Math.round(freeDeliveryAbove * 100)
    ? 0
    : Math.round(deliveryCharge * 100)

  return {
    subtotal: subtotalCents / 100,
    savings: savingsCents / 100,
    delivery: deliveryCents / 100,
    total: (subtotalCents + deliveryCents) / 100,
    count: items.reduce((total, item) => total + item.qty, 0),
  }
}
