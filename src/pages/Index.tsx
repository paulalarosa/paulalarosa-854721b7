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
        <title>Paula La Rosa | Creative Frontend Developer &amp; UI Engineer</title>
        <meta name="description" content="Desenvolvedora Frontend Especialista em React, TypeScript e Next.js. Interfaces imersivas, animações de alta performance e produtos digitais escaláveis." />
        <link rel="canonical" href="https://paulalarosa.com/" />
        <meta property="og:title" content="Paula La Rosa | Creative Frontend Developer &amp; UI Engineer" />
        <meta property="og:description" content="Engenharia Frontend &amp; Design. Especialista em React, Next.js e Animações Web. Transforme sua visão em produtos digitais de alta performance." />
        <meta property="og:url" content="https://paulalarosa.com/" />
        <meta property="og:image" content="https://paulalarosa.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paula La Rosa | Creative Frontend Developer" />
        <meta name="twitter:description" content="Engenharia Frontend &amp; Design. Especialista em React, Next.js e Animações Web." />
        <meta name="twitter:image" content="https://paulalarosa.com/og-image.jpg" />
      </Helmet>

      <Header />
      <main>
        <Hero />
        <HardSkills />
        <FeaturedProject />
        <Stats />
        <LabInnovation />
        <Qualifications />
        <Partners />
        <Testimonials />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Index;
