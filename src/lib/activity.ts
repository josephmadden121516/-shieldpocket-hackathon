/**
 * Local activity record shared by the digest and the board briefing.
 * Shape matches what the event-built components read: an id, an owner
 * scope, a free-form type label, a title, a detail line, and an ISO
 * timestamp. No backend round-trip; demo data ships in demoData.ts.
 */
export interface SecurityActivityEvent {
  id: string
  ownerId: string
  type: string
  title: string
  detail: string
  occurredAt: string
}
