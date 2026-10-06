import { Wheat } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  useTitle('Page not found')
  return <div className="container-page py-20"><EmptyState icon={Wheat} title="This page isn't on the menu" text="The page you're looking for doesn't exist or has moved." actionLabel="Back to Home" actionTo="/" /></div>
}
