import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import useTitle from '../hooks/useTitle'
import {
  AUTH_LOGIN_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
  AUTH_RESET_ENDPOINT,
} from '../config/config'
import submitJson from '../utils/submitJson'

const authModes = {
  login: {
    title: 'Welcome back',
    description: 'Sign in to your Sanjay Atta account.',
    endpoint: AUTH_LOGIN_ENDPOINT,
    service: 'The sign-in service',
    button: 'Sign in',
    fields: ['email', 'password'],
  },
  signup: {
    title: 'Create your account',
    description: 'A few details and you’ll be ready to go.',
    endpoint: AUTH_REGISTER_ENDPOINT,
    service: 'The account service',
    button: 'Create account',
    fields: ['name', 'email', 'password'],
  },
  'forgot-password': {
    title: 'Reset your password',
    description: 'Enter your email and we’ll request a secure reset link.',
    endpoint: AUTH_RESET_ENDPOINT,
    service: 'The password reset service',
    button: 'Request reset link',
    fields: ['email'],
  },
}

export default function AuthForm({ mode }) {
  const config = authModes[mode]
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState(null)
  useTitle(config.title)

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const email = values.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }
    if (mode === 'signup' && !values.name.trim()) {
      setNotice({ type: 'error', text: 'Please enter your name.' })
      return
    }
    if ((mode === 'signup' || mode === 'login') && values.password.length < 8) {
      setNotice({ type: 'error', text: 'Password must be at least 8 characters.' })
      return
    }
    setSubmitting(true)
    setNotice(null)
    try {
      await submitJson(config.endpoint, {
        ...(mode === 'signup' ? { name: values.name.trim() } : {}),
        email,
        ...(mode !== 'forgot-password' ? { password: values.password } : {}),
      }, config.service)
      setNotice({
        type: 'success',
        text: mode === 'forgot-password'
          ? 'Your reset request was accepted. Check your email if the address is registered.'
          : mode === 'signup'
            ? 'Your account request was accepted. You can now sign in.'
            : 'Your sign-in request was accepted. This site does not yet maintain a signed-in session.',
      })
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'We could not complete your request. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <section className="card mx-auto max-w-lg p-6 sm:p-9">
        <Link to="/account" className="inline-flex items-center gap-2 text-sm font-semibold text-bark hover:text-forest"><ArrowLeft size={16} aria-hidden="true" /> My account</Link>
        <LockKeyhole aria-hidden="true" className="mt-7 text-wheat" size={27} />
        <h1 className="mt-3 text-3xl font-bold">{config.title}</h1>
        <p className="mt-2 text-sm leading-6 text-bark">{config.description}</p>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          {config.fields.includes('name') && (
            <label htmlFor="auth-name" className="block text-sm font-semibold">
              Full name
              <input id="auth-name" autoComplete="name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} className="mt-2 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sage/60" />
            </label>
          )}
          <label htmlFor="auth-email" className="block text-sm font-semibold">
            Email address
            <input id="auth-email" type="email" autoComplete="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} className="mt-2 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sage/60" />
          </label>
          {config.fields.includes('password') && (
            <label htmlFor="auth-password" className="block text-sm font-semibold">
              Password
              <input id="auth-password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} className="mt-2 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sage/60" />
              <span className="mt-1 block text-xs font-normal text-bark">Use at least 8 characters.</span>
            </label>
          )}
          <button type="submit" disabled={submitting} className="button-motion inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-forest px-6 py-3 text-sm font-bold text-cream transition hover:bg-forest-light disabled:cursor-wait disabled:opacity-60">
            {submitting ? 'Please wait…' : config.button}
          </button>
          {notice && <p role={notice.type === 'error' ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm leading-6 ${notice.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-sage text-forest'}`}>{notice.text}</p>}
        </form>
        <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-semibold">
          {mode !== 'login' && <Link to="/login" className="text-forest underline underline-offset-4">Sign in</Link>}
          {mode !== 'signup' && <Link to="/signup" className="text-forest underline underline-offset-4">Create account</Link>}
          {mode !== 'forgot-password' && <Link to="/forgot-password" className="text-bark underline underline-offset-4">Forgot password?</Link>}
        </div>
      </section>
    </div>
  )
}
