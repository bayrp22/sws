import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initWebVitals, preloadCriticalResources, optimizeImages } from './utils/webVitals.ts'
import { initGA } from './analytics/ga'

// Initialize Web Vitals tracking
initWebVitals();

// Initialize GA4
initGA();

// Preload critical resources
preloadCriticalResources();

// Optimize images and attach delegated GA click tracking after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  optimizeImages();
  document.body.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null;
    if (!link) return;
    const href = (link as HTMLAnchorElement).getAttribute('href') || '';
    if (href.startsWith('tel:')) {
      (window as any).gtag?.('event', 'click_tel', { link_url: href });
    } else if (href.startsWith('mailto:')) {
      (window as any).gtag?.('event', 'click_mailto', { link_url: href });
    } else if (link.getAttribute('data-cta') === 'quote') {
      (window as any).gtag?.('event', 'click_quote');
    }
  });
});

createRoot(document.getElementById("root")!).render(<App />);
