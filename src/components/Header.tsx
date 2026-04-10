import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.expertise"), href: "#expertise" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.qualifications"), href: "#qualifications" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: href } });
      return;
    }
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    else if (href === "#home") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isInHero = !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: isScrolled ? "hsl(var(--background) / 0.97)" : "transparent",
        borderBottom: isScrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "var(--shadow-xs)" : "none",
        transition: "background-color 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.5s, backdrop-filter 0.5s, box-shadow 0.5s",
      }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? 64 : 80 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={hasLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => scrollToSection("#home")}
            className="font-serif text-xl font-semibold relative group transition-colors duration-300"
            style={{ color: isInHero ? "rgba(255,255,255,0.9)" : "hsl(var(--primary))" }}
          >
            Paula La Rosa
            <span
              className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ease-out"
              style={{ backgroundColor: isInHero ? "rgba(255,255,255,0.4)" : "hsl(var(--accent))" }}
            />
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.06 }}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium relative group transition-colors duration-300"
                style={{ color: isInHero ? "rgba(255,255,255,0.7)" : "hsl(var(--foreground))" }}
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ease-out"
                  style={{ backgroundColor: isInHero ? "rgba(255,255,255,0.4)" : "hsl(var(--accent))" }}
                />
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex items-center gap-2 text-sm"
            >
              {["pt", "en", "es"].map((lng, i) => (
                <span key={lng} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color: isInHero ? "rgba(255,255,255,0.2)" : "hsl(var(--muted-foreground))" }}>|</span>}
                  <button
                    onClick={() => changeLanguage(lng)}
                    className="transition-colors duration-300"
                    style={{
                      color: i18n.language === lng
                        ? isInHero ? "rgba(255,255,255,0.9)" : "hsl(var(--primary))"
                        : isInHero ? "rgba(255,255,255,0.4)" : "hsl(var(--muted-foreground))",
                      fontWeight: i18n.language === lng ? 700 : 400,
                    }}
                  >
                    {lng.toUpperCase()}
                  </button>
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={hasLoaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.75 }}>
              <ThemeToggle />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={hasLoaded ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.8 }}>
              <Button
                onClick={() => scrollToSection("#contact")}
                className={isInHero
                  ? "bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 hover:border-white/25 backdrop-blur-sm transition-all duration-300"
                  : "bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base border border-accent/30"
                }
              >
                {t("nav.contactBtn")}
              </Button>
            </motion.div>
          </nav>

          <button
            className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {[
              { y: isMobileMenuOpen ? 0 : -6, rotate: isMobileMenuOpen ? 45 : 0 },
              { opacity: isMobileMenuOpen ? 0 : 1, scaleX: isMobileMenuOpen ? 0 : 1 },
              { y: isMobileMenuOpen ? 0 : 6, rotate: isMobileMenuOpen ? -45 : 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                className="absolute w-6 h-0.5 rounded-full"
                style={{ backgroundColor: isInHero ? "rgba(255,255,255,0.8)" : "hsl(var(--foreground))" }}
                animate={anim}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ))}
          </button>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-6 border-t border-border bg-background overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="block w-full text-left py-4 px-2 text-foreground hover:text-accent hover:bg-accent/10 transition-base font-medium cursor-pointer touch-manipulation"
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 py-3 justify-center border-t border-border mt-3 pt-3">
                {["pt", "en", "es"].map((lng, i) => (
                  <span key={lng} className="flex items-center gap-3">
                    {i > 0 && <span className="text-muted-foreground">|</span>}
                    <button onClick={(e) => { e.preventDefault(); changeLanguage(lng); }}
                      className={`py-2 px-3 touch-manipulation transition-base ${i18n.language === lng ? "font-bold text-primary" : "text-muted-foreground hover:text-accent"}`}
                    >{lng.toUpperCase()}</button>
                  </span>
                ))}
                <span className="text-muted-foreground">|</span>
                <ThemeToggle />
              </div>
              <Button onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
                className="w-full mt-4 bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground border border-accent/30 touch-manipulation"
              >{t("nav.contactBtn")}</Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
