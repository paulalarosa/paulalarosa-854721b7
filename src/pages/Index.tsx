import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HardSkills from '@/components/HardSkills';
import FeaturedProject from '@/components/FeaturedProject';
import Stats from '@/components/Stats';
import LabInnovation from '@/components/LabInnovation';
import Qualifications from '@/components/Qualifications';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  // Initialize analytics tracking
  useAnalytics();
  const location = useLocation();

  // Handle scroll to section when coming from another page
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.state.scrollTo === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Clear the state so it doesn't scroll again on refresh
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
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
    </div>
  );
};

export default Index;
