import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '@/seo/Meta';

const ServicesIndex: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta 
        path="/en/services" 
        lang="en" 
        title="Web Services in Los Cabos" 
        description="Explore our web services in Los Cabos: web design, website design, web development, website development, custom websites, and website SEO."
        alternates={{ en: '/en/services', es: '/es/servicios' }}
      />
      
      <h1 className="text-3xl font-bold mb-4">Web Services</h1>
      <p className="text-gray-700 mb-6">We build and optimize websites for results. Choose a service below.</p>
      
      <ul className="space-y-6">
        <li>
          <Link to="/en/services/web-design-los-cabos" className="text-blue-600 hover:underline font-semibold">
            Web Design
          </Link>
          <p className="text-gray-600 mt-1">High-performance, visually stunning websites, mobile-first and SEO-ready.</p>
        </li>
        
        <li>
          <Link to="/en/services/web-design-los-cabos" className="text-blue-600 hover:underline font-semibold">
            Website Design
          </Link>
          <p className="text-gray-600 mt-1">High-performance, visually stunning websites, mobile-first and SEO-ready.</p>
        </li>
        
        <li>
          <Link to="/en/services/web-development" className="text-blue-600 hover:underline font-semibold">
            Web Development
          </Link>
          <p className="text-gray-600 mt-1">Fast, secure, SEO-ready builds using modern standards and clean code.</p>
        </li>
        
        <li>
          <Link to="/en/services/web-development" className="text-blue-600 hover:underline font-semibold">
            Website Development
          </Link>
          <p className="text-gray-600 mt-1">Fast, secure, SEO-ready builds using modern standards and clean code.</p>
        </li>
        
        <li>
          <Link to="/en/services/custom-websites" className="text-blue-600 hover:underline font-semibold">
            Custom Websites
          </Link>
          <p className="text-gray-600 mt-1">Fully bespoke sites tailored to your brand, goals, and features.</p>
        </li>
        
        <li>
          <Link to="/en/services/seo" className="text-blue-600 hover:underline font-semibold">
            Website SEO
          </Link>
          <p className="text-gray-600 mt-1">Technical and on-page SEO to improve rankings, traffic, and leads.</p>
        </li>
      </ul>
    </div>
  );
};

export default ServicesIndex; 