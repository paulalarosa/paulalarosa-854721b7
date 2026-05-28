import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyResultsProps {
  data: ProjectData;
}

const CaseStudyResults = ({ data }: CaseStudyResultsProps) => {
  const { t } = useTranslation();

  return (
    <section id="results" className="scroll-mt-32">
      <div className="mb-10">
        <div
          className="inline-block h-1 w-12 rounded-full mb-4"
          style={{ backgroundColor: data.accentColor }}
          aria-hidden="true"
        />
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary">
          {t("caseStudy.resultsTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.results.map((r, i) => (
          <motion.article
            key={`${r.metric}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="p-6 lg:p-8 rounded-2xl border bg-card flex flex-col gap-3 hover:translate-y-[-2px] transition-transform"
            style={{ borderColor: `${data.accentColor}33` }}
          >
            <span
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
              style={{ color: data.accentColor }}
            >
              {r.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {r.metric}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyResults;
