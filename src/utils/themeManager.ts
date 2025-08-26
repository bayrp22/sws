export type Theme = 'light' | 'dark';

interface FaviconConfig {
  svg: string;
  png: string;
  ico: string;
  appleTouchIcon: string;
}

const faviconConfigs: Record<Theme, FaviconConfig> = {
  light: {
    svg: '/favicon.svg', // SVG adapts automatically via CSS media queries
    png: '/favicon-light.png?v=2',
    ico: '/favicon-light.ico?v=2',
    appleTouchIcon: '/apple-touch-icon-light.png?v=2',
  },
  dark: {
    svg: '/favicon.svg', // SVG adapts automatically via CSS media queries
    png: '/favicon.png?v=2',
    ico: '/favicon.ico?v=2',
    appleTouchIcon: '/apple-touch-icon.png?v=2',
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
    
    // Remove existing favicon links (except SVG which stays the same)
    const existingLinks = document.querySelectorAll('link[rel="alternate icon"], link[rel="apple-touch-icon"], link[rel="icon"][type="image/x-icon"]');
    existingLinks.forEach(link => link.remove());
    
    // Add new favicon links following Google's requirements
    const head = document.head;
    
    // PNG fallback (Google's requirement)
    const pngLink = document.createElement('link');
    pngLink.rel = 'alternate icon';
    pngLink.type = 'image/png';
    pngLink.href = config.png;
    head.appendChild(pngLink);
    
    // Apple touch icon
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.setAttribute('sizes', '180x180');
    appleLink.href = config.appleTouchIcon;
    head.appendChild(appleLink);
    
    // Legacy ICO fallback
    const icoLink = document.createElement('link');
    icoLink.rel = 'icon';
    icoLink.type = 'image/x-icon';
    icoLink.href = config.ico;
    head.appendChild(icoLink);
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