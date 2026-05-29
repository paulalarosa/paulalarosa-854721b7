import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ProjectData } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyHeroProps {
  data: ProjectData;
}

const CaseStudyHero = ({ data }: CaseStudyHeroProps) => {
  const { t } = useTranslation();
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const section = sectionRef.current;
    if (!image || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: "-8%" },
        {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, ${data.accentColor}18 0%, transparent 60%)`,
        }}
      />

      {/* Text content */}
      <div className="container mx-auto px-6 pt-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span
              className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full"
              style={{
                backgroundColor: `${data.accentColor}1f`,
                color: data.accentColor,
                border: `1px solid ${data.accentColor}33`,
              }}
            >
              {t("caseStudy.tagSuffix")}
            </span>
            {data.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] rounded-full bg-secondary text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-semibold text-primary mb-6 leading-[1.02] tracking-tight max-w-4xl">
            {data.title}
          </h1>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start mt-12">
            <p
              className="text-xl md:text-2xl text-foreground/80 leading-[1.45] max-w-2xl"
              style={{ fontWeight: 400 }}
            >
              {data.subtitle}
            </p>

            <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${data.accentColor}1a`, color: data.accentColor }}
                >
                  <User className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    {t("caseStudy.roleLabel")}
                  </span>
                  <span className="font-medium text-sm leading-tight block">{data.role}</span>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${data.accentColor}1a`, color: data.accentColor }}
                >
                  <Calendar className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    {t("caseStudy.timelineLabel")}
                  </span>
                  <span className="font-medium text-sm leading-tight block">{data.timeline}</span>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              {data.key === "portfolio" ? (
                <Button
                  disabled
                  className="w-full bg-secondary text-secondary-foreground opacity-100 cursor-default border border-border"
                >
                  {t("nav.home")} (Você está aqui)
                </Button>
              ) : data.liveUrl === "#" ? (
                <Button
                  disabled
                  className="w-full bg-muted text-muted-foreground opacity-80 cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
                    </span>
                    {t("lab.comingSoon")} / WIP
                  </span>
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: data.accentColor }}
                >
                  <a href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                    {t("caseStudy.visitLive")} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-bleed image band with parallax */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(220px, 38vw, 500px)" }}
      >
        <div
          ref={imageRef}
          className="absolute will-change-transform"
          style={{ inset: "-12% 0" }}
        >
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `${data.accentColor}18` }}
          />
        </div>
        {/* Top + bottom gradient fade */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default CaseStudyHero;
