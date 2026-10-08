import { useCallback } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const spring = { stiffness: 180, damping: 22, mass: 0.35 }

export default function TiltCard({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), spring)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), spring)

  const handlePointerMove = useCallback((event) => {
    if (reduceMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left - bounds.width / 2) / bounds.width)))
    pointerY.set(Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top - bounds.height / 2) / bounds.height)))
  }, [pointerX, pointerY, reduceMotion])

  const resetTilt = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        className="h-full w-full"
        style={reduceMotion ? { transformStyle: 'preserve-3d' } : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        whileHover={reduceMotion ? undefined : { scale: 1.015 }}
        transition={spring}
      >
        <div className="h-full w-full" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
