import { useState } from 'react'
import './DevicePosture.css'

interface DevicePostureProps {
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
    id: 'screen-lock',
    promptEn: 'Does the screen lock by itself within a couple of minutes?',
    promptEs: '¿La pantalla se bloquea sola en un par de minutos?',
    guidanceEn: 'A short auto-lock window protects a lost or unattended phone. Require a PIN, fingerprint, or face to reopen.',
    guidanceEs: 'Un bloqueo rápido protege un teléfono perdido o desatendido. Exige PIN, huella o rostro para reabrir.',
  },
  {
    id: 'updates',
    promptEn: 'Are operating-system updates installed promptly?',
    promptEs: '¿Las actualizaciones del sistema se instalan pronto?',
    guidanceEn: 'Updates carry security fixes. Enable automatic updates so patches land without you remembering.',
    guidanceEs: 'Las actualizaciones traen correcciones. Activa lo automático para no depender de tu memoria.',
  },
  {
    id: 'encryption',
    promptEn: 'Is device encryption turned on?',
    promptEs: '¿El cifrado del dispositivo está activado?',
    guidanceEn: 'Encryption makes a stolen phone unreadable without your unlock. It is on by default on modern phones once a lock is set.',
    guidanceEs: 'El cifrado vuelve ilegible un teléfono robado sin tu desbloqueo. Suele activarse solo al poner bloqueo.',
  },
  {
    id: 'stores-only',
    promptEn: 'Do apps come only from the official store?',
    promptEs: '¿Las apps vienen solo de la tienda oficial?',
    guidanceEn: 'Sideloaded apps bypass store review. Keep installs store-only and uninstall apps you no longer use.',
    guidanceEs: 'Las apps externas evaden la revisión de la tienda. Instala solo de la tienda y borra lo que no uses.',
  },
  {
    id: 'backup',
    promptEn: 'Is there a recent backup you could restore from?',
    promptEs: '¿Hay una copia reciente que podrías restaurar?',
    guidanceEn: 'Backups turn ransomware and dead phones into inconveniences. Verify the last backup date today.',
    guidanceEs: 'Las copias convierten el ransomware y los teléfonos muertos en molestias. Verifica la fecha hoy.',
  },
  {
    id: 'public-wifi',
    promptEn: 'Do you avoid sensitive logins on open public Wi-Fi?',
    promptEs: '¿Evitas sesiones delicadas en Wi-Fi público abierto?',
    guidanceEn: 'Open hotspots invite snooping. Use mobile data or a trusted VPN for banking and work logins.',
    guidanceEs: 'Las redes abiertas invitan a espiar. Usa datos móviles o una VPN confiable para banco y trabajo.',
  },
]

function verdict(yes: number, total: number, language: 'en' | 'es'): string {
  if (total === 0) return language === 'es' ? 'Sin evaluar' : 'Not assessed'
  const ratio = yes / total
  if (ratio >= 0.85) return language === 'es' ? 'Buena postura' : 'Good posture'
  if (ratio >= 0.5) return language === 'es' ? 'Postura aceptable' : 'Fair posture'
  return language === 'es' ? 'Postura débil' : 'Weak posture'
}

export function DevicePosture({ language }: DevicePostureProps) {
  const isEs = language === 'es'
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const answered = QUESTIONS.filter((item) => answers[item.id] !== undefined)
  const yesCount = answered.filter((item) => answers[item.id]).length

  return (
    <div className="device-posture">
      <p className="device-note">
        {isEs
          ? 'Autoevaluación local del dispositivo que usas a diario.'
          : 'Local self-assessment of the device you use every day.'}
      </p>
      {QUESTIONS.map((item) => {
        const answer = answers[item.id]
        return (
          <div className="device-question" key={item.id}>
            <p>{isEs ? item.promptEs : item.promptEn}</p>
            <div className="device-buttons" role="group" aria-label={isEs ? item.promptEs : item.promptEn}>
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
              <p className="device-guidance">{isEs ? item.guidanceEs : item.guidanceEn}</p>
            )}
          </div>
        )
      })}
      <p className="device-score" role="status">
        {verdict(yesCount, answered.length, language)} ({yesCount}/{answered.length})
      </p>
    </div>
  )
}
