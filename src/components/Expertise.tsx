import { TrendingUp, Target, Palette, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Expertise = () => {
  const competencies = [
    {
      icon: Target,
      title: 'Planejamento Estratégico & Branding',
      description: 'Desenvolvimento de identidade visual e posicionamento de marca orientado por dados.'
    },
    {
      icon: TrendingUp,
      title: 'Gestão de Tráfego',
      description: 'Google Ads e Meta Ads com foco em ROI e otimização contínua de campanhas.'
    },
    {
      icon: Palette,
      title: 'UX/UI Design & Design Thinking',
      description: 'Criação de experiências digitais centradas no usuário com metodologias ágeis.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Dados & ROI',
      description: 'Inteligência competitiva e decisões baseadas em métricas e performance.'
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            Minhas Competências
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {competencies.map((item, index) => (
            <Card
              key={index}
              className="group p-8 text-center border border-border hover:border-accent/20 hover:shadow-md transition-base bg-card"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
                <item.icon className="h-7 w-7 text-primary stroke-[1.5]" />
              </div>
              <h3 className="font-semibold text-lg text-primary mb-3 font-sans">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
