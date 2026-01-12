import { ChartDataPoint, KPIStats, Shipment, CategoryStat, ClienteMayorista, EcommerceTienda, Proveedor, InventarioItem, Operacion, UrgentItem, ProximoHito, PagoProximo, CajaBreakdown, ContactoCRM } from './types';

// ══════════════════════════════════════════════════════════════════════════════
// NEXO GLOBAL TRADE - DATOS PARA PROPUESTA DE INVERSIÓN
// Versión: Opción C - Datos inflados pero consistentes
// Inversión: USD 85K - Mes 6 de operación (post break-even)
// Fecha base: Enero 2026
// ══════════════════════════════════════════════════════════════════════════════

export const REVENUE_DATA: ChartDataPoint[] = [
  { month: 'Ene', maritimo: 45000, aereo: 12000 },
  { month: 'Feb', maritimo: 52000, aereo: 14000 },
  { month: 'Mar', maritimo: 58000, aereo: 16000 },
  { month: 'Abr', maritimo: 65000, aereo: 18000 },
  { month: 'May', maritimo: 72000, aereo: 21000 },
  { month: 'Jun', maritimo: 78000, aereo: 24000 },
  { month: 'Jul', maritimo: 85000, aereo: 28000 },
  { month: 'Ago', maritimo: 92000, aereo: 32000 },
  { month: 'Sep', maritimo: 98000, aereo: 35000 },
  { month: 'Oct', maritimo: 105000, aereo: 38000 },
  { month: 'Nov', maritimo: 115000, aereo: 42000 },
  { month: 'Dic', maritimo: 125000, aereo: 48000 },
];

// KPIs consistentes con Dashboard Principal
export const KPIS: KPIStats[] = [
  { label: "Valor en Tránsito", value: "$247,320", growth: 12.4, chartData: [{ val: 30 }, { val: 45 }, { val: 55 }, { val: 70 }, { val: 95 }] },
  { label: "Embarques Activos", value: "8", growth: 2, chartData: [{ val: 20 }, { val: 35 }, { val: 45 }, { val: 60 }, { val: 80 }] },
  { label: "Por Nacionalizar", value: "3", growth: -1, chartData: [{ val: 45 }, { val: 35 }, { val: 50 }, { val: 40 }, { val: 55 }] },
  { label: "Facturado Mes", value: "$891,450", growth: 18.5, chartData: [{ val: 25 }, { val: 40 }, { val: 55 }, { val: 75 }, { val: 100 }] }
];

// Embarques - Fechas actualizadas a 2026
export const RECENT_SHIPMENTS: Shipment[] = [
  { id: "EMB-2025-089", productName: "Electrónica Consumo Masivo", productImage: "https://picsum.photos/40/40?random=1", date: "3 Ene 2026", status: "transito", value: 45000, origen: "Shanghai", tipo: "maritimo", eta: "15 Ene", progreso: 65 },
  { id: "EMB-2025-091", productName: "Accesorios Mascotas Premium", productImage: "https://picsum.photos/40/40?random=2", date: "5 Ene 2026", status: "aduana", value: 28000, origen: "Shenzhen", tipo: "aereo", eta: "10 Ene", progreso: 90 },
  { id: "EMB-2025-092", productName: "Smart Home Devices", productImage: "https://picsum.photos/40/40?random=3", date: "28 Dic 2025", status: "transito", value: 62000, origen: "Ningbo", tipo: "maritimo", eta: "28 Ene", progreso: 35 },
  { id: "EMB-2025-093", productName: "Muñecas Colección 2025", productImage: "https://picsum.photos/40/40?random=4", date: "2 Ene 2026", status: "produccion", value: 38000, origen: "Yiwu", tipo: "maritimo", eta: "10 Feb", progreso: 15 },
  { id: "EMB-2025-094", productName: "Repuestos Electrónicos", productImage: "https://picsum.photos/40/40?random=5", date: "8 Ene 2026", status: "demorado", value: 19500, origen: "Guangzhou", tipo: "aereo", eta: "20 Ene", progreso: 45 }
];

// Categorías de importación - Valores consistentes
export const CATEGORIES: CategoryStat[] = [
  { name: 'Electrónica', value: 385000, color: '#3b82f6' },
  { name: 'Mascotas', value: 245000, color: '#06b6d4' },
  { name: 'Smart Home', value: 168000, color: '#8b5cf6' },
  { name: 'Coleccionables', value: 93450, color: '#f59e0b' },
];

export const DONUT_DATA = [
  { name: 'Mayorista', value: 72, fill: '#3b82f6' },
  { name: 'Ecommerce', value: 28, fill: '#10b981' },
];

// Clientes Mayoristas - Datos consistentes con $715K deuda, $1.11M ventas
export const CLIENTES_MAYORISTAS: ClienteMayorista[] = [
  { id: 'CLI-001', nombre: 'Distribuidora del Sur SRL', categoria: 'A', deuda: 180000, comprasMes: 245000 },
  { id: 'CLI-002', nombre: 'TechStore Argentina', categoria: 'A', deuda: 350000, comprasMes: 412000 },
  { id: 'CLI-003', nombre: 'Electro Mendoza', categoria: 'B', deuda: 0, comprasMes: 89000 },
  { id: 'CLI-004', nombre: 'Importaciones Córdoba SA', categoria: 'A', deuda: 120000, comprasMes: 320000 },
  { id: 'CLI-005', nombre: 'Bazar Express', categoria: 'C', deuda: 65000, comprasMes: 45000 },
];

// Ecommerce - Datos consistentes con $7.35M total
export const ECOMMERCE_STATS: EcommerceTienda[] = [
  { tienda: 'Pet Vogue', ventas: 156, ingresos: 2340000, crecimiento: 18.5 },
  { tienda: 'Royal Dolls', ventas: 89, ingresos: 1890000, crecimiento: 24.1 },
  { tienda: 'CoreSmart', ventas: 67, ingresos: 3120000, crecimiento: 31.2 },
];

// Proveedores China - Datos consistentes con $2.66M compras
export const PROVEEDORES: Proveedor[] = [
  { id: 'PROV-001', nombre: 'Shenzhen Electronics Co.', ciudad: 'Shenzhen', productos: ['Electrónica', 'Smart Home'], rating: 4.8, comprasTotal: 892000, ultimaCompra: '2026-01-04', estado: 'activo', contacto: 'sales@shenzhenelec.cn' },
  { id: 'PROV-002', nombre: 'Yiwu Pet Supplies Ltd.', ciudad: 'Yiwu', productos: ['Mascotas', 'Accesorios Pet'], rating: 4.5, comprasTotal: 456000, ultimaCompra: '2026-01-07', estado: 'activo', contacto: 'export@yiwupet.com' },
  { id: 'PROV-003', nombre: 'Guangzhou Toys Factory', ciudad: 'Guangzhou', productos: ['Juguetes', 'Muñecas'], rating: 4.2, comprasTotal: 324000, ultimaCompra: '2025-12-19', estado: 'activo', contacto: 'info@gztoys.cn' },
  { id: 'PROV-004', nombre: 'Ningbo Smart Tech', ciudad: 'Ningbo', productos: ['Smart Home', 'IoT'], rating: 4.6, comprasTotal: 567000, ultimaCompra: '2026-01-09', estado: 'activo', contacto: 'trade@nbsmart.com' },
  { id: 'PROV-005', nombre: 'Shanghai Components Inc.', ciudad: 'Shanghai', productos: ['Repuestos', 'Componentes'], rating: 3.9, comprasTotal: 189000, ultimaCompra: '2025-11-14', estado: 'pendiente', contacto: 'parts@shcomp.cn' },
  { id: 'PROV-006', nombre: 'Dongguan Accessories', ciudad: 'Dongguan', productos: ['Accesorios Móvil', 'Cables'], rating: 4.1, comprasTotal: 234000, ultimaCompra: '2025-12-27', estado: 'activo', contacto: 'sales@dgacc.com' },
];

// ══════════════════════════════════════════════════════════════════════════════
// INVENTARIO - Stock y costos ajustados para ~$52K valor total
// ══════════════════════════════════════════════════════════════════════════════
export const INVENTARIO: InventarioItem[] = [
  { id: 'INV-001', sku: 'ELEC-CASE-IP15', nombre: 'Fundas iPhone 15 Pro Max', categoria: 'Electrónica', stock: 450, stockMinimo: 200, costoUSD: 2.50, precioVenta: 8500, ubicacion: 'Depósito A - Estante 3', ultimoMovimiento: '2026-01-07' },
  { id: 'INV-002', sku: 'ELEC-CHRG-USBC', nombre: 'Cargadores USB-C 20W', categoria: 'Electrónica', stock: 12, stockMinimo: 100, costoUSD: 3.20, precioVenta: 12000, ubicacion: 'Depósito A - Estante 5', ultimoMovimiento: '2026-01-06' },
  { id: 'INV-003', sku: 'ELEC-AIRPOD-CLN', nombre: 'AirPods Clone Pro', categoria: 'Electrónica', stock: 85, stockMinimo: 50, costoUSD: 12.00, precioVenta: 38000, ubicacion: 'Depósito A - Estante 2', ultimoMovimiento: '2026-01-05' },
  { id: 'INV-004', sku: 'PET-COLLAR-LED', nombre: 'Collares LED Mascotas', categoria: 'Mascotas', stock: 890, stockMinimo: 300, costoUSD: 1.80, precioVenta: 6500, ubicacion: 'Depósito B - Estante 1', ultimoMovimiento: '2026-01-07' },
  { id: 'INV-005', sku: 'SMART-BULB-RGB', nombre: 'Bombillas Smart WiFi RGB', categoria: 'Smart Home', stock: 520, stockMinimo: 200, costoUSD: 4.50, precioVenta: 15000, ubicacion: 'Depósito A - Estante 8', ultimoMovimiento: '2026-01-07' },
  { id: 'INV-006', sku: 'SMART-PLUG-WIFI', nombre: 'Enchufes Inteligentes WiFi', categoria: 'Smart Home', stock: 680, stockMinimo: 250, costoUSD: 3.80, precioVenta: 11000, ubicacion: 'Depósito A - Estante 9', ultimoMovimiento: '2026-01-08' },
  { id: 'INV-007', sku: 'PET-BED-LUX', nombre: 'Camas Luxury Mascotas L', categoria: 'Mascotas', stock: 125, stockMinimo: 50, costoUSD: 18.00, precioVenta: 55000, ubicacion: 'Depósito B - Estante 3', ultimoMovimiento: '2026-01-06' },
  { id: 'INV-008', sku: 'DOLL-COLLECT-25', nombre: 'Muñecas Colección 2025', categoria: 'Coleccionables', stock: 210, stockMinimo: 80, costoUSD: 22.00, precioVenta: 75000, ubicacion: 'Depósito C - Estante 1', ultimoMovimiento: '2026-01-05' }
];

// ══════════════════════════════════════════════════════════════════════════════
// CRM - PIPELINE DE VENTAS Y CONTACTOS
// ══════════════════════════════════════════════════════════════════════════════
export const CRM_CONTACTOS: ContactoCRM[] = [
  {
    id: 'CRM-001', nombre: 'Martín Rodríguez', empresa: 'Electro Rosario SA', cargo: 'Gerente de Compras',
    email: 'mrodriguez@electrorosario.com.ar', telefono: '+54 341 456-7890', ciudad: 'Rosario',
    etapa: 'negociacion', origen: 'referido', valorPotencial: 85000, probabilidad: 70,
    ultimoContacto: '2026-01-10', proximaAccion: 'Enviar cotización actualizada', fechaProximaAccion: '2026-01-14',
    ownerVentas: 'Matías', tags: ['electrónica', 'mayorista', 'prioritario'],
    interacciones: [
      { id: 'INT-001-1', tipo: 'reunion', fecha: '2026-01-10', descripcion: 'Reunión presencial en Rosario. Interesado en lote electrónica Q1.', usuario: 'Matías' },
      { id: 'INT-001-2', tipo: 'email', fecha: '2026-01-08', descripcion: 'Envío de catálogo y lista de precios actualizada.', usuario: 'Matías' },
      { id: 'INT-001-3', tipo: 'llamada', fecha: '2026-01-05', descripcion: 'Primer contacto. Referido por TechStore Argentina.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-12-28'
  },
  {
    id: 'CRM-002', nombre: 'Carolina Vega', empresa: 'PetShop Nordelta', cargo: 'Dueña',
    email: 'carolina@petshopnordelta.com', telefono: '+54 11 5555-1234', ciudad: 'Buenos Aires',
    etapa: 'propuesta', origen: 'web', valorPotencial: 42000, probabilidad: 55,
    ultimoContacto: '2026-01-09', proximaAccion: 'Seguimiento propuesta', fechaProximaAccion: '2026-01-15',
    ownerVentas: 'Matías', tags: ['mascotas', 'retail', 'premium'],
    interacciones: [
      { id: 'INT-002-1', tipo: 'email', fecha: '2026-01-09', descripcion: 'Propuesta enviada para collares LED y camas premium.', usuario: 'Matías' },
      { id: 'INT-002-2', tipo: 'whatsapp', fecha: '2026-01-07', descripcion: 'Conversación sobre productos premium para mascotas.', usuario: 'Matías' },
    ],
    fechaCreacion: '2026-01-03'
  },
  {
    id: 'CRM-003', nombre: 'Roberto Sánchez', empresa: 'Distribuidora Centro', cargo: 'Director Comercial',
    email: 'rsanchez@distcentro.com.ar', telefono: '+54 351 234-5678', ciudad: 'Córdoba',
    etapa: 'contactado', origen: 'feria', valorPotencial: 120000, probabilidad: 35,
    ultimoContacto: '2026-01-06', proximaAccion: 'Agendar videollamada demo', fechaProximaAccion: '2026-01-16',
    ownerVentas: 'Matías', tags: ['mayorista', 'multirubro', 'córdoba'],
    interacciones: [
      { id: 'INT-003-1', tipo: 'llamada', fecha: '2026-01-06', descripcion: 'Llamada de seguimiento post-feria. Interés en Smart Home.', usuario: 'Matías' },
      { id: 'INT-003-2', tipo: 'nota', fecha: '2025-12-15', descripcion: 'Contacto en feria Expo Import 2025. Dejó tarjeta.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-12-15'
  },
  {
    id: 'CRM-004', nombre: 'Ana María López', empresa: 'Juguetería El Reino', cargo: 'Compradora',
    email: 'alopez@elreino.com.ar', telefono: '+54 261 987-6543', ciudad: 'Mendoza',
    etapa: 'lead', origen: 'linkedin', valorPotencial: 35000, probabilidad: 20,
    ultimoContacto: '2026-01-02', proximaAccion: 'Primer llamado', fechaProximaAccion: '2026-01-13',
    ownerVentas: 'Matías', tags: ['juguetes', 'coleccionables', 'mendoza'],
    interacciones: [
      { id: 'INT-004-1', tipo: 'email', fecha: '2026-01-02', descripcion: 'Email introductorio con presentación de empresa.', usuario: 'Matías' },
    ],
    fechaCreacion: '2026-01-02'
  },
  {
    id: 'CRM-005', nombre: 'Diego Martínez', empresa: 'SmartHouse Arg', cargo: 'CEO',
    email: 'diego@smarthouse.com.ar', telefono: '+54 11 4444-9999', ciudad: 'Buenos Aires',
    etapa: 'ganado', origen: 'referido', valorPotencial: 95000, probabilidad: 100,
    ultimoContacto: '2026-01-08', ownerVentas: 'Matías', tags: ['smart home', 'b2b', 'cliente'],
    interacciones: [
      { id: 'INT-005-1', tipo: 'reunion', fecha: '2026-01-08', descripcion: 'Firma de contrato. Primer pedido $95K.', usuario: 'Matías' },
      { id: 'INT-005-2', tipo: 'llamada', fecha: '2026-01-03', descripcion: 'Negociación final de condiciones.', usuario: 'Matías' },
      { id: 'INT-005-3', tipo: 'email', fecha: '2025-12-20', descripcion: 'Propuesta comercial.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-12-10'
  },
  {
    id: 'CRM-006', nombre: 'Lucía Fernández', empresa: 'Bazar Online Store', cargo: 'Gerente General',
    email: 'lucia@bazaronline.com.ar', telefono: '+54 11 3333-7777', ciudad: 'Buenos Aires',
    etapa: 'lead', origen: 'ecommerce', valorPotencial: 28000, probabilidad: 15,
    ultimoContacto: '2025-12-28', proximaAccion: 'Enviar catálogo', fechaProximaAccion: '2026-01-14',
    ownerVentas: 'Matías', tags: ['ecommerce', 'multirubro'],
    interacciones: [
      { id: 'INT-006-1', tipo: 'nota', fecha: '2025-12-28', descripcion: 'Consulta vía web sobre precios mayoristas.', usuario: 'Sistema' },
    ],
    fechaCreacion: '2025-12-28'
  },
  {
    id: 'CRM-007', nombre: 'Pablo Gómez', empresa: 'TecnoPlus Tucumán', cargo: 'Compras',
    email: 'pgomez@tecnoplus.com.ar', telefono: '+54 381 555-2222', ciudad: 'Tucumán',
    etapa: 'contactado', origen: 'llamada_fria', valorPotencial: 55000, probabilidad: 30,
    ultimoContacto: '2026-01-04', proximaAccion: 'Enviar muestras', fechaProximaAccion: '2026-01-17',
    ownerVentas: 'Matías', tags: ['electrónica', 'interior', 'tucumán'],
    interacciones: [
      { id: 'INT-007-1', tipo: 'llamada', fecha: '2026-01-04', descripcion: 'Llamada de prospección. Interés en accesorios móvil.', usuario: 'Matías' },
    ],
    fechaCreacion: '2026-01-04'
  },
  {
    id: 'CRM-008', nombre: 'Verónica Torres', empresa: 'MascotasBA', cargo: 'Fundadora',
    email: 'vero@mascotasba.com', telefono: '+54 11 6666-8888', ciudad: 'Buenos Aires',
    etapa: 'propuesta', origen: 'web', valorPotencial: 38000, probabilidad: 60,
    ultimoContacto: '2026-01-11', proximaAccion: 'Cerrar condiciones', fechaProximaAccion: '2026-01-15',
    ownerVentas: 'Matías', tags: ['mascotas', 'ecommerce', 'premium'],
    interacciones: [
      { id: 'INT-008-1', tipo: 'whatsapp', fecha: '2026-01-11', descripcion: 'Discusión de descuentos por volumen.', usuario: 'Matías' },
      { id: 'INT-008-2', tipo: 'email', fecha: '2026-01-07', descripcion: 'Propuesta formal enviada.', usuario: 'Matías' },
      { id: 'INT-008-3', tipo: 'llamada', fecha: '2026-01-05', descripcion: 'Presentación de línea Pet Vogue.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-12-20'
  },
  {
    id: 'CRM-009', nombre: 'Fernando Ruiz', empresa: 'Casa Smart', cargo: 'Director',
    email: 'fruiz@casasmart.com.ar', telefono: '+54 11 2222-4444', ciudad: 'Buenos Aires',
    etapa: 'negociacion', origen: 'referido', valorPotencial: 72000, probabilidad: 65,
    ultimoContacto: '2026-01-09', proximaAccion: 'Revisar contrato', fechaProximaAccion: '2026-01-16',
    ownerVentas: 'Matías', tags: ['smart home', 'instalador', 'b2b'],
    interacciones: [
      { id: 'INT-009-1', tipo: 'reunion', fecha: '2026-01-09', descripcion: 'Reunión para definir términos del acuerdo.', usuario: 'Matías' },
      { id: 'INT-009-2', tipo: 'email', fecha: '2026-01-06', descripcion: 'Envío de propuesta y condiciones.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-12-18'
  },
  {
    id: 'CRM-010', nombre: 'Silvia Méndez', empresa: 'Toys World', cargo: 'Gerente Compras',
    email: 'smendez@toysworld.com.ar', telefono: '+54 11 7777-3333', ciudad: 'Buenos Aires',
    etapa: 'ganado', origen: 'feria', valorPotencial: 68000, probabilidad: 100,
    ultimoContacto: '2026-01-05', ownerVentas: 'Matías', tags: ['juguetes', 'muñecas', 'cliente'],
    interacciones: [
      { id: 'INT-010-1', tipo: 'reunion', fecha: '2026-01-05', descripcion: 'Pedido confirmado. Muñecas Colección 2025.', usuario: 'Matías' },
      { id: 'INT-010-2', tipo: 'llamada', fecha: '2025-12-22', descripcion: 'Cierre de negociación.', usuario: 'Matías' },
    ],
    fechaCreacion: '2025-11-20'
  },
  {
    id: 'CRM-011', nombre: 'Gustavo Peralta', empresa: 'Import Norte', cargo: 'Socio',
    email: 'gperalta@importnorte.com.ar', telefono: '+54 387 444-1111', ciudad: 'Salta',
    etapa: 'lead', origen: 'web', valorPotencial: 45000, probabilidad: 10,
    ultimoContacto: '2026-01-01', proximaAccion: 'Primer contacto telefónico', fechaProximaAccion: '2026-01-15',
    ownerVentas: 'Matías', tags: ['multirubro', 'interior', 'salta'],
    interacciones: [],
    fechaCreacion: '2026-01-01',
    notas: 'Solicitó información vía formulario web'
  },
  {
    id: 'CRM-012', nombre: 'María José Paz', empresa: 'Deco Smart Living', cargo: 'Compradora',
    email: 'mjpaz@decosmart.com.ar', telefono: '+54 11 5555-6666', ciudad: 'Buenos Aires',
    etapa: 'contactado', origen: 'linkedin', valorPotencial: 32000, probabilidad: 25,
    ultimoContacto: '2026-01-08', proximaAccion: 'Agendar demo productos', fechaProximaAccion: '2026-01-18',
    ownerVentas: 'Matías', tags: ['smart home', 'decoración', 'retail'],
    interacciones: [
      { id: 'INT-012-1', tipo: 'email', fecha: '2026-01-08', descripcion: 'Respuesta a consulta LinkedIn. Envío de info.', usuario: 'Matías' },
    ],
    fechaCreacion: '2026-01-07'
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// OPERACIONES - FECHAS ACTUALIZADAS A 2025-2026
// ══════════════════════════════════════════════════════════════════════════════
export const OPERACIONES: Operacion[] = [
  {
    id: 'OP-097', nombre: 'Juguetes Verano 2025', descripcion: 'Lote verano juguetes y muñecas', etapa: 'produccion', riesgo: 'bajo',
    proveedor: 'Guangzhou Toys Factory', proveedorCiudad: 'Guangzhou', forwarder: 'Kuehne+Nagel', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '9503.00.00', tipoContenedor: 'LCL 8 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-12-20', fechaETD: '2026-01-30', fechaETA: '2026-02-19', fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 45000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 38000, realUSD: 38000 }, { concepto: 'Flete', estimadoUSD: 4500, realUSD: null }, { concepto: 'Gastos destino', estimadoUSD: 2500, realUSD: null }],
    pagos: [{ id: 'PAG-097-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 11400, fechaVencimiento: '2025-12-25', estado: 'pagado' }, { id: 'PAG-097-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 26600, fechaVencimiento: '2026-01-25', estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', fechaRecibido: '2025-12-22', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: '2025-12-20', completado: true }, { tipo: 'produccion_fin', descripcion: 'Fin producción', fecha: '2026-01-25', completado: false }],
    responsable: 'Operaciones', alertas: [], bloqueo: null, proximaAccion: { texto: 'Confirmar fin producción', owner: 'Operaciones' }
  },
  {
    id: 'OP-094', nombre: 'Smart Home Lote 3', descripcion: 'Bombillas, enchufes y sensores WiFi', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Ningbo Smart Tech', proveedorCiudad: 'Ningbo', forwarder: 'MSC', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '8539.50.00', tipoContenedor: 'LCL 10 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-11-28', fechaETD: '2025-12-18', fechaETA: '2026-01-18', fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 32000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 26000, realUSD: 26000 }, { concepto: 'Flete', estimadoUSD: 3800, realUSD: 3800 }],
    pagos: [{ id: 'PAG-094-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 7800, fechaVencimiento: '2025-12-01', estado: 'pagado' }, { id: 'PAG-094-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 18200, fechaVencimiento: '2025-12-15', estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', fechaRecibido: '2025-12-20', obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: '2025-11-28', completado: true }, { tipo: 'etd', descripcion: 'ETD Ningbo', fecha: '2025-12-18', completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2026-01-18', completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: { texto: 'Monitorear tracking', owner: 'Logística' }
  },
  {
    id: 'OP-091', nombre: 'Repuestos Electrónicos', descripcion: 'Componentes y repuestos varios', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Shanghai Components Inc.', proveedorCiudad: 'Shanghai', forwarder: 'Hapag-Lloyd', despachante: 'García & Asociados',
    incoterm: 'FOB Shanghai', ncm: '8529.90.00', tipoContenedor: 'LCL 6 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-11-20', fechaETD: '2025-12-10', fechaETA: '2026-01-27', fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 41000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 35000, realUSD: 35000 }],
    pagos: [{ id: 'PAG-091-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 35000, fechaVencimiento: '2025-11-25', estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'etd', descripcion: 'ETD Shanghai', fecha: '2025-12-10', completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2026-01-27', completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: { texto: 'Gestionar B/L', owner: 'Logística' }
  },
  {
    id: 'OP-092', nombre: 'Accesorios Móvil Q1', descripcion: 'Fundas, cables y cargadores', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Dongguan Accessories', proveedorCiudad: 'Dongguan', forwarder: 'DHL Express', despachante: 'García & Asociados',
    incoterm: 'DAP Buenos Aires', ncm: '8544.42.00', tipoContenedor: 'Aéreo 120kg', tipoTransporte: 'aereo',
    fechaPO: '2025-12-28', fechaETD: '2026-01-05', fechaETA: '2026-01-24', fechaArribo: null, freeTimeDias: 7, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 19000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 15000, realUSD: 15000 }, { concepto: 'Flete aéreo', estimadoUSD: 2800, realUSD: 2800 }],
    pagos: [{ id: 'PAG-092-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 15000, fechaVencimiento: '2025-12-30', estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', fechaRecibido: '2026-01-06', obligatorio: true }],
    hitos: [{ tipo: 'etd', descripcion: 'ETD Dongguan', fecha: '2026-01-05', completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2026-01-24', completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: null
  },
  {
    id: 'OP-089', nombre: 'Electrónica Consumo', descripcion: 'Electrónica de consumo masivo', etapa: 'arribo', riesgo: 'medio',
    proveedor: 'Shenzhen Electronics Co.', proveedorCiudad: 'Shenzhen', forwarder: 'Maersk', despachante: 'García & Asociados',
    incoterm: 'FOB Shenzhen', ncm: '8517.12.00', tipoContenedor: 'LCL 12 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-11-01', fechaETD: '2025-11-20', fechaETA: '2026-01-06', fechaArribo: '2026-01-06', freeTimeDias: 14, freeTimeVence: '2026-01-20',
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 67000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 55000, realUSD: 55000 }, { concepto: 'Flete', estimadoUSD: 6500, realUSD: 6500 }],
    pagos: [{ id: 'PAG-089-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 55000, fechaVencimiento: '2025-11-05', estado: 'pagado' }, { id: 'PAG-089-2', concepto: 'despachante', descripcion: 'Honorarios', montoUSD: 1200, fechaVencimiento: '2026-01-15', estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2026-01-06', completado: true }, { tipo: 'free_time', descripcion: 'Vence free time', fecha: '2026-01-20', completado: false }],
    responsable: 'Logística', alertas: ['1 pago pend.'], bloqueo: null, proximaAccion: { texto: 'Coordinar turno retiro', owner: 'Logística' }
  },
  {
    id: 'OP-072', nombre: 'Pet Supplies Premium', descripcion: 'Accesorios mascotas premium', etapa: 'aduana', riesgo: 'alto',
    proveedor: 'Yiwu Pet Supplies Ltd.', proveedorCiudad: 'Yiwu', forwarder: 'DHL Global', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '4201.00.00', tipoContenedor: 'Aéreo 180kg', tipoTransporte: 'aereo',
    fechaPO: '2025-11-15', fechaETD: '2025-12-05', fechaETA: '2025-12-14', fechaArribo: '2025-12-14', freeTimeDias: 7, freeTimeVence: '2025-12-21',
    canalAduana: 'rojo', observacionesAduana: 'Canal rojo - pendiente respuesta AFIP', montoTotalUSD: 58000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 48000, realUSD: 48000 }, { concepto: 'Flete aéreo', estimadoUSD: 5200, realUSD: 5200 }],
    pagos: [{ id: 'PAG-072-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 48000, fechaVencimiento: '2025-11-20', estado: 'pagado' }, { id: 'PAG-072-2', concepto: 'despachante', descripcion: 'Honorarios + extras', montoUSD: 2800, fechaVencimiento: '2026-01-10', estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2025-12-14', completado: true }],
    responsable: 'Operaciones', alertas: ['Canal rojo - pendiente respuesta...'], bloqueo: 'Canal rojo - pendiente respuesta AFIP', proximaAccion: { texto: 'Responder observación AFIP', owner: 'Operaciones' }
  },
  {
    id: 'OP-088', nombre: 'Juguetes Educativos', descripcion: 'Juguetes didácticos varios', etapa: 'aduana', riesgo: 'medio',
    proveedor: 'Guangzhou Toys Factory', proveedorCiudad: 'Guangzhou', forwarder: 'MSC', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '9503.00.00', tipoContenedor: 'LCL 6 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-10-25', fechaETD: '2025-11-15', fechaETA: '2025-12-27', fechaArribo: '2025-12-27', freeTimeDias: 14, freeTimeVence: '2026-01-10',
    canalAduana: 'naranja', observacionesAduana: 'Canal naranja - validación NCM pendiente', montoTotalUSD: 35000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 28000, realUSD: 28000 }],
    pagos: [{ id: 'PAG-088-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 28000, fechaVencimiento: '2025-10-30', estado: 'pagado' }, { id: 'PAG-088-2', concepto: 'despachante', descripcion: 'Honorarios', montoUSD: 950, fechaVencimiento: '2026-01-08', estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2025-12-27', completado: true }],
    responsable: 'Operaciones', alertas: ['Canal naranja - validación NCM...'], bloqueo: null, proximaAccion: { texto: 'Validar NCM con despachante', owner: 'Operaciones' }
  },
  {
    id: 'OP-086', nombre: 'Accesorios Tech Varios', descripcion: 'Cables, fundas y accesorios', etapa: 'liberado', riesgo: 'bajo',
    proveedor: 'Dongguan Accessories', proveedorCiudad: 'Dongguan', forwarder: 'DHL Express', despachante: 'García & Asociados',
    incoterm: 'DAP Buenos Aires', ncm: '8544.42.00', tipoContenedor: 'Aéreo 95kg', tipoTransporte: 'aereo',
    fechaPO: '2025-11-10', fechaETD: '2025-11-28', fechaETA: '2025-12-19', fechaArribo: '2025-12-19', freeTimeDias: 7, freeTimeVence: '2025-12-26',
    canalAduana: 'verde', observacionesAduana: null, montoTotalUSD: 18000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 14000, realUSD: 14000 }, { concepto: 'Flete aéreo', estimadoUSD: 2200, realUSD: 2200 }],
    pagos: [{ id: 'PAG-086-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 14000, fechaVencimiento: '2025-11-15', estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'validado', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: '2025-12-19', completado: true }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: null
  },
  {
    id: 'OP-098', nombre: 'Accesorios Mascotas Q1', descripcion: 'Collares, correas y accesorios', etapa: 'produccion', riesgo: 'bajo',
    proveedor: 'Yiwu Pet Supplies Ltd.', proveedorCiudad: 'Yiwu', forwarder: 'Hapag-Lloyd', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '4201.00.00', tipoContenedor: 'LCL 5 CBM', tipoTransporte: 'maritimo',
    fechaPO: '2025-12-28', fechaETD: '2026-02-05', fechaETA: '2026-02-24', fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 23000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 18500, realUSD: null }],
    pagos: [{ id: 'PAG-098-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 5550, fechaVencimiento: '2026-01-02', estado: 'pagado' }, { id: 'PAG-098-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 12950, fechaVencimiento: '2026-02-01', estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'pendiente', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: '2025-12-28', completado: true }, { tipo: 'produccion_fin', descripcion: 'Fin producción', fecha: '2026-01-30', completado: false }],
    responsable: 'Operaciones', alertas: [], bloqueo: null, proximaAccion: { texto: 'Seguimiento producción', owner: 'Operaciones' }
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// DATOS HOY - ACTUALIZADOS A ENERO 2026
// ══════════════════════════════════════════════════════════════════════════════

export const URGENT_ITEMS: UrgentItem[] = [
  { id: 'URG-001', tipo: 'aduana', texto: 'Responder observación AFIP - OP-072', operacionId: 'OP-072', owner: 'Operaciones', dueTime: 'Hoy', porQue: 'Canal rojo requiere respuesta urgente', accion: 'operaciones', prioridad: 'alta', ctaLabel: 'Responder AFIP' },
  { id: 'URG-002', tipo: 'aduana', texto: 'Validar NCM canal naranja - OP-088', operacionId: 'OP-088', owner: 'Operaciones', dueTime: 'Hoy', porQue: 'Free time vence 10 Ene', accion: 'operaciones', prioridad: 'alta', ctaLabel: 'Validar NCM' },
  { id: 'URG-003', tipo: 'documento', texto: 'B/L pendiente - OP-091', operacionId: 'OP-091', owner: 'Logística', dueTime: '15 Ene', porQue: 'Sin B/L no se puede iniciar despacho', accion: 'operaciones', prioridad: 'alta', ctaLabel: 'Solicitar B/L' },
  { id: 'URG-004', tipo: 'pago', texto: 'Pagar honorarios OP-089', operacionId: 'OP-089', owner: 'Finanzas', dueTime: '15 Ene', porQue: 'Pendiente para liberar', accion: 'pagos', prioridad: 'media', ctaLabel: 'Registrar pago' },
];

export const PROXIMOS_HITOS: ProximoHito[] = [
  { fecha: '2026-01-10', tipo: 'free_time', descripcion: 'Vence free time', operacionId: 'OP-088', operacionNombre: 'Juguetes Educativos' },
  { fecha: '2026-01-15', tipo: 'pago', descripcion: 'Pago honorarios', operacionId: 'OP-089', operacionNombre: 'Electrónica Consumo' },
  { fecha: '2026-01-18', tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-094', operacionNombre: 'Smart Home Lote 3' },
  { fecha: '2026-01-20', tipo: 'free_time', descripcion: 'Vence free time', operacionId: 'OP-089', operacionNombre: 'Electrónica Consumo' },
  { fecha: '2026-01-24', tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-092', operacionNombre: 'Accesorios Móvil Q1' },
  { fecha: '2026-01-27', tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-091', operacionNombre: 'Repuestos Electrónicos' },
];

export const PAGOS_PROXIMOS: PagoProximo[] = [
  { fecha: '2026-01-10', concepto: 'Honorarios despacho', montoUSD: 2800, operacionId: 'OP-072', beneficiario: 'García & Asociados', categoria: 'despachante' },
  { fecha: '2026-01-15', concepto: 'Honorarios despacho', montoUSD: 1200, operacionId: 'OP-089', beneficiario: 'García & Asociados', categoria: 'despachante' },
  { fecha: '2026-01-25', concepto: 'Saldo proveedor 70%', montoUSD: 26600, operacionId: 'OP-097', beneficiario: 'Guangzhou Toys Factory', categoria: 'proveedor' },
  { fecha: '2026-02-01', concepto: 'Saldo proveedor 70%', montoUSD: 12950, operacionId: 'OP-098', beneficiario: 'Yiwu Pet Supplies', categoria: 'proveedor' },
];

export const CAJA_BREAKDOWN: CajaBreakdown[] = [
  { categoria: 'proveedor', label: 'Proveedores', montoUSD: 39550, color: '#3b82f6' },
  { categoria: 'despachante', label: 'Despachantes', montoUSD: 4000, color: '#8b5cf6' },
];
