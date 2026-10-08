import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const styles = {
  primary: 'bg-protein text-black hover:brightness-110',
  gold: 'bg-wheat text-forest hover:brightness-105',
  outline: 'border-2 border-forest/25 text-forest hover:bg-forest hover:text-cream',
}
const MotionLink = motion.create(Link)

// Renders a <Link> when `to` is given, otherwise a <button>.
export default function Button({ variant = 'primary', to, className = '', children, ...props }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.25 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.25 })
  const cls = `button-motion group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`
  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const deltaX = event.clientX - (rect.left + rect.width / 2)
    const deltaY = event.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(deltaX, deltaY)
    const strength = Math.max(0, 1 - distance / 40)
    x.set(deltaX * strength * 0.12)
    y.set(deltaY * strength * 0.12)
  }
  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }
  const motionProps = {
    ref,
    style: reduceMotion ? undefined : { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    whileHover: reduceMotion ? undefined : { filter: 'brightness(1.04)' },
    whileTap: reduceMotion ? undefined : { scale: 0.98 },
    className: cls,
    ...props,
  }
  const content = <span className="relative z-[1] inline-flex items-center justify-center gap-2">{children}</span>

  return to
    ? <MotionLink to={to} {...motionProps}>{content}</MotionLink>
    : <motion.button type="button" {...motionProps}>{content}</motion.button>
}
