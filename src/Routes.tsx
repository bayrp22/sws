import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import HomeEn from './pages/en/Home';
import HomeEs from './pages/es/Home';
import WebDesignEn from './pages/en/services/WebDesignLosCabos';
import WebDesignEs from './pages/es/servicios/DisenoWebLosCabos';
import WebDevelopmentEn from './pages/en/services/WebDevelopment';
import DesarrolloWebEs from './pages/es/servicios/DesarrolloWeb';
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

import FAQ from './pages/FAQ';
import FAQItem from './pages/FAQItem';
import PreguntasEs from './pages/es/Preguntas';
import PreguntaItem from './pages/es/PreguntaItem';
import CaseStudies from './pages/CaseStudies';
import EstudiosDeCaso from './pages/es/EstudiosDeCaso';
import Form from './pages/en/Form';
import Formulario from './pages/es/Formulario';
import FormSuccessEn from './pages/en/FormSuccess';
import FormSuccessEs from './pages/es/FormSuccess';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomeEn />} />
    <Route path="/en" element={<HomeEn />} />
    <Route path="/es" element={<HomeEs />} />

    <Route path="/en/services/web-design-los-cabos" element={<WebDesignEn />} />
    <Route path="/es/servicios/diseno-web-los-cabos" element={<WebDesignEs />} />

    <Route path="/en/services/web-development" element={<WebDevelopmentEn />} />
    <Route path="/es/servicios/desarrollo-web" element={<DesarrolloWebEs />} />

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



    <Route path="/faq" element={<FAQ />} />
    <Route path="/faq/:slug" element={<FAQItem />} />

    <Route path="/preguntas" element={<PreguntasEs />} />
    <Route path="/preguntas/:slug" element={<PreguntaItem />} />

    <Route path="/case-studies" element={<CaseStudies />} />
    <Route path="/estudios-de-caso" element={<EstudiosDeCaso />} />

    <Route path="/form" element={<Form />} />
    <Route path="/form/success" element={<FormSuccessEn />} />
    <Route path="/formulario" element={<Formulario />} />
    <Route path="/formulario/success" element={<FormSuccessEs />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes; 