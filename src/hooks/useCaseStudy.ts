import { useTranslation } from "react-i18next";
import { ProjectData, ProcessStep, TechStackItem, ResultMetric } from "@/types";

export const PROJECTS = ["website", "portfolio", "microsaas", "dashboard", "platform"] as const;
export type ProjectKey = (typeof PROJECTS)[number];

export const isProjectKey = (id: string | undefined): id is ProjectKey =>
  !!id && (PROJECTS as readonly string[]).includes(id);

const PROJECT_URLS: Record<ProjectKey, string> = {
  website: "https://www.consultorfamiliar.com.br/",
  portfolio: "#",
  microsaas: "#",
  dashboard: "#",
  platform: "https://khaoskontrol.com.br",
};

const PROJECT_ACCENT: Record<ProjectKey, string> = {
  website: "#d97706",
  portfolio: "#a3a3a3",
  microsaas: "#8b5cf6",
  dashboard: "#0d9488",
  platform: "#525252",
};

const PROJECT_IMAGE: Record<ProjectKey, string> = {
  website: "/og/website.jpg",
  portfolio: "/og/portfolio.jpg",
  microsaas: "/og/microsaas.jpg",
  dashboard: "/og/dashboard.jpg",
  platform: "/og/platform.jpg",
};

const PROJECT_STACKS: Record<ProjectKey, TechStackItem[]> = {
  website: [
    { name: "React", icon: "⚛️", reason: "Componentes reutilizáveis e ecossistema maduro" },
    { name: "Vite", icon: "⚡", reason: "Build instantâneo e HMR rápido em dev" },
    { name: "Tailwind", icon: "🎨", reason: "Design tokens consistentes sem CSS sobressaturado" },
    { name: "Zod", icon: "🛡️", reason: "Validação tipada nas fronteiras de formulário" },
    { name: "SEO técnico", icon: "🔍", reason: "Schema.org + meta semânticas por rota" },
  ],
  portfolio: [
    { name: "React 18", icon: "⚛️", reason: "Concurrent rendering + Suspense para route-level lazy" },
    { name: "TypeScript", icon: "📘", reason: "Tipagem estrita em toda a base, zero `any`" },
    { name: "GSAP", icon: "🎬", reason: "ScrollTrigger pinned + scrub para o hero cinematic" },
    { name: "Framer Motion", icon: "✨", reason: "Page transitions + AnimatePresence entre rotas" },
    { name: "Lenis", icon: "🌊", reason: "Smooth scroll sincronizado com ScrollTrigger" },
    { name: "Supabase", icon: "🔥", reason: "Analytics first-party via Edge Function" },
  ],
  microsaas: [
    { name: "React + TS", icon: "⚛️", reason: "State machine para flows multi-step" },
    { name: "Supabase", icon: "🔥", reason: "Auth + Postgres + Realtime + Storage num único provider" },
    { name: "Edge Functions", icon: "☁️", reason: "Lógica de gamificação serverless por requisição" },
    { name: "video.js", icon: "▶️", reason: "Streaming adaptativo HLS pra conteúdo em chunks" },
    { name: "XP system", icon: "🎮", reason: "Postgres triggers calculando progresso em tempo real" },
  ],
  dashboard: [
    { name: "React + TS", icon: "⚛️", reason: "Isolamento de estado por widget pra evitar re-renders" },
    { name: "Recharts", icon: "📊", reason: "Composição em SVG com tipagem segura" },
    { name: "LTTB algorithm", icon: "📉", reason: "Decimação visual de séries longas mantendo a forma" },
    { name: "useDeferredValue", icon: "⏱️", reason: "Interações com slider não bloqueiam o paint" },
  ],
  platform: [
    { name: "React + Vite", icon: "⚛️", reason: "Build fast + bundles cirúrgicos pra cada feature" },
    { name: "Supabase", icon: "🔥", reason: "Postgres com RLS, Auth, Storage e Realtime no mesmo backend" },
    { name: "Edge Functions", icon: "☁️", reason: "Geração de PDF server-side e webhooks Pix" },
    { name: "pdf-lib", icon: "📄", reason: "Contratos legais gerados a partir de templates tipados" },
    { name: "Framer Motion", icon: "✨", reason: "Motion language do Design System aplicada em 60+ telas" },
    { name: "Sentry", icon: "🚨", reason: "Observabilidade de erros + performance em produção" },
  ],
};

export const useCaseStudy = (projectId: string | undefined) => {
  const { t } = useTranslation();

  const getProjectData = (id: string | undefined): ProjectData => {
    const key: ProjectKey = isProjectKey(id) ? id : "website";

    const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

    return {
      key,
      title: t(`lab.projects.${key}.title`),
      subtitle: t(`lab.projects.${key}.desc`),
      tags: asArray<string>(t(`lab.projects.${key}.tags`, { returnObjects: true })),
      challenge: t(`caseStudy.${key}.challenge`),
      solution: t(`caseStudy.${key}.solution`),
      stack: PROJECT_STACKS[key],
      results: asArray<ResultMetric>(t(`caseStudy.${key}.results`, { returnObjects: true })),
      liveUrl: PROJECT_URLS[key],
      role: t(`caseStudy.${key}.role`),
      timeline: t(`caseStudy.${key}.timeline`),
      process: asArray<ProcessStep>(t(`caseStudy.${key}.process`, { returnObjects: true })),
      image: PROJECT_IMAGE[key],
      accentColor: PROJECT_ACCENT[key],
    };
  };

  const projectData = getProjectData(projectId);

  const currentIndex = PROJECTS.indexOf(projectData.key);
  const nextProject = getProjectData(PROJECTS[(currentIndex + 1) % PROJECTS.length]);

  return { projectData, nextProject };
};
