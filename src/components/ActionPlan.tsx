import { useState, type FormEvent } from 'react'
import { requestActionPlan } from '../lib/moreAdvisors'
import { saveReport } from '../lib/savedReports'
import { AskSophiaFollowUp } from './AskSophiaFollowUp'
import './ActionPlan.css'

interface ActionPlanProps {
  language: 'en' | 'es'
}

const MAX_INPUT_LENGTH = 12000

export function ActionPlan({ language }: ActionPlanProps) {
  const isEs = language === 'es'
  const [description, setDescription] = useState('')
  const [plan, setPlan] = useState('')
  const [planKey, setPlanKey] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedNote, setSavedNote] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setPlan('')
    setSavedNote(false)
    try {
      const result = await requestActionPlan(description, language)
      setPlan(result)
      setPlanKey(`plan-${Date.now()}`)
    } catch (error) {
      console.error('Could not generate the action plan.', error)
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : isEs
            ? 'No se pudo generar el plan.'
            : 'Could not generate the plan.',
      )
    } finally {
      setLoading(false)
    }
  }

  function onSave() {
    if (!plan) return
    saveReport('plan', description.split('\n')[0] || 'Action plan', plan)
    setSavedNote(true)
  }

  return (
    <div className="action-plan">
      <p className="action-note">
        {isEs
          ? 'Describe tu negocio (equipos, cuentas, copias) y recibe pasos priorizados. Se envía al backend solo al generar.'
          : 'Describe your business (devices, accounts, backups) and get prioritized next steps. Sent to the backend only when you generate.'}
      </p>
      <form onSubmit={onSubmit}>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value.slice(0, MAX_INPUT_LENGTH))}
          placeholder={isEs ? 'Ej.: panadería, 6 empleados, 2 laptops, sin copias…' : 'E.g.: bakery, 6 staff, 2 laptops, no backups…'}
          aria-label={isEs ? 'Descripción del negocio' : 'Business description'}
          rows={4}
        />
        <button type="submit" disabled={loading || !description.trim()}>
          {loading ? (isEs ? 'Generando…' : 'Generating…') : isEs ? 'Generar plan' : 'Generate plan'}
        </button>
      </form>
      {errorMessage && (
        <p className="action-error" role="alert">
          {errorMessage}
        </p>
      )}
      {plan && (
        <div className="action-result">
          <h3>{isEs ? 'Tu plan' : 'Your plan'}</h3>
          <p className="action-text">{plan}</p>
          <div className="action-actions">
            <button type="button" onClick={onSave}>
              {isEs ? 'Guardar informe' : 'Save report'}
            </button>
            {savedNote && (
              <span className="action-saved" role="status">
                {isEs ? 'Guardado en este dispositivo.' : 'Saved on this device.'}
              </span>
            )}
          </div>
          <AskSophiaFollowUp language={language} context={plan} contextKey={planKey} />
        </div>
      )}
    </div>
  )
}
