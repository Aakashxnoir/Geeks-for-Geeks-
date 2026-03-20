/**
 * Utility for exporting data to various formats.
 * Efficiently handles JSON, CSV, and TXT generation for card reports.
 */

export type ExportFormat = 'json' | 'csv' | 'txt' | 'blob';

export const exportData = (filename: string, data: any, format: ExportFormat = 'json') => {
  let content: string;
  let mimeType: string;

  switch (format) {
    case 'csv':
      content = convertToCSV(data);
      mimeType = 'text/csv;charset=utf-8;';
      break;
    case 'txt':
      content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      mimeType = 'text/plain;charset=utf-8;';
      break;
    case 'json':
    default:
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json;charset=utf-8;';
      break;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.${format}`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (objArray: any) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  if (!array.length) return '';
  
  const header = Object.keys(array[0]).join(',');
  const rows = array.map((obj: any) => 
    Object.values(obj).map(value => `"${value}"`).join(',')
  ).join('\r\n');

  return `${header}\r\n${rows}`;
};
