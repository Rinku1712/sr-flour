const ORDERS_KEY = 'sr_flour_orders'
const PROFILE_KEY = 'sr_flour_profile'

const safeRead = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function readOrders() {
  const orders = safeRead(ORDERS_KEY, [])
  if (!Array.isArray(orders)) return []
  return orders.filter((order) => order
    && typeof order.id === 'string'
    && typeof order.placedAt === 'string'
    && typeof order.status === 'string'
    && order.verifiedByOrderService === true
    && Array.isArray(order.items)
    && Number.isFinite(order.subtotal)
    && Number.isFinite(order.savings)
    && Number.isFinite(order.delivery)
    && Number.isFinite(order.total))
}

export function writeOrders(orders) {
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function addOrder(order) {
  const orders = readOrders()
  const next = [order, ...orders.filter((entry) => entry.id !== order.id)]
  writeOrders(next)
  return next
}

export function readProfile() {
  return {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    note: '',
    ...safeRead(PROFILE_KEY, {}),
  }
}

export function saveProfile(profile) {
  const next = { ...readProfile(), ...profile }
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  return next
}
