import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { faqData } from '../data/faq';
import { faqPageJsonLd, breadcrumbJsonLd } from '../seo/jsonld';
import Meta from '../seo/Meta';

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

  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/\|(.+?)\|/g, (match, content) => {
        // Parse markdown tables
        const lines = content.split('\n').filter(line => line.trim());
        if (lines.length > 1) {
          const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
          const rows = lines.slice(2).map(line => 
            line.split('|').map(cell => cell.trim()).filter(cell => cell)
          );
          
          let tableHtml = '<table class="min-w-full border border-slate-300 rounded-lg overflow-hidden mt-6 mb-6"><thead class="bg-slate-50"><tr>';
          headers.forEach(header => {
            tableHtml += `<th class="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">${header}</th>`;
          });
          tableHtml += '</tr></thead><tbody>';
          
          rows.forEach(row => {
            tableHtml += '<tr class="hover:bg-slate-50">';
            row.forEach(cell => {
              tableHtml += `<td class="border border-slate-300 px-4 py-3 text-slate-700">${cell}</td>`;
            });
            tableHtml += '</tr>';
          });
          tableHtml += '</tbody></table>';
          return tableHtml;
        }
        return match;
      })
      .replace(/• /g, '<li>')
      .replace(/<li>/g, '</p><ul class="list-disc list-inside space-y-2 my-4"><li>')
      .replace(/(<li>.*?)(<p>|$)/g, '$1</li></ul><p>');
  };

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-slate-500">→</li>
              <li>
                <Link to="/faq" className="text-blue-600 hover:text-blue-800">
                  FAQ
                </Link>
              </li>
              <li className="text-slate-500">→</li>
              <li className="text-slate-700 font-medium">
                {faqItem.question}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-6">
                {faqItem.id}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {faqItem.question}
              </h1>
              <p className="text-lg text-slate-600">
                {faqItem.metaDescription}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="prose prose-slate prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: renderContent(faqItem.answer)
                  }} 
                />
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-slate-600 font-medium">
                    Ready to get started?
                  </p>
                  <Link 
                    to={faqItem.ctaUrl}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
                  >
                    {faqItem.ctaText} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link 
                  to="/faq"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  ← Back to all FAQs
                </Link>
                
                <div className="flex gap-4">
                  {faqItem.id > 1 && (
                    <Link 
                      to={`/faq/${faqData[faqItem.id - 2].slug}`}
                      className="text-slate-600 hover:text-slate-800 font-medium flex items-center"
                    >
                      ← Previous
                    </Link>
                  )}
                  {faqItem.id < faqData.length && (
                    <Link 
                      to={`/faq/${faqData[faqItem.id].slug}`}
                      className="text-slate-600 hover:text-slate-800 font-medium flex items-center"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Related Questions */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Frequently Asked Questions</h2>
              <div className="grid gap-4">
                {faqData
                  .filter(item => item.id !== faqItem.id)
                  .slice(0, 3)
                  .map(item => (
                    <Link
                      key={item.id}
                      to={`/faq/${item.slug}`}
                      className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {item.id}
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