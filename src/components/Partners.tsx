import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Para adicionar logos reais, importe-os e adicione ao objeto 'logo' de cada parceiro
// Exemplo: import bradesco from '@/assets/logos/bradesco.png';

const partners = [
  { name: 'Bradesco', category: 'finance', logo: null },
  { name: 'Cosan', category: 'industry', logo: null },
  { name: 'O Boticário', category: 'beauty', logo: null },
  { name: 'Eudora', category: 'beauty', logo: null },
  { name: 'Quem Disse, Berenice?', category: 'beauty', logo: null },
  { name: 'Grupo Mola', category: 'hospitality', logo: null },
  { name: 'Klini', category: 'health', logo: null },
  { name: 'Cravo', category: 'food', logo: null },
  { name: 'Truque Produções', category: 'events', logo: null },
  { name: 'Infnet ECDD', category: 'education', logo: null },
  { name: 'Teatro Estudio Argentina', category: 'entertainment', logo: null },
  { name: 'Urca Hotel', category: 'hospitality', logo: null },
  { name: 'Rede Casa Hospital', category: 'health', logo: null },
  { name: 'Simplex', category: 'tech', logo: null },
];

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 items-center justify-items-center max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex items-center justify-center p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 w-full h-20 md:h-24"
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-xs md:text-sm font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 text-center leading-tight px-1">
                  {partner.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
