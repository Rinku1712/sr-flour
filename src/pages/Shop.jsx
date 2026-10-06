import { useMemo, useState } from 'react'
import useTitle from '../hooks/useTitle'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { products } from '../data/products'

// Filters (weight, price, category) come in the next stage; sorting works now.
const sorters = {
  featured: () => 0,
  low: (a, b) => a.variants[0].price - b.variants[0].price,
  high: (a, b) => b.variants[0].price - a.variants[0].price,
}

export default function Shop() {
  useTitle('Shop')
  const [sort, setSort] = useState('featured')
  const list = useMemo(() => [...products].sort(sorters[sort]), [sort])
  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold">Shop</h1>
        <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-forest/20 bg-white px-4 py-2">
          <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
        </select>
      </div>
      {list.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        : <EmptyState title="No products found" text="Try changing your filters." />}
    </div>
  )
}
