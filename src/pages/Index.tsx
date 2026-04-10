import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HardSkills from "@/components/HardSkills";
import FeaturedProject from "@/components/FeaturedProject";
import Stats from "@/components/Stats";
import LabInnovation from "@/components/LabInnovation";
import Qualifications from "@/components/Qualifications";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ParallaxSection from "@/components/ParallaxSection";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Index = () => {
  useAnalytics();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (location.state.scrollTo === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Helmet>
        <title>Paula La Rosa | Product Designer &amp; Interface Engineering Specialist</title>
        <meta name="description" content="Product Designer especialista em Interfaces de Alta Fidelidade e Interface Engineering. Do research e prototipagem ao código em produção com React e TypeScript." />
        <link rel="canonical" href="https://paulalarosa.com/" />
        <meta property="og:title" content="Paula La Rosa | Product Designer &amp; Interface Engineering" />
        <meta property="og:description" content="Product Design &amp; Engenharia de Interface. Especialista em resolver problemas complexos com design estratégico e tecnologia de ponta." />
        <meta property="og:url" content="https://paulalarosa.com/" />
        <meta property="og:image" content="https://paulalarosa.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paula La Rosa | Product Designer" />
        <meta name="twitter:description" content="Product Design &amp; Engenharia de Interface. Especialista em React, TypeScript e Animações Web." />
        <meta name="twitter:image" content="https://paulalarosa.com/og-image.jpg" />
      </Helmet>

      <Header />

      <main>
        <Hero />

        <ParallaxSection speed={0.92} fade>
          <HardSkills />
        </ParallaxSection>

        <ParallaxSection speed={1.08} fade>
          <FeaturedProject />
        </ParallaxSection>

        <ParallaxSection speed={0.94} fade>
          <Stats />
        </ParallaxSection>

        <ParallaxSection speed={1.05} fade>
          <LabInnovation />
        </ParallaxSection>

        <ParallaxSection speed={0.9} fade scale>
          <Qualifications />
        </ParallaxSection>

        <ParallaxSection speed={1.1} fade>
          <Partners />
        </ParallaxSection>

        <ParallaxSection speed={0.95} fade>
          <Testimonials />
        </ParallaxSection>

        <ParallaxSection speed={1.02} fade>
          <Contact />
        </ParallaxSection>

        <ParallaxSection speed={0.98} fade={false}>
          <Newsletter />
        </ParallaxSection>
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Index;
