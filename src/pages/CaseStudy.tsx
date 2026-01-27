import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useCaseStudy } from '@/hooks/useCaseStudy';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyNavigation from '@/components/case-study/CaseStudyNavigation';
import CaseStudyOverview from '@/components/case-study/CaseStudyOverview';
import CaseStudyStack from '@/components/case-study/CaseStudyStack';
import CaseStudyProcess from '@/components/case-study/CaseStudyProcess';
import CaseStudyResults from '@/components/case-study/CaseStudyResults';
import CaseStudyNextProject from '@/components/case-study/CaseStudyNextProject';

const CaseStudy = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { projectData, nextProject } = useCaseStudy(id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="pt-24 pb-20">
        {/* Navigation & Breadcrumbs */}
        <div className="container mx-auto px-6 mb-8">
          <Link to="/#portfolio">
            <Button variant="ghost" className="group pl-0 hover:bg-transparent text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('nav.portfolio')}
            </Button>
          </Link>
        </div>

        <CaseStudyHero data={projectData} />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 relative">

            <CaseStudyNavigation />

            <div className="space-y-24">
              <CaseStudyOverview data={projectData} />
              <CaseStudyStack data={projectData} />
              <CaseStudyProcess data={projectData} />
              <CaseStudyResults data={projectData} />
            </div>
          </div>
        </div>

        <CaseStudyNextProject nextProject={nextProject} />

      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;

