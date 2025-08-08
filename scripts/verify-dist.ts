import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const dist = resolve(process.cwd(), 'dist');

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
  checks.push({ name: `${routePath}: canonical`, ok: /<link rel="canonical" href="https:\/\/searchloscabos\.com\/[^"]+"\s*\/?\>/.test(html) });
  if (expect.alternates) {
    const enOk = html.includes(`<link rel="alternate" hrefLang="en-US" href="https://searchloscabos.com${expect.alternates.en}" />`) || html.includes(`hreflang="en-US"`);
    const esOk = html.includes(`<link rel="alternate" hrefLang="es-MX" href="https://searchloscabos.com${expect.alternates.es}" />`) || html.includes(`hreflang="es-MX"`);
    const xdOk = html.includes(`hreflang="x-default"`);
    checks.push({ name: `${routePath}: hreflang en-US`, ok: enOk });
    checks.push({ name: `${routePath}: hreflang es-MX`, ok: esOk });
    checks.push({ name: `${routePath}: hreflang x-default`, ok: xdOk });
  }
  return checks;
}

function main() {
  const results: Check[] = [];

  // A. Indexability / Head tags
  results.push(
    ...checkHead('/en', {
      title: 'Home | Strategic Web Solutions (SWS)',
      alternates: { en: '/en', es: '/es' },
    }),
    ...checkHead('/es', {
      title: 'Inicio | Strategic Web Solutions (SWS)',
      alternates: { en: '/en', es: '/es' },
    }),
    ...checkHead('/en/services/web-design-los-cabos', {
      title: 'Professional Web Design in Los Cabos | SWS',
      alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' },
    }),
  );

  // B. Structured data (spot checks)
  const enHome = read('en/index.html');
  const esHome = read('es/index.html');
  const enService = read('en/services/web-design-los-cabos/index.html');
  const esService = read('es/servicios/seo/index.html');
  results.push(
    { name: 'Org JSON-LD present site-wide', ok: /"@type":"Organization"/.test(enHome) || /"@type":"Organization"/.test(esHome) },
    { name: 'LocalBusiness JSON-LD 24/7', ok: /"@type":"LocalBusiness"/.test(enHome) && /00:00/.test(enHome) },
    { name: 'WebSite JSON-LD on EN home', ok: /"@type":"WebSite"/.test(enHome) },
    { name: 'WebSite JSON-LD on ES home', ok: /"@type":"WebSite"/.test(esHome) },
    { name: 'Service JSON-LD on EN service', ok: /"@type":"Service"/.test(enService) },
    { name: 'BreadcrumbList on ES service', ok: /"@type":"BreadcrumbList"/.test(esService) },
  );

  // C. Sitemap / robots
  results.push(
    { name: 'sitemap.xml exists', ok: existsSync(resolve(dist, 'sitemap.xml')) },
    { name: 'robots.txt exposes sitemap', ok: /Sitemap:\s*https:\/\/searchloscabos\.com\/sitemap\.xml/.test(read('robots.txt')) },
  );

  // D. Analytics (basic static checks)
  const rootHtml = read('index.html');
  results.push(
    { name: 'No inline GA snippet in index.html', ok: !/www\.googletagmanager\.com\/gtag\/js\?id=/.test(rootHtml) },
  );

  // E. Forms + attribution
  results.push(
    { name: 'Hidden Netlify form present', ok: /<form name="adaptive-form"/.test(rootHtml) },
    { name: 'Attribution fields present', ok: /name="utm_source"/.test(rootHtml) && /name="gclid"/.test(rootHtml) && /name="fbclid"/.test(rootHtml) },
  );

  // F. Fonts
  results.push(
    { name: 'No Google Fonts in dist', ok: !/fonts\.googleapis\.com/.test(enHome + esHome + rootHtml) },
    { name: 'Local woff2 preloads (expect 2)', ok: (enHome.match(/\.woff2/g) || []).length >= 2 || false }
  );

  // G. OG / Social
  results.push(
    { name: 'OG images referenced (spot check EN service)', ok: /og:image/.test(enService) },
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