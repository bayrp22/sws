import React from 'react';
import Meta from '@/seo/Meta';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const TestForm: React.FC = () => {
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

  return (
    <div className="h-full">
      <Meta
        path="/test-form"
        lang="en"
        title="Test Form - Netlify Form Testing"
        description="Test form for Netlify form submission."
        ogImage="/og/en.svg"
      />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Test Form
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8">
                Simple Netlify form test page
              </p>

              {/* Pure HTML Netlify Form - No React/JavaScript */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <form
                  ref={formRef}
                  name="test-form"
                  method="POST"
                  action="/test-success"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="space-y-6"
                >
                  {/* Hidden form name for Netlify */}
                  <input type="hidden" name="form-name" value="test-form" />

                  {/* Honeypot field */}
                  <div style={{ display: 'none' }}>
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent"
                      placeholder="Your Business Name"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* UTM Attribution Fields */}
                  <input type="hidden" name="utm_source" />
                  <input type="hidden" name="utm_medium" />
                  <input type="hidden" name="utm_campaign" />
                  <input type="hidden" name="utm_term" />
                  <input type="hidden" name="utm_content" />
                  <input type="hidden" name="gclid" />
                  <input type="hidden" name="fbclid" />
                  <input type="hidden" name="referrer_path" />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#A5FF00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
                  >
                    Submit Test Form
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TestForm;
