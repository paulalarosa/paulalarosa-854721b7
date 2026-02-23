import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import khaoskontrolPreview from '@/assets/khaoskontrol-preview.png';
import { useRef } from 'react';

const FeaturedProject = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const techStack = ['React', 'Vite', 'Tailwind', 'Supabase (Auth/DB)', 'Edge Functions'];

  return (
    <section id="featured-project" ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <motion.div style={{ opacity }} className="container mx-auto px-6">
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

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base group"
                  asChild
                >
                  <a href="https://khaoskontrol.com.br" target="_blank" rel="noopener noreferrer">
                    {t('featuredProject.viewLive')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-base"
                  asChild
                >
                  <Link to="/case-study/platform">
                    {t('featuredProject.viewBehindTheScenes')}
                  </Link>
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ y }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-slow"></div>
              <div className="relative aspect-video bg-card rounded-lg border border-border overflow-hidden shadow-xl group/image">
                <img
                  src={khaoskontrolPreview}
                  alt="Khaos Kontrol Dashboard Preview"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-110"
                />
                <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur-sm flex items-center px-3 gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                  <div className="w-3 h-3 rounded-full bg-accent/60"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                  <span className="ml-2 text-xs text-muted-foreground">khaoskontrol.com.br</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProject;
