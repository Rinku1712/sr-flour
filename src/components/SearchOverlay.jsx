import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../utils/format'
import PackShot from './PackShot'

function getSearchText(product) {
  return [
    product.name,
    product.shortDescription,
    product.description,
    product.category,
    ...(product.ingredients ?? []),
    ...(product.tags ?? []),
    ...(product.variants ?? []).map((variant) => variant.weight),
  ].join(' ').toLocaleLowerCase()
}

export default function SearchOverlay({ isOpen, onClose, triggerRef }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const wasOpenRef = useRef(false)
  const navigate = useNavigate()
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matches = useMemo(
    () => normalizedQuery ? products.filter((product) => getSearchText(product).includes(normalizedQuery)) : [],
    [normalizedQuery],
  )

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      inputRef.current?.focus()
      return undefined
    }
    setQuery('')
    if (wasOpenRef.current) {
      wasOpenRef.current = false
      triggerRef.current?.focus()
    }
    return undefined
  }, [isOpen, triggerRef])

  useEffect(() => {
    if (!isOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  const openBestMatch = () => {
    if (!matches.length) return
    navigate(`/product/${matches[0].id}`)
    onClose()
  }

  const trapFocus = (event) => {
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusable = [...panelRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-center bg-forest/35 px-4 pt-4 backdrop-blur-sm transition-opacity duration-300 sm:pt-[10vh] ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      aria-hidden={!isOpen}
      inert={!isOpen ? '' : undefined}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-search-title"
        onKeyDown={trapFocus}
        className={`max-h-[min(80vh,44rem)] w-full max-w-2xl overflow-hidden rounded-2xl border border-forest/10 bg-cream shadow-2xl transition-[opacity,transform] duration-300 sm:rounded-3xl ${isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-[0.98] opacity-0'} max-sm:fixed max-sm:inset-0 max-sm:max-h-none max-sm:rounded-none`}
      >
        <div className="border-b border-forest/10 p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="product-search-title" className="text-xs font-bold uppercase tracking-[0.2em] text-bark">Search Sanjay Atta</h2>
            <button type="button" onClick={onClose} aria-label="Close search" className="rounded-full p-2 transition hover:bg-cream-deep focus-visible:outline">
              <X size={20} />
            </button>
          </div>
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              openBestMatch()
            }}
            className="flex items-center gap-3 border-b-2 border-forest/25 pb-3 focus-within:border-forest"
          >
            <Search className="shrink-0 text-bark" size={21} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              aria-controls="product-search-results"
              className="min-w-0 flex-1 bg-transparent text-lg text-forest outline-none placeholder:text-bark/65 sm:text-xl"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="shrink-0 text-sm font-bold text-bark hover:text-forest">
                Clear
              </button>
            )}
          </form>
          <p className="mt-3 text-xs text-bark">Press Enter to open the best matching product</p>
        </div>

        <div id="product-search-results" className="max-h-[calc(80vh-12rem)] overflow-y-auto p-3 sm:p-5">
          {!normalizedQuery ? (
            <p className="px-3 py-8 text-center text-sm text-bark">Search by product, grain, or ingredient.</p>
          ) : matches.length ? (
            <ul className="space-y-2">
              {matches.map((product, index) => (
                <li key={product.id} style={{ animationDelay: `${index * 45}ms` }} className="search-result-enter">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-cream-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-wheat sm:p-4"
                  >
                    <PackShot product={product} className="h-16 w-16 shrink-0 rounded-xl bg-white transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{product.name}</span>
                      <span className="mt-1 block truncate text-sm text-bark">{product.shortDescription}</span>
                      <span className="mt-2 block text-sm font-bold">{formatPrice(product.variants[0].price)}</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="px-3 py-10 text-center">
              <span className="block font-display text-2xl font-bold">No products found</span>
              <span className="mt-2 block text-sm text-bark">Try another product, grain, or ingredient.</span>
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
