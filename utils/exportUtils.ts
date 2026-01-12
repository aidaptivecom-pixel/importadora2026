import * as XLSX from 'xlsx';

// Exportar a Excel
export const exportToExcel = <T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  sheetName: string = 'Datos'
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

// Exportar a CSV
export const exportToCSV = <T extends Record<string, unknown>>(
  data: T[],
  filename: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

// Formatear datos de embarques para exportación
export const formatEmbarquesForExport = (embarques: any[]) => {
  return embarques.map(e => ({
    'ID': e.id,
    'Producto': e.productName,
    'Origen': e.origen,
    'Tipo': e.tipo === 'maritimo' ? 'Marítimo' : 'Aéreo',
    'Estado': e.status,
    'ETA': e.eta,
    'Progreso %': e.progreso,
    'Valor USD': e.value
  }));
};

// Formatear datos de inventario para exportación
export const formatInventarioForExport = (inventario: any[]) => {
  return inventario.map(i => ({
    'SKU': i.sku,
    'Producto': i.nombre,
    'Categoría': i.categoria,
    'Stock': i.stock,
    'Stock Mínimo': i.stockMinimo,
    'Costo USD': i.costoUSD,
    'Precio Venta': i.precioVenta,
    'Ubicación': i.ubicacion,
    'Último Mov.': i.ultimoMovimiento
  }));
};

// Formatear datos de mayoristas para exportación
export const formatMayoristasForExport = (clientes: any[]) => {
  return clientes.map(c => ({
    'ID': c.id,
    'Cliente': c.nombre,
    'Categoría': c.categoria,
    'Deuda USD': c.deuda,
    'Compras Mes USD': c.comprasMes
  }));
};

// Formatear datos de proveedores para exportación
export const formatProveedoresForExport = (proveedores: any[]) => {
  return proveedores.map(p => ({
    'ID': p.id,
    'Proveedor': p.nombre,
    'Ciudad': p.ciudad,
    'Productos': p.productos.join(', '),
    'Rating': p.rating,
    'Compras Total USD': p.comprasTotal,
    'Última Compra': p.ultimaCompra,
    'Estado': p.estado,
    'Contacto': p.contacto
  }));
};

// Formatear datos de operaciones para exportación
export const formatOperacionesForExport = (operaciones: any[]) => {
  return operaciones.map(o => ({
    'ID': o.id,
    'Nombre': o.nombre,
    'Descripción': o.descripcion,
    'Etapa': o.etapa,
    'Riesgo': o.riesgo,
    'Proveedor': o.proveedor,
    'Ciudad': o.proveedorCiudad,
    'Forwarder': o.forwarder,
    'Incoterm': o.incoterm,
    'Transporte': o.tipoTransporte,
    'Fecha PO': o.fechaPO,
    'ETD': o.fechaETD,
    'ETA': o.fechaETA,
    'Monto USD': o.montoTotalUSD,
    'Canal Aduana': o.canalAduana || '-',
    'Responsable': o.responsable
  }));
};
