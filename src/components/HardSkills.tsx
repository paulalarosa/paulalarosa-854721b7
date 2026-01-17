import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HardSkills = () => {
  const { t } = useTranslation();

  const technologies = [
    { name: 'React.js', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Git/GitHub', icon: '🔀' },
    { name: 'Figma', icon: '✏️' },
    { name: t('hardSkills.aiIntegration'), icon: '🤖' }
  ];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-2">
            {t('hardSkills.title')}
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div className="flex animate-marquee">
            {[...technologies, ...technologies].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 mx-4"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full hover:border-accent/50 transition-base">
                  <span className="text-xl">{tech.icon}</span>
                  <span className="font-medium text-foreground whitespace-nowrap">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardSkills;
