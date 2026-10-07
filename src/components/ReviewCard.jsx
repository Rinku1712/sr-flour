import { Star } from 'lucide-react'
export default function ReviewCard({ review }) {
  return (
    <figure className="card flex h-full flex-col border border-forest/5 p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex gap-0.5 text-wheat" aria-label={`${review.rating} out of 5 demo stars`}>
        {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} className={n <= review.rating ? 'fill-wheat text-wheat' : 'text-forest/20'} />)}
      </div>
      <blockquote className="flex-1 leading-7 text-bark">“{review.text}”</blockquote>
      <figcaption className="mt-6 border-t border-forest/10 pt-4 text-sm font-bold">
        {review.name}
        <span className="mt-1 block text-xs font-normal text-bark">Demo testimonial · Not verified</span>
      </figcaption>
    </figure>
  )
}
