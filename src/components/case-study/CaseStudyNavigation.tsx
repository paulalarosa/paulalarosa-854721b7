import { useState, useEffect } from 'react';

const CaseStudyNavigation = () => {
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'stack', 'process', 'results'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-32">
                <nav className="flex flex-col gap-2 border-l-2 border-border pl-6">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'stack', label: 'Tech Stack' },
                        { id: 'process', label: 'Process' },
                        { id: 'results', label: 'Results' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`text-left py-2 text-sm font-medium transition-colors ${activeSection === item.id
                                ? 'text-accent -ml-[26px] border-l-2 border-accent pl-6'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default CaseStudyNavigation;
