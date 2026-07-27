# Goal

Build `/app/` from the specification under `spec/`.

# Layout

This bundle resolves to three top-level directories:

- **`spec/`** — the specification inputs you read (everything listed under
  *Inputs* below). It is fixed for the build; do not modify it.
- **`app/`** — the application you generate. Your primary output.
- **`plan/`** — a placeholder for change plans. Used only for work that falls
  outside the standard staged build (see *Further changes* below).

# Inputs

- `spec/pseudocode/` — per-feature, per-swimlane behavioural specs (markdown)
- `spec/summary/` — feature briefs (HTML + PDF) with end-user copy
- `spec/assets/` — per canvas node: `<node_id>.svg` + `<node_id>.png` + `<node_id>.structure.txt`
  (vector/icon), `spec/assets/html/` HTML **wireframe references** for UI nodes, and
  `spec/assets/attachments/<node_id>-N.<ext>` reference media (images, docs, PDFs, …) the designer
  pinned to a node — flat, node-id-named files (original filename is not preserved, only the extension)
- `spec/reference_code/` — optional; reuse if present, else derive from pseudocode
- `spec/tech-stack.md` — the technologies, project layout, and verification gate the generated `/app/` must conform to
- `spec/prompts/` — the staged build instructions (one file per stage)

# Output

`/app/` — a project that follows the **Project layout** section of `spec/tech-stack.md` and uses the languages, frameworks, and libraries it names.

# Work efficiently (token budget)

A build spends real tokens. Reach a working `/app/` in the **fewest tokens** — frugal by default, never by cutting the result. The waste to avoid is loading and re-loading the whole bundle; these rules keep your working context small:

- **One feature at a time.** Read only the **current** feature's `spec/pseudocode/<feature>/…` and its assets; finish it, then move to the next. Never load the whole `spec/pseudocode/` or `spec/assets/` tree into context at once.
- **Read each file once.** Take what you need the first time; do not re-open a file you've already read. Build a short index of what's where instead of re-scanning.
- **Prefer text over pixels.** Use the compact `<node_id>.structure.txt` for layout/spacing; open the `<node_id>.png` (costly image tokens) **only** when the structure text is genuinely insufficient for the component you are building — never batch-open every image up front.
- **Never open `spec/summary/*.pdf`.** It duplicates `spec/summary/*.html`; read the HTML for copy. (And never read your own generated `spec/reference_code`/build output back in.)
- **Edit, don't rewrite.** Change the specific lines that are wrong; never re-emit a whole file to alter a few lines.
- **Fix narrowly, don't thrash.** When a check fails, fix the specific cause and re-run **only** that check — don't re-read the bundle or rebuild from scratch each retry. Cap at ~3 targeted attempts per check; if it still won't go green, the cause is deeper (missing input or a wrong earlier stage) — report it rather than looping.
- **Be terse.** Do the work; don't narrate plans, echo files back, or restate the bundle. Short tool calls, no filler.

# How to build

Run the staged prompts under `spec/prompts/` in order. Each stage has its own success criterion stated at the bottom of the file; do not advance to the next stage until the current stage's criterion is met.

1. **`spec/prompts/01-scaffold.md`** — create the empty project skeleton from `spec/tech-stack.md`'s **Project layout**.
2. **`spec/prompts/02-data.md`** — generate types, schemas, and validators from `spec/pseudocode/<feature>/Data/`.
3. **`spec/prompts/03-logic.md`** — implement controllers from `spec/pseudocode/<feature>/Logic/` and the **Verification gate** endpoint.
4. **`spec/prompts/04-frontend.md`** — build components and pages from `spec/pseudocode/<feature>/Frontend/`, `spec/assets/`, and `spec/summary/`.
5. **`spec/prompts/05-verify.md`** — install, boot, and confirm the **Verification gate** passes end-to-end.

If any stage fails its success criterion, stop, report the failing stage and the specific check that failed, and do not run subsequent stages.

# Verification

Stage 05's success criterion is the final pass/fail for the whole bundle. The criterion's authoritative source is the **Verification gate** section of `spec/tech-stack.md`.

# Running the app

Once Stage 05 passes, `/app/` is runnable on its own — no rebuild needed to
start it again later. Run the **Install command**, then the **Dev command**,
from `spec/tech-stack.md`, from inside `/app/`.

# Further changes (`plan/`)

The staged build (`spec/prompts/01–05`, run headless via `build.sh`/`build.bat`
or interactively via `/planout`) produces the initial `/app/`. Any **further
change that is not part of that staged build** — an iteration, fix, addition,
or rework requested after `/app/` exists — follows a **plan-then-execute**
workflow:

1. **Plan first.** Before touching `/app/`, write a concise change plan into
   `plan/` — one markdown file per change, e.g. `plan/<change>.md`. State what
   to change, why, and the `/app/` files it will touch.
2. **Then execute.** Carry out the plan against `/app/`, and record the outcome
   (what changed + verification result) in the same plan file.

Do not edit `/app/` for an out-of-band change until the plan file exists under `plan/`.

`plan/` ships as a placeholder (see `plan/README.md`); it is filled only when
such a change is requested.

# Notes

- Every per-node asset is named by its **node id**, and a node may contribute more than one
  file of a type: a single file is `<node_id>.<ext>`; multiples are `<node_id>-1.<ext>`,
  `<node_id>-2.<ext>`, … This applies to `spec/assets/<node_id>.svg`, `.png`, `.structure.txt`,
  `spec/assets/html/<node_id>.html`, and `spec/assets/attachments/<node_id>-N.<ext>`. Files that
  share a node id (across `.svg`/`.png`/`.structure.txt`/`.html`/attachments) describe the **same**
  canvas node — treat them together.
- `spec/assets/html/` is the canvas HTML **wireframe reference** for each UI node. Treat it as the
  **visual source of truth** for the corresponding `spec/prompts/04-frontend.md` components; match
  its structure/markup, do not copy verbatim. If `spec/assets/html/` is absent, derive the UI from
  `spec/summary/` and `spec/pseudocode/` instead.
- `spec/assets/attachments/<node_id>-N.<ext>` holds **reference media** (screenshots, mockups, brand
  images, PDFs, docs) the designer pinned to that canvas node — flat files named by node id, not by
  original filename. Use them as visual / contextual reference for the same node's UI and content;
  they are supporting material, not files to ship verbatim into `/app/`. Absent when a node has no
  attachments; see `spec/assets/attachments/SKIPPED.md` for any that couldn't be bundled.
- If `/spec/reference_code/` is absent from the bundle, ignore every instruction in any stage that tells you to reuse or mirror code from `/spec/reference_code/` (or `/code/`) and derive everything from `/spec/pseudocode/`, `/spec/summary/`, and `/spec/assets/` instead.
- Every stage defers stack-specific decisions (language, frameworks, library names, env-var names, install/dev commands, the verification gate's exact route and response) to `spec/tech-stack.md`. If `spec/tech-stack.md` is silent on a detail, follow the convention idiomatic to the **Frontend framework** or **Backend framework** named there.
