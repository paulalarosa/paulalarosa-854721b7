import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GenerativeArt from './GenerativeArt';
import { useTranslation } from 'react-i18next';
import paulaProfile from '@/assets/paula-profile.png';

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToLab = () => {
    const element = document.querySelector('#lab-innovation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              {/* Main Heading */}
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold text-primary leading-[0.95] tracking-tight animate-fade-in-up">
                Paula La Rosa
              </h1>

              {/* Subtitle */}
              <h2 className="font-sans text-2xl md:text-3xl text-muted-foreground font-light animate-fade-in-up delay-100">
                {t('hero.subtitle')}
              </h2>

              {/* Unified Description */}
              <p className="text-lg leading-relaxed text-foreground animate-fade-in-up delay-200">
                {t('hero.unifiedIntro')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up delay-300">
                <Button
                  size="lg"
                  onClick={scrollToLab}
                  className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground shadow-silver transition-base group px-8 border border-accent/30"
                >
                  {t('hero.viewProjects')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-base" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="border-border hover:bg-secondary transition-base px-8"
                >
                  {t('nav.contact')}
                </Button>
              </div>
            </div>

            {/* Right Column - Photo */}
            <div className="animate-fade-in-up delay-200">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-slow"></div>
                <img
                  src={paulaProfile}
                  alt="Paula La Rosa - Marketing Coordinator and Innovation Specialist"
                  className="relative w-full h-auto rounded-lg shadow-lg object-cover aspect-square lg:aspect-[3/4] grayscale hover:grayscale-0 transition-slow"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in delay-400">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
