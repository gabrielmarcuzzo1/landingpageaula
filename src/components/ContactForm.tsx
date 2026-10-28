import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Check, LoaderCircle, Mail } from 'lucide-react'

declare global {
  interface Window {
    V3_CONFIG?: { formEndpoint?: string }
  }
}

function getEndpoint() {
  const raw = window.V3_CONFIG?.formEndpoint?.trim()
  if (!raw) return ''
  try {
    const url = new URL(raw)
    return url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

export default function ContactForm() {
  const endpoint = getEndpoint()
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint || state === 'sending') return
    const form = event.currentTarget
    const fields = new FormData(form)
    const payload = Object.fromEntries(fields.entries())
    // Hidden field to reject automated submissions without sending personal data.
    if (payload.website) return
    delete payload.website
    setState('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Request failed')
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Agendar diagnóstico"
    >
      <div className="form-topline">
        <span>Seu próximo passo</span>
        <span>01 — 04</span>
      </div>
      <div className="form-fields">
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            required
            maxLength={120}
          />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail profissional</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@suaempresa.com.br"
            required
            maxLength={254}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            required
            minLength={8}
            maxLength={30}
            pattern="[+0-9() .−\-]{8,30}"
          />
        </div>
        <div className="field">
          <label htmlFor="company">Empresa</label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Nome da sua empresa"
            required
            maxLength={160}
          />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        className="button button-primary form-submit"
        disabled={!endpoint || state === 'sending' || state === 'success'}
        aria-describedby="form-note"
        type="submit"
      >
        {state === 'sending' ? (
          <>
            Enviando
            <LoaderCircle size={17} className="spinner" />
          </>
        ) : state === 'success' ? (
          <>
            Solicitação enviada
            <Check size={17} />
          </>
        ) : (
          <>
            Quero agendar meu diagnóstico
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <div id="form-note" className="form-note">
        {!endpoint ? (
          <>
            Formulário em configuração. Por enquanto, fale com a gente por{' '}
            <a href="mailto:contato@agenciav3.com.br">
              e-mail
              <Mail size={12} />
            </a>
            .
          </>
        ) : (
          'Seus dados serão enviados à Agência V3 para o contato sobre o diagnóstico.'
        )}
      </div>
      <p
        className={`form-status ${state === 'error' ? 'status-error' : ''}`}
        role="status"
        aria-live="polite"
      >
        {state === 'success'
          ? 'Recebemos sua solicitação. A equipe entrará em contato para combinar o horário.'
          : state === 'error'
            ? 'Não foi possível enviar. Tente novamente ou entre em contato pelo e-mail contato@agenciav3.com.br.'
            : ''}
      </p>
    </form>
  )
}
