import React from 'react';
import { TableData } from '../utils/tableParser';

interface FAQTableProps {
  data: TableData;
}

const FAQTable: React.FC<FAQTableProps> = ({ data }) => {
  return (
    <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-xl">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
        <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${data.headers.length}, 1fr)` }}>
          {data.headers.map((header, index) => (
            <div
              key={index}
              className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide"
            >
              {header}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-600/30">
        {data.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-px hover:bg-gray-700/20 transition-colors duration-200"
            style={{ gridTemplateColumns: `repeat(${data.headers.length}, 1fr)` }}
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="px-6 py-4 text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQTable; 