import { useParams, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { useCaseStudy } from "@/hooks/useCaseStudy";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyOverview from "@/components/case-study/CaseStudyOverview";
import CaseStudyStack from "@/components/case-study/CaseStudyStack";
import CaseStudyProcess from "@/components/case-study/CaseStudyProcess";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyNextProject from "@/components/case-study/CaseStudyNextProject";
import { Helmet } from "react-helmet-async";

const CaseStudy = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const { projectData, nextProject } = useCaseStudy(id);
  const canonicalUrl = `https://paulalarosa.com${location.pathname}`;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <Helmet>
        <title>{projectData?.title ? `${projectData.title} — Paula La Rosa` : 'Case Study — Paula La Rosa'}</title>
        <meta name="description" content={projectData?.subtitle || 'Case Study de produto digital por Paula La Rosa'} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={projectData?.title ? `${projectData.title} — Paula La Rosa` : 'Case Study'} />
        <meta property="og:description" content={projectData?.subtitle || 'Case Study de produto digital por Paula La Rosa'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://paulalarosa.com/og-image.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={projectData?.title ? `${projectData.title} — Paula La Rosa` : 'Case Study'} />
        <meta name="twitter:description" content={projectData?.subtitle || 'Case Study de produto digital por Paula La Rosa'} />
        <meta name="twitter:image" content="https://paulalarosa.com/og-image.jpg" />
      </Helmet>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="pt-24 pb-20">
        { }
        <div className="container mx-auto px-6 mb-8">
          <Link to="/#portfolio">
            <Button
              variant="ghost"
              className="group pl-0 hover:bg-transparent text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t("nav.portfolio")}
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
    </motion.div>
  );
};

export default CaseStudy;
