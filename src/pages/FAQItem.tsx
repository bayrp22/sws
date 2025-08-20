import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { faqData } from '../data/faq';
import { faqPageJsonLd, breadcrumbJsonLd } from '../seo/jsonld';
import Meta from '../seo/Meta';
import Navigation from '../components/Navigation';
import FAQContent from '../components/FAQContent';

const FAQItem: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const faqItem = faqData.find(item => item.slug === slug);
  
  if (!faqItem) {
    return <Navigate to="/404" replace />;
  }

  const jsonLd = faqPageJsonLd([faqItem]);
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
    { name: faqItem.question, url: `/faq/${faqItem.slug}` }
  ];
  const breadcrumbJsonLd = breadcrumbJsonLd(breadcrumbItems);



  return (
    <>
      <Meta 
        path={`/faq/${faqItem.slug}`}
        lang="en"
        title={faqItem.question}
        description={faqItem.metaDescription}
        alternates={{ 
          en: `/faq/${faqItem.slug}`, 
          es: `/faq/${faqItem.slug}` 
        }}
      />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        
        <Navigation variant="page" />
        
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-12">
            <ol className="flex items-center space-x-3 text-sm">
              <li>
                <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15V9a2 2 0 012-2h4a2 2 0 012 2v6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li className="text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link to="/faq" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li className="text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-300 font-medium truncate max-w-xs">
                {faqItem.question}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white font-bold text-2xl shadow-2xl shadow-blue-500/25 mb-8">
                {faqItem.id}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
                {faqItem.question}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                {faqItem.metaDescription}
              </p>
            </div>

            {/* Content */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-10 mb-12 hover:border-gray-500/40 transition-all duration-300">
              {faqItem.id === 1 ? (
                // Custom pricing table for FAQ #1
                <div className="prose prose-invert prose-xl max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    We publish flat pricing so you know the investment up front.
                  </p>
                  
                  {/* Beautiful Pricing Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Package
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Price (MXN)
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Best for
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Starter Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Starter</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          $25,000
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Local businesses that need a polished 4‑6‑page brochure site.
                        </div>
                      </div>
                      
                      {/* Business Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Business</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          $40,000
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          E‑commerce, booking engines or multi‑language content.
                        </div>
                      </div>
                      
                      {/* Premium Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Premium</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Custom quote (bulk)
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Groups of 5+ sites or app‑level functionality.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    All tiers include mobile‑first design, basic SEO, CI/CD, and one month of hosting.
                  </p>
                </div>
              ) : faqItem.id === 4 ? (
                // Custom timeline table for FAQ #4
                <div className="prose prose-invert prose-xl max-w-none">
                  {/* Beautiful Timeline Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Phase
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Days
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Deliverable
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Receive Assets */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Receive Assets</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          1–5
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          We ingest your brand and content.
                        </div>
                      </div>
                      
                      {/* Build Concept */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Build Concept</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          6–10
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          First live version on a staging URL.
                        </div>
                      </div>
                      
                      {/* Polish Details */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Polish Details</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          11–12
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Pixel‑perfect tweaks & micro‑animations.
                        </div>
                      </div>
                      
                      {/* Test Integrations */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Test Integrations</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          13–14
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Forms, APIs, SEO checks, security audit.
                        </div>
                      </div>
                      
                      {/* Deploy & Go Live */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Deploy & Go Live</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          15
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          DNS switch + launch party 🎉
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Complex projects may extend, but 2 weeks is standard.
                  </p>
                </div>
              ) : faqItem.id === 8 ? (
                // Custom maintenance table for FAQ #8
                <div className="prose prose-invert prose-xl max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Yes—our <strong className="text-white font-semibold">SWS Service Plan</strong> (MXN $2,200/mo) covers:
                  </p>
                  
                  {/* Beautiful Maintenance Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Pillar
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          What's covered
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          SLA
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Security Management */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Security Management</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          HTTPS renewals, 24/7 monitoring
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Continuous
                        </div>
                      </div>
                      
                      {/* Routine Content Updates */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Routine Content Updates</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          One bulk text/media swap
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Monthly
                        </div>
                      </div>
                      
                      {/* Continuous Improvement */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Continuous Improvement</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Performance & SEO upgrades
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          At our discretion
                        </div>
                      </div>
                      
                      {/* Emergency Response */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Emergency Response</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Diagnosis &lt; 48 h, fix &lt; 72 h
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          As needed
                        </div>
                      </div>
                      
                      {/* Reporting */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Reporting</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Summary of actions & recommendations
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Monthly
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Major redesigns or new features are quoted separately.
                  </p>
                </div>
              ) : (
                <FAQContent 
                  content={faqItem.answer}
                  className="prose-xl [&_p]:text-lg [&_li]:text-lg"
                />
              )}

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-gray-600/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-gray-300 font-semibold text-lg mb-2">
                      Ready to get started?
                    </p>
                    <p className="text-gray-400 text-sm">
                      Let's discuss your project requirements
                    </p>
                  </div>
                  <Link 
                    to={faqItem.ctaUrl}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-2"
                  >
                    {faqItem.ctaText}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8 mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <Link 
                  to="/faq"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors duration-200 text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all FAQs
                </Link>
                
                <div className="flex gap-6">
                  {faqItem.id > 1 && (
                    <Link 
                      to={`/faq/${faqData[faqItem.id - 2].slug}`}
                      className="text-gray-400 hover:text-gray-200 font-medium flex items-center gap-2 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Link>
                  )}
                  {faqItem.id < faqData.length && (
                    <Link 
                      to={`/faq/${faqData[faqItem.id].slug}`}
                      className="text-gray-400 hover:text-gray-200 font-medium flex items-center gap-2 transition-colors duration-200"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Related Questions */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-10 text-center">Other Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {faqData
                  .filter(item => item.id !== faqItem.id)
                  .slice(0, 3)
                  .map(item => (
                    <Link
                      key={item.id}
                      to={`/faq/${item.slug}`}
                      className="group block bg-gradient-to-r from-gray-800/30 to-gray-700/20 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 hover:from-gray-700/40 hover:to-gray-600/30 hover:border-gray-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 font-bold text-sm">
                            {item.id}
                          </div>
                          <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-200 pr-4">
                            {item.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQItem; 