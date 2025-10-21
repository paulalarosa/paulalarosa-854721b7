import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.expertise'), href: '#expertise' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.qualifications'), href: '#qualifications' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-base ${
        isScrolled
          ? 'bg-background/98 backdrop-blur-sm border-b border-border shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-xl font-semibold text-primary hover:text-accent transition-base"
          >
            Paula La Rosa
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-foreground hover:text-accent transition-base"
              >
                {item.name}
              </button>
            ))}
            
            {/* Language Selector */}
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => changeLanguage('pt')}
                className={`transition-base ${
                  i18n.language === 'pt'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                PT
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`transition-base ${
                  i18n.language === 'en'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLanguage('es')}
                className={`transition-base ${
                  i18n.language === 'es'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                ES
              </button>
            </div>
            
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base border border-accent/30"
            >
              {t('nav.contactBtn')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border bg-background">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 text-foreground hover:text-accent transition-base font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="flex items-center gap-3 py-3 justify-center border-t border-border mt-3 pt-3">
              <button
                onClick={() => changeLanguage('pt')}
                className={`transition-base ${
                  i18n.language === 'pt'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                PT
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`transition-base ${
                  i18n.language === 'en'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLanguage('es')}
                className={`transition-base ${
                  i18n.language === 'es'
                    ? 'font-bold text-primary'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                ES
              </button>
            </div>
            
            <Button
              onClick={() => scrollToSection('#contact')}
              className="w-full mt-4 bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground border border-accent/30"
            >
              {t('nav.contactBtn')}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;