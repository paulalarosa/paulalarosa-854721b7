import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeometricMotion from "./GeometricMotion";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pinned zoom experience
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%", // How long to stay pinned for the zoom
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Background depth
          if (bgRef.current) {
            gsap.set(bgRef.current, {
              scale: 1 + progress * 0.4,
              opacity: 1 - progress * 0.5,
              y: progress * 100,
            });
          }

          // Dramatic Text Zoom
          if (textRef.current) {
            gsap.set(textRef.current, {
              scale: 1 + Math.pow(progress, 2) * 8, // Exponential zoom for "diving in" feel
              opacity: 1 - progress * 1.5, // Fades completely before progress reaches 1
              filter: `blur(${progress * 20}px)`,
            });
          }

          // CTA Lift and Fade
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: progress * -200,
              opacity: 1 - progress * 2.5,
              scale: 1 - progress * 0.5,
            });
          }

          // Hide scroll indicator immediately
          if (scrollRef.current) {
            gsap.set(scrollRef.current, {
              opacity: 1 - progress * 10,
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full"
      style={{ background: "#0a0a0a", height: "100vh" }}
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <GeometricMotion />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          zIndex: 5,
        }}
      />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 will-change-transform"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          className="hero-mask-text font-serif font-bold text-center leading-[0.8] tracking-tighter select-none"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 18rem)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%)",
            filter: "drop-shadow(0 0 50px rgba(255,255,255,0.1))",
          }}
        >
          PAULA
          <br />
          LA ROSA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 text-center font-sans"
          style={{
            fontSize: "clamp(0.75rem, 1.3vw, 1rem)",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
          }}
        >
          Creative UI Engineer & Designer
        </motion.p>
      </div>

      <div
        ref={ctaRef}
        className="relative z-10 flex flex-col sm:flex-row items-center gap-6 mt-16 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("#portfolio")}
            className="bg-white text-black hover:bg-white/90 font-bold px-12 rounded-full h-16 transition-all duration-500 hover:scale-105"
          >
            {t("hero.viewProjects")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20 px-12 rounded-full h-16 transition-all duration-500"
          >
            {t("nav.contact")}
          </Button>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "80px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="font-sans"
          style={{
            fontSize: "10px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {t("hero.scroll")}
        </motion.span>
      </div>
    </section>
  );
};

export default Hero;
