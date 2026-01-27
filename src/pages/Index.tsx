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

const Index = () => {
  // Initialize analytics tracking
  useAnalytics();

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
