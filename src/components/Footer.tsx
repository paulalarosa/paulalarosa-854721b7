import { Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Sobre', href: '#about' },
    { name: 'Contato', href: '#contact' },
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/paula-la-rosa-228889119/', 
      icon: Linkedin 
    },
    { 
      name: 'Email', 
      href: 'mailto:prenata@gmail.com', 
      icon: Mail 
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/5521983604870', 
      icon: Phone 
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-semibold mb-2">Paula La Rosa</h3>
            <p className="text-primary-foreground/70 text-sm">
              Especialista em Marketing e Inovação no Rio de Janeiro
            </p>
          </div>


          {/* Navigation */}
          <nav className="flex gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-primary-foreground/80 hover:text-accent transition-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-primary-foreground/20 rounded-full flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-base group"
                aria-label={social.name}
              >
                <social.icon className="h-4 w-4 text-primary-foreground/80 group-hover:text-accent stroke-[1.5]" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {currentYear} Paula La Rosa. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;