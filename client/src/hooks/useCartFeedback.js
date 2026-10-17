import { useCallback, useEffect, useRef, useState } from 'react'
import { showSwalToast } from '../utils/sweetAlert'

export default function useCartFeedback() {
  const [showToast, setShowToast] = useState(false)
  const timeout = useRef(null)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const notifyAdded = useCallback(() => {
    window.clearTimeout(timeout.current)
    setShowToast(true)
    showSwalToast('Added to cart', 'Your item is ready for checkout.')
    timeout.current = window.setTimeout(() => setShowToast(false), 2200)
  }, [])

  return { showToast, notifyAdded }
}
