import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/paula-la-rosa-228889119/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://www.behance.net/paulalarosa', label: 'Behance' },
    { icon: Instagram, href: 'https://wa.me/5521983604870', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:prenata@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="font-serif text-2xl font-bold">Paula La Rosa</div>
            <p className="text-primary-foreground/80 max-w-sm">
              Designer gráfica estratégica com MBA, ajudando empresas a criar 
              identidades visuais que impulsionam crescimento e constroem conexões duradouras.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Rápidos</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Mantenha-se Atualizada</h3>
            <p className="text-primary-foreground/80 text-sm">
              Receba insights sobre tendências de design, estratégias de marketing e dicas de crescimento.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent-light transition-smooth">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Paula La Rosa. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-smooth">
              Política de Privacidade
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-smooth">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;