import { useEffect } from 'react'
export default function useTitle(title) {
  useEffect(() => { document.title = title ? `${title} |sr-flour` : 'sr-flour' }, [title])
}
