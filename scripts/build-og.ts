import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';

const site = 'Search Web Services (SWS)';
const brandLine = 'Los Cabos Web Design | SWS';

const routes: Array<{ path: string; title: string }> = [
  { path: '/en', title: 'Home' },
  { path: '/es', title: 'Inicio' },
  { path: '/en/services/web-design-los-cabos', title: 'Web Design Los Cabos' },
  { path: '/es/servicios/diseno-web-los-cabos', title: 'Diseño Web Los Cabos' },
  { path: '/en/services/custom-websites', title: 'Custom Websites' },
  { path: '/es/servicios/sitios-web-a-medida', title: 'Sitios Web a Medida' },
  { path: '/en/services/seo', title: 'SEO Services' },
  { path: '/es/servicios/seo', title: 'Servicios SEO' },
  { path: '/en/contact', title: 'Contact' },
  { path: '/es/contacto', title: 'Contacto' },
  { path: '/en/pricing', title: 'Pricing' },
  { path: '/es/precios', title: 'Precios' },
  { path: '/en/about', title: 'About' },
  { path: '/es/nosotros', title: 'Nosotros' },
];

function slugify(p: string) {
  return p.replace(/\/$/, '').replace(/^\//, '').replace(/\//g, '-').replace(/[^a-zA-Z0-9-_]/g, '_') || 'home';
}

function renderSVG(title: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="60" y="180" font-family="-apple-system,Segoe UI,Roboto,Arial" font-size="72" fill="#A5FF00" font-weight="700">${site}</text>
  <text x="60" y="270" font-family="-apple-system,Segoe UI,Roboto,Arial" font-size="60" fill="#ffffff" font-weight="700">${escapeXml(title)}</text>
  <text x="60" y="360" font-family="-apple-system,Segoe UI,Roboto,Arial" font-size="36" fill="#d1d5db">${brandLine}</text>
</svg>`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function main() {
  const outDir = resolve(process.cwd(), 'public', 'og');
  mkdirSync(outDir, { recursive: true });
  routes.forEach(({ path, title }) => {
    const name = slugify(path || '/');
    const svg = renderSVG(title);
    writeFileSync(resolve(outDir, `${name}.svg`), svg, 'utf-8');
  });
  console.log(`Wrote OG SVGs to ${outDir}`);
}

main(); 