import { useState } from 'react'
import { ArrowRight, Check, Mail, Wheat } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import { NEWSLETTER_ENDPOINT } from '../config/config'
import submitJson from '../utils/submitJson'

export default function Updates() {
  useTitle('Updates & Newsletter')
  const [email, setEmail] = useState('')
  const [consented, setConsented] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNotice({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }
    if (!consented) {
      setNotice({ type: 'error', text: 'Please confirm that you would like to receive email updates.' })
      return
    }
    setSubmitting(true)
    setNotice(null)
    try {
      await submitJson(NEWSLETTER_ENDPOINT, { email: email.trim(), consent: true }, 'The newsletter service')
      setEmail('')
      setConsented(false)
      setNotice({ type: 'success', text: 'You’re subscribed. Thank you for joining us.' })
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'We could not subscribe you. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <section className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-center text-cream shadow-soft sm:px-12 sm:py-16">
        <Wheat aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 rotate-12 text-cream/10" size={130} strokeWidth={0.8} />
        <Mail aria-hidden="true" className="mx-auto text-sage" size={32} strokeWidth={1.5} />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sage">Notes from our kitchen</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold text-cream sm:text-5xl">Good things are growing.</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-cream/75 sm:text-base">
          Be the first to hear about product news, thoughtful food stories, and updates from Sanjay Atta.
        </p>
        <form onSubmit={submit} noValidate className="mx-auto mt-8 max-w-lg text-left">
          <label htmlFor="updates-email" className="text-sm font-semibold text-cream">Email address</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input id="updates-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setNotice(null) }} required placeholder="you@example.com" className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-forest placeholder:text-bark/45 focus:outline-none focus:ring-4 focus:ring-sage/60" />
            <button type="submit" disabled={submitting} className="button-motion inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-wheat px-6 py-3 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60">
              {submitting ? 'Joining…' : <>Join the list <ArrowRight size={16} aria-hidden="true" /></>}
            </button>
          </div>
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-left text-xs leading-5 text-cream/75">
            <input type="checkbox" checked={consented} onChange={(event) => { setConsented(event.target.checked); setNotice(null) }} className="mt-0.5 h-4 w-4 shrink-0 accent-[#B96F50]" />
            <span>I agree to receive email updates from Sanjay Atta. I can unsubscribe at any time.</span>
          </label>
          {notice && <p role={notice.type === 'error' ? 'alert' : 'status'} className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${notice.type === 'error' ? 'bg-red-100 text-red-900' : 'bg-sage text-forest'}`}>{notice.type === 'success' && <Check size={16} className="mr-1 inline" aria-hidden="true" />}{notice.text}</p>}
        </form>
        <p className="mt-5 text-xs text-cream/55">No clutter, just occasional updates. Your email stays yours.</p>
      </section>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-bark">
        Email subscriptions are only recorded when a newsletter service is configured and accepts your request.
      </p>
    </div>
  )
}
