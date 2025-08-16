import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

const dist = resolve(process.cwd(), 'dist');
const pub = resolve(process.cwd(), 'public');

type Check = { name: string; ok: boolean; info?: string };

function read(path: string): string {
  const p = resolve(dist, path);
  return existsSync(p) ? readFileSync(p, 'utf-8') : '';
}

function has(str: string, substr: string) {
  return str.includes(substr);
}

function checkHead(routePath: string, expect: { title?: string; descr?: string; alternates?: { en: string; es: string } }): Check[] {
  const file = resolve(dist, routePath.replace(/^\//, ''), 'index.html');
  const okExists = existsSync(file);
  const html = okExists ? readFileSync(file, 'utf-8') : '';
  const checks: Check[] = [];
  checks.push({ name: `${routePath}: file exists`, ok: okExists, info: okExists ? '' : file });
  if (!okExists) return checks;
  if (expect.title) checks.push({ name: `${routePath}: <title> present`, ok: has(html, `<title>${expect.title}`) });
  if (expect.descr) checks.push({ name: `${routePath}: meta description present`, ok: has(html, `<meta name="description" content="${expect.descr}`) });
  checks.push({ name: `${routePath}: canonical`, ok: /<link rel="canonical" href="https:\/\/[^\/"]+\/[^"]+"\s*\/?\>/.test(html) });
  if (expect.alternates) {
    const enOk = html.includes(`hreflang="en-US"`);
    const esOk = html.includes(`hreflang="es-MX"`);
    const xdOk = html.includes(`hreflang="x-default"`);
    checks.push({ name: `${routePath}: hreflang en-US`, ok: enOk });
    checks.push({ name: `${routePath}: hreflang es-MX`, ok: esOk });
    checks.push({ name: `${routePath}: hreflang x-default`, ok: xdOk });
  }
  return checks;
}

function collectTypes(node: any, set: Set<string>) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach(n => collectTypes(n, set));
    return;
  }
  if (typeof node['@type'] === 'string') set.add(node['@type']);
  if (Array.isArray(node['@type'])) node['@type'].forEach((t: any) => typeof t === 'string' && set.add(t));
  for (const key of Object.keys(node)) collectTypes(node[key], set);
}

function headTypesFor(routePath: string): Set<string> {
  const file = resolve(dist, routePath.replace(/^\//, ''), 'index.html');
  const html = existsSync(file) ? readFileSync(file, 'utf-8') : '';
  const dom = new JSDOM(html);
  const head = dom.window.document.head;
  const scripts = Array.from(head.querySelectorAll('script[type="application/ld+json"]')) as HTMLScriptElement[];
  const types = new Set<string>();
  scripts.forEach(s => {
    try {
      const text = s.textContent || '';
      const json = JSON.parse(text);
      collectTypes(json, types);
    } catch {}
  });
  return types;
}

function main() {
  const results: Check[] = [];

  // A. Indexability / Head tags
  results.push(
    ...checkHead('/en', {
      title: 'Home | Search Web Services (SWS)',
      alternates: { en: '/en', es: '/es' },
    }),
    ...checkHead('/es', {
      title: 'Inicio | Search Web Services (SWS)',
      alternates: { en: '/en', es: '/es' },
    }),
    ...checkHead('/en/services/web-design-los-cabos', {
      title: 'Professional Web Design in Los Cabos | SWS',
      alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' },
    }),
  );

  // B. Structured data (DOM-parse)
  const enTypes = headTypesFor('/en');
  const esTypes = headTypesFor('/es');
  results.push(
    { name: 'Org JSON-LD present site-wide', ok: enTypes.has('Organization') || esTypes.has('Organization') },
    { name: 'LocalBusiness JSON-LD 24/7', ok: enTypes.has('LocalBusiness') || esTypes.has('LocalBusiness') },
    { name: 'WebSite JSON-LD on EN home', ok: enTypes.has('WebSite') },
    { name: 'WebSite JSON-LD on ES home', ok: esTypes.has('WebSite') },
  );
  const enServiceTypes = headTypesFor('/en/services/web-design-los-cabos');
  const esSeoTypes = headTypesFor('/es/servicios/seo');
  results.push(
    { name: 'Service JSON-LD on EN service', ok: enServiceTypes.has('Service') },
    { name: 'BreadcrumbList on ES service', ok: esSeoTypes.has('BreadcrumbList') },
  );

  // C. Sitemap / robots
  results.push(
    { name: 'sitemap.xml exists', ok: existsSync(resolve(dist, 'sitemap.xml')) },
    { name: 'robots.txt exposes sitemap', ok: existsSync(resolve(dist, 'robots.txt')) && /Sitemap:\s*https:\/\/searchwebservices\.tech\/sitemap\.xml/.test(readFileSync(resolve(dist, 'robots.txt'), 'utf-8')) },
  );

  // D. Analytics (basic static checks)
  const rootHtml = read('index.html');
  results.push(
    { name: 'GTM script present in index.html', ok: /GTM-5WS9DD9Q/.test(rootHtml) },
  );

  // E. Forms + attribution
  results.push(
    { name: 'Hidden Netlify form present', ok: /<form name="adaptive-form"/.test(rootHtml) },
    { name: 'Attribution fields present', ok: /name="utm_source"/.test(rootHtml) && /name="gclid"/.test(rootHtml) && /name="fbclid"/.test(rootHtml) },
  );

  // F. Fonts (conditional)
  const font400 = resolve(pub, 'fonts', 'Montserrat-400.woff2');
  const font700 = resolve(pub, 'fonts', 'Montserrat-700.woff2');
  const haveFonts = existsSync(font400) && existsSync(font700);
  const enHome = read('en/index.html');
  results.push(
    { name: 'No Google Fonts in dist', ok: !/fonts\.googleapis\.com/.test(enHome + rootHtml) },
    { name: 'Local woff2 preloads (expect 2 or deferred)', ok: haveFonts ? ((enHome.match(/\.woff2/g) || []).length >= 2) : true }
  );

  // G. OG / Social
  const enServiceHtml = read('en/services/web-design-los-cabos/index.html');
  results.push(
    { name: 'OG images referenced (spot check EN service)', ok: /og:image/.test(enServiceHtml) },
  );

  // Report
  const failed = results.filter(r => !r.ok);
  results.forEach(r => console.log(`${r.ok ? 'PASS' : 'FAIL'} - ${r.name}${r.info ? ' :: ' + r.info : ''}`));
  console.log('\nSummary:', `${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) {
    process.exitCode = 1;
  }
}

main(); 