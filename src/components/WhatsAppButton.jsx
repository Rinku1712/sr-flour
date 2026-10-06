import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../config/config'

const message = encodeURIComponent('Hi Sanjay Atta, I want to know more about your product.')
export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105">
      <MessageCircle size={26} />
    </a>
  )
}
