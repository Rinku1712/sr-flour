import test from 'node:test'
import assert from 'node:assert/strict'
import { clearOrderRequestKey, getOrderRequestKey, isAcceptedOrder } from './submitOrder.js'

const validOrder = {
  id: 'SR-1234',
  placedAt: '2026-10-17T10:00:00.000Z',
  status: 'Received',
  customer: { name: 'Test Customer', email: 'test@example.com', address: '1 Test Road', city: 'Pune', state: 'Maharashtra', postalCode: '411001' },
  items: [{ productId: 'atta', variantId: '1kg', name: 'Atta', weight: '1 kg', qty: 1, price: 129 }],
  subtotal: 129,
  savings: 20,
  delivery: 49,
  total: 178,
}

test('order confirmation requires a complete server order response', () => {
  assert.equal(isAcceptedOrder(validOrder), true)
  assert.equal(isAcceptedOrder({ ...validOrder, total: NaN }), false)
  assert.equal(isAcceptedOrder({ ...validOrder, items: [] }), false)
  assert.equal(isAcceptedOrder({ ...validOrder, placedAt: 'not a date' }), false)
  assert.equal(isAcceptedOrder(validOrder, [{ productId: 'atta', variantId: '5kg', qty: 1 }]), false)
})

test('order submission sends identifiers and quantities with an idempotency key', async (context) => {
  const originalFetch = globalThis.fetch
  context.after(() => { globalThis.fetch = originalFetch })
  let request
  globalThis.fetch = async (endpoint, options) => {
    request = { endpoint, options }
    return { ok: true, json: async () => ({ order: validOrder }) }
  }

  const { default: submitOrder } = await import('./submitOrder.js')
  const payload = {
    paymentMethod: 'cash_on_delivery',
    customer: validOrder.customer,
    items: [{ productId: 'atta', variantId: '1kg', qty: 1 }],
  }
  assert.deepEqual(await submitOrder('/orders', payload, 'stable-retry-key'), validOrder)
  assert.equal(request.options.headers['Idempotency-Key'], 'stable-retry-key')
  assert.equal(request.options.body, JSON.stringify(payload))
  assert.equal(JSON.stringify(request.options.body).includes('"price"'), false)
})

test('order submission does not accept an HTTP success with an invalid body', async (context) => {
  const originalFetch = globalThis.fetch
  context.after(() => { globalThis.fetch = originalFetch })
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ message: 'accepted' }) })

  const { default: submitOrder } = await import('./submitOrder.js')
  await assert.rejects(
    submitOrder('/orders', {}, 'stable-retry-key'),
    /incomplete confirmation/,
  )
})

test('order submission rejects unsuccessful HTTP responses', async (context) => {
  const originalFetch = globalThis.fetch
  context.after(() => { globalThis.fetch = originalFetch })
  globalThis.fetch = async () => ({ ok: false, status: 503 })

  const { default: submitOrder } = await import('./submitOrder.js')
  await assert.rejects(
    submitOrder('/orders', {}, 'stable-retry-key'),
    /HTTP 503/,
  )
})

test('order request idempotency keys survive retries and change when the payload changes', async (context) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')
  const values = new Map()
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
      removeItem: (key) => values.delete(key),
    },
  })
  context.after(() => {
    if (originalDescriptor) Object.defineProperty(globalThis, 'sessionStorage', originalDescriptor)
    else delete globalThis.sessionStorage
  })

  const first = await getOrderRequestKey(validOrder, null)
  const retry = await getOrderRequestKey(validOrder, null)
  const changed = await getOrderRequestKey({ ...validOrder, total: 179 }, null)

  assert.equal(retry.key, first.key)
  assert.notEqual(changed.key, first.key)
  clearOrderRequestKey()
  assert.equal(values.size, 0)
})
