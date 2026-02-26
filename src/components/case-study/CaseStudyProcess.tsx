import { motion } from "framer-motion";
import { ProjectData } from "@/types";

interface CaseStudyProcessProps {
  data: ProjectData;
}

const CaseStudyProcess = ({ data }: CaseStudyProcessProps) => {
  return (
    <section id="process" className="scroll-mt-32">
      <h2 className="font-serif text-3xl font-semibold mb-12">Development Process</h2>
      <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-12">
        {data.process.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-12"
          >
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
              <span className="text-sm font-mono text-accent">0{i + 1}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudyProcess;
