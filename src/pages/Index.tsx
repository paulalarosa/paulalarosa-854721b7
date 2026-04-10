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
import ScrollSection from "@/components/ScrollSection";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  useAnalytics();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        else if (location.state.scrollTo === "#home") window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Paula La Rosa | Creative UI Engineer & Designer</title>
        <meta name="description" content="Especialista em interfaces imersivas, animações cinematográficas e engenharia front-end de alta performance." />
      </Helmet>

      <Header />

      <main className="relative z-0">
        <Hero />

        {/* Expertise & Tech */}
        <ScrollSection pin scaleDown id="expertise">
          <HardSkills />
        </ScrollSection>

        {/* Main Case Study */}
        <ScrollSection speed={1.1} id="portfolio">
          <FeaturedProject />
        </ScrollSection>

        {/* Engenharia & Estética Visual (Stats) */}
        <ScrollSection pin scaleDown>
          <Stats />
        </ScrollSection>

        <ScrollSection speed={1.05}>
          <LabInnovation />
        </ScrollSection>

        <ScrollSection pin scaleDown id="qualifications">
          <Qualifications />
        </ScrollSection>

        <ScrollSection speed={1.05}>
          <Partners />
        </ScrollSection>

        <ScrollSection scaleDown speed={0.98}>
          <Testimonials />
        </ScrollSection>

        <ScrollSection speed={1.0}>
          <Contact />
        </ScrollSection>

        <ScrollSection>
          <Newsletter />
        </ScrollSection>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
