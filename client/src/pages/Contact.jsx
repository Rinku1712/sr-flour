import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  CONTACT_ENDPOINT,
  INSTAGRAM_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../config/config'
import submitJson from '../utils/submitJson'
import { showSwalError, showSwalSuccess } from '../utils/sweetAlert'

const inputClass = 'mt-2 w-full rounded-xl border border-forest/15 bg-[#FFFEFA] px-4 py-3 text-sm text-forest shadow-sm transition duration-200 placeholder:text-bark/45 focus:border-forest focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/60'

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Contact() {
  useTitle('Contact Us')
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState(null)

  const update = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice(null)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!validEmail(values.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    if (!values.subject.trim()) nextErrors.subject = 'Please enter a subject.'
    if (!values.message.trim()) nextErrors.message = 'Please enter a message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setNotice({ type: 'error', text: 'Please check the highlighted fields and try again.' })
      return
    }

    setSubmitting(true)
    setNotice(null)
    try {
      await submitJson(CONTACT_ENDPOINT, {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        subject: values.subject.trim(),
        message: values.message.trim(),
      }, 'The contact service')
      setValues({ name: '', email: '', phone: '', subject: '', message: '' })
      setNotice({ type: 'success', text: 'Your message has been accepted. Thank you for getting in touch.' })
      showSwalSuccess('Message sent', 'Your message has been accepted. Thank you for getting in touch.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'We could not send your message. Please try again.'
      setNotice({ type: 'error', text: message })
      showSwalError('Message not sent', message)
    } finally {
      setSubmitting(false)
    }
  }

  const configuredContacts = [
    SUPPORT_EMAIL && { icon: Mail, label: 'Email', value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
    SUPPORT_PHONE && { icon: Phone, label: 'Phone', value: SUPPORT_PHONE, href: `tel:${SUPPORT_PHONE.replace(/[^\d+]/g, '')}` },
    BUSINESS_ADDRESS && { icon: MapPin, label: 'Address', value: BUSINESS_ADDRESS },
    BUSINESS_HOURS && { icon: Clock3, label: 'Business hours', value: BUSINESS_HOURS },
  ].filter(Boolean)

  return (
    <div className="bg-cream">
      <section className="container-page py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wheat">Here for your table</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">We’re Here to Help.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-bark">
            Questions about our products or your order? We’d love to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="flex flex-col rounded-3xl bg-forest p-7 text-cream shadow-soft sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage">A little help goes a long way</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-cream">Let’s find the right answer.</h2>
            <p className="mt-4 text-sm leading-7 text-cream/75">
              Reach out about an order, ingredients, or anything else you’d like to know. We’ll be glad to help.
            </p>
            <div className="mt-8 space-y-5">
              {configuredContacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-3">
                  <Icon aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-sage" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cream/60">{label}</p>
                    {href
                      ? <a href={href} className="mt-1 inline-block text-sm text-cream underline-offset-4 hover:underline">{value}</a>
                      : <p className="mt-1 text-sm text-cream">{value}</p>}
                  </div>
                </div>
              ))}
              {!configuredContacts.length && (
                <p className="rounded-2xl border border-cream/15 bg-white/5 p-4 text-sm leading-6 text-cream/75">
                  {import.meta.env.DEV
                    ? 'Contact details are development placeholders. Add your verified details in the VITE_SUPPORT_* settings before launch.'
                    : 'Please send us a message using the form and we’ll be in touch.'}
                </p>
              )}
              {INSTAGRAM_URL && (
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-cream hover:text-sage">
                  Follow along on Instagram <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
            <div className="mt-auto pt-9">
              <p className="text-xs font-semibold uppercase tracking-wider text-cream/60">Quick answers</p>
              <Link to="/faq" className="mt-2 inline-block text-sm font-semibold text-cream underline underline-offset-4 hover:text-sage">Visit our FAQ</Link>
            </div>
          </aside>

          <form onSubmit={submit} noValidate className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft sm:p-9">
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-bark">Fields marked with <span aria-hidden="true">*</span> are required.</p>
            <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-forest" htmlFor="contact-name">
                Full name <span aria-hidden="true">*</span>
                <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} className={inputClass} />
                {errors.name && <span id="contact-name-error" className="mt-1 block text-xs font-medium text-red-700">{errors.name}</span>}
              </label>
              <label className="text-sm font-semibold text-forest" htmlFor="contact-email">
                Email address <span aria-hidden="true">*</span>
                <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={inputClass} />
                {errors.email && <span id="contact-email-error" className="mt-1 block text-xs font-medium text-red-700">{errors.email}</span>}
              </label>
              <label className="text-sm font-semibold text-forest" htmlFor="contact-phone">
                Phone number <span className="font-normal text-bark">(optional)</span>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} className={inputClass} />
              </label>
              <label className="text-sm font-semibold text-forest" htmlFor="contact-subject">
                Subject <span aria-hidden="true">*</span>
                <input id="contact-subject" name="subject" value={values.subject} onChange={update} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} className={inputClass} />
                {errors.subject && <span id="contact-subject-error" className="mt-1 block text-xs font-medium text-red-700">{errors.subject}</span>}
              </label>
              <label className="text-sm font-semibold text-forest sm:col-span-2" htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
                <textarea id="contact-message" name="message" rows="5" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={`${inputClass} resize-y`} />
                {errors.message && <span id="contact-message-error" className="mt-1 block text-xs font-medium text-red-700">{errors.message}</span>}
              </label>
            </div>
            <button type="submit" disabled={submitting} className="button-motion mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-forest px-6 py-3 text-sm font-bold text-cream transition hover:bg-forest-light disabled:cursor-wait disabled:opacity-60 sm:w-auto">
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
            {notice && (
              <p role={notice.type === 'error' ? 'alert' : 'status'} className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${notice.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-sage text-forest'}`}>
                {notice.text}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
