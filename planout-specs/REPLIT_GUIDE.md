# Build with Replit

| | Plan | Who does the work | Automated? |
|---|---|---|---|
| **A. Upload the bundle ZIP** | any (incl. Free) | Replit Agent — or Claude Code in the Repl's Shell | one upload, one sentence |
| **B. Build from your machine over SSH** | Core / Pro (SSH is a paid feature) | a headless agent running in the repl (Claude Code by default) | yes — `REPLIT_SSH_HOST=… ./build.sh` |

Replit's AI Agent is real and works well, but only from inside a Repl —
there is no headless CLI, API or webhook to trigger it from outside (the
published `replit` npm CLI predates Agent and no longer works against
Replit's backend; Replit's docs list Agent triggers as "coming soon"). So
the bundle meets Agent where it lives: it ships a root `replit.md`, which
Agent reads automatically at the start of every conversation.

## A. Upload the bundle ZIP

1. Open **replit.com/import**, choose **ZIP**, and upload this bundle's
   `.zip` exactly as downloaded (≤ 200 MB; it's far smaller). Select
   **Import**. Replit creates a new Repl and Agent prepares the environment.
2. Because `replit.md` is at the root, Agent already knows that
   `spec/AGENTS.md` is the build contract and `app/` is the output. Open
   the Agent chat and say:

   > Build the app: follow spec/AGENTS.md exactly, start to finish.

3. Let Agent run the staged build. It writes `app/` the same way `build.sh`
   does — same spec, same stages, driven by Replit's own AI.

**Prefer Claude Code instead of Replit Agent?** Same upload, then in the
Repl's **Shell** tab:

```bash
npm install -g @anthropic-ai/claude-code
./build.sh
```

with `ANTHROPIC_API_KEY` added as a **Replit Secret** (Tools → Secrets).
`build.sh` detects `claude` on the Repl's PATH and runs the normal local
path — no SSH, no paid plan.

## B. Build from your machine over SSH

Use this when you want to keep driving from your own terminal but have the
build run on Replit's compute.

One-time setup:

1. **Enable SSH on the repl.** In the workspace, open the *SSH* pane (Tools
   → SSH). Replit generates a hostname like `abc123@abc123.kirk.replit.dev`.
2. **Add an SSH key.** Locally:
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/replit -q -N ""
   ```
   Paste the contents of `~/.ssh/replit.pub` into the SSH pane's key list.
   Optionally, so plain `ssh` just works, add to `~/.ssh/config`:
   ```
   Host *.replit.dev
     Port 22
     IdentityFile ~/.ssh/replit
     StrictHostKeyChecking accept-new
   ```
3. **Install the agent inside the repl** (its Shell tab):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
   and add `ANTHROPIC_API_KEY` as a **Replit Secret** (Tools → Secrets) so
   the key never travels over the command line. Any other headless agent
   works too — see `REPLIT_AGENT_CMD` below.
4. **Check the connection** from your machine:
   ```bash
   ssh -i ~/.ssh/replit abc123@abc123.kirk.replit.dev 'cd workspace && claude --version'
   ```

Then, from this bundle's root:

```bash
REPLIT_SSH_HOST=abc123@abc123.kirk.replit.dev REPLIT_SSH_KEY=~/.ssh/replit ./build.sh
```

`build.sh` will `scp` `spec/` into the repl's `workspace/`, run the agent
there against `spec/AGENTS.md` (streaming its progress to your terminal and
`.build/progress.log`), then `scp` the resulting `app/` back into this
folder. If the SSH run fails for any reason, it falls back to running Claude
Code locally, exactly as it would without `REPLIT_SSH_HOST`.

Knobs (all optional): `REPLIT_SSH_PORT` (22), `REPLIT_SSH_KEY`,
`REPLIT_REMOTE_DIR` (`workspace`), `REPLIT_AGENT_CMD` (defaults to the same
Claude Code command the local path uses; set it to e.g. `gemini -p` to run a
different agent in the repl — its output is streamed raw).

Verify a run really happened in Replit: the banner says
`Source:  replit over ssh (…)`, and the repl's file tree shows `spec/` and
`app/` afterwards.

## Why there's no fully hands-off Replit Agent path

There's no headless Replit Agent CLI or API to script against — checked
directly: `replit --help` lists only legacy repl-management commands
(`auth`/`bash`/`local`/`run`/`cp`/`exec`/`bulk`), and a real `replit exec`
call against a real, authenticated repl fails outright (HTTP 403). If Replit
ships an Agent API, wire it in via `REPLIT_AGENT_CMD` — no `build.sh` change
needed. Until then, A is one upload plus one sentence in Agent chat, and B
is how you script Replit's compute from outside.
