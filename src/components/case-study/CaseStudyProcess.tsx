import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";

interface CaseStudyProcessProps {
  data: ProjectData;
}

const CaseStudyProcess = ({ data }: CaseStudyProcessProps) => {
  const { t } = useTranslation();

  return (
    <section id="process" className="scroll-mt-32">
      <div className="mb-12">
        <div
          className="inline-block h-1 w-12 rounded-full mb-4"
          style={{ backgroundColor: data.accentColor }}
          aria-hidden="true"
        />
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary">
          {t("caseStudy.processTitle")}
        </h2>
      </div>

      <ol className="relative space-y-6 md:space-y-8">
        <span
          aria-hidden="true"
          className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px"
          style={{ backgroundColor: `${data.accentColor}33` }}
        />

        {data.process.map((step, i) => {
          const number = String(i + 1).padStart(2, "0");
          return (
            <motion.li
              key={`${step.title}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-16"
            >
              <span
                className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full border bg-background font-mono text-xs font-semibold"
                style={{
                  borderColor: step.highlight ? data.accentColor : `${data.accentColor}55`,
                  color: data.accentColor,
                  boxShadow: step.highlight
                    ? `0 0 0 4px ${data.accentColor}14`
                    : "none",
                }}
              >
                {number}
              </span>

              <div
                className={`p-5 md:p-6 rounded-2xl border ${step.highlight ? "shadow-sm" : ""}`}
                style={{
                  borderColor: step.highlight ? `${data.accentColor}55` : "hsl(var(--border))",
                  backgroundColor: step.highlight ? `${data.accentColor}06` : "hsl(var(--card))",
                }}
              >
                <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">{step.title}</h3>
                  {step.duration && (
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider"
                      style={{ color: data.accentColor }}
                    >
                      {step.duration}
                    </span>
                  )}
                  {step.highlight && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${data.accentColor}1a`,
                        color: data.accentColor,
                      }}
                    >
                      <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                      {t("caseStudy.criticalStep")}
                    </span>
                  )}
                </header>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
};

export default CaseStudyProcess;
