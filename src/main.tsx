import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initWebVitals, preloadCriticalResources, optimizeImages } from './utils/webVitals.ts'
import { initGTM } from './analytics/ga'

// Initialize Web Vitals tracking
initWebVitals();

// Initialize GTM
initGTM();

// Preload critical resources
preloadCriticalResources();

// Optimize images and attach delegated GTM click tracking after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  optimizeImages();
  document.body.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null;
    if (!link) return;
    const href = (link as HTMLAnchorElement).getAttribute('href') || '';
    if (href.startsWith('tel:')) {
      window.dataLayer?.push({ event: 'click_tel', link_url: href });
    } else if (href.startsWith('mailto:')) {
      window.dataLayer?.push({ event: 'click_mailto', link_url: href });
    } else if (link.getAttribute('data-cta') === 'quote') {
      window.dataLayer?.push({ event: 'click_quote' });
    }
  });
});

// Remove loading indicator and render React app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Remove loading indicator once React has rendered
setTimeout(() => {
  const loadingContainer = document.getElementById('loading-container');
  if (loadingContainer) {
    loadingContainer.style.opacity = '0';
    loadingContainer.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      loadingContainer.remove();
    }, 300);
  }
  document.body.classList.add('loaded');
}, 100);
