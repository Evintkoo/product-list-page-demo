# Goal

Plan the build. **Do not write application code.** Turn the specification under
`spec/` into a concrete plan, after checking the surrounding repository to find
where each feature's code already lives and which repository rules apply.

You may write **only** under `spec/plan/`. The repository itself is read-only for
this step: never edit, create or delete anything outside `spec/plan/`.

# Where to look

The **Detected** section appended below this prompt gives the repository root
(the directory that contains this bundle), the rule files found there, and its
top-level entries. Everything in this prompt that says "the repository" means
that directory.

# Step 1 — Read the rules first

Read every rule file listed under *Rule files* (for example `CLAUDE.md`,
`AGENTS.md`, `CONTRIBUTING.md`, `.cursor/rules`, `.github/copilot-instructions.md`)
and the configs that enforce style: lint, format, `tsconfig`/compiler settings,
`.editorconfig`, test and CI configuration, commit or branch conventions. A rule
file may point to nested rule files in the packages you will touch; read those
too. Also record the stack: language and framework versions, package manager,
module system, and how tests and the dev server are run.

# Step 2 — Map every feature to the repository

For each feature under `spec/pseudocode/`, search the repository (search by the
feature's name and by the node titles and ids in its pseudocode; do not read the
whole tree) and decide:

- **Existing locations** — the files or directories that already implement it
  or sit next to it, as repository-relative paths.
- **Action** — `reuse` (import or mirror what exists), `extend` (the spec adds
  to something that exists), or `new` (nothing exists; say which existing
  folder it should sit beside so it follows the same layout).

# Step 3 — Write the plan

Write two files:

1. `spec/plan/repo-context.md`
   - **Rules to follow** — each rule that affects generated code, quoted or
     tightly paraphrased, with the file it came from.
   - **Stack and layout** — what you found in Step 1.
   - **Feature → repository map** — one row per feature: feature, existing
     locations, action.
   - **Conflicts** — anywhere a repository rule disagrees with
     `spec/tech-stack.md`. Resolve it here: the repository rule wins for style,
     naming, layout and tooling; the specification stays authoritative for
     behaviour.

2. `spec/plan/build-plan.md`
   - Follow the order of `spec/prompts/01-scaffold.md` to `05-verify.md`.
   - Per feature: the files to create under `app/` (named after the repository's
     conventions), what to reuse and from where, the rules from
     `repo-context.md` that apply, and a checklist with **every node id** from
     its pseudocode so nothing is dropped during the build.
   - How the Verification gate from `spec/tech-stack.md` will be checked, using
     the repository's own commands.

If there is no repository to read (the Detected section says so), still write
both files: keep the rule and map sections, state that the build is greenfield,
and plan from `spec/tech-stack.md` alone.

# Work efficiently

Search before you read, read each file once, and keep the plan terse: tables and
checklists, not prose. Finish by printing the paths of the two files you wrote.
