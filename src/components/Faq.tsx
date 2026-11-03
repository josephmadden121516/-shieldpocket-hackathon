import './Faq.css'

interface FaqProps {
  language: 'en' | 'es'
}

interface FaqEntry {
  questionEn: string
  answerEn: string
  questionEs: string
  answerEs: string
}

const ENTRIES: FaqEntry[] = [
  {
    questionEn: 'What is the guided war-room tour?',
    answerEn:
      'A scripted demo that drives the real modules end to end: digest, CVE triage, patch draft, timeline, briefing, then the meter. AI steps run through the same metered paths as manual use, so daily caps apply.',
    questionEs: '¿Qué es el recorrido guiado?',
    answerEs:
      'Una demostración guionada que opera los módulos reales de principio a fin: resumen, priorización de CVE, parche, cronología, informe y medidor. Los pasos de IA usan las mismas rutas medidas que el uso manual, con topes diarios.',
  },
  {
    questionEn: 'What does the usage meter track?',
    answerEn:
      'The cost of every AI call, computed from the token usage each call returns. When the daily cap is reached, new AI calls are blocked until you raise it. Spend is stored only in this browser.',
    questionEs: '¿Qué mide el medidor de uso?',
    answerEs:
      'El costo de cada llamada de IA, calculado desde los tokens que cada llamada reporta. Al alcanzar el tope diario, se bloquean nuevas llamadas hasta que lo aumentes. El gasto se guarda solo en este navegador.',
  },
  {
    questionEn: 'What works without backend credentials?',
    answerEn:
      'The badge studio, scam-text analyzer, risk metrics, local briefing generation, and the meter display all run fully offline. AI features show a "not configured" notice instead of calling the server.',
    questionEs: '¿Qué funciona sin credenciales?',
    answerEs:
      'El estudio de insignias, el analizador de mensajes, las métricas de riesgo, la generación local de informes y el medidor funcionan sin conexión. Las funciones de IA muestran un aviso en lugar de llamar al servidor.',
  },
  {
    questionEn: 'Which AI model answers?',
    answerEn:
      "Meta's Muse Spark model, called through the Meta Model API. The API key stays on the server inside Supabase Edge Functions and never reaches the browser.",
    questionEs: '¿Qué modelo de IA responde?',
    answerEs:
      'El modelo Muse Spark de Meta, llamado mediante la API de modelos de Meta. La clave queda en el servidor dentro de las funciones de Supabase y nunca llega al navegador.',
  },
  {
    questionEn: 'Is anything applied or saved automatically?',
    answerEn:
      'No. Patches are drafts for human review, analyses run only when you explicitly request them, and this demo runs on bundled sample data.',
    questionEs: '¿Algo se aplica o se guarda solo?',
    answerEs:
      'No. Los parches son borradores para revisión humana, los análisis solo se ejecutan cuando los solicitas, y esta demo usa datos de ejemplo incluidos.',
  },
  {
    questionEn: 'What do Ask Sophia follow-ups send?',
    answerEn:
      'Each question plus a short excerpt of the result under discussion, sent through Supabase to Meta and metered like any other AI call.',
    questionEs: '¿Qué envían las preguntas a Sophia?',
    answerEs:
      'Cada pregunta más un fragmento del resultado discutido, enviados por Supabase a Meta y medidos como cualquier llamada de IA.',
  },
  {
    questionEn: 'Does spoken narration use AI credits?',
    answerEn:
      'No. Narration uses the built-in speech synthesis on your device: no audio or text leaves the device for it.',
    questionEs: '¿La narración consume créditos?',
    answerEs:
      'No. La narración usa la síntesis de voz del propio dispositivo: ningún audio ni texto sale del dispositivo por ella.',
  },
  {
    questionEn: 'Are patch proposals safe to apply directly?',
    answerEn:
      'Treat them as drafts: each comes with rationale and rollback steps, but review and test every change before applying it anywhere real. Nothing is ever auto-applied.',
    questionEs: '¿Se pueden aplicar los parches tal cual?',
    answerEs:
      'Trátalos como borradores: cada uno trae justificación y pasos de reversión, pero revisa y prueba cada cambio antes de aplicarlo. Nada se aplica solo.',
  },
  {
    questionEn: 'Where do link and CVE intel come from?',
    answerEn:
      'Public read-only sources only: the Safe Browsing blocklist (when a key is configured), domain-age records, and lookalike heuristics for links; OSV, CISA KEV, and EPSS for vulnerabilities. Pages are never opened and nothing is executed.',
    questionEs: '¿De dónde sale la información de enlaces y CVE?',
    answerEs:
      'Solo de fuentes públicas de lectura: la lista de Safe Browsing (si hay clave), registros de antigüedad y heurísticas para enlaces; OSV, CISA KEV y EPSS para vulnerabilidades. Nunca se abren páginas ni se ejecuta nada.',
  },
  {
    questionEn: 'Are the phishing game emails real?',
    answerEn:
      'No. Every round is fictional training content written fresh by the AI: clearly-legitimate emails mixed with clearly-fictional phish attempts. No real person or company is impersonated.',
    questionEs: '¿Los correos del juego son reales?',
    answerEs:
      'No. Cada ronda es contenido ficticio de entrenamiento escrito por la IA: correos legítimos mezclados con intentos de phishing ficticios. No se suplanta a ninguna persona o empresa real.',
  },
  {
    questionEn: 'What is the insurance readiness report?',
    answerEn:
      'A preliminary checklist-style report that prepares a business profile for a cyber-insurance conversation. It is not insurance, legal advice, or proof of coverage: review it with your insurer or broker.',
    questionEs: '¿Qué es el informe de preparación para ciberseguro?',
    answerEs:
      'Un informe preliminar que prepara un perfil de negocio para conversar sobre ciberseguros. No es un seguro, asesoría legal ni prueba de cobertura: revísalo con tu aseguradora o corredor.',
  },
  {
    questionEn: 'Which languages are supported?',
    answerEn:
      'English and Spanish throughout the app, including Sophia follow-ups and spoken narration. Switch anytime with the EN/ES toggle.',
    questionEs: '¿Qué idiomas hay?',
    answerEs:
      'Inglés y español en toda la app, incluidas las preguntas a Sophia y la narración hablada. Cambia cuando quieras con el botón EN/ES.',
  },
]

export function Faq({ language }: FaqProps) {
  const isEs = language === 'es'
  return (
    <div className="faq-list">
      {ENTRIES.map((entry) => (
        <details className="faq-item" key={entry.questionEn}>
          <summary className="faq-question">
            {isEs ? entry.questionEs : entry.questionEn}
          </summary>
          <p className="faq-answer">{isEs ? entry.answerEs : entry.answerEn}</p>
        </details>
      ))}
    </div>
  )
}
