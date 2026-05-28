import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";
import PrefetchLink from "@/components/PrefetchLink";

interface CaseStudyNextProjectProps {
  nextProject: ProjectData;
}

const CaseStudyNextProject = ({ nextProject }: CaseStudyNextProjectProps) => {
  const { t } = useTranslation();

  return (
    <section aria-label="Next project" className="container mx-auto px-6 mt-32">
      <div className="border-t border-border pt-12">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6 block"
          style={{ color: nextProject.accentColor }}
        >
          {t("caseStudy.nextProjectLabel")}
        </span>

        <PrefetchLink
          to={`/case-study/${nextProject.key}`}
          className="group relative block overflow-hidden rounded-3xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 50%, ${nextProject.accentColor}26 0%, transparent 60%), linear-gradient(120deg, transparent 0%, ${nextProject.accentColor}10 100%)`,
            }}
          />

          <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 p-8 md:p-12">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {nextProject.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] rounded-full bg-secondary text-muted-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-3xl md:text-5xl font-semibold text-primary group-hover:text-accent transition-colors leading-[1.05]">
                {nextProject.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                {nextProject.subtitle}
              </p>
            </div>

            <span
              className="flex items-center justify-center h-14 w-14 md:h-20 md:w-20 rounded-full border transition-all group-hover:translate-x-2"
              style={{
                borderColor: `${nextProject.accentColor}55`,
                backgroundColor: `${nextProject.accentColor}1a`,
                color: nextProject.accentColor,
              }}
            >
              <ArrowRight className="h-6 w-6 md:h-8 md:w-8" />
            </span>
          </div>
        </PrefetchLink>
      </div>
    </section>
  );
};

export default CaseStudyNextProject;
