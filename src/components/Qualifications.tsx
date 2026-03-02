import { useEffect, useRef, useState } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const Qualifications = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const qualifications = [
    {
      number: "01",
      icon: Search,
      title: t("qualifications.items.discovery.title"),
      description: t("qualifications.items.discovery.desc"),
    },
    {
      number: "02",
      icon: PenTool,
      title: t("qualifications.items.design.title"),
      description: t("qualifications.items.design.desc"),
    },
    {
      number: "03",
      icon: Code2,
      title: t("qualifications.items.build.title"),
      description: t("qualifications.items.build.desc"),
    },
    {
      number: "04",
      icon: Rocket,
      title: t("qualifications.items.ship.title"),
      description: t("qualifications.items.ship.desc"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="qualifications"
      className="py-32 bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-sm uppercase tracking-widest text-primary-foreground/60 font-medium font-mono mb-2 block">
            End-to-End
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold mb-6">
            {t("qualifications.title")}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {qualifications.map((qual, index) => {
            const Icon = qual.icon;
            return (
              <div
                key={qual.number}
                className={`relative overflow-hidden p-6 md:p-8 rounded-[2rem] bg-white/[0.015] hover:bg-white/[0.03] backdrop-blur-md transition-all duration-500 group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >

                <span
                  className="absolute -bottom-4 -right-2 font-serif font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "9rem",
                    color: "white",
                    opacity: 0.04,
                    lineHeight: 1,
                  }}
                >
                  {qual.number}
                </span>

                <div className="mb-6 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:bg-white/15 group-hover:border-accent/40 group-hover:shadow-[0_8px_32px_rgba(var(--accent),0.15)] transition-all duration-500 relative z-10">
                    <Icon className="h-7 w-7 stroke-[1.5] text-white group-hover:text-accent transition-colors duration-500" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 leading-tight mt-6 relative z-10 group-hover:text-accent transition-colors duration-300">
                  {qual.title}
                </h3>

                <p className="text-primary-foreground/70 leading-relaxed relative z-10">
                  {qual.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
