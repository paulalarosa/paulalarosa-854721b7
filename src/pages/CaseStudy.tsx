import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CaseStudy = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  // Project data based on ID
  const getProjectData = (projectId: string | undefined) => {
    const projectKey = projectId || 'website';
    
    // Define project-specific URLs
    const projectUrls: Record<string, string> = {
      website: 'https://www.consultorfamiliar.com.br/',
      portfolio: '#',
      microsaas: '#',
      dashboard: '#',
      platform: '#'
    };
    
    return {
      title: t(`lab.projects.${projectKey}.title`),
      subtitle: t(`lab.projects.${projectKey}.desc`),
      tags: t(`lab.projects.${projectKey}.tags`, { returnObjects: true }) as string[],
      challenge: t('caseStudy.challenge'),
      solution: t('caseStudy.solution'),
      stack: ['Lovable', 'Figma', 'Google Analytics', 'SEO Tools', 'No-Code'],
      results: t('caseStudy.results', { returnObjects: true }) as string[],
      liveUrl: projectUrls[projectKey] || '#',
    };
  };

  const caseStudy = getProjectData(id);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <Link to="/#lab-innovation">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {t('caseStudy.back')}
              </Button>
            </Link>
            
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              {caseStudy.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm text-accent border border-accent/30 rounded-full bg-accent/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8 glass-effect border border-border">
                <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
                  {t('caseStudy.challengeTitle')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </Card>
              
              <Card className="p-8 glass-effect border border-border">
                <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
                  {t('caseStudy.solutionTitle')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl font-semibold text-primary mb-12 text-center">
              {t('caseStudy.stackTitle')}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {caseStudy.stack.map((tech, index) => (
                <Card
                  key={index}
                  className="px-8 py-4 glass-effect border border-border hover:border-accent/50 transition-base"
                >
                  <span className="text-lg font-medium text-primary">{tech}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl font-semibold text-primary mb-12 text-center">
              {t('caseStudy.resultsTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {caseStudy.results.map((result, index) => (
                <Card
                  key={index}
                  className="p-8 text-center glass-effect border border-border hover:border-accent/50 transition-base"
                >
                  <p className="text-lg text-muted-foreground">{result}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                  {t('caseStudy.visitLive')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
