import { useState, type FormEvent } from 'react'
import { requestScreenshotAnalysis } from '../lib/moreAdvisors'
import { saveReport } from '../lib/savedReports'
import { AskSophiaFollowUp } from './AskSophiaFollowUp'
import './ScreenshotAnalyzer.css'

interface ScreenshotAnalyzerProps {
  language: 'en' | 'es'
}

const MAX_DIMENSION = 1600
const MAX_NOTE_LENGTH = 2000

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Could not read the file.'))
    }
    reader.onerror = () => reject(new Error('Could not read the file.'))
    reader.readAsDataURL(file)
  })
}

function shrinkImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Could not process the image.'))
        return
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    image.onerror = () => reject(new Error('That file is not a readable image.'))
    image.src = dataUrl
  })
}

export function ScreenshotAnalyzer({ language }: ScreenshotAnalyzerProps) {
  const isEs = language === 'es'
  const [fileName, setFileName] = useState('')
  const [image, setImage] = useState('')
  const [note, setNote] = useState('')
  const [consent, setConsent] = useState(false)
  const [result, setResult] = useState('')
  const [resultKey, setResultKey] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedNote, setSavedNote] = useState(false)

  async function onFile(file: File | undefined) {
    setErrorMessage('')
    setImage('')
    setFileName('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMessage(isEs ? 'Elige un archivo de imagen.' : 'Choose an image file.')
      return
    }
    try {
      const dataUrl = await readFile(file)
      const shrunk = await shrinkImage(dataUrl)
      setImage(shrunk)
      setFileName(file.name)
    } catch (error) {
      console.error('Could not process the image.', error)
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : isEs
            ? 'No se pudo procesar la imagen.'
            : 'Could not process the image.',
      )
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!consent) {
      setErrorMessage(
        isEs ? 'Marca el consentimiento para analizar.' : 'Check the consent box to analyze.',
      )
      return
    }
    setLoading(true)
    setErrorMessage('')
    setResult('')
    setSavedNote(false)
    try {
      const analysis = await requestScreenshotAnalysis(image, note, language)
      setResult(analysis)
      setResultKey(`shot-${Date.now()}`)
    } catch (error) {
      console.error('Could not analyze the screenshot.', error)
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : isEs
            ? 'No se pudo analizar la captura.'
            : 'Could not analyze the screenshot.',
      )
    } finally {
      setLoading(false)
    }
  }

  function onSave() {
    if (!result) return
    saveReport('screenshot', fileName || 'Screenshot analysis', result)
    setSavedNote(true)
  }

  return (
    <div className="screenshot-analyzer">
      <p className="screenshot-note">
        {isEs
          ? 'Optativo: eliges una imagen, aceptas y analizas. El navegador la reduce a 1600 px y la convierte a JPEG antes de enviarla; la imagen no se guarda. Tacha datos delicados antes de subir.'
          : 'Opt-in: you pick an image, consent, and analyze. The browser shrinks it to 1600 px and converts it to JPEG before sending; the image itself is not saved. Redact sensitive details before uploading.'}
      </p>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => void onFile(event.target.files?.[0])}
          aria-label={isEs ? 'Imagen para analizar' : 'Image to analyze'}
        />
        {fileName && <p className="screenshot-file">{fileName}</p>}
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value.slice(0, MAX_NOTE_LENGTH))}
          placeholder={isEs ? 'Nota opcional: ¿qué te preocupa?' : 'Optional note: what worries you?'}
          aria-label={isEs ? 'Nota opcional' : 'Optional note'}
          rows={2}
        />
        <label className="screenshot-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
          />
          {isEs
            ? 'Acepto enviar esta imagen a Supabase y Meta para su análisis.'
            : 'I consent to sending this image to Supabase and Meta for analysis.'}
        </label>
        <button type="submit" disabled={loading || !image}>
          {loading ? (isEs ? 'Analizando…' : 'Analyzing…') : isEs ? 'Analizar captura' : 'Analyze screenshot'}
        </button>
      </form>
      {errorMessage && (
        <p className="screenshot-error" role="alert">
          {errorMessage}
        </p>
      )}
      {result && (
        <div className="screenshot-result">
          <h3>{isEs ? 'Veredicto' : 'Verdict'}</h3>
          <p className="screenshot-text">{result}</p>
          <div className="screenshot-actions">
            <button type="button" onClick={onSave}>
              {isEs ? 'Guardar informe' : 'Save report'}
            </button>
            {savedNote && (
              <span className="screenshot-saved" role="status">
                {isEs ? 'Solo se guarda el texto del veredicto.' : 'Only the verdict text is saved.'}
              </span>
            )}
          </div>
          <AskSophiaFollowUp language={language} context={result} contextKey={resultKey} />
        </div>
      )}
    </div>
  )
}
