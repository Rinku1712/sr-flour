import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Truck } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import { getProductById } from '../data/products'
import { faqs } from '../data/content'
import PackShot from '../components/PackShot'
import ProductBuy from '../components/ProductBuy'
import FAQItem from '../components/FAQItem'
import NotFound from './NotFound'

const tabs = ['Description', 'Ingredients', 'Nutrition', 'How to Use', 'FAQs']

function List({ items, ordered }) {
  const Tag = ordered ? 'ol' : 'ul'
  return <Tag className={`space-y-2 pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}>{items.map((i) => <li key={i}>{i}</li>)}</Tag>
}

function TabContent({ tab, product }) {
  if (tab === 'Description') return <><p className="mb-3">{product.description}</p><List items={product.benefits} /></>
  if (tab === 'Ingredients') return <><List items={product.ingredients} /><p className="mt-3 text-sm">Exact proportions will be added after testing.</p></>
  if (tab === 'Nutrition') return (
    <>
      <table className="w-full max-w-sm text-left"><tbody>{product.nutrition.rows.map(([k, v]) => <tr key={k} className="border-b border-forest/10"><th className="py-2 font-medium">{k}</th><td>{v}</td></tr>)}</tbody></table>
      <p className="mt-3 text-sm">{product.nutrition.note}</p>
    </>
  )
  if (tab === 'How to Use') return <List items={product.howToUse} ordered />
  return <div className="space-y-3">{faqs.slice(0, 4).map((f) => <FAQItem key={f.q} faq={f} />)}</div>
}

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const [tab, setTab] = useState(tabs[0])
  useTitle(product?.name)
  if (!product) return <NotFound />
  return (
    <div className="container-page scroll-reveal py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <PackShot product={product} className="scroll-reveal-scale product-image aspect-square w-full rounded-[2rem] bg-cream-deep" />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="flex items-center gap-1 text-sm"><Star size={16} className="fill-wheat text-wheat" /> {product.rating} <span className="text-bark">(demo rating)</span></p>
          <ProductBuy product={product} />
          <p className="text-sm text-bark">Pairs well with everyday Indian meals.</p>
          <p className="flex items-center gap-2 rounded-2xl bg-cream-deep p-4 text-sm"><Truck size={18} /> Delivery availability will be confirmed at checkout.</p>
        </div>
      </div>
      <div className="mt-12">
        <div role="tablist" className="flex gap-2 overflow-x-auto border-b border-forest/10 pb-2">
          {tabs.map((t) => <button key={t} role="tab" aria-selected={t === tab} onClick={() => setTab(t)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${t === tab ? 'bg-forest text-cream' : 'hover:bg-cream-deep'}`}>{t}</button>)}
        </div>
        <div role="tabpanel" className="scroll-reveal py-6 text-bark"><TabContent tab={tab} product={product} /></div>
      </div>
    </div>
  )
}
