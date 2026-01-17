import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedProject = () => {
  const { t } = useTranslation();

  const techStack = ['React', 'Vite', 'Tailwind', 'Supabase (Auth/DB)', 'Edge Functions'];

  return (
    <section id="featured-project" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-widest text-accent font-medium">
            {t('featuredProject.badge')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mt-4 mb-4">
            {t('featuredProject.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h3 className="font-serif text-3xl font-semibold text-primary">
                {t('featuredProject.projectName')}
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('featuredProject.description')}
              </p>

              <div className="space-y-3">
                <span className="text-sm uppercase tracking-wider text-accent font-medium">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm bg-secondary text-foreground rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base group mt-4"
                disabled
              >
                {t('featuredProject.comingSoon')}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-slow"></div>
              <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl">💎</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {t('featuredProject.dashboardPreview')}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur-sm flex items-center px-3 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
