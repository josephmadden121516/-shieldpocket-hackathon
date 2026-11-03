import './Overview.css'

interface OverviewProps {
  language: 'en' | 'es'
}

interface SectionLink {
  id: string
  titleEn: string
  titleEs: string
  blurbEn: string
  blurbEs: string
}

const SECTIONS: SectionLink[] = [
  {
    id: 'war-room',
    titleEn: 'Guided war room',
    titleEs: 'Sala de guerra guiada',
    blurbEn: 'Scripted end-to-end tour',
    blurbEs: 'Recorrido guionado',
  },
  {
    id: 'threat-digest',
    titleEn: 'Daily digest',
    titleEs: 'Resumen diario',
    blurbEn: 'Overnight threats in one call',
    blurbEs: 'Amenazas nocturnas en una llamada',
  },
  {
    id: 'cve-triage',
    titleEn: 'CVE triage',
    titleEs: 'Priorización de CVE',
    blurbEn: 'Defensive fix checklist',
    blurbEs: 'Lista defensiva de corrección',
  },
  {
    id: 'patch-generator',
    titleEn: 'Patch proposals',
    titleEs: 'Propuestas de parche',
    blurbEn: 'Hardened drafts for review',
    blurbEs: 'Borradores reforzados',
  },
  {
    id: 'incident-timeline',
    titleEn: 'Timeline reconstruction',
    titleEs: 'Reconstrucción de cronología',
    blurbEn: 'Notes become a timeline',
    blurbEs: 'Notas convertidas en cronología',
  },
  {
    id: 'executive-board-briefing',
    titleEn: 'Board briefing',
    titleEs: 'Informe para la dirección',
    blurbEn: 'Local report, AI polish',
    blurbEs: 'Informe local con pulido IA',
  },
  {
    id: 'api-usage',
    titleEn: 'Usage meter',
    titleEs: 'Medidor de uso',
    blurbEn: 'Live spend and daily cap',
    blurbEs: 'Gasto en vivo y tope diario',
  },
  {
    id: 'threat-analyzer',
    titleEn: 'Threat analyzer',
    titleEs: 'Analizador de amenazas',
    blurbEn: 'AI verdict on a message',
    blurbEs: 'Veredicto IA de un mensaje',
  },
  {
    id: 'screenshot-analyzer',
    titleEn: 'Screenshot analysis',
    titleEs: 'Análisis de captura',
    blurbEn: 'AI verdict on a picture',
    blurbEs: 'Veredicto IA de una imagen',
  },
  {
    id: 'report-activity',
    titleEn: 'Report activity',
    titleEs: 'Reportar actividad',
    blurbEn: 'Log something suspicious',
    blurbEs: 'Registra algo sospechoso',
  },
  {
    id: 'saved-reports',
    titleEn: 'Saved reports',
    titleEs: 'Informes guardados',
    blurbEn: 'Your reports on this device',
    blurbEs: 'Tus informes en el dispositivo',
  },
  {
    id: 'sophia-assistant',
    titleEn: 'Sophia assistant',
    titleEs: 'Asistente Sophia',
    blurbEn: 'Talk or type with Sophia',
    blurbEs: 'Habla o escribe con Sophia',
  },
  {
    id: 'phishing-game',
    titleEn: 'Spot-the-phish game',
    titleEs: 'Juego: detecta el phishing',
    blurbEn: 'Training that sticks',
    blurbEs: 'Entrenamiento que funciona',
  },
  {
    id: 'link-checker',
    titleEn: 'Link safety checker',
    titleEs: 'Verificador de enlaces',
    blurbEn: 'Blocklist, age, lookalikes',
    blurbEs: 'Bloqueos, antigüedad, engaños',
  },
  {
    id: 'scam-analyzer',
    titleEn: 'Scam-text analyzer',
    titleEs: 'Analizador de mensajes',
    blurbEn: 'On-device text check',
    blurbEs: 'Revisión local de texto',
  },
  {
    id: 'threat-watcher',
    titleEn: 'Threat watcher',
    titleEs: 'Vigilante de amenazas',
    blurbEn: 'Watchlist vs. exploited CVEs',
    blurbEs: 'Lista contra CVE explotados',
  },
  {
    id: 'badge-studio',
    titleEn: 'Badge studio',
    titleEs: 'Estudio de insignias',
    blurbEn: 'Shareable safety badges',
    blurbEs: 'Insignias para compartir',
  },
  {
    id: 'compliance-map',
    titleEn: 'Compliance mapping',
    titleEs: 'Mapa de cumplimiento',
    blurbEn: 'Controls per framework',
    blurbEs: 'Controles por marco',
  },
  {
    id: 'attack-simulator',
    titleEn: 'Attack simulator',
    titleEs: 'Simulador de ataque',
    blurbEn: 'Hypothetical paths + graph',
    blurbEs: 'Rutas hipotéticas + gráfico',
  },
  {
    id: 'audit-lab',
    titleEn: 'Audit lab',
    titleEs: 'Laboratorio de auditoría',
    blurbEn: 'Synthetic log drills',
    blurbEs: 'Prácticas con registros',
  },
  {
    id: 'insurance-readiness',
    titleEn: 'Cyber-insurance readiness',
    titleEs: 'Preparación para ciberseguro',
    blurbEn: 'Pre-application prep',
    blurbEs: 'Preparación previa',
  },
  {
    id: 'phish-drills',
    titleEn: 'Phishing drills',
    titleEs: 'Simulacros de phishing',
    blurbEn: 'Safe training lures',
    blurbEs: 'Señuelos de entrenamiento',
  },
  {
    id: 'risk-metrics',
    titleEn: 'Risk metrics',
    titleEs: 'Métricas de riesgo',
    blurbEn: 'Scores at a glance',
    blurbEs: 'Puntajes de un vistazo',
  },
  {
    id: 'security-checkup',
    titleEn: 'Security checkup',
    titleEs: 'Revisión de seguridad',
    blurbEn: 'Small-business checklist',
    blurbEs: 'Lista para negocios',
  },
  {
    id: 'action-plan',
    titleEn: 'Action plan',
    titleEs: 'Plan de acción',
    blurbEn: 'AI-prioritized next steps',
    blurbEs: 'Próximos pasos con IA',
  },
  {
    id: 'device-posture',
    titleEn: 'Device posture',
    titleEs: 'Postura del dispositivo',
    blurbEn: 'Is this device hardened?',
    blurbEs: '¿Está reforzado el equipo?',
  },
  {
    id: 'firewall-checkup',
    titleEn: 'Firewall checkup',
    titleEs: 'Revisión de firewall',
    blurbEn: 'Router and filter review',
    blurbEs: 'Revisión de router y filtros',
  },
  {
    id: 'cookie-checker',
    titleEn: 'Cookie and privacy check',
    titleEs: 'Cookies y privacidad',
    blurbEn: 'Browser footprint review',
    blurbEs: 'Revisión de huella',
  },
  {
    id: 'password-checker',
    titleEn: 'Password checker',
    titleEs: 'Revisor de contraseñas',
    blurbEn: 'Local strength feedback',
    blurbEs: 'Fuerza evaluada en local',
  },
  {
    id: 'manual-checks',
    titleEn: 'Manual checks',
    titleEs: 'Verificaciones manuales',
    blurbEn: 'Things to verify by hand',
    blurbEs: 'Cosas que revisar a mano',
  },
  {
    id: 'hardening-guides',
    titleEn: 'Hardening guides',
    titleEs: 'Guías de refuerzo',
    blurbEn: 'Step-by-step lockdowns',
    blurbEs: 'Refuerzos paso a paso',
  },
  {
    id: 'incident-kit',
    titleEn: 'Incident response kit',
    titleEs: 'Kit de respuesta',
    blurbEn: 'Playbooks with tracking',
    blurbEs: 'Manuales con seguimiento',
  },
  {
    id: 'faq',
    titleEn: 'Questions',
    titleEs: 'Preguntas',
    blurbEn: 'How everything works',
    blurbEs: 'Cómo funciona todo',
  },
]

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Overview({ language }: OverviewProps) {
  const isEs = language === 'es'
  return (
    <div className="overview">
      <label className="overview-jump">
        {isEs ? 'Ir a una sección:' : 'Jump to a section:'}
        <select
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) scrollToSection(event.target.value)
            event.target.value = ''
          }}
          aria-label={isEs ? 'Secciones' : 'Sections'}
        >
          <option value="" disabled>
            {isEs ? 'Elige…' : 'Choose…'}
          </option>
          {SECTIONS.map((section) => (
            <option key={section.id} value={section.id}>
              {isEs ? section.titleEs : section.titleEn}
            </option>
          ))}
        </select>
      </label>
      <ul className="overview-grid">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(section.id)
              }}
            >
              <strong>{isEs ? section.titleEs : section.titleEn}</strong>
              <span>{isEs ? section.blurbEs : section.blurbEn}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
