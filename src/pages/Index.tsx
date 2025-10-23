import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutHero from '@/components/AboutHero';
import Expertise from '@/components/Expertise';
import Portfolio from '@/components/Portfolio';
import LabInnovation from '@/components/LabInnovation';
import Qualifications from '@/components/Qualifications';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <AboutHero />
        <Expertise />
        <Portfolio />
        <LabInnovation />
        <Qualifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
