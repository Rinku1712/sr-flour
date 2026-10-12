import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { certificates } from '../data/content'

const CARD_WIDTH = 320

function getVisibleCount(width) {
  if (width >= 1200) return 4
  if (width >= 768) return 2
  return 1
}

export default function CertificateShowcase() {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const visibleCount = getVisibleCount(viewportWidth)
  const maxIndex = Math.max(0, certificates.length - visibleCount)

  const visibleCertificates = useMemo(() => {
    if (visibleCount >= certificates.length) return certificates
    return certificates.slice(activeIndex, activeIndex + visibleCount)
  }, [activeIndex, visibleCount])

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex)
  }, [activeIndex, maxIndex])

  const goToPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex))
  }

  const handleTouchStart = (event) => {
    setDragStartX(event.touches[0].clientX)
  }

  const handleTouchMove = (event) => {
    setDragOffset(event.touches[0].clientX - dragStartX)
  }

  const handleTouchEnd = () => {
    if (dragOffset > 50) goToPrev()
    if (dragOffset < -50) goToNext()
    setDragOffset(0)
    setDragStartX(0)
  }

  const renderCard = (certificate) => {
    const isExpanded = expandedId === certificate.id
    const isDisabled = !certificate.documentUrl

    return (
      <motion.article
        key={certificate.id}
        initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: certificate.rotation || 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: certificate.rotation || 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 110, damping: 18, mass: 0.8 }
        }
        whileHover={reduceMotion ? undefined : { y: -12, scale: 1.02, rotate: certificate.rotation || 0 }}
        onHoverStart={() => setExpandedId(certificate.id)}
        onHoverEnd={() => setExpandedId((current) => (current === certificate.id ? null : current))}
        onClick={() => {
          if (viewportWidth < 768) {
            setExpandedId((current) => (current === certificate.id ? null : certificate.id))
          }
        }}
        className="group relative mx-auto w-full max-w-[320px] cursor-pointer"
        style={{
          maxWidth: viewportWidth >= 1200 ? '320px' : '100%',
          transform: `translateX(${dragOffset * 0.12}px)`,
          transition: reduceMotion ? 'none' : 'transform 220ms ease'
        }}
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : isExpanded
                ? { rotateY: 8, rotateX: 4, scale: 1.04 }
                : { rotateY: 0, rotateX: 0, scale: 1 }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] border border-[#EAE3D8] bg-[#FFFDF9] p-3 shadow-[0_22px_58px_rgba(20,33,30,0.10)]"
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(184,107,75,0.08),transparent_55%)]" />
          <div className="relative overflow-hidden rounded-[22px] border border-[#E8E0D3] bg-[#F8F3EA] p-3">
            <div className="flex items-center justify-between gap-2 border-b border-[#E8E0D3] pb-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#EADFC9] bg-[#F3E9D6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-forest">
                <FileText size={12} strokeWidth={2} />
                {certificate.category}
              </div>
              <span className="rounded-full border border-[#D9E7DA] bg-[#EEF5EE] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">{certificate.status}</span>
            </div>

            <div className="relative mt-3 overflow-hidden rounded-[18px] border border-[#E7E0D5] bg-white shadow-inner">
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate preview`}
                className="aspect-[1.5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2">
                <div className="rounded-full border border-white/70 bg-[#173D2E]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                  Verified record
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-forest shadow-sm">
                  <ShieldCheck size={15} />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-bark">Certificate</p>
                  <h3 className="mt-1 text-xl font-bold leading-tight text-forest">{certificate.title}</h3>
                </div>
                <span className="mt-1 rounded-full border border-[#E9DFC9] bg-[#FAF4E8] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-bark">Label</span>
              </div>
              <p className="text-sm leading-6 text-bark">{certificate.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8E0D5] pt-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
                <CheckCircle2 size={14} className="text-[#173D2E]" />
                {certificate.issuer === 'Add issuing authority' ? 'Needs update' : 'Verified details'}
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setExpandedId((current) => (current === certificate.id ? null : certificate.id))
                }}
                className="inline-flex items-center gap-1 rounded-full border border-[#173D2E]/15 bg-[#173D2E] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F1EA]"
              >
                Details <ChevronDown size={12} className={isExpanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 mt-3 overflow-hidden rounded-[20px] border border-[#E7E0D5] bg-[#F6F0E8] p-4 shadow-[0_18px_32px_rgba(20,33,30,0.08)]"
            >
              <div className="space-y-3 text-sm text-bark">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-forest">Issuer</span>
                  <span className="text-right">{certificate.issuer}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-forest">Reference</span>
                  <span className="text-right">{certificate.certificateNumber}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-forest">Issue date</span>
                  <span className="text-right">{certificate.issueDate}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-forest">Expiry</span>
                  <span className="text-right">{certificate.expiryDate}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-forest">Status</span>
                  <span className="text-right">{certificate.status}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={certificate.documentUrl || '#'}
                  target={certificate.documentUrl ? '_blank' : undefined}
                  rel={certificate.documentUrl ? 'noreferrer' : undefined}
                  aria-disabled={!certificate.documentUrl}
                  onClick={(event) => {
                    if (!certificate.documentUrl) event.preventDefault()
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${certificate.documentUrl ? 'bg-[#173D2E] text-[#F7F3EA]' : 'cursor-not-allowed bg-[#E7E0D7] text-[#6B726B]'}`}
                >
                  <ExternalLink size={14} />
                  {certificate.documentUrl ? 'View certificate' : 'Certificate document not added yet'}
                </a>
                <a
                  href={certificate.verificationUrl || '#'}
                  target={certificate.verificationUrl ? '_blank' : undefined}
                  rel={certificate.verificationUrl ? 'noreferrer' : undefined}
                  aria-disabled={!certificate.verificationUrl}
                  onClick={(event) => {
                    if (!certificate.verificationUrl) event.preventDefault()
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${certificate.verificationUrl ? 'border-[#173D2E]/25 text-forest' : 'cursor-not-allowed border-[#E6E0D8] text-[#6B726B]'}`}
                >
                  <ShieldCheck size={14} />
                  {certificate.verificationUrl ? 'Verify' : 'Verification link not added'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    )
  }

  return (
    <section className="section relative overflow-hidden bg-[#FAF6EC]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: 'radial-gradient(circle at top, rgba(184,107,75,0.08), transparent 35%), linear-gradient(180deg, rgba(250,246,236,0.98), rgba(244,236,224,1))' }} />
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7E0D5] bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-forest shadow-sm backdrop-blur-sm">
            <ShieldCheck size={12} /> Quality & Transparency
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.04em] text-forest sm:text-5xl lg:text-[4rem]">Our Standards. Our Commitment.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-bark sm:text-lg">Transparency and quality matter. Explore our certifications and verified product documentation.</p>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <div className="mb-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous certificate"
              onClick={goToPrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9D2C0] bg-white text-forest shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {certificates.map((certificate, index) => (
                <button
                  key={certificate.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[#173D2E]' : 'w-2.5 bg-[#D7CDBD]'}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next certificate"
              onClick={goToNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9D2C0] bg-white text-forest shadow-sm"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hidden items-center justify-center gap-4 md:flex lg:hidden">
            <button type="button" aria-label="Previous certificate" onClick={goToPrev} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D9D2C0] bg-white text-forest shadow-sm"> <ArrowLeft size={18} /> </button>
            <div className="flex gap-2">{certificates.map((certificate, index) => (
              <button key={certificate.id} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[#173D2E]' : 'w-2.5 bg-[#D7CDBD]'}`} />
            ))}</div>
            <button type="button" aria-label="Next certificate" onClick={goToNext} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D9D2C0] bg-white text-forest shadow-sm"> <ArrowRight size={18} /> </button>
          </div>

          <div
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              animate={
                reduceMotion
                  ? { x: 0 }
                  : { x: -(activeIndex * (CARD_WIDTH + 24)) }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.7 }}
              className="flex gap-6 pb-2"
              style={{
                width: viewportWidth >= 1200 ? 'max-content' : '100%',
                transform: viewportWidth < 1200 ? 'translateX(0)' : undefined,
              }}
            >
              {certificates.map((certificate) => renderCard(certificate))}
            </motion.div>
          </div>

          <div className="mt-6 hidden items-center justify-center gap-2 lg:flex">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-[#173D2E]' : 'w-2.5 bg-[#D7CDBD]'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#173D2E]/10 bg-[#173D2E] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F7F2EA] transition-transform duration-200 hover:-translate-y-0.5">
            Have questions about our standards? <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
