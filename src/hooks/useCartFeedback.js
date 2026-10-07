import { useCallback, useEffect, useRef, useState } from 'react'

export default function useCartFeedback() {
  const [showToast, setShowToast] = useState(false)
  const timeout = useRef(null)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const notifyAdded = useCallback(() => {
    window.clearTimeout(timeout.current)
    setShowToast(true)
    timeout.current = window.setTimeout(() => setShowToast(false), 2200)
  }, [])

  return { showToast, notifyAdded }
}
