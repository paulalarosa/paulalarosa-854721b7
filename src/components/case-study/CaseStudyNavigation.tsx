import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SECTIONS = ["overview", "stack", "process", "results"] as const;
type SectionId = (typeof SECTIONS)[number];

const CaseStudyNavigation = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const heading = el.querySelector("h2, h3") as HTMLElement | null;
    setTimeout(() => heading?.focus({ preventScroll: true }), 600);
  };

  const labels: Record<SectionId, string> = {
    overview: t("caseStudy.overviewTitle"),
    stack: t("caseStudy.stackTitle"),
    process: t("caseStudy.processTitle"),
    results: t("caseStudy.resultsTitle"),
  };

  return (
    <>
      <nav
        aria-label="Case study sections"
        className="lg:hidden sticky top-20 z-30 -mx-6 px-6 mb-8 bg-background/85 backdrop-blur-md border-y border-border"
      >
        <ul className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {SECTIONS.map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeSection === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {labels[id]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <aside aria-label="Case study sections" className="hidden lg:block">
        <div className="sticky top-32">
          <ul className="flex flex-col gap-1 border-l border-border pl-6">
            {SECTIONS.map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-left py-2 text-sm font-medium transition-colors relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${
                    activeSection === id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeSection === id && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[25px] top-1/2 -translate-y-1/2 h-5 w-px bg-primary"
                    />
                  )}
                  {labels[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default CaseStudyNavigation;
