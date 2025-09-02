import React from 'react';
import Meta from '@/seo/Meta';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const TestSuccess: React.FC = () => {
  return (
    <div className="h-full">
      <Meta
        path="/test-success"
        lang="en"
        title="Test Form Success - Netlify Form Testing"
        description="Test form submission successful."
        ogImage="/og/en.svg"
      />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Test Form Success!
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8">
                Your test form submission was successful.
              </p>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="text-center">
                  <div className="bg-[#A5FF00]/20 rounded-full border-4 border-[#A5FF00] w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Thank You!
                  </h2>

                  <p className="text-lg text-gray-600 mb-8">
                    Your test form has been submitted successfully. Check your Netlify dashboard for the form data.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="/test-form"
                      className="inline-block bg-[#A5FF00] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
                    >
                      Submit Another Test
                    </a>

                    <br />

                    <a
                      href="/en"
                      className="inline-block text-gray-600 hover:text-[#A5FF00] transition-colors duration-200"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TestSuccess;
