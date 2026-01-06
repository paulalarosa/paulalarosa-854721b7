import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const partners = [
  { name: 'Bradesco', highlight: true },
  { name: 'Cosan', highlight: true },
  { name: 'O Boticário', highlight: true },
  { name: 'Eudora', highlight: false },
  { name: 'Quem Disse, Berenice?', highlight: false },
  { name: 'Grupo Mola', highlight: false },
  { name: 'Klini', highlight: false },
  { name: 'Cravo', highlight: false },
  { name: 'Truque Produções', highlight: false },
  { name: 'Infnet ECDD', highlight: false },
  { name: 'Teatro Estudio Argentina', highlight: false },
  { name: 'Urca Hotel', highlight: false },
  { name: 'Rede Casa Hospital', highlight: false },
  { name: 'Simplex', highlight: false },
];

const Partners = () => {
  const { t } = useTranslation();

  // Dividir em duas linhas para marquee
  const firstRow = partners.slice(0, 7);
  const secondRow = partners.slice(7);

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* CSS for smooth infinite marquee */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 30s linear infinite;
          will-change: transform;
        }
        .marquee-right {
          animation: marquee-right 35s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            {t('partners.badge', 'Clientes & Parceiros')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('partners.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </motion.div>

        {/* First Marquee Row - Left */}
        <div className="relative mb-6 marquee-container">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 md:gap-6 marquee-left">
            {[...firstRow, ...firstRow].map((partner, index) => (
              <PartnerCard key={`first-${index}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Second Marquee Row - Right */}
        <div className="relative marquee-container">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 md:gap-6 marquee-right">
            {[...secondRow, ...secondRow].map((partner, index) => (
              <PartnerCard key={`second-${index}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif font-bold text-primary">14+</span>
            <p className="text-sm text-muted-foreground mt-1">{t('partners.companies', 'Empresas atendidas')}</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif font-bold text-primary">6+</span>
            <p className="text-sm text-muted-foreground mt-1">{t('partners.sectors', 'Setores diferentes')}</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif font-bold text-primary">100%</span>
            <p className="text-sm text-muted-foreground mt-1">{t('partners.satisfaction', 'Satisfação')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PartnerCard = ({ partner }: { partner: { name: string; highlight: boolean } }) => {
  return (
    <div
      className={`
        flex-shrink-0 px-6 md:px-8 py-4 md:py-5 rounded-2xl border backdrop-blur-sm
        transition-all duration-300 cursor-default min-w-[160px] md:min-w-[180px]
        hover:scale-105 hover:-translate-y-1
        ${partner.highlight 
          ? 'bg-accent/10 border-accent/30 hover:border-accent/50 hover:bg-accent/15' 
          : 'bg-card/50 border-border/50 hover:border-accent/30 hover:bg-card/80'
        }
      `}
    >
      <span 
        className={`
          text-sm md:text-base font-semibold whitespace-nowrap
          ${partner.highlight ? 'text-accent' : 'text-foreground/80'}
        `}
      >
        {partner.name}
      </span>
    </div>
  );
};

export default Partners;
