import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HardSkills = () => {
  const { t } = useTranslation();

  const designStrategy = [
    { name: t("hardSkills.marquee.uxResearch"), icon: "🔍" },
    { name: t("hardSkills.marquee.uiDesign"), icon: "🎨" },
    { name: t("hardSkills.marquee.figma"), icon: "✏️" },
    { name: t("hardSkills.marquee.designSystems"), icon: "🧩" },
    { name: t("hardSkills.marquee.interactionDesign"), icon: "✨" },
    { name: t("hardSkills.marquee.visualIdentity"), icon: "💎" },
    { name: t("hardSkills.marquee.wireframing"), icon: "🖋️" },
    { name: t("hardSkills.marquee.prototyping"), icon: "📱" },
  ];

  const interfaceEngineering = [
    { name: t("hardSkills.marquee.react"), icon: "⚛️" },
    { name: t("hardSkills.marquee.typescript"), icon: "📘" },
    { name: t("hardSkills.marquee.nextjs"), icon: "▲" },
    { name: t("hardSkills.marquee.tailwind"), icon: "💅" },
    { name: t("hardSkills.marquee.framer"), icon: "🎬" },
    { name: t("hardSkills.marquee.architecture"), icon: "🏗️" },
    { name: t("hardSkills.marquee.performance"), icon: "⚡" },
    { name: t("hardSkills.marquee.accessibility"), icon: "♿" },
  ];

  return (
    <section
      id="expertise"
      className="py-24 bg-background overflow-hidden border-y border-border/50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 font-medium font-mono">
            {t("hardSkills.ecosystem")}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-primary mt-3 mb-4">
            {t("hardSkills.title")}
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-4"></div>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-6 w-full max-w-[100vw] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee" style={{ animationDuration: "40s", width: "max-content" }}>
          {[...designStrategy, ...designStrategy, ...designStrategy].map((tech, index) => (
            <div key={`front-${index}`} className="flex-shrink-0 mx-3">
              <div className="flex items-center gap-3 px-6 py-3.5 bg-card/60 backdrop-blur-sm border border-border/60 rounded-full hover:border-accent/40 hover:bg-card/80 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-default">
                <span className="text-xl">{tech.icon}</span>
                <span className="font-medium text-foreground tracking-wide whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        { }
        <div
          className="flex animate-marquee"
          style={{ animationDirection: "reverse", animationDuration: "45s", width: "max-content" }}
        >
          {[...interfaceEngineering, ...interfaceEngineering, ...interfaceEngineering].map((tech, index) => (
            <div key={`back-${index}`} className="flex-shrink-0 mx-3">
              <div className="flex items-center gap-3 px-6 py-3.5 bg-card/60 backdrop-blur-sm border border-border/60 rounded-full hover:border-accent/40 hover:bg-card/80 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-default">
                <span className="text-xl">{tech.icon}</span>
                <span className="font-medium text-foreground tracking-wide whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardSkills;
