import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Try to import Framer Motion, but don't fail if it's not available
let motion: any;
try {
  motion = require('framer-motion');
} catch (error) {
  // Fallback for motion elements
  motion = {
    section: 'section',
    div: 'div',
    h2: 'h2',
    p: 'p',
  };
}

const PricingSection: React.FC = () => {
  const { language } = useLanguage();

  // Check if Framer Motion is available
  const isFramerAvailable = typeof motion !== 'object' || motion.section !== 'section';

  // Motion props for scroll reveal
  const sectionProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const headerProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const gridProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const buttonProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';
  const Header = isFramerAvailable ? motion.h2 : 'h2';
  const Grid = isFramerAvailable ? motion.div : 'div';
  const ButtonContainer = isFramerAvailable ? motion.div : 'div';

  const content = {
    EN: {
      headline: "Transparent Packages for Every Budget",
      buttonText: "Get Your Custom Quote ↓"
    },
    ES: {
      headline: "Paquetes Transparentes para Cada Presupuesto",
      buttonText: "Obtén Tu Cotización Personalizada ↓"
    }
  };

  const pricingTiers = [
    {
      name: { EN: "Starter", ES: "Estándar" },
      price: { EN: "$19K MXN", ES: "$19K MXN" },
      features: {
        EN: [
          "Professional Web Design",
          "Mobile-Responsive Layout",
          "Basic SEO Optimization",
          "Improved Online Visibility",
          "Contact Forms & Analytics",
          "Satisfaction Guaranteed"
        ],
        ES: [
          "Diseño web profesional",
          "Responsivo para móviles",
          "Optimización de SEO básica",
          "Mejor visibilidad digital",
          "Formularios de contacto y analíticas",
          "Satisfacción garantizada"
        ]
      }
    },
    {
      name: { EN: "Business", ES: "Empresarial" },
      price: { EN: "$30K MXN", ES: "$30K MXN" },
      features: {
        EN: [
          "Everything in Starter",
          "Advanced SEO & LLMO",
          "e-Commerce Functionality",
          "Custom Integrations",
          "Monthly Analytics Reports",
          "Tailored to Your Business Needs"
        ],
        ES: [
          "Incluye Todo lo del Paquete Estándar",
          "SEO Avanzado",
          "Funcionalidad de e-Commerce",
          "Integraciones Personalizadas",
          "Reportes mensuales de analiticas",
          "Enfocado en las Necesidades de tu Empresa"
        ]
      }
    },
    {
      name: { EN: "Premium", ES: "Premium" },
      price: { EN: "5 Sites or More", ES: "5 Sitios o Más" },
      features: {
        EN: [
          "Everything in Business",
          "Reduced Pricing per Site",
          "Interactive Web Applications",
          "Advanced Analytics & Tracking",
          "Custom Pricing & Timelines",
          "Greater Value"
        ],
        ES: [
          "Todo lo del Empresarial",
          "Precios reducidos por sitio",
          "Aplicaciones web interactivas",
          "Analíticas y seguimiento avanzado",
          "Precios y Cronogramas Personalizados",
          "Mayor Valor"
        ]
      }
    }
  ];

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section
      id="pricing"
      className="bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200 py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Header
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8"
            {...headerProps}
          >
            {content[language].headline}
          </Header>
        </div>

        <Grid
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-12 md:mb-16"
          {...gridProps}
        >
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl md:hover:transform md:hover:scale-105 transition-all duration-300 flex flex-col ${
                index === 1 ? 'relative overflow-hidden' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 via-pink-150 to-pink-300 p-[2px]">
                  <div className="bg-white rounded-2xl w-full h-full"></div>
                </div>
              )}
              <div className={`${index === 1 ? 'relative z-10' : ''} text-center mb-6`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {tier.name[language]}
                </h3>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {tier.price[language]}
                </div>
              </div>

              <div className={`${index === 1 ? 'relative z-10' : ''} flex-grow`}>
                <ul className="space-y-4">
                  {tier.features[language].map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Grid>

        <ButtonContainer
          className="text-center"
          {...buttonProps}
        >
          <button
            onClick={scrollToQuote}
            className="bg-[#A5FF00] text-black font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#94E600] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {content[language].buttonText}
          </button>
        </ButtonContainer>
      </div>
    </Section>
  );
};

export default PricingSection; 