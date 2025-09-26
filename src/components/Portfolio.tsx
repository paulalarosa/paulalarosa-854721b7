import { useState } from 'react';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Identidade Visual Klini Saúde',
      category: 'branding',
      description: 'Sistema completo de identidade visual para startup de saúde, incluindo materiais promocionais e campanhas digitais.',
      image: portfolio1,
      tags: ['Branding', 'Design Gráfico', 'Marketing Digital'],
      results: '40% aumento no reconhecimento da marca'
    },
    {
      id: 2,
      title: 'Campanha Digital Growth',
      category: 'marketing',
      description: 'Campanha multicanal que aumentou conversões através de design visual estratégico e tráfego pago.',
      image: portfolio2,
      tags: ['Marketing Digital', 'Redes Sociais', 'Growth Hacking'],
      results: '65% aumento nas conversões'
    },
    {
      id: 3,
      title: 'Design de Packaging Premium',
      category: 'packaging',
      description: 'Design de embalagem luxuosa que melhorou a percepção do produto e apelo visual.',
      image: portfolio3,
      tags: ['Packaging', 'Design Luxury', 'Product Marketing'],
      results: '30% aumento nas vendas'
    },
  ];

  const filters = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'branding', label: 'Identidade Visual' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'packaging', label: 'Packaging' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Trabalhos em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma vitrine de soluções de design estratégico que combinam criatividade com impacto nos negócios
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={
                activeFilter === filter.id
                  ? "gradient-hero text-primary-foreground"
                  : "hover:bg-accent/10 hover:text-accent"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-medium transition-smooth border-0 shadow-soft"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Projeto
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="text-sm font-medium text-gold">
                  📈 {project.results}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth"
          >
            Ver Todos os Projetos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;