import { analytics } from '@/seo/config';

declare global {
  interface Window { 
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function initGTM() {
  if (!analytics.gtmContainerId) return;
  
  // Initialize dataLayer if not already present
  window.dataLayer = window.dataLayer || [];
}

export function track(eventName: string, params?: Record<string, any>) {
  if (!window.dataLayer || !analytics.gtmContainerId) return;
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}

export function trackPageView(path: string) {
  if (!window.dataLayer || !analytics.gtmContainerId) return;
  window.dataLayer.push({
    event: 'page_view',
    page_path: path
  });
} 