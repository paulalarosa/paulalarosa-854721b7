import { GraduationCap, Briefcase, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  const skills = [
    'Estratégia de Marca & Identidade',
    'Design para Marketing Digital',
    'Growth Marketing',
    'UI/UX Design',
    'Análise de Marketing',
    'Direção Criativa'
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: 'MBA em Marketing',
      description: 'Inteligência Competitiva e Inovação'
    },
    {
      icon: Briefcase,
      title: '5+ Anos de Experiência',
      description: 'Design & Estratégia de Marketing'
    },
    {
      icon: TrendingUp,
      title: '30% Aumento Médio',
      description: 'Performance dos Clientes'
    },
    {
      icon: Award,
      title: 'Reconhecimento',
      description: 'Excelência em Design'
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Onde Criatividade Encontra Estratégia
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Sou Paula La Rosa, designer gráfica com MBA em Marketing que acredita que 
                design bonito deve fazer mais do que apenas ser visualmente atrativo—deve gerar resultados de negócio.
              </p>
              
              <p>
                Com mais de 5 anos de experiência combinando visão criativa com pensamento estratégico, 
                ajudo empresas a criar identidades visuais que não apenas capturam atenção, mas 
                convertem audiências em clientes fiéis.
              </p>
              
              <p>
                Minha formação única me permite compreender tanto o lado criativo quanto o empresarial 
                de cada projeto, garantindo que toda decisão de design seja respaldada por dados e 
                insights estratégicos.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                Expertise Principal
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center p-3 bg-accent/5 rounded-lg border border-accent/10"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-medium transition-smooth border-0 shadow-soft"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <achievement.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="font-serif text-2xl md:text-3xl text-primary mb-6 leading-relaxed">
              "Design excepcional não é apenas sobre fazer as coisas bonitas—é sobre fazê-las 
              funcionar melhor, vender mais e criar conexões duradouras com as pessoas."
            </blockquote>
            <cite className="text-accent font-medium">— Paula La Rosa</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;