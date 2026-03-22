---
name: react-doctor
description: Run after making React changes to catch issues early. Use when reviewing code, finishing a feature, or fixing bugs in a React project.
version: 1.0.0
---

# React Doctor

Scans your React codebase for security, performance, correctness, and architecture issues. Outputs a 0-100 score with actionable diagnostics.

## When to Use

- After modifying hook logic (`useEffect`, `useMemo`, custom hooks).
- When detecting rendering slowdowns or performance regressions.
- Before committing changes to ensure a score > 75.

## Usage

```bash
npx -y react-doctor@latest [options] [command] [directory]
```

### Main Commands
- **Full Diagnosis**: `npx -y react-doctor@latest . --verbose`
- **Score Only**: `npx -y react-doctor@latest . --score`
- **Auto-fix (via Ami)**: `npx -y react-doctor@latest . --fix`

### Arguments
- `directory`: project directory to scan (default: ".")

### Options
- `-v, --version`: display the version number
- `--lint`: enable linting
- `--no-lint`: skip linting
- `--dead-code`: enable dead code detection
- `--no-dead-code`: skip dead code detection
- `--verbose`: show file details per rule
- `--score`: output only the score
- `-y, --yes`: skip prompts, scan all workspace projects
- `--project <name>`: select workspace project (comma-separated for multiple)
- `--diff [base]`: scan only files changed vs base branch
- `--offline`: skip telemetry (anonymous, not stored, only used to calculate score)
- `--ami`: enable Ami-related prompts
- `--fail-on <level>`: exit with error code on diagnostics: error, warning, none (default: "none")
- `--fix`: open Ami to auto-fix all issues
- `-h, --help`: display help for command

### Commands
- `fix [directory]`: Open Ami to auto-fix react-doctor issues
- `install-ami [directory]`: Install Ami and open it to auto-fix issues

## Workflow (guidelines)

1. **Scan & Analyze**: Execute the diagnosis and prioritize Errors over Warnings.
2. **Threshold**: If the score is < 75, you MUST prioritize fixing:
   - **Security**: `eval` usage, exposed secrets.
   - **Correctness**: Missing keys in lists, asynchronous closures.
3. **Auto-remediation**: Use the "Ami" tool (`--fix`) for automatic corrections when available.
4. **Architectural Integrity**: Always verify that refactoring doesn't break modular architecture (e.g., avoid components > 300 lines).
5. **Validation**: Re-run the scan after fixing to verify the score improvement and ensure no new issues were introduced.
