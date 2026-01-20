import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LabInnovation = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      id: 'website',
      title: t('lab.projects.website.title'),
      description: t('lab.projects.website.desc'),
      tags: t('lab.projects.website.tags', { returnObjects: true }) as string[],
      available: true
    },
    {
      id: 'portfolio',
      title: t('lab.projects.portfolio.title'),
      description: t('lab.projects.portfolio.desc'),
      tags: t('lab.projects.portfolio.tags', { returnObjects: true }) as string[],
      available: true
    },
    {
      id: 'microsaas',
      title: t('lab.projects.microsaas.title'),
      description: t('lab.projects.microsaas.desc'),
      tags: t('lab.projects.microsaas.tags', { returnObjects: true }) as string[],
      available: true
    },
    {
      id: 'dashboard',
      title: t('lab.projects.dashboard.title'),
      description: t('lab.projects.dashboard.desc'),
      tags: t('lab.projects.dashboard.tags', { returnObjects: true }) as string[],
      available: true
    }
  ];

  return (
    <section id="lab-innovation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('designBackground.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            {t('designBackground.subtitle')}
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="p-8 border border-border hover:border-accent/50 transition-base bg-card group relative overflow-hidden hover-lift glass-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-slow"></div>
              
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-4 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full bg-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.available ? (
                  <Link
                    to={`/case-study/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-base group/link"
                  >
                    {t('lab.viewCaseStudy')}
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-default">
                    {t('lab.comingSoon')}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabInnovation;
