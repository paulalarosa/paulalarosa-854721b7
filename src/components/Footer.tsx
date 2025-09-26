import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/sarahchen-design', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/sarahchen_design', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/sarahchen.design', label: 'Instagram' },
    { icon: Mail, href: 'mailto:sarah@sarahchen.design', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
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
            <div className="font-serif text-2xl font-bold">Sarah Chen</div>
            <p className="text-primary-foreground/80 max-w-sm">
              Strategic graphic designer with an MBA, helping businesses create 
              visual identities that drive growth and build lasting connections.
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
            <h3 className="font-semibold text-lg">Quick Links</h3>
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
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm">
              Get insights on design trends, marketing strategies, and growth tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent-light transition-smooth">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Sarah Chen. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-smooth">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;