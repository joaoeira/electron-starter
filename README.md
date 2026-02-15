# Electron Starter Template

A setup-first, security-hardened Electron starter kit for building desktop apps fast without rebuilding infrastructure every time.

## Stack Included

- Electron Forge + Vite + TypeScript
- Effect + [`electron-effect-rpc`](https://github.com/joaoeira/electron-effect-rpc)
- TanStack Router with hash history
- XState + `@xstate/store`
- Tailwind v4 (CSS-first)
- shadcn UI infrastructure (config only, components on-demand)
- `@silk-hq/components` integrated through local wrappers
- Vitest + Playwright + GitHub Actions CI

## Quick Start

```bash
pnpm install
pnpm setup -- --app-name "My App" --app-id "com.example.myapp"
pnpm dev
```

## Daily Commands

```bash
pnpm dev          # Run Electron app in dev mode
pnpm format       # Format the repo with oxfmt
pnpm format:check # Check formatting in CI mode
pnpm lint         # Lint with oxlint
pnpm test         # Run unit/integration/contract tests
pnpm test:e2e     # Run Playwright Electron smoke tests
pnpm package      # Build installable artifacts via Electron Forge
```

## Project Layout

- `apps/desktop`: Electron main/preload/renderer app
- `packages/app-core`: Effect domain and XState stores/machines
- `packages/ui`: Tailwind theme, shadcn config plumbing, Silk wrappers
- `packages/config`: shared TS/ESLint/Vitest/Prettier config
- `scripts/setup-template.mjs`: one-shot starter bootstrap command

## shadcn Component Workflow

This starter intentionally does not pre-install every shadcn component. Add only what you use from the UI package root:

```bash
cd packages/ui
pnpm dlx shadcn@latest add button
```

## Security Defaults

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- Preload exposes only typed RPC methods
- Electron fuses hardened in Forge config

## Template Placeholders

Default values replaced by `pnpm setup`:

- Name: `electron-starter-template`
- Product: `Electron Starter Template`
- App ID: `com.template.electronstarter`

Use `--force` if you need to re-apply setup after initialization.

## Next Step

Provider abstraction for AI is intentionally deferred. The next phase should add an `AiClient` service in main process, map providers through config, and keep renderer/provider SDKs fully decoupled.
