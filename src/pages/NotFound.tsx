import React from 'react';
import Meta from '@/seo/Meta';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Meta path={window.location.pathname} lang={window.location.pathname.startsWith('/es') ? 'es' : 'en'} title="404 - Page Not Found" robots="noindex, follow" />
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-gray-700 mb-6">The page you requested could not be found.</p>
        <a href="/en" className="underline">Go to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
