import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Form: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Function to collect attribution data from URL parameters
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

    // Function to populate hidden fields with attribution data
    const populateHiddenFields = () => {
      if (!formRef.current) return;

      const attributionData = collectAttributionData();

      // Populate hidden fields
      Object.entries(attributionData).forEach(([key, value]) => {
        const hiddenField = formRef.current?.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        if (hiddenField) {
          hiddenField.value = value;
        }
      });
    };

    // Populate fields on component mount
    populateHiddenFields();

    // Also listen for URL changes (in case user navigates with new UTM params)
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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/SWS Logo Black Fill.png"
                  alt="Search Web Services"
                  className="h-8 w-auto"
                />
              </Link>
              <nav className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/en/services/web-design-los-cabos" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Services
                </Link>
                <Link to="/en/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link to="/en/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Form Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Website Audit
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="space-y-6"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact-form" />

              {/* Hidden bot field for spam protection */}
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              {/* Hidden attribution fields */}
              <input type="hidden" name="utm_source" />
              <input type="hidden" name="utm_medium" />
              <input type="hidden" name="utm_campaign" />
              <input type="hidden" name="utm_term" />
              <input type="hidden" name="utm_content" />
              <input type="hidden" name="gclid" />
              <input type="hidden" name="fbclid" />
              <input type="hidden" name="referrer_path" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Website (if any)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Describe your business, goals, and what you're looking for..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors text-lg"
                >
                  Get My Free Audit
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>By submitting this form, you agree to our privacy policy and terms of service.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Form;
