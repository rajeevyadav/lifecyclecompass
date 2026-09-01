# LifecycleCompass

**AI-Enabled Medical-Device Lifecycle Traceability Navigator — FDA + EU MDR**

[![Latest release](https://img.shields.io/github/v/release/rajeevyadav/lifecyclecompass?include_prereleases&label=version&color=5b47e0&cacheSeconds=300)](https://github.com/rajeevyadav/lifecyclecompass/releases)
[![Download for Windows](https://img.shields.io/badge/Download-Windows%20installer-0078d6?logo=windows)](https://github.com/rajeevyadav/lifecyclecompass/releases)
[![Open the app](https://img.shields.io/badge/Open-web%20app-8250df)](https://rajeevyadav.github.io/lifecyclecompass/)
[![Tests](https://github.com/rajeevyadav/lifecyclecompass/actions/workflows/ci.yml/badge.svg)](https://github.com/rajeevyadav/lifecyclecompass/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

_Prototype — current build **v2.0.0-rc4**. See **Current build status** below for what is and isn't done._

🌐 **Use it now in your browser: https://rajeevyadav.github.io/lifecyclecompass/**

LifecycleCompass is a free, offline, deterministic decision-support tool for mapping, assessing,
and tracing the **nested development and lifecycle processes of AI-enabled medical devices** —
from the AI data-management and model-development lifecycles through the software and system
lifecycles up to the medical device at product level. It is **decision-support only — not a
conformity assessment**, and its assessment logic is entirely human-authored: **no AI, no
black-box inference**. Everything runs on your device and works fully offline.

## Where it sits in the Compass family

Part of the same family — same guardrails, same offline-first, no-black-box-AI philosophy:
[RegCompass](https://rajeevyadav.github.io/regcompass/) ·
[CyberCompass](https://rajeevyadav.github.io/cybercompass/) ·
[eIFUCompass](https://rajeevyadav.github.io/eifucompass/) ·
[ClinicalCompass](https://rajeevyadav.github.io/clinicalcompass/).
LifecycleCompass is the process-and-traceability layer that ties them together, cross-linking to
CyberCompass (cybersecurity depth) and ClinicalCompass (clinical-evidence depth) rather than
duplicating them.

## Key features

A single-page app with 14 functional tabs, all driven by a shared device/AI profile:

- **Scope & Limitations** — intended-use, target-users, and residual-risk statement, plus the
  rule-provenance tag legend and version history.
- **Profiler** — multi-axis device/AI profile (base class, FDA pathway, AI presence, model type
  traditional/LLM-genAI, planned modification strategy, SOUP, hardware, software class,
  connectivity, data characteristics, clinical pathway, EU AI Act tier/Article 6 route).
- **Nested Lifecycle** — an SVG diagram of the six nested lifecycles, dimmed by profile, each ring
  with its purpose, failure modes, and evidence-state criteria.
- **SOUP & Foundation Models** — ownership/control-based checklist (source, freeze-ability,
  supplier notification, anomaly list) rather than a simple binary SOUP flag.
- **Standards Library** — 16 entries live-filtered by profile, with **date-staleness flagging**
  (>90 days since last-verified) and supporting references clearly separated as non-scored.
- **Interfaces & Traceability** — six named lifecycle hand-offs with controlled/partial/gap states.
- **QMS / AI-MS Overlay** — ISO 13485 + AI management-system (ISO/IEC 42001, EN 18286) scope checklist.
- **Cybersecurity & Clinical cross-links** — lifecycle-mapped checkpoints that point to CyberCompass
  and ClinicalCompass for depth.
- **EU AI Act Overlay** — obligation-group → existing-control mapping with applicability/tier/Article 6 routing.
- **Change & Postmarket Control** — monitoring, drift, change triggers, retraining, rollback, PMS/CAPA,
  retirement, plus a **PCCP status panel** driven by AI presence AND planned modification strategy.
- **Readiness & Report** — a 4-dimension readiness dashboard (Lifecycle Completeness / Evidence
  Strength / Interface Coherence / Change Readiness) with **8 non-compensatory critical gates** — a
  single failed gate forces overall readiness to RED — plus CSV and JSON export.
- **Compass Family + Glossary** — sibling cross-links and 31 plain-language term definitions.

Under the hood: a 7-state **evidence model** (not binary checkboxes), **rule-provenance tags**
(`REG` / `STD` / `GUID` / `DRAFT` / `ED`) on every criterion, and non-compensatory critical-gate
logic — all deterministic and readable in the source.

## Coverage

FDA and EU MDR scope only — stated explicitly in the tool's Scope tab. UK, Health Canada, and other
jurisdictions are out of scope. Decision-support only; not a conformity assessment, certification
pathway, legal opinion, or substitute for qualified regulatory judgment.

## Try it / Download

- **Web (any browser, installable, offline):** https://rajeevyadav.github.io/lifecyclecompass/
- **Windows desktop app & portable build:** from the
  [Releases page](https://github.com/rajeevyadav/lifecyclecompass/releases) (current build is a
  **pre-release**). The installer is per-user (no admin) and currently **unsigned** — on the Windows
  SmartScreen prompt choose **"More info → Run anyway"** and confirm the download came from
  `github.com/rajeevyadav/lifecyclecompass`.
- **Portable / standalone:** the whole tool is the single file
  [`lifecyclecompass.html`](lifecyclecompass.html) — download it and open it in any browser.

## Current build status (honest)

This is a **prototype** carrying an `-rc` suffix on purpose. What is **done**: all 14 tabs are
functional (not stubbed), the evidence-state model, non-compensatory critical gates, PCCP logic, the
standards library with staleness flagging, and a starter deterministic regression suite (`npm test`).
What is **not done** and gates removal of the `-rc` suffix:

- Fuller automated test coverage — priority order: critical-gate integration, scoring math,
  PCCP combinations, standards applicability/staleness.
- Immutable build identification (the marker's `commit:` field is a placeholder until a build
  pipeline stamps the real SHA/artifact hash).
- No independent third-party regulatory review has occurred — every verification pass to date is a
  self-review. Rule-provenance tags were self-assigned, not independently checked clause-by-clause.

## Run & build

```bash
# run the regression tests (Node's built-in runner, no external deps)
npm test

# run the web app locally
npx serve .            # or:  python3 -m http.server

# desktop app (Electron wrapper of the same single-file app)
npm install
npm start

# build the desktop installers
npm run dist:win       # Windows (NSIS installer + portable)
npm run dist:mac       # macOS (.dmg)
npm run dist:linux     # Linux (.AppImage)
```

## No AI inside

The shipped application and its build tooling contain **no AI or machine-learning code** — every
assessment output is produced by fixed, human-written rules you can read in the source. CI guardrails
fail the build if an AI-provider reference, an ML dependency, or an AI/bot commit-authorship trailer
is ever introduced, and every change lands through a reviewed, GPG-signed pull request.

## Disclaimer

Decision-support only — provided "as is". LifecycleCompass is not a conformity assessment,
certification pathway, legal opinion, or substitute for qualified regulatory judgment, and it does
not create regulatory compliance. Always verify against the current official texts and standards.

## License

MIT — see [`LICENSE`](LICENSE).

Maintainer: **Rajeev Yadav** · rajeevyadav@gmail.com
