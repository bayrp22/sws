import React from 'react';
import Meta from '@/seo/Meta';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormSuccessEn: React.FC = () => {
  return (
    <div className="h-full">
      <Meta
        path="/form/formsuccess"
        lang="en"
        title="Form Submitted Successfully - Search Web Services"
        description="Thank you for your form submission. We'll review your project and deliver your audit within 1 business day."
        alternates={{ en: '/form/formsuccess', es: '/formulario/formsuccess' }}
        ogImage="/og/form.svg"
      />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Thank You for Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Submission
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8">
                Your form has been submitted successfully.
              </p>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
                <div className="text-center">
                  <div className="bg-[#A5FF00]/20 rounded-full border-4 border-[#A5FF00] w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    We're On It!
                  </h2>

                  <p className="text-lg text-gray-600 mb-8">
                    Thanks! We'll review your project and deliver your audit within 1 business day.
                  </p>

                  {/* What's Next */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      What happens next:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">1</span>
                        </div>
                        <p className="text-gray-700 font-medium">Comprehensive site analysis</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">2</span>
                        </div>
                        <p className="text-gray-700 font-medium">Performance & SEO audit</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">3</span>
                        </div>
                        <p className="text-gray-700 font-medium">Personalized recommendations</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="/en"
                      className="inline-block bg-[#A5FF00] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
                    >
                      Back to Home
                    </a>

                    <br />

                    <a
                      href="/form"
                      className="inline-block text-gray-600 hover:text-[#A5FF00] transition-colors duration-200"
                    >
                      Submit Another Form
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-slate-300">
                <p className="mb-2">Questions? Contact us anytime:</p>
                <p className="font-semibold">+52 624 264 4012 | bay@searchwebservices.tech</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FormSuccessEn;
