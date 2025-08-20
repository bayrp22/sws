import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Minimal SSR by loading the built client and injecting static HTML placeholders.
// We render lightweight content per route to ensure crawlability; client hydrates via React on load.

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const indexHtmlPath = resolve(distDir, 'index.html');

// Import FAQ data for generating routes
import { faqData } from '../src/data/faq.js';

const routes: string[] = [
  '/',
  '/en', '/es',
  '/en/services', '/es/servicios',
  '/en/services/web-design-los-cabos', '/es/servicios/diseno-web-los-cabos',
  '/en/services/web-development', '/es/servicios/desarrollo-web',
  '/en/services/custom-websites', '/es/servicios/sitios-web-a-medida',
  '/en/services/seo', '/es/servicios/seo',
  '/en/contact', '/es/contacto',
  '/en/pricing', '/es/precios',
  '/en/about', '/es/nosotros',
  '/form', '/formulario',
  '/faq', '/preguntas',
  ...faqData.map(item => `/faq/${item.slug}`),
  ...faqData.map(item => `/preguntas/${item.slug}`),
  '/case-studies', '/estudios-de-caso',
];

// Route meta map for prerendered head tags
const ROUTE_META: Record<string, { title: string; description: string; alternates: { en: string; es: string }; lcp?: string }> = {
  '/en': { title: 'Web Design & Website Development in Los Cabos | SWS', description: 'Custom websites, web design, website development, and website SEO for businesses in Los Cabos and Baja California Sur. Fast delivery, clean code, real results.', alternates: { en: '/en', es: '/es' }, lcp: '/images/pink-lines-new.png' },
  '/es': { title: 'Diseño Web y Desarrollo de Sitios Web en Los Cabos | SWS', description: 'Sitios web a medida, diseño web, desarrollo de sitios web y SEO para empresas en Los Cabos y Baja California Sur. Entrega rápida, código limpio y resultados reales.', alternates: { en: '/en', es: '/es' }, lcp: '/images/pink-lines-new.png' },
  '/en/services': { title: 'Web Services in Los Cabos | SWS', description: 'Explore our web services in Los Cabos: web design, website design, web development, website development, custom websites, and website SEO.', alternates: { en: '/en/services', es: '/es/servicios' } },
  '/es/servicios': { title: 'Servicios Web en Los Cabos | SWS', description: 'Explora nuestros servicios web en Los Cabos: diseño web, diseño de sitios web, desarrollo web, desarrollo de sitios web, sitios web a medida y SEO para sitios web.', alternates: { en: '/en/services', es: '/es/servicios' } },
  '/en/services/web-design-los-cabos': { title: 'Professional Web Design in Los Cabos | SWS', description: 'Professional web design and website design for Los Cabos businesses—high‑performance, mobile‑first, SEO‑ready.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
  '/es/servicios/diseno-web-los-cabos': { title: 'Diseño Web Profesional en Los Cabos | SWS', description: 'Sitios de alto rendimiento para Los Cabos y Baja California Sur.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
  '/en/services/web-development': { title: 'Web Development & Website Development in Los Cabos | SWS', description: 'Fast, secure, SEO‑ready web development and website development for businesses in Los Cabos and Baja California Sur. Custom builds, best practices, and clean code.', alternates: { en: '/en/services/web-development', es: '/es/servicios/desarrollo-web' } },
  '/es/servicios/desarrollo-web': { title: 'Desarrollo Web y Desarrollo de Sitios Web en Los Cabos | SWS', description: 'Desarrollo web y de sitios web rápido, seguro y optimizado para SEO para negocios en Los Cabos y Baja California Sur. Proyectos a medida, buenas prácticas y código limpio.', alternates: { en: '/en/services/web-development', es: '/es/servicios/desarrollo-web' } },
  '/en/services/custom-websites': { title: 'Custom Websites Tailored to Your Business | SWS', description: 'Custom websites—get a custom website that’s fast, secure, SEO‑friendly, and built for your brand.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
  '/es/servicios/sitios-web-a-medida': { title: 'Sitios Web a Medida para tu Negocio | SWS', description: 'Páginas personalizadas, rápidas, seguras y con SEO.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
  '/en/services/seo': { title: 'Website SEO Services for Los Cabos Businesses | SWS', description: 'Website SEO services for Los Cabos businesses—technical and on‑page SEO to increase visibility, traffic, and leads.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
  '/es/servicios/seo': { title: 'Servicios SEO para Destacar tu Negocio | SWS', description: 'SEO para empresas en Los Cabos. Aumenta tu visibilidad.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
  '/en/contact': { title: 'Contact | SWS', description: 'Have a question or want a quote? We respond fast.', alternates: { en: '/en/contact', es: '/es/contacto' } },
  '/es/contacto': { title: 'Contacto | SWS', description: '¿Dudas o cotización? Respondemos rápido.', alternates: { en: '/en/contact', es: '/es/contacto' } },
  '/en/pricing': { title: 'Pricing | SWS', description: 'Transparent packages for Los Cabos businesses.', alternates: { en: '/en/pricing', es: '/es/precios' } },
  '/es/precios': { title: 'Precios | SWS', description: 'Paquetes transparentes para negocios en Los Cabos.', alternates: { en: '/en/pricing', es: '/es/precios' } },
  '/en/about': { title: 'About | SWS', description: 'Fast, SEO-first websites for Los Cabos and BCS.', alternates: { en: '/en/about', es: '/es/nosotros' } },
  '/es/nosotros': { title: 'Nosotros | SWS', description: 'Sitios rápidos y optimizados para SEO en Los Cabos.', alternates: { en: '/en/about', es: '/es/nosotros' } },
  '/form': { title: 'Get Started Today - Project Form | SWS', description: 'Ready to start your web project? Fill out our form and let\'s move forward with your business goals today.', alternates: { en: '/form', es: '/formulario' } },
  '/formulario': { title: 'Comienza Hoy - Formulario de Proyecto | SWS', description: '¿Listo para iniciar tu proyecto web? Completa nuestro formulario y avancemos con tus objetivos comerciales hoy mismo.', alternates: { en: '/form', es: '/formulario' } },
  '/faq': { title: 'Search Web Services – Master FAQ (2025) | SWS', description: 'Answer real buyer questions and rank for long‑tail queries while funnelling visitors to our quote form. Find answers to common questions about our web design and development services.', alternates: { en: '/faq', es: '/preguntas' } },
  '/preguntas': { title: 'Search Web Services – Preguntas Frecuentes (2025) | SWS', description: 'Responde preguntas reales de compradores y posiciónate para consultas de cola larga mientras diriges visitantes a nuestro formulario de cotización. Encuentra respuestas a preguntas comunes sobre nuestros servicios de diseño y desarrollo web.', alternates: { en: '/faq', es: '/preguntas' } },
  // FAQ individual pages
  ...Object.fromEntries(faqData.map(item => [
    `/faq/${item.slug}`,
    { 
      title: `${item.question} | SWS`, 
      description: item.metaDescription, 
      alternates: { en: `/faq/${item.slug}`, es: `/preguntas/${item.slug}` } 
    }
  ])),
  // Spanish FAQ individual pages
  ...Object.fromEntries(faqData.map(item => [
    `/preguntas/${item.slug}`,
    { 
      title: `${item.question} | SWS`, 
      description: item.metaDescription, 
      alternates: { en: `/faq/${item.slug}`, es: `/preguntas/${item.slug}` } 
    }
  ])),
  '/case-studies': { title: 'Case Studies | SWS', description: 'Coming Soon - Our client success stories and project showcases.', alternates: { en: '/case-studies', es: '/estudios-de-caso' } },
  '/estudios-de-caso': { title: 'Estudios de Caso | SWS', description: 'Próximamente - Nuestras historias de éxito de clientes y muestras de proyectos.', alternates: { en: '/case-studies', es: '/estudios-de-caso' } },
};

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true });
}

function cloneSiteWideJsonLdFromTemplate(document: Document, templateHtml: string) {
  const tdom = new JSDOM(templateHtml);
  const tscripts = tdom.window.document.querySelectorAll('script[type="application/ld+json"]');
  tscripts.forEach(s => {
    const clone = document.createElement('script');
    clone.type = 'application/ld+json';
    clone.textContent = s.textContent || '';
    document.head.appendChild(clone);
  });
}

function makeServiceJsonLd(route: string) {
  const map: Record<string, { name: string; description: string; url: string }> = {
    '/en/services/web-design-los-cabos': {
      name: 'Professional Web Design in Los Cabos',
      description: 'High-performance, visually stunning websites for Los Cabos and BCS.',
      url: 'https://searchwebservices.tech/en/services/web-design-los-cabos'
    },
    '/es/servicios/diseno-web-los-cabos': {
      name: 'Diseño Web Profesional en Los Cabos',
      description: 'Sitios de alto rendimiento para Los Cabos y Baja California Sur.',
      url: 'https://searchwebservices.tech/es/servicios/diseno-web-los-cabos'
    },
    '/en/services/custom-websites': {
      name: 'Custom Websites Tailored to Your Business',
      description: 'Fully customized, fast, secure, SEO-friendly websites.',
      url: 'https://searchwebservices.tech/en/services/custom-websites'
    },
    '/es/servicios/sitios-web-a-medida': {
      name: 'Sitios Web a Medida para tu Negocio',
      description: 'Páginas personalizadas, rápidas, seguras y con SEO.',
      url: 'https://searchwebservices.tech/es/servicios/sitios-web-a-medida'
    },
    '/en/services/seo': {
      name: 'SEO Services That Put Your Business on the Map',
      description: 'SEO for Los Cabos businesses. Increase visibility and leads.',
      url: 'https://searchwebservices.tech/en/services/seo'
    },
    '/es/servicios/seo': {
      name: 'Servicios SEO para Destacar tu Negocio',
      description: 'SEO para empresas en Los Cabos. Aumenta tu visibilidad.',
      url: 'https://searchwebservices.tech/es/servicios/seo'
    },
    '/en/services/web-development': {
      name: 'Web Development & Website Development in Los Cabos',
      description: 'Fast, secure, SEO‑ready web development and website development for businesses in Los Cabos and Baja California Sur. Custom builds, best practices, and clean code.',
      url: 'https://searchwebservices.tech/en/services/web-development'
    },
    '/es/servicios/desarrollo-web': {
      name: 'Desarrollo Web y Desarrollo de Sitios Web en Los Cabos',
      description: 'Desarrollo web y de sitios web rápido, seguro y optimizado para SEO para negocios en Los Cabos y Baja California Sur. Proyectos a medida, buenas prácticas y código limpio.',
      url: 'https://searchwebservices.tech/es/servicios/desarrollo-web'
    },
  };
  const item = map[route];
  if (!item) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.name,
    description: item.description,
    provider: { '@type': 'LocalBusiness', name: 'Search Web Services' },
    areaServed: ['Los Cabos', 'Baja California Sur', 'Mexico'],
    url: item.url,
  };
}

function makeBreadcrumbJsonLd(route: string) {
  const nameMap: Record<string, string> = {
    '/en/services/web-design-los-cabos': 'Web Design Los Cabos',
    '/es/servicios/diseno-web-los-cabos': 'Diseño Web Los Cabos',
    '/en/services/web-development': 'Web Development',
    '/es/servicios/desarrollo-web': 'Desarrollo Web',
    '/en/services/custom-websites': 'Custom Websites',
    '/es/servicios/sitios-web-a-medida': 'Sitios Web a Medida',
    '/en/services/seo': 'SEO Services',
    '/es/servicios/seo': 'Servicios SEO',
  };
  const name = nameMap[route];
  if (!name) return null;
  const localeRoot = route.startsWith('/es') ? 'https://searchwebservices.tech/es' : 'https://searchwebservices.tech/en';
  const url = `https://searchwebservices.tech${route}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: route.startsWith('/es') ? 'Inicio' : 'Home', item: localeRoot },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
}

function renderShellForRoute(route: string, template: string) {
  // Use JSDOM to manipulate head for canonical snapshots per route
  const dom = new JSDOM(template);
  const document = dom.window.document as Document;

  // Adjust base and canonical to point to specific route
  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  const canonicalHref = `https://searchwebservices.tech${route === '/' ? '/' : route}`;
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
    enAlt.setAttribute('href', `https://searchwebservices.tech${meta.alternates.en}`);
    document.head.appendChild(enAlt);

    const esAlt = document.createElement('link');
    esAlt.setAttribute('rel','alternate');
    esAlt.setAttribute('hrefLang','es-MX');
    esAlt.setAttribute('href', `https://searchwebservices.tech${meta.alternates.es}`);
    document.head.appendChild(esAlt);

    const xdAlt = document.createElement('link');
    xdAlt.setAttribute('rel','alternate');
    xdAlt.setAttribute('hrefLang','x-default');
    xdAlt.setAttribute('href', `https://searchwebservices.tech/`);
    document.head.appendChild(xdAlt);

    // LCP image preload if configured
    if (meta.lcp) {
      const l = document.createElement('link');
      l.setAttribute('rel', 'preload');
      l.setAttribute('as', 'image');
      l.setAttribute('href', meta.lcp);
      l.setAttribute('fetchpriority', 'high');
      document.head.appendChild(l);
    }
  }

  // Duplicate site-wide JSON-LD from base template (Organization, LocalBusiness, WebSite)
  cloneSiteWideJsonLdFromTemplate(document, template);

  // Inject service and breadcrumb JSON-LD for service pages
  const service = makeServiceJsonLd(route);
  if (service) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(service);
    document.head.appendChild(s);
  }
  const crumbs = makeBreadcrumbJsonLd(route);
  if (crumbs) {
    const b = document.createElement('script');
    b.type = 'application/ld+json';
    b.textContent = JSON.stringify(crumbs);
    document.head.appendChild(b);
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