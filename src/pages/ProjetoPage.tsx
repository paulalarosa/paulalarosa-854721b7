import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProject } from '@/data/projects';

export default function ProjetoPage() {
    const { id } = useParams<{ id: string }>();
    const project = getProject(id ?? '');

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Projeto não encontrado</p>
                    <Link to="/" className="text-accent hover:underline">← Voltar</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao portfólio
                    </Link>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${project.accentColor}15`, color: project.accentColor }}
                        >
                            {project.sector}
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        {project.year} · {project.role}
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4 leading-tight">
                        {project.name}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        {project.tagline}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center lg:sticky lg:top-24"
                    >
                        <div
                            className="relative rounded-[46px] p-[6px]"
                            style={{
                                backgroundColor: '#0a0a0a',
                                width: 300,
                                height: 616,
                                boxShadow: `0 0 0 2px ${project.accentColor}, 0 40px 80px -20px rgba(0,0,0,0.4)`,
                            }}
                        >
                            <div className="absolute -right-[3px] top-[108px] w-[3px] h-[36px] rounded-r-sm bg-neutral-700" />
                            <div className="absolute -left-[3px] top-[88px] w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />
                            <div className="absolute -left-[3px] top-[122px] w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />
                            <div className="absolute -left-[3px] top-[158px] w-[3px] h-[24px] rounded-l-sm bg-neutral-700" />

                            <div className="absolute rounded-[40px] overflow-hidden bg-white" style={{ inset: 6 }}>
                                <div className="absolute top-0 left-0 right-0 z-20 h-11 flex items-center justify-between px-6 pointer-events-none">
                                    <span className="text-[11px] font-semibold text-white mix-blend-difference">9:41</span>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[90px] h-[26px] rounded-full bg-black" />
                                    <div className="w-[14px] h-[7px] rounded-[2px] border border-white/50 relative overflow-hidden mix-blend-difference">
                                        <div className="absolute inset-[1px] right-[3px] bg-white/80 rounded-[1px]" />
                                    </div>
                                </div>

                                <iframe
                                    src={project.appUrl}
                                    title={project.name}
                                    className="absolute inset-0 w-full border-0"
                                    style={{ top: 44, height: 'calc(100% - 44px)' }}
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                />
                            </div>

                            <div
                                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
                                style={{ width: 110, height: 4, backgroundColor: 'rgba(255,255,255,0.18)' }}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-6 max-w-[300px]">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-[11px] font-medium border rounded-full"
                                    style={{
                                        borderColor: `${project.accentColor}35`,
                                        color: project.accentColor,
                                        backgroundColor: `${project.accentColor}08`,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-12"
                    >
                        <section>
                            <h2
                                className="text-xs uppercase tracking-widest font-medium mb-4"
                                style={{ color: project.accentColor }}
                            >
                                Visão Geral
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {project.overview}
                            </p>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                className="p-6 rounded-2xl border"
                                style={{ borderColor: `${project.accentColor}25`, backgroundColor: `${project.accentColor}06` }}
                            >
                                <h3 className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">
                                    Problema
                                </h3>
                                <p className="text-sm text-primary leading-relaxed">{project.problem}</p>
                            </div>
                            <div
                                className="p-6 rounded-2xl border"
                                style={{ borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10` }}
                            >
                                <h3
                                    className="text-xs uppercase tracking-widest font-medium mb-3"
                                    style={{ color: project.accentColor }}
                                >
                                    Solução
                                </h3>
                                <p className="text-sm text-primary leading-relaxed">{project.solution}</p>
                            </div>
                        </section>

                        <section>
                            <h2
                                className="text-xs uppercase tracking-widest font-medium mb-6"
                                style={{ color: project.accentColor }}
                            >
                                Decisões de Design
                            </h2>
                            <div className="space-y-4">
                                {project.decisions.map((d, i) => (
                                    <div
                                        key={i}
                                        className="p-5 rounded-xl border border-border bg-card"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className="text-xs font-mono font-bold mt-0.5 flex-shrink-0"
                                                style={{ color: project.accentColor }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <h4 className="text-sm font-medium text-primary mb-1.5">{d.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2
                                className="text-xs uppercase tracking-widest font-medium mb-6"
                                style={{ color: project.accentColor }}
                            >
                                Resultados
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {project.results.map((r, i) => (
                                    <div
                                        key={i}
                                        className="p-5 rounded-xl border border-border bg-card text-center"
                                    >
                                        <p
                                            className="font-serif text-3xl font-semibold mb-1"
                                            style={{ color: project.accentColor }}
                                        >
                                            {r.value}
                                        </p>
                                        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1.5">
                                            {r.metric}
                                        </p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                </div>

                <div className="border-t border-border mb-12" />

                <div className="flex items-center justify-between">
                    <Link
                        to="/#lab-innovation"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ver todos os projetos
                    </Link>
                    <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: project.accentColor }}
                    >
                        Abrir app completo
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </main>
        </div>
    );
}
