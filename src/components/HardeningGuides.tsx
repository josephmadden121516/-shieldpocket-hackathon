import './HardeningGuides.css'

interface HardeningGuidesProps {
  language: 'en' | 'es'
}

interface Guide {
  id: string
  titleEn: string
  titleEs: string
  stepsEn: string[]
  stepsEs: string[]
}

const GUIDES: Guide[] = [
  {
    id: 'new-laptop',
    titleEn: 'Lock down a new laptop',
    titleEs: 'Asegura una laptop nueva',
    stepsEn: [
      'Install all operating-system updates before anything else.',
      'Turn on disk encryption and a firmware password if offered.',
      'Create a standard daily account; keep an admin account separate.',
      'Enable the built-in firewall and automatic updates.',
      'Install only the software you need, from official sources.',
    ],
    stepsEs: [
      'Instala todas las actualizaciones antes que nada.',
      'Activa el cifrado de disco y contraseña de firmware si existe.',
      'Crea una cuenta estándar diaria; deja el administrador aparte.',
      'Activa el firewall integrado y las actualizaciones automáticas.',
      'Instala solo lo necesario, desde fuentes oficiales.',
    ],
  },
  {
    id: 'home-router',
    titleEn: 'Secure a home router',
    titleEs: 'Asegura tu router casero',
    stepsEn: [
      'Change the admin password to something unique.',
      'Update the firmware to the latest release.',
      'Turn off remote administration and WPS.',
      'Put guests and smart gadgets on a guest network.',
      'Write down what you changed so the next review is quick.',
    ],
    stepsEs: [
      'Cambia la contraseña de administración por una única.',
      'Actualiza el firmware a la última versión.',
      'Desactiva la administración remota y WPS.',
      'Pon invitados y aparatos en una red de invitados.',
      'Anota lo que cambiaste para que la próxima revisión sea rápida.',
    ],
  },
  {
    id: 'email-account',
    titleEn: 'Harden an email account',
    titleEs: 'Refuerza una cuenta de correo',
    stepsEn: [
      'Set a long unique password with a password manager.',
      'Turn on two-step verification with an authenticator app.',
      'Remove old app passwords and unknown signed-in devices.',
      'Check forwarding rules and filters for entries you did not add.',
      'Confirm the recovery email and phone number are yours.',
    ],
    stepsEs: [
      'Pon una contraseña larga y única con un gestor.',
      'Activa la verificación en dos pasos con app autenticadora.',
      'Borra contraseñas de app viejas y dispositivos desconocidos.',
      'Revisa reglas de reenvío y filtros que no agregaste.',
      'Confirma que el correo y teléfono de recuperación son tuyos.',
    ],
  },
]

export function HardeningGuides({ language }: HardeningGuidesProps) {
  const isEs = language === 'es'
  return (
    <div className="hardening-guides">
      {GUIDES.map((guide) => (
        <details className="hardening-guide" key={guide.id}>
          <summary>{isEs ? guide.titleEs : guide.titleEn}</summary>
          <ol>
            {(isEs ? guide.stepsEs : guide.stepsEn).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  )
}
