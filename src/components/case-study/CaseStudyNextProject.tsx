import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectData } from '@/types';

interface CaseStudyNextProjectProps {
    nextProject: ProjectData;
}

const CaseStudyNextProject = ({ nextProject }: CaseStudyNextProjectProps) => {
    return (
        <section className="container mx-auto px-6 mt-32">
            <div className="border-t border-border pt-16">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Next Project</p>
                <Link
                    to={`/case-study/${nextProject.key}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group block"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-serif text-3xl md:text-5xl font-bold group-hover:text-accent transition-colors">
                                {nextProject.title}
                            </h3>
                            <p className="mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                                {nextProject.subtitle}
                            </p>
                        </div>
                        <ArrowRight className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground group-hover:text-accent group-hover:translate-x-4 transition-all" />
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default CaseStudyNextProject;
