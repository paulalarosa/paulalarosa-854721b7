import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeometricMotion from "./GeometricMotion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55], [1, 1, 0]);

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#0a0a0a",
        minHeight: "115vh",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <GeometricMotion />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{ y: textY, opacity: textOpacity, scale: textScale }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hero-mask-text font-serif font-bold text-center leading-[0.85] tracking-tight select-none"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 12rem)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(210,210,210,0.8) 35%, rgba(255,255,255,0.9) 65%, rgba(180,180,180,0.7) 100%)",
          }}
        >
          PAULA
          <br />
          LA ROSA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-5 text-center font-sans"
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Product Designer & Interface Engineer
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6"
          style={{
            width: "48px",
            height: "1px",
            background: "rgba(255,255,255,0.15)",
            transformOrigin: "center",
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-10"
        style={{ y: ctaY, opacity: ctaOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("#lab-innovation")}
            className="bg-white/[0.07] hover:bg-white/[0.14] text-white/80 hover:text-white border border-white/[0.12] hover:border-white/[0.22] backdrop-blur-sm transition-all duration-300 group px-8 rounded-full"
          >
            {t("hero.viewProjects")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="bg-transparent hover:bg-white/[0.07] text-white/50 hover:text-white/80 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 px-8 rounded-full"
          >
            {t("nav.contact")}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: scrollOpacity }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="font-sans"
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          {t("hero.scroll")}
        </motion.span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
