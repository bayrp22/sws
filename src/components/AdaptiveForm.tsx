import React from 'react';
import { CheckCircle, Mail, User, Building, Globe, FileText } from 'lucide-react';
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
  };
}

interface AdaptiveFormProps {
  path: "site" | "nosite" | null;
  onStatusChange?: (status: "idle" | "loading" | "success" | "error") => void;
  onFormSubmit?: (data: { name: string; email: string }) => void;
}

const AdaptiveForm: React.FC<AdaptiveFormProps> = ({ path, onStatusChange, onFormSubmit }) => {
  const { language } = useLanguage();
  const formRef = React.useRef<HTMLFormElement>(null);

  // Populate UTM fields when component mounts
  React.useEffect(() => {
    if (formRef.current) {
      const params = new URLSearchParams(window.location.search);
      const setValue = (name: string, value: string | null) => {
        const input = formRef.current?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
        if (input) input.value = value || '';
      };

      setValue('utm_source', params.get('utm_source'));
      setValue('utm_medium', params.get('utm_medium'));
      setValue('utm_campaign', params.get('utm_campaign'));
      setValue('utm_term', params.get('utm_term'));
      setValue('utm_content', params.get('utm_content'));
      setValue('gclid', params.get('gclid'));
      setValue('fbclid', params.get('fbclid'));
      setValue('referrer_path', document.referrer || '');
    }
  }, []);

  // Check if Framer Motion is available
  const isFramerAvailable = typeof motion !== 'object' || motion.section !== 'section';

  // Motion props for scroll reveal
  const sectionProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';

  const content = {
    EN: {
      headlines: {
        site: "Tell Us About Your Current Website",
        nosite: "Let's Get Started With Your New Website"
      },
      fields: {
        name: { label: "Your Name", placeholder: "Enter your full name" },
        bizName: { label: "Business Name", placeholder: "Enter your business name" },
        email: { label: "Email Address", placeholder: "your@email.com" },
        url: { label: "Current Website URL", placeholder: "yourwebsite.com" },
        bizDesc: { label: "Business Description", placeholder: "Tell us what your business does and why you're looking to create a website." }
      },
      submitButton: "Get My Free Quote"
    },
    ES: {
      headlines: {
        site: "Cuéntanos Sobre Tu Sitio Web Actual",
        nosite: "Comencemos Con Tu Nuevo Sitio Web"
      },
      fields: {
        name: { label: "Tu Nombre", placeholder: "Nombre Completo" },
        bizName: { label: "Nombre del Negocio", placeholder: "Nombre de tu Negocio" },
        email: { label: "Correo Electrónico", placeholder: "tu@email.com" },
        url: { label: "URL del Sitio Web Actual", placeholder: "https://tusitio.com" },
        bizDesc: { label: "Descripción del Negocio", placeholder: "Cuéntenos a qué se dedica su negocio y por qué busca crear un sitio web" }
      },
      submitButton: "Obtener Mi Cotización Gratis"
    }
  };

  // Don't render anything if no path is selected
  if (!path) {
    return null;
  }

  return (
    <Section
      id="lead-form"
      className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content[language].headlines[path]}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <form
            ref={formRef}
            name="adaptive-form"
            method="POST"
            action={language === 'EN' ? '/form/formsuccess' : '/formulario/formsuccess'}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-6"
            onSubmit={(e) => {
              // Call parent callbacks
              onStatusChange?.("loading");
              onFormSubmit?.({ name: '', email: '' });
            }}
          >
            {/* Hidden form name for Netlify */}
            <input type="hidden" name="form-name" value="adaptive-form" />

            {/* Honeypot field */}
            <div style={{ display: 'none' }}>
              <label>Don't fill this out: <input name="bot-field" /></label>
            </div>

            {/* Additional hidden fields */}
            <input type="hidden" name="path" />
            <input type="hidden" name="language" />
            <input type="hidden" name="timestamp" />

            {/* Attribution fields */}
            <input type="hidden" name="utm_source" />
            <input type="hidden" name="utm_medium" />
            <input type="hidden" name="utm_campaign" />
            <input type="hidden" name="utm_term" />
            <input type="hidden" name="utm_content" />
            <input type="hidden" name="gclid" />
            <input type="hidden" name="fbclid" />
            <input type="hidden" name="referrer_path" />

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {content[language].fields.name.label}
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.name.placeholder}
              />
            </div>

            {/* Business Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                {content[language].fields.bizName.label}
              </label>
              <input
                type="text"
                name="bizName"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.bizName.placeholder}
              />
            </div>

            {/* Conditional Fields Based on Path */}
            {path === "site" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  {content[language].fields.url.label}
                </label>
                <input
                  type="text"
                  name="url"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                  placeholder={content[language].fields.url.placeholder}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  {content[language].fields.bizDesc.label}
                </label>
                <textarea
                  name="bizDesc"
                  rows={4}
                  required
                  minLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors resize-vertical"
                  placeholder={content[language].fields.bizDesc.placeholder}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {content[language].fields.email.label}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.email.placeholder}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#A5FF00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
            >
              {content[language].submitButton}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default AdaptiveForm;
