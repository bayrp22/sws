import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import HomeEn from './pages/en/Home';
import HomeEs from './pages/es/Home';
import WebDesignEn from './pages/en/services/WebDesignLosCabos';
import WebDesignEs from './pages/es/servicios/DisenoWebLosCabos';
import CustomWebsitesEn from './pages/en/services/CustomWebsites';
import CustomWebsitesEs from './pages/es/servicios/SitiosWebAMedida';
import SeoServicesEn from './pages/en/services/SEO';
import SeoServicesEs from './pages/es/servicios/SEO';
import ContactEn from './pages/en/Contact';
import ContactEs from './pages/es/Contacto';
import PricingEn from './pages/en/Pricing';
import PricingEs from './pages/es/Precios';
import AboutEn from './pages/en/About';
import AboutEs from './pages/es/Nosotros';
import FormEn from './pages/en/Form';
import FormularioEs from './pages/es/Formulario';
import FAQ from './pages/FAQ';
import FAQItem from './pages/FAQItem';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomeEn />} />
    <Route path="/en" element={<HomeEn />} />
    <Route path="/es" element={<HomeEs />} />

    <Route path="/en/services/web-design-los-cabos" element={<WebDesignEn />} />
    <Route path="/es/servicios/diseno-web-los-cabos" element={<WebDesignEs />} />

    <Route path="/en/services/custom-websites" element={<CustomWebsitesEn />} />
    <Route path="/es/servicios/sitios-web-a-medida" element={<CustomWebsitesEs />} />

    <Route path="/en/services/seo" element={<SeoServicesEn />} />
    <Route path="/es/servicios/seo" element={<SeoServicesEs />} />

    <Route path="/en/contact" element={<ContactEn />} />
    <Route path="/es/contacto" element={<ContactEs />} />

    <Route path="/en/pricing" element={<PricingEn />} />
    <Route path="/es/precios" element={<PricingEs />} />

    <Route path="/en/about" element={<AboutEn />} />
    <Route path="/es/nosotros" element={<AboutEs />} />

    <Route path="/form" element={<FormEn />} />
    <Route path="/formulario" element={<FormularioEs />} />

    <Route path="/faq" element={<FAQ />} />
    <Route path="/faq/:slug" element={<FAQItem />} />

    <Route path="/case-studies" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <Navigation variant="page" />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Case Studies</h1>
        <p className="text-lg text-slate-600">Coming Soon - Our client success stories and project showcases.</p>
        <Link to="/faq" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          View FAQ Instead
        </Link>
      </div>
    </div>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes; 