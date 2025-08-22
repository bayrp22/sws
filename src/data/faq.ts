export interface FAQItem {
  id: number;
  question: string;
  slug: string;
  answer: string;
  metaDescription: string;
  ctaText: string;
  ctaUrl: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How much does a custom website cost with SWS?",
    slug: "how-much-does-a-website-cost",
    answer: `We publish flat pricing so you know the investment up front.

|  Package     |  Price (MXN)        |  Best for                                                     |
| ------------ | ------------------- | ------------------------------------------------------------- |
| **Starter**  |  $25,000           | Local businesses that need a polished 4‑6‑page brochure site. |
| **Business** |  $40,000           | E‑commerce, booking engines or multi‑language content.        |
| **Premium**  | Custom quote (bulk) | Groups of 5+ sites or app‑level functionality.                |

All tiers include mobile‑first design, basic SEO, CI/CD, and one month of hosting.`,
    metaDescription: "We publish flat pricing so you know the investment up front.",
    ctaText: "Get my custom quote",
    ctaUrl: "/contact?source=faq-pricing"
  },
  {
    id: 2,
    question: "What do I need to provide before we start?",
    slug: "what-client-provides",
    answer: `**Assets & Branding**

1. Brand portfolio (logo, color palette, typography).
2. High‑res imagery (hero shots + 20 highlight photos).
3. Content assets (service descriptions, pricing, FAQs).

**Technical & Legal**

1. Integration Credentials (e.g. API keys).
2. Domain/DNS access (A record, SSL requirements).
3. Legal & Terms links (terms & conditions, cookies, privacy policy).

Gather these within **5 days** to keep your 15‑day timeline on track.`,
    metaDescription: "Assets & Branding: Brand portfolio, high‑res imagery, content assets. Technical & Legal: Integration credentials, domain access, legal links.",
    ctaText: "Schedule a discovery call",
    ctaUrl: "/contact?source=faq-assets"
  },
  {
    id: 3,
    question: "What does SWS handle for me?",
    slug: "what-sws-handles",
    answer: `We handle everything from design to deployment:

• Build custom UI/UX mock‑ups (2 major revision rounds).
• Write or polish on‑page copy for conversions & SEO.
• Develop clean source code, semantic HTML 5/CSS 3/React.
• Secure environment variables & harden against OWASP risks.
• Provision CI/CD, HTTPS, CDN and launch.
• Integrate forms, analytics and initial on‑page SEO.

We never outsource; the same Cabo‑based crew designs, codes and ships your site.`,
    metaDescription: "We handle everything from design to deployment: UI/UX mock‑ups, copy writing, clean code development, security, CI/CD, and integrations.",
    ctaText: "Start the project",
    ctaUrl: "/contact?source=faq-we-handle"
  },
  {
    id: 4,
    question: "What's the full 15‑day build timeline?",
    slug: "website-build-timeline",
    answer: `|  Phase                |  Days   |  Deliverable                             |
| --------------------- | ------- | ---------------------------------------- |
| **Receive Assets**    |  1–5    | We ingest your brand and content.        |
| **Build Concept**     |  6–10   | First live version on a staging URL.     |
| **Polish Details**    |  11–12  | Pixel‑perfect tweaks & micro‑animations. |
| **Test Integrations** |  13–14  | Forms, APIs, SEO checks, security audit. |
| **Deploy & Go Live**  |  15     | DNS switch + launch party 🎉             |

Complex projects may extend, but 2 weeks is standard.`,
    metaDescription: "15-day build timeline: Receive assets (1-5 days), build concept (6-10), polish details (11-12), test integrations (13-14), deploy (15).",
    ctaText: "Lock in your slot",
    ctaUrl: "/contact?source=faq-timeline"
  },
  {
    id: 5,
    question: "How many revisions are included?",
    slug: "website-revision-policy",
    answer: `Two **major** revision rounds during design are included. Unlimited **minor** tweaks (text swaps, colour nudges) are free so long as they're non‑frivolous. Additional major rounds may be quoted up to **100%** of the original fee.`,
    metaDescription: "Two major revision rounds during design are included. Unlimited minor tweaks are free. Additional major rounds may be quoted up to 100% of original fee.",
    ctaText: "Chat with our designer",
    ctaUrl: "/contact?source=faq-revisions"
  },
  {
    id: 6,
    question: "What technology stack do you use?",
    slug: "tech-stack",
    answer: `We use a modern React/TypeScript stack with static‑site generation and CI/CD on a global CDN. Exact libraries are disclosed only when needed (e.g., for a security review) to protect our competitive edge. Rest assured your code is clean, portable and lives in a private Git repo with local and cloud backups.`,
    metaDescription: "We use a modern React/TypeScript stack with static‑site generation and CI/CD on a global CDN with clean, portable code in private Git repos.",
    ctaText: "Request a tech review",
    ctaUrl: "/contact?source=faq-stack"
  },
  {
    id: 7,
    question: "How do you keep my site secure?",
    slug: "website-security",
    answer: `• OWASP‑aligned filtering and input sanitisation.
• Environment variables shielded via Netlify secrets.
• 24/7 automated attack monitoring + monthly patch roll‑outs.
• Free SSL certificate auto‑renewal; HSTS & CSP headers enforced.

No sensitive user data is stored beyond necessity.`,
    metaDescription: "OWASP‑aligned filtering, shielded environment variables, 24/7 monitoring, SSL auto‑renewal, and minimal sensitive data storage.",
    ctaText: "Ask our dev team",
    ctaUrl: "/contact?source=faq-security"
  },
  {
    id: 8,
    question: "Do you offer ongoing maintenance?",
    slug: "website-maintenance",
    answer: `Yes—our **SWS Service Plan** (MXN $2,200/mo) covers:

| Pillar                  | What's covered                       | SLA               |
| ----------------------- | ------------------------------------ | ----------------- |
| Security Management     | HTTPS renewals, 24/7 monitoring      | Continuous        |
| Routine Content Updates | One bulk text/media swap             | Monthly           |
| Continuous Improvement  | Performance & SEO upgrades           | At our discretion |
| Emergency Response      | Diagnosis < 48 h, fix < 72 h         | As needed         |
| Reporting               | Summary of actions & recommendations | Monthly           |

Major redesigns or new features are quoted separately.`,
    metaDescription: "Yes—our SWS Service Plan (MXN $2,200/mo) covers security management, content updates, continuous improvement, emergency response, and reporting.",
    ctaText: "Add maintenance",
    ctaUrl: "/contact?source=faq-maintenance"
  },
  {
    id: 9,
    question: "What web services do you specialize in?",
    slug: "web-services-specialization",
    answer: `We specialize in the most in-demand web services for Los Cabos businesses:

**Core Web Services:**

• **[Web Design](/en/services/web-design-los-cabos)** - Professional, mobile-first website design that converts visitors into customers
• **[Website Design](/en/services/web-design-los-cabos)** - Custom visual design and user experience optimization
• **[Web Development](/en/services/web-development)** - Full-stack development with modern frameworks and clean code
• **[Website Development](/en/services/web-development)** - Custom functionality, integrations, and performance optimization
• **[Custom Websites](/en/services/custom-websites)** - Tailored solutions built specifically for your business needs
• **[Website SEO](/en/services/seo)** - Search engine optimization to help you rank higher in Google

Each service is designed to help Los Cabos businesses establish a strong online presence, attract more customers, and grow their revenue through effective web solutions.`,
    metaDescription: "We specialize in web design, website design, web development, website development, custom websites, and website SEO for Los Cabos businesses.",
    ctaText: "Get my web service quote",
    ctaUrl: "/contact?source=faq-services"
  }
];

export const faqPageData = {
  title: "Search Web Services – Master FAQ (2025)",
  description: "Answer real buyer questions and rank for long‑tail queries while funnelling visitors to our quote form. Find answers to common questions about our web design and development services.",
  subtitle: "Purpose: Answer real buyer questions and rank for long‑tail queries while funnelling visitors to our quote form. Each answer ends with a contextual CTA that links to that form. JSON‑LD FAQPage markup wraps the rendered list."
}; 