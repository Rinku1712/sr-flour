import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Wheat } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import useTitle from '../hooks/useTitle'
import Button from '../components/Button'
import AnimatedStat from '../components/AnimatedStat'
import PackShot from '../components/PackShot'
import { products } from '../data/products'
import { revealItem, staggerReveal } from '../utils/motionVariants'

const product = products[0]

const pillars = [
  {
    number: '01',
    title: 'A thoughtful grain blend',
    text: 'The current ingredient list includes wheat, oats, chickpea, millets and seeds. Final recipe details will be confirmed before launch.',
    accent: 'text-wheat',
  },
  {
    number: '02',
    title: 'Nutrition, without guesswork',
    text: 'We will publish verified nutrition information once product testing is complete, rather than guess at figures while the recipe is being finalized.',
    accent: 'text-protein',
  },
  {
    number: '03',
    title: 'Made for everyday meals',
    text: 'A multigrain atta designed for familiar home cooking, from soft rotis to the meals already on your family table.',
    accent: 'text-forest',
  },
]

const details = [
  { value: '5', label: 'ingredient groups listed', numeric: true },
  { value: 'Pending', label: 'verified nutrition values' },
  { value: 'Pending', label: 'final recipe details' },
  { value: 'Everyday', label: 'meals we are made for' },
]

function GrainRail({ ingredients }) {
  const viewportRef = useRef(null)
  const [canDrag, setCanDrag] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const updateDrag = () => setCanDrag(viewport.scrollWidth > viewport.clientWidth + 1)
    updateDrag()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateDrag)
      return () => window.removeEventListener('resize', updateDrag)
    }
    const observer = new ResizeObserver(updateDrag)
    observer.observe(viewport)
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild)
    return () => observer.disconnect()
  }, [ingredients.length])

  return (
    <div ref={viewportRef} tabIndex={0} className="overflow-x-auto" aria-label="Ingredient groups">
      <motion.ul
        drag={canDrag && !reduceMotion ? 'x' : false}
        dragConstraints={viewportRef}
        dragElastic={0.12}
        dragMomentum
        className="flex w-max touch-pan-y gap-3 py-2"
        aria-label="Swipe to explore the currently listed ingredient groups"
      >
        {ingredients.map((ingredient) => (
          <motion.li
            key={ingredient}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#E7E5E0] bg-white px-5 text-sm font-bold text-forest shadow-sm"
          >
            <Wheat aria-hidden="true" size={16} className="text-wheat" />
            {ingredient}
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-2 text-xs text-bark md:hidden">Swipe to explore listed ingredients</p>
    </div>
  )
}

function StatusDetail({ value, label }) {
  const isPending = value === 'Pending'
  return (
    <div className="flex min-h-28 flex-col justify-center rounded-2xl border border-[#E7E5E0] bg-white p-4 shadow-sm">
      <span className={`font-display text-xl font-bold ${isPending ? 'text-bark' : 'text-forest'}`}>{value}</span>
      <span className="mt-1 text-xs font-semibold leading-5 text-bark">{label}</span>
    </div>
  )
}

export default function About() {
  useTitle('Our Story')
  const reduceMotion = useReducedMotion()

  return (
    <div className="overflow-hidden bg-cream text-forest">
      <section className="relative isolate border-b border-[#E7E5E0]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_42%,rgba(184,134,11,0.10),transparent_38%)]" />
        <div className="container-page flex flex-col items-center gap-8 px-4 py-14 sm:px-6 sm:py-20 md:flex-row md:gap-12 lg:px-8 lg:py-24">
          <motion.div
            className="w-full md:w-3/5"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerReveal}
          >
            <motion.p variants={revealItem} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat">
              The Sanjay Atta story
            </motion.p>
            <motion.h1 variants={revealItem} className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Crafted for Vitality, <span className="font-display font-medium italic text-forest-light">with Integrity</span>
            </motion.h1>
            <motion.p variants={revealItem} className="mt-6 max-w-2xl text-base leading-8 text-bark sm:text-lg">
              We are creating a multigrain atta for the everyday food families already love. We believe in being clear about what goes into each pack—and equally clear about what is still being finalized.
            </motion.p>
            <motion.p variants={revealItem} className="mt-4 max-w-2xl text-sm leading-7 text-bark">
              Our current product information lists wheat, oats, chickpea, millets and seeds. Final sourcing, recipe, milling and nutrition details will be shared after they are verified.
            </motion.p>
            <motion.div variants={revealItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" variant="primary" className="w-full sm:w-auto">Taste The Difference <ArrowRight size={17} className="button-arrow" /></Button>
              <a href="#our-grains" className="button-motion inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-forest/25 px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-forest hover:text-cream sm:w-auto">
                Explore Listed Ingredients
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full max-w-md md:w-2/5"
            initial={reduceMotion ? false : { opacity: 0, y: 35, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="rounded-[2rem] border border-[#E7E5E0] bg-white p-4 shadow-md sm:p-7">
              <PackShot product={product} className="aspect-square w-full rounded-2xl bg-cream-deep/60" />
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-bark">Thoughtful grains for everyday meals</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-page px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-label="Product information status">
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          initial={reduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerReveal}
        >
          {details.map((detail) => (
            <motion.div key={detail.label} variants={revealItem}>
              {detail.numeric
                ? <AnimatedStat value={Number(detail.value)} label={detail.label} className="flex min-h-28 w-full flex-col items-start justify-center gap-1 rounded-2xl px-4 py-4 shadow-sm" />
                : <StatusDetail value={detail.value} label={detail.label} />}
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="our-grains" className="border-y border-[#E7E5E0] bg-white py-14 sm:py-20">
        <div className="container-page px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerReveal}
          >
            <motion.p variants={revealItem} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-wheat">Ingredients currently listed</motion.p>
            <motion.h2 variants={revealItem} className="text-3xl font-bold tracking-tight sm:text-4xl">A closer look at the blend.</motion.h2>
            <motion.p variants={revealItem} className="mt-3 leading-7 text-bark">
              These are the ingredient groups in the current product information. The final ingredient list and proportions will be confirmed before launch.
            </motion.p>
          </motion.div>
          <div className="mt-7">
            <GrainRail ingredients={product.ingredients} />
          </div>
        </div>
      </section>

      <section className="container-page px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          className="mb-8 max-w-2xl"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerReveal}
        >
          <motion.p variants={revealItem} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-protein">Our principles</motion.p>
          <motion.h2 variants={revealItem} className="text-3xl font-bold tracking-tight sm:text-4xl">Good food starts with honest details.</motion.h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          initial={reduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerReveal}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.number}
              variants={revealItem}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="rounded-3xl border border-[#E7E5E0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
            >
              <span className={`font-display text-sm font-bold ${pillar.accent}`}>{pillar.number}</span>
              <h3 className="mt-4 text-xl font-bold text-forest">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-bark">{pillar.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-[#E7E5E0] bg-cream-deep/60 py-14 sm:py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-wheat">Made for the everyday</p>
            <h2 className="mt-2 text-3xl font-bold">Bring a little more thought to your table.</h2>
          </div>
          <Button to="/shop" variant="primary" className="w-full md:w-auto">Shop Sanjay Atta <ArrowRight size={17} className="button-arrow" /></Button>
        </div>
      </section>
    </div>
  )
}
