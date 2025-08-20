export interface TableData {
  headers: string[];
  rows: string[][];
}

export function parseMarkdownTable(content: string): { content: string; tables: { [key: string]: TableData } } {
  // Look for table patterns that start with || and contain multiple lines
  const tableRegex = /(\|\|[^\n]*\|[^\n]*\n)+/g;
  const tables: { [key: string]: TableData } = {};
  let tableCounter = 0;
  
  const processedContent = content.replace(tableRegex, (match) => {
    const lines = match.trim().split('\n').filter(line => line.trim());
    
    if (lines.length > 2) { // Need at least header, separator, and one data row
      // Parse header row (remove leading || and trailing |, then split by |)
      const headerLine = lines[0].replace(/^\|\|/, '').replace(/\|$/, '');
      const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
      
      // Skip separator line (index 1) and parse data rows
      const dataRows = lines.slice(2);
      const rows = dataRows.map(line => {
        const cleanLine = line.replace(/^\|\|/, '').replace(/\|$/, '');
        return cleanLine.split('|').map(cell => cell.trim()).filter(cell => cell);
      });
      
      if (headers.length > 0 && rows.length > 0) {
        const tableId = `table_${tableCounter}`;
        tables[tableId] = { headers, rows };
        tableCounter++;
        
        // Return a placeholder that will be replaced by the component
        return `{{TABLE:${tableId}}}`;
      }
    }
    
    return match;
  });
  
  return { content: processedContent, tables };
}

export function processContentWithTables(content: string): { content: string; tables: { [key: string]: TableData } } {
  // First handle basic markdown formatting
  let processedContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
  
  // Parse tables
  const { content: finalContent, tables } = parseMarkdownTable(processedContent);
  
  // Handle bullet points
  const contentWithBullets = finalContent
    .replace(/• /g, '<li>')
    .replace(/<li>/g, '</p><ul class="list-disc list-inside space-y-2 my-4 text-gray-300"><li>')
    .replace(/(<li>.*?)(<p>|$)/g, '$1</li></ul><p>');
  
  return { content: contentWithBullets, tables };
} 