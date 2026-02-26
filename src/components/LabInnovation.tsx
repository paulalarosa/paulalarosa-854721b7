import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const webProjects = [
  { id: 'website', titleKey: 'lab.projects.website.title', descKey: 'lab.projects.website.desc', tagsKey: 'lab.projects.website.tags' },
  { id: 'portfolio', titleKey: 'lab.projects.portfolio.title', descKey: 'lab.projects.portfolio.desc', tagsKey: 'lab.projects.portfolio.tags' },
  { id: 'microsaas', titleKey: 'lab.projects.microsaas.title', descKey: 'lab.projects.microsaas.desc', tagsKey: 'lab.projects.microsaas.tags' },
  { id: 'dashboard', titleKey: 'lab.projects.dashboard.title', descKey: 'lab.projects.dashboard.desc', tagsKey: 'lab.projects.dashboard.tags' },
];

interface DesignInsight { label: string; annotation: string; }

// iframeConfig — só necessário para apps que renderizam em desktop (ex: Akad).
// Akad tem PhoneFrame decorativo próprio num canvas de 1280px.
// Matemática: scale=260/390=0.6667, translateX=-(1280-390)/2=-445px
// Se após o deploy o phone do Akad aparecer deslocado, ajuste aqui:
//   translateX mais negativo → move conteúdo mais para a esquerda (se o phone aparecer à direita)
//   translateX menos negativo → move para a direita (se aparecer à esquerda)
//   scale maior → mais zoom; scale menor → menos zoom
interface IframeConfig {
  viewportWidth: number;   // px — viewport simulado
  scale: number;           // ex: 0.6667
  translateX: number;      // px — offset horizontal (negativo = vai para esquerda)
  translateY?: number;     // px — offset vertical (negativo = sobe)
}

interface DesignProject {
  id: string; name: string; sector: string;
  description: string; tags: string[];
  appUrl: string; accentColor: string;
  insights: DesignInsight[];
  iframeConfig?: IframeConfig;
}

const designProjects: DesignProject[] = [
  {
    id: 'klini',
    name: 'Klini',
    sector: 'HealthTech',
    description: 'Super app de saúde com rede de especialistas, agendamento inteligente, acompanhamento de consultas e gestão de coparticipação.',
    tags: ['HealthTech', 'Mobile App', 'UX Research'],
    appUrl: 'https://framer-true-60574725.figma.site',
    accentColor: '#0d6b3e',
    insights: [
      { label: 'Dashboard', annotation: 'Hierarquia visual progressiva: HealthRing captura atenção primeiro, depois direciona para ações prioritárias — reduzindo cognitive load.' },
      { label: 'Busca de Rede', annotation: 'Filtros contextuais aparecem apenas quando relevantes. Menos escolhas simultâneas = mais conversão.' },
      { label: 'Consultas', annotation: 'Timeline com feedback visual em tempo real. Confirmação em 2 etapas elimina cancelamentos acidentais.' },
      { label: 'Perfil', annotation: 'Carteirinha digital com dados críticos above the fold. Design orientado a situações de urgência.' },
    ],
  },
  {
    id: 'seguro-vida',
    name: 'Seguro de Vida',
    sector: 'InsurTech',
    description: 'App de seguro pessoal com ShieldScore proprietário, visualização de cobertura em órbita, gestão de apólices e sinistros simplificada.',
    tags: ['InsurTech', 'Mobile App', 'Product Design'],
    appUrl: 'https://run-wish-52765770.figma.site',
    accentColor: '#2d1b5e',
    insights: [
      { label: 'ShieldScore', annotation: 'Transforma dado abstrato em métrica emocional tangível — aumenta engajamento e percepção de valor.' },
      { label: 'Coverage Orbit', annotation: 'Metáfora de órbita comunica proteção ao redor do usuário. UX que gera confiança sem uma linha de copy.' },
      { label: 'Apólices', annotation: 'Documentos densos em cards escaneáveis. Redução de 70% no tempo para encontrar informação crítica.' },
      { label: 'Sinistro', annotation: 'Fluxo em 3 etapas com save automático — desenhado para momentos de estresse emocional alto.' },
    ],
  },
  {
    id: 'plano-saude',
    name: 'Plano de Saúde',
    sector: 'HealthTech',
    description: 'App de plano de saúde com HealthRing animado, Dynamic Island nativo, agenda de consultas e carteirinha digital integrada.',
    tags: ['HealthTech', 'Mobile App', 'UI Engineering'],
    appUrl: 'https://pecan-actor-86429791.figma.site',
    accentColor: '#0a4f6b',
    insights: [
      { label: 'Dynamic Island', annotation: 'Notificações do plano aparecem no componente nativo certo — respeita o design language do iOS.' },
      { label: 'HealthRing', annotation: 'Animação procedural baseada em dados reais. Gamificação sutil que aumenta retenção.' },
      { label: 'Agenda', annotation: 'Calendário + lista com switching fluido. Context preservation: nenhum dado se perde na transição.' },
      { label: 'Coberturas', annotation: 'Ícones customizados por especialidade e linguagem visual clara para cobertura ativa vs carência.' },
    ],
  },
  {
    id: 'akad',
    name: 'Akad',
    sector: 'InsurTech B2B',
    description: 'Plataforma para corretores de seguros com CRM de clientes, gestão de apólices, relatórios analíticos e academia de capacitação.',
    tags: ['InsurTech', 'B2B', 'Dashboard'],
    appUrl: 'https://rare-yellow-39737195.figma.site',
    accentColor: '#1c3a6b',
    // Akad renderiza como app desktop (1280px) com phone interno centrado (390px).
    // Nosso container tem 260px. scale=260/390≈0.667. O phone fica a 445px do left.
    iframeConfig: {
      viewportWidth: 1280,
      scale: 0.6667,
      translateX: -445,
      translateY: -30,
    },
    insights: [
      { label: 'Dashboard', annotation: 'KPIs acima do fold com drill-down progressivo. Decisão rápida para corretores em campo.' },
      { label: 'Clientes', annotation: 'Search, filtros e preview inline eliminam navegação desnecessária. CRM enterprise simplificado.' },
      { label: 'Apólices', annotation: 'Status por cor + tipografia hierárquica: corretor localiza apólices críticas em menos de 3 segundos.' },
      { label: 'Academy', annotation: 'LMS integrado ao fluxo de trabalho — capacitação no contexto de uso, não em plataforma separada.' },
    ],
  },
  {
    id: 'loja-kaos',
    name: 'Loja Kaos',
    sector: 'E-commerce',
    description: 'App de e-commerce para marca de streetwear com experiência editorial, drops exclusivos e navegação por bottom nav fluido.',
    tags: ['E-commerce', 'Mobile App', 'Brand Design'],
    appUrl: 'https://civic-score-64769139.figma.site',
    accentColor: '#1a1a1a',
    insights: [
      { label: 'Home', annotation: 'HeroBanner editorial + Marquee Strip — linguagem de revista de moda. Diferenciação clara dos concorrentes.' },
      { label: 'Explore', annotation: 'ProductCards em proporção 3:4 — aspecto ratio que maximiza percepção de qualidade do produto.' },
      { label: 'Drops', annotation: 'Countdown + estoque em tempo real cria urgência autêntica. Dark mode exclusivo nessa seção.' },
      { label: 'Bag', annotation: 'Checkout por gestos — swipe para remover, tap para quantidade. Menos fricção = menos abandono.' },
    ],
  },
];

// ─── Phone Frame ──────────────────────────────────────────────────────────────
const PhoneFrame = ({
  project, isSelected, onSelect,
}: {
  project: DesignProject; isSelected: boolean; onSelect: () => void;
}) => {
  const [insightIndex, setInsightIndex] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const cfg = project.iframeConfig;

  useEffect(() => {
    if (!isSelected) { setShowInsights(false); setInsightIndex(0); }
  }, [isSelected]);

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInsightIndex((p) => (p + 1) % project.insights.length);
  };
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInsightIndex((p) => (p - 1 + project.insights.length) % project.insights.length);
  };

  // Estilos do iframe — dois modos:
  // 1. Mobile normal: 100% × 100% simples
  // 2. Desktop com phone interno (Akad): viewport largo + scale/translate para isolar o phone
  const iframeWrapStyle: React.CSSProperties = {
    position: 'absolute', top: 44, left: 0, right: 0, bottom: 4,
    overflow: 'hidden',
  };

  const iframeStyle: React.CSSProperties = cfg
    ? {
      border: 'none',
      width: `${cfg.viewportWidth}px`,
      height: `${cfg.viewportWidth * 0.75}px`,
      transform: `translateX(${cfg.translateX}px) translateY(${cfg.translateY ?? 0}px) scale(${cfg.scale})`,
      transformOrigin: 'top left',
      pointerEvents: isSelected ? 'auto' : 'none',
    }
    : {
      border: 'none', width: '100%', height: '100%',
      pointerEvents: isSelected ? 'auto' : 'none',
    };

  return (
    <motion.div
      className="flex-shrink-0 flex flex-col items-center"
      style={{ width: 272 }}
      animate={
        isSelected
          ? { y: -8, scale: 1.08, opacity: 1 }
          : { y: 0, scale: 0.97, opacity: 0.6 }
      }
      whileHover={!isSelected ? { opacity: 0.85, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
    >
      <div
        className="relative cursor-pointer"
        style={{ width: 272, height: 556 }}
        onClick={!isSelected ? onSelect : undefined}
      >
        {/* Glow quando selecionado */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-[46px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${project.accentColor}30 0%, transparent 70%)`,
                transform: 'scale(1.2)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Bezel */}
        <div
          className="absolute inset-0 rounded-[46px] transition-shadow duration-500"
          style={{
            backgroundColor: '#0a0a0a',
            boxShadow: isSelected
              ? `0 0 0 2px ${project.accentColor}, 0 28px 70px -12px rgba(0,0,0,0.6)`
              : '0 10px 36px -8px rgba(0,0,0,0.22)',
          }}
        >
          {/* Botões físicos */}
          <div className="absolute -right-[3px] top-[108px] w-[3px] h-[36px] rounded-r-sm bg-neutral-700" />
          <div className="absolute -left-[3px] top-[88px]  w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />
          <div className="absolute -left-[3px] top-[122px] w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />
          <div className="absolute -left-[3px] top-[158px] w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />

          {/* Tela */}
          <div className="absolute rounded-[40px] overflow-hidden bg-white" style={{ inset: 6 }}>

            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 z-20 h-11 flex items-center justify-between px-6 pointer-events-none">
              <span className="text-[11px] font-semibold text-white mix-blend-difference">9:41</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[90px] h-[26px] rounded-full bg-black" />
              <div className="w-[14px] h-[7px] rounded-[2px] border border-white/50 relative overflow-hidden mix-blend-difference">
                <div className="absolute inset-[1px] right-[3px] bg-white/80 rounded-[1px]" />
              </div>
            </div>

            {/* iframe wrapper + iframe */}
            <div style={iframeWrapStyle}>
              <iframe
                src={project.appUrl}
                title={project.name}
                style={iframeStyle}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>

            {/* Overlay clique para explorar */}
            <AnimatePresence>
              {!isSelected && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-end justify-center pb-10"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 52%)' }}
                >
                  <span
                    className="text-white text-xs font-medium tracking-wide px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                  >
                    Clique para explorar
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Design Insights */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  className="absolute bottom-0 left-0 right-0 z-30"
                >
                  <AnimatePresence mode="wait">
                    {showInsights && (
                      <motion.div
                        key={insightIndex}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="mx-3 mb-2 p-3 rounded-2xl"
                        style={{ backgroundColor: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(20px)' }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.accentColor }} />
                            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: project.accentColor }}>
                              {project.insights[insightIndex].label}
                            </span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setShowInsights(false); }} className="flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity">
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <p className="text-white/85 text-[11px] leading-relaxed">
                          {project.insights[insightIndex].annotation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="mx-3 mb-3 px-3 py-2 rounded-2xl flex items-center gap-2"
                    style={{ backgroundColor: 'rgba(6,6,6,0.82)', backdropFilter: 'blur(20px)' }}
                  >
                    <motion.button onClick={goPrev} whileTap={{ scale: 0.88 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <ChevronLeft className="w-3.5 h-3.5 text-white" />
                    </motion.button>

                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex gap-1.5 items-center">
                        {project.insights.map((_, i) => (
                          <motion.button key={i}
                            onClick={(e) => { e.stopPropagation(); setInsightIndex(i); setShowInsights(true); }}
                            animate={{ width: i === insightIndex ? 18 : 5, backgroundColor: i === insightIndex ? project.accentColor : 'rgba(255,255,255,0.25)' }}
                            transition={{ duration: 0.25 }}
                            className="h-[5px] rounded-full"
                          />
                        ))}
                      </div>
                      {showInsights && (
                        <motion.span key={insightIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="text-white/50 text-[9px] tracking-widest uppercase">
                          insight {insightIndex + 1}/{project.insights.length}
                        </motion.span>
                      )}
                    </div>

                    <motion.button
                      onClick={(e) => { e.stopPropagation(); setShowInsights((p) => !p); }}
                      whileTap={{ scale: 0.88 }}
                      animate={{ backgroundColor: showInsights ? project.accentColor : 'rgba(255,255,255,0.1)' }}
                      transition={{ duration: 0.2 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-white" />
                    </motion.button>

                    <motion.button onClick={goNext} whileTap={{ scale: 0.88 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 110, height: 4, backgroundColor: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>

      {/* Info abaixo */}
      <motion.div
        className="mt-5 text-center px-2"
        animate={{ opacity: isSelected ? 1 : 0.45 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <h3 className="font-serif text-lg font-semibold text-primary">{project.name}</h3>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${project.accentColor}15`, color: project.accentColor }}>
            {project.sector}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[230px] mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-0.5 text-[10px] font-medium border rounded-full"
              style={{ borderColor: `${project.accentColor}35`, color: project.accentColor, backgroundColor: `${project.accentColor}08` }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const LabInnovation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'web' | 'design'>('web');
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (scrollRef.current && !scrollRef.current.contains(e.target as Node)) setSelectedPhone(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollBy = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -310 : 310, behavior: 'smooth' });

  return (
    <section id="lab-innovation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            Engenharia & Estética Visual
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            A fusão da precisão técnica com o design estratégico para criar experiências digitais de alto impacto.
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />
          <div className="inline-flex items-center gap-1 p-1 bg-secondary rounded-full border border-border">
            {(['web', 'design'] as const).map((tab) => (
              <motion.button key={tab}
                onClick={() => { setActiveTab(tab); setSelectedPhone(null); }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-primary'
                  }`}
              >
                {tab === 'web' ? 'Web & Fullstack' : 'Product Design'}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'web' && (
            <motion.div key="web" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {webProjects.map((project) => (
                <Card key={project.id} className="p-8 border border-border hover:border-accent/50 transition-base bg-card group relative overflow-hidden hover-lift glass-effect">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-slow" />
                  <div className="relative z-10">
                    <h3 className="font-serif text-2xl font-semibold text-primary mb-4 leading-tight">{t(project.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(project.descKey)}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(t(project.tagsKey, { returnObjects: true }) as string[]).map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full bg-accent/10">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/case-study/${project.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-base group/link">
                      {t('lab.viewCaseStudy')}
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {activeTab === 'design' && (
            <motion.div key="design" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="relative">
              <button onClick={() => scrollBy('left')} className="absolute left-0 top-[278px] -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center hover:border-accent/50 transition-base hidden md:flex">
                <ChevronLeft className="h-5 w-5 text-primary" />
              </button>
              <button onClick={() => scrollBy('right')} className="absolute right-0 top-[278px] -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center hover:border-accent/50 transition-base hidden md:flex">
                <ChevronRight className="h-5 w-5 text-primary" />
              </button>
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

              <div
                ref={scrollRef}
                className="flex gap-6 md:gap-10 overflow-x-auto pb-8 pt-4 px-10 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {designProjects.map((project) => (
                  <PhoneFrame key={project.id} project={project}
                    isSelected={selectedPhone === project.id}
                    onSelect={() => setSelectedPhone(project.id)} />
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5 flex-wrap">
                <span>← Arraste para navegar</span>
                <span className="opacity-40">·</span>
                <span>Clique para interagir</span>
                <span className="opacity-40">·</span>
                <Lightbulb className="inline w-3 h-3" />
                <span>para insights de design</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LabInnovation;
