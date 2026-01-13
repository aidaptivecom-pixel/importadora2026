// ============ EXPORT UTILITIES ============
// Utilidades para exportar datos a Excel y CSV

/**
 * Convierte un array de objetos a formato CSV
 */
export const convertToCSV = (data: Record<string, any>[], columns: { key: string; header: string }[]): string => {
  if (data.length === 0) return '';

  // Headers
  const headers = columns.map(col => `"${col.header}"`).join(',');
  
  // Rows
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (value === null || value === undefined) return '""';
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'boolean') return value ? 'Sí' : 'No';
      if (value instanceof Date) return `"${value.toLocaleDateString('es-AR')}"`;
      // Escape quotes and wrap in quotes
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',')
  ).join('\n');

  return `${headers}\n${rows}`;
};

/**
 * Descarga un archivo con el contenido especificado
 */
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob(['\ufeff' + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exporta datos a CSV
 */
export const exportToCSV = (
  data: Record<string, any>[], 
  columns: { key: string; header: string }[],
  filename: string
): void => {
  const csv = convertToCSV(data, columns);
  downloadFile(csv, `${filename}.csv`, 'text/csv');
};

/**
 * Exporta datos a Excel (formato XML simplificado que Excel puede abrir)
 */
export const exportToExcel = (
  data: Record<string, any>[], 
  columns: { key: string; header: string }[],
  filename: string,
  sheetName: string = 'Datos'
): void => {
  // Create Excel XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Header">
      <Font ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#3B82F6" ss:Pattern="Solid"/>
      <Alignment ss:Horizontal="Center"/>
    </Style>
    <Style ss:ID="Currency">
      <NumberFormat ss:Format="$ #,##0.00"/>
    </Style>
    <Style ss:ID="Date">
      <NumberFormat ss:Format="dd/mm/yyyy"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="${sheetName}">
    <Table>`;

  // Column widths
  columns.forEach(() => {
    xml += `<Column ss:Width="120"/>`;
  });

  // Header row
  xml += `<Row>`;
  columns.forEach(col => {
    xml += `<Cell ss:StyleID="Header"><Data ss:Type="String">${col.header}</Data></Cell>`;
  });
  xml += `</Row>`;

  // Data rows
  data.forEach(row => {
    xml += `<Row>`;
    columns.forEach(col => {
      const value = row[col.key];
      if (value === null || value === undefined) {
        xml += `<Cell><Data ss:Type="String"></Data></Cell>`;
      } else if (typeof value === 'number') {
        xml += `<Cell ss:StyleID="Currency"><Data ss:Type="Number">${value}</Data></Cell>`;
      } else if (value instanceof Date) {
        xml += `<Cell ss:StyleID="Date"><Data ss:Type="String">${value.toLocaleDateString('es-AR')}</Data></Cell>`;
      } else {
        const escaped = String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        xml += `<Cell><Data ss:Type="String">${escaped}</Data></Cell>`;
      }
    });
    xml += `</Row>`;
  });

  xml += `</Table></Worksheet></Workbook>`;

  downloadFile(xml, `${filename}.xls`, 'application/vnd.ms-excel');
};

/**
 * Genera nombre de archivo con fecha
 */
export const generateFilename = (baseName: string): string => {
  const date = new Date().toISOString().split('T')[0];
  return `${baseName}_${date}`;
};

/**
 * Formatea valor para mostrar en exports
 */
export const formatExportValue = (value: any, type: 'currency' | 'date' | 'percent' | 'text' = 'text'): string => {
  if (value === null || value === undefined) return '';
  
  switch (type) {
    case 'currency':
      return typeof value === 'number' ? value.toFixed(2) : value;
    case 'date':
      if (value instanceof Date) return value.toLocaleDateString('es-AR');
      if (typeof value === 'string') return new Date(value).toLocaleDateString('es-AR');
      return value;
    case 'percent':
      return typeof value === 'number' ? `${value}%` : value;
    default:
      return String(value);
  }
};
