import { useMemo, useState } from 'react'
import './App.css'
import { getSampleActivityEvents, getSampleReports } from './lib/demoData'
import { Overview } from './components/Overview'
import { WarRoomDemo } from './components/WarRoomDemo'
import { ThreatDigest } from './components/ThreatDigest'
import { CveTriageAssistant } from './components/CveTriageAssistant'
import { PatchGenerator } from './components/PatchGenerator'
import { IncidentTimelineReconstructor } from './components/IncidentTimelineReconstructor'
import { ExecutiveBoardBriefing } from './components/ExecutiveBoardBriefing'
import { UsageMeter } from './components/UsageMeter'
import { PhishingGame } from './components/PhishingGame'
import { LinkSafetyChecker } from './components/LinkSafetyChecker'
import { ScamTextAnalyzer } from './components/ScamTextAnalyzer'
import { ThreatWatcher } from './components/ThreatWatcher'
import { BadgeStudio } from './components/BadgeStudio'
import { ComplianceFrameworkMapper } from './components/ComplianceFrameworkMapper'
import { AttackTreeSimulator } from './components/AttackTreeSimulator'
import { SyntheticAuditLab } from './components/SyntheticAuditLab'
import { CyberInsuranceReadiness } from './components/CyberInsuranceReadiness'
import { PhishDrillGenerator } from './components/PhishDrillGenerator'
import { Faq } from './components/Faq'
import { SecurityCheckup } from './components/SecurityCheckup'
import { DevicePosture } from './components/DevicePosture'
import { FirewallCheckup } from './components/FirewallCheckup'
import { CookiePrivacyChecker } from './components/CookiePrivacyChecker'
import { PasswordChecker } from './components/PasswordChecker'
import { ManualChecks } from './components/ManualChecks'
import { HardeningGuides } from './components/HardeningGuides'
import { IncidentResponseKit } from './components/IncidentResponseKit'
import { ThreatAnalyzer } from './components/ThreatAnalyzer'
import { ScreenshotAnalyzer } from './components/ScreenshotAnalyzer'
import { ReportActivity } from './components/ReportActivity'
import { SavedReports } from './components/SavedReports'
import { ActionPlan } from './components/ActionPlan'
import { SophiaAssistant } from './components/SophiaAssistant'
import CisoMetricsWidget from './CisoMetricsWidget'

type Language = 'en' | 'es'

function sampleChecklist(language: Language): Array<{ title: string; completed: boolean }> {
  return language === 'es'
    ? [
        { title: 'Activar la verificación en dos pasos', completed: true },
        { title: 'Activar las actualizaciones automáticas', completed: true },
        { title: 'Revisar los accesos de administrador', completed: false },
        { title: 'Probar la restauración de copias de seguridad', completed: false },
      ]
    : [
        { title: 'Turn on two-step verification', completed: true },
        { title: 'Turn on automatic updates', completed: true },
        { title: 'Review administrator access', completed: false },
        { title: 'Test backup restores', completed: false },
      ]
}

function sampleIncidentProgress(language: Language) {
  return {
    scenarios: [
      {
        scenarioTitle:
          language === 'es' ? 'Cuenta comercial comprometida' : 'Compromised business account',
        completedSteps: language === 'es'
          ? ['Aislar la sesión', 'Restablecer credenciales']
          : ['Isolate the session', 'Reset credentials'],
        totalSteps: 5,
      },
      {
        scenarioTitle:
          language === 'es' ? 'Factura fraudulenta recibida' : 'Fraudulent invoice received',
        completedSteps: language === 'es' ? ['Pausar el pago'] : ['Pause the payment'],
        totalSteps: 4,
      },
    ],
    storageError: false,
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const isEs = language === 'es'

  const reports = useMemo(() => getSampleReports(language), [language])
  const activity = useMemo(() => getSampleActivityEvents(language), [language])
  const [assessment, setAssessment] = useState('')

  const assessmentValue = assessment || reports[0]?.summary || ''
  const digestReports = useMemo(
    () => reports.map((report) => ({ risk_level: report.risk_level, summary: report.summary })),
    [reports],
  )
  const savedReports = useMemo(
    () =>
      reports.map((report) => ({
        id: report.id,
        risk_level: report.risk_level,
        summary: report.summary,
        created_at: report.created_at,
      })),
    [reports],
  )
  const checklistTasks = useMemo(() => sampleChecklist(language), [language])
  const incidentProgress = useMemo(() => sampleIncidentProgress(language), [language])

  return (
    <div className="shell">
      <header className="shell-header">
        <div>
          <h1>ShieldPocket</h1>
          <p>
            {isEs
              ? 'Asistente de seguridad de bolsillo: todos los módulos siguientes se construyeron durante el hackatón.'
              : 'Pocket-sized security assistant: every module below was built during the hackathon.'}
          </p>
        </div>
        <div className="language-toggle" role="group" aria-label="Language / Idioma">
          <button type="button" aria-pressed={!isEs} onClick={() => setLanguage('en')}>
            EN
          </button>
          <button type="button" aria-pressed={isEs} onClick={() => setLanguage('es')}>
            ES
          </button>
        </div>
      </header>

      <div className="demo-note">
        {isEs
          ? 'Modo de demostración con datos de ejemplo: no se requiere inicio de sesión. Las funciones de IA necesitan el backend configurado; sin él muestran un aviso en lugar de llamar al servidor.'
          : 'Sample-data demo mode: no sign-in needed. AI features need the backend configured; without it they show a notice instead of calling the server.'}
      </div>

      <section className="demo-section" id="overview" aria-label={isEs ? 'Resumen' : 'Overview'}>
        <h2>{isEs ? 'Resumen' : 'Overview'}</h2>
        <p className="section-lede">
          {isEs
            ? 'Todos los módulos en un lugar; salta a cualquiera.'
            : 'Every module in one place; jump to any of them.'}
        </p>
        <Overview language={language} />
      </section>

      <section className="demo-section" id="war-room" aria-label={isEs ? 'Demostración guiada' : 'Guided demo'}>
        <h2>{isEs ? 'Sala de guerra guiada' : 'Guided war room'}</h2>
        <p className="section-lede">
          {isEs
            ? 'Un recorrido guionado que opera los módulos reales de principio a fin.'
            : 'A scripted tour that drives the real modules end to end.'}
        </p>
        <WarRoomDemo language={language} />
      </section>

      <section className="demo-section" id="threat-digest">
        <h2>{isEs ? 'Resumen diario' : 'Daily digest'}</h2>
        <ThreatDigest language={language} reports={digestReports} activity={activity} />
      </section>

      <section className="demo-section" id="cve-triage">
        <h2>{isEs ? 'Priorización de CVE' : 'CVE triage'}</h2>
        <CveTriageAssistant language={language} />
      </section>

      <section className="demo-section" id="patch-generator">
        <h2>{isEs ? 'Propuestas de parche' : 'Patch proposals'}</h2>
        <PatchGenerator language={language} />
      </section>

      <section className="demo-section" id="incident-timeline">
        <h2>{isEs ? 'Reconstrucción de cronología' : 'Timeline reconstruction'}</h2>
        <IncidentTimelineReconstructor language={language} />
      </section>

      <section className="demo-section" id="executive-board-briefing">
        <h2>{isEs ? 'Informe para la dirección' : 'Board briefing'}</h2>
        <ExecutiveBoardBriefing
          language={language}
          activityEvents={activity}
          savedReports={savedReports}
          checklistTasks={checklistTasks}
          incidentProgress={incidentProgress}
        />
      </section>

      <section className="demo-section" id="api-usage">
        <h2>{isEs ? 'Medidor de uso' : 'Usage meter'}</h2>
        <UsageMeter language={language} />
      </section>

      <section className="demo-section" id="phishing-game">
        <h2>{isEs ? 'Juego: detecta el phishing' : 'Spot-the-phish game'}</h2>
        <PhishingGame language={language} />
      </section>

      <section className="demo-section" id="link-checker">
        <h2>{isEs ? 'Verificador de enlaces' : 'Link safety checker'}</h2>
        <LinkSafetyChecker language={language} />
      </section>

      <section className="demo-section" id="scam-analyzer">
        <h2>{isEs ? 'Analizador de mensajes' : 'Scam-text analyzer'}</h2>
        <ScamTextAnalyzer language={language} />
      </section>

      <section className="demo-section" id="threat-watcher">
        <h2>{isEs ? 'Vigilante de amenazas' : 'Threat watcher'}</h2>
        <ThreatWatcher language={language} />
      </section>

      <section className="demo-section" id="badge-studio">
        <h2>{isEs ? 'Estudio de insignias' : 'Badge studio'}</h2>
        <BadgeStudio language={language} />
      </section>

      <section className="demo-section" id="compliance-map">
        <h2>{isEs ? 'Mapa de cumplimiento' : 'Compliance mapping'}</h2>
        <p className="section-lede">
          {isEs
            ? 'Edita el resumen a evaluar; se envía al asesor solo al solicitar el mapa.'
            : 'Edit the summary under review; it is sent to the advisor only when you request the map.'}
        </p>
        <textarea
          className="assessment-field"
          value={assessmentValue}
          onChange={(event) => setAssessment(event.target.value)}
          aria-label={isEs ? 'Resumen a evaluar' : 'Summary under review'}
        />
        <ComplianceFrameworkMapper language={language} assessment={assessmentValue} />
      </section>

      <section className="demo-section" id="attack-simulator">
        <h2>{isEs ? 'Simulador de ataque' : 'Attack simulator'}</h2>
        <AttackTreeSimulator language={language} />
      </section>

      <section className="demo-section" id="audit-lab">
        <h2>{isEs ? 'Laboratorio de auditoría' : 'Audit lab'}</h2>
        <SyntheticAuditLab language={language} />
      </section>

      <section className="demo-section" id="insurance-readiness">
        <h2>{isEs ? 'Preparación para ciberseguro' : 'Cyber-insurance readiness'}</h2>
        <CyberInsuranceReadiness language={language} />
      </section>

      <section className="demo-section" id="phish-drills">
        <h2>{isEs ? 'Simulacros de phishing' : 'Phishing drills'}</h2>
        <PhishDrillGenerator language={language} />
      </section>

      <section className="demo-section" id="risk-metrics">
        <h2>{isEs ? 'Métricas de riesgo' : 'Risk metrics'}</h2>
        <CisoMetricsWidget />
      </section>

      <section className="demo-section" id="threat-analyzer">
        <h2>{isEs ? 'Analizador de amenazas' : 'Threat analyzer'}</h2>
        <ThreatAnalyzer language={language} />
      </section>

      <section className="demo-section" id="screenshot-analyzer">
        <h2>{isEs ? 'Análisis de captura' : 'Screenshot analysis'}</h2>
        <ScreenshotAnalyzer language={language} />
      </section>

      <section className="demo-section" id="report-activity">
        <h2>{isEs ? 'Reportar actividad' : 'Report activity'}</h2>
        <ReportActivity language={language} />
      </section>

      <section className="demo-section" id="saved-reports">
        <h2>{isEs ? 'Informes guardados' : 'Saved reports'}</h2>
        <SavedReports language={language} />
      </section>

      <section className="demo-section" id="action-plan">
        <h2>{isEs ? 'Plan de acción' : 'Action plan'}</h2>
        <ActionPlan language={language} />
      </section>

      <section className="demo-section" id="sophia-assistant">
        <h2>{isEs ? 'Asistente Sophia' : 'Sophia assistant'}</h2>
        <SophiaAssistant language={language} />
      </section>

      <section className="demo-section" id="security-checkup">
        <h2>{isEs ? 'Revisión de seguridad' : 'Security checkup'}</h2>
        <SecurityCheckup language={language} />
      </section>

      <section className="demo-section" id="device-posture">
        <h2>{isEs ? 'Postura del dispositivo' : 'Device posture'}</h2>
        <DevicePosture language={language} />
      </section>

      <section className="demo-section" id="firewall-checkup">
        <h2>{isEs ? 'Revisión de firewall' : 'Firewall checkup'}</h2>
        <FirewallCheckup language={language} />
      </section>

      <section className="demo-section" id="cookie-checker">
        <h2>{isEs ? 'Cookies y privacidad' : 'Cookie and privacy check'}</h2>
        <CookiePrivacyChecker language={language} />
      </section>

      <section className="demo-section" id="password-checker">
        <h2>{isEs ? 'Revisor de contraseñas' : 'Password checker'}</h2>
        <PasswordChecker language={language} />
      </section>

      <section className="demo-section" id="manual-checks">
        <h2>{isEs ? 'Verificaciones manuales' : 'Manual checks'}</h2>
        <ManualChecks language={language} />
      </section>

      <section className="demo-section" id="hardening-guides">
        <h2>{isEs ? 'Guías de refuerzo' : 'Hardening guides'}</h2>
        <HardeningGuides language={language} />
      </section>

      <section className="demo-section" id="incident-kit">
        <h2>{isEs ? 'Kit de respuesta' : 'Incident response kit'}</h2>
        <IncidentResponseKit language={language} />
      </section>

      <section className="demo-section" id="faq">
        <h2>{isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}</h2>
        <Faq language={language} />
      </section>
    </div>
  )
}
