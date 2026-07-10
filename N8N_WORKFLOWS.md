# n8n Workflows Used by This Site

Inventory of every n8n webhook this codebase calls, where it's used, and which n8n workflow backs it. Compiled 2026-07-09.

## Worker Management

`/admin/worker-management` (worklist), `/admin/worker-management/new` (add worker), `/admin/worker-management/[workerId]` (section picker), `/admin/worker-management/[workerId]/[section]` (section form) — one unified page/route tree. `worker-onboarding` was merged into `worker-management` on 2026-07-09; there is no separate onboarding page anymore.

| Page / Component | Env Var | n8n Workflow | Status |
|---|---|---|---|
| `/work-with-us/apply`, `/admin/worker-management/new` | `NEXT_PUBLIC_N8N_WORKER_INTAKE_WEBHOOK_URL` | `DCDC - Worker Intake` | Active |
| `/admin/worker-management` (worklist) | `WORKER_LIST_WEBHOOK` | `DCDC - Worker List` | Active |
| `/admin/worker-management/[workerId]`, section forms | `WORKER_PROFILE_WEBHOOK` | `DCDC - Worker Profile` | Active |

Section-save forms (`/admin/worker-management/[workerId]/[section]`) — each section has its own dedicated update workflow, split from the old shared `DCDC - Worker Update` on 2026-07-09 because that shared workflow's field-mapping Code node built a full ~60-field object on every save regardless of which section was submitted, blanking every other column on the row via `autoMapInputData`. Each new workflow's Code node only ever references its own section's fields, so there's no shared object to accidentally wipe anything with:

| Section | Env Var | n8n Workflow | Sheet(s) |
|---|---|---|---|
| Personal Details (incl. Contact & Address, merged 2026-07-10) | `WORKER_UPDATE_PERSONAL_DETAILS_WEBHOOK` | `DCDC - Worker Update - Personal Details` | master |
| References & Experience | `WORKER_UPDATE_REFERENCES_EXPERIENCE_WEBHOOK` | `DCDC - Worker Update - References & Experience` | master |
| Work Preferences (incl. languages + preferred work area, merged 2026-07-10) | `WORKER_UPDATE_WORK_PREFERENCES_WEBHOOK` | `DCDC - Worker Update - Work Preferences` | master + operational |
| Banking | `WORKER_UPDATE_BANKING_WEBHOOK` | `DCDC - Worker Update - Banking` | master |
| Documents | `WORKER_UPDATE_DOCUMENTS_WEBHOOK` | `DCDC - Worker Update - Documents` | master (+ Drive file-upload branch) |
| Status & Operations | `WORKER_UPDATE_STATUS_OPERATIONS_WEBHOOK` | `DCDC - Worker Update - Status & Operations` | master + operational |

Which webhook to call for a given section slug is resolved via `updateWebhookEnvVar` on each entry in `src/lib/onboardingSections.ts`, used by `src/app/api/workers/update/route.ts`.

**Bug found and fixed 2026-07-10** in the two-sheet sections (Work Preferences, Status & Operations): the original per-section workflows still had the same class of bug as the old shared one, one level down — a single Code node returned two items (one per sheet), and its one output was wired to *both* Google Sheets update nodes. In n8n, a fan-out connection sends *all* items to *every* connected node, so each sheet-update node received both the master-fields item and the operational-fields item. Since the field names for the "wrong" sheet don't exist as columns there, `autoMapInputData` created brand-new stray columns and populated them (e.g. `Status`, `Age`, `Religion`, `Last Updated On` appearing as new columns in the `operational` sheet after a Status & Operations save). Separately, `Status & Operations`'s `Update Master Sheet` node had also drifted to a manually-edited `defineBelow` mapping with only `Worker ID` mapped, so master-sheet writes for that section were silently dropped entirely. Fixed by giving each sheet its own independent Code node wired directly from the Webhook (no shared node to fan out from) and resetting `Update Master Sheet` back to `autoMapInputData`. If you see stray `Status`/`Age`/`Religion`/`Last Updated On` columns in the `operational` sheet from before this fix, those are safe to delete manually — nothing in the app reads them from there.

## Leads

| Page / Component | Env Var | n8n Workflow | Status |
|---|---|---|---|
| `LeadForm.tsx` (public "request a helper" form) | `NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL` | `lead_data` (appends to `lead-data` sheet) | **Broken** — env var isn't set in `.env.local` at all; the matching workflow exists (`webhook/lead_data`) but is never wired up |

## Placements

| Page | Env Var | n8n Workflow | Status |
|---|---|---|---|
| `/admin/active-placements` | `PLACEMENTS_LIST_WEBHOOK` | `placement_status-forUI` (reads `active-placements` sheet) | Active, correctly configured |

## Retired / not currently wired to the site

- `WORKER_ONBOARDING` — the old 7-step wizard's workflow, inactive, superseded by Worker Intake + section forms
- `WORKER_DOCUMENTS` — empty stub, never built out
- `DCDC - Worker Update` — the old shared update workflow, superseded 2026-07-09 by the per-section workflows above (see the field-wipe bug noted there). Still active in n8n and `WORKER_UPDATE_WEBHOOK` is still in `.env.local` as a fallback, but the app no longer reads that var — remove both once the current webhooks are confirmed working end-to-end.
- `DCDC - Worker Update - Contact & Address` — deactivated 2026-07-10; its fields (WhatsApp, Email, addresses) were merged into `DCDC - Worker Update - Personal Details`. `WORKER_UPDATE_CONTACT_ADDRESS_WEBHOOK` removed from `.env.local`.
- `DCDC - Worker Auth` — the old worker-profile password gate on `/admin/worker-management`; removed 2026-07-09 since the whole `/admin/*` area is already behind the admin login session. Workflow itself left untouched in n8n, just unwired from the app (`WORKER_AUTH_WEBHOOK` removed from `.env.local`, `src/app/api/workers/auth/route.ts` deleted).
- `DCDC Agreement data`, `onboarding_data`, `onboarding_validator`, `Worker Bio-Data PDF Generator` — all exist and are active in n8n, but nothing in the current codebase calls them (no matching env var or fetch anywhere in `src/`). Likely leftovers from earlier iterations.

## Biggest actionable finding

The public lead-capture form (`LeadForm.tsx`) has no working webhook wired up.
