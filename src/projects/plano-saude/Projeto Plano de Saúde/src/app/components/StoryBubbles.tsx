import { motion } from "motion/react";
import { useNavigate } from "react-router";

interface StoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  isNew?: boolean;
  path: string;
}

const stories: StoryItem[] = [
  {
    id: "sos",
    label: "SOS",
    gradientFrom: "#FF6B6B",
    gradientTo: "#EE5A5A",
    isNew: false,
    path: "/sos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: "receita",
    label: "Receita",
    gradientFrom: "#6C5CE7",
    gradientTo: "#A78BFA",
    isNew: true,
    path: "/receitas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6v4H9z" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11v6" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    id: "exame",
    label: "Exame",
    gradientFrom: "#00C48C",
    gradientTo: "#00A878",
    isNew: true,
    path: "/exames",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31" />
        <path d="M14 9.3V1.99" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    id: "dica",
    label: "Dica",
    gradientFrom: "#FFB347",
    gradientTo: "#FFA020",
    isNew: false,
    path: "/dicas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    id: "guia",
    label: "Guias",
    gradientFrom: "#4DA6FF",
    gradientTo: "#2B8FED",
    isNew: false,
    path: "/guias",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
];

export function StoryBubbles() {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-4 overflow-x-auto px-7 pb-2 scrollbar-hide"
      role="list"
      aria-label="Ações rápidas"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {stories.map((story, i) => (
        <motion.button
          key={story.id}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-1.5 flex-shrink-0 outline-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label={story.label}
          role="listitem"
          onClick={() => navigate(story.path)}
        >
          <div className="relative">
            {/* Gradient border ring */}
            <div
              className="w-[56px] h-[56px] rounded-[18px] p-[2.5px]"
              style={{
                background: story.isNew
                  ? `linear-gradient(135deg, ${story.gradientFrom}, ${story.gradientTo})`
                  : `linear-gradient(135deg, ${story.gradientFrom}30, ${story.gradientTo}30)`,
              }}
            >
              <div
                className="w-full h-full rounded-[16px] flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${story.gradientFrom}, ${story.gradientTo})`,
                }}
              >
                {story.icon}
              </div>
            </div>
            {story.isNew && (
              <div
                className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
                style={{
                  background: "#FF6B6B",
                  border: "2px solid #FAFAFD",
                }}
                aria-label="Novo"
              />
            )}
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#8F8FA3",
              letterSpacing: "0.01em",
            }}
          >
            {story.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}