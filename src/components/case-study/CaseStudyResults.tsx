import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyResultsProps {
  data: ProjectData;
}

const CaseStudyResults = ({ data }: CaseStudyResultsProps) => {
  const { t } = useTranslation();

  return (
    <section id="results" className="scroll-mt-32">
      <h2 className="font-serif text-3xl font-semibold mb-8">{t("caseStudy.resultsTitle")}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data.results.map((result, i) => (
          <Card key={i} className="p-8 text-center bg-accent/5 border-accent/20">
            <p className="text-lg font-medium">{result}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyResults;
