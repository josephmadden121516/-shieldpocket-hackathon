import { useState } from 'react'
import './FirewallCheckup.css'

interface FirewallCheckupProps {
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
    id: 'router-password',
    promptEn: 'Did you change the router admin password from its factory default?',
    promptEs: '¿Cambiaste la contraseña de administración del router?',
    guidanceEn: 'Factory credentials are public knowledge. Change the admin password to something unique before anything else.',
    guidanceEs: 'Las credenciales de fábrica son públicas. Cambia la contraseña de administración por una única antes que nada.',
  },
  {
    id: 'device-firewall',
    promptEn: 'Is the built-in firewall turned on for your computers?',
    promptEs: '¿El firewall integrado está activado en tus computadoras?',
    guidanceEn: 'Windows and macOS ship with a capable firewall. Keep it on and allow new apps through it only deliberately.',
    guidanceEs: 'Windows y macOS traen un buen firewall. Mantenlo activado y permite nuevas apps solo a conciencia.',
  },
  {
    id: 'remote-admin',
    promptEn: 'Is remote administration of the router turned off?',
    promptEs: '¿La administración remota del router está desactivada?',
    guidanceEn: 'Remote admin exposes your router login to the whole internet. Keep it off unless you have a concrete, secured need.',
    guidanceEs: 'La administración remota expone tu router a todo internet. Mantenla desactivada salvo necesidad concreta y segura.',
  },
  {
    id: 'upnp',
    promptEn: 'Is UPnP disabled (or only on because something you trust needs it)?',
    promptEs: '¿UPnP está desactivado (o activo solo porque algo confiable lo necesita)?',
    guidanceEn: 'UPnP lets devices punch holes in the firewall automatically. Disable it and forward only the ports you chose yourself.',
    guidanceEs: 'UPnP permite a los dispositivos abrir el firewall solos. Desactívalo y abre solo los puertos que elijas.',
  },
  {
    id: 'guest-network',
    promptEn: 'Do visitors and smart-home gadgets use a guest network?',
    promptEs: '¿Visitantes y aparatos domésticos usan una red de invitados?',
    guidanceEn: 'Isolate guests and cheap IoT devices on a guest SSID so a compromised gadget cannot reach your computers.',
    guidanceEs: 'Aísla invitados y aparatos baratos en una red de invitados para que un aparato comprometido no alcance tus equipos.',
  },
  {
    id: 'firmware',
    promptEn: 'Was the router firmware updated in the last year?',
    promptEs: '¿El firmware del router se actualizó en el último año?',
    guidanceEn: 'Old firmware carries known bugs attackers scan for. Update once, then enable automatic updates if offered.',
    guidanceEs: 'El firmware viejo trae fallos conocidos que los atacantes buscan. Actualiza una vez y activa lo automático si existe.',
  },
]

export function FirewallCheckup({ language }: FirewallCheckupProps) {
  const isEs = language === 'es'
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const answered = QUESTIONS.filter((item) => answers[item.id] !== undefined)
  const yesCount = answered.filter((item) => answers[item.id]).length

  return (
    <div className="firewall-checkup">
      <p className="firewall-note">
        {isEs
          ? 'Guía y lista de revisión: nada aquí inspecciona ni cambia tus equipos automáticamente.'
          : 'Guidance plus a review checklist: nothing here inspects or changes your devices automatically.'}
      </p>
      {QUESTIONS.map((item) => {
        const answer = answers[item.id]
        return (
          <div className="firewall-question" key={item.id}>
            <p>{isEs ? item.promptEs : item.promptEn}</p>
            <div className="firewall-buttons" role="group" aria-label={isEs ? item.promptEs : item.promptEn}>
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
              <p className="firewall-guidance">{isEs ? item.guidanceEs : item.guidanceEn}</p>
            )}
          </div>
        )
      })}
      <p className="firewall-score" role="status">
        {isEs
          ? `Respuestas afirmativas: ${yesCount} de ${answered.length}.`
          : `Yes answers: ${yesCount} of ${answered.length}.`}
      </p>
    </div>
  )
}
