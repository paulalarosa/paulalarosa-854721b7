import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyStackProps {
  data: ProjectData;
}

const CaseStudyStack = ({ data }: CaseStudyStackProps) => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="scroll-mt-32">
      <div className="mb-10">
        <div
          className="inline-block h-1 w-12 rounded-full mb-4"
          style={{ backgroundColor: data.accentColor }}
          aria-hidden="true"
        />
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-2">
          {t("caseStudy.stackTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("caseStudy.hoverTechReason")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.stack.map((item, i) => (
          <motion.article
            key={`${item.name}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            viewport={{ once: true }}
            tabIndex={0}
            className="group relative p-5 rounded-xl border bg-card transition-all hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ borderColor: `${data.accentColor}22` }}
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="text-2xl leading-none flex-shrink-0">{item.icon}</span>
              <h3 className="font-semibold text-base text-primary leading-tight pt-0.5">
                {item.name}
              </h3>
            </div>
            {item.reason && (
              <p className="text-xs text-muted-foreground leading-relaxed pl-9 line-clamp-2 group-hover:line-clamp-none group-focus-visible:line-clamp-none transition-all">
                {item.reason}
              </p>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyStack;
