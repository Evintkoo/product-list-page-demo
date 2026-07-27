#!/usr/bin/env bash
# Auto-build agent runner — double-click or run: ./build.sh
#
# Override defaults via env vars:
#   AGENT_CMD="..."     # the agent CLI invocation (default: Claude with stream-json flags)
#   CLAUDE_MODEL="..."  # model the default AGENT_CMD runs (default: opus —
#                       # the most capable model, so the build actually completes
#                       # /app/ end-to-end). Set CLAUDE_MODEL=sonnet or =haiku for
#                       # a cheaper, faster build. Ignored if you override AGENT_CMD.
#   MAX_BUDGET_USD="..."# hard spend cap for the default AGENT_CMD, in USD
#                       # (default: 15). The run stops once it has spent ~this
#                       # much. Set MAX_BUDGET_USD=0 (or empty) to disable the cap
#                       # and run uncapped. Ignored if you override AGENT_CMD.
#                       # Note: a cap can end a large build before /app/ is
#                       # finished — raise it (or set 0) if the build is truncated.
#   PROMPT_FILE="..."   # path to the prompt/contract file (default: AGENTS.md)
#   PROGRESS_LOG="..."  # raw NDJSON event log (default: .build/progress.log)
#
# The default jq renderer assumes Claude Code's `--output-format stream-json`
# schema. If you swap AGENT_CMD to a non-Claude provider, the rendered stdout
# will likely be empty — read PROGRESS_LOG for the raw event stream instead.

set -euo pipefail
cd "$(dirname "$0")"

# Hard spend cap (USD) for the default agent run. `--max-budget-usd` is a native
# Claude Code print-mode flag; the run stops once it has spent ~this much. Set
# MAX_BUDGET_USD=0 (or empty) to run uncapped. Only applied to the DEFAULT
# AGENT_CMD — if you override AGENT_CMD, add your own cap.
#
# The default is a per-project estimate the server substitutes for
# 18 at generation (sized to this bundle's features /
# pseudocode / assets). If this bundle was assembled without the server, the
# placeholder is left as-is; the numeric guard below then falls back to a flat 15.
DEFAULT_BUDGET_USD="18"
case "$DEFAULT_BUDGET_USD" in ''|*[!0-9.]*) DEFAULT_BUDGET_USD="15" ;; esac
MAX_BUDGET_USD="${MAX_BUDGET_USD-$DEFAULT_BUDGET_USD}"
if [ -n "$MAX_BUDGET_USD" ] && [ "$MAX_BUDGET_USD" != "0" ]; then
  BUDGET_FLAG=" --max-budget-usd ${MAX_BUDGET_USD}"
else
  BUDGET_FLAG=""
fi

AGENT_CMD="${AGENT_CMD:-claude -p --model ${CLAUDE_MODEL:-opus} --output-format stream-json --verbose --dangerously-skip-permissions${BUDGET_FLAG}}"
PROMPT_FILE="${PROMPT_FILE:-spec/AGENTS.md}"
PROGRESS_LOG="${PROGRESS_LOG:-.build/progress.log}"

mkdir -p "$(dirname "$PROGRESS_LOG")"

echo "========================================="
echo "  Code Auto-Builder - ver 0.10"
echo "========================================="
echo ""
echo "  Agent:   $AGENT_CMD"
echo "  Prompt:  $PROMPT_FILE"
echo "  Log:     $PROGRESS_LOG"
if [ -n "$BUDGET_FLAG" ]; then
  echo "  Budget:  \$${MAX_BUDGET_USD} (set MAX_BUDGET_USD=0 to disable)"
else
  echo "  Budget:  uncapped"
fi
echo ""
echo "  Steps:"
echo "    1. Read $PROMPT_FILE and scan project"
echo "    2. Scaffold app structure"
echo "    3. Generate code from pseudocode + hints"
echo "    4. Write UI from .png + .structure.txt"
echo "    5. Install dependencies"
echo "    6. Verify dev server starts"
echo ""
echo "========================================="
echo "Starting analysis"

$AGENT_CMD "$(cat "$PROMPT_FILE")" \
  | tee "$PROGRESS_LOG" \
  | jq --unbuffered -j '
      if .type=="assistant" then
        .message.content[]? |
        if .type=="text" then "\n" + .text + "\n"
        elif .type=="tool_use" then "."
        else empty end
      elif .type=="user" then
        .message.content[]? |
        if .type=="tool_result" then "."
        else empty end
      elif .type=="result" then
        "\n✅ done (cost: $\(.total_cost_usd // 0), tokens: in=\(.usage.input_tokens // 0) out=\(.usage.output_tokens // 0) total=\((.usage.input_tokens // 0) + (.usage.output_tokens // 0)))\n"
      else empty end
    '

# ---------------------------------------------------------------------------
# GxP pack — assemble the agent-authored HTML documents into one print-ready
# file under spec/summary: "spec/summary/User Requirements Specification.html".
# No pandoc, no project libraries — the docs ARE HTML; build.sh renders them to
# PDF with a headless browser (system Chrome/Chromium/Edge, or a one-off headless
# Chromium via `npx puppeteer`). The print CSS in _head.html lays it out A4.
# No-op when no spec/GxP was shipped.
# ---------------------------------------------------------------------------
if [ -d spec/GxP ]; then
  HEAD="spec/GxP/assets/_head.html"
  FOOT="spec/GxP/assets/_foot.html"
  if [ -f "$HEAD" ] && [ -f "$FOOT" ]; then
    echo ""
    echo "GxP pack — assembling HTML..."
    mkdir -p spec/GxP/out/html spec/summary
    shopt -s nullglob

    # 1) wrap each authored fragment into a standalone, viewable HTML document
    for f in spec/GxP/src/*.html; do
      base="$(basename "${f%.html}")"
      cat "$HEAD" "$f" "$FOOT" > "spec/GxP/out/html/${base}.html"
      echo "  ✓ ${base}.html"
    done

    # 2) merged deliverable: cover + every document, one per printed page
    out="spec/summary/User Requirements Specification.html"
    title="$(node -p "require('./app/package.json').name" 2>/dev/null || basename "$PWD")"
    {
      cat "$HEAD"
      printf '<div class="cover"><h1>%s</h1><div class="sub">User Requirements Specification &middot; %s</div></div>\n' \
        "$title" "$(date +%Y-%m-%d)"
      for f in spec/GxP/src/*.html; do
        printf '<section class="doc-page">\n'
        cat "$f"
        printf '\n</section>\n'
      done
      cat "$FOOT"
    } > "$out"
    echo "  ✓ merged → $out"

    # 3) render every document AND the merged deliverable to real PDFs. This is
    #    the "browser makes the PDF" step, automated so the files exist without
    #    anyone printing by hand. Per-document PDFs land in spec/GxP/out/pdf/,
    #    the merged deliverable next to its HTML in spec/summary/.
    mkdir -p spec/GxP/out/pdf

    # Collect "html<TAB>pdf" render jobs.
    GXP_JOBS=()
    for f in spec/GxP/out/html/*.html; do
      base="$(basename "${f%.html}")"
      GXP_JOBS+=("$f	spec/GxP/out/pdf/${base}.pdf")
    done
    GXP_JOBS+=("$out	spec/summary/User Requirements Specification.pdf")

    # Find a system Chrome/Chromium/Edge (offline path, no download).
    GXP_BROWSER=""
    for c in google-chrome-stable google-chrome chromium chromium-browser chrome \
             microsoft-edge-stable microsoft-edge brave-browser chrome-headless-shell; do
      if command -v "$c" >/dev/null 2>&1; then GXP_BROWSER="$(command -v "$c")"; break; fi
    done
    if [ -z "$GXP_BROWSER" ]; then
      for p in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
               "/Applications/Chromium.app/Contents/MacOS/Chromium" \
               "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
               "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"; do
        if [ -x "$p" ]; then GXP_BROWSER="$p"; break; fi
      done
    fi

    # render_with_browser: prints from a space-free temp dir so spaces in the
    # bundle path (e.g. "~/Downloads/02 - Dashboard") never corrupt the file URL.
    render_with_browser() {  # $1=html  $2=pdf
      local td; td="$(mktemp -d)" || return 1
      cp "$1" "$td/page.html"
      local ok=1 mode
      for mode in "--headless=new" "--headless"; do
        if "$GXP_BROWSER" "$mode" --disable-gpu --no-sandbox --no-pdf-header-footer \
             --print-to-pdf="$td/out.pdf" "file://$td/page.html" >/dev/null 2>&1 \
           && [ -s "$td/out.pdf" ]; then ok=0; break; fi
      done
      [ "$ok" -eq 0 ] && mv "$td/out.pdf" "$2"
      rm -rf "$td"
      return "$ok"
    }

    GXP_PDF_OK=0
    if [ -n "$GXP_BROWSER" ]; then
      echo "GxP pack — rendering PDFs via $GXP_BROWSER ..."
      GXP_PDF_OK=1
      for job in "${GXP_JOBS[@]}"; do
        html="${job%%	*}"; pdf="${job##*	}"
        if render_with_browser "$html" "$pdf"; then echo "  ✓ ${pdf}"; else GXP_PDF_OK=0; fi
      done
    fi

    # Fallback: no system browser — render with a one-off headless Chromium via
    # `npx puppeteer` (downloads on first use). pathToFileURL encodes spaces.
    if [ "$GXP_PDF_OK" -ne 1 ]; then
      echo "GxP pack — rendering PDFs via headless Chromium (npx puppeteer) ..."
      if printf '%s\n' "${GXP_JOBS[@]}" | npx --yes -p puppeteer node -e '
        const pptr = require("puppeteer");
        const { pathToFileURL } = require("url");
        const path = require("path");
        const fs = require("fs");
        (async () => {
          const jobs = fs.readFileSync(0, "utf8").split("\n").filter(Boolean)
            .map((l) => { const i = l.indexOf("\t"); return [l.slice(0, i), l.slice(i + 1)]; });
          const b = await pptr.launch({ args: ["--no-sandbox"] });
          for (const [html, pdf] of jobs) {
            const pg = await b.newPage();
            await pg.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: "load" });
            await pg.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true });
            await pg.close();
            console.log("  ✓ " + pdf);
          }
          await b.close();
        })().catch((e) => { console.error("  PDF render failed:", e.message); process.exit(1); });
      '; then GXP_PDF_OK=1; fi
    fi

    if [ "$GXP_PDF_OK" -ne 1 ]; then
      echo "  ⚠ Could not auto-render PDFs (no browser found and npx/puppeteer unavailable)."
      echo "    Open '$out' in a browser and choose Print → \"Save as PDF\"."
    fi

    shopt -u nullglob
  fi
fi
