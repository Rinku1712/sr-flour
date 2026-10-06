import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import useTitle from '../hooks/useTitle'
import Button from '../components/Button'
import PackShot from '../components/PackShot'
import ProductBuy from '../components/ProductBuy'
import ReviewCard from '../components/ReviewCard'
import FAQItem from '../components/FAQItem'
import { products } from '../data/products'
import { features, dayPlan, reviews, faqs } from '../data/content'

const product = products[0]

export default function Home() {
  useTitle('')
  return (
    <>
      <section className="bg-cream-deep">
        <div className="container-page grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">Better Grains. Better Everyday.</h1>
            <p className="mt-4 max-w-md text-lg text-bark">Wholesome multigrain nutrition made for the roti you already love.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" variant="gold">Shop Now</Button>
              <Button to="/about" variant="outline">Why Sanjay Atta?</Button>
            </div>
          </div>
          <PackShot product={product} className="aspect-square w-full rounded-[2rem] bg-cream" />
        </div>
      </section>

      <section className="section container-page">
        <h2 className="mb-8 text-3xl font-bold">Why Sanjay Atta?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = Icons[f.icon]
            return (
              <div key={f.title} className="card p-6">
                <Icon className="mb-3 text-wheat" size={28} />
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-bark">{f.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section bg-forest text-cream">
        <div className="container-page grid items-center gap-8 md:grid-cols-2">
          <PackShot product={product} className="aspect-square w-full rounded-[2rem] bg-cream/10" />
          <div className="rounded-3xl bg-cream p-6 text-forest sm:p-8">
            <h2 className="text-3xl font-bold">Sanjay Atta</h2>
            <p className="mb-5 text-bark">{product.name}</p>
            <ProductBuy product={product} />
            <Link to={`/product/${product.id}`} className="mt-4 inline-block text-sm font-bold underline">View full details</Link>
          </div>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="text-3xl font-bold">What's inside?</h2>
        <p className="mb-8 mt-2 text-bark">Final recipe and exact proportions will be confirmed after product testing.</p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {product.ingredients.map((i) => (
            <li key={i} className="card flex flex-col items-center gap-2 p-5 text-center font-bold"><Icons.Wheat className="text-wheat" />{i}</li>
          ))}
        </ul>
      </section>

      <section className="section bg-cream-deep">
        <div className="container-page">
          <h2 className="mb-8 text-3xl font-bold">How it fits your day</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dayPlan.map((d) => (
              <li key={d.time} className="card p-6">
                <p className="text-sm text-bark">{d.time}</p>
                <p className="font-display text-2xl font-bold">{d.meal}</p>
                <p className="mt-2 text-sm text-bark">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="text-3xl font-bold">Customer reviews</h2>
        <p className="mb-8 mt-2 text-sm text-bark">Demo content. Real reviews will replace these after launch.</p>
        <div className="grid gap-4 md:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.name} review={r} />)}</div>
      </section>

      <section className="section container-page max-w-3xl">
        <h2 className="mb-6 text-3xl font-bold">Questions, answered</h2>
        <div className="space-y-3">{faqs.slice(0, 4).map((f) => <FAQItem key={f.q} faq={f} />)}</div>
        <Link to="/faq" className="mt-5 inline-block font-bold underline">View all FAQs</Link>
      </section>

      <section className="bg-forest py-16 text-center text-cream">
        <div className="container-page">
          <h2 className="text-3xl font-bold sm:text-4xl">Make your everyday roti a little better.</h2>
          <Button to="/shop" variant="gold" className="mt-6">Shop Sanjay Atta</Button>
        </div>
      </section>
    </>
  )
}
