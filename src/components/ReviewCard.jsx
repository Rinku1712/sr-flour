import { Star } from 'lucide-react'
export default function ReviewCard({ review }) {
  return (
    <figure className="card p-6">
      <div className="mb-3 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} className={n <= review.rating ? 'fill-wheat text-wheat' : 'text-forest/20'} />)}
      </div>
      <blockquote className="text-bark">{review.text}</blockquote>
      <figcaption className="mt-4 text-sm font-bold">{review.name}</figcaption>
    </figure>
  )
}
