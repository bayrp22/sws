import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';

const Form: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const collectAttributionData = () => {
      const urlParams = new URLSearchParams(window.location.search);

      return {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || '',
        gclid: urlParams.get('gclid') || '',
        fbclid: urlParams.get('fbclid') || '',
        referrer_path: document.referrer || '',
      };
    };

    const populateHiddenFields = () => {
      if (!formRef.current) return;

      const attributionData = collectAttributionData();

      Object.entries(attributionData).forEach(([key, value]) => {
        const hiddenField = formRef.current?.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        if (hiddenField) {
          hiddenField.value = value;
        }
      });
    };

    populateHiddenFields();

    const handleUrlChange = () => {
      setTimeout(populateHiddenFields, 100);
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us | Search Web Services - Los Cabos Web Design</title>
        <meta name="description" content="Get your free website audit and personalized recommendations. Contact Search Web Services for professional web design services in Los Cabos." />
      </Helmet>

      <div className="min-h-screen relative">
        {/* Navigation Overlay */}
        <ResponsiveNavigation variant="page" />

        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Website Audit
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Tell us about your business and we'll provide a comprehensive website analysis and personalized recommendations within 1 business day.
                </p>
              </div>

              <form
                ref={formRef}
                name="contact-form"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/form/success"
                className="space-y-8"
              >
                <input type="hidden" name="form-name" value="contact-form" />
                <div style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>

                <input type="hidden" name="utm_source" />
                <input type="hidden" name="utm_medium" />
                <input type="hidden" name="utm_campaign" />
                <input type="hidden" name="utm_term" />
                <input type="hidden" name="utm_content" />
                <input type="hidden" name="gclid" />
                <input type="hidden" name="fbclid" />
                <input type="hidden" name="referrer_path" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-base font-semibold text-gray-900 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-base font-semibold text-gray-900 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="business" className="block text-base font-semibold text-gray-900 mb-3">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      required
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="Your business name"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-base font-semibold text-gray-900 mb-3">
                      Current Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-semibold text-gray-900 mb-3">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 resize-none"
                    placeholder="Describe your business, goals, and what you're looking for..."
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get My Free Audit
                    <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-gray-500 text-sm">
                <p>By submitting this form, you agree to our privacy policy and terms of service.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Form;
