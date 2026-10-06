import { ChevronDown } from 'lucide-react'
export default function FAQItem({ faq }) {
  return (
    <details className="group card px-6 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
        {faq.q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
      </summary>
      <p className="pt-3 text-bark">{faq.a}</p>
    </details>
  )
}
