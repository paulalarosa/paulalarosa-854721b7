import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GenerativeArt from './GenerativeArt';

const Hero = () => {
  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Generative Art Background */}
      <GenerativeArt />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015] data-grid"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-semibold text-primary mb-8 leading-[0.95] tracking-tight animate-fade-in-up">
            Paula La Rosa
          </h1>

          {/* Subtitle with GEO */}
          <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-gray mb-4 font-light tracking-wide animate-fade-in-up delay-100">
            Especialista em Marketing, Inovação e Estratégia Digital
          </h2>
          
          <p className="font-sans text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in-up delay-200">
            Baseada no Rio de Janeiro
          </p>

          {/* Description with Keywords */}
          <p className="text-lg md:text-xl text-foreground max-w-4xl mb-12 leading-relaxed animate-fade-in-up delay-300">
            Coordenadora de Marketing com MBA em Inteligência Competitiva, especializada em 
            gestão de tráfego (Google Ads e Meta Ads), análise de mercado e design estratégico 
            orientado por dados. Transformo insights competitivos em soluções criativas que 
            geram impacto mensurável nos negócios.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
            <Button
              size="lg"
              onClick={scrollToPortfolio}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm transition-base group px-8"
            >
              Ver Projetos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-base" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToAbout}
              className="border-border hover:bg-secondary transition-base px-8"
            >
              Sobre Mim
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in delay-500">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
