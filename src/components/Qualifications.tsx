import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const qualifications = [
    {
      number: "01",
      icon: Target,
      title: t('qualifications.items.strategy.title'),
      description: t('qualifications.items.strategy.desc')
    },
    {
      number: "02",
      icon: TrendingUp,
      title: t('qualifications.items.performance.title'),
      description: t('qualifications.items.performance.desc')
    },
    {
      number: "03",
      icon: Lightbulb,
      title: t('qualifications.items.innovation.title'),
      description: t('qualifications.items.innovation.desc')
    }
  ];

  return (
    <section ref={sectionRef} id="qualifications" className="py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold mb-4">
            {t('qualifications.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {qualifications.map((qual, index) => {
            const Icon = qual.icon;
            return (
              <div
                key={qual.number}
                className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Number */}
                <div className="mb-6">
                  <span className="font-serif text-8xl md:text-9xl font-bold opacity-10 leading-none">
                    {qual.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 border-2 border-primary-foreground/20 rounded-xl">
                  <Icon className="h-8 w-8 stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                  {qual.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-primary-foreground/80 leading-relaxed">
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
