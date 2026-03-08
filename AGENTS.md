# GEMINI.md - Portfolio-TA

## Project Overview
**Portfolio-TA** is a high-performance, recruitment-oriented personal portfolio built with Next.js 16 and React 19. The project focuses on creating a visually impactful experience for talent recruiters while maintaining high technical standards.

## Foundational Mandates

1. **Visual Performance First:** Every feature should be optimized for both visual "wow factor" and technical performance. This includes efficient 3D rendering (Three.js) and smooth animations (Framer Motion).
2. **Strict & Modern React:** Adhere to the latest React 19 and Next.js 16 patterns. Use strict TypeScript for all components and logic.
3. **Shadcn/UI Strategy:** Prioritize the use and extension of Shadcn/UI components for a consistent and professional UI. Avoid creating redundant custom components when a Shadcn/UI primitive exists.
4. **Tailwind 4 Integration:** Utilize the features of Tailwind CSS v4 for styling. Ensure all new styles are consistent with the existing theme.
5. **Dependency Management:** Always use `npm` (not `pnpm` or `yarn`) for installing and managing packages, following the recent migration.
6. **3D Scene Integrity:** Be extremely careful when modifying `ModelViewer.tsx` or related Three.js configurations to ensure the 3D assets (like `tensa_zangetsu.glb`) load and render correctly across devices.

## Tech Stack Summary
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19 (Strict Mode)
- **Styling:** Tailwind CSS 4, Framer Motion
- **3D:** React Three Fiber, Three.js
- **UI Components:** Shadcn/UI (Radix UI primitives)
- **State/Forms:** React Hook Form, Zod

## Development Workflow
- **Linting:** Ensure `npm run lint` passes before completing any task.
- **Type Checking:** All new code must be fully typed; avoid `any`.
- **Testing:** (TBD - Add testing mandates once a framework is chosen).
