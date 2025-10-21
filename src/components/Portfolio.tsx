import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('todos');

  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.klini.title'),
      category: 'branding',
      categoryLabel: t('portfolio.branding'),
      description: t('portfolio.projects.klini.desc'),
      image: portfolio1,
      tags: t('portfolio.projects.klini.tags', { returnObjects: true }) as string[],
      metrics: '40% ↑'
    },
    {
      id: 2,
      title: t('portfolio.projects.growth.title'),
      category: 'marketing',
      categoryLabel: t('portfolio.digital'),
      description: t('portfolio.projects.growth.desc'),
      image: portfolio2,
      tags: t('portfolio.projects.growth.tags', { returnObjects: true }) as string[],
      metrics: '65% ↑'
    },
    {
      id: 3,
      title: t('portfolio.projects.dashboard.title'),
      category: 'uxui',
      categoryLabel: t('portfolio.ux'),
      description: t('portfolio.projects.dashboard.desc'),
      image: portfolio3,
      tags: t('portfolio.projects.dashboard.tags', { returnObjects: true }) as string[],
      metrics: '50% ↑'
    },
  ];

  const filters = [
    { id: 'todos', label: t('portfolio.all') },
    { id: 'marketing', label: t('portfolio.digital') },
    { id: 'branding', label: t('portfolio.branding') },
    { id: 'uxui', label: t('portfolio.ux') },
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('portfolio.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-base ${
                activeFilter === filter.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-foreground hover:bg-gray-light'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-slow hover-scale">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-slow" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-slow flex items-center justify-center glass-silver">
                  <Button size="sm" className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground shadow-silver backdrop-blur-md border border-accent/30">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Projeto
                  </Button>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 glass-silver rounded-full text-xs font-medium text-primary border border-accent/20">
                  {project.categoryLabel}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-secondary text-foreground rounded border border-border">{tag}</span>
                  ))}
                </div>
                <div className="text-sm font-medium text-accent">{project.metrics}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="https://behance.net/paulalarosa" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-accent/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-base shadow-silver">
              {t('portfolio.viewBehance')}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
