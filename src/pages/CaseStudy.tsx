import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CaseStudy = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('overview');

  // Handle section tracking for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'stack', 'process', 'results'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project data helper
  const getProjectData = (projectId: string | undefined) => {
    const projectKey = projectId || 'website';

    // Fallback images - normally these would be project specific
    const projectImages: Record<string, string> = {
      website: 'url(/hero-bg.jpg)',
      portfolio: 'url(/hero-bg.jpg)',
      microsaas: 'url(/hero-bg.jpg)',
      dashboard: 'url(/hero-bg.jpg)'
    };

    const projectUrls: Record<string, string> = {
      website: 'https://www.consultorfamiliar.com.br/',
      portfolio: '#',
      microsaas: '#',
      dashboard: '#',
      platform: 'https://khaoskontrol.com.br'
    };

    // Generic stacks
    const projectStacks: Record<string, Array<{ name: string; icon: string }>> = {
      website: [
        { name: 'React', icon: '⚛️' },
        { name: 'Vite', icon: '⚡' },
        { name: 'Tailwind', icon: '🎨' },
        { name: 'SEO', icon: '🔍' }
      ],
      portfolio: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Framer Motion', icon: '🎬' },
        { name: 'Tailwind', icon: '🎨' }
      ],
      microsaas: [
        { name: 'React', icon: '⚛️' },
        { name: 'Supabase', icon: '🔥' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Gamification', icon: '🎮' }
      ],
      dashboard: [
        { name: 'React', icon: '⚛️' },
        { name: 'Recharts', icon: '📊' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'SQL', icon: '💾' }
      ]
    };

    return {
      key: projectKey,
      title: t(`lab.projects.${projectKey}.title`),
      subtitle: t(`lab.projects.${projectKey}.desc`),
      tags: t(`lab.projects.${projectKey}.tags`, { returnObjects: true }) as string[],
      challenge: t(`caseStudy.${projectKey}.challenge`),
      solution: t(`caseStudy.${projectKey}.solution`),
      stack: projectStacks[projectKey] || [],
      results: t(`caseStudy.${projectKey}.results`, { returnObjects: true }) as string[],
      liveUrl: projectUrls[projectKey] || '#',
      role: t(`lab.projects.${projectKey}.role`) || 'Developer',
      timeline: t(`lab.projects.${projectKey}.timeline`) || 'Not specified',
      process: t(`lab.projects.${projectKey}.process`, { returnObjects: true }) as Array<{ title: string; desc: string }> || [],
      image: projectImages[projectKey]
    };
  };

  const caseStudy = getProjectData(id);

  const getNextProject = (currentKey: string) => {
    const projects = ['website', 'portfolio', 'microsaas', 'dashboard'];
    const currentIndex = projects.indexOf(currentKey);
    const nextIndex = (currentIndex + 1) % projects.length;
    return projects[nextIndex];
  };

  const nextProjectKey = getNextProject(caseStudy.key);
  const nextProject = getProjectData(nextProjectKey);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="pt-24 pb-20">
        {/* Navigation & Breadcrumbs */}
        <div className="container mx-auto px-6 mb-8">
          <Link to="/#portfolio">
            <Button variant="ghost" className="group pl-0 hover:bg-transparent text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('nav.portfolio')}
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-4 mb-6">
              {caseStudy.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight max-w-4xl">
              {caseStudy.title}
            </h1>

            <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {caseStudy.subtitle}
              </p>

              <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-accent" />
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">Role</span>
                    <span className="font-medium">{caseStudy.role}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-border" />
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">Timeline</span>
                    <span className="font-medium">{caseStudy.timeline}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-border" />

                {/* Dynamic Button State */}
                {caseStudy.key === 'portfolio' ? (
                  <Button disabled className="w-full bg-secondary text-secondary-foreground opacity-100 cursor-default border border-border">
                    {t('nav.home')} (Você está aqui)
                  </Button>
                ) : caseStudy.liveUrl === '#' ? (
                  <Button disabled className="w-full bg-muted text-muted-foreground opacity-80 cursor-not-allowed">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                      {t('lab.comingSoon')} / WIP
                    </div>
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                      {t('caseStudy.visitLive')} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Layout */}
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 relative">

            {/* Sticky Navigation Sidebar - Desktop Only */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <nav className="flex flex-col gap-2 border-l-2 border-border pl-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'stack', label: 'Tech Stack' },
                    { id: 'process', label: 'Process' },
                    { id: 'results', label: 'Results' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left py-2 text-sm font-medium transition-colors ${activeSection === item.id
                        ? 'text-accent -ml-[26px] border-l-2 border-accent pl-6'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="space-y-24">

              {/* Overview */}
              <section id="overview" className="scroll-mt-32">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="p-8 bg-card border-border">
                    <h3 className="font-serif text-2xl font-semibold mb-6">{t('caseStudy.challengeTitle')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
                  </Card>
                  <Card className="p-8 bg-card border-border">
                    <h3 className="font-serif text-2xl font-semibold mb-6">{t('caseStudy.solutionTitle')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
                  </Card>
                </div>
              </section>

              {/* Stack */}
              <section id="stack" className="scroll-mt-32">
                <h2 className="font-serif text-3xl font-semibold mb-8">{t('caseStudy.stackTitle')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {caseStudy.stack.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-xl border border-transparent hover:border-accent/30 transition-all hover:bg-secondary"
                    >
                      <span className="text-3xl mb-3">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Process Timeline */}
              <section id="process" className="scroll-mt-32">
                <h2 className="font-serif text-3xl font-semibold mb-12">Development Process</h2>
                <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-12">
                  {caseStudy.process.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-8 md:pl-12"
                    >
                      <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                        <span className="text-sm font-mono text-accent">0{i + 1}</span>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground max-w-2xl">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Results */}
              <section id="results" className="scroll-mt-32">
                <h2 className="font-serif text-3xl font-semibold mb-8">{t('caseStudy.resultsTitle')}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {caseStudy.results.map((result, i) => (
                    <Card key={i} className="p-8 text-center bg-accent/5 border-accent/20">
                      <p className="text-lg font-medium">{result}</p>
                    </Card>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Next Project Footer */}
        <section className="container mx-auto px-6 mt-32">
          <div className="border-t border-border pt-16">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Next Project</p>
            <Link
              to={`/case-study/${nextProjectKey}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-3xl md:text-5xl font-bold group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    {nextProject.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground group-hover:text-accent group-hover:translate-x-4 transition-all" />
              </div>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
