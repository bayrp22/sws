// Web Vitals tracking for performance monitoring
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  id: string;
  delta: number;
}

function sendToAnalytics(metric: MetricData) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // In production, you could send to Google Analytics, Netlify Analytics, etc.
  // Example for Google Analytics 4:
  // gtag('event', metric.name, {
  //   custom_parameter_1: metric.value,
  //   custom_parameter_2: metric.id,
  // });

  // Example for custom analytics endpoint:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' }
  // });
}

export function initWebVitals() {
  // Only track in production or when explicitly enabled
  const isProd = import.meta.env.PROD;
  const trackOverride = (import.meta as any).env?.VITE_TRACK_WEB_VITALS === 'true';
  if (isProd || trackOverride) {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }
}

// SEO and performance helper functions
export function preloadCriticalResources() {
  // Preload critical images (set true LCP in index.html via <link rel="preload" as="image" ...>)
  const logoImg = new Image();
  logoImg.src = '/img/company-logo.svg';

  // Prefetch likely next pages
  const prefetchLinks = [
    '/#solutions',
    '/#pricing',
    '/#contact'
  ];

  prefetchLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
}

export function optimizeImages() {
  // Add loading="lazy" to images that are not above the fold
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (index > 2) { // First 3 images are likely above the fold
      img.loading = 'lazy';
    }
    
    // Add proper alt text if missing
    if (!img.alt) {
      img.alt = img.src.includes('logo') ? 'SWS Strategic Web Solutions Logo' : 'Image';
    }
  });
} 