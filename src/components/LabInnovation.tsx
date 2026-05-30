import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PrefetchLink from '@/components/PrefetchLink';
import Spotlight from '@/components/Spotlight';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

const webProjects = [
  { id: 'website',   titleKey: 'lab.projects.website.title',   descKey: 'lab.projects.website.desc',   tagsKey: 'lab.projects.website.tags'   },
  { id: 'portfolio', titleKey: 'lab.projects.portfolio.title', descKey: 'lab.projects.portfolio.desc', tagsKey: 'lab.projects.portfolio.tags' },
  { id: 'microsaas', titleKey: 'lab.projects.microsaas.title', descKey: 'lab.projects.microsaas.desc', tagsKey: 'lab.projects.microsaas.tags' },
  { id: 'dashboard', titleKey: 'lab.projects.dashboard.title', descKey: 'lab.projects.dashboard.desc', tagsKey: 'lab.projects.dashboard.tags' },
];

interface Framework {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  figmaUrl: string;
  accentColor: string;
}

const frameworks: Framework[] = [
  {
    id: 'lumi-digital-content',
    title: 'Lumi Digital - Framework de Conteúdo',
    desc: 'Sistema estratégico para gestão e criação de conteúdo digital escalável.',
    tags: ['Marketing Strategy', 'Content System', 'Social Media'],
    figmaUrl: 'https://embed.figma.com/design/RUwQiPGc2Dpi4hYHfqPsnU/Frameworks-Conte%C3%BAdo-Digital?node-id=0-1&embed-host=share',
    accentColor: '#f43f5e',
  },
];

const FrameworkCard = ({
  framework,
  isSelected,
  onSelect,
}: {
  framework: Framework;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <Card
    onClick={onSelect}
    className={`p-6 border cursor-pointer transition-all duration-300 group ${
      isSelected
        ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
        : 'border-border hover:border-accent/40 bg-card'
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2 rounded-lg ${isSelected ? 'bg-accent/20' : 'bg-muted'}`}>
        <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: framework.accentColor }} />
      </div>
      {isSelected && <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-accent" />}
    </div>
    <h4 className="font-serif text-lg font-semibold text-primary mb-2">{framework.title}</h4>
    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{framework.desc}</p>
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {framework.tags.map((tag, i) => (
        <span key={i} className="px-2 py-0.5 text-[9px] font-medium border rounded-full bg-muted/50 text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>
  </Card>
);

const LabInnovation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'design' | 'web' | 'frameworks'>('design');
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(frameworks[0].id);

  return (
    <section id="lab-innovation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('designBackground.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('designBackground.subtitle')}
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />

          <div className="inline-flex items-center gap-1 p-1 bg-secondary rounded-full border border-border">
            {(['design', 'web', 'frameworks'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => { setActiveTab(tab); setHovered(null); }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {tab === 'design'
                  ? t('skills.design.title')
                  : tab === 'web'
                  ? t('skills.marketing.title')
                  : t('skills.frameworks.title')}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ── Product Design — split layout: editorial list + sticky phone frame ── */}
          {activeTab === 'design' && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start max-w-5xl mx-auto">

                {/* LEFT — editorial list */}
                <div className="border-t border-border/60">
                  {projects.map((project, i) => (
                    <Link
                      key={project.id}
                      to={`/projeto/${project.id}`}
                      data-cursor="view"
                      className="group relative flex items-center gap-4 md:gap-8 py-5 md:py-7 border-b border-border/60 overflow-hidden"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                        style={{
                          backgroundColor: project.accentColor,
                          transform: hovered === i ? 'scaleY(1)' : 'scaleY(0)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      {/* index */}
                      <span className="font-mono text-xs text-muted-foreground/50 w-7 flex-shrink-0 select-none pl-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* name + tagline */}
                      <div className="flex-1 min-w-0">
                        <span
                          className="font-serif text-xl md:text-2xl font-semibold leading-tight block transition-colors duration-200"
                          style={{ color: hovered === i ? project.accentColor : 'hsl(var(--foreground))' }}
                        >
                          {project.name}
                        </span>
                        <span className="hidden md:block text-sm text-muted-foreground mt-1 truncate max-w-xs">
                          {project.tagline}
                        </span>
                      </div>
                      {/* sector + year */}
                      <div className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                        <span className="text-xs font-mono text-muted-foreground/60">{project.sector}</span>
                        <span className="text-xs font-mono text-muted-foreground/40">{project.year}</span>
                      </div>
                      <span className="md:hidden text-xs font-mono text-muted-foreground/50 flex-shrink-0">{project.year}</span>
                      <ArrowUpRight
                        className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                        style={{ color: project.accentColor }}
                      />
                    </Link>
                  ))}
                </div>

                {/* RIGHT — sticky phone frame (desktop only) */}
                <div className="hidden lg:block sticky top-28 self-start">
                  {/* Phone shell */}
                  <div
                    className="relative mx-auto rounded-[36px] overflow-hidden border border-foreground/10 bg-background"
                    style={{
                      width: 240,
                      height: 490,
                      boxShadow: '0 32px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 flex justify-center pt-3 z-10 pointer-events-none">
                      <div className="w-14 h-4 rounded-full bg-background border border-foreground/10" />
                    </div>

                    {/* App previews — AnimatePresence for smooth switch */}
                    <AnimatePresence mode="wait">
                      {projects.map((project, i) =>
                        (hovered === i || (hovered === null && i === 0)) && (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="absolute inset-0"
                          >
                            <iframe
                              src={project.appUrl}
                              title={project.name}
                              className="w-full h-full border-none"
                              style={{ pointerEvents: 'none' }}
                            />
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>

                    {/* Bottom fade */}
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                  </div>

                  {/* Label below frame */}
                  <div className="mt-4 text-center" style={{ width: 240, margin: '16px auto 0' }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={hovered ?? 'default'}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest block"
                      >
                        {hovered !== null ? projects[hovered].name : projects[0].name}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── Interface Engineering — web case study cards ── */}
          {activeTab === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {webProjects.map((project) => (
                <Spotlight key={project.id} color="rgba(192,192,192,0.12)" size={420} className="rounded-lg">
                  <Card className="p-8 border border-border hover:border-accent/50 transition-base bg-card group relative overflow-hidden hover-lift glass-effect">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-slow" />
                    <div className="relative z-10">
                      <h3 className="font-serif text-2xl font-semibold text-primary mb-4 leading-tight">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {t(project.descKey)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(t(project.tagsKey, { returnObjects: true }) as string[]).map((tag, i) => (
                          <span key={i} className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full bg-accent/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <PrefetchLink
                        to={`/case-study/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-base group/link"
                      >
                        {t('lab.viewCaseStudy')}
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </PrefetchLink>
                    </div>
                  </Card>
                </Spotlight>
              ))}
            </motion.div>
          )}

          {/* ── Frameworks UI — Figma embed ── */}
          {activeTab === 'frameworks' && (
            <motion.div
              key="frameworks"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                  {frameworks.map((fw) => (
                    <FrameworkCard
                      key={fw.id}
                      framework={fw}
                      isSelected={selectedFramework === fw.id}
                      onSelect={() => setSelectedFramework(fw.id)}
                    />
                  ))}
                </div>
                <div className="lg:col-span-8">
                  <div className="relative aspect-[16/10] bg-card rounded-2xl border border-border overflow-hidden shadow-2xl glass-effect">
                    {selectedFramework ? (
                      <iframe
                        key={selectedFramework}
                        src={frameworks.find((f) => f.id === selectedFramework)?.figmaUrl}
                        className="w-full h-full border-none"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
                        <Lightbulb className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-sm">
                          Selecione um framework para visualizar os detalhes interativos diretamente do Figma.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default LabInnovation;
