import { analytics } from '@/seo/config';

declare global {
  interface Window { dataLayer: any[]; gtag?: (...args: any[]) => void; }
}

export function initGA() {
  if (!analytics.ga4MeasurementId) return;
  if (window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.ga4MeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) { window.dataLayer.push(args); }
  window.gtag = gtag as any;
  gtag('js', new Date());
  gtag('config', analytics.ga4MeasurementId, { send_page_view: false });
}

export function track(eventName: string, params?: Record<string, any>) {
  if (!window.gtag || !analytics.ga4MeasurementId) return;
  window.gtag('event', eventName, params || {});
}

export function trackPageView(path: string) {
  if (!window.gtag || !analytics.ga4MeasurementId) return;
  window.gtag('event', 'page_view', { page_path: path });
} 