# LifecycleCompass

LifecycleCompass is an offline, deterministic decision-support tool for mapping and tracing the nested development and lifecycle processes of AI-enabled medical devices.

It covers the EU MDR and FDA scope only. It is not a conformity assessment, certification pathway, legal opinion, or substitute for qualified regulatory judgment.

## Current state

The current prototype is the self-contained [lifecyclecompass.html](lifecyclecompass.html) application. It includes the profiler, nested lifecycle evidence model, standards library, traceability views, overlays, critical gates, readiness dashboard, and exports.

Automated regression tests and build-time integrity stamping are planned before the `-rc` suffix is removed.

Run the current regression suite with `npm test`.

This is a single-committer project; every change lands through a reviewed, GPG-signed pull request. Licensed under [MIT](LICENSE).
