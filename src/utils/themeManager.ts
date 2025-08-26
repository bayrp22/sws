export type Theme = 'light' | 'dark';

interface FaviconConfig {
  ico: string;
  png16: string;
  png32: string;
  png48: string;
  appleTouchIcon: string;
}

const faviconConfigs: Record<Theme, FaviconConfig> = {
  light: {
    ico: '/favicon-light.ico',
    png16: '/favicon-16x16-light.png',
    png32: '/favicon-32x32-light.png',
    png48: '/favicon-48x48-light.png',
    appleTouchIcon: '/apple-touch-icon-light.png',
  },
  dark: {
    ico: '/favicon.ico',
    png16: '/favicon-16x16.png',
    png32: '/favicon-32x32.png',
    png48: '/favicon-48x48.png',
    appleTouchIcon: '/apple-touch-icon.png',
  },
};

class ThemeManager {
  private currentTheme: Theme;
  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.currentTheme = this.mediaQuery.matches ? 'dark' : 'light';
    
    // Listen for theme changes
    this.mediaQuery.addEventListener('change', this.handleThemeChange.bind(this));
    
    // Initialize theme
    this.applyTheme(this.currentTheme);
  }

  private handleThemeChange = (e: MediaQueryListEvent) => {
    const newTheme: Theme = e.matches ? 'dark' : 'light';
    this.setTheme(newTheme);
  };

  private updateFavicon(theme: Theme) {
    const config = faviconConfigs[theme];
    
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());
    
    // Add new favicon links
    const head = document.head;
    
    // ICO favicon (fallback)
    const icoLink = document.createElement('link');
    icoLink.rel = 'icon';
    icoLink.type = 'image/x-icon';
    icoLink.href = config.ico;
    head.appendChild(icoLink);
    
    // PNG favicons
    const png32Link = document.createElement('link');
    png32Link.rel = 'icon';
    png32Link.type = 'image/png';
    png32Link.sizes = '32x32';
    png32Link.href = config.png32;
    head.appendChild(png32Link);
    
    const png16Link = document.createElement('link');
    png16Link.rel = 'icon';
    png16Link.type = 'image/png';
    png16Link.sizes = '16x16';
    png16Link.href = config.png16;
    head.appendChild(png16Link);
    
    const png48Link = document.createElement('link');
    png48Link.rel = 'icon';
    png48Link.type = 'image/png';
    png48Link.sizes = '48x48';
    png48Link.href = config.png48;
    head.appendChild(png48Link);
    
    // Apple touch icon
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.sizes = '180x180';
    appleLink.href = config.appleTouchIcon;
    head.appendChild(appleLink);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateFavicon(theme);
  }

  public setTheme(theme: Theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
  }

  public getTheme(): Theme {
    return this.currentTheme;
  }

  public toggleTheme() {
    const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Export singleton instance
export const themeManager = new ThemeManager(); 