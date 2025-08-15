import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProblemSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    EN: {
      headline: "Without a Website = Less Credibility, Fewer Conversions",
      withSite: "✅ With a Professional Site",
      withoutSite: "❌ Without a Website",
      withFeatures: [
        "Customers find you 24/7 through Google searches and social media",
        "Build trust instantly with professional design and customer testimonials",
        "Convert visitors into customers with clear calls-to-action and contact forms"
      ],
      withoutFeatures: [
        "Potential customers can't find you when\nthey search online",
        "Competitors with websites capture your potential customers",
        "Miss out on sales that happen outside business hours"
      ]
    },
    ES: {
      headline: "Sin Página Web = Menos Confianza, Menos Conversiones",
      withSite: "✅ Con un Sitio Web Profesional",
      withoutSite: "❌ Sin un Sitio Web",
      withFeatures: [
        "Los clientes te encuentran 24/7 a través de búsquedas de Google y redes sociales",
        "Genera confianza con diseño profesional y testimonios de clientes",
        "Haz que quien te visite también te escriba — con botones claros y formularios que sí funcionan"
      ],
      withoutFeatures: [
        "Tus clientes potenciales no te encuentran cuando buscan",
        "Tus competidores con sitio web capturan tus clientes potenciales",
        "Pierdes ventas y exposición cuando tu negocio está cerrado"
      ]
    }
  };

  return (
    <section
      id="problem"
      className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 min-h-screen flex items-center justify-center py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-6xl w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16 lg:mb-20">
          {content[language].headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Column A: With a Site */}
          <div className="space-y-6 lg:space-y-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#A5FF00] mb-6 lg:mb-8 flex items-center">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-3 lg:mr-4" />
              {language === 'EN' ? 'With a Professional Site' : 'Con un Sitio Web Profesional'}
            </h3>
            <ul className="space-y-4 lg:space-y-6">
              {content[language].withFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 text-white">
                  <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#A5FF00] mt-1 flex-shrink-0" />
                  <span className="text-lg lg:text-xl">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column B: No Site */}
          <div className="space-y-6 lg:space-y-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-400 mb-6 lg:mb-8 flex items-center">
              <XCircle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-3 lg:mr-4" />
              {language === 'EN' ? 'Without a Website' : 'Sin un Sitio Web'}
            </h3>
            <ul className="space-y-4 lg:space-y-6">
              {content[language].withoutFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 text-white">
                  <X className="w-5 h-5 lg:w-6 lg:h-6 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-lg lg:text-xl whitespace-pre-line">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection; 