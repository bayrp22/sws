import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { JSDOM } from 'jsdom';

// Minimal SSR by loading the built client and injecting static HTML placeholders.
// We render lightweight content per route to ensure crawlability; client hydrates via React on load.

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const indexHtmlPath = resolve(distDir, 'index.html');

const routes: string[] = [
  '/',
  '/en', '/es',
  '/en/services/web-design-los-cabos', '/es/servicios/diseno-web-los-cabos',
  '/en/services/custom-websites', '/es/servicios/sitios-web-a-medida',
  '/en/services/seo', '/es/servicios/seo',
  '/en/contact', '/es/contacto',
  '/en/pricing', '/es/precios',
  '/en/about', '/es/nosotros',
];

// Route meta map for prerendered head tags
const ROUTE_META: Record<string, { title: string; description: string; alternates: { en: string; es: string } }> = {
  '/en': { title: 'Home | Strategic Web Solutions (SWS)', description: 'SWS builds custom, high-quality websites fast for Los Cabos businesses.', alternates: { en: '/en', es: '/es' } },
  '/es': { title: 'Inicio | Strategic Web Solutions (SWS)', description: 'SWS crea sitios rápidos y de alta calidad para negocios en Los Cabos.', alternates: { en: '/en', es: '/es' } },
  '/en/services/web-design-los-cabos': { title: 'Professional Web Design in Los Cabos | SWS', description: 'High-performance, visually stunning websites for Los Cabos and BCS.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
  '/es/servicios/diseno-web-los-cabos': { title: 'Diseño Web Profesional en Los Cabos | SWS', description: 'Sitios de alto rendimiento para Los Cabos y Baja California Sur.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
  '/en/services/custom-websites': { title: 'Custom Websites Tailored to Your Business | SWS', description: 'Fully customized, fast, secure, SEO-friendly websites.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
  '/es/servicios/sitios-web-a-medida': { title: 'Sitios Web a Medida para tu Negocio | SWS', description: 'Páginas personalizadas, rápidas, seguras y con SEO.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
  '/en/services/seo': { title: 'SEO Services That Put Your Business on the Map | SWS', description: 'SEO for Los Cabos businesses. Increase visibility and leads.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
  '/es/servicios/seo': { title: 'Servicios SEO para Destacar tu Negocio | SWS', description: 'SEO para empresas en Los Cabos. Aumenta tu visibilidad.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
  '/en/contact': { title: 'Contact | SWS', description: 'Have a question or want a quote? We respond fast.', alternates: { en: '/en/contact', es: '/es/contacto' } },
  '/es/contacto': { title: 'Contacto | SWS', description: '¿Dudas o cotización? Respondemos rápido.', alternates: { en: '/en/contact', es: '/es/contacto' } },
  '/en/pricing': { title: 'Pricing | SWS', description: 'Transparent packages for Los Cabos businesses.', alternates: { en: '/en/pricing', es: '/es/precios' } },
  '/es/precios': { title: 'Precios | SWS', description: 'Paquetes transparentes para negocios en Los Cabos.', alternates: { en: '/en/pricing', es: '/es/precios' } },
  '/en/about': { title: 'About | SWS', description: 'Fast, SEO-first websites for Los Cabos and BCS.', alternates: { en: '/en/about', es: '/es/nosotros' } },
  '/es/nosotros': { title: 'Nosotros | SWS', description: 'Sitios rápidos y optimizados para SEO en Los Cabos.', alternates: { en: '/en/about', es: '/es/nosotros' } },
};

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true });
}

function renderShellForRoute(route: string, template: string) {
  // Use JSDOM to manipulate head for canonical snapshots per route
  const dom = new JSDOM(template);
  const document = dom.window.document;

  // Adjust base and canonical to point to specific route
  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  const canonicalHref = `https://searchloscabos.com${route === '/' ? '/' : route}`;
  linkCanonical.setAttribute('href', canonicalHref);

  // Inject title/description and hreflang alternates
  const meta = ROUTE_META[route];
  if (meta) {
    let titleEl = document.querySelector('title');
    if (!titleEl) { titleEl = document.createElement('title'); document.head.appendChild(titleEl); }
    titleEl.textContent = meta.title;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) { descEl = document.createElement('meta'); descEl.setAttribute('name','description'); document.head.appendChild(descEl); }
    descEl.setAttribute('content', meta.description);

    const enAlt = document.createElement('link');
    enAlt.setAttribute('rel','alternate');
    enAlt.setAttribute('hrefLang','en-US');
    enAlt.setAttribute('href', `https://searchloscabos.com${meta.alternates.en}`);
    document.head.appendChild(enAlt);

    const esAlt = document.createElement('link');
    esAlt.setAttribute('rel','alternate');
    esAlt.setAttribute('hrefLang','es-MX');
    esAlt.setAttribute('href', `https://searchloscabos.com${meta.alternates.es}`);
    document.head.appendChild(esAlt);

    const xdAlt = document.createElement('link');
    xdAlt.setAttribute('rel','alternate');
    xdAlt.setAttribute('hrefLang','x-default');
    xdAlt.setAttribute('href', `https://searchloscabos.com/`);
    document.head.appendChild(xdAlt);
  }

  // Mark prerendered snapshot
  document.head.insertAdjacentHTML('beforeend', '<meta name="prerendered" content="true"/>');

  // Return serialized HTML
  return '<!DOCTYPE html>' + document.documentElement.outerHTML;
}

function main() {
  const template = readFileSync(indexHtmlPath, 'utf-8');
  const rendered: string[] = [];

  for (const route of routes) {
    const html = renderShellForRoute(route, template);
    const outDir = resolve(distDir, `.${route}`);
    ensureDir(outDir);
    writeFileSync(resolve(outDir, 'index.html'), html, 'utf-8');
    rendered.push(route);
  }

  // Write a small log file for the report step
  writeFileSync(resolve(distDir, 'prerendered-routes.txt'), rendered.join('\n'), 'utf-8');
  console.log(`Prerendered ${rendered.length} routes.`);
}

main(); 