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
      <h2 className="font-serif text-3xl font-semibold mb-8">{t("caseStudy.stackTitle")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.stack.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-xl border border-transparent hover:border-accent/30 transition-all hover:bg-secondary"
          >
            <span className="text-3xl mb-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyStack;
