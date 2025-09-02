import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FormSuccess: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>¡Gracias! | Search Web Services - Diseño Web Los Cabos</title>
        <meta name="description" content="¡Gracias por tu consulta! Revisaremos tu información y te responderemos con tu auditoría gratuita de sitio web dentro de 1 día hábil." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/es" className="flex items-center space-x-2">
                <img
                  src="/SWS Logo Black Fill.png"
                  alt="Search Web Services"
                  className="h-8 w-auto"
                />
              </Link>
              <nav className="flex space-x-8">
                <Link to="/es" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Inicio
                </Link>
                <Link to="/es/servicios/diseno-web-los-cabos" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Servicios
                </Link>
                <Link to="/es/nosotros" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Nosotros
                </Link>
                <Link to="/es/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contacto
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
              ¡Estamos en ello!
            </h1>

            <div className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              <p className="mb-4">
                ¡Gracias por contactarnos! Hemos recibido tu información y revisaremos tu sitio dentro de 1 día hábil.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">¿Qué sucede a continuación?</h3>
                <ol className="text-left text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>Análisis integral del sitio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>Auditoría de rendimiento y SEO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>Recomendaciones personalizadas</span>
                  </li>
                </ol>
              </div>

              <p className="text-lg">
                Te enviaremos un informe detallado con información práctica para mejorar tu presencia en línea.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">¿Necesitas asistencia inmediata?</h3>
              <p className="text-gray-600 mb-4">
                Mientras esperas tu auditoría, no dudes en contactarnos directamente:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>📧 info@searchwebservices.com</p>
                <p>📱 WhatsApp: +52 624 123 4567</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/es"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver al Inicio
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>

              <Link
                to="/es/servicios/diseno-web-los-cabos"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Nuestros Servicios
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
