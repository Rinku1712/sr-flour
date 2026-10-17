import { Link } from 'react-router-dom'
import { ArrowRight, CircleHelp } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import FAQItem from '../components/FAQItem'
import { faqs } from '../data/content'

export default function FAQ() {
  useTitle('Frequently Asked Questions')

  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <CircleHelp aria-hidden="true" className="mx-auto text-wheat" size={30} strokeWidth={1.6} />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-wheat">A little more clarity</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-base leading-7 text-bark">Helpful details for your everyday SR Flour experience.</p>
      </header>
      <section aria-label="Frequently asked questions" className="mx-auto mt-9 max-w-3xl space-y-3 sm:mt-12">
        {faqs.map((faq) => <FAQItem key={faq.q} faq={faq} />)}
      </section>
      <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-wheat/20 bg-white/70 p-4 text-sm leading-6 text-bark">
        From delivery times to ingredient details, the order flow and product information are designed to answer the questions most families have before they buy.
      </p>
      <div className="mt-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-forest underline underline-offset-4 hover:text-forest-light">
          Still have a question? Contact us <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
