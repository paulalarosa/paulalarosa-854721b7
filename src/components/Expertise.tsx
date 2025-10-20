import { TrendingUp, Target, Palette, BarChart3, Zap, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">
            Minhas Competências
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        {/* Bento Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Main Card - 2x2 - Silver accent gradient on hover */}
          <Card className="md:col-span-2 md:row-span-2 p-10 border border-border hover:border-accent/50 transition-base bg-card group relative overflow-hidden hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-slow"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 border-gray-light rounded-xl group-hover:border-accent/50 transition-base">
                <Target className="h-10 w-10 text-primary stroke-[1.5] group-hover:text-accent transition-base" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary mb-4">
                Planejamento Estratégico & Inovação
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Desenvolvimento de estratégias de marketing orientadas por dados, inteligência competitiva 
                e análise de mercado para impulsionar crescimento sustentável e inovação.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-accent/20 text-foreground rounded-full border border-accent/30">MBA Marketing</span>
                <span className="px-3 py-1 text-xs bg-accent/20 text-foreground rounded-full border border-accent/30">Inteligência Competitiva</span>
                <span className="px-3 py-1 text-xs bg-accent/20 text-foreground rounded-full border border-accent/30">Análise de Dados</span>
              </div>
            </div>
          </Card>

          {/* Medium Card - 2x1 */}
          <Card className="md:col-span-2 p-8 border border-border hover:border-accent/30 transition-base bg-card group hover-lift">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 border-2 border-gray-light rounded-xl group-hover:border-accent/30 transition-base">
                <TrendingUp className="h-7 w-7 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-3">
                  Gestão de Tráfego Pago
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Especialização em Google Ads e Meta Ads com foco em ROI e otimização contínua de campanhas multicanal.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">Google Ads</span>
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">Meta Ads</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Medium Card - 2x1 - NEW: Automation & No-Code */}
          <Card className="md:col-span-2 p-8 border border-border hover:border-accent/30 transition-base bg-card group hover-lift">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 border-2 border-gray-light rounded-xl group-hover:border-accent/30 transition-base">
                <Zap className="h-7 w-7 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-3">
                  Automação & Desenvolvimento No-Code
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Construção de soluções tecnológicas, automações e MicroSaaS com ferramentas No-Code e IA para escalar resultados.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">No-Code</span>
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">IA</span>
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">MicroSaaS</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <Palette className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              UX/UI & Design Thinking
            </h3>
            <p className="text-xs text-muted-foreground">
              Figma & Adobe XD
            </p>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <BarChart3 className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              Análise de Dados & ROI
            </h3>
            <p className="text-xs text-muted-foreground">
              Métricas & KPIs
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

