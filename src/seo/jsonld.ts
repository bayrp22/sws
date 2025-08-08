import { canonicalRoot, contact, social } from './config';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: contact.name,
    url: canonicalRoot,
    email: contact.email,
    telephone: contact.phoneE164,
    logo: `${canonicalRoot}/img/company-logo.svg`,
    sameAs: [social.instagram, social.facebook].filter(Boolean),
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: contact.name,
    image: `${canonicalRoot}/img/company-logo.svg`,
    email: contact.email,
    telephone: contact.phoneE164,
    url: canonicalRoot,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.streetAddress,
      addressLocality: contact.address.addressLocality,
      addressRegion: contact.address.addressRegion,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.addressCountry,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    }],
    areaServed: [
      'Cabo San Lucas',
      'San José del Cabo',
      'Todos Santos',
      'La Paz',
      'Baja California Sur',
      'Mexico'
    ]
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: canonicalRoot,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${canonicalRoot}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    }))
  };
}

export function serviceJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'LocalBusiness', name: contact.name },
    areaServed: [
      'Los Cabos',
      'Baja California Sur',
      'Mexico'
    ],
    url,
  };
} 