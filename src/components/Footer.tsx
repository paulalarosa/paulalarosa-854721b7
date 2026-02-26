import { Linkedin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const keywords = [
    "Frontend Engineering",
    "React & TypeScript",
    "Clean Code",
    "UI/UX Design",
    "Performance",
    "Scalability",
    "Design Systems",
    "Web Animation",
    "Interactive",
    "Modern Web",
  ];

  const navigation = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.expertise"), href: "#expertise" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.qualifications"), href: "#qualifications" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground overflow-hidden">
      {}
      <div className="border-y border-primary-foreground/10 py-6">
        <div className="marquee">
          <div className="marquee-content">
            {[...keywords, ...keywords].map((keyword, index) => (
              <span
                key={index}
                className="font-serif text-2xl md:text-3xl font-semibold whitespace-nowrap opacity-20"
              >
                {keyword} •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Paula La Rosa</h3>
            <p className="text-primary-foreground/70 text-sm">{t("footer.description")}</p>
          </div>

          {}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.navigation")}
            </h4>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-primary-foreground/70 hover:text-primary-foreground text-sm transition-base"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.social")}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/paula-la-rosa-228889119/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-primary-foreground/20 rounded-lg flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-base hover-lift"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.behance.net/paulalarosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-primary-foreground/20 rounded-lg flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-base hover-lift"
                aria-label="Behance"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Paula La Rosa. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
