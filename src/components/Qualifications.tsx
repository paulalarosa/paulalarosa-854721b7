import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
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
      { threshold: 0.15 }
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
      title: t('qualifications.items.discovery.title'),
      description: t('qualifications.items.discovery.desc')
    },
    {
      number: "02",
      icon: PenTool,
      title: t('qualifications.items.design.title'),
      description: t('qualifications.items.design.desc')
    },
    {
      number: "03",
      icon: Code2,
      title: t('qualifications.items.build.title'),
      description: t('qualifications.items.build.desc')
    },
    {
      number: "04",
      icon: Rocket,
      title: t('qualifications.items.ship.title'),
      description: t('qualifications.items.ship.desc')
    }
  ];

  return (
    <section ref={sectionRef} id="qualifications" className="py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-sm uppercase tracking-widest text-primary-foreground/60 font-medium font-mono mb-2 block">
            End-to-End
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold mb-6">
            {t('qualifications.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {qualifications.map((qual, index) => {
            const Icon = qual.icon;
            return (
              <div
                key={qual.number}
                className={`relative group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Number Background */}
                <div className="mb-4 relative">
                  <span className="font-serif text-8xl md:text-[140px] font-bold text-primary-foreground opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 leading-none absolute -top-12 -left-4 md:-top-16 md:-left-6 pointer-events-none select-none">
                    {qual.number}
                  </span>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-primary-foreground/20 rounded-xl bg-primary-foreground/5 backdrop-blur-sm group-hover:bg-primary-foreground/10 group-hover:border-accent/50 transition-all duration-300 relative z-10">
                    <Icon className="h-6 w-6 stroke-[1.5] text-primary-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 leading-tight mt-6 relative z-10 group-hover:text-accent transition-colors duration-300">
                  {qual.title}
                </h3>

                {/* Description */}
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
