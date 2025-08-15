import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Mail, User, Building, Globe, FileText, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Try to import Framer Motion, but don't fail if it's not available
let motion: any;
try {
  motion = require('framer-motion');
} catch (error) {
  // Fallback for motion elements
  motion = {
    section: 'section',
    form: 'form',
    div: 'div',
  };
}

interface AdaptiveFormProps {
  path: "site" | "nosite" | null;
  onStatusChange?: (status: "idle" | "loading" | "success" | "error") => void;
  onFormSubmit?: (data: { name: string; email: string }) => void;
}

interface FormData {
  name: string;
  bizName: string;
  email: string;
  url?: string;
  bizDesc?: string;
}

function fillAttributionFields(form: HTMLFormElement | null) {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const set = (name: string, value: string | null) => {
    const input = form.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
    if (input) input.value = value || '';
  };
  set('utm_source', params.get('utm_source'));
  set('utm_medium', params.get('utm_medium'));
  set('utm_campaign', params.get('utm_campaign'));
  set('utm_term', params.get('utm_term'));
  set('utm_content', params.get('utm_content'));
  set('gclid', params.get('gclid'));
  set('fbclid', params.get('fbclid'));
  set('referrer_path', document.referrer || '');
}

const AdaptiveForm: React.FC<AdaptiveFormProps> = ({ path, onStatusChange, onFormSubmit }) => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const formEl = document.querySelector('form[name="adaptive-form"]') as HTMLFormElement | null;
    fillAttributionFields(formEl);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

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
  const FormContainer = isFramerAvailable ? motion.form : 'form';

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
      submitButton: "Get My Free Quote",
      submitting: "Sending..."
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
      submitButton: "Obtener Mi Cotización Gratis",
      submitting: "Enviando..."
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    onStatusChange?.("loading");
    
    try {
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // In development, simulate form submission
        console.log('Development mode - simulating form submission:', {
          name: data.name,
          bizName: data.bizName,
          email: data.email,
          url: data.url,
          bizDesc: data.bizDesc,
          path,
          language,
          timestamp: new Date().toISOString()
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Pass the form data to parent component
        onFormSubmit?.({ name: data.name, email: data.email });
        
        setIsSuccess(true);
        onStatusChange?.("success");
        reset();
      } else {
        // In production, submit to Netlify
        const formData = new FormData();
        formData.append("form-name", "adaptive-form");
        formData.append("name", data.name);
        formData.append("bizName", data.bizName);
        formData.append("email", data.email);
        if (data.url) formData.append("url", data.url);
        if (data.bizDesc) formData.append("bizDesc", data.bizDesc);
        formData.append("path", path || "");
        formData.append("language", language);
        formData.append("timestamp", new Date().toISOString());

        // Attribution fields
        const formEl = document.querySelector('form[name="adaptive-form"]') as HTMLFormElement | null;
        const names = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','referrer_path'];
        names.forEach((n) => {
          const input = formEl?.querySelector(`input[name="${n}"]`) as HTMLInputElement | null;
          if (input && input.value) formData.append(n, input.value);
        });

        // Submit to Netlify
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData as any).toString()
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Pass the form data to parent component
        onFormSubmit?.({ name: data.name, email: data.email });
        
        setIsSuccess(true);
        onStatusChange?.("success");
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      onStatusChange?.("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything if no path is selected
  if (!path) {
    return null;
  }

  // Hide form after successful submission - Confirmation component will handle success state
  if (isSuccess) {
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
          <FormContainer 
            name="adaptive-form"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            {/* Hidden inputs for Netlify */}
            <input type="hidden" name="form-name" value="adaptive-form" />
            <div style={{ display: 'none' }}>
              <label>Don't fill this out: <input name="bot-field" /></label>
            </div>
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
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.name.placeholder}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Business Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                {content[language].fields.bizName.label}
              </label>
              <input
                {...register('bizName', { 
                  required: 'Business name is required',
                  minLength: { value: 2, message: 'Business name must be at least 2 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.bizName.placeholder}
              />
              {errors.bizName && (
                <p className="mt-1 text-sm text-red-600">{errors.bizName.message}</p>
              )}
            </div>

            {/* Conditional Fields Based on Path */}
            {path === "site" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  {content[language].fields.url.label}
                </label>
                <input
                  {...register('url', { 
                    required: 'Website URL is required'
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                  placeholder={content[language].fields.url.placeholder}
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  {content[language].fields.bizDesc.label}
                </label>
                <textarea
                  {...register('bizDesc', { 
                    required: 'Business description is required',
                    minLength: { value: 10, message: 'Please provide at least 10 characters' }
                  })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors resize-vertical"
                  placeholder={content[language].fields.bizDesc.placeholder}
                />
                {errors.bizDesc && (
                  <p className="mt-1 text-sm text-red-600">{errors.bizDesc.message}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {content[language].fields.email.label}
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                placeholder={content[language].fields.email.placeholder}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#A5FF00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {content[language].submitting}
                </>
              ) : (
                content[language].submitButton
              )}
            </button>
          </FormContainer>
        </div>
      </div>
    </Section>
  );
};

export default AdaptiveForm; 