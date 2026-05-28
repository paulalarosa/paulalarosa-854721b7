import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.SITE_URL || "https://paulalarosa.com";
const OUT = path.join("public", "sitemap.xml");

const CASE_STUDIES = ["website", "portfolio", "microsaas", "dashboard", "platform"];

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  ...CASE_STUDIES.map((id) => ({
    loc: `/case-study/${id}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(OUT, xml, "utf8");
console.log(`▸ ${OUT} (${urls.length} URLs, lastmod ${today})`);
