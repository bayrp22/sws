import React, { useEffect, useState } from 'react';
import { CheckCircle, Send, Phone, Mail } from 'lucide-react';
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

interface ConfirmationProps {
  path: "site" | "nosite";
  initialFormData?: { name: string; email: string } | null;
}

const Confirmation: React.FC<ConfirmationProps> = ({ path, initialFormData }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: initialFormData?.name || '',
    email: initialFormData?.email || '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Auto-scroll to this component when it renders
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('confirmation')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Update form data when initialFormData changes
  useEffect(() => {
    if (initialFormData) {
      setFormData(prev => ({
        ...prev,
        name: initialFormData.name || prev.name,
        email: initialFormData.email || prev.email
      }));
    }
  }, [initialFormData]);

  // Check if Framer Motion is available
  const isFramerAvailable = typeof motion !== 'object' || motion.section !== 'section';

  // Motion props for entrance animation
  const sectionProps = isFramerAvailable ? {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // In development, simulate form submission
        console.log('Development mode - simulating confirmation form submission:', {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          originalPath: path,
          language,
          timestamp: new Date().toISOString()
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // In production, submit to Netlify
        const netlifyFormData = new FormData();
        netlifyFormData.append("form-name", "confirmation-contact");
        netlifyFormData.append("name", formData.name);
        netlifyFormData.append("email", formData.email);
        netlifyFormData.append("message", formData.message);
        netlifyFormData.append("originalPath", path);
        netlifyFormData.append("language", language);
        netlifyFormData.append("timestamp", new Date().toISOString());

        // Submit to Netlify
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(netlifyFormData as any).toString()
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle email copy
  const handleEmailCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(content[language].form.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content[language].form.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const content = {
    EN: {
      site: {
        title: "We're On It!",
        message: "Thanks! We'll review your site and deliver your audit within 1 business day.",
        subtitle: "What happens next:",
        steps: [
          "Comprehensive site analysis",
          "Performance & SEO audit", 
          "Personalized recommendations"
        ]
      },
      nosite: {
        title: "Your Blueprint is Coming!",
        message: "Thanks! Your Digital Launchpad Blueprint will be in your inbox within 1 business day.",
        subtitle: "What's included:",
        steps: [
          "Custom\nWebsite\nStrategy",
          "Design mockups & wireframes",
          "Timeline & pricing breakdown"
        ]
      },
      form: {
        title: "Questions? We're Here to Help",
        subtitle: "Rest assured - we'd love to address any questions, comments, or concerns you may have.",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Your questions, comments, or concerns...",
        submitButton: "Send Message",
        submittingButton: "Sending...",
        successMessage: "Thank you! We'll get back to you soon.",
        contactReminder: "Anything else? Feel free to call or email us anytime.",
        phone: "+52 624 264 4012",
        email: "bay@searchwebservices.tech"
      }
    },
    ES: {
      site: {
        title: "¡Estamos en Ello!",
        message: "¡Gracias! Revisaremos tu sitio y entregaremos tu auditoría dentro de 1 día hábil.",
        subtitle: "Qué sigue:",
        steps: [
          "Análisis integral del sitio",
          "Auditoría de rendimiento y SEO",
          "Recomendaciones personalizadas"
        ]
      },
      nosite: {
        title: "¡Tu Plan Está en Camino!",
        message: "¡Gracias! Tu Plan de Lanzamiento Digital estará en tu bandeja de entrada dentro de 1 día hábil.",
        subtitle: "Qué incluye:",
        steps: [
          "Estrategia\nWeb\nPersonalizada",
          "Bocetos y wireframes de diseño",
          "Cronograma y desglose de precios"
        ]
      },
      form: {
        title: "¿Preguntas? Estamos Aquí para Ayudar",
        subtitle: "Ten la seguridad - nos encantaría abordar cualquier pregunta, comentario o inquietud que puedas tener.",
        namePlaceholder: "Tu Nombre",
        emailPlaceholder: "Tu Email",
        messagePlaceholder: "Tus preguntas, comentarios o inquietudes...",
        submitButton: "Enviar Mensaje",
        submittingButton: "Enviando...",
        successMessage: "¡Gracias! Te responderemos pronto.",
        contactReminder: "¿Algo más? No dudes en llamarnos o escribirnos en cualquier momento.",
        phone: "+52 624 264 4012",
        email: "bay@searchwebservices.tech"
      }
    }
  };

  const currentContent = content[language][path];

  return (
    <Section
      id="confirmation"
      className="bg-gradient-to-r from-gray-100 to-gray-50 py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center">
          
          {/* Success Icon with Animation */}
          <div className="relative mb-8">
            <div className="bg-[#A5FF00]/20 rounded-full border-4 border-[#A5FF00] w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
              <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-black relative z-10" />
              
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {currentContent.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              {currentContent.message}
            </p>

            {/* What's Next Section */}
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                {currentContent.subtitle}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {currentContent.steps.map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-4"
                  >
                    <div className="bg-[#A5FF00] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-black font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base whitespace-pre-line">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions Form Section */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 md:p-8 border border-gray-200">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 text-center">
                  {content[language].form.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
                  {content[language].form.subtitle}
                </p>

                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-[#A5FF00]/20 rounded-full border-2 border-[#A5FF00] w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {content[language].form.successMessage}
                    </p>
                  </div>
                ) : (
                  <form 
                    name="confirmation-contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleFormSubmit} 
                    className="space-y-4 max-w-2xl mx-auto"
                  >
                    {/* Hidden inputs for Netlify */}
                    <input type="hidden" name="form-name" value="confirmation-contact" />
                    <div style={{ display: 'none' }}>
                      <label>Don't fill this out: <input name="bot-field" /></label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={content[language].form.namePlaceholder}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={content[language].form.emailPlaceholder}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={content[language].form.messagePlaceholder}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors resize-none"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                        className="bg-[#A5FF00] hover:bg-[#8FE600] disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>
                          {isSubmitting 
                            ? content[language].form.submittingButton 
                            : content[language].form.submitButton
                          }
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Reminder */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm md:text-base mb-4">
                {content[language].form.contactReminder}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`tel:${content[language].form.phone}`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#A5FF00] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{content[language].form.phone}</span>
                </a>
                <button 
                  onClick={handleEmailCopy}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#A5FF00] transition-colors relative"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">{content[language].form.email}</span>
                  {emailCopied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {language === 'EN' ? 'Copied!' : '¡Copiado!'}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Confirmation; 