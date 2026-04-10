import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <div
      ref={ref}
      className="text-center"
    >
      <div className="font-serif text-6xl md:text-8xl font-bold tracking-tighter text-primary mb-3">
        {count}
        {suffix}
      </div>
      <div className="text-foreground/40 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { value: 5, suffix: "+", label: t("stats.experience") },
    { value: 50, suffix: "+", label: t("stats.projects") },
    { value: 150, suffix: "%", label: t("stats.leadGrowth") },
    { value: 100, suffix: "%", label: t("stats.satisfaction") },
  ];

  return (
    <section className="py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
