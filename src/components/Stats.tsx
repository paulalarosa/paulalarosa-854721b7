import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="font-serif text-5xl md:text-7xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm md:text-base uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { value: 5, suffix: '+', label: t('stats.experience') },
    { value: 50, suffix: '+', label: t('stats.projects') },
    { value: 150, suffix: '%', label: t('stats.leadGrowth') },
    { value: 100, suffix: '%', label: t('stats.satisfaction') },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
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
