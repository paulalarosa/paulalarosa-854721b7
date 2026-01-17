import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.marketing.title'),
      skills: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: t('skills.design.title'),
      skills: ['Figma', 'Design Systems', 'UI/UX', 'Prototyping', 'Adobe CC']
    },
    {
      title: t('skills.tech.title'),
      skills: ['Supabase', 'Node.js', 'PostgreSQL', 'Edge Functions', 'Git/GitHub']
    },
    {
      title: t('skills.strategy.title'),
      skills: ['VS Code', 'Vercel', 'Lovable', 'Cursor', 'AI Tools']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('skills.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-base"
            >
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-full border border-border hover:border-accent/50 hover:bg-accent/10 transition-base cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
