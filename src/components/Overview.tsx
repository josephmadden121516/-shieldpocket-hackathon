import './Overview.css'

interface OverviewProps {
  language: 'en' | 'es'
}

interface SectionLink {
  id: string
  titleEn: string
  titleEs: string
}

const SECTIONS: SectionLink[] = [
  { id: 'overview', titleEn: 'Overview (top)', titleEs: 'Resumen (arriba)' },
  { id: 'sophia-assistant', titleEn: 'Sophia assistant', titleEs: 'Asistente Sophia' },
  { id: 'threat-analyzer', titleEn: 'Threat analyzer', titleEs: 'Analizador de amenazas' },
  { id: 'api-usage', titleEn: 'Usage meter', titleEs: 'Medidor de uso' },
  { id: 'report-activity', titleEn: 'Report activity', titleEs: 'Reportar actividad' },
  { id: 'executive-board-briefing', titleEn: 'Board briefing', titleEs: 'Informe para la dirección' },
  { id: 'threat-digest', titleEn: 'Daily digest', titleEs: 'Resumen diario' },
  { id: 'threat-watcher', titleEn: 'Threat watcher', titleEs: 'Vigilante de amenazas' },
  { id: 'risk-metrics', titleEn: 'Risk metrics', titleEs: 'Métricas de riesgo' },
  { id: 'scam-analyzer', titleEn: 'Scam-text analyzer', titleEs: 'Analizador de mensajes' },
  { id: 'screenshot-analyzer', titleEn: 'Screenshot analysis', titleEs: 'Análisis de captura' },
  { id: 'cve-triage', titleEn: 'CVE triage', titleEs: 'Priorización de CVE' },
  { id: 'compliance-map', titleEn: 'Compliance mapping', titleEs: 'Mapa de cumplimiento' },
  { id: 'saved-reports', titleEn: 'Saved reports', titleEs: 'Informes guardados' },
  { id: 'security-checkup', titleEn: 'Security checkup', titleEs: 'Revisión de seguridad' },
  { id: 'action-plan', titleEn: 'Action plan', titleEs: 'Plan de acción' },
  { id: 'device-posture', titleEn: 'Device posture', titleEs: 'Postura del dispositivo' },
  { id: 'manual-checks', titleEn: 'Manual checks', titleEs: 'Verificaciones manuales' },
  { id: 'hardening-guides', titleEn: 'Hardening guides', titleEs: 'Guías de refuerzo' },
  { id: 'badge-studio', titleEn: 'Badge studio', titleEs: 'Estudio de insignias' },
  { id: 'firewall-checkup', titleEn: 'Firewall checkup', titleEs: 'Revisión de firewall' },
  { id: 'cookie-checker', titleEn: 'Cookie and privacy check', titleEs: 'Cookies y privacidad' },
  { id: 'password-checker', titleEn: 'Password checker', titleEs: 'Revisor de contraseñas' },
  { id: 'incident-kit', titleEn: 'Incident response kit', titleEs: 'Kit de respuesta' },
  { id: 'patch-generator', titleEn: 'Patch proposals', titleEs: 'Propuestas de parche' },
  { id: 'attack-simulator', titleEn: 'Attack simulator', titleEs: 'Simulador de ataque' },
  { id: 'audit-lab', titleEn: 'Audit lab', titleEs: 'Laboratorio de auditoría' },
  { id: 'phish-drills', titleEn: 'Phishing drills', titleEs: 'Simulacros de phishing' },
  { id: 'phishing-game', titleEn: 'Spot-the-phish game', titleEs: 'Juego: detecta el phishing' },
  { id: 'link-checker', titleEn: 'Link safety checker', titleEs: 'Verificador de enlaces' },
  { id: 'incident-timeline', titleEn: 'Timeline reconstruction', titleEs: 'Reconstrucción de cronología' },
  { id: 'insurance-readiness', titleEn: 'Cyber-insurance readiness', titleEs: 'Preparación para ciberseguro' },
  { id: 'war-room', titleEn: 'Guided war room', titleEs: 'Sala de guerra guiada' },
  { id: 'faq', titleEn: 'Questions', titleEs: 'Preguntas' },
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
            {isEs ? 'Elige una sección…' : 'Choose a section…'}
          </option>
          {SECTIONS.map((section) => (
            <option key={section.id} value={section.id}>
              {isEs ? section.titleEs : section.titleEn}
            </option>
          ))}
        </select>
      </label>
      <p className="overview-hint">
        {isEs
          ? 'O desplázate: las secciones siguen el mismo orden que en la app.'
          : 'Or just scroll: sections run in the same order as in the app.'}
      </p>
    </div>
  )
}
