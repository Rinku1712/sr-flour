import { useEffect, useRef } from 'react'

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  '[role="button"]',
  '.button-motion',
  '.product-card',
  '.editorial-link',
  '.footer-link'
].join(', ')

export default function CursorFollower() {
  const cursorRef = useRef(null)
  const pointer = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    visible: false,
    hovering: false,
    pressed: false
  })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const cursor = cursorRef.current
    if (!cursor) return undefined

    let animationFrame = 0

    const render = () => {
      const { currentX, currentY, targetX, targetY } = pointer.current
      pointer.current.currentX += (targetX - currentX) * 0.18
      pointer.current.currentY += (targetY - currentY) * 0.18

      cursor.style.transform = `translate(${pointer.current.currentX}px, ${pointer.current.currentY}px)`
      cursor.classList.toggle('is-visible', pointer.current.visible)
      cursor.classList.toggle('is-hovering', pointer.current.hovering)
      cursor.classList.toggle('is-pressed', pointer.current.pressed)
      animationFrame = window.requestAnimationFrame(render)
    }

    const updatePosition = (event) => {
      pointer.current.targetX = event.clientX
      pointer.current.targetY = event.clientY
      pointer.current.visible = true
    }

    const updateHoverState = (event) => {
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null
      pointer.current.hovering = Boolean(target)
    }

    const handlePointerLeave = () => {
      pointer.current.visible = false
      pointer.current.hovering = false
      pointer.current.pressed = false
    }

    const handlePointerDown = () => {
      pointer.current.pressed = true
    }

    const handlePointerUp = () => {
      pointer.current.pressed = false
    }

    document.body.classList.add('has-custom-cursor')
    window.addEventListener('pointermove', updatePosition)
    window.addEventListener('pointerover', updateHoverState)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)

    animationFrame = window.requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', updatePosition)
      window.removeEventListener('pointerover', updateHoverState)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <div ref={cursorRef} aria-hidden="true" className="cursor-follower">
      <span className="cursor-follower__ring" />
      <span className="cursor-follower__dot" />
    </div>
  )
}
