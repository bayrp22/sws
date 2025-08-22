export interface FAQItem {
  id: number;
  question: string;
  slug: string;
  answer: string;
  metaDescription: string;
  ctaText: string;
  ctaUrl: string;
}

export const faqDataEs: FAQItem[] = [
  {
    id: 1,
    question: "¿Cuánto cuesta un sitio web personalizado con SWS?",
    slug: "cuanto-cuesta-un-sitio-web",
    answer: `Publicamos precios fijos para que conozcas la inversión por adelantado.

||  Paquete     |  Precio (MXN)        |  Ideal para                                                    |
|| ------------ | ------------------- | -------------------------------------------------------------- |
|| **Inicial**  |  $25,000           | Empresas locales que necesitan un sitio brochure de 4‑6 páginas. |
|| **Negocio**  |  $40,000           | E‑commerce, motores de reserva o contenido multiidioma.        |
|| **Premium**  | Cotización personalizada | Grupos de 5+ sitios o funcionalidad a nivel de aplicación.    |

Todos los niveles incluyen diseño mobile‑first, SEO básico, CI/CD y un mes de hosting.`,
    metaDescription: "Publicamos precios fijos para que conozcas la inversión por adelantado.",
    ctaText: "Obtener mi cotización",
    ctaUrl: "/es/contacto?source=faq-pricing"
  },
  {
    id: 2,
    question: "¿Qué necesito proporcionar antes de comenzar?",
    slug: "que-necesito-proporcionar",
    answer: `**Activos y Marca**

1. Portafolio de marca (logo, paleta de colores, tipografía).
2. Imágenes de alta resolución (fotos principales + 20 fotos destacadas).
3. Activos de contenido (descripciones de servicios, precios, FAQs).

**Técnico y Legal**

1. Credenciales de integración (ej. claves API).
2. Acceso a dominio/DNS (registro A, requisitos SSL).
3. Enlaces legales y términos (términos y condiciones, cookies, política de privacidad).

Reúne estos elementos en **5 días** para mantener tu cronograma de 15 días en curso.`,
    metaDescription: "Activos y Marca: Portafolio de marca, imágenes de alta resolución, activos de contenido. Técnico y Legal: Credenciales de integración, acceso a dominio, enlaces legales.",
    ctaText: "Agendar llamada inicial",
    ctaUrl: "/es/contacto?source=faq-assets"
  },
  {
    id: 3,
    question: "¿Qué maneja SWS por mí?",
    slug: "que-maneja-sws",
    answer: `Manejamos todo desde el diseño hasta el despliegue:

• Crear maquetas UI/UX personalizadas (2 rondas principales de revisión).
• Escribir o pulir el copy de la página para conversiones y SEO.
• Desarrollar código fuente limpio, HTML 5/CSS 3/React semántico.
• Asegurar variables de entorno y proteger contra riesgos OWASP.
• Provisionar CI/CD, HTTPS, CDN y lanzamiento.
• Integrar formularios, analytics y SEO inicial en la página.

Nunca subcontratamos; el mismo equipo con base en Cabo diseña, codifica y entrega tu sitio.`,
    metaDescription: "Manejamos todo desde el diseño hasta el despliegue: maquetas UI/UX, redacción de copy, desarrollo de código limpio, seguridad, CI/CD e integraciones.",
    ctaText: "Iniciar el proyecto",
    ctaUrl: "/es/contacto?source=faq-we-handle"
  },
  {
    id: 4,
    question: "¿Cuál es el cronograma completo de construcción de 15 días?",
    slug: "cronograma-construccion-15-dias",
    answer: `|  Fase                |  Días   |  Entregable                              |
|| --------------------- | ------- | ---------------------------------------- |
|| **Recibir Activos**   |  1–5    | Ingresamos tu marca y contenido.         |
|| **Construir Concepto** |  6–10   | Primera versión en vivo en URL de prueba. |
|| **Pulir Detalles**    |  11–12  | Ajustes perfectos y micro‑animaciones.   |
|| **Probar Integraciones** |  13–14  | Formularios, APIs, revisión SEO, auditoría de seguridad. |
|| **Desplegar y Lanzar** |  15     | Cambio de DNS + fiesta de lanzamiento 🎉 |

Los proyectos complejos pueden extenderse, pero 2 semanas es el estándar.`,
    metaDescription: "Cronograma de construcción de 15 días: Recibir activos (1-5 días), construir concepto (6-10), pulir detalles (11-12), probar integraciones (13-14), desplegar (15).",
    ctaText: "Reservar mi lugar",
    ctaUrl: "/es/contacto?source=faq-timeline"
  },
  {
    id: 5,
    question: "¿Cuántas revisiones están incluidas?",
    slug: "cuantas-revisiones-incluidas",
    answer: `Dos rondas de revisión **principales** durante el diseño están incluidas. Los ajustes **menores** ilimitados (cambios de texto, ajustes de color) son gratuitos siempre que no sean frívolos. Las rondas principales adicionales pueden cotizarse hasta el **100%** de la tarifa original.`,
    metaDescription: "Dos rondas de revisión principales durante el diseño están incluidas. Los ajustes menores ilimitados son gratuitos. Las rondas principales adicionales pueden cotizarse hasta el 100% de la tarifa original.",
    ctaText: "Hablar con nuestro diseñador",
    ctaUrl: "/es/contacto?source=faq-revisions"
  },
  {
    id: 6,
    question: "¿Qué stack de tecnología usan?",
    slug: "stack-tecnologia",
    answer: `Usamos un stack moderno React/TypeScript con generación de sitios estáticos y CI/CD en una CDN global. Las librerías exactas se divulgan solo cuando es necesario (ej., para una revisión de seguridad) para proteger nuestra ventaja competitiva. Ten la seguridad de que tu código es limpio, portable y vive en un repositorio Git privado con respaldos locales y en la nube.`,
    metaDescription: "Usamos un stack moderno React/TypeScript con generación de sitios estáticos y CI/CD en una CDN global con código limpio y portable en repositorios Git privados.",
    ctaText: "Solicitar revisión técnica",
    ctaUrl: "/es/contacto?source=faq-stack"
  },
  {
    id: 7,
    question: "¿Cómo mantienen mi sitio seguro?",
    slug: "como-mantienen-sitio-seguro",
    answer: `• Filtrado y sanitización de entradas alineados con OWASP.
• Variables de entorno protegidas a través de secretos de Netlify.
• Monitoreo automatizado de ataques 24/7 + despliegues de parches mensuales.
• Certificado SSL gratuito con renovación automática; headers HSTS y CSP aplicados.

No se almacenan datos sensibles del usuario más allá de lo necesario.`,
    metaDescription: "Filtrado alineado con OWASP, variables de entorno protegidas, monitoreo 24/7, renovación automática SSL y almacenamiento mínimo de datos sensibles.",
    ctaText: "Preguntar a nuestro equipo dev",
    ctaUrl: "/es/contacto?source=faq-security"
  },
  {
    id: 8,
    question: "¿Ofrecen mantenimiento continuo?",
    slug: "mantenimiento-continuo",
    answer: `Sí—nuestro **Plan de Servicio SWS** (MXN $2,200/mes) cubre:

|| Pilar                   | Qué se incluye                       | SLA               |
|| ----------------------- | ------------------------------------ | ----------------- |
|| Gestión de Seguridad    | Renovaciones HTTPS, monitoreo 24/7   | Continuo          |
|| Actualizaciones de Contenido | Un cambio masivo de texto/medios  | Mensual           |
|| Mejora Continua         | Actualizaciones de rendimiento y SEO | A nuestra discreción |
|| Respuesta de Emergencia | Diagnóstico < 48 h, solución < 72 h  | Según sea necesario |
|| Reportes                | Resumen de acciones y recomendaciones | Mensual           |

Los rediseños principales o nuevas funciones se cotizan por separado.`,
    metaDescription: "Sí—nuestro Plan de Servicio SWS (MXN $2,200/mes) cubre gestión de seguridad, actualizaciones de contenido, mejora continua, respuesta de emergencia y reportes.",
    ctaText: "Agregar mantenimiento",
    ctaUrl: "/es/contacto?source=faq-maintenance"
  },
  {
    id: 9,
    question: "¿En qué servicios web se especializan?",
    slug: "especializacion-servicios-web",
    answer: `Nos especializamos en los servicios web más demandados para empresas de Los Cabos:

**Servicios Web Principales:**

• **[Diseño Web](/es/servicios/diseno-web-los-cabos)** - Diseño web profesional y mobile-first que convierte visitantes en clientes
• **[Diseño de Sitios Web](/es/servicios/diseno-web-los-cabos)** - Diseño visual personalizado y optimización de experiencia de usuario
• **[Desarrollo Web](/es/servicios/desarrollo-web)** - Desarrollo full-stack con frameworks modernos y código limpio
• **[Desarrollo de Sitios Web](/es/servicios/desarrollo-web)** - Funcionalidad personalizada, integraciones y optimización de rendimiento
• **[Sitios Web a Medida](/es/servicios/sitios-web-a-medida)** - Soluciones personalizadas construidas específicamente para las necesidades de tu negocio
• **[SEO para Sitios Web](/es/servicios/seo)** - Optimización para motores de búsqueda para ayudarte a posicionarte mejor en Google

Cada servicio está diseñado para ayudar a las empresas de Los Cabos a establecer una presencia online sólida, atraer más clientes y hacer crecer sus ingresos a través de soluciones web efectivas.`,
    metaDescription: "Nos especializamos en diseño web, diseño de sitios web, desarrollo web, desarrollo de sitios web, sitios web a medida y SEO para empresas de Los Cabos.",
    ctaText: "Obtener mi cotización de servicios web",
    ctaUrl: "/es/contacto?source=faq-services"
  }
];

export const faqPageDataEs = {
  title: "Search Web Services – Preguntas Frecuentes (2025)",
  description: "Responde preguntas reales de compradores y posiciona para consultas de cola larga mientras canaliza visitantes a nuestro formulario de cotización. Encuentra respuestas a preguntas comunes sobre nuestros servicios de diseño y desarrollo web.",
  subtitle: "Propósito: Responder preguntas reales de compradores y posicionar para consultas de cola larga mientras canaliza visitantes a nuestro formulario de cotización. Cada respuesta termina con un CTA contextual que enlaza a ese formulario. El markup JSON‑LD FAQPage envuelve la lista renderizada."
}; 