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
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent successfully!",
      description: "I'll get back to you within 24 hours.",
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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sarah@sarahchen.design',
      href: 'mailto:sarah@sarahchen.design'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/sarahchen-design',
      href: 'https://linkedin.com/in/sarahchen-design'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your brand with strategic design? Let's discuss your project 
            and explore how we can drive growth together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 shadow-medium border-0">
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
              Start Your Project
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
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
                    placeholder="your@email.com"
                    required
                    className="border-border focus:border-accent focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="border-border focus:border-accent focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Project Details *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals, and timeline..."
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
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                Get In Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Choose your preferred method below. 
                I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth group"
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
                </a>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="p-6 gradient-subtle border-accent/20">
              <h4 className="font-serif text-xl font-semibold text-primary mb-3">
                Ready to Start?
              </h4>
              <p className="text-muted-foreground mb-4">
                Book a free 30-minute consultation to discuss your project and 
                see how strategic design can accelerate your growth.
              </p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth"
              >
                Schedule a Call
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;