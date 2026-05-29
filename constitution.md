# Constitution — paulalarosa.com

> Architectural DNA for this project. Every spec, plan, and AI prompt must respect these constraints.
> Last updated: 2026-05-28

---

## Identity

**Owner:** Paula La Rosa  
**Site purpose:** Personal portfolio — Product & Service Designer · Design Engineering · AI Strategy  
**Tagline:** Do discovery ao deploy, na mesma cabeça.  
**Tone:** Direct, honest, professional but conversational. No filler phrases, no corporate jargon.

---

## Tech Stack (locked)

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast DX, native ESM |
| Language | TypeScript (strict) | Type safety across components |
| Styling | Tailwind CSS + CSS custom properties | Utility-first, no runtime style cost |
| Animation | GSAP + ScrollTrigger | Precise scroll control; Framer Motion only for icon micro-animations |
| i18n | react-i18next | 3 locales: pt (default), en, es |
| Routing | react-router-dom | SPA, hash-based nav targets |
| Forms | Supabase edge functions | Contact form + newsletter |
| Deploy | AWS S3 + CloudFront | `npm run deploy` → paulalarosa-bucket2 → EQ7ALXF37OFQX |

**Never introduce new runtime dependencies without a clear tradeoff discussion.**

---

## Architecture Constraints

### Scroll system
- All page sections are wrapped in `<ScrollSection>` from `src/components/ScrollSection.tsx`
- Props: `pin`, `scaleDown`, `speed`, `noEntrance`, `fadeOnExit`
- `pin + scaleDown`: hero-style pinned sections that blur/shrink away (HardSkills, Stats)
- `fadeOnExit`: tall content sections (Qualifications, Testimonials) — blur triggers only when section exits viewport, preserving readability
- **Never** apply `pin scaleDown` to sections taller than 1 viewport

### Header
- State managed via CSS `data-scrolled` and `data-in-hero` attributes on `.site-header`
- **No Framer Motion** on the header wrapper — all transitions are CSS only
- Framer Motion permitted only for the hamburger icon animation

### i18n
- Every user-visible string goes through `t("key")` — no hardcoded UI text
- All 3 locales (pt/en/es) must be updated together in the same commit
- Keys live in `src/i18n/locales/{pt,en,es}.json`
- `pt.json` is the source of truth; en/es are translations

### Components
- One component per file in `src/components/`
- No prop drilling beyond 2 levels — use context or co-locate state
- GSAP effects belong inside the component that owns the DOM node
- Cleanup: every `gsap.context()` must be reverted in the `useEffect` return

### Constants
- Social links, contact info → `src/lib/constants.ts` (CONTACT object)
- Never hardcode URLs in components

---

## Positioning (copy guard-rails)

These are the concepts that must be present across all copy. Any rewrite that removes or contradicts these is out of spec:

1. **No-handoff** — Paula designs and codes the same thing. No Figma → Dev ping-pong.
2. **Ecosystem thinking** — Work spans service blueprints, discovery, product strategy, not just screens.
3. **AI as accelerator** — AI Strategy and Gen AI UX are core skills, not buzzwords.
4. **8+ years** — Seniority anchor. Never reduce or omit.
5. **From discovery to deploy** — Full-cycle ownership is the differentiator.

---

## Commit Convention

Format: `type(scope): short description`

| Type | When |
|---|---|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `content` | Copy/text changes (i18n, meta) |
| `ux` | Interaction/animation changes |
| `chore` | Config, deps, scripts |
| `refactor` | Code restructure, no behavior change |

- Batched commits by logical unit (one commit per concern)
- No push without explicit user authorization
- No version tags unless user requests

---

## Spec Workflow (SDD — Option C: Minimal)

For any non-trivial change (new section, major copy rewrite, new component):

1. **Spec file** → `specs/<feature>.md` — what it does, constraints, acceptance criteria
2. **Implement** against the spec
3. **Mark spec done** — add `status: done` frontmatter and date

Skip the spec for: bug fixes, copy tweaks, dependency updates.

```
specs/
  _template.md       ← copy this for new specs
  example-feature.md
```

---

## Out of Scope (don't add without discussion)

- Server-side rendering
- Database reads on the frontend (Supabase is write-only: contact + newsletter)
- A/B testing infrastructure
- Analytics beyond the current `useAnalytics` hook
- Storybook or component harness (deferred — revisit if component count grows)
