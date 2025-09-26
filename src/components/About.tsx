import { GraduationCap, Briefcase, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  const skills = [
    'Brand Strategy & Identity',
    'Digital Marketing Design',
    'Growth Marketing',
    'UI/UX Design',
    'Marketing Analytics',
    'Creative Direction'
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: 'Marketing MBA',
      description: 'Stanford Graduate School of Business'
    },
    {
      icon: Briefcase,
      title: '5+ Years Experience',
      description: 'Design & Marketing Strategy'
    },
    {
      icon: TrendingUp,
      title: '25% Avg Growth',
      description: 'Client Performance Increase'
    },
    {
      icon: Award,
      title: 'Award Winner',
      description: 'Design Excellence Recognition'
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Where Creativity Meets Strategy
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm Sarah Chen, a graphic designer with an MBA in Marketing who believes that 
                beautiful design should do more than just look good—it should drive business results.
              </p>
              
              <p>
                With over 5 years of experience combining creative vision with strategic thinking, 
                I help businesses create visual identities that not only capture attention but 
                convert audiences into loyal customers.
              </p>
              
              <p>
                My unique background allows me to understand both the creative and business sides 
                of every project, ensuring that every design decision is backed by data and 
                strategic insight.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                Core Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center p-3 bg-accent/5 rounded-lg border border-accent/10"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-medium transition-smooth border-0 shadow-soft"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <achievement.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="font-serif text-2xl md:text-3xl text-primary mb-6 leading-relaxed">
              "Great design isn't just about making things beautiful—it's about making 
              them work better, sell more, and create lasting connections with people."
            </blockquote>
            <cite className="text-accent font-medium">— Sarah Chen</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;