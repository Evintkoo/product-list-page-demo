# Build app

Four ways to build `/app/` from this bundle:

1. **In Claude Code:** open this folder and type `/planout`. Runs the build interactively, in your own session, with your normal tool-approval prompts.
2. **In Antigravity / Cursor / VS Code:** open this folder → Command Palette → `Tasks: Run Task` → `Build App`.
3. **Double-click `build.sh`** (POSIX) or **`build.bat`** (Windows). Headless — defaults to Claude Code.
4. **Swap providers:** `AGENT_CMD="gemini -p" ./build.sh`. See the header of `build.sh` for all env-var knobs (`AGENT_CMD`, `PROMPT_FILE`, `PROGRESS_LOG`).

## Layout

Running a build produces three top-level directories:

- `spec/` — the specification bundle (inputs the build agent reads).
- `app/` — the generated application (built by the agent).
- `plan/` — a placeholder for change plans. Used when a change falls outside
  the staged build: the agent writes a plan into `plan/` first, then executes
  it against `app/`. Ships as `plan/README.md` only.

### What's in `spec/`

- `spec/AGENTS.md` — thin orchestrator. Sequences the five stage prompts; every entry point above reads this same file.
- `spec/tech-stack.md` — runtime, language, frameworks, project layout, install/dev commands, verification gate. Override per-request via the `tech_stack` field on the artifact API.
- `spec/prompts/01-…05-…md` — staged build instructions, each with its own success criterion.
- `spec/pseudocode/` `spec/summary/` `spec/assets/` `spec/reference_code/` — the inputs the stages read.
- `spec/tests/` — runnable scenarios.
- `spec/GxP/` — GxP validation-pack prompt scaffold (authored into `spec/summary/` at build time).

### Workspace root

- `build.sh` / `build.bat` — the headless build entry points.
- `.claude/commands/planout.md` — the `/planout` interactive build entry point.
- `CLAUDE.md` — points Claude Code at `spec/AGENTS.md` automatically when you reopen **this folder** (Claude Code auto-loads `CLAUDE.md`, not `AGENTS.md`), so the rules below apply without retyping `/planout`. Opening Claude Code from inside `/app/` instead is a different project root and won't pick this up — reopen the bundle root, or ask the agent to read `spec/AGENTS.md` directly.
- `.vscode/tasks.json` — `Build App` Command Palette entry.
- `.devcontainer/devcontainer.json` — Codespaces / VS Code dev container for the bundle itself.

## Run the built app

Once a build finishes, `/app/` is runnable on its own — no rebuild needed to
start it again. Run the **Install command**, then the **Dev command**, from
`spec/tech-stack.md`, from inside `/app/`.

## Further changes

The staged build above produces the initial `/app/`. Any change requested
**after** that — an iteration, fix, or addition — follows a **plan-then-execute**
workflow: write a plan into `plan/` first (one markdown file per change),
*then* execute it against `/app/`.

Do not edit `/app/` for an out-of-band change until the plan file exists under `plan/`.

See `spec/AGENTS.md` → *Further changes* for the full rule, and `plan/README.md`
for the placeholder's format.

## Logs

`build.sh` tees the raw NDJSON event stream to `.build/progress.log` while rendering pretty dots/text on stdout. Tail it from another terminal or an IDE panel for structured progress.
