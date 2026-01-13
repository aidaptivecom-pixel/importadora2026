// ============ EXPORT UTILITIES ============
// Utilidades para exportar datos a Excel y CSV

// ============ COLUMN DEFINITIONS ============
export interface ExportColumn {
  key: string;
  header: string;
}

// ============ COLUMN CONFIGS ============
const embarquesColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'productName', header: 'Producto' },
  { key: 'origen', header: 'Origen' },
  { key: 'tipo', header: 'Tipo' },
  { key: 'status', header: 'Estado' },
  { key: 'eta', header: 'ETA' },
  { key: 'progreso', header: 'Progreso %' },
  { key: 'value', header: 'Valor USD' }
];

const inventarioColumns: ExportColumn[] = [
  { key: 'sku', header: 'SKU' },
  { key: 'nombre', header: 'Producto' },
  { key: 'categoria', header: 'Categoría' },
  { key: 'stock', header: 'Stock' },
  { key: 'stockMinimo', header: 'Stock Mínimo' },
  { key: 'costoUSD', header: 'Costo USD' },
  { key: 'precioVenta', header: 'Precio Venta' },
  { key: 'ubicacion', header: 'Ubicación' },
  { key: 'estado', header: 'Estado' }
];

const mayoristasColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'nombre', header: 'Cliente' },
  { key: 'categoria', header: 'Categoría' },
  { key: 'deuda', header: 'Deuda' },
  { key: 'comprasMes', header: 'Compras Mes' },
  { key: 'estado', header: 'Estado' }
];

const proveedoresColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'nombre', header: 'Proveedor' },
  { key: 'contacto', header: 'Contacto' },
  { key: 'ciudad', header: 'Ciudad' },
  { key: 'productos', header: 'Productos' },
  { key: 'rating', header: 'Rating' },
  { key: 'comprasTotal', header: 'Compras Total' },
  { key: 'ultimaCompra', header: 'Última Compra' },
  { key: 'estado', header: 'Estado' }
];

const operacionesColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'nombre', header: 'Operación' },
  { key: 'etapa', header: 'Etapa' },
  { key: 'riesgo', header: 'Riesgo' },
  { key: 'tipoTransporte', header: 'Transporte' },
  { key: 'proveedorCiudad', header: 'Ciudad Origen' },
  { key: 'montoTotalUSD', header: 'Monto USD' },
  { key: 'fechaETA', header: 'ETA' },
  { key: 'bloqueo', header: 'Bloqueo' },
  { key: 'canalAduana', header: 'Canal Aduana' }
];

/**
 * Convierte un array de objetos a formato CSV
 */
export const convertToCSV = (data: Record<string, any>[], columns: ExportColumn[]): string => {
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
 * Soporta dos formatos:
 * - exportToCSV(data, columns, filename) - formato legacy
 * - exportToCSV({data, columns}, filename) - formato nuevo
 */
export function exportToCSV(
  dataOrWrapped: Record<string, any>[] | { data: Record<string, any>[]; columns: ExportColumn[] },
  columnsOrFilename: ExportColumn[] | string,
  filename?: string
): void {
  let data: Record<string, any>[];
  let columns: ExportColumn[];
  let finalFilename: string;

  // Detect which format is being used
  if (Array.isArray(dataOrWrapped)) {
    // Legacy format: exportToCSV(data, columns, filename)
    data = dataOrWrapped;
    columns = columnsOrFilename as ExportColumn[];
    finalFilename = filename || 'export';
  } else {
    // New format: exportToCSV({data, columns}, filename)
    data = dataOrWrapped.data;
    columns = dataOrWrapped.columns;
    finalFilename = columnsOrFilename as string;
  }

  const csv = convertToCSV(data, columns);
  const dateStr = new Date().toISOString().split('T')[0];
  const name = finalFilename.includes(dateStr) ? finalFilename : `${finalFilename}_${dateStr}`;
  downloadFile(csv, `${name}.csv`, 'text/csv');
}

/**
 * Exporta datos a Excel (formato XML simplificado que Excel puede abrir)
 * Soporta dos formatos:
 * - exportToExcel(data, columns, filename, sheetName) - formato legacy
 * - exportToExcel({data, columns}, filename, sheetName) - formato nuevo
 */
export function exportToExcel(
  dataOrWrapped: Record<string, any>[] | { data: Record<string, any>[]; columns: ExportColumn[] },
  columnsOrFilename: ExportColumn[] | string,
  filenameOrSheetName?: string,
  sheetNameLegacy?: string
): void {
  let data: Record<string, any>[];
  let columns: ExportColumn[];
  let finalFilename: string;
  let sheetName: string;

  // Detect which format is being used
  if (Array.isArray(dataOrWrapped)) {
    // Legacy format: exportToExcel(data, columns, filename, sheetName)
    data = dataOrWrapped;
    columns = columnsOrFilename as ExportColumn[];
    finalFilename = filenameOrSheetName || 'export';
    sheetName = sheetNameLegacy || 'Datos';
  } else {
    // New format: exportToExcel({data, columns}, filename, sheetName)
    data = dataOrWrapped.data;
    columns = dataOrWrapped.columns;
    finalFilename = columnsOrFilename as string;
    sheetName = filenameOrSheetName || 'Datos';
  }

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

  const dateStr = new Date().toISOString().split('T')[0];
  const name = finalFilename.includes(dateStr) ? finalFilename : `${finalFilename}_${dateStr}`;
  downloadFile(xml, `${name}.xls`, 'application/vnd.ms-excel');
}

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

// ============ FORMAT FUNCTIONS ============

/**
 * Formatea embarques para exportación
 */
export const formatEmbarquesForExport = (embarques: any[]): { data: Record<string, any>[]; columns: ExportColumn[] } => {
  const statusLabels: Record<string, string> = {
    transito: 'En Tránsito',
    aduana: 'En Aduana',
    produccion: 'Producción',
    demorado: 'Demorado',
    entregado: 'Entregado'
  };
  
  const tipoLabels: Record<string, string> = {
    maritimo: 'Marítimo',
    aereo: 'Aéreo'
  };

  const data = embarques.map(emb => ({
    ...emb,
    status: statusLabels[emb.status] || emb.status,
    tipo: tipoLabels[emb.tipo] || emb.tipo
  }));

  return { data, columns: embarquesColumns };
};

/**
 * Formatea inventario para exportación
 */
export const formatInventarioForExport = (inventario: any[]): { data: Record<string, any>[]; columns: ExportColumn[] } => {
  const data = inventario.map(item => {
    const isCritical = item.stock <= item.stockMinimo;
    const isOutOfStock = item.stock === 0;
    return {
      ...item,
      estado: isOutOfStock ? 'Sin Stock' : isCritical ? 'Crítico' : 'OK'
    };
  });

  return { data, columns: inventarioColumns };
};

/**
 * Formatea mayoristas para exportación
 */
export const formatMayoristasForExport = (mayoristas: any[]): { data: Record<string, any>[]; columns: ExportColumn[] } => {
  const data = mayoristas.map(cli => ({
    ...cli,
    categoria: `Cat. ${cli.categoria}`,
    estado: cli.deuda === 0 ? 'Al día' : 'Con deuda'
  }));

  return { data, columns: mayoristasColumns };
};

/**
 * Formatea proveedores para exportación
 */
export const formatProveedoresForExport = (proveedores: any[]): { data: Record<string, any>[]; columns: ExportColumn[] } => {
  const estadoLabels: Record<string, string> = {
    activo: 'Activo',
    pendiente: 'Pendiente',
    inactivo: 'Inactivo'
  };

  const data = proveedores.map(prov => ({
    ...prov,
    productos: prov.productos.join(', '),
    estado: estadoLabels[prov.estado] || prov.estado,
    ultimaCompra: new Date(prov.ultimaCompra).toLocaleDateString('es-AR')
  }));

  return { data, columns: proveedoresColumns };
};

/**
 * Formatea operaciones para exportación
 */
export const formatOperacionesForExport = (operaciones: any[]): { data: Record<string, any>[]; columns: ExportColumn[] } => {
  const etapaLabels: Record<string, string> = {
    draft: 'Borrador',
    po_emitida: 'PO Emitida',
    produccion: 'Producción',
    listo_embarque: 'Listo Embarque',
    en_transito: 'En Tránsito',
    arribo: 'Arribo',
    aduana: 'Aduana',
    liberado: 'Liberado',
    deposito: 'Depósito',
    cerrado: 'Cerrado'
  };

  const riesgoLabels: Record<string, string> = {
    bajo: 'Bajo',
    medio: 'Medio',
    alto: 'Alto',
    critico: 'Crítico'
  };

  const transporteLabels: Record<string, string> = {
    maritimo: 'Marítimo',
    aereo: 'Aéreo'
  };

  const data = operaciones.map(op => ({
    ...op,
    etapa: etapaLabels[op.etapa] || op.etapa,
    riesgo: riesgoLabels[op.riesgo] || op.riesgo,
    tipoTransporte: transporteLabels[op.tipoTransporte] || op.tipoTransporte,
    fechaETA: op.fechaETA ? new Date(op.fechaETA).toLocaleDateString('es-AR') : '-',
    bloqueo: op.bloqueo || '-',
    canalAduana: op.canalAduana ? op.canalAduana.toUpperCase() : '-'
  }));

  return { data, columns: operacionesColumns };
};
