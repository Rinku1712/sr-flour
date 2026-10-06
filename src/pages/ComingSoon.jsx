import { Hammer } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import EmptyState from '../components/EmptyState'

// Placeholder for pages built in later stages.
export default function ComingSoon({ title }) {
  useTitle(title)
  return <div className="container-page py-20"><EmptyState icon={Hammer} title={title} text="This page is coming in the next build stage." actionLabel="Back to Shop" actionTo="/shop" /></div>
}
