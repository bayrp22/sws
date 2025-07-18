import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Set proper document title for SEO
    document.title = "404 - Page Not Found | SWS - Strategic Web Solutions";
    
    // Add meta description for 404 page
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The page you are looking for could not be found. Visit our homepage to explore our web development services in Los Cabos.');
    }

    // Add structured data for 404 page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "404 - Page Not Found",
      "description": "The requested page could not be found",
      "url": window.location.href,
      "mainEntity": {
        "@type": "Thing",
        "name": "404 Error",
        "description": "Page not found"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://searchloscabos.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "404 Error"
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [location.pathname]);

  const suggestions = [
    { text: "Visit our homepage", href: "/" },
    { text: "Learn about our services", href: "/#solutions" },
    { text: "View our pricing", href: "/#pricing" },
    { text: "Contact us", href: "/#contact" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-blue-600 underline">
                Home
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700" aria-current="page">
              404 Error
            </li>
          </ol>
        </nav>

        {/* Main 404 Content */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
            <br />
            <span className="text-sm text-gray-500 block mt-2">
              Requested URL: <code className="bg-gray-200 px-2 py-1 rounded">{location.pathname}</code>
            </span>
          </p>
        </div>

        {/* Helpful Suggestions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Here are some helpful links:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <a
                key={index}
                href={suggestion.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-blue-600 hover:text-blue-700"
              >
                {suggestion.text}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you believe this is an error or need assistance, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:bay@searchloscabos.com"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              bay@searchloscabos.com
            </a>
            <a
              href="tel:+526242644012"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              +52 624 264 4012
            </a>
          </div>
        </div>

        {/* Search Engine Friendly Information */}
        <div className="mt-8 text-xs text-gray-400">
          <p>
            SWS - Strategic Web Solutions | Professional Web Development in Los Cabos
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
