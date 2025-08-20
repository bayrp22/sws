import React from 'react';
import { Link } from 'react-router-dom';
import { faqData, faqPageData } from '../data/faq';
import { faqPageJsonLd } from '../seo/jsonld';
import Meta from '../seo/Meta';

const FAQ: React.FC = () => {
  const jsonLd = faqPageJsonLd(faqData);

  return (
    <>
      <Meta 
        path="/faq"
        lang="en"
        title={faqPageData.title}
        description={faqPageData.description}
        alternates={{ en: '/faq', es: '/faq' }}
      />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {faqPageData.title}
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-slate-600 mb-4">
                {faqPageData.description}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <strong>Purpose:</strong> {faqPageData.subtitle}
              </div>
            </div>
          </div>

          {/* Quick Access Index */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">📌 Quick‑Access Index</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">#</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Question</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Slug</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {faqData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            <Link 
                              to={`/faq/${item.slug}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {item.question}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-slate-500">
                            /faq/{item.slug}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-8">
            {faqData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {item.id}. {item.question}
                </h2>
                <div className="text-slate-700 mb-6 prose prose-slate max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: item.answer
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/\n/g, '<br>')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>')
                        .replace(/\|(.+?)\|/g, (match, content) => {
                          // Simple table parsing
                          const lines = content.split('\n').filter(line => line.trim());
                          if (lines.length > 1) {
                            const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
                            const rows = lines.slice(2).map(line => 
                              line.split('|').map(cell => cell.trim()).filter(cell => cell)
                            );
                            
                            let tableHtml = '<table class="min-w-full border border-slate-300 rounded-lg overflow-hidden mt-4 mb-4"><thead class="bg-slate-50"><tr>';
                            headers.forEach(header => {
                              tableHtml += `<th class="border border-slate-300 px-4 py-2 text-left font-semibold">${header}</th>`;
                            });
                            tableHtml += '</tr></thead><tbody>';
                            
                            rows.forEach(row => {
                              tableHtml += '<tr class="hover:bg-slate-50">';
                              row.forEach(cell => {
                                tableHtml += `<td class="border border-slate-300 px-4 py-2">${cell}</td>`;
                              });
                              tableHtml += '</tr>';
                            });
                            tableHtml += '</tbody></table>';
                            return tableHtml;
                          }
                          return match;
                        })
                    }} 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/faq/${item.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View detailed page →
                  </Link>
                  <Link 
                    to={item.ctaUrl}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {item.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-lg mb-6 opacity-90">
                Get personalized answers and a custom quote for your project.
              </p>
              <Link 
                to="/contact?source=faq-bottom"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors font-bold inline-block"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 