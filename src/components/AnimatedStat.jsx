import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

const easeOutExpo = (progress) => (progress === 1 ? 1 : 1 - (2 ** (-10 * progress)))

export default function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!isInView) return undefined
    if (reduceMotion) {
      count.set(value)
      return undefined
    }
    const controls = animate(count, value, { duration: 1.4, ease: easeOutExpo })
    return () => controls.stop()
  }, [count, isInView, reduceMotion, value])

  return (
    <div ref={ref} className="inline-flex items-baseline gap-2 rounded-2xl border border-[#E7E5E0] bg-cream-deep/70 px-4 py-3">
      <motion.span className="inline-block w-[2ch] text-right font-display text-2xl font-bold tabular-nums text-forest">{rounded}</motion.span>
      <span className="text-xs font-bold uppercase tracking-wider text-bark">{label}</span>
    </div>
  )
}
