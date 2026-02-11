import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';

const FormSuccess: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Thank You! | Search Web Services - Los Cabos Web Design</title>
        <meta name="description" content="Thank you for your inquiry! We'll review your information and get back to you with your free website audit within 1 business day." />
      </Helmet>

      <div className="min-h-screen relative">
        {/* Navigation Overlay */}
        <ResponsiveNavigation variant="page" />

        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Success Content */}
        <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 text-center">
              {/* Success Icon */}
              <div className="mb-12">
                <div className="mx-auto w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                We're On It!
              </h1>

              <div className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                <p className="mb-6">
                  Thanks for reaching out! We've received your information and will review your site within 1 business day.
                </p>

                <div className="bg-blue-50 rounded-xl p-8 mb-8 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-6 text-xl">What happens next:</h3>
                  <ol className="text-left text-blue-800 space-y-4">
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">1</span>
                      <span className="text-base">Comprehensive site analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">2</span>
                      <span className="text-base">Performance & SEO audit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">3</span>
                      <span className="text-base">Personalized recommendations</span>
                    </li>
                  </ol>
                </div>

                <p className="text-lg font-medium">
                  We'll send you a detailed report with actionable insights to improve your online presence.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-8 mb-12 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">Need immediate assistance?</h3>
                <p className="text-gray-600 mb-6 text-base">
                  While you wait for your audit, feel free to reach out directly:
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center justify-center text-lg">
                    <span className="mr-3">📧</span>
                    hola@searchvisionary.tech
                  </p>
                  <p className="flex items-center justify-center text-lg">
                    <span className="mr-3">📱</span>
                    WhatsApp: +52 624 264 4012
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Back to Home
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>

                <Link
                  to="/en/services/web-design-los-cabos"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg"
                >
                  View Our Services
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FormSuccess;
