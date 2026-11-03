import { useState, type FormEvent } from 'react'
import { saveReport } from '../lib/savedReports'
import './ReportActivity.css'

interface ReportActivityProps {
  language: 'en' | 'es'
}

const KINDS = [
  { id: 'message', labelEn: 'Suspicious message', labelEs: 'Mensaje sospechoso' },
  { id: 'call', labelEn: 'Suspicious call', labelEs: 'Llamada sospechosa' },
  { id: 'website', labelEn: 'Suspicious website', labelEs: 'Sitio sospechoso' },
  { id: 'other', labelEn: 'Something else', labelEs: 'Otra cosa' },
]

export function ReportActivity({ language }: ReportActivityProps) {
  const isEs = language === 'es'
  const [kind, setKind] = useState(KINDS[0].id)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [confirmation, setConfirmation] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !details.trim()) return
    const kindLabel = KINDS.find((entry) => entry.id === kind)
    const label = kindLabel ? (isEs ? kindLabel.labelEs : kindLabel.labelEn) : kind
    saveReport('report', `${label}: ${title.trim()}`, details.trim())
    setConfirmation(
      isEs
        ? 'Registrado en este dispositivo. Encuéntralo en Informes guardados.'
        : 'Logged on this device. Find it under Saved reports.',
    )
    setTitle('')
    setDetails('')
  }

  return (
    <div className="report-activity">
      <p className="report-note">
        {isEs
          ? 'Registra algo sospechoso para tus archivos. Se guarda solo en este dispositivo; nada sale a ningún servidor.'
          : 'Log something suspicious for your records. It is stored only on this device; nothing leaves for any server.'}
      </p>
      <form onSubmit={onSubmit}>
        <label className="report-field">
          {isEs ? 'Tipo' : 'Kind'}
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            {KINDS.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {isEs ? entry.labelEs : entry.labelEn}
              </option>
            ))}
          </select>
        </label>
        <label className="report-field">
          {isEs ? 'Título' : 'Title'}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value.slice(0, 200))}
            placeholder={isEs ? 'Ej.: llamada del “banco”' : 'E.g.: call from the “bank”'}
          />
        </label>
        <label className="report-field">
          {isEs ? 'Detalles' : 'Details'}
          <textarea
            value={details}
            onChange={(event) => setDetails(event.target.value.slice(0, 12000))}
            placeholder={isEs ? 'Qué pasó, cuándo, quién llamó…' : 'What happened, when, who called…'}
            rows={4}
          />
        </label>
        <button type="submit" disabled={!title.trim() || !details.trim()}>
          {isEs ? 'Guardar registro' : 'Save log entry'}
        </button>
      </form>
      {confirmation && (
        <p className="report-confirmation" role="status">
          {confirmation}
        </p>
      )}
    </div>
  )
}
