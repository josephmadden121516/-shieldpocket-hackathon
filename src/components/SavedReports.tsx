import { useState } from 'react'
import {
  deleteSavedReport,
  loadSavedReports,
  type SavedReport,
  type SavedReportKind,
} from '../lib/savedReports'
import './SavedReports.css'

interface SavedReportsProps {
  language: 'en' | 'es'
}

const KIND_LABELS: Record<SavedReportKind, { en: string; es: string }> = {
  threat: { en: 'Threat analysis', es: 'Análisis de amenaza' },
  screenshot: { en: 'Screenshot analysis', es: 'Análisis de captura' },
  plan: { en: 'Action plan', es: 'Plan de acción' },
  report: { en: 'Activity log', es: 'Registro de actividad' },
}

function formatDate(value: string, language: 'en' | 'es'): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(language === 'es' ? 'es-ES' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function SavedReports({ language }: SavedReportsProps) {
  const isEs = language === 'es'
  const [reports, setReports] = useState<SavedReport[]>(() => loadSavedReports())
  const [openId, setOpenId] = useState<string | null>(null)

  function onDelete(id: string) {
    setReports(deleteSavedReport(id))
    if (openId === id) setOpenId(null)
  }

  return (
    <div className="saved-reports">
      <p className="saved-note">
        {isEs
          ? 'Tus informes guardados viven solo en este navegador. Nada se sincroniza ni se sube.'
          : 'Your saved reports live only in this browser. Nothing syncs or uploads anywhere.'}
      </p>
      <button type="button" className="saved-refresh" onClick={() => setReports(loadSavedReports())}>
        {isEs ? 'Actualizar lista' : 'Refresh list'}
      </button>
      {reports.length === 0 && (
        <p className="saved-empty" role="status">
          {isEs
            ? 'Aún no hay informes. Analiza algo o registra una actividad para empezar.'
            : 'No reports yet. Analyze something or log an activity to begin.'}
        </p>
      )}
      <ul className="saved-list">
        {reports.map((report) => (
          <li key={report.id} className="saved-item">
            <button
              type="button"
              className="saved-title"
              onClick={() => setOpenId((current) => (current === report.id ? null : report.id))}
              aria-expanded={openId === report.id}
            >
              <span>
                [{isEs ? KIND_LABELS[report.kind].es : KIND_LABELS[report.kind].en}] {report.title}
              </span>
              <span className="saved-date">{formatDate(report.createdAt, language)}</span>
            </button>
            {openId === report.id && (
              <div className="saved-detail">
                <p>{report.body}</p>
                <button type="button" className="saved-delete" onClick={() => onDelete(report.id)}>
                  {isEs ? 'Borrar' : 'Delete'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
