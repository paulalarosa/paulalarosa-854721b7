import { useTranslation } from 'react-i18next';
import paulaProfile from '@/assets/paula-profile.png';

const AboutHero = () => {
  const { t } = useTranslation();

  return (
    <section id="about-hero" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Photo Column */}
          <div className="animate-fade-in-up delay-100">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-slow"></div>
              <img
                src={paulaProfile}
                alt="Paula La Rosa - Marketing Coordinator and Innovation Specialist"
                className="relative w-full h-auto rounded-lg shadow-lg object-cover aspect-square lg:aspect-[3/4]"
                loading="eager"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary">
              {t('aboutHero.greeting')}
            </h2>
            <div className="w-16 h-0.5 bg-accent"></div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('aboutHero.intro')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
