import { isSupabaseConfigured, supabase } from './supabase'
import { assertWithinDailyBudget, trackUsage } from './usageMeter'
import type { SophiaFollowUpMessage } from './sophiaFollowUp'

const MAX_INPUT_LENGTH = 12000
const MAX_NOTE_LENGTH = 2000
const MAX_IMAGE_LENGTH = 8000000
const MAX_CHAT_LENGTH = 4000

function requireBackend(feature: string): void {
  assertWithinDailyBudget()
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      `${feature} is not configured. Check the Supabase environment settings.`,
    )
  }
}

function readAnalysis(data: unknown, emptyMessage: string): string {
  const analysis =
    data !== null && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, unknown>).analysis
      : null
  const trimmed = typeof analysis === 'string' ? analysis.trim() : ''
  if (!trimmed) {
    throw new Error(emptyMessage)
  }
  trackUsage(data)
  return trimmed
}

/** Defensive AI assessment of a pasted suspicious message. */
export async function requestThreatAnalysis(
  message: string,
  language: 'en' | 'es',
): Promise<string> {
  const trimmed = message.trim()
  if (!trimmed) {
    throw new Error('Paste a message to analyze first.')
  }
  if (trimmed.length > MAX_INPUT_LENGTH) {
    throw new Error(`Input must be ${MAX_INPUT_LENGTH} characters or fewer.`)
  }
  requireBackend('Threat analysis')
  const { data, error } = await supabase!.functions.invoke('analyze-threat', {
    body: { task: 'threat', message: trimmed, language },
  })
  if (error) throw error
  return readAnalysis(data, 'The AI service returned no assessment.')
}

/** Defensive AI assessment of a user-supplied screenshot. */
export async function requestScreenshotAnalysis(
  imageDataUrl: string,
  note: string,
  language: 'en' | 'es',
): Promise<string> {
  if (!imageDataUrl.startsWith('data:image/')) {
    throw new Error('Choose an image file first.')
  }
  if (imageDataUrl.length > MAX_IMAGE_LENGTH) {
    throw new Error('That image is too large to analyze.')
  }
  const trimmedNote = note.trim()
  if (trimmedNote.length > MAX_NOTE_LENGTH) {
    throw new Error(`Note must be ${MAX_NOTE_LENGTH} characters or fewer.`)
  }
  requireBackend('Screenshot analysis')
  const { data, error } = await supabase!.functions.invoke('analyze-threat', {
    body: { task: 'vision', image: imageDataUrl, message: trimmedNote, language },
  })
  if (error) throw error
  return readAnalysis(data, 'The AI service returned no assessment.')
}

/** Prioritized security action plan for a small business description. */
export async function requestActionPlan(
  description: string,
  language: 'en' | 'es',
): Promise<string> {
  const trimmed = description.trim()
  if (!trimmed) {
    throw new Error('Describe the business setup first.')
  }
  if (trimmed.length > MAX_INPUT_LENGTH) {
    throw new Error(`Input must be ${MAX_INPUT_LENGTH} characters or fewer.`)
  }
  requireBackend('Action planning')
  const { data, error } = await supabase!.functions.invoke('analyze-threat', {
    body: { task: 'actionplan', message: trimmed, language },
  })
  if (error) throw error
  return readAnalysis(data, 'The AI service returned no plan.')
}

/** Standalone chat turn with Sophia (no bundled result context). */
export async function requestSophiaChat(
  message: string,
  history: SophiaFollowUpMessage[],
  language: 'en' | 'es',
): Promise<string> {
  const trimmed = message.trim()
  if (!trimmed) {
    throw new Error('Type a message for Sophia first.')
  }
  if (trimmed.length > MAX_CHAT_LENGTH) {
    throw new Error(`Message must be ${MAX_CHAT_LENGTH} characters or fewer.`)
  }
  requireBackend('Sophia')
  const priorTurns = history
    .filter(
      (item) =>
        (item.role === 'user' || item.role === 'assistant') &&
        item.content.trim().length > 0,
    )
    .slice(-8)
  const prompt =
    language === 'es'
      ? `Responde en español.\n\n${trimmed}`
      : trimmed
  const { data, error } = await supabase!.functions.invoke('sophia-chat', {
    body: { message: prompt, history: priorTurns },
  })
  if (error) throw error
  if (data?.error) {
    throw new Error(
      typeof data.error === 'string' ? data.error : 'Sophia could not respond.',
    )
  }
  const reply = typeof data?.reply === 'string' ? data.reply.trim() : ''
  if (!reply) {
    throw new Error('Sophia returned an empty response.')
  }
  trackUsage(data)
  return reply
}
