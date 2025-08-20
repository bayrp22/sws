import React from 'react';
import FAQTable from './FAQTable';
import { processContentWithTables } from '../utils/tableParser';

interface FAQContentProps {
  content: string;
  className?: string;
}

const FAQContent: React.FC<FAQContentProps> = ({ content, className = "" }) => {
  const { content: processedContent, tables } = processContentWithTables(content);
  
  // Split content by table placeholders and render accordingly
  const parts = processedContent.split(/({{TABLE:table_\d+}})/);
  
  return (
    <div className={`prose prose-invert prose-lg max-w-none ${className}`}>
      {parts.map((part, index) => {
        // Check if this part is a table placeholder
        const tableMatch = part.match(/{{TABLE:(table_\d+)}}/);
        
        if (tableMatch && tables[tableMatch[1]]) {
          return <FAQTable key={index} data={tables[tableMatch[1]]} />;
        }
        
        // Regular content
        if (part.trim()) {
          return (
            <div
              key={index}
              className="[&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-white [&_strong]:font-semibold [&_ul]:space-y-2 [&_ul]:my-4 [&_li]:text-gray-300 [&_li]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: part }}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default FAQContent; 