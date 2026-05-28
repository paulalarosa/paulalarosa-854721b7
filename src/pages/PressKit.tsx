import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Printer, Mail, Linkedin, Globe, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import paulaProfile from "@/assets/paula-profile.webp";

const skills = {
  Engineering: ["React 18", "TypeScript (strict)", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Supabase"],
  Design: ["Figma", "Design Systems", "Design Tokens", "Motion Language", "WCAG / a11y"],
  "Backend & Infra": ["Postgres", "Edge Functions", "Vercel", "AWS S3 + CloudFront", "Sentry", "reCAPTCHA v3"],
  Languages: ["Português (nativo)", "English (advanced)", "Español (advanced)"],
};

const cases = [
  {
    name: "Khaos Kontrol",
    tag: "MicroSaaS · Industrial Noir · 60+ telas",
    blurb:
      "Plataforma all-in-one para profissionais autônomos do mercado de beleza. Agenda em tempo real, contratos PDF via edge function, cobrança Pix com tracking e Design System aplicado em 60+ telas.",
    link: "https://khaoskontrol.com.br",
  },
  {
    name: "Consultor Familiar",
    tag: "Website + automação · LCP 1.1s · +150% leads",
    blurb:
      "Site institucional + funil de captação para consultoria familiar. Jornada acolhedora desenhada para usuário em momento delicado. Lighthouse 97 mobile, +150% leads qualificados no primeiro trimestre.",
    link: "https://www.consultorfamiliar.com.br/",
  },
  {
    name: "Doctor Creator Board",
    tag: "Mobile-first DataViz · 60fps em 1000+ pontos",
    blurb:
      "Dashboard para médicos criadores de conteúdo cruzando dados de Instagram/TikTok com conversão para consulta. 3 cards above-the-fold, drill-down progressivo, LTTB decimation.",
  },
  {
    name: "LMS Gamificado",
    tag: "Supabase Realtime · cohort beta 8/8 módulos",
    blurb:
      "LMS para educação cultural com progressão gamificada e quizzes em tempo real. Cohort beta de 18 alunos teve 8/8 módulos completados — referência de indústria é 2-3/8.",
  },
];

const metrics = [
  { value: "5+", label: "anos de experiência" },
  { value: "50+", label: "projetos entregues" },
  { value: "14+", label: "clientes/marcas" },
  { value: "6", label: "setores diferentes" },
];

const PressKit = () => (
  <>
    <Helmet>
      <title>Press Kit — Paula La Rosa</title>
      <meta name="description" content="Press kit imprimível: bio, stack, cases e contato." />
      <meta name="robots" content="noindex,follow" />
    </Helmet>

    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-6 py-4 flex items-center justify-between print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao portfólio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Salvar PDF
        </button>
      </header>

      <main className="container mx-auto px-6 pb-16 pt-6 max-w-4xl print:pt-0 print:pb-0">
        <article className="bg-card border border-border rounded-2xl p-8 md:p-12 print:border-0 print:p-0 print:bg-transparent">
          <div className="grid md:grid-cols-[160px_1fr] gap-8 items-start mb-10">
            <img
              src={paulaProfile}
              alt="Paula La Rosa"
              width={160}
              height={160}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover grayscale"
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                Press Kit · v2.7
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-primary leading-tight mb-3">
                Paula La Rosa
              </h1>
              <p className="text-lg text-foreground/80 leading-relaxed max-w-prose">
                Creative UI Engineer & Product Designer. Rio de Janeiro 🇧🇷. Para
                founders e times de produto que perdem semanas entre o Figma e o
                deploy — uma só cabeça, um só vocabulário, um só repositório.
              </p>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Posicionamento
            </h2>
            <p className="text-base text-foreground/85 leading-relaxed max-w-prose">
              A maioria dos produtos digitais morre na fronteira entre design e
              código: o wireframe fica bonito, o código fica genérico, ninguém
              entrega o que o usuário sentiu no protótipo. Eu fecho essa lacuna.
              Desenho a interface no Figma e implemento em React + TypeScript —
              passa code review, Lighthouse 95+ e sai do mockup à produção sem
              handoff.
            </p>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 print:gap-2">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="border border-border rounded-xl p-4 text-center print:p-2"
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary leading-none mb-1">
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </section>

          <section className="mb-10">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Stack & capacidades
            </h2>
            <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <dt className="text-sm font-semibold text-primary mb-1">{group}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">
                    {items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-10">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Cases selecionados
            </h2>
            <ul className="space-y-5">
              {cases.map((c) => (
                <li key={c.name} className="border-l-2 border-border pl-4 break-inside-avoid">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-semibold text-primary">{c.name}</h3>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-1">{c.blurb}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline mt-1 inline-block print:text-muted-foreground"
                    >
                      {c.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Contato
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="https://paulalarosa.com" className="hover:underline">
                  paulalarosa.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href={`https://wa.me/${CONTACT.whatsappNumber}`} className="hover:underline">
                  +55 (21) 98360-4870
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href={CONTACT.linkedin} className="hover:underline">
                  linkedin.com/in/paula-la-rosa
                </a>
              </div>
            </dl>
            <p className="text-xs text-muted-foreground mt-6 print:mt-3">
              Respondo em até 24 horas. Primeira call de diagnóstico gratuita, sem
              compromisso — se eu não for a pessoa certa pro seu desafio, indico
              quem é.
            </p>
          </section>
        </article>

        <p className="text-center text-xs text-muted-foreground mt-6 print:mt-2">
          © {new Date().getFullYear()} Paula La Rosa · Rio de Janeiro 🇧🇷
        </p>
      </main>
    </div>
  </>
);

export default PressKit;
