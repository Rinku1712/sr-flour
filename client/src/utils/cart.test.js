import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../data/products.js'
import { calculateCartTotals, MAX_CART_QUANTITY, normalizeCartLines } from './cart.js'

const product = products[0]
const variant = product.variants[0]

test('cart normalization rejects malformed, unknown, and non-positive quantities', () => {
  assert.deepEqual(normalizeCartLines([
    null,
    { productId: product.id, variantId: variant.id, qty: 0 },
    { productId: product.id, variantId: variant.id, qty: -1 },
    { productId: product.id, variantId: variant.id, qty: 1.5 },
    { productId: product.id, variantId: variant.id, qty: '2' },
    { productId: 'missing', variantId: variant.id, qty: 1 },
    { productId: product.id, variantId: 'missing', qty: 1 },
  ]), [])
})

test('cart normalization merges duplicate variants and enforces the supported maximum', () => {
  assert.deepEqual(normalizeCartLines([
    { productId: product.id, variantId: variant.id, qty: 12 },
    { productId: product.id, variantId: variant.id, qty: 12 },
  ]), [{ productId: product.id, variantId: variant.id, qty: MAX_CART_QUANTITY }])
})

test('cart totals use integer cents and apply free-delivery threshold consistently', () => {
  const items = [{ product, variant, qty: 3 }]
  assert.deepEqual(calculateCartTotals(items, 499, 49), {
    subtotal: 387,
    savings: 60,
    delivery: 49,
    total: 436,
    count: 3,
  })
  assert.equal(calculateCartTotals([{ product, variant: product.variants[1], qty: 1 }], 499, 49).delivery, 0)
  assert.deepEqual(calculateCartTotals([], 499, 49), {
    subtotal: 0,
    savings: 0,
    delivery: 0,
    total: 0,
    count: 0,
  })
})
