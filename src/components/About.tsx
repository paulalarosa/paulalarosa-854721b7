import { GraduationCap, Award, Globe, Palette, Code, TrendingUp } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      text: 'MBA em Inteligência Competitiva'
    },
    {
      icon: Award,
      text: 'Graduação em Design Gráfico'
    },
    {
      icon: Palette,
      text: 'Adobe Suite, Figma'
    },
    {
      icon: TrendingUp,
      text: 'Google Ads, Meta Ads'
    },
    {
      icon: Code,
      text: 'HTML, CSS, WordPress'
    },
    {
      icon: Globe,
      text: 'Inglês Avançado'
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            Sobre Mim
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
          {/* Left Column - About Text */}
          <div className="space-y-6">
            <div className="space-y-5 text-lg leading-relaxed text-foreground">
              <p>
                Designer gráfica com mais de 5 anos de experiência e especialização em marketing digital, 
                atualmente cursando MBA em Inteligência Competitiva e Marketing Orientado por Dados.
              </p>
              
              <p>
                Minha trajetória profissional combina criatividade visual com pensamento estratégico, 
                permitindo desenvolver soluções que não apenas encantam visualmente, mas também geram 
                resultados mensuráveis para os negócios.
              </p>
              
              <p>
                Especializada em coordenação de marketing, gestão de tráfego pago (Google Ads e Meta Ads), 
                branding estratégico e design thinking aplicado à inovação. Transformo dados e insights 
                competitivos em estratégias visuais que impulsionam crescimento.
              </p>

              <p className="text-muted-foreground italic">
                "Acredito que design excepcional vai além da estética—deve ser orientado por dados, 
                centrado no usuário e alinhado aos objetivos de negócio."
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
              Destaques de Qualificação
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-gray-light rounded-lg">
                    <item.icon className="h-5 w-5 text-primary stroke-[1.5]" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;