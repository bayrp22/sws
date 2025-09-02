import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FormSuccess: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Thank You! | Search Web Services - Los Cabos Web Design</title>
        <meta name="description" content="Thank you for your inquiry! We'll review your information and get back to you with your free website audit within 1 business day." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
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

        {/* Success Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              We're On It!
            </h1>

            <div className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              <p className="mb-4">
                Thanks for reaching out! We've received your information and will review your site within 1 business day.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">What happens next:</h3>
                <ol className="text-left text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>Comprehensive site analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>Performance & SEO audit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>Personalized recommendations</span>
                  </li>
                </ol>
              </div>

              <p className="text-lg">
                We'll send you a detailed report with actionable insights to improve your online presence.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Need immediate assistance?</h3>
              <p className="text-gray-600 mb-4">
                While you wait for your audit, feel free to reach out directly:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>📧 info@searchwebservices.com</p>
                <p>📱 WhatsApp: +52 624 123 4567</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>

              <Link
                to="/en/services/web-design-los-cabos"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Our Services
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormSuccess;
