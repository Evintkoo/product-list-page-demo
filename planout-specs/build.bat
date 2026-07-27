@echo off
REM Auto-build agent runner — double-click to start.
REM Override defaults via env vars: AGENT_CMD, PROMPT_FILE, MAX_BUDGET_USD
REM   MAX_BUDGET_USD  hard spend cap in USD for the default AGENT_CMD (default 15).
REM                   Set MAX_BUDGET_USD=0 to run uncapped. A cap can end a large
REM                   build before /app/ is finished — raise it if truncated.
REM (Progress-log tee is POSIX-only; use build.sh under WSL or Git Bash for it.)
cd /d "%~dp0"

REM Default is a per-project estimate the server substitutes for
REM 18 at generation. If left unsubstituted (bundle assembled
REM without the server), the numeric self-heal below falls back to a flat 15.
if not defined MAX_BUDGET_USD set "MAX_BUDGET_USD=18"
echo %MAX_BUDGET_USD%| findstr /r "^[0-9][0-9.]*$" >nul || set "MAX_BUDGET_USD=15"
set "BUDGET_FLAG= --max-budget-usd %MAX_BUDGET_USD%"
if "%MAX_BUDGET_USD%"=="0" set "BUDGET_FLAG="
if not defined AGENT_CMD set "AGENT_CMD=claude -p --output-format stream-json --verbose --dangerously-skip-permissions%BUDGET_FLAG%"
if not defined PROMPT_FILE set "PROMPT_FILE=spec/AGENTS.md"

echo =========================================
echo   Code Auto-Builder
echo =========================================
echo.
echo   Agent:     %AGENT_CMD%
echo   Prompt:    %PROMPT_FILE%
echo   Directory: %cd%
echo.
echo   Steps:
echo     1. Read %PROMPT_FILE% and scan project
echo     2. Scaffold app structure
echo     3. Generate code from pseudocode + hints
echo     4. Write UI from .png + .structure.txt
echo     5. Install dependencies
echo     6. Verify dev server starts
echo.
echo =========================================
echo.

setlocal enabledelayedexpansion
set "PROMPT="
for /f "usebackq delims=" %%a in ("%PROMPT_FILE%") do set "PROMPT=!PROMPT! %%a"
%AGENT_CMD% "!PROMPT!" | jq --unbuffered -rj "if .type==\"assistant\" then .message.content[]? | if .type==\"text\" then \"\\n\" + .text + \"\\n\" elif .type==\"tool_use\" then \".\" else empty end elif .type==\"user\" then .message.content[]? | if .type==\"tool_result\" then \".\" else empty end elif .type==\"result\" then \"\\n\\n done (cost: $\\(.total_cost_usd // 0))\\n\" else empty end"
