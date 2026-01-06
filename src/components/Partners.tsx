import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const partners = [
  { name: 'Bradesco' },
  { name: 'Cosan' },
  { name: 'O Boticário' },
  { name: 'Eudora' },
  { name: 'Quem Disse, Berenice?' },
  { name: 'Grupo Mola' },
  { name: 'Klini' },
  { name: 'Cravo' },
  { name: 'Truque Produções' },
  { name: 'Infnet ECDD' },
  { name: 'Teatro Estudio Argentina' },
  { name: 'Urca Hotel' },
  { name: 'Rede Casa Hospital' },
  { name: 'Simplex' },
];

const Partners = () => {
  const { t } = useTranslation();

  // Dividir em duas linhas para marquee
  const firstRow = partners.slice(0, 7);
  const secondRow = partners.slice(7);

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background gradient - full width */}
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
        .marquee-wrapper:hover .marquee-left,
        .marquee-wrapper:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Header - contained */}
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
      </div>

      {/* Marquee section - full width */}
      <div className="relative z-10">
        {/* Gradient overlays - full width */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* First Marquee Row */}
        <div className="mb-4 marquee-wrapper">
          <div className="flex gap-4 marquee-left">
            {[...firstRow, ...firstRow].map((partner, index) => (
              <PartnerCard key={`first-${index}`} name={partner.name} />
            ))}
          </div>
        </div>

        {/* Second Marquee Row */}
        <div className="marquee-wrapper">
          <div className="flex gap-4 marquee-right">
            {[...secondRow, ...secondRow].map((partner, index) => (
              <PartnerCard key={`second-${index}`} name={partner.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats - contained */}
      <div className="container mx-auto px-6 relative z-10">
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

const PartnerCard = ({ name }: { name: string }) => {
  return (
    <div
      className="flex-shrink-0 px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 cursor-default min-w-[160px] md:min-w-[180px] hover:scale-105 hover:-translate-y-1 hover:border-accent/30 hover:bg-card/80"
    >
      <span className="text-sm md:text-base font-semibold whitespace-nowrap text-foreground/80">
        {name}
      </span>
    </div>
  );
};

export default Partners;
