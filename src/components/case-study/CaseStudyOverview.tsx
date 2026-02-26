import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyOverviewProps {
  data: ProjectData;
}

const CaseStudyOverview = ({ data }: CaseStudyOverviewProps) => {
  const { t } = useTranslation();

  return (
    <section id="overview" className="scroll-mt-32">
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="p-8 bg-card border-border">
          <h3 className="font-serif text-2xl font-semibold mb-6">
            {t("caseStudy.challengeTitle")}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{data.challenge}</p>
        </Card>
        <Card className="p-8 bg-card border-border">
          <h3 className="font-serif text-2xl font-semibold mb-6">{t("caseStudy.solutionTitle")}</h3>
          <p className="text-muted-foreground leading-relaxed">{data.solution}</p>
        </Card>
      </div>
    </section>
  );
};

export default CaseStudyOverview;
