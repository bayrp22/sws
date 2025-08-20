import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '@/seo/Meta';

const ServiciosIndex: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta 
        path="/es/servicios" 
        lang="es" 
        title="Servicios Web en Los Cabos" 
        description="Explora nuestros servicios web en Los Cabos: diseño web, diseño de sitios web, desarrollo web, desarrollo de sitios web, sitios web a medida y SEO para sitios web."
        alternates={{ en: '/en/services', es: '/es/servicios' }}
      />
      
      <h1 className="text-3xl font-bold mb-4">Servicios Web</h1>
      <p className="text-gray-700 mb-6">Construimos y optimizamos sitios web que generan resultados. Elige un servicio a continuación.</p>
      
      <ul className="space-y-6">
        <li>
          <Link to="/es/servicios/diseno-web-los-cabos" className="text-blue-600 hover:underline font-semibold">
            Diseño Web
          </Link>
          <p className="text-gray-600 mt-1">Sitios de alto rendimiento, adaptados a móviles y listos para SEO.</p>
        </li>
        
        <li>
          <Link to="/es/servicios/diseno-web-los-cabos" className="text-blue-600 hover:underline font-semibold">
            Diseño de Sitios Web
          </Link>
          <p className="text-gray-600 mt-1">Sitios de alto rendimiento, adaptados a móviles y listos para SEO.</p>
        </li>
        
        <li>
          <Link to="/es/servicios/desarrollo-web" className="text-blue-600 hover:underline font-semibold">
            Desarrollo Web
          </Link>
          <p className="text-gray-600 mt-1">Construcciones rápidas, seguras y optimizadas con estándares modernos y código limpio.</p>
        </li>
        
        <li>
          <Link to="/es/servicios/desarrollo-web" className="text-blue-600 hover:underline font-semibold">
            Desarrollo de Sitios Web
          </Link>
          <p className="text-gray-600 mt-1">Construcciones rápidas, seguras y optimizadas con estándares modernos y código limpio.</p>
        </li>
        
        <li>
          <Link to="/es/servicios/sitios-web-a-medida" className="text-blue-600 hover:underline font-semibold">
            Sitios Web a Medida
          </Link>
          <p className="text-gray-600 mt-1">Soluciones a la medida de tu marca, objetivos y funcionalidades.</p>
        </li>
        
        <li>
          <Link to="/es/servicios/seo" className="text-blue-600 hover:underline font-semibold">
            SEO para Sitios Web
          </Link>
          <p className="text-gray-600 mt-1">SEO técnico y de contenidos para mejorar rankings, tráfico y clientes.</p>
        </li>
      </ul>
    </div>
  );
};

export default ServiciosIndex; 