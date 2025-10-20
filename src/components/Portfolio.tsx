import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('todos');

  const projects = [
    {
      id: 1,
      title: 'Identidade Visual Klini Saúde',
      category: 'branding',
      categoryLabel: 'Branding',
      description: 'Sistema completo de identidade visual para startup de saúde, incluindo materiais promocionais e campanhas digitais.',
      image: portfolio1,
      tags: ['Branding', 'Design Gráfico'],
      metrics: '40% ↑ reconhecimento'
    },
    {
      id: 2,
      title: 'Campanha Digital Growth',
      category: 'marketing',
      categoryLabel: 'Marketing Digital',
      description: 'Campanha multicanal com foco em tráfego pago e otimização de conversões através de design estratégico.',
      image: portfolio2,
      tags: ['Google Ads', 'Meta Ads'],
      metrics: '65% ↑ conversões'
    },
    {
      id: 3,
      title: 'UX/UI Dashboard Analytics',
      category: 'uxui',
      categoryLabel: 'UX/UI',
      description: 'Interface de dashboard para análise de dados com foco em usabilidade e visualização de informações complexas.',
      image: portfolio3,
      tags: ['UX/UI', 'Data Viz'],
      metrics: '50% ↑ engajamento'
    },
  ];

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'marketing', label: 'Marketing Digital' },
    { id: 'branding', label: 'Branding' },
    { id: 'uxui', label: 'UX/UI' },
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            Trabalhos em Destaque
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções de design estratégico que combinam criatividade com impacto mensurável
          </p>
        </div>

        {/* Filter Buttons */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-slow hover-scale"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-slow"
                />
                {/* Glassmorphism Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-slow flex items-center justify-center glass-effect">
                  <Button
                    size="sm"
                    className="bg-white/90 text-primary hover:bg-white shadow-lg backdrop-blur-md"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Projeto
                  </Button>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-medium text-primary">
                  {project.categoryLabel}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-secondary text-foreground rounded border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="text-sm font-medium text-accent">
                  {project.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* CTA - View Behance */}
        <div className="text-center mt-16">
          <a 
            href="https://behance.net/paulalarosa" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-base"
            >
              Ver Portfólio Completo no Behance
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;