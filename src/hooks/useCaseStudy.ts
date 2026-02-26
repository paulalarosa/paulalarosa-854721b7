import { useTranslation } from "react-i18next";
import { ProjectData, TechStackItem, ProcessStep } from "@/types";

const PROJECTS = ["website", "portfolio", "microsaas", "dashboard", "platform"] as const;
type ProjectKey = (typeof PROJECTS)[number];

export const useCaseStudy = (projectId: string | undefined) => {
  const { t } = useTranslation();

  const getProjectData = (id: string | undefined): ProjectData => {
    const projectKey = id && PROJECTS.includes(id as ProjectKey) ? id : "website";

    const projectImages: Record<string, string> = {
      website: "url(/hero-bg.jpg)",
      portfolio: "url(/hero-bg.jpg)",
      microsaas: "url(/hero-bg.jpg)",
      dashboard: "url(/hero-bg.jpg)",
      platform: "url(/hero-bg.jpg)",
    };

    const projectUrls: Record<string, string> = {
      website: "https://www.consultorfamiliar.com.br/",
      portfolio: "#",
      microsaas: "#",
      dashboard: "#",
      platform: "https://khaoskontrol.com.br",
    };

    const projectStacks: Record<string, TechStackItem[]> = {
      website: [
        { name: "React", icon: "⚛️" },
        { name: "Vite", icon: "⚡" },
        { name: "Tailwind", icon: "🎨" },
        { name: "SEO", icon: "🔍" },
      ],

      portfolio: [
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Framer Motion", icon: "🎬" },
        { name: "Tailwind", icon: "🎨" },
      ],

      microsaas: [
        { name: "React", icon: "⚛️" },
        { name: "Supabase", icon: "🔥" },
        { name: "Node.js", icon: "🟢" },
        { name: "Gamification", icon: "🎮" },
      ],

      dashboard: [
        { name: "React", icon: "⚛️" },
        { name: "Recharts", icon: "📊" },
        { name: "TypeScript", icon: "📘" },
        { name: "SQL", icon: "💾" },
      ],

      platform: [
        { name: "React", icon: "⚛️" },
        { name: "Supabase", icon: "🔥" },
        { name: "Edge Functions", icon: "☁️" },
        { name: "Stripe", icon: "💳" },
      ],
    };

    const tags = t(`lab.projects.${projectKey}.tags`, { returnObjects: true }) as string[];
    const results = t(`caseStudy.${projectKey}.results`, { returnObjects: true }) as string[];
    const process = t(`lab.projects.${projectKey}.process`, {
      returnObjects: true,
    }) as ProcessStep[];

    return {
      key: projectKey,
      title: t(`lab.projects.${projectKey}.title`),
      subtitle: t(`lab.projects.${projectKey}.desc`),
      tags: Array.isArray(tags) ? tags : [],
      challenge: t(`caseStudy.${projectKey}.challenge`),
      solution: t(`caseStudy.${projectKey}.solution`),
      stack: projectStacks[projectKey] || [],
      results: Array.isArray(results) ? results : [],
      liveUrl: projectUrls[projectKey] || "#",
      role: t(`lab.projects.${projectKey}.role`) || "Developer",
      timeline: t(`lab.projects.${projectKey}.timeline`) || "Not specified",
      process: Array.isArray(process) ? process : [],
      image: projectImages[projectKey] || "url(/hero-bg.jpg)",
    };
  };

  const projectData = getProjectData(projectId);

  const getNextProject = (currentKey: string): ProjectData => {
    const currentIndex = PROJECTS.findIndex((p) => p === currentKey);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    return getProjectData(PROJECTS[nextIndex]);
  };

  const nextProject = getNextProject(projectData.key);

  return {
    projectData,
    nextProject,
  };
};
