import { useRef, useState, type FormEvent } from 'react'
import { requestSophiaChat } from '../lib/moreAdvisors'
import type { SophiaFollowUpMessage } from '../lib/sophiaFollowUp'
import { isNarrationSupported, speakNarration, stopNarration } from '../lib/narration'
import './SophiaAssistant.css'

interface SophiaAssistantProps {
  language: 'en' | 'es'
}

interface RecognitionResult {
  transcript: string
}

interface RecognitionLike {
  lang: string
  onresult: ((event: { results: ArrayLike<ArrayLike<RecognitionResult>> }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

function recognitionConstructor(): (new () => RecognitionLike) | null {
  const holder = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike
    webkitSpeechRecognition?: new () => RecognitionLike
  }
  return holder.SpeechRecognition ?? holder.webkitSpeechRecognition ?? null
}

export function SophiaAssistant({ language }: SophiaAssistantProps) {
  const isEs = language === 'es'
  const [messages, setMessages] = useState<SophiaFollowUpMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [listening, setListening] = useState(false)
  const [speakReplies, setSpeakReplies] = useState(true)
  const recognizer = useRef<RecognitionLike | null>(null)
  const voiceSupported = recognitionConstructor() !== null
  const speechSupported = isNarrationSupported()

  function stopListening() {
    try {
      recognizer.current?.stop()
    } catch {
      // Recognition may already have stopped.
    }
    recognizer.current = null
    setListening(false)
  }

  function startListening() {
    const Ctor = recognitionConstructor()
    if (!Ctor) return
    setErrorMessage('')
    const instance = new Ctor()
    instance.lang = isEs ? 'es-MX' : 'en-US'
    instance.onresult = (event) => {
      const first = event.results[0]?.[0]
      if (first?.transcript) {
        setInput(first.transcript)
      }
    }
    instance.onerror = () => {
      setErrorMessage(
        isEs ? 'No pude escucharte. Inténtalo de nuevo.' : 'I could not hear you. Try again.',
      )
    }
    instance.onend = () => {
      recognizer.current = null
      setListening(false)
    }
    recognizer.current = instance
    try {
      instance.start()
      setListening(true)
    } catch {
      recognizer.current = null
      setListening(false)
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || busy) return
    if (listening) stopListening()
    const history = messages
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setBusy(true)
    setErrorMessage('')
    try {
      const reply = await requestSophiaChat(trimmed, history, language)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      if (speakReplies && speechSupported) {
        void speakNarration(reply, language)
      }
    } catch (error) {
      console.error('Sophia could not respond.', error)
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : isEs
            ? 'Sophia no pudo responder.'
            : 'Sophia could not respond.',
      )
    } finally {
      setBusy(false)
    }
  }

  function onClear() {
    if (listening) stopListening()
    stopNarration()
    setMessages([])
    setErrorMessage('')
  }

  return (
    <div className="sophia-assistant">
      <p className="sophia-note">
        {isEs
          ? 'Pregunta por texto o por voz. Cada respuesta usa créditos de IA y se mide.'
          : 'Ask by typing or by voice. Every answer uses metered AI credits.'}
      </p>
      <div className="sophia-thread" role="log" aria-live="polite" aria-label="Sophia">
        {messages.length === 0 && (
          <p className="sophia-empty">
            {isEs
              ? 'Prueba: “¿Cómo sé si un correo es phishing?”'
              : 'Try: “How do I tell if an email is phishing?”'}
          </p>
        )}
        {messages.map((message, index) => (
          <p key={`${index}-${message.role}`} className={`sophia-message sophia-${message.role}`}>
            {message.content}
          </p>
        ))}
        {busy && (
          <p className="sophia-message sophia-thinking" role="status">
            {isEs ? 'Sophia está pensando…' : 'Sophia is thinking…'}
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="sophia-error" role="alert">
          {errorMessage}
        </p>
      )}
      <form onSubmit={onSubmit} className="sophia-form">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 4000))}
          placeholder={isEs ? 'Pregunta algo…' : 'Ask anything…'}
          aria-label={isEs ? 'Mensaje para Sophia' : 'Message for Sophia'}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {isEs ? 'Enviar' : 'Send'}
        </button>
        <button
          type="button"
          disabled={!voiceSupported}
          onClick={() => (listening ? stopListening() : startListening())}
          aria-pressed={listening}
          title={
            voiceSupported
              ? isEs
                ? 'Hablar'
                : 'Speak'
              : isEs
                ? 'Voz no disponible en este navegador'
                : 'Voice unavailable in this browser'
          }
        >
          {listening ? (isEs ? 'Detener' : 'Stop') : isEs ? 'Voz' : 'Voice'}
        </button>
      </form>
      <div className="sophia-options">
        <label>
          <input
            type="checkbox"
            checked={speakReplies}
            disabled={!speechSupported}
            onChange={(event) => {
              setSpeakReplies(event.target.checked)
              if (!event.target.checked) stopNarration()
            }}
          />
          {isEs ? 'Leer respuestas en voz alta' : 'Speak replies aloud'}
        </label>
        <button type="button" onClick={onClear}>
          {isEs ? 'Borrar charla' : 'Clear chat'}
        </button>
      </div>
    </div>
  )
}
