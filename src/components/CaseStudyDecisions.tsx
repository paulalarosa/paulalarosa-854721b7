import { motion } from "framer-motion";
import { ProjectData } from "@/types";

interface Props {
  data: ProjectData;
}

const CaseStudyDecisions = ({ data }: Props) => {
  if (!data.decisions?.length) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
            Decisões de design
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3">
            Por que, não o quê.
          </h2>
          <div className="w-8 h-px bg-accent mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {data.decisions.map((decision, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-10 group"
            >
              <span
                className="block font-mono text-xs mb-4"
                style={{ color: data.accentColor, opacity: 0.7 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-3 leading-snug">
                {decision.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {decision.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDecisions;
