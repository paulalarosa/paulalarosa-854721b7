# DESIGN.md — paulalarosa.com

> Machine-readable design system for AI coding agents.
> Drop this file in your context before generating or editing any UI in this project.

---

## Design Identity

**Style**: Monochromatic editorial — black, white, and silver. No color accent.  
**Personality**: Precise, confident, warm through typography. Not cold minimalism — the Playfair Display serif carries all the warmth.  
**Closest references**: Linear (minimal precision) × Notion (serif editorial warmth) × Framer (motion-first).  
**The rule**: If something needs color to feel important, the hierarchy is wrong. Fix the typography and spacing first.

---

## Color Palette

Purely monochromatic. The only "color" is silver (accent).

```
Background      #FFFFFF   hsl(0 0% 100%)    — pure white canvas
Foreground      #121212   hsl(0 0% 7%)      — near-black text
Primary         #121212   hsl(0 0% 7%)      — dark surfaces (footer, primary buttons)
Primary FG      #FFFFFF   hsl(0 0% 100%)    — text on dark surfaces
Primary Light   #333333   hsl(0 0% 20%)     — dark hover states
Secondary       #F5F5F5   hsl(0 0% 96%)     — off-white surface, section backgrounds
Accent          #B0B0B0   hsl(0 0% 69%)     — silver — the only accent, used sparingly
Accent Light    #C0C0C0   hsl(0 0% 75%)     — lighter silver
Muted           #F5F5F5   hsl(0 0% 96%)     — muted backgrounds
Muted FG        #878787   hsl(0 0% 53%)     — secondary text, captions
Border          #E0E0E0   hsl(0 0% 88%)     — subtle dividers
Gold            custom                      — reserved for special callouts, use rarely
```

**Dark mode** (`.dark` class on `html`): inverts to near-black background (#121212) with white text. Same monochromatic logic applies.

### Gradients
```
Subtle          linear-gradient(180deg, #FFFFFF, #F5F5F5)
Overlay         linear-gradient(135deg, rgba(18,18,18,0.95), rgba(33,33,33,0.9))
Silver          linear-gradient(135deg, #C0C0C0, #B0B0B0)
```

---

## Typography

Two-font system: editorial serif for all headings, clean sans for body.

```
Display / Headings   Playfair Display (serif)    — warmth, editorial authority
Body / UI            Inter (sans-serif)           — clarity, neutrality, precision
```

### Scale (Tailwind defaults apply)
| Role | Size | Font | Weight |
|---|---|---|---|
| Hero display | 4xl–7xl (clamp) | Playfair Display | 600–700 |
| Section heading | 3xl–5xl | Playfair Display | 600 |
| Card heading | xl–2xl | Playfair Display | 500–600 |
| Body | base (16px) | Inter | 400 |
| Caption / label | sm–xs | Inter | 400–500 |
| Eyebrow / tag | xs, uppercase, tracking-widest | Inter | 500 |

**Typography rule**: Serif creates the editorial identity. Body copy is always Inter. Never use Playfair Display at small sizes (below 18px).

---

## Spacing

Generous whitespace. Sections breathe — content is never cramped.

```
Section vertical padding   py-20 to py-32 (80–128px)
Container max-width        max-w-screen-2xl (1400px), centered, px-6
Card padding               p-6 to p-8
Gap between grid items     gap-6 to gap-8
```

---

## Border Radius
```
--radius: 0.5rem (8px)
lg: 8px   md: 6px   sm: 4px
Cards and containers: rounded-lg (8px)
Buttons: rounded-md (6px) or rounded-full for pill shapes
```

---

## Shadows
```
xs   0 1px 2px hsl(0 0% 0% / 0.05)      — subtle lift
sm   0 2px 8px hsl(0 0% 0% / 0.08)      — card hover
md   0 4px 16px hsl(0 0% 0% / 0.10)     — modals, dropdowns
lg   0 8px 24px hsl(0 0% 0% / 0.15)     — elevated panels
silver  0 4px 20px hsl(0 0% 69% / 0.30) — silver glow for accent elements
```

---

## Motion & Animation

Motion is a core part of the visual language — not decoration.

### Scroll system (GSAP + ScrollTrigger)
Every section is wrapped in `<ScrollSection>`:

| Mode | Behavior | Used on |
|---|---|---|
| `pin + scaleDown` | Section pins, then blurs/scales away (0.82) as next section arrives | HardSkills, Stats |
| `fadeOnExit` | Section stays crisp while in view; blurs on exit only (start "bottom 70%") | Qualifications, Testimonials |
| `speed={1.1}` | Parallax offset (featured project) | FeaturedProject |
| default | Entrance from y:40 opacity:0 → y:0 opacity:1 on "top 88%" | Most sections |

### CSS transitions
```
Base     all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
Slow     all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
```

### Header scroll state
CSS-only via `data-scrolled` / `data-in-hero` attributes:
- Default: transparent
- Scrolled: background 97% opacity + backdrop-filter blur(12px) + border
- In hero: nav text becomes white/70

### Principles
- Entrance animations fire once, never reverse on scroll-back
- Blur values: mobile 12–20px, desktop 24–40px
- Always respect `prefers-reduced-motion: reduce`
- No Framer Motion on layout-level elements — only for icon micro-animations

---

## Component Patterns

### Buttons
```
Primary:   bg-primary text-primary-foreground — near-black fill, white text
Secondary: bg-secondary text-foreground — off-white fill
Ghost:     transparent, border border-border, hover:bg-secondary
```
Hover: `hover-lift` (slight translateY + shadow)

### Cards
```
bg-card (white) / dark: bg-card (#1A1A1A)
border border-border
rounded-lg
shadow-sm on hover
```

### Section dividers
`<SectionDivider label="..." />` — thin horizontal rule with centered label in Inter uppercase tracking-widest.

### Tags / badges
Small Inter text, uppercase, tracking-widest, text-muted-foreground. Never colored.

### Links (nav, contact)
Underline-reveal on hover: `::after` pseudo-element scales scaleX from 0→1. Color: `hsl(var(--accent))` = silver.

### Marquee
Double-repeated array scrolling via CSS animation `marquee`. Font: Playfair Display serif, opacity: 20% (intentionally ghosted).

---

## What NOT to do

- No color accents (no blue, green, orange, purple — not even for status indicators)
- No gradients except the defined `--gradient-*` tokens
- No border-radius above `rounded-xl` (16px)
- No shadow heavier than `shadow-lg`
- No Framer Motion on scroll-level wrappers
- No hardcoded colors — always use CSS custom properties via Tailwind tokens
- No new fonts — two fonts max (Playfair Display + Inter)
- No `position: sticky` on sections — use GSAP ScrollTrigger pin instead

---

## Reference sites (visual peers)

If you need design inspiration while building components:

| Site | What to borrow |
|---|---|
| [linear.app](https://getdesign.md/linear.app/design-md) | Precision spacing, ultra-minimal card borders |
| [notion.com](https://getdesign.md/notion/design-md) | Warm serif editorial, soft section backgrounds |
| [framer.com](https://getdesign.md/framer/design-md) | Motion-first layout, bold heading hierarchy |
| [sanity.io](https://getdesign.md/sanity/design-md) | Display type scale, editorial section rhythm |
