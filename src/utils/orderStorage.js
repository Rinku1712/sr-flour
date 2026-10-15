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
  return safeRead(ORDERS_KEY, [])
}

export function writeOrders(orders) {
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function addOrder(order) {
  const orders = readOrders()
  const next = [order, ...orders]
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
