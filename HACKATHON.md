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

| Commit | Date | Feature |
|---|---|---|
| `388353a` | Nov 2 | Event-only app shell (fresh configs, App, styles, Supabase client) |
| `388353a` | Nov 2 | Guided war-room tour + digest, CVE triage, patch, timeline, briefing, usage meter |
| `388353a` | Nov 2 | Spot-the-phish game, link checker, scam-text analyzer, threat watcher, badge studio |
| `388353a` | Nov 2 | Compliance mapper, cyber-insurance readiness, attack simulator, audit lab, phishing drills, risk metrics |
| `388353a` | Nov 2 | Edge functions (`analyze-threat`, `sophia-chat`, `generate-remediation`) on Muse Spark with live metering |
| `6f5dd34` | Nov 2 | Frequently asked questions section (fresh bilingual content) |
| `ef509a5` | Nov 3 | Overview dashboard with jump menu, local-state libs, new `threat` / `vision` / `actionplan` edge tasks |
| `59fa64a` | Nov 3 | Local checkups: password, cookie/privacy, firewall, device posture, manual checks, hardening guides, security checkup, incident kit |
| `615965d` | Nov 3 | Threat and screenshot analyzers, action plan, local activity reports and saved reports, Sophia voice assistant |

## Outside-event items reused

Same list as the README disclosure: fresh framework packages installed via
npm, public read-only threat-data feeds (OSV, CISA KEV, EPSS, the Safe
Browsing blocklist, RDAP), and the hosting project shells (Vercel +
Supabase). All app code was written during the event with AI coding
assistance (Muse Code).
