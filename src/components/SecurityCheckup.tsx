import { useChecklist } from '../lib/useChecklist'
import './SecurityCheckup.css'

interface SecurityCheckupProps {
  language: 'en' | 'es'
}

interface CheckGroup {
  id: string
  titleEn: string
  titleEs: string
  items: Array<{ id: string; labelEn: string; labelEs: string }>
}

const GROUPS: CheckGroup[] = [
  {
    id: 'accounts',
    titleEn: 'Accounts',
    titleEs: 'Cuentas',
    items: [
      { id: 'mfa', labelEn: 'Two-step verification on email and banking', labelEs: 'Verificación en dos pasos en correo y banco' },
      { id: 'unique-passwords', labelEn: 'Unique passwords via a password manager', labelEs: 'Contraseñas únicas con un gestor' },
      { id: 'admin-review', labelEn: 'Former staff and ex-contractors removed', labelEs: 'Ex-empleados y contratistas eliminados' },
    ],
  },
  {
    id: 'devices',
    titleEn: 'Devices',
    titleEs: 'Equipos',
    items: [
      { id: 'auto-updates', labelEn: 'Automatic OS updates enabled', labelEs: 'Actualizaciones automáticas activadas' },
      { id: 'screen-lock', labelEn: 'Short auto-lock with PIN or biometrics', labelEs: 'Bloqueo rápido con PIN o biometría' },
      { id: 'encryption', labelEn: 'Disk encryption turned on', labelEs: 'Cifrado de disco activado' },
    ],
  },
  {
    id: 'network',
    titleEn: 'Network',
    titleEs: 'Red',
    items: [
      { id: 'router-password', labelEn: 'Router admin password changed', labelEs: 'Contraseña del router cambiada' },
      { id: 'guest-wifi', labelEn: 'Separate guest Wi-Fi for visitors', labelEs: 'Wi-Fi de invitados separado' },
      { id: 'remote-off', labelEn: 'Router remote administration off', labelEs: 'Administración remota desactivada' },
    ],
  },
  {
    id: 'backups',
    titleEn: 'Backups',
    titleEs: 'Copias',
    items: [
      { id: 'backup-exists', labelEn: 'Automatic backups running', labelEs: 'Copias automáticas activas' },
      { id: 'backup-tested', labelEn: 'A restore tested this year', labelEs: 'Restauración probada este año' },
      { id: 'backup-offsite', labelEn: 'One copy kept off-site or in cloud', labelEs: 'Una copia fuera del local o en nube' },
    ],
  },
]

const STORAGE_KEY = 'security-checkup'

export function SecurityCheckup({ language }: SecurityCheckupProps) {
  const isEs = language === 'es'
  const allIds = GROUPS.flatMap((group) => group.items.map((item) => `${group.id}:${item.id}`))
  const list = useChecklist(STORAGE_KEY, allIds)
  const percent = Math.round((list.doneCount / allIds.length) * 100)

  return (
    <div className="security-checkup">
      <p className="checkup-note">
        {isEs
          ? `Lista para negocios pequeños. Progreso guardado en este dispositivo: ${list.doneCount} de ${allIds.length}. Completarla no certifica nada.`
          : `Small-business checklist. Progress saved on this device: ${list.doneCount} of ${allIds.length}. Finishing it certifies nothing.`}
      </p>
      <div
        className="checkup-progress"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isEs ? 'Progreso' : 'Progress'}
      >
        <div className="checkup-bar" style={{ width: `${percent}%` }} />
      </div>
      {GROUPS.map((group) => (
        <div className="checkup-group" key={group.id}>
          <h3>{isEs ? group.titleEs : group.titleEn}</h3>
          <ul>
            {group.items.map((item) => {
              const key = `${group.id}:${item.id}`
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={list.isChecked(key)}
                      onChange={() => list.toggle(key)}
                    />
                    {isEs ? item.labelEs : item.labelEn}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <button type="button" className="checkup-reset" onClick={list.reset}>
        {isEs ? 'Empezar de nuevo' : 'Start over'}
      </button>
    </div>
  )
}
