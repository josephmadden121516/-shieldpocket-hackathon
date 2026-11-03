import { useState } from 'react'
import './CookiePrivacyChecker.css'

interface CookiePrivacyCheckerProps {
  language: 'en' | 'es'
}

interface CheckQuestion {
  id: string
  promptEn: string
  promptEs: string
  guidanceEn: string
  guidanceEs: string
}

const QUESTIONS: CheckQuestion[] = [
  {
    id: 'reject-optional',
    promptEn: 'Do you reject optional or advertising cookies when a site offers the choice?',
    promptEs: '¿Rechazas las cookies opcionales o publicitarias cuando un sitio ofrece elegir?',
    guidanceEn: 'Always choose "reject optional" over "accept all". Fewer tracking cookies means a smaller advertising footprint.',
    guidanceEs: 'Elige siempre "rechazar opcionales" en vez de "aceptar todo". Menos cookies de rastreo es menor huella publicitaria.',
  },
  {
    id: 'third-party',
    promptEn: 'Have you blocked third-party cookies in your browser settings?',
    promptEs: '¿Bloqueaste las cookies de terceros en tu navegador?',
    guidanceEn: 'Every major browser can block third-party cookies. Turn it on; breakage on odd sites is rare and usually fixable per site.',
    guidanceEs: 'Todo navegador moderno puede bloquear cookies de terceros. Actívalo; los fallos en sitios raros son escasos y se corrigen por sitio.',
  },
  {
    id: 'read-notice',
    promptEn: 'Before accepting, do you skim what the cookie notice says it collects?',
    promptEs: 'Antes de aceptar, ¿lees por encima lo que el aviso dice que recoge?',
    guidanceEn: 'A 10-second skim catches the worst cases: location, cross-site tracking, or data sales. Walk away from sites that demand everything.',
    guidanceEs: 'Una lectura de 10 segundos detecta lo peor: ubicación, rastreo entre sitios o venta de datos. Evita sitios que exigen todo.',
  },
  {
    id: 'clear-regularly',
    promptEn: 'Do you clear cookies and site data every few months?',
    promptEs: '¿Borras cookies y datos de sitios cada pocos meses?',
    guidanceEn: 'A periodic clear logs you out everywhere but wipes stale trackers. Pair it with a password manager so sign-in stays painless.',
    guidanceEs: 'Borrar cada tanto cierra tus sesiones pero elimina rastreadores viejos. Combínalo con un gestor de contraseñas.',
  },
  {
    id: 'private-mode',
    promptEn: 'Do you use private windows for casual browsing you would rather not keep?',
    promptEs: '¿Usas ventanas privadas para navegación casual que prefieres no guardar?',
    guidanceEn: 'Private windows discard cookies and history when closed. They hide you from the device, not from your network or the sites.',
    guidanceEs: 'Las ventanas privadas descartan cookies e historial al cerrar. Te ocultan del dispositivo, no de la red ni de los sitios.',
  },
  {
    id: 'app-tracking',
    promptEn: 'On your phone, do you deny "track across apps" prompts by default?',
    promptEs: 'En tu teléfono, ¿niegas por defecto los permisos de rastreo entre apps?',
    guidanceEn: 'Default to deny. Apps work fine without cross-app tracking; grant it only when you see a personal benefit.',
    guidanceEs: 'Niega por defecto. Las apps funcionan sin rastreo entre apps; concédelo solo si te beneficia.',
  },
]

export function CookiePrivacyChecker({ language }: CookiePrivacyCheckerProps) {
  const isEs = language === 'es'
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const answered = QUESTIONS.filter((item) => answers[item.id] !== undefined)
  const yesCount = answered.filter((item) => answers[item.id]).length

  return (
    <div className="privacy-checker">
      <p className="privacy-note">
        {isEs
          ? 'Autoevaluación: nadie ve tus respuestas. No lee cookies de ningún sitio ni determina cumplimiento legal.'
          : 'Self-assessment: nobody sees your answers. It does not read any site\u2019s cookies or determine legal compliance.'}
      </p>
      {QUESTIONS.map((item) => {
        const answer = answers[item.id]
        return (
          <div className="privacy-question" key={item.id}>
            <p>{isEs ? item.promptEs : item.promptEn}</p>
            <div className="privacy-buttons" role="group" aria-label={isEs ? item.promptEs : item.promptEn}>
              <button
                type="button"
                aria-pressed={answer === true}
                onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: true }))}
              >
                {isEs ? 'Sí' : 'Yes'}
              </button>
              <button
                type="button"
                aria-pressed={answer === false}
                onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: false }))}
              >
                {isEs ? 'No' : 'No'}
              </button>
            </div>
            {answer !== undefined && (
              <p className="privacy-guidance">{isEs ? item.guidanceEs : item.guidanceEn}</p>
            )}
          </div>
        )
      })}
      <p className="privacy-score" role="status">
        {isEs
          ? `Buenas prácticas: ${yesCount} de ${answered.length} respondidas.`
          : `Good practices: ${yesCount} of ${answered.length} answered yes-or-no.`}
      </p>
    </div>
  )
}
