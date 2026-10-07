import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ArrowDown, ArrowRight, Sparkles, Star } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import Button from '../components/Button'
import PackShot from '../components/PackShot'
import ProductBuy from '../components/ProductBuy'
import FAQItem from '../components/FAQItem'
import { products } from '../data/products'
import { features, dayPlan, reviews, faqs } from '../data/content'

const product = products[0]

export default function Home() {
  useTitle('')
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-deep">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 -z-10 h-80 w-80 rounded-full bg-wheat/15 blur-3xl" />
        <div className="container-page grid items-center gap-8 py-12 sm:py-16 md:grid-cols-2 md:gap-12 md:py-20">
          <div>
            <span className="hero-item hero-item-1 mb-5 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest">
              <Sparkles size={14} className="text-wheat" /> Everyday nutrition <span aria-hidden="true">·</span> Made in India
            </span>
            <h1 className="hero-item hero-item-2 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              <span className="block">Better Grains.</span>
              <span className="mt-1 block font-display font-medium italic text-forest-light">Better Everyday.</span>
            </h1>
            <p className="hero-item hero-item-3 mt-4 max-w-md text-lg text-bark">Wholesome multigrain nutrition made for the roti you already love.</p>
            <div className="hero-item hero-item-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" variant="gold">Shop Now</Button>
              <Button to="/about" variant="outline">Our Story</Button>
            </div>
            <p className="hero-item hero-item-4 mt-5 text-sm text-bark">Made for everyday Indian meals</p>
          </div>
          <div className="hero-product relative mx-auto w-full max-w-xl">
            <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-wheat/15 blur-2xl" />
            <div aria-hidden="true" className="absolute inset-[15%] rounded-full border border-wheat/20" />
            <div aria-hidden="true" className="hero-grain absolute left-[7%] top-[18%] text-wheat/70"><Icons.Wheat size={34} strokeWidth={1.2} /></div>
            <div aria-hidden="true" className="hero-grain hero-grain-delay absolute bottom-[16%] right-[8%] rotate-45 text-wheat/60"><Icons.Wheat size={28} strokeWidth={1.2} /></div>
            <div className="hero-float">
              <PackShot product={product} className="hero-art relative aspect-square w-full drop-shadow-[0_22px_28px_rgba(75,29,36,0.12)]" />
            </div>
            <div className="hero-badge absolute bottom-[12%] left-0 rounded-2xl border border-forest/10 bg-cream/95 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-forest shadow-soft sm:bottom-[16%] sm:left-[2%]">
              <span className="block">High Protein</span>
              <span className="mt-1 block text-wheat">Multigrain</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Product highlights" className="border-b border-forest/10 bg-cream">
        <div className="container-page grid grid-cols-2 gap-4 py-5 sm:grid-cols-4 sm:gap-6 sm:py-6">
          {[
            [Icons.Wheat, 'Multigrain blend'],
            [Icons.Soup, 'Everyday meals'],
            [Icons.Leaf, 'Ingredient transparency'],
            [Icons.PackageCheck, 'Delivery options at checkout'],
          ].map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-2 text-xs font-bold text-forest sm:justify-center sm:gap-3 sm:text-sm">
              <Icon size={19} className="shrink-0 text-wheat" strokeWidth={1.7} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-page scroll-reveal">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="max-w-md">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">Thoughtfully made for everyday</p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Simple food.<br /><span className="font-display font-medium italic text-forest-light">Thoughtfully made.</span></h2>
          </div>
          <div className="divide-y divide-forest/10 scroll-reveal-stagger">
          {features.map((f) => {
            const Icon = Icons[f.icon]
            return (
              <article key={f.title} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-5 transition-colors hover:bg-cream-deep/60 sm:grid-cols-[4rem_1fr_auto] sm:px-4">
                <span className="font-display text-sm text-bark transition-transform duration-200 group-hover:translate-x-1">0{features.indexOf(f) + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-bark">{f.text}</p>
                </div>
                <Icon className="text-wheat transition-transform duration-200 group-hover:translate-x-1" size={21} strokeWidth={1.7} aria-hidden="true" />
              </article>
            )
          })}
          </div>
        </div>
      </section>

      <section className="section scroll-reveal scroll-reveal-right bg-forest text-cream">
        <div className="container-page">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-wheat-light">Our signature product</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">High Protein<br />Multigrain Atta</h2>
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className="relative mx-auto w-full max-w-lg">
              <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-wheat/10 blur-3xl" />
              <PackShot product={product} className="scroll-reveal-scale product-image relative aspect-square w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]" />
            </div>
            <div className="rounded-3xl bg-cream p-6 text-forest shadow-soft sm:p-8">
              <h2 className="text-3xl font-bold">Sanjay Atta</h2>
              <p className="mb-5 text-bark">{product.name}</p>
              <p className="mb-5 flex items-center gap-2 text-sm font-bold" aria-label={`Demo rating: ${product.rating} out of 5`}>
                <Star size={16} className="fill-wheat text-wheat" aria-hidden="true" />
                {product.rating} <span className="font-normal text-bark">Demo rating</span>
              </p>
              <ProductBuy product={product} />
              <Link to={`/product/${product.id}`} className="mt-4 inline-block text-sm font-bold underline">View Product</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section scroll-reveal bg-cream">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">Thoughtful ingredients</p>
            <h2 className="text-3xl font-bold sm:text-4xl">What's inside matters.</h2>
            <p className="mt-3 text-sm text-bark">Final recipe and exact proportions will be confirmed after product testing.</p>
          </div>
          <div className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-[1fr_1.2fr_1fr]">
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-1 scroll-reveal-stagger">
              {product.ingredients.slice(0, 2).map((ingredient) => (
                <li key={ingredient} className="group flex items-center gap-3 border-b border-forest/10 py-4 transition-colors hover:bg-cream-deep/60">
                  <span className="rounded-full bg-cream-deep p-2"><Icons.Wheat size={17} className="text-wheat transition-transform group-hover:scale-110" aria-hidden="true" /></span>
                  <span className="text-sm font-bold uppercase tracking-wider">{ingredient}</span>
                </li>
              ))}
            </ul>
            <div className="relative mx-auto w-full max-w-xs">
              <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-wheat/15 blur-2xl" />
              <div className="relative rounded-full border border-wheat/25 bg-cream-deep/50 p-5">
                <PackShot product={product} className="aspect-square w-full drop-shadow-[0_16px_24px_rgba(75,29,36,0.15)]" />
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-3 md:grid-cols-1 scroll-reveal-stagger">
              {product.ingredients.slice(2).map((ingredient) => (
                <li key={ingredient} className="group flex items-center gap-3 border-b border-forest/10 py-4 transition-colors hover:bg-cream-deep/60">
                  <span className="rounded-full bg-cream-deep p-2"><Icons.Wheat size={17} className="text-wheat transition-transform group-hover:scale-110" aria-hidden="true" /></span>
                  <span className="text-sm font-bold uppercase tracking-wider">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section scroll-reveal border-y border-forest/10 bg-cream-deep text-center">
        <div className="container-page">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-bark">A little more intention in every meal</p>
          <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">One everyday staple.<br /><span className="font-display font-medium italic text-forest-light">A more thoughtful choice.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-bark">Because everyday meals can stay familiar.</p>
        </div>
      </section>

      <section className="section scroll-reveal bg-cream-deep">
        <div className="container-page">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm text-bark">From morning to night</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One everyday staple.<br className="hidden sm:block" /> Many everyday meals.</h2>
            </div>
            <ArrowDown size={22} className="mb-1 hidden text-wheat sm:block" aria-hidden="true" />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 scroll-reveal-stagger">
            {dayPlan.map((d) => (
              <li key={d.time} className="card p-6 transition-transform duration-300 hover:-translate-y-1">
                <p className="text-sm text-bark">{d.time}</p>
                <p className="font-display text-2xl font-bold">{d.meal}</p>
                <p className="mt-2 text-sm text-bark">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container-page scroll-reveal">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
          <div className="group relative overflow-hidden rounded-3xl shadow-soft">
            <img
              src="/images/everyday-roti-meal.png"
              alt="Roti served with dal, vegetables, and pickle"
              loading="lazy"
              className="scroll-reveal-scale aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-forest/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur sm:bottom-6 sm:left-6">Made for real meals</span>
          </div>
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">Everyday, around the table</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From breakfast to dinner, made for your table.</h2>
            <p className="mt-4 leading-7 text-bark">Roti, dal, sabzi, and the simple comfort of a meal shared at home.</p>
          </div>
        </div>
      </section>

      <section className="section container-page scroll-reveal">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">A few kind words</p>
          <h2 className="text-3xl font-bold sm:text-4xl">What people are saying</h2>
          <p className="mt-2 text-sm text-bark">Demo testimonials · Not verified customer reviews</p>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.3fr_0.7fr] scroll-reveal-stagger">
          {reviews[0] && (
            <figure className="flex min-h-64 flex-col justify-between border-y border-forest/15 py-7 md:py-9">
              <div>
                <span aria-hidden="true" className="font-display text-6xl leading-none text-wheat">“</span>
                <blockquote className="max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{reviews[0].text}</blockquote>
              </div>
              <figcaption className="mt-6 text-sm font-bold">{reviews[0].name}<span className="ml-2 font-normal text-bark">· Demo testimonial</span></figcaption>
            </figure>
          )}
          <div className="divide-y divide-forest/10">
            {reviews.slice(1).map((review) => (
              <figure key={review.name} className="py-5">
                <blockquote className="leading-7 text-bark">“{review.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-bold">{review.name}<span className="ml-2 font-normal text-bark">· Demo</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section scroll-reveal bg-cream-deep">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bark">Simple from start to table</p>
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3 scroll-reveal-stagger">
            {[
              ['01', 'Choose your pack', 'Find the pack size that fits your home.'],
              ['02', 'Order online', 'Add it to your cart and continue to checkout.'],
              ['03', 'Enjoy everyday', 'Prepare it like your regular atta.'],
            ].map(([number, title, description], index) => (
              <li key={number} className="relative border-t border-forest/20 pt-5 sm:pt-6">
                {index < 2 && <span aria-hidden="true" className="absolute -right-4 top-[-1px] hidden w-8 border-t border-dashed border-forest/20 sm:block" />}
                <span className="font-display text-sm text-wheat">{number}</span>
                <h3 className="mt-3 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-bark">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container-page max-w-3xl scroll-reveal">
        <h2 className="mb-6 text-3xl font-bold">Questions, answered</h2>
        <div className="space-y-3 scroll-reveal-stagger">{faqs.slice(0, 4).map((f) => <FAQItem key={f.q} faq={f} />)}</div>
        <Link to="/faq" className="mt-5 inline-block font-bold underline">View all FAQs</Link>
      </section>

      <section className="scroll-reveal overflow-hidden bg-forest py-16 text-center text-cream sm:py-20">
        <div className="container-page relative">
          <Icons.Wheat aria-hidden="true" className="pointer-events-none absolute -right-4 top-0 rotate-12 text-cream/10 sm:right-10" size={92} strokeWidth={0.8} />
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat-light">Everyday goodness, made familiar</p>
          <h2 className="text-4xl font-bold sm:text-6xl">Make every roti count.</h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/75">Bring wholesome multigrain goodness to your everyday meals.</p>
          <Button to="/shop" variant="gold" className="mt-7 w-full sm:w-auto">Shop Sanjay Atta <ArrowRight size={17} className="button-arrow" /></Button>
        </div>
      </section>
    </>
  )
}
