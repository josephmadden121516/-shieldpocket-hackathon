import { useChecklist } from '../lib/useChecklist'
import './ManualChecks.css'

interface ManualChecksProps {
  language: 'en' | 'es'
}

interface CheckItem {
  id: string
  labelEn: string
  labelEs: string
}

const ITEMS: CheckItem[] = [
  {
    id: 'verify-payment',
    labelEn: 'Verify unexpected payment requests by phone before paying',
    labelEs: 'Verifica por teléfono los pagos inesperados antes de pagar',
  },
  {
    id: 'bank-statements',
    labelEn: 'Review bank and card statements for unknown charges',
    labelEs: 'Revisa estados bancarios por cargos desconocidos',
  },
  {
    id: 'login-alerts',
    labelEn: 'Check email and bank login alerts for unknown sessions',
    labelEs: 'Revisa alertas de sesión desconocidas en correo y banco',
  },
  {
    id: 'app-permissions',
    labelEn: 'Review phone app permissions once a year',
    labelEs: 'Revisa los permisos de apps del teléfono cada año',
  },
  {
    id: 'backup-restore',
    labelEn: 'Test-restoring one file from backup',
    labelEs: 'Prueba restaurar un archivo de la copia',
  },
  {
    id: 'recovery-email',
    labelEn: 'Confirm the recovery email and phone on key accounts',
    labelEs: 'Confirma correo y teléfono de recuperación en cuentas clave',
  },
  {
    id: 'shred-mail',
    labelEn: 'Shred sensitive paper mail instead of binning it',
    labelEs: 'Tritura el correo delicado en vez de tirarlo',
  },
  {
    id: 'credit-report',
    labelEn: 'Pull a free credit report and scan for unknown accounts',
    labelEs: 'Pide tu reporte de crédito gratis y busca cuentas ajenas',
  },
]

const STORAGE_KEY = 'manual-checks'

export function ManualChecks({ language }: ManualChecksProps) {
  const isEs = language === 'es'
  const list = useChecklist(
    STORAGE_KEY,
    ITEMS.map((item) => item.id),
  )

  return (
    <div className="manual-checks">
      <p className="manual-note">
        {isEs
          ? `Cosas que solo un humano puede verificar. Progreso guardado en este dispositivo: ${list.doneCount} de ${ITEMS.length}.`
          : `Things only a human can verify. Progress saved on this device: ${list.doneCount} of ${ITEMS.length}.`}
      </p>
      <ul className="manual-list">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={list.isChecked(item.id)}
                onChange={() => list.toggle(item.id)}
              />
              {isEs ? item.labelEs : item.labelEn}
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="manual-reset" onClick={list.reset}>
        {isEs ? 'Empezar de nuevo' : 'Start over'}
      </button>
    </div>
  )
}
