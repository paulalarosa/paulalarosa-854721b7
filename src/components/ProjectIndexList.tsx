import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { projects } from "@/data/projects";

const ProjectIndexList = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      lerped.current.x += (mouse.current.x - lerped.current.x) * 0.1;
      lerped.current.y += (mouse.current.y - lerped.current.y) * 0.1;
      if (previewRef.current) {
        gsap.set(previewRef.current, {
          x: lerped.current.x + 28,
          y: lerped.current.y - 130,
        });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section id="project-index" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-end justify-between pb-6 border-b border-border mb-0"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Trabalho selecionado
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
              Projetos
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:block">
            {String(projects.length).padStart(2, "0")} projetos
          </span>
        </motion.div>

        {/* list */}
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/projeto/${project.id}`}
                className="group relative flex items-center gap-4 md:gap-10 py-6 md:py-8 border-b border-border overflow-hidden"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-transform duration-300 origin-top"
                  style={{
                    backgroundColor: project.accentColor,
                    transform: hovered === i ? "scaleY(1)" : "scaleY(0)",
                  }}
                />

                {/* index */}
                <span className="font-mono text-xs text-muted-foreground/50 w-7 flex-shrink-0 select-none pl-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* name + tagline */}
                <div className="flex-1 min-w-0">
                  <span
                    className="font-serif text-2xl md:text-4xl font-semibold leading-tight block transition-colors duration-200"
                    style={{ color: hovered === i ? project.accentColor : "hsl(var(--foreground))" }}
                  >
                    {project.name}
                  </span>
                  <span className="hidden md:block text-sm text-muted-foreground mt-1.5 truncate max-w-lg">
                    {project.tagline}
                  </span>
                </div>

                {/* sector + year */}
                <div className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                  <span className="text-xs font-mono text-muted-foreground/60">
                    {project.sector}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/40">
                    {project.year}
                  </span>
                </div>

                {/* mobile: sector */}
                <span className="md:hidden text-xs font-mono text-muted-foreground/50 flex-shrink-0">
                  {project.year}
                </span>

                {/* arrow */}
                <ArrowUpRight
                  className="w-4 h-4 flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                  style={{ color: project.accentColor }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* floating image preview — desktop only */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block rounded-xl overflow-hidden"
        style={{
          width: 280,
          height: 180,
          opacity: hovered !== null ? 1 : 0,
          transition: "opacity 0.18s ease",
          willChange: "transform",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {projects.map((project, i) => (
          <img
            key={project.id}
            src={`/og/projeto-${project.id}.jpg`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.12s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectIndexList;
