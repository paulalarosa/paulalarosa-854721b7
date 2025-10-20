import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import Portfolio from '@/components/Portfolio';
import Qualifications from '@/components/Qualifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Expertise />
        <Portfolio />
        <Qualifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
