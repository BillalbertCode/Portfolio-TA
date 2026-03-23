# AGENTS.md - Portfolio-TA

## Project Overview
**Portfolio-TA** is a high-performance, recruitment-oriented personal portfolio built with **Next.js 16** and **React 19**. It leverages **Three.js/R3F** for 3D immersion and **Framer Motion** for refined UI transitions. The project uses a **Next.js App Router** architecture with a custom dictionary-based i18n system (`/[lang]`).

## Setup & Workflow
- **Install:** `npm install`
- **Dev:** `npm run dev` (Runs on `localhost:3000`)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (Mandatory check before completion)
- **Test:** `npm test` (Runs Playwright E2E & A11y tests)
- **Test UI:** `npm run test:ui` (Interactive test runner)
- **Constraint:** Use **npm** exclusively; maintain strict TypeScript types (no `any`).

## Testing Strategy (Playwright)
**Core Mandate:** Ensure the "first impression" and usability are flawless.
- **Smoke Tests (`tests/smoke.spec.ts`):** Confirms the page loads, the main heading is visible, and the Three.js/Rain canvas is mounted correctly.
- **i18n Tests (`tests/i18n.spec.ts`):** Validates that switching between `/es` and `/en` updates the content using the dictionary system and persists language on refresh.
- **Accessibility Audit (`tests/a11y.spec.ts`):** Runs automated WCAG 2.1 AA audits using `@axe-core/playwright`. Essential for a professional developer portfolio.
- **Note:** Test results and reports are excluded from Git via `.gitignore`.

## Core Architecture Concepts
- **i18n:** Dictionary-based translations in `dictionaries/`. Pass `dict` prop from server components to children.
- **Components:** Hybrid model with Server Components for data/translation fetching and Client Components (`'use client'`) for interactivity and 3D.
- **Atmosphere:** Global immersion provided by `AtmosphericBackground.tsx` and centralized motion variants in `lib/animations.ts`.

## Specialized Skills Reference
These concepts define the technical standards and workflows for this repository.

### 1. 3D Web Experience (Three.js & R3F)
**Core Mandate:** Balance visual impact with technical performance.
- **Model Pipeline:** 
  - Use GLB/GLTF formats. 
  - Target < 100K polygons and < 5MB file size.
  - Optimize via `gltf-transform` (draco/webp) if necessary.
- **R3F Implementation:**
  - Always wrap 3D models in `<Suspense>` with a loading fallback.
  - Use `useGLTF` from `@react-three/drei` for asset loading.
  - Implement scroll-driven effects using `ScrollControls` and `useScroll`.
- **Anti-Pattern:** Avoid "3D for 3D's sake"—every element must serve a visual or narrative purpose.

### 2. Frontend Design & Aesthetics
**Core Mandate:** Create distinctive interfaces that avoid "generic AI" aesthetics.
- **Typography:** Pair a characterful, unique display font with a refined body font. Avoid Inter/Arial for primary headings.
- **Motion:** Prioritize high-impact moments (staggered page reveals) over scattered micro-interactions. Use `animation-delay` and scroll-triggers.
- **Composition:** Use unexpected layouts (asymmetry, grid-breaking elements, generous negative space).
- **Textures:** Apply atmospheric depth using gradient meshes, noise textures, and layered transparencies instead of solid colors.

### 3. Shadcn/UI Color System
**Core Mandate:** Adhere to semantic correctness and high contrast.
- **The Accent Rule:** `--accent` is ONLY for iterable or state-dependent content (active, focused, hovered). Never for static text or permanent icons.
- **Semantic Pairing:** Always pair variables with their foreground counterparts (e.g., `bg-primary` + `text-primary-foreground`) to ensure accessibility.
- **Base Variables:**
  - `card`: For discrete containers (Experience/Projects).
  - `muted-foreground`: For secondary metadata/labels.
  - `destructive`: For error/danger states.

### 4. Code & Document Maintenance
**Core Mandate:** Keep agent context actionable and precise.
- **AGENTS.md Integrity:** Update this file whenever new scripts, architectural patterns, or core technologies are introduced.
- **Specifics:** Include exact terminal commands and code snippets when defining new workflows.

---
*This file is a "README for agents." It follows the standards at [agents.md](https://agents.md/).*
