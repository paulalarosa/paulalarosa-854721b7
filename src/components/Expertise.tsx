import { TrendingUp, Target, Palette, BarChart3, Video, Lightbulb } from 'lucide-react';
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
          {/* Main Card - 2x2 */}
          <Card className="md:col-span-2 md:row-span-2 p-10 border border-border hover:border-accent/30 transition-base bg-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-slow"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 border-gray-light rounded-xl group-hover:border-accent/30 transition-base">
                <Target className="h-10 w-10 text-primary stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary mb-4">
                Planejamento Estratégico & Inovação
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Desenvolvimento de estratégias de marketing orientadas por dados, inteligência competitiva 
                e análise de mercado para impulsionar crescimento sustentável e inovação.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">MBA Marketing</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Inteligência Competitiva</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Análise de Dados</span>
              </div>
            </div>
          </Card>

          {/* Medium Card - 2x1 */}
          <Card className="md:col-span-2 p-8 border border-border hover:border-accent/30 transition-base bg-card group">
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

          {/* Medium Card - 2x1 */}
          <Card className="md:col-span-2 p-8 border border-border hover:border-accent/30 transition-base bg-card group">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 border-2 border-gray-light rounded-xl group-hover:border-accent/30 transition-base">
                <Palette className="h-7 w-7 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-3">
                  UX/UI Design & Design Thinking
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Criação de experiências digitais centradas no usuário com metodologias ágeis e design estratégico.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">Figma</span>
                  <span className="px-2 py-1 text-xs bg-secondary text-foreground rounded">Adobe XD</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <BarChart3 className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              Análise de Dados
            </h3>
            <p className="text-xs text-muted-foreground">
              Métricas & KPIs
            </p>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <Video className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              Edição de Vídeo
            </h3>
            <p className="text-xs text-muted-foreground">
              Premiere & After Effects
            </p>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <Lightbulb className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              Branding
            </h3>
            <p className="text-xs text-muted-foreground">
              Identidade Visual
            </p>
          </Card>

          {/* Small Card - 1x1 */}
          <Card className="p-6 border border-border hover:border-accent/30 transition-base bg-card group text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border-2 border-gray-light rounded-lg group-hover:border-accent/30 transition-base">
              <Target className="h-6 w-6 text-primary stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              SEO & SEM
            </h3>
            <p className="text-xs text-muted-foreground">
              Otimização & Busca
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

