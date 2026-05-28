import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyOverviewProps {
  data: ProjectData;
}

const CaseStudyOverview = ({ data }: CaseStudyOverviewProps) => {
  const { t } = useTranslation();

  return (
    <section id="overview" className="scroll-mt-32">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <article className="p-8 lg:p-10 rounded-2xl border border-border bg-card">
          <div
            className="inline-block h-1 w-12 rounded-full mb-6"
            style={{ backgroundColor: `${data.accentColor}cc` }}
            aria-hidden="true"
          />
          <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-6 text-primary">
            {t("caseStudy.challengeTitle")}
          </h3>
          <p className="text-base md:text-lg text-foreground/80 leading-[1.7] max-w-prose">
            {data.challenge}
          </p>
        </article>

        <article
          className="p-8 lg:p-10 rounded-2xl border"
          style={{
            backgroundColor: `${data.accentColor}08`,
            borderColor: `${data.accentColor}33`,
          }}
        >
          <div
            className="inline-block h-1 w-12 rounded-full mb-6"
            style={{ backgroundColor: data.accentColor }}
            aria-hidden="true"
          />
          <h3
            className="font-serif text-2xl md:text-3xl font-semibold mb-6"
            style={{ color: data.accentColor }}
          >
            {t("caseStudy.solutionTitle")}
          </h3>
          <p className="text-base md:text-lg text-foreground/80 leading-[1.7] max-w-prose">
            {data.solution}
          </p>
        </article>
      </div>
    </section>
  );
};

export default CaseStudyOverview;
