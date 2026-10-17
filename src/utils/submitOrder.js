function isNonNegativeAmount(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export function isAcceptedOrder(value, expectedItems) {
  if (!value || typeof value !== 'object') return false
  const { id, placedAt, status, customer, items, subtotal, savings, delivery, total } = value
  const hasValidCustomer = customer && typeof customer === 'object' && !Array.isArray(customer)
    && ['name', 'email', 'address', 'city', 'state', 'postalCode'].every((key) => isNonEmptyString(customer[key]))
    && (customer.phone === undefined || typeof customer.phone === 'string')
  const hasValidItems = Array.isArray(items) && items.length > 0
    && items.every((item) => item
      && typeof item.productId === 'string'
      && typeof item.variantId === 'string'
      && isNonEmptyString(item.name)
      && isNonEmptyString(item.weight)
      && Number.isSafeInteger(item.qty) && item.qty > 0
      && isNonNegativeAmount(item.price))
  const matchesRequest = expectedItems === undefined
    || (Array.isArray(expectedItems)
      && expectedItems.length === items?.length
      && expectedItems.every((item) => items.some((accepted) => accepted.productId === item.productId
        && accepted.variantId === item.variantId
        && accepted.qty === item.qty)))

  return isNonEmptyString(id)
    && typeof placedAt === 'string' && Number.isFinite(Date.parse(placedAt))
    && isNonEmptyString(status)
    && hasValidCustomer
    && hasValidItems
    && matchesRequest
    && [subtotal, savings, delivery, total].every(isNonNegativeAmount)
}

const REQUEST_KEY_STORAGE = 'sr_flour_order_request'

export async function getOrderRequestKey(payload, previous) {
  const serialized = JSON.stringify(payload)
  let fingerprint = serialized
  let canPersist = false

  if (globalThis.crypto?.subtle && typeof TextEncoder !== 'undefined') {
    const bytes = new TextEncoder().encode(serialized)
    const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes)
    fingerprint = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
    canPersist = true
  }

  if (previous?.fingerprint === fingerprint) return previous

  if (canPersist) {
    try {
      const saved = JSON.parse(globalThis.sessionStorage?.getItem(REQUEST_KEY_STORAGE) || 'null')
      if (saved?.fingerprint === fingerprint && isNonEmptyString(saved.key)) return saved
    } catch {
      canPersist = false
    }
  }

  if (!globalThis.crypto?.randomUUID) {
    throw new Error('This browser cannot safely create an order request. Please update your browser and try again.')
  }

  const identity = { fingerprint, key: globalThis.crypto.randomUUID() }
  if (canPersist) {
    try {
      globalThis.sessionStorage?.setItem(REQUEST_KEY_STORAGE, JSON.stringify(identity))
    } catch {
      // The request still uses an idempotency key for retries in this page session.
    }
  }
  return identity
}

export function clearOrderRequestKey() {
  try {
    globalThis.sessionStorage?.removeItem(REQUEST_KEY_STORAGE)
  } catch {
    // The next payload fingerprint will not reuse a key for a different order.
  }
}

export default async function submitOrder(endpoint, payload, idempotencyKey) {
  if (!endpoint) throw new Error('Online ordering is not configured yet. Please contact SR Flour before submitting your order.')

  let response
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch {
    throw new Error('We could not verify whether the order service accepted your request. Retrying uses the same request key; contact SR Flour if you are unsure.')
  } finally {
    clearTimeout(timeout)
  }

  if (!response.ok) {
    throw new Error(`The order service did not confirm your request (HTTP ${response.status}). Retrying uses the same request key; contact SR Flour if you are unsure.`)
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The order service returned an invalid response. Your order status could not be verified; please contact SR Flour before retrying.')
  }

  if (!isAcceptedOrder(result?.order, payload.items)) {
    throw new Error('The order service returned an incomplete confirmation. Your order status could not be verified; please contact SR Flour before retrying.')
  }

  return result.order
}
