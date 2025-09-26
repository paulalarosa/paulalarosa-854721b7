import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Retornarei em até 24 horas.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openEmail = () => {
    window.open('mailto:prenata@gmail.com', '_blank');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5521983604870', '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Clique para enviar email',
      href: '#',
      onClick: openEmail
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: 'Clique para conversar',
      href: '#',
      onClick: openWhatsApp
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Rio de Janeiro, RJ',
      href: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Paula La Rosa',
      href: 'https://www.linkedin.com/in/paula-la-rosa-228889119/'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Vamos Criar Algo Incrível
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pronta para elevar sua marca com design estratégico? Vamos conversar sobre seu projeto 
            e explorar como podemos impulsionar crescimento juntas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 shadow-medium border-0">
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
              Inicie Seu Projeto
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nome *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="border-border focus:border-accent focus:ring-accent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="border-border focus:border-accent focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Empresa
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="border-border focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Detalhes do Projeto *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-me sobre seu projeto, objetivos e prazo..."
                  rows={6}
                  required
                  className="border-border focus:border-accent focus:ring-accent resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gradient-hero text-primary-foreground hover:shadow-accent transition-smooth"
              >
                Enviar Mensagem
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                Entre em Contato
              </h3>
              <p className="text-muted-foreground mb-8">
                Prefere entrar em contato diretamente? Escolha seu método preferido abaixo. 
                Geralmente respondo em até 24 horas.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                 <div
                   key={index}
                   onClick={item.onClick || (() => window.open(item.href, '_blank'))}
                   className="flex items-center p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth group cursor-pointer"
                 >
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-smooth">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-foreground font-medium">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="p-6 gradient-subtle border-accent/20">
              <h4 className="font-serif text-xl font-semibold text-primary mb-3">
                Pronta para Começar?
              </h4>
              <p className="text-muted-foreground mb-4">
                Agende uma consulta gratuita de 30 minutos para discutir seu projeto e 
                ver como design estratégico pode acelerar seu crescimento.
              </p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth"
              >
                Agendar Conversa
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;