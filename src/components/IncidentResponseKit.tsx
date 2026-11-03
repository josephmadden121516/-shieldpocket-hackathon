import { useChecklist } from '../lib/useChecklist'
import './IncidentResponseKit.css'

interface IncidentResponseKitProps {
  language: 'en' | 'es'
}

interface Playbook {
  id: string
  titleEn: string
  titleEs: string
  stepsEn: string[]
  stepsEs: string[]
}

const PLAYBOOKS: Playbook[] = [
  {
    id: 'compromised-account',
    titleEn: 'Compromised business account',
    titleEs: 'Cuenta comercial comprometida',
    stepsEn: [
      'Sign the attacker out everywhere: change the password, then revoke all sessions.',
      'Turn on two-step verification with an authenticator app.',
      'Check forwarding rules, filters, and connected apps for attacker additions.',
      'Warn anyone who received messages from the account during the window.',
      'Watch bank and email alerts daily for the next two weeks.',
    ],
    stepsEs: [
      'Cierra la sesión del atacante en todo: cambia la contraseña y revoca sesiones.',
      'Activa la verificación en dos pasos con app autenticadora.',
      'Revisa reenvíos, filtros y apps conectadas por agregados del atacante.',
      'Avisa a quienes recibieron mensajes de la cuenta en ese lapso.',
      'Vigila alertas de banco y correo a diario por dos semanas.',
    ],
  },
  {
    id: 'fraudulent-invoice',
    titleEn: 'Fraudulent invoice received',
    titleEs: 'Factura fraudulenta recibida',
    stepsEn: [
      'Pause the payment immediately and tell the team not to proceed.',
      'Call the supplier at a known number to verify the bank details.',
      'Report the message to your email provider as phishing.',
      'If money moved, call your bank fraud line within hours, not days.',
      'Document what happened so the next invoice gets a second pair of eyes.',
    ],
    stepsEs: [
      'Pausa el pago de inmediato y avisa al equipo que no siga.',
      'Llama al proveedor a un número conocido para verificar los datos.',
      'Reporta el mensaje como phishing a tu proveedor de correo.',
      'Si hubo dinero, llama a la línea de fraude del banco en horas.',
      'Documenta lo ocurrido para que la próxima factura tenga doble revisión.',
    ],
  },
  {
    id: 'lost-device',
    titleEn: 'Lost or stolen phone',
    titleEs: 'Teléfono perdido o robado',
    stepsEn: [
      'Lock or erase it remotely from your platform account page.',
      'Change the passwords of email, banking, and password-manager accounts.',
      'Remove the device from trusted-device lists.',
      'Ask your carrier about freezing the line against SIM swaps.',
      'Restore to a replacement from your verified backup.',
    ],
    stepsEs: [
      'Bloquéalo o bórralo a distancia desde tu cuenta de plataforma.',
      'Cambia contraseñas de correo, banco y gestor de contraseñas.',
      'Quítalo de las listas de dispositivos confiables.',
      'Pregunta a tu operadora por congelar la línea contra SIM swapping.',
      'Restaura en un reemplazo desde tu copia verificada.',
    ],
  },
]

const STORAGE_KEY = 'incident-kit'

export function IncidentResponseKit({ language }: IncidentResponseKitProps) {
  const isEs = language === 'es'
  const allIds = PLAYBOOKS.flatMap((book, bookIndex) =>
    book.stepsEn.map((_, stepIndex) => `${book.id}:${bookIndex}:${stepIndex}`),
  )
  const list = useChecklist(STORAGE_KEY, allIds)

  return (
    <div className="incident-kit">
      <p className="incident-note">
        {isEs
          ? `Manuales offline para las tres emergencias más comunes. Progreso guardado en este dispositivo: ${list.doneCount} de ${allIds.length} pasos.`
          : `Offline playbooks for the three most common emergencies. Progress saved on this device: ${list.doneCount} of ${allIds.length} steps.`}
      </p>
      {PLAYBOOKS.map((book, bookIndex) => (
        <details className="incident-playbook" key={book.id}>
          <summary>{isEs ? book.titleEs : book.titleEn}</summary>
          <ol>
            {(isEs ? book.stepsEs : book.stepsEn).map((step, stepIndex) => {
              const key = `${book.id}:${bookIndex}:${stepIndex}`
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={list.isChecked(key)}
                      onChange={() => list.toggle(key)}
                    />
                    {step}
                  </label>
                </li>
              )
            })}
          </ol>
        </details>
      ))}
      <button type="button" className="incident-reset" onClick={list.reset}>
        {isEs ? 'Empezar de nuevo' : 'Start over'}
      </button>
    </div>
  )
}
