import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LabInnovation from '@/components/LabInnovation';
import Qualifications from '@/components/Qualifications';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Qualifications />
        <LabInnovation />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
