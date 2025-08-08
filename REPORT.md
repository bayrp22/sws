### SWS SEO Verification Report (Read-Only)

This report audits the current repo against the requested SWS SEO baseline. No code changes were applied in this phase.

### Snapshot
- **Stack**: Vite + React 18 + TypeScript
  - Evidence: `vite.config.ts`, root `index.html`, `src/main.tsx`, `scripts/prerender.ts`
- **Canonical root**: https://searchloscabos.com
- **Languages**: en, es
- **Router**: `src/Routes.tsx`
- **Content sources**: `src/content/en/services.ts`, `src/content/es/services.ts`

### Routes inventory (public, crawlable)
- EN
  - `/en`
  - `/en/services/web-design-los-cabos`
  - `/en/services/custom-websites`
  - `/en/services/seo`
  - `/en/contact`
  - `/en/pricing`
  - `/en/about`
- ES
  - `/es`
  - `/es/servicios/diseno-web-los-cabos`
  - `/es/servicios/sitios-web-a-medida`
  - `/es/servicios/seo`
  - `/es/contacto`
  - `/es/precios`
  - `/es/nosotros`
- Root: `/` (Netlify redirect 302 → `/en`)

### Verification results (PASS/FAIL)
- **Prerender/SSG**: PASS
  - `scripts/prerender.ts` exists and enumerates routes; Netlify build runs: `vite build && npm run prerender && npm run sitemap`.
- **Canonical**: PASS (static)
  - `prerender.ts` injects canonical per route into the prerendered HTML.
- **Hreflang**: FAIL (static)
  - `<Meta />` renders `en-US`, `es-MX`, and `x-default` on the client, but prerendered HTML currently does not include these tags.
- **JSON-LD: Organization**: PASS
  - Present in `index.html` (persists in prerender output).
- **JSON-LD: LocalBusiness (24/7)**: PASS
  - Present in `index.html` with `Mo-Su 00:00-23:59`.
- **JSON-LD: WebSite + SearchAction**: FAIL
  - Builder exists (`src/seo/jsonld.ts`), but not injected anywhere.
- **JSON-LD: BreadcrumbList**: PASS
  - Injected on content pages (`Contact`, `Pricing`, `About`, all service pages).
- **JSON-LD: Service (service pages)**: PASS
  - Injected on the 3 EN/ES service pages.
- **Sitemap**: PASS
  - `scripts/generate-sitemap.ts` outputs EN/ES alternates with `x-default`.
- **robots.txt**: PASS
  - Exposes `Sitemap: https://searchloscabos.com/sitemap.xml`.
- **Analytics (GA4)**: PASS
  - Single loader module `src/analytics/ga.ts` with `send_page_view:false`; `RouteTracker` fires page_view on SPA navigations.
  - No duplicate inline GA in `index.html`.
- **Forms + attribution (Netlify)**: PASS
  - `AdaptiveForm` has Netlify attributes + hidden `form-name` and all attribution fields (`utm_*`, `gclid`, `fbclid`, `referrer_path`).
  - Hidden build-time form exists in `index.html` for Netlify detection.
  - JS fills hidden fields from URL/referrer (`AdaptiveForm.tsx`).
- **Performance: Fonts**: FAIL
  - External Google Fonts links removed from `index.html`, but `src/utils/webVitals.ts` still preloads Google Fonts CSS. Self-hosted woff2 not yet implemented.
- **Performance: Images**: FAIL
  - No AVIF/WebP `<picture>` usage, no explicit width/height, no single LCP image preload with `fetchpriority="high"`.
- **Bundle split**: PASS
  - Manual chunks present in `vite.config.ts` (vendor/router/motion/form/icons).

### Evidence (key file refs)
- Router: `src/Routes.tsx`
- Meta/hreflang: `src/seo/Meta.tsx` (client-only currently)
- Prerender: `scripts/prerender.ts` (canonical only)
- Sitemap: `scripts/generate-sitemap.ts`
- Org/LocalBusiness JSON-LD: `index.html`
- Service/Breadcrumb JSON-LD: `src/pages/**` (service and other content pages)
- GA4: `src/analytics/ga.ts`, `src/analytics/RouteTracker.tsx`, wired in `src/App.tsx` and `src/main.tsx`
- Forms: `src/components/AdaptiveForm.tsx`, hidden form in `index.html`
- Fonts preload (to remove/replace): `src/utils/webVitals.ts`

### Top 10 fixes (highest impact first)
1) Inject static `<title>`, `<meta name="description">`, and hreflang into prerendered HTML per route (improves non-JS crawler coverage and SERP titles/descriptions).
2) Self-host Montserrat woff2 subsets and preload locally; remove any remote Google Fonts preload in runtime (`webVitals.ts`).
3) Add WebSite + SearchAction JSON-LD (site-wide) to the prerendered HTML (e.g., at `/en` and `/es`).
4) Add `<xhtml:link>` hreflang alternates in head during prerender for all EN/ES pairs + `x-default`.
5) Optimize LCP image: explicit width/height, proper format (AVIF/WebP with fallback), and single preload (`fetchpriority="high"`).
6) Add `<picture>` AVIF/WebP for hero and key images; set `decoding="async"` and lazy-load non-LCP images.
7) Remove Google Fonts CSS preload from `webVitals.ts` and replace with local font preload + `font-display: swap`.
8) Generate static OG images per route and reference them in `<Meta />` so prerendered pages contain share-ready OG.
9) Ensure breadcrumb JSON-LD also on `/en` and `/es` (optional improvement).
10) Add delegated click tracking for main CTAs (`Get My Free Quote`, `tel:`, `mailto:`) to send GA4 events (already partly planned).

### Fix Plan (do not apply yet)
Proposed minimal diffs to implement the above. Reply "APPLY FIXES" to proceed with these edits only.

1) Prerender: inject route-level title/description + hreflang
- File: `scripts/prerender.ts`
```diff
@@
- function renderShellForRoute(route: string, template: string) {
+ // Route meta map (can later be imported from content/config)
+ const ROUTE_META: Record<string, { title: string; description: string; alternates: { en: string; es: string } }> = {
+   '/en': { title: 'Home | Strategic Web Solutions (SWS)', description: 'SWS builds custom, high-quality websites fast for Los Cabos businesses.', alternates: { en: '/en', es: '/es' } },
+   '/es': { title: 'Inicio | Strategic Web Solutions (SWS)', description: 'SWS crea sitios rápidos y de alta calidad para negocios en Los Cabos.', alternates: { en: '/en', es: '/es' } },
+   '/en/services/web-design-los-cabos': { title: 'Professional Web Design in Los Cabos | SWS', description: 'High-performance, visually stunning websites for Los Cabos and BCS.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
+   '/es/servicios/diseno-web-los-cabos': { title: 'Diseño Web Profesional en Los Cabos | SWS', description: 'Sitios de alto rendimiento para Los Cabos y Baja California Sur.', alternates: { en: '/en/services/web-design-los-cabos', es: '/es/servicios/diseno-web-los-cabos' } },
+   '/en/services/custom-websites': { title: 'Custom Websites Tailored to Your Business | SWS', description: 'Fully customized, fast, secure, SEO-friendly websites.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
+   '/es/servicios/sitios-web-a-medida': { title: 'Sitios Web a Medida para tu Negocio | SWS', description: 'Páginas personalizadas, rápidas, seguras y con SEO.', alternates: { en: '/en/services/custom-websites', es: '/es/servicios/sitios-web-a-medida' } },
+   '/en/services/seo': { title: 'SEO Services That Put Your Business on the Map | SWS', description: 'SEO para negocios en Los Cabos. Más visibilidad y leads.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
+   '/es/servicios/seo': { title: 'Servicios SEO para Destacar tu Negocio | SWS', description: 'SEO para empresas en Los Cabos. Aumenta tu visibilidad.', alternates: { en: '/en/services/seo', es: '/es/servicios/seo' } },
+   '/en/contact': { title: 'Contact | SWS', description: 'Have a question or want a quote? We respond fast.', alternates: { en: '/en/contact', es: '/es/contacto' } },
+   '/es/contacto': { title: 'Contacto | SWS', description: '¿Dudas o cotización? Respondemos rápido.', alternates: { en: '/en/contact', es: '/es/contacto' } },
+   '/en/pricing': { title: 'Pricing | SWS', description: 'Transparent packages for Los Cabos businesses.', alternates: { en: '/en/pricing', es: '/es/precios' } },
+   '/es/precios': { title: 'Precios | SWS', description: 'Paquetes transparentes para negocios en Los Cabos.', alternates: { en: '/en/pricing', es: '/es/precios' } },
+   '/en/about': { title: 'About | SWS', description: 'Fast, SEO-first websites for Los Cabos and BCS.', alternates: { en: '/en/about', es: '/es/nosotros' } },
+   '/es/nosotros': { title: 'Nosotros | SWS', description: 'Sitios rápidos y optimizados para SEO en Los Cabos.', alternates: { en: '/en/about', es: '/es/nosotros' } },
+ };
+
+ function renderShellForRoute(route: string, template: string) {
   const dom = new JSDOM(template);
   const document = dom.window.document;
@@
   linkCanonical.setAttribute('href', canonicalHref);
+
+  // Title & description
+  const meta = ROUTE_META[route];
+  if (meta) {
+    let title = document.querySelector('title');
+    if (!title) { title = document.createElement('title'); document.head.appendChild(title); }
+    title.textContent = meta.title;
+
+    let desc = document.querySelector('meta[name="description"]');
+    if (!desc) { desc = document.createElement('meta'); desc.setAttribute('name','description'); document.head.appendChild(desc); }
+    desc.setAttribute('content', meta.description);
+
+    // Hreflang alternates
+    const head = document.head;
+    const altEn = document.createElement('link');
+    altEn.setAttribute('rel','alternate');
+    altEn.setAttribute('hrefLang','en-US');
+    altEn.setAttribute('href', `https://searchloscabos.com${meta.alternates.en}`);
+    head.appendChild(altEn);
+    const altEs = document.createElement('link');
+    altEs.setAttribute('rel','alternate');
+    altEs.setAttribute('hrefLang','es-MX');
+    altEs.setAttribute('href', `https://searchloscabos.com${meta.alternates.es}`);
+    head.appendChild(altEs);
+    const altXd = document.createElement('link');
+    altXd.setAttribute('rel','alternate');
+    altXd.setAttribute('hrefLang','x-default');
+    altXd.setAttribute('href', `https://searchloscabos.com/`);
+    head.appendChild(altXd);
+  }
@@
   return '<!DOCTYPE html>' + document.documentElement.outerHTML;
 }
```

2) WebSite + SearchAction JSON-LD
- File: `src/pages/en/Home.tsx` and `src/pages/es/Home.tsx`
```diff
@@
-import Meta from '@/seo/Meta';
+import Meta from '@/seo/Meta';
+import { websiteJsonLd } from '@/seo/jsonld';
@@
   return (
     <div className="h-full">
       <Meta path="/en" lang="en" title="Home" alternates={{ en: '/en', es: '/es' }} />
+      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
       <div className="container mx-auto px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
```
```diff
@@
-import Meta from '@/seo/Meta';
+import Meta from '@/seo/Meta';
+import { websiteJsonLd } from '@/seo/jsonld';
@@
   return (
     <div className="h-full">
       <Meta path="/es" lang="es" title="Inicio" alternates={{ en: '/en', es: '/es' }} />
+      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
       <div className="container mx-auto px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
```

3) Fonts: remove remote preload in `webVitals.ts`
- File: `src/utils/webVitals.ts`
```diff
@@
-export function preloadCriticalResources() {
-  // Preload critical fonts
-  const fontLink = document.createElement('link');
-  fontLink.rel = 'preload';
-  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
-  fontLink.as = 'style';
-  fontLink.crossOrigin = 'anonymous';
-  document.head.appendChild(fontLink);
-
-  // Preload critical images
+export function preloadCriticalResources() {
+  // Preload critical images (LCP set below once identified)
   const logoImg = new Image();
   logoImg.src = '/img/company-logo.svg';
@@
-  prefetchLinks.forEach(href => {
+  prefetchLinks.forEach(href => {
     const link = document.createElement('link');
     link.rel = 'prefetch';
     link.href = href;
     document.head.appendChild(link);
   });
 }
```

4) Fonts: self-host Montserrat (woff2) and preload
- Files: add `public/fonts/Montserrat-400.woff2`, `public/fonts/Montserrat-700.woff2` (assets), update `src/index.css` and `index.html` preload
```diff
*** index.html ***
@@
-    <!-- Self-hosted font TODO: replace external Google Fonts with local woff2 and preload -->
+    <link rel="preload" href="/fonts/Montserrat-400.woff2" as="font" type="font/woff2" crossorigin>
+    <link rel="preload" href="/fonts/Montserrat-700.woff2" as="font" type="font/woff2" crossorigin>
```
```diff
*** src/index.css ***
@@
+@font-face {
+  font-family: 'Montserrat';
+  src: url('/fonts/Montserrat-400.woff2') format('woff2');
+  font-weight: 400;
+  font-style: normal;
+  font-display: swap;
+}
+@font-face {
+  font-family: 'Montserrat';
+  src: url('/fonts/Montserrat-700.woff2') format('woff2');
+  font-weight: 700;
+  font-style: normal;
+  font-display: swap;
+}
+html, body { font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif; }
```

5) LCP image preload and dimensions (example for hero logo/image)
- File: `index.html` head (choose true LCP asset used above the fold)
```diff
@@
-    <meta name="ICBM" content="23.0545, -109.7915" />
+    <meta name="ICBM" content="23.0545, -109.7915" />
+    <link rel="preload" as="image" href="/img/company-logo.svg" fetchpriority="high" imagesrcset="/img/company-logo.svg 1x" />
```
- File: wherever hero image renders (e.g., `src/components/HeroSection.tsx`)
```diff
@@
-  <img src="/img/company-logo.svg" alt="SWS Strategic Web Solutions Logo" />
+  <img src="/img/company-logo.svg" alt="SWS Strategic Web Solutions Logo" width="256" height="256" decoding="async" />
```

6) AVIF/WebP `<picture>` usage for hero image
- File: `src/components/HeroSection.tsx`
```diff
@@
-  <img src="/img/company-logo.svg" alt="SWS Strategic Web Solutions Logo" width="256" height="256" decoding="async" />
+  <picture>
+    <source srcSet="/images/hero.avif" type="image/avif" />
+    <source srcSet="/images/hero.webp" type="image/webp" />
+    <img src="/img/company-logo.svg" alt="SWS Strategic Web Solutions Logo" width="256" height="256" decoding="async" />
+  </picture>
```

7) OG image generator and Meta usage
- Files: add `scripts/build-og.ts` (generate `dist/og/*.png`) and update `package.json` to run post-build; wire `ogImage` via `<Meta ogImage=... />` per route.
```diff
*** package.json ***
@@
-    "sitemap": "tsx scripts/generate-sitemap.ts",
+    "sitemap": "tsx scripts/generate-sitemap.ts",
+    "og": "tsx scripts/build-og.ts",
@@
-  "command": "vite build && npm run prerender && npm run sitemap"
+  "command": "vite build && npm run og && npm run prerender && npm run sitemap"
```
- Example usage (service pages):
```diff
*** src/pages/en/services/WebDesignLosCabos.tsx ***
@@
-  <Meta path={path} lang="en" title={webDesign.title} description={webDesign.metaDescription} alternates={{ en: path, es: '/es/servicios/diseno-web-los-cabos' }} />
+  <Meta path={path} lang="en" title={webDesign.title} description={webDesign.metaDescription} alternates={{ en: path, es: '/es/servicios/diseno-web-los-cabos' }} ogImage={`/og${path}.png`} />
```

8) BreadcrumbList on `/en` and `/es` (optional)
- Files: `src/pages/en/Home.tsx`, `src/pages/es/Home.tsx`
```diff
@@
-import LanguageSwitcher from '@/components/LanguageSwitcher';
+import LanguageSwitcher from '@/components/LanguageSwitcher';
+import { breadcrumbJsonLd } from '@/seo/jsonld';
@@
-      <div className="container mx-auto px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
+      <div className="container mx-auto px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
+      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
+        { name: 'Home', url: 'https://searchloscabos.com/en' }
+      ])) }} />
```
(and analogous for ES)

9) CTA click tracking (delegated)
- File: `src/main.tsx`
```diff
@@
 document.addEventListener('DOMContentLoaded', () => {
   optimizeImages();
+  // Delegated GA tracking for CTA/tel/mailto
+  document.body.addEventListener('click', (e) => {
+    const target = e.target as HTMLElement;
+    const link = target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null;
+    if (!link) return;
+    const href = (link as HTMLAnchorElement).href || '';
+    if (href.startsWith('tel:')) {
+      window.gtag?.('event', 'click_tel', { link_url: href });
+    } else if (href.startsWith('mailto:')) {
+      window.gtag?.('event', 'click_mailto', { link_url: href });
+    } else if (link.getAttribute('data-cta') === 'quote') {
+      window.gtag?.('event', 'click_quote');
+    }
+  });
 });
```

10) Hreflang in sitemap: already present (no change). Validate after deploy.

---
End of read-only audit. Reply "APPLY FIXES" to implement the Fix Plan above. 