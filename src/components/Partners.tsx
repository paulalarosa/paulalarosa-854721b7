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

        {/* First Marquee Row - Left to Right */}
        <div className="relative mb-6">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1400] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
              <PartnerCard key={`first-${index}`} partner={partner} />
            ))}
          </motion.div>
        </div>

        {/* Second Marquee Row - Right to Left */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-6"
            animate={{ x: [-1400, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((partner, index) => (
              <PartnerCard key={`second-${index}`} partner={partner} />
            ))}
          </motion.div>
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
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`
        flex-shrink-0 px-8 py-5 rounded-2xl border backdrop-blur-sm
        transition-all duration-300 cursor-default min-w-[180px]
        ${partner.highlight 
          ? 'bg-accent/10 border-accent/30 hover:border-accent/50 hover:bg-accent/15' 
          : 'bg-card/50 border-border/50 hover:border-accent/30 hover:bg-card/80'
        }
      `}
    >
      <span 
        className={`
          text-base font-semibold whitespace-nowrap
          ${partner.highlight ? 'text-accent' : 'text-foreground/80'}
        `}
      >
        {partner.name}
      </span>
    </motion.div>
  );
};

export default Partners;
