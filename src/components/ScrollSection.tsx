import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  pin?: boolean;
  scaleDown?: boolean;
  speed?: number;
  noEntrance?: boolean;
}

const ScrollSection = ({
  children,
  className = "",
  id,
  pin = false,
  scaleDown = false,
  speed,
  noEntrance = false,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const maxBlur = isMobile ? 20 : 40;

    const ctx = gsap.context(() => {
      if (pin && scaleDown) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;

            const opacity = Math.max(0, 1 - p * 1.35);
            const scale = 1 - p * 0.18;
            const blur = p * maxBlur;
            const borderRadius = p * 80;

            gsap.set(content, {
              scale,
              opacity,
              filter: `blur(${blur}px)`,
              borderRadius: `${borderRadius}px`,
              transformOrigin: "center top",
              pointerEvents: p > 0.7 ? "none" : "auto",
              visibility: p > 0.9 ? "hidden" : "visible",
            });
          },
        });
      } else if (pin) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      } else if (scaleDown) {
        gsap.to(content, {
          scale: 0.85,
          opacity: 0,
          filter: `blur(${isMobile ? 15 : 30}px)`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.9) {
                gsap.set(content, { visibility: "hidden" });
              } else {
                gsap.set(content, { visibility: "visible" });
              }
            },
          },
        });
      }

      if (speed && speed !== 1) {
        const yOffset = (speed - 1) * 200;
        gsap.fromTo(
          content,
          { y: yOffset },
          {
            y: -yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      
      // Entrance animation — faster, fires earlier, no reverse on scroll-back
      if (!noEntrance) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [pin, scaleDown, speed, noEntrance]);

  return (
    <div ref={sectionRef} id={id} className={`relative ${className}`}>
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default ScrollSection;
