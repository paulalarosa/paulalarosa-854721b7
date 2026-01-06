import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import LabInnovation from '@/components/LabInnovation';
import Qualifications from '@/components/Qualifications';
import Skills from '@/components/Skills';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Qualifications />
        <Skills />
        <Partners />
        <LabInnovation />
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
