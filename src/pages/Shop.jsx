import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useTitle from '../hooks/useTitle';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { products } from '../data/products';
import { staggerReveal } from '../utils/motionVariants';

// Filters (weight, price, category) come in the next stage; sorting works now.
const sorters = {
  featured: () => 0,
  low: (a, b) => a.variants[0].price - b.variants[0].price,
  high: (a, b) => b.variants[0].price - a.variants[0].price,
};

export default function Shop() {
  useTitle('Shop');
  const reduceMotion = useReducedMotion();
  const [sort, setSort] = useState('featured');
  const list = useMemo(() => [...products].sort(sorters[sort]), [sort]);
  return (
    <div className="container-page scroll-reveal py-10 sm:py-14">
      <div className="mb-10 flex flex-col gap-6 border-b border-forest/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">
            Thoughtful grains, made for home
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Shop Sanjay Atta</h1>
          <p className="mt-3 max-w-xl leading-7 text-bark">
            Explore our multigrain atta, made for the everyday meals you know and love.
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm font-bold">
          <span className="shrink-0">Sort by</span>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-forest/15 bg-white px-4 text-forest outline-none transition focus:border-forest sm:w-auto"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>
      {list.length ? (
        <>
          <p className="mb-5 text-sm text-bark">
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </p>
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={reduceMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerReveal}
          >
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </>
      ) : (
        <EmptyState title="No products found" text="Try changing your filters." />
      )}
    </div>
  );
}
