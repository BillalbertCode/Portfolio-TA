---
name: shadcn-color-system
description: Procedural guide for Shadcn/UI and Tailwind CSS color variables. Use when styling components, creating new layouts, or refactoring CSS to ensure semantic correctness and high contrast.
---

# Shadcn/UI Color System Guide

Follow these rules for using color variables to maintain design consistency and accessibility.

## Core Mandate: The Accent Rule
**`--accent` is ONLY for iterable or state-dependent content (active, focused, hovered).**
- **Do NOT** use `accent` for static text, permanent icons, or decorative elements that don't change state.
- **DO** use `accent` for:
    - Background of a selected item in a list.
    - Hover state of a button or link (`hover:bg-accent`).
    - Active tab indicator background.
    - Icons that change color when their parent container is active.

## Base Variables Usage

| Variable | Purpose | Case of Use |
| :--- | :--- | :--- |
| `background` | Main application background | Page body, primary sections. |
| `foreground` | Primary text color | Main body text, static headings. |
| `card` | Card background | Discrete container sections (Experience, Projects). |
| `card-foreground` | Content inside cards | Text and icons nested within a `card` component. |
| `muted` | Subdued background | Backgrounds for secondary elements, sidebar items. |
| `muted-foreground` | De-emphasized text | Captions, labels, non-critical metadata. |
| `primary` | High-impact actions | CTA buttons, primary "Submit" or "Action" triggers. |
| `primary-foreground` | Text on primary | Contrast text sitting on a `primary` background. |
| `accent` | Highlight (Active/Focus) | Selected items, hovered surfaces. |
| `accent-foreground` | Text on accent | Contrast text sitting on an `accent` background. |
| `destructive` | Error/Danger actions | Delete buttons, error states, destructive triggers. |
| `border` | Default border | Component dividers, thin lines. |
| `input` | Input/Button borders | Form elements, interactive outlines. |
| `ring` | Focus indicator | Keyboard navigation focus rings. |

## Implementation Patterns

### 1. Selected List Item
```tsx
<div className={cn(
  "p-4 rounded-md",
  active ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground"
)}>
  {item.name}
</div>
```

### 2. Card Content
```tsx
<div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg">
  <h3 className="text-xl font-bold">Static Title</h3>
  <p className="text-muted-foreground">Subdued metadata or description.</p>
</div>
```

## Reviewing Existing Code
When reviewing a component:
1. Identify if the color use is **semantic** (e.g., Is this a caption? Use `muted-foreground`).
2. Verify **Contrast**: Always pair `[color]` with `[color]-foreground`.
3. Check **Accent Usage**: If `accent` is used on a static title, refactor it to `foreground` or a custom brand variable.
