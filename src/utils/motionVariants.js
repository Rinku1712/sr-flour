export const staggerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}
