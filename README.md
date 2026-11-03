# ShieldPocket — Hackathon Submission

> Event-work disclosure (read first): every file in this repo was written
> during the hackathon window, after the Oct 28 kickoff. No pre-event code,
> prototype files, backups, or old git history were carried over. The only
> things used from outside the event are: fresh framework packages installed
> via npm, public read-only threat-data feeds (OSV, CISA KEV, EPSS, the Safe
> Browsing blocklist, RDAP), and the hosting project shells (Vercel +
> Supabase). All app code was written during the event with AI coding
> assistance (Muse Code).

## What this is

ShieldPocket is a pocket-sized security assistant: it summarizes threats, triages CVEs, drafts remediation patches, reconstructs incident timelines, and briefs the board. Every AI answer runs on Meta's Muse model and is metered live against a daily budget.

## What judges should open first

Run the guided war-room tour first (it drives the digest, triage, patch, timeline, briefing, and meter sections end to end), then play the spot-the-phish game, then try the link checker, scam-text analyzer, and threat watcher.

## Event-work manifest

`HACKATHON.md` maps each feature to the commit that introduced it. All commits
in this repo postdate the kickoff.

## Quick start

```sh
npm install
npm run dev
```

Then open the printed localhost URL. No sign-in is needed: the app opens directly in sample-data demo mode. Start at the Overview menu, then run the guided war-room tour.

Without backend credentials the local run still works for the overview, checkups (security, firewall, device, cookie, password), playbooks, guides, manual checks, badge studio, scam-text analyzer, risk metrics, local briefing generation, local reports, FAQ, and the meter display; AI features show a "not configured" message instead of calling the backend.

Hosted build (same code, backend configured): https://shieldpocket-ai-orcin.vercel.app

## Phone demo

On an iPhone, install the TestFlight build and open it in sample-data mode — no sign-in needed:

https://testflight.apple.com/join/xHXyt2AR

The video below also shows the phone app and the web app side by side. The AI features on the phone are the same event work documented in this repo.

## Backend setup (for your own deploy, not needed to judge)

The app calls Meta's Muse model through Supabase Edge Functions, which hold
the model key server-side. Configure with your own project:

```sh
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase secrets set MODEL_API_KEY=YOUR_META_MODEL_API_KEY
npx supabase functions deploy analyze-threat
npx supabase functions deploy sophia-chat
npx supabase functions deploy generate-remediation
```

Never put model keys or service-role keys in frontend files or the repo.
Public client keys go in a local `.env.local` file (git-ignored):

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_PUBLISHABLE_KEY
```

## Video disclosure

The demo video opens with the line in `VIDEO-DISCLOSURE.txt`, naming the same
outside-event items disclosed above.
