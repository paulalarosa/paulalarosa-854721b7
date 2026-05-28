import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join("public", "og");
await fs.mkdir(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

const escape = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[c]);

const cases = [
  {
    slug: "home",
    eyebrow: "PAULA LA ROSA",
    title: "Creative UI Engineer & Product Designer",
    subtitle: "Do research e Figma ao código em produção — Rio de Janeiro 🇧🇷",
    metric: "v2.7",
    metricLabel: "AWWWARDS 2026 CINEMATIC",
    accent: "#cccccc",
    motif: "grid",
  },
  {
    slug: "platform",
    eyebrow: "KHAOS KONTROL",
    title: "Industrial-grade SaaS for beauty business",
    subtitle: "Design system Industrial Noir + Supabase + Pix + PDF contracts",
    metric: "60+",
    metricLabel: "TELAS NO DESIGN SYSTEM",
    accent: "#a3a3a3",
    motif: "grid",
  },
  {
    slug: "website",
    eyebrow: "CONSULTOR FAMILIAR",
    title: "Trust at first paint",
    subtitle: "Wireframes acolhedores + LCP 1.1s + +150% leads qualificados",
    metric: "97",
    metricLabel: "LIGHTHOUSE PERFORMANCE",
    accent: "#d97706",
    motif: "warmth",
  },
  {
    slug: "portfolio",
    eyebrow: "ESTE PORTFÓLIO",
    title: "Engineering as a portfolio",
    subtitle: "GSAP cinematic + Lenis smooth + i18n + bundle 92KB gzip",
    metric: "92KB",
    metricLabel: "FIRST-PAINT BUNDLE",
    accent: "#cccccc",
    motif: "monoline",
  },
  {
    slug: "microsaas",
    eyebrow: "LMS GAMIFICADO",
    title: "Progression with purpose",
    subtitle: "Supabase Realtime + state machine + cohort beta 8/8 módulos",
    metric: "8/8",
    metricLabel: "MÓDULOS COMPLETADOS",
    accent: "#a78bfa",
    motif: "rings",
  },
  {
    slug: "dashboard",
    eyebrow: "DOCTOR CREATOR BOARD",
    title: "3 cards. Real decisions.",
    subtitle: "Mobile-first DataViz + LTTB decimation + tipagem segura",
    metric: "60fps",
    metricLabel: "SCROLL EM 1000+ PONTOS",
    accent: "#2dd4bf",
    motif: "bars",
  },
  {
    slug: "projeto-klini",
    eyebrow: "KLINI · HEALTHTECH",
    title: "Super app de saúde que centraliza a jornada",
    subtitle: "HealthRing como métrica emocional + filtros contextuais",
    metric: "−42%",
    metricLabel: "ABANDONO NO AGENDAMENTO",
    accent: "#16a34a",
    motif: "rings",
  },
  {
    slug: "projeto-seguro-vida",
    eyebrow: "SEGURO DE VIDA · INSURTECH",
    title: "Proteção que você entende de verdade",
    subtitle: "ShieldScore + Coverage Orbit + sinistro em 3 etapas",
    metric: "3×",
    metricLabel: "COMPREENSÃO DA COBERTURA",
    accent: "#8b5cf6",
    motif: "rings",
  },
  {
    slug: "projeto-plano-saude",
    eyebrow: "PLANO DE SAÚDE · HEALTHTECH",
    title: "Plano de saúde nativo do iOS",
    subtitle: "Dynamic Island + HealthKit + HealthRing animado",
    metric: "4.2×",
    metricLabel: "ENGAJAMENTO SEMANAL",
    accent: "#0ea5e9",
    motif: "monoline",
  },
  {
    slug: "projeto-akad",
    eyebrow: "AKAD · INSURTECH B2B",
    title: "Plataforma para corretores em campo",
    subtitle: "CRM mobile-first + apólices em tempo real + LMS contextual",
    metric: "−45%",
    metricLabel: "TEMPO PRA FECHAR COTAÇÃO",
    accent: "#3b82f6",
    motif: "bars",
  },
  {
    slug: "projeto-loja-kaos",
    eyebrow: "LOJA KAOS · STREETWEAR",
    title: "E-commerce com cara de revista",
    subtitle: "HeroBanner editorial + ProductCards 3:4 + checkout por gestos",
    metric: "−34%",
    metricLabel: "ABANDONO DE CARRINHO",
    accent: "#f59e0b",
    motif: "grid",
  },
];

const motifSvg = (motif, accent) => {
  if (motif === "grid") {
    return `
      <pattern id="motif" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accent}" stroke-opacity="0.06" stroke-width="1"/>
      </pattern>
      <rect width="${W}" height="${H}" fill="url(#motif)"/>
    `;
  }
  if (motif === "rings") {
    return `
      <g opacity="0.18" transform="translate(${W - 180}, ${H - 180})">
        <circle r="120" fill="none" stroke="${accent}" stroke-width="2"/>
        <circle r="90" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="6 6"/>
        <circle r="60" fill="none" stroke="${accent}" stroke-width="2"/>
        <circle r="30" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="3 4"/>
      </g>
    `;
  }
  if (motif === "bars") {
    return `
      <g opacity="0.22" transform="translate(${W - 420}, ${H - 220})">
        ${[40, 90, 60, 130, 80, 160, 100, 180]
          .map(
            (h, i) =>
              `<rect x="${i * 48}" y="${200 - h}" width="32" height="${h}" rx="2" fill="${accent}"/>`,
          )
          .join("")}
      </g>
    `;
  }
  if (motif === "monoline") {
    return `
      <g opacity="0.12" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="14" fill="${accent}">
        <text x="${W - 360}" y="120">$ npm run build</text>
        <text x="${W - 360}" y="150">▸ index.js  334 KB / gzip 116 KB</text>
        <text x="${W - 360}" y="180">▸ motion    127 KB / gzip 42 KB</text>
        <text x="${W - 360}" y="210">▸ vendor    155 KB / gzip 51 KB</text>
        <text x="${W - 360}" y="240">✓ built in 21.37s</text>
      </g>
    `;
  }
  // warmth (default fallback for website)
  return `
    <radialGradient id="warmth" cx="0.85" cy="0.2" r="0.7">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#warmth)"/>
  `;
};

const svgFor = (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#171717"/>
    </linearGradient>
    <linearGradient id="accentBleed" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="${c.accent}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#accentBleed)"/>

  ${motifSvg(c.motif, c.accent)}

  <rect x="0" y="0" width="6" height="${H}" fill="${c.accent}"/>

  <g font-family="Inter, 'Segoe UI', system-ui, sans-serif">
    <rect x="80" y="80" width="${28 + c.eyebrow.length * 8}" height="32" rx="16" fill="${c.accent}" fill-opacity="0.14" stroke="${c.accent}" stroke-opacity="0.45" stroke-width="1"/>
    <text x="${94}" y="101" font-size="12" font-weight="600" fill="${c.accent}" letter-spacing="2">${escape(c.eyebrow)}</text>
  </g>

  <g font-family="'Playfair Display', Georgia, serif">
    <text x="80" y="${c.title.length > 30 ? 270 : 290}" font-size="${c.title.length > 30 ? 72 : 88}" font-weight="600" fill="#ffffff" letter-spacing="-2">
      ${escape(c.title.split(" ").slice(0, Math.ceil(c.title.split(" ").length / 2)).join(" "))}
    </text>
    <text x="80" y="${c.title.length > 30 ? 350 : 380}" font-size="${c.title.length > 30 ? 72 : 88}" font-weight="600" fill="#ffffff" letter-spacing="-2">
      ${escape(c.title.split(" ").slice(Math.ceil(c.title.split(" ").length / 2)).join(" "))}
    </text>
  </g>

  <text x="80" y="${c.title.length > 30 ? 400 : 440}" font-family="Inter, 'Segoe UI', system-ui, sans-serif" font-size="22" fill="#ffffff" fill-opacity="0.6">
    ${escape(c.subtitle)}
  </text>

  <g transform="translate(80, ${H - 110})">
    <text font-family="'Playfair Display', Georgia, serif" font-size="56" font-weight="700" fill="${c.accent}">${escape(c.metric)}</text>
    <text y="38" font-family="Inter, 'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="600" fill="#ffffff" fill-opacity="0.45" letter-spacing="3">${escape(c.metricLabel)}</text>
  </g>

  <text x="${W - 80}" y="${H - 60}" text-anchor="end" font-family="Inter, 'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="500" fill="#ffffff" fill-opacity="0.55" letter-spacing="3">PAULALAROSA.COM</text>
  <line x1="${W - 80}" y1="${H - 80}" x2="${W - 280}" y2="${H - 80}" stroke="${c.accent}" stroke-width="2"/>
</svg>`;

for (const c of cases) {
  const svg = svgFor(c);
  const outPath = path.join(OUT_DIR, `${c.slug}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(outPath);
  const { size } = await fs.stat(outPath);
  console.log(`▸ ${outPath}  ${(size / 1024).toFixed(1)} kB  (1200x630)`);
}

console.log("\nDone. Wire each slug's image into useCaseStudy.ts (PROJECT_IMAGE map).");
