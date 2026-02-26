import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("testimonials.items.0.quote"),
      author: t("testimonials.items.0.author"),
      role: t("testimonials.items.0.role"),
    },
    {
      quote: t("testimonials.items.1.quote"),
      author: t("testimonials.items.1.author"),
      role: t("testimonials.items.1.role"),
    },
    {
      quote: t("testimonials.items.2.quote"),
      author: t("testimonials.items.2.author"),
      role: t("testimonials.items.2.role"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">
            {t("testimonials.title")}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4">
                    <Card className="p-8 glass-effect border border-border hover:border-accent/50 transition-base h-full flex flex-col justify-between">
                      <div>
                        <svg
                          className="w-10 h-10 text-accent mb-6 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" />
            <CarouselNext className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
