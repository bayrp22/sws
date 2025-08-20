import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { faqData } from '../src/data/faq.js';

const canonicalRoot = 'https://searchwebservices.tech';

const routes = [
  { en: '/en', es: '/es' },
  { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' },
  { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' },
  { en: '/en/services/seo', es: '/es/servicios/seo' },
  { en: '/en/contact', es: '/es/contacto' },
  { en: '/en/pricing', es: '/es/precios' },
  { en: '/en/about', es: '/es/nosotros' },
  { en: '/form', es: '/formulario' },
  { en: '/faq', es: '/preguntas' },
  ...faqData.map(item => ({ en: `/faq/${item.slug}`, es: `/preguntas/${item.slug}` })),
  { en: '/case-studies', es: '/estudios-de-caso' },
];

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const now = new Date().toISOString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(({ en, es }) => {
    const locEn = `${canonicalRoot}${en}`;
    const locEs = `${canonicalRoot}${es}`;
    return `  <url>
    <loc>${escapeXml(locEn)}</loc>
    <lastmod>${now}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(locEn)}" />
    <xhtml:link rel="alternate" hreflang="es-MX" href="${escapeXml(locEs)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalRoot}/" />
  </url>
  <url>
    <loc>${escapeXml(locEs)}</loc>
    <lastmod>${now}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(locEn)}" />
    <xhtml:link rel="alternate" hreflang="es-MX" href="${escapeXml(locEs)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalRoot}/" />
  </url>`;
  })
  .join('\n')}
</urlset>`;

const outPath = resolve(process.cwd(), 'dist', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Generated sitemap at ${outPath}`); 