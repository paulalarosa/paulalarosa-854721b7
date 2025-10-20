import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Data-Driven Visual Element */}
      <div className="absolute inset-0 opacity-[0.02] data-grid"></div>
      
      {/* Decorative Lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"></div>
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold text-primary mb-6 leading-[1.1] tracking-tight">
            Paula La Rosa
          </h1>

          {/* Subtitle */}
          <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-gray mb-12 font-light tracking-wide">
            Especialista em Marketing, Inovação e Estratégia Digital
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
            Combinando design estratégico, inteligência competitiva e marketing orientado por dados 
            para criar soluções que geram impacto mensurável nos negócios.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
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
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;