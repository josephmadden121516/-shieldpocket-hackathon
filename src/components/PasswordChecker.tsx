import { useMemo, useState } from 'react'
import './PasswordChecker.css'

interface PasswordCheckerProps {
  language: 'en' | 'es'
}

const COMMON_SAMPLES = [
  'password',
  '123456',
  '12345678',
  'qwerty',
  'letmein',
  'welcome',
  'admin',
  'football',
  'sunshine',
  'master',
  'shadow',
  'dragon',
  'monkey',
  'princess',
  'jordan',
  'hunter',
]

function hasSequence(sample: string): boolean {
  const lowered = sample.toLowerCase()
  const runs = ['012', '123', '234', '345', '456', '567', '678', '789', 'abc', 'bcd', 'cde', 'qwe', 'asd']
  return runs.some((run) => lowered.includes(run))
}

function hasRepeat(sample: string): boolean {
  return /(.)\1\1/.test(sample)
}

interface Score {
  points: number
  labelEn: string
  labelEs: string
  tipsEn: string[]
  tipsEs: string[]
}

function scoreSample(sample: string): Score {
  const tipsEn: string[] = []
  const tipsEs: string[] = []
  if (!sample) {
    return { points: 0, labelEn: 'Type a sample to check it.', labelEs: 'Escribe un ejemplo para revisarlo.', tipsEn, tipsEs }
  }
  let points = 0
  if (sample.length >= 8) points += 1
  else {
    tipsEn.push('Use at least 8 characters; longer is better.')
    tipsEs.push('Usa al menos 8 caracteres; más largo es mejor.')
  }
  if (sample.length >= 14) points += 1
  const classes = [
    /[a-z]/.test(sample),
    /[A-Z]/.test(sample),
    /[0-9]/.test(sample),
    /[^a-zA-Z0-9]/.test(sample),
  ].filter(Boolean).length
  if (classes >= 3) points += 1
  else {
    tipsEn.push('Mix lowercase, uppercase, digits, and symbols.')
    tipsEs.push('Mezcla minúsculas, mayúsculas, dígitos y símbolos.')
  }
  const lowered = sample.toLowerCase()
  const isCommon = COMMON_SAMPLES.some((word) => lowered.includes(word))
  if (!isCommon && !hasSequence(sample) && !hasRepeat(sample)) points += 1
  else {
    if (isCommon) {
      tipsEn.push('Avoid common words and famous passwords.')
      tipsEs.push('Evita palabras comunes y contraseñas famosas.')
    }
    if (hasSequence(sample)) {
      tipsEn.push('Avoid sequences like 123 or abc.')
      tipsEs.push('Evita secuencias como 123 o abc.')
    }
    if (hasRepeat(sample)) {
      tipsEn.push('Avoid characters repeated three or more times.')
      tipsEs.push('Evita caracteres repetidos tres o más veces.')
    }
  }
  const labels: Array<[string, string]> = [
    ['Very weak', 'Muy débil'],
    ['Weak', 'Débil'],
    ['Fair', 'Aceptable'],
    ['Good', 'Buena'],
    ['Strong', 'Fuerte'],
  ]
  const [labelEn, labelEs] = labels[Math.min(points, 4)]
  if (points >= 4) {
    tipsEn.push('Strong sample. Still: use a unique password per site plus two-step verification.')
    tipsEs.push('Buen ejemplo. Aun así: usa una contraseña única por sitio más verificación en dos pasos.')
  }
  return { points: Math.min(points, 4), labelEn, labelEs, tipsEn, tipsEs }
}

export function PasswordChecker({ language }: PasswordCheckerProps) {
  const isEs = language === 'es'
  const [sample, setSample] = useState('')
  const [visible, setVisible] = useState(false)
  const score = useMemo(() => scoreSample(sample), [sample])
  const tips = isEs ? score.tipsEs : score.tipsEn

  return (
    <div className="password-checker">
      <p className="password-note">
        {isEs
          ? 'Todo se evalúa en este navegador y nada se envía a ningún servidor. Usa un ejemplo inventado, nunca una contraseña real.'
          : 'Everything is evaluated in this browser and nothing is sent anywhere. Use a made-up sample, never a real password.'}
      </p>
      <div className="password-row">
        <input
          type={visible ? 'text' : 'password'}
          value={sample}
          onChange={(event) => setSample(event.target.value.slice(0, 200))}
          placeholder={isEs ? 'Escribe un ejemplo…' : 'Type a sample…'}
          aria-label={isEs ? 'Ejemplo de contraseña' : 'Sample password'}
          autoComplete="off"
        />
        <button type="button" onClick={() => setVisible((value) => !value)}>
          {visible ? (isEs ? 'Ocultar' : 'Hide') : isEs ? 'Mostrar' : 'Show'}
        </button>
      </div>
      <p className="password-score" role="status">
        {isEs ? 'Fuerza' : 'Strength'}: <strong>{isEs ? score.labelEs : score.labelEn}</strong>
        {' '}({score.points}/4)
      </p>
      {tips.length > 0 && (
        <ul className="password-tips">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}
      <p className="password-note">
        {isEs
          ? 'Esto no consulta filtraciones ni garantiza seguridad; es orientación local.'
          : 'This performs no breach lookup and proves nothing; it is local guidance.'}
      </p>
    </div>
  )
}
