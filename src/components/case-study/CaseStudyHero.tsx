import { motion } from "framer-motion";
import { User, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyHeroProps {
  data: ProjectData;
}

const CaseStudyHero = ({ data }: CaseStudyHeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-6 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap gap-4 mb-6">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight max-w-4xl">
          {data.title}
        </h1>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {data.subtitle}
          </p>

          <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-accent" />
              <div>
                <span className="block text-xs text-muted-foreground uppercase tracking-wider">
                  Role
                </span>
                <span className="font-medium">{data.role}</span>
              </div>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-accent" />
              <div>
                <span className="block text-xs text-muted-foreground uppercase tracking-wider">
                  Timeline
                </span>
                <span className="font-medium">{data.timeline}</span>
              </div>
            </div>
            <div className="w-full h-px bg-border" />

            {data.key === "portfolio" ? (
              <Button
                disabled
                className="w-full bg-secondary text-secondary-foreground opacity-100 cursor-default border border-border"
              >
                {t("nav.home")} (Você está aqui)
              </Button>
            ) : data.liveUrl === "#" ? (
              <Button
                disabled
                className="w-full bg-muted text-muted-foreground opacity-80 cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                  {t("lab.comingSoon")} / WIP
                </div>
              </Button>
            ) : (
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                  {t("caseStudy.visitLive")} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudyHero;
