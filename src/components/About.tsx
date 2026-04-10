import { GraduationCap, Award, Globe, Palette, Code, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const highlights = [
    { icon: Palette, text: t("about.items.adobe") },
    { icon: GraduationCap, text: t("about.items.degree") },
    { icon: Award, text: t("about.items.mba") },
    { icon: Code, text: t("about.items.code") },
    { icon: TrendingUp, text: t("about.items.ads") },
    { icon: Globe, text: t("about.items.english") },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t("about.title")}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
          <div className="space-y-6">
            <div className="space-y-5 text-lg leading-relaxed text-foreground">
              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>
              <p>{t("about.text3")}</p>
              <p className="text-muted-foreground italic">"{t("about.quote")}"</p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
              {t("about.highlights")}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-gray-light rounded-lg">
                    <item.icon className="h-5 w-5 text-primary stroke-[1.5]" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
