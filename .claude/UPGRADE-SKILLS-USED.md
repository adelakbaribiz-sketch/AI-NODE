# Skills used — Master Upgrade Pass (2026-09-22)

| Task | Skill used | Reason |
|---|---|---|
| Depth/3D visual identity direction | `frontend-design` | Directly covers distinctive visual identity + restraint principles; lightweight, matched the task exactly. |
| Chart/status color re-validation | (prior session) `dataviz` skill's palette validator, re-checked not re-run | Colors were unchanged in this pass — no new palette to validate. |

## Skills considered and deliberately not used
- `architecture-review` — codebase is a single ~65-file static-data frontend with no services/modules to evaluate boundaries between; the overhead of a full architecture review doesn't match the actual complexity here.
- `production-readiness` — this project has no backend/deploy target (by design, see `docs/DECISIONS.md` D1); a production-readiness gate would mostly report "N/A."
- `project-recovery` / `project-takeover` — not a legacy/unfamiliar codebase; this session built it and already has full context.
- `ai-project-engineering` — no LLM/model integration exists in this app to review.

## Note on scope
The upgrade prompt's own directive (token efficiency, "don't rewrite healthy code") plus this project's actual state (frontend-only demo, no backend/database/DevOps/observability) meant most of the prompt's 55 sections were **not applicable** rather than skipped for expediency. See `docs/UPGRADE-REPORT.md` for what was and wasn't in scope, and why.
