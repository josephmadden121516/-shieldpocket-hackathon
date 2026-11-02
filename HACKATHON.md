# ShieldPocket — Event-Work Manifest

Track: Indie Developer (solo: Joseph Madden).
Event: Meta Global AI Developer Hackathon, submissions due Wed Nov 4.

Every commit in this repo postdates the Oct 28 kickoff. Verify with
`git log --format="%h %ad %s" --date=iso`. There is no pre-event history:
this repo was started fresh for the submission.

## Model usage

All AI features call Meta's Muse Spark model (`muse-spark-1.3`) through the
Meta Model API (`https://api.meta.ai/v1/chat/completions`), via the
Supabase Edge Functions in `supabase/functions/`. Every call returns token
usage, which the app meters live (`src/lib/usageMeter.ts`) under a user-set
daily cap. The project was built with the Muse Code coding agent.

## Features and commits

Pending first commits — fill this table after `git init` using the fresh
hashes from THIS repo, never hashes from any other checkout.

| Commit | Date | Feature |
|---|---|---|
| | | |

## Outside-event items reused

Same list as the README disclosure: fresh framework packages installed via
npm, public read-only threat-data feeds (OSV, CISA KEV, EPSS, the Safe
Browsing blocklist, RDAP), and the hosting project shells (Vercel +
Supabase). All app code was written during the event with AI coding
assistance (Muse Code).
