import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

const LabInnovation = () => {
  const projects = [
    {
      title: "Website & Automação (Consultor Familiar)",
      description: "Desenvolvimento completo (No-Code) de plataforma de serviços, integrando blog, sistema de agendamento e automação de captação de leads. Foco em SEO técnico e performance.",
      tags: ["No-Code", "Desenvolvimento Web", "SEO", "Automação"],
      link: "#",
      available: true
    },
    {
      title: "Portfólio Interativo (Projeto Pessoal)",
      description: "Design (UI/UX) e implementação deste portfólio, focado em microinterações, animações avançadas e arquitetura No-Code, servindo como prova de conceito.",
      tags: ["UI/UX", "Animações Web", "No-Code", "Glassmorphism"],
      link: "#",
      available: false,
      label: "Ver Análise"
    },
    {
      title: "MicroSaaS (Em Desenvolvimento)",
      description: "Desenvolvimento de uma solução MicroSaaS focada em otimizar relatórios de performance para agências utilizando IA e ferramentas No-Code.",
      tags: ["MicroSaaS", "IA", "Automação", "Em Breve"],
      link: "#",
      available: false,
      label: "Saber Mais"
    },
    {
      title: "Dashboard de Performance (Doctor Creator Board)",
      description: "Desenvolvimento de um dashboard analítico (em construção) para criadores de conteúdo na área da saúde. Foco em visualização de dados e métricas de engajamento.",
      tags: ["No-Code", "Dashboard", "DataViz", "Em Construção"],
      link: "#",
      available: false,
      label: "Ver App"
    },
    {
      title: "Plataforma de Gestão (BeautyPro Hub)",
      description: "Idealização e desenvolvimento de uma plataforma MicroSaaS (em construção) para maquiadoras. Foco em agendamento, gestão de clientes e portfólio.",
      tags: ["MicroSaaS", "No-Code", "Agendamento", "Em Construção"],
      link: "#",
      available: false,
      label: "Ver App"
    }
  ];

  return (
    <section id="lab-innovation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">
            Laboratório de Inovação
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            No-Code, IA & MicroSaaS
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

                <a
                  href={project.link}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-base ${
                    project.available 
                      ? 'text-accent hover:text-accent/80' 
                      : 'text-muted-foreground cursor-default'
                  }`}
                  onClick={(e) => !project.available && e.preventDefault()}
                >
                  {project.label || "Visitar Site"}
                  {!project.available && <span className="text-xs">(Em Breve)</span>}
                  {project.available && <ExternalLink className="h-4 w-4" />}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabInnovation;
