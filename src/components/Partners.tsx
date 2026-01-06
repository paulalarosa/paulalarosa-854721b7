import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const partners = [
  { name: 'Bradesco', category: 'finance' },
  { name: 'Cosan', category: 'industry' },
  { name: 'O Boticário', category: 'beauty' },
  { name: 'Eudora', category: 'beauty' },
  { name: 'Quem Disse, Berenice?', category: 'beauty' },
  { name: 'Grupo Mola', category: 'hospitality' },
  { name: 'Klini', category: 'health' },
  { name: 'Cravo', category: 'food' },
  { name: 'Truque Produções', category: 'events' },
  { name: 'Infnet ECDD', category: 'education' },
  { name: 'Teatro Estudio Argentina', category: 'entertainment' },
  { name: 'Urca Hotel', category: 'hospitality' },
  { name: 'Rede Casa Hospital', category: 'health' },
  { name: 'Simplex', category: 'tech' },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex items-center justify-center p-4 rounded-lg hover:bg-accent/5 transition-all duration-300 w-full"
            >
              <span className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center leading-tight">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Animated marquee for mobile */}
        <div className="mt-8 overflow-hidden md:hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <span
                key={`${partner.name}-${index}`}
                className="text-sm font-medium text-muted-foreground px-4"
              >
                {partner.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
