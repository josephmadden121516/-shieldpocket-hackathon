import { useState, type FormEvent } from 'react'
import { requestThreatAnalysis } from '../lib/moreAdvisors'
import { saveReport } from '../lib/savedReports'
import { AskSophiaFollowUp } from './AskSophiaFollowUp'
import './ThreatAnalyzer.css'

interface ThreatAnalyzerProps {
  language: 'en' | 'es'
}

const MAX_INPUT_LENGTH = 12000

export function ThreatAnalyzer({ language }: ThreatAnalyzerProps) {
  const isEs = language === 'es'
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [resultKey, setResultKey] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedNote, setSavedNote] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setResult('')
    setSavedNote(false)
    try {
      const analysis = await requestThreatAnalysis(message, language)
      setResult(analysis)
      setResultKey(`threat-${Date.now()}`)
    } catch (error) {
      console.error('Could not analyze the message.', error)
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : isEs
            ? 'No se pudo analizar el mensaje.'
            : 'Could not analyze the message.',
      )
    } finally {
      setLoading(false)
    }
  }

  function onSave() {
    if (!result) return
    saveReport('threat', result.split('\n')[0] || 'Threat analysis', result)
    setSavedNote(true)
  }

  return (
    <div className="threat-analyzer">
      <p className="threat-note">
        {isEs
          ? 'Pega un mensaje sospechoso para un veredicto defensivo con IA. Se envía al backend solo al analizar; nunca pegues contraseñas ni códigos.'
          : 'Paste a suspicious message for a defensive AI verdict. It is sent to the backend only when you analyze; never paste passwords or codes.'}
      </p>
      <form onSubmit={onSubmit}>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, MAX_INPUT_LENGTH))}
          placeholder={isEs ? 'Pega el mensaje aquí…' : 'Paste the message here…'}
          aria-label={isEs ? 'Mensaje sospechoso' : 'Suspicious message'}
          rows={5}
        />
        <div className="threat-actions">
          <button type="submit" disabled={loading || !message.trim()}>
            {loading ? (isEs ? 'Analizando…' : 'Analyzing…') : isEs ? 'Analizar' : 'Analyze'}
          </button>
          <span className="threat-count">
            {message.length} / {MAX_INPUT_LENGTH}
          </span>
        </div>
      </form>
      {errorMessage && (
        <p className="threat-error" role="alert">
          {errorMessage}
        </p>
      )}
      {result && (
        <div className="threat-result">
          <h3>{isEs ? 'Veredicto' : 'Verdict'}</h3>
          <p className="threat-text">{result}</p>
          <div className="threat-actions">
            <button type="button" onClick={onSave}>
              {isEs ? 'Guardar informe' : 'Save report'}
            </button>
            {savedNote && (
              <span className="threat-saved" role="status">
                {isEs ? 'Guardado en este dispositivo.' : 'Saved on this device.'}
              </span>
            )}
          </div>
          <AskSophiaFollowUp language={language} context={result} contextKey={resultKey} />
        </div>
      )}
    </div>
  )
}
