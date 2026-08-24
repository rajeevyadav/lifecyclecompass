# LifecycleCompass — Repository Governance

**Version:** 1.0
**Owner/Maintainer:** Rajeev Yadav
**Applies to:** the single-file application, documentation, tests, and release
artifacts in this repository.

LifecycleCompass is an offline, deterministic decision-support tool for
AI-enabled medical-device lifecycle traceability. It is not a conformity
assessment tool and its assessment logic must remain human-authored, explicit,
and reviewable. Governance protects the integrity of the rules, evidence-state
model, critical gates, standards library, and published HTML artifact.

## 1. Human authorship — no AI attribution anywhere

1. Only **Rajeev Yadav** appears as author, owner, committer, or approver on
  any file, commit, or release artifact.
2. AI/automation tools may assist development, but are never the recorded
  author, committer, or owner of any output. The application itself must not
  use AI or black-box inference in its assessment logic.
3. No commit may carry a `Co-authored-by:` trailer naming an AI/LLM/agent/tool
   (Claude, Copilot, ChatGPT, Gemini, Cursor, Devin, etc.). Enforced by the
   commit-msg hook and reviewed on every PR.
4. This ban covers **file metadata**, not just visible text: document
   properties (`dc:creator`, `cp:lastModifiedBy`, `<Application>`, `<Company>`)
   in any `.docx`/`.pptx`/`.xlsx` — including embedded objects — and PDF
   `/Author` `/Producer` `/Creator`, must show only the authorized name or be
   blank, never a generating tool's name (`PptxGenJS`, `python-docx`,
   `openpyxl`, etc.).

## 2. Secrets and data hygiene

- Never commit secrets, credentials, private keys, or personal assessment data.
- Keep generated runtime data and temporary exports out of version control.

## 3. Branch protection and commit standard

- `main` requires a pull request and review before merge. As a solo-maintainer
  repository, it does not require approval from someone other than the last
  pusher; the maintainer remains responsible for reviewing and merging each
  change. Direct pushes, force-pushes, and branch deletion are disabled,
  including for administrators where GitHub permits enforcement.
- Only Rajeev Yadav may push or merge changes to `main`. Require signed commits
  verified against Rajeev Yadav's configured GPG key.
- Required checks must pass before merge: restricted-file/secrets guard,
  HTML validation, and the automated regression suite once it is added.
- CI may lint, test, and verify artifacts, but must never create commits,
  tags, releases, or pull requests automatically.
- Commit messages follow `<type>(<scope>): <description>` (conventional
  commits); no "WIP"/"misc"/"fix stuff".

## 4. Coding standards

Code uses descriptive names, small focused functions, readable control flow,
and comments only where they clarify a non-obvious rule. Preserve the
single-file offline architecture unless a directive-approved change requires
otherwise. Do not remove rule-provenance tags or simplify non-compensatory
critical-gate logic.

## 5. Releases and publishing

- Release version and build identity must agree between the HTML marker and
  release documentation. A future build pipeline may stamp the actual commit
  SHA and an external artifact hash.
- No release is promoted from `-rc` until the required automated regression
  suite covers critical gates, scoring, PCCP combinations, and standards
  applicability/staleness logic.

## 7. CI / GitHub Actions discipline (cost and correctness)

Learned from a real incident (account Actions minutes exhausted, 2026-08-24 —
private-repo billing multiplied by double-triggered runs):

1. **One CI run per change.** Workflows trigger on `pull_request` and
   `push: branches: [main]` **only** — never bare `push:` (all branches)
   together with `pull_request:`, which double-fires on every PR push.
2. **Cancel superseded runs.** Every workflow sets
   `concurrency: { group: <name>-${{ github.ref }}, cancel-in-progress: true }`
   so rapid pushes cancel in-flight runs instead of stacking billed minutes.
3. **Keep the matrix lean.** Only the Python versions actually supported;
   don't expand the matrix without cause.
4. **Batch changes; don't push in rapid succession** to an open PR — each push
   re-runs CI. One PR per logical change.
5. CI must not modify the working tree or commit generated changes.
