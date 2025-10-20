import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Lightbulb } from 'lucide-react';

const Qualifications = () => {
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
      title: "Estratégia Data-Driven",
      description: "Transformo dados de mercado e inteligência competitiva em planos de marketing inovadores. Foco em crescimento mensurável e otimização de ROI."
    },
    {
      number: "02",
      icon: TrendingUp,
      title: "Performance & Mídia Paga",
      description: "Especialista em gestão de campanhas de alta performance (Google & Meta Ads). Domínio completo do funil para escalar a aquisição e a visibilidade da marca."
    },
    {
      number: "03",
      icon: Lightbulb,
      title: "Inovação & Liderança",
      description: "Conecto UX, branding e análise de dados para liderar equipes multidisciplinares. Meu objetivo é criar soluções inovadoras que fortalecem o posicionamento da marca."
    }
  ];

  return (
    <section ref={sectionRef} id="qualifications" className="py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold mb-4">
            Destaques de Qualificação
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
