<div align="center">

# Paula La Rosa

### Product Designer & Frontend Developer
**Building scalable digital products — from research and Figma to production code.**

[![Live Site](https://img.shields.io/badge/portfolio-live-000000?style=for-the-badge)](https://paulalarosa.com.br)
[![LinkedIn](https://img.shields.io/badge/linkedin-paulalarosa-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paula-la-rosa-228889119/)
[![Behance](https://img.shields.io/badge/behance-paulalarosa-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/paulalarosa)

</div>

---

## About

Frontend developer and product designer based in Rio de Janeiro. I bridge two worlds that rarely speak the same language — engineering and visual design — and I ship both. React + TypeScript on one hand, Figma + design systems on the other. The result: products that look like a designer made them and behave like an engineer wrote them.

This portfolio is also a working showcase of how I build: typed, accessible, internationalized, animated with intent, and instrumented with first-party analytics.

---

## Featured Case

### [Khaos Kontrol →](https://khaoskontrol.com.br)
A complete MicroSaaS CRM for the beauty business. Built from zero — proprietary **Industrial Noir** design system, real-time scheduling, PDF contract generation, financial dashboard, and an AI assistant. React, Vite, Supabase (Auth/DB), Edge Functions.

[Read the full case study →](https://paulalarosa.com.br/case-study/platform)

---

## Tech Stack

**Frontend** &nbsp;·&nbsp; React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Framer Motion · React Router · React Query · React Hook Form + Zod

**Design** &nbsp;·&nbsp; Figma · Design Systems · Design Tokens · WCAG / a11y

**Backend & Infra** &nbsp;·&nbsp; Supabase (Postgres, Auth, Edge Functions) · Node.js · Vercel · Sentry · Google reCAPTCHA v3

**Internationalization** &nbsp;·&nbsp; i18next (PT / EN / ES)

---

## What this codebase shows

- **Architecture** &nbsp;·&nbsp; feature-oriented components, isolated hooks (`useContactForm`, `useAnalytics`, `useRecaptcha`, `useCaseStudy`), shared `lib/constants`, strict TypeScript.
- **Performance** &nbsp;·&nbsp; manual chunking (vendor / motion / i18n / ui), code-splitting via React Router, lazy 3rd-party scripts.
- **UX motion** &nbsp;·&nbsp; scroll-driven parallax, generative canvas background, scroll-progress bars, staged in-view animations.
- **Forms & security** &nbsp;·&nbsp; Zod-validated forms + reCAPTCHA v3 verification before submit.
- **First-party analytics** &nbsp;·&nbsp; custom event pipeline through a Supabase Edge Function — no third-party trackers.
- **Internationalization** &nbsp;·&nbsp; 3 languages, language preference persisted in `localStorage`.
- **Accessibility** &nbsp;·&nbsp; semantic HTML, keyboard navigation, focus states, ARIA labels on icon-only controls.
- **Admin** &nbsp;·&nbsp; protected `/admin` route with role-based access (`user_roles` table) and an analytics dashboard built on Recharts.

---

## Run locally

```sh
git clone https://github.com/paulalarosa/paulalarosa-854721b7.git
cd paulalarosa-854721b7
npm install
cp .env.example .env  # fill in Supabase + reCAPTCHA keys
npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint over the whole project |
| `npm run test` | Vitest watch mode |
| `npm run test:coverage` | One-shot run with coverage |

### Environment

See [`.env.example`](.env.example) for the full list. The site runs locally without keys — Supabase calls fail silently and reCAPTCHA verification is bypassed in dev.

---

## Project structure

```
src/
├─ components/        Section components (Hero, FeaturedProject, Contact, …)
│  ├─ admin/          Analytics dashboard widgets
│  ├─ case-study/     Case-study page sub-sections
│  └─ ui/             shadcn/ui primitives
├─ hooks/             Domain hooks (forms, analytics, recaptcha, case-study)
├─ pages/             Route entry points
├─ i18n/              i18next config + pt / en / es locales
├─ integrations/      Supabase client + generated types
├─ lib/               Shared utilities and constants
├─ services/          External-service wrappers (recaptcha, newsletter)
└─ types/             Zod schemas + shared TS types
```

---

## Selected clients & partners

Bradesco · Cosan · O Boticário · Eudora · Quem Disse, Berenice? · Grupo Mola · Klini · Cravo · Truque Produções · Infnet ECDD · Teatro Estúdio Argentina · Urca Hotel · Rede Casa Hospital · Simplex

---

## Get in touch

- 📧 [prenata@gmail.com](mailto:prenata@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/paula-la-rosa-228889119/)
- 🎨 [Behance](https://www.behance.net/paulalarosa)
- 💬 [WhatsApp](https://wa.me/5521983604870)

---

<div align="center">

*Designed and engineered by Paula La Rosa — Rio de Janeiro 🇧🇷*

</div>
