import { ChartDataPoint, KPIStats, Shipment, CategoryStat, ClienteMayorista, EcommerceTienda, Proveedor, InventarioItem, Operacion, UrgentItem, ProximoHito, PagoProximo, CajaBreakdown, ContactoCRM } from './types';

// ══════════════════════════════════════════════════════════════════════════════
// NEXO GLOBAL TRADE - DATOS PARA PROPUESTA DE INVERSIÓN
// Versión: Opción C - Datos inflados pero consistentes
// Inversión: USD 85K - Mes 6 de operación (post break-even)
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS - FECHAS DINÁMICAS
// Todas las fechas son relativas a "hoy" para que el demo siempre se vea actual
// ══════════════════════════════════════════════════════════════════════════════

const hoy = new Date();

// Obtener fecha relativa a hoy
const diasAtras = (dias: number): Date => {
  const fecha = new Date(hoy);
  fecha.setDate(fecha.getDate() - dias);
  return fecha;
};

const diasAdelante = (dias: number): Date => {
  const fecha = new Date(hoy);
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};

// Formatear fecha para display: "15 Ene"
const formatFechaCorta = (fecha: Date): string => {
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
};

// Formatear fecha ISO: "2026-01-15"
const formatFechaISO = (fecha: Date): string => {
  return fecha.toISOString().split('T')[0];
};

// Formatear fecha display larga: "15 Ene 2026"
const formatFechaLarga = (fecha: Date): string => {
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ══════════════════════════════════════════════════════════════════════════════
// DATOS ESTÁTICOS (no dependen de fechas)
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

export const KPIS: KPIStats[] = [
  { label: "Valor en Tránsito", value: "$247,320", growth: 12.4, chartData: [{ val: 30 }, { val: 45 }, { val: 55 }, { val: 70 }, { val: 95 }] },
  { label: "Embarques Activos", value: "8", growth: 2, chartData: [{ val: 20 }, { val: 35 }, { val: 45 }, { val: 60 }, { val: 80 }] },
  { label: "Por Nacionalizar", value: "3", growth: -1, chartData: [{ val: 45 }, { val: 35 }, { val: 50 }, { val: 40 }, { val: 55 }] },
  { label: "Facturado Mes", value: "$891,450", growth: 18.5, chartData: [{ val: 25 }, { val: 40 }, { val: 55 }, { val: 75 }, { val: 100 }] }
];

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

export const CLIENTES_MAYORISTAS: ClienteMayorista[] = [
  { id: 'CLI-001', nombre: 'Distribuidora del Sur SRL', categoria: 'A', deuda: 180000, comprasMes: 245000 },
  { id: 'CLI-002', nombre: 'TechStore Argentina', categoria: 'A', deuda: 350000, comprasMes: 412000 },
  { id: 'CLI-003', nombre: 'Electro Mendoza', categoria: 'B', deuda: 0, comprasMes: 89000 },
  { id: 'CLI-004', nombre: 'Importaciones Córdoba SA', categoria: 'A', deuda: 120000, comprasMes: 320000 },
  { id: 'CLI-005', nombre: 'Bazar Express', categoria: 'C', deuda: 65000, comprasMes: 45000 },
];

export const ECOMMERCE_STATS: EcommerceTienda[] = [
  { tienda: 'Pet Vogue', ventas: 156, ingresos: 2340000, crecimiento: 18.5 },
  { tienda: 'Royal Dolls', ventas: 89, ingresos: 1890000, crecimiento: 24.1 },
  { tienda: 'CoreSmart', ventas: 67, ingresos: 3120000, crecimiento: 31.2 },
];

// ══════════════════════════════════════════════════════════════════════════════
// EMBARQUES - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

export const RECENT_SHIPMENTS: Shipment[] = [
  { id: "EMB-2025-089", productName: "Electrónica Consumo Masivo", productImage: "https://picsum.photos/40/40?random=1", date: formatFechaLarga(diasAtras(10)), status: "transito", value: 45000, origen: "Shanghai", tipo: "maritimo", eta: formatFechaCorta(diasAdelante(5)), progreso: 65 },
  { id: "EMB-2025-091", productName: "Accesorios Mascotas Premium", productImage: "https://picsum.photos/40/40?random=2", date: formatFechaLarga(diasAtras(8)), status: "aduana", value: 28000, origen: "Shenzhen", tipo: "aereo", eta: formatFechaCorta(diasAdelante(2)), progreso: 90 },
  { id: "EMB-2025-092", productName: "Smart Home Devices", productImage: "https://picsum.photos/40/40?random=3", date: formatFechaLarga(diasAtras(15)), status: "transito", value: 62000, origen: "Ningbo", tipo: "maritimo", eta: formatFechaCorta(diasAdelante(18)), progreso: 35 },
  { id: "EMB-2025-093", productName: "Muñecas Colección 2025", productImage: "https://picsum.photos/40/40?random=4", date: formatFechaLarga(diasAtras(11)), status: "produccion", value: 38000, origen: "Yiwu", tipo: "maritimo", eta: formatFechaCorta(diasAdelante(30)), progreso: 15 },
  { id: "EMB-2025-094", productName: "Repuestos Electrónicos", productImage: "https://picsum.photos/40/40?random=5", date: formatFechaLarga(diasAtras(5)), status: "demorado", value: 19500, origen: "Guangzhou", tipo: "aereo", eta: formatFechaCorta(diasAdelante(10)), progreso: 45 }
];

// ══════════════════════════════════════════════════════════════════════════════
// PROVEEDORES - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

export const PROVEEDORES: Proveedor[] = [
  { id: 'PROV-001', nombre: 'Shenzhen Electronics Co.', ciudad: 'Shenzhen', productos: ['Electrónica', 'Smart Home'], rating: 4.8, comprasTotal: 892000, ultimaCompra: formatFechaISO(diasAtras(9)), estado: 'activo', contacto: 'sales@shenzhenelec.cn' },
  { id: 'PROV-002', nombre: 'Yiwu Pet Supplies Ltd.', ciudad: 'Yiwu', productos: ['Mascotas', 'Accesorios Pet'], rating: 4.5, comprasTotal: 456000, ultimaCompra: formatFechaISO(diasAtras(6)), estado: 'activo', contacto: 'export@yiwupet.com' },
  { id: 'PROV-003', nombre: 'Guangzhou Toys Factory', ciudad: 'Guangzhou', productos: ['Juguetes', 'Muñecas'], rating: 4.2, comprasTotal: 324000, ultimaCompra: formatFechaISO(diasAtras(25)), estado: 'activo', contacto: 'info@gztoys.cn' },
  { id: 'PROV-004', nombre: 'Ningbo Smart Tech', ciudad: 'Ningbo', productos: ['Smart Home', 'IoT'], rating: 4.6, comprasTotal: 567000, ultimaCompra: formatFechaISO(diasAtras(4)), estado: 'activo', contacto: 'trade@nbsmart.com' },
  { id: 'PROV-005', nombre: 'Shanghai Components Inc.', ciudad: 'Shanghai', productos: ['Repuestos', 'Componentes'], rating: 3.9, comprasTotal: 189000, ultimaCompra: formatFechaISO(diasAtras(60)), estado: 'pendiente', contacto: 'parts@shcomp.cn' },
  { id: 'PROV-006', nombre: 'Dongguan Accessories', ciudad: 'Dongguan', productos: ['Accesorios Móvil', 'Cables'], rating: 4.1, comprasTotal: 234000, ultimaCompra: formatFechaISO(diasAtras(17)), estado: 'activo', contacto: 'sales@dgacc.com' },
];

// ══════════════════════════════════════════════════════════════════════════════
// INVENTARIO - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

export const INVENTARIO: InventarioItem[] = [
  { id: 'INV-001', sku: 'ELEC-CASE-IP15', nombre: 'Fundas iPhone 15 Pro Max', categoria: 'Electrónica', stock: 450, stockMinimo: 200, costoUSD: 2.50, precioVenta: 8500, ubicacion: 'Depósito A - Estante 3', ultimoMovimiento: formatFechaISO(diasAtras(3)) },
  { id: 'INV-002', sku: 'ELEC-CHRG-USBC', nombre: 'Cargadores USB-C 20W', categoria: 'Electrónica', stock: 12, stockMinimo: 100, costoUSD: 3.20, precioVenta: 12000, ubicacion: 'Depósito A - Estante 5', ultimoMovimiento: formatFechaISO(diasAtras(4)) },
  { id: 'INV-003', sku: 'ELEC-AIRPOD-CLN', nombre: 'AirPods Clone Pro', categoria: 'Electrónica', stock: 85, stockMinimo: 50, costoUSD: 12.00, precioVenta: 38000, ubicacion: 'Depósito A - Estante 2', ultimoMovimiento: formatFechaISO(diasAtras(5)) },
  { id: 'INV-004', sku: 'PET-COLLAR-LED', nombre: 'Collares LED Mascotas', categoria: 'Mascotas', stock: 890, stockMinimo: 300, costoUSD: 1.80, precioVenta: 6500, ubicacion: 'Depósito B - Estante 1', ultimoMovimiento: formatFechaISO(diasAtras(3)) },
  { id: 'INV-005', sku: 'SMART-BULB-RGB', nombre: 'Bombillas Smart WiFi RGB', categoria: 'Smart Home', stock: 520, stockMinimo: 200, costoUSD: 4.50, precioVenta: 15000, ubicacion: 'Depósito A - Estante 8', ultimoMovimiento: formatFechaISO(diasAtras(3)) },
  { id: 'INV-006', sku: 'SMART-PLUG-WIFI', nombre: 'Enchufes Inteligentes WiFi', categoria: 'Smart Home', stock: 680, stockMinimo: 250, costoUSD: 3.80, precioVenta: 11000, ubicacion: 'Depósito A - Estante 9', ultimoMovimiento: formatFechaISO(diasAtras(2)) },
  { id: 'INV-007', sku: 'PET-BED-LUX', nombre: 'Camas Luxury Mascotas L', categoria: 'Mascotas', stock: 125, stockMinimo: 50, costoUSD: 18.00, precioVenta: 55000, ubicacion: 'Depósito B - Estante 3', ultimoMovimiento: formatFechaISO(diasAtras(4)) },
  { id: 'INV-008', sku: 'DOLL-COLLECT-25', nombre: 'Muñecas Colección 2025', categoria: 'Coleccionables', stock: 210, stockMinimo: 80, costoUSD: 22.00, precioVenta: 75000, ubicacion: 'Depósito C - Estante 1', ultimoMovimiento: formatFechaISO(diasAtras(5)) }
];

// ══════════════════════════════════════════════════════════════════════════════
// CRM - PIPELINE DE VENTAS Y CONTACTOS (FECHAS DINÁMICAS)
// ══════════════════════════════════════════════════════════════════════════════

export const CRM_CONTACTOS: ContactoCRM[] = [
  {
    id: 'CRM-001', nombre: 'Martín Rodríguez', empresa: 'Electro Rosario SA', cargo: 'Gerente de Compras',
    email: 'mrodriguez@electrorosario.com.ar', telefono: '+54 341 456-7890', ciudad: 'Rosario',
    etapa: 'negociacion', origen: 'referido', valorPotencial: 85000, probabilidad: 70,
    ultimoContacto: formatFechaISO(diasAtras(3)), proximaAccion: 'Enviar cotización actualizada', fechaProximaAccion: formatFechaISO(diasAdelante(1)),
    ownerVentas: 'Matías', tags: ['electrónica', 'mayorista', 'prioritario'],
    interacciones: [
      { id: 'INT-001-1', tipo: 'reunion', fecha: formatFechaISO(diasAtras(3)), descripcion: 'Reunión presencial en Rosario. Interesado en lote electrónica Q1.', usuario: 'Matías' },
      { id: 'INT-001-2', tipo: 'email', fecha: formatFechaISO(diasAtras(5)), descripcion: 'Envío de catálogo y lista de precios actualizada.', usuario: 'Matías' },
      { id: 'INT-001-3', tipo: 'llamada', fecha: formatFechaISO(diasAtras(8)), descripcion: 'Primer contacto. Referido por TechStore Argentina.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(16))
  },
  {
    id: 'CRM-002', nombre: 'Carolina Vega', empresa: 'PetShop Nordelta', cargo: 'Dueña',
    email: 'carolina@petshopnordelta.com', telefono: '+54 11 5555-1234', ciudad: 'Buenos Aires',
    etapa: 'propuesta', origen: 'web', valorPotencial: 42000, probabilidad: 55,
    ultimoContacto: formatFechaISO(diasAtras(4)), proximaAccion: 'Seguimiento propuesta', fechaProximaAccion: formatFechaISO(diasAdelante(2)),
    ownerVentas: 'Matías', tags: ['mascotas', 'retail', 'premium'],
    interacciones: [
      { id: 'INT-002-1', tipo: 'email', fecha: formatFechaISO(diasAtras(4)), descripcion: 'Propuesta enviada para collares LED y camas premium.', usuario: 'Matías' },
      { id: 'INT-002-2', tipo: 'whatsapp', fecha: formatFechaISO(diasAtras(6)), descripcion: 'Conversación sobre productos premium para mascotas.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(10))
  },
  {
    id: 'CRM-003', nombre: 'Roberto Sánchez', empresa: 'Distribuidora Centro', cargo: 'Director Comercial',
    email: 'rsanchez@distcentro.com.ar', telefono: '+54 351 234-5678', ciudad: 'Córdoba',
    etapa: 'contactado', origen: 'feria', valorPotencial: 120000, probabilidad: 35,
    ultimoContacto: formatFechaISO(diasAtras(7)), proximaAccion: 'Agendar videollamada demo', fechaProximaAccion: formatFechaISO(diasAdelante(3)),
    ownerVentas: 'Matías', tags: ['mayorista', 'multirubro', 'córdoba'],
    interacciones: [
      { id: 'INT-003-1', tipo: 'llamada', fecha: formatFechaISO(diasAtras(7)), descripcion: 'Llamada de seguimiento post-feria. Interés en Smart Home.', usuario: 'Matías' },
      { id: 'INT-003-2', tipo: 'nota', fecha: formatFechaISO(diasAtras(29)), descripcion: 'Contacto en feria Expo Import 2025. Dejó tarjeta.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(29))
  },
  {
    id: 'CRM-004', nombre: 'Ana María López', empresa: 'Juguetería El Reino', cargo: 'Compradora',
    email: 'alopez@elreino.com.ar', telefono: '+54 261 987-6543', ciudad: 'Mendoza',
    etapa: 'lead', origen: 'linkedin', valorPotencial: 35000, probabilidad: 20,
    ultimoContacto: formatFechaISO(diasAtras(11)), proximaAccion: 'Primer llamado', fechaProximaAccion: formatFechaISO(hoy),
    ownerVentas: 'Matías', tags: ['juguetes', 'coleccionables', 'mendoza'],
    interacciones: [
      { id: 'INT-004-1', tipo: 'email', fecha: formatFechaISO(diasAtras(11)), descripcion: 'Email introductorio con presentación de empresa.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(11))
  },
  {
    id: 'CRM-005', nombre: 'Diego Martínez', empresa: 'SmartHouse Arg', cargo: 'CEO',
    email: 'diego@smarthouse.com.ar', telefono: '+54 11 4444-9999', ciudad: 'Buenos Aires',
    etapa: 'ganado', origen: 'referido', valorPotencial: 95000, probabilidad: 100,
    ultimoContacto: formatFechaISO(diasAtras(5)), ownerVentas: 'Matías', tags: ['smart home', 'b2b', 'cliente'],
    interacciones: [
      { id: 'INT-005-1', tipo: 'reunion', fecha: formatFechaISO(diasAtras(5)), descripcion: 'Firma de contrato. Primer pedido $95K.', usuario: 'Matías' },
      { id: 'INT-005-2', tipo: 'llamada', fecha: formatFechaISO(diasAtras(10)), descripcion: 'Negociación final de condiciones.', usuario: 'Matías' },
      { id: 'INT-005-3', tipo: 'email', fecha: formatFechaISO(diasAtras(24)), descripcion: 'Propuesta comercial.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(34))
  },
  {
    id: 'CRM-006', nombre: 'Lucía Fernández', empresa: 'Bazar Online Store', cargo: 'Gerente General',
    email: 'lucia@bazaronline.com.ar', telefono: '+54 11 3333-7777', ciudad: 'Buenos Aires',
    etapa: 'lead', origen: 'ecommerce', valorPotencial: 28000, probabilidad: 15,
    ultimoContacto: formatFechaISO(diasAtras(16)), proximaAccion: 'Enviar catálogo', fechaProximaAccion: formatFechaISO(diasAdelante(1)),
    ownerVentas: 'Matías', tags: ['ecommerce', 'multirubro'],
    interacciones: [
      { id: 'INT-006-1', tipo: 'nota', fecha: formatFechaISO(diasAtras(16)), descripcion: 'Consulta vía web sobre precios mayoristas.', usuario: 'Sistema' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(16))
  },
  {
    id: 'CRM-007', nombre: 'Pablo Gómez', empresa: 'TecnoPlus Tucumán', cargo: 'Compras',
    email: 'pgomez@tecnoplus.com.ar', telefono: '+54 381 555-2222', ciudad: 'Tucumán',
    etapa: 'contactado', origen: 'llamada_fria', valorPotencial: 55000, probabilidad: 30,
    ultimoContacto: formatFechaISO(diasAtras(9)), proximaAccion: 'Enviar muestras', fechaProximaAccion: formatFechaISO(diasAdelante(4)),
    ownerVentas: 'Matías', tags: ['electrónica', 'interior', 'tucumán'],
    interacciones: [
      { id: 'INT-007-1', tipo: 'llamada', fecha: formatFechaISO(diasAtras(9)), descripcion: 'Llamada de prospección. Interés en accesorios móvil.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(9))
  },
  {
    id: 'CRM-008', nombre: 'Verónica Torres', empresa: 'MascotasBA', cargo: 'Fundadora',
    email: 'vero@mascotasba.com', telefono: '+54 11 6666-8888', ciudad: 'Buenos Aires',
    etapa: 'propuesta', origen: 'web', valorPotencial: 38000, probabilidad: 60,
    ultimoContacto: formatFechaISO(diasAtras(2)), proximaAccion: 'Cerrar condiciones', fechaProximaAccion: formatFechaISO(diasAdelante(2)),
    ownerVentas: 'Matías', tags: ['mascotas', 'ecommerce', 'premium'],
    interacciones: [
      { id: 'INT-008-1', tipo: 'whatsapp', fecha: formatFechaISO(diasAtras(2)), descripcion: 'Discusión de descuentos por volumen.', usuario: 'Matías' },
      { id: 'INT-008-2', tipo: 'email', fecha: formatFechaISO(diasAtras(6)), descripcion: 'Propuesta formal enviada.', usuario: 'Matías' },
      { id: 'INT-008-3', tipo: 'llamada', fecha: formatFechaISO(diasAtras(8)), descripcion: 'Presentación de línea Pet Vogue.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(24))
  },
  {
    id: 'CRM-009', nombre: 'Fernando Ruiz', empresa: 'Casa Smart', cargo: 'Director',
    email: 'fruiz@casasmart.com.ar', telefono: '+54 11 2222-4444', ciudad: 'Buenos Aires',
    etapa: 'negociacion', origen: 'referido', valorPotencial: 72000, probabilidad: 65,
    ultimoContacto: formatFechaISO(diasAtras(4)), proximaAccion: 'Revisar contrato', fechaProximaAccion: formatFechaISO(diasAdelante(3)),
    ownerVentas: 'Matías', tags: ['smart home', 'instalador', 'b2b'],
    interacciones: [
      { id: 'INT-009-1', tipo: 'reunion', fecha: formatFechaISO(diasAtras(4)), descripcion: 'Reunión para definir términos del acuerdo.', usuario: 'Matías' },
      { id: 'INT-009-2', tipo: 'email', fecha: formatFechaISO(diasAtras(7)), descripcion: 'Envío de propuesta y condiciones.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(26))
  },
  {
    id: 'CRM-010', nombre: 'Silvia Méndez', empresa: 'Toys World', cargo: 'Gerente Compras',
    email: 'smendez@toysworld.com.ar', telefono: '+54 11 7777-3333', ciudad: 'Buenos Aires',
    etapa: 'ganado', origen: 'feria', valorPotencial: 68000, probabilidad: 100,
    ultimoContacto: formatFechaISO(diasAtras(8)), ownerVentas: 'Matías', tags: ['juguetes', 'muñecas', 'cliente'],
    interacciones: [
      { id: 'INT-010-1', tipo: 'reunion', fecha: formatFechaISO(diasAtras(8)), descripcion: 'Pedido confirmado. Muñecas Colección 2025.', usuario: 'Matías' },
      { id: 'INT-010-2', tipo: 'llamada', fecha: formatFechaISO(diasAtras(22)), descripcion: 'Cierre de negociación.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(54))
  },
  {
    id: 'CRM-011', nombre: 'Gustavo Peralta', empresa: 'Import Norte', cargo: 'Socio',
    email: 'gperalta@importnorte.com.ar', telefono: '+54 387 444-1111', ciudad: 'Salta',
    etapa: 'lead', origen: 'web', valorPotencial: 45000, probabilidad: 10,
    ultimoContacto: formatFechaISO(diasAtras(12)), proximaAccion: 'Primer contacto telefónico', fechaProximaAccion: formatFechaISO(diasAdelante(2)),
    ownerVentas: 'Matías', tags: ['multirubro', 'interior', 'salta'],
    interacciones: [],
    fechaCreacion: formatFechaISO(diasAtras(12)),
    notas: 'Solicitó información vía formulario web'
  },
  {
    id: 'CRM-012', nombre: 'María José Paz', empresa: 'Deco Smart Living', cargo: 'Compradora',
    email: 'mjpaz@decosmart.com.ar', telefono: '+54 11 5555-6666', ciudad: 'Buenos Aires',
    etapa: 'contactado', origen: 'linkedin', valorPotencial: 32000, probabilidad: 25,
    ultimoContacto: formatFechaISO(diasAtras(5)), proximaAccion: 'Agendar demo productos', fechaProximaAccion: formatFechaISO(diasAdelante(5)),
    ownerVentas: 'Matías', tags: ['smart home', 'decoración', 'retail'],
    interacciones: [
      { id: 'INT-012-1', tipo: 'email', fecha: formatFechaISO(diasAtras(5)), descripcion: 'Respuesta a consulta LinkedIn. Envío de info.', usuario: 'Matías' },
    ],
    fechaCreacion: formatFechaISO(diasAtras(6))
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// OPERACIONES - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

export const OPERACIONES: Operacion[] = [
  {
    id: 'OP-097', nombre: 'Juguetes Verano 2025', descripcion: 'Lote verano juguetes y muñecas', etapa: 'produccion', riesgo: 'bajo',
    proveedor: 'Guangzhou Toys Factory', proveedorCiudad: 'Guangzhou', forwarder: 'Kuehne+Nagel', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '9503.00.00', tipoContenedor: 'LCL 8 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(24)), fechaETD: formatFechaISO(diasAdelante(17)), fechaETA: formatFechaISO(diasAdelante(37)), fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 45000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 38000, realUSD: 38000 }, { concepto: 'Flete', estimadoUSD: 4500, realUSD: null }, { concepto: 'Gastos destino', estimadoUSD: 2500, realUSD: null }],
    pagos: [{ id: 'PAG-097-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 11400, fechaVencimiento: formatFechaISO(diasAtras(19)), estado: 'pagado' }, { id: 'PAG-097-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 26600, fechaVencimiento: formatFechaISO(diasAdelante(12)), estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', fechaRecibido: formatFechaISO(diasAtras(22)), obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: formatFechaISO(diasAtras(24)), completado: true }, { tipo: 'produccion_fin', descripcion: 'Fin producción', fecha: formatFechaISO(diasAdelante(12)), completado: false }],
    responsable: 'Operaciones', alertas: [], bloqueo: null, proximaAccion: { texto: 'Confirmar fin producción', owner: 'Operaciones' }
  },
  {
    id: 'OP-094', nombre: 'Smart Home Lote 3', descripcion: 'Bombillas, enchufes y sensores WiFi', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Ningbo Smart Tech', proveedorCiudad: 'Ningbo', forwarder: 'MSC', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '8539.50.00', tipoContenedor: 'LCL 10 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(46)), fechaETD: formatFechaISO(diasAtras(26)), fechaETA: formatFechaISO(diasAdelante(5)), fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 32000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 26000, realUSD: 26000 }, { concepto: 'Flete', estimadoUSD: 3800, realUSD: 3800 }],
    pagos: [{ id: 'PAG-094-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 7800, fechaVencimiento: formatFechaISO(diasAtras(43)), estado: 'pagado' }, { id: 'PAG-094-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 18200, fechaVencimiento: formatFechaISO(diasAtras(29)), estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', fechaRecibido: formatFechaISO(diasAtras(24)), obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: formatFechaISO(diasAtras(46)), completado: true }, { tipo: 'etd', descripcion: 'ETD Ningbo', fecha: formatFechaISO(diasAtras(26)), completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAdelante(5)), completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: { texto: 'Monitorear tracking', owner: 'Logística' }
  },
  {
    id: 'OP-091', nombre: 'Repuestos Electrónicos', descripcion: 'Componentes y repuestos varios', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Shanghai Components Inc.', proveedorCiudad: 'Shanghai', forwarder: 'Hapag-Lloyd', despachante: 'García & Asociados',
    incoterm: 'FOB Shanghai', ncm: '8529.90.00', tipoContenedor: 'LCL 6 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(54)), fechaETD: formatFechaISO(diasAtras(34)), fechaETA: formatFechaISO(diasAdelante(14)), fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 41000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 35000, realUSD: 35000 }],
    pagos: [{ id: 'PAG-091-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 35000, fechaVencimiento: formatFechaISO(diasAtras(49)), estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'etd', descripcion: 'ETD Shanghai', fecha: formatFechaISO(diasAtras(34)), completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAdelante(14)), completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: { texto: 'Gestionar B/L', owner: 'Logística' }
  },
  {
    id: 'OP-092', nombre: 'Accesorios Móvil Q1', descripcion: 'Fundas, cables y cargadores', etapa: 'en_transito', riesgo: 'bajo',
    proveedor: 'Dongguan Accessories', proveedorCiudad: 'Dongguan', forwarder: 'DHL Express', despachante: 'García & Asociados',
    incoterm: 'DAP Buenos Aires', ncm: '8544.42.00', tipoContenedor: 'Aéreo 120kg', tipoTransporte: 'aereo',
    fechaPO: formatFechaISO(diasAtras(16)), fechaETD: formatFechaISO(diasAtras(8)), fechaETA: formatFechaISO(diasAdelante(11)), fechaArribo: null, freeTimeDias: 7, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 19000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 15000, realUSD: 15000 }, { concepto: 'Flete aéreo', estimadoUSD: 2800, realUSD: 2800 }],
    pagos: [{ id: 'PAG-092-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 15000, fechaVencimiento: formatFechaISO(diasAtras(14)), estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', fechaRecibido: formatFechaISO(diasAtras(7)), obligatorio: true }],
    hitos: [{ tipo: 'etd', descripcion: 'ETD Dongguan', fecha: formatFechaISO(diasAtras(8)), completado: true }, { tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAdelante(11)), completado: false }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: null
  },
  {
    id: 'OP-089', nombre: 'Electrónica Consumo', descripcion: 'Electrónica de consumo masivo', etapa: 'arribo', riesgo: 'medio',
    proveedor: 'Shenzhen Electronics Co.', proveedorCiudad: 'Shenzhen', forwarder: 'Maersk', despachante: 'García & Asociados',
    incoterm: 'FOB Shenzhen', ncm: '8517.12.00', tipoContenedor: 'LCL 12 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(73)), fechaETD: formatFechaISO(diasAtras(54)), fechaETA: formatFechaISO(diasAtras(7)), fechaArribo: formatFechaISO(diasAtras(7)), freeTimeDias: 14, freeTimeVence: formatFechaISO(diasAdelante(7)),
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 67000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 55000, realUSD: 55000 }, { concepto: 'Flete', estimadoUSD: 6500, realUSD: 6500 }],
    pagos: [{ id: 'PAG-089-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 55000, fechaVencimiento: formatFechaISO(diasAtras(69)), estado: 'pagado' }, { id: 'PAG-089-2', concepto: 'despachante', descripcion: 'Honorarios', montoUSD: 1200, fechaVencimiento: formatFechaISO(diasAdelante(2)), estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAtras(7)), completado: true }, { tipo: 'free_time', descripcion: 'Vence free time', fecha: formatFechaISO(diasAdelante(7)), completado: false }],
    responsable: 'Logística', alertas: ['1 pago pend.'], bloqueo: null, proximaAccion: { texto: 'Coordinar turno retiro', owner: 'Logística' }
  },
  {
    id: 'OP-072', nombre: 'Pet Supplies Premium', descripcion: 'Accesorios mascotas premium', etapa: 'aduana', riesgo: 'alto',
    proveedor: 'Yiwu Pet Supplies Ltd.', proveedorCiudad: 'Yiwu', forwarder: 'DHL Global', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '4201.00.00', tipoContenedor: 'Aéreo 180kg', tipoTransporte: 'aereo',
    fechaPO: formatFechaISO(diasAtras(59)), fechaETD: formatFechaISO(diasAtras(39)), fechaETA: formatFechaISO(diasAtras(30)), fechaArribo: formatFechaISO(diasAtras(30)), freeTimeDias: 7, freeTimeVence: formatFechaISO(diasAtras(23)),
    canalAduana: 'rojo', observacionesAduana: 'Canal rojo - pendiente respuesta AFIP', montoTotalUSD: 58000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 48000, realUSD: 48000 }, { concepto: 'Flete aéreo', estimadoUSD: 5200, realUSD: 5200 }],
    pagos: [{ id: 'PAG-072-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 48000, fechaVencimiento: formatFechaISO(diasAtras(54)), estado: 'pagado' }, { id: 'PAG-072-2', concepto: 'despachante', descripcion: 'Honorarios + extras', montoUSD: 2800, fechaVencimiento: formatFechaISO(diasAtras(3)), estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAtras(30)), completado: true }],
    responsable: 'Operaciones', alertas: ['Canal rojo - pendiente respuesta...'], bloqueo: 'Canal rojo - pendiente respuesta AFIP', proximaAccion: { texto: 'Responder observación AFIP', owner: 'Operaciones' }
  },
  {
    id: 'OP-088', nombre: 'Juguetes Educativos', descripcion: 'Juguetes didácticos varios', etapa: 'aduana', riesgo: 'medio',
    proveedor: 'Guangzhou Toys Factory', proveedorCiudad: 'Guangzhou', forwarder: 'MSC', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '9503.00.00', tipoContenedor: 'LCL 6 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(80)), fechaETD: formatFechaISO(diasAtras(59)), fechaETA: formatFechaISO(diasAtras(17)), fechaArribo: formatFechaISO(diasAtras(17)), freeTimeDias: 14, freeTimeVence: formatFechaISO(diasAtras(3)),
    canalAduana: 'naranja', observacionesAduana: 'Canal naranja - validación NCM pendiente', montoTotalUSD: 35000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 28000, realUSD: 28000 }],
    pagos: [{ id: 'PAG-088-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 28000, fechaVencimiento: formatFechaISO(diasAtras(75)), estado: 'pagado' }, { id: 'PAG-088-2', concepto: 'despachante', descripcion: 'Honorarios', montoUSD: 950, fechaVencimiento: formatFechaISO(diasAtras(5)), estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAtras(17)), completado: true }],
    responsable: 'Operaciones', alertas: ['Canal naranja - validación NCM...'], bloqueo: null, proximaAccion: { texto: 'Validar NCM con despachante', owner: 'Operaciones' }
  },
  {
    id: 'OP-086', nombre: 'Accesorios Tech Varios', descripcion: 'Cables, fundas y accesorios', etapa: 'liberado', riesgo: 'bajo',
    proveedor: 'Dongguan Accessories', proveedorCiudad: 'Dongguan', forwarder: 'DHL Express', despachante: 'García & Asociados',
    incoterm: 'DAP Buenos Aires', ncm: '8544.42.00', tipoContenedor: 'Aéreo 95kg', tipoTransporte: 'aereo',
    fechaPO: formatFechaISO(diasAtras(64)), fechaETD: formatFechaISO(diasAtras(46)), fechaETA: formatFechaISO(diasAtras(25)), fechaArribo: formatFechaISO(diasAtras(25)), freeTimeDias: 7, freeTimeVence: formatFechaISO(diasAtras(18)),
    canalAduana: 'verde', observacionesAduana: null, montoTotalUSD: 18000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 14000, realUSD: 14000 }, { concepto: 'Flete aéreo', estimadoUSD: 2200, realUSD: 2200 }],
    pagos: [{ id: 'PAG-086-1', concepto: 'anticipo_proveedor', descripcion: 'Pago total', montoUSD: 14000, fechaVencimiento: formatFechaISO(diasAtras(59)), estado: 'pagado' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'validado', obligatorio: true }, { tipo: 'awb', nombre: 'AWB', estado: 'validado', obligatorio: true }, { tipo: 'dui', nombre: 'DUI', estado: 'validado', obligatorio: true }],
    hitos: [{ tipo: 'eta', descripcion: 'ETA Buenos Aires', fecha: formatFechaISO(diasAtras(25)), completado: true }],
    responsable: 'Logística', alertas: [], bloqueo: null, proximaAccion: null
  },
  {
    id: 'OP-098', nombre: 'Accesorios Mascotas Q1', descripcion: 'Collares, correas y accesorios', etapa: 'produccion', riesgo: 'bajo',
    proveedor: 'Yiwu Pet Supplies Ltd.', proveedorCiudad: 'Yiwu', forwarder: 'Hapag-Lloyd', despachante: 'García & Asociados',
    incoterm: 'FOB Ningbo', ncm: '4201.00.00', tipoContenedor: 'LCL 5 CBM', tipoTransporte: 'maritimo',
    fechaPO: formatFechaISO(diasAtras(16)), fechaETD: formatFechaISO(diasAdelante(23)), fechaETA: formatFechaISO(diasAdelante(42)), fechaArribo: null, freeTimeDias: 14, freeTimeVence: null,
    canalAduana: null, observacionesAduana: null, montoTotalUSD: 23000,
    costos: [{ concepto: 'Mercadería', estimadoUSD: 18500, realUSD: null }],
    pagos: [{ id: 'PAG-098-1', concepto: 'anticipo_proveedor', descripcion: 'Anticipo 30%', montoUSD: 5550, fechaVencimiento: formatFechaISO(diasAtras(11)), estado: 'pagado' }, { id: 'PAG-098-2', concepto: 'saldo_proveedor', descripcion: 'Saldo 70%', montoUSD: 12950, fechaVencimiento: formatFechaISO(diasAdelante(19)), estado: 'pendiente' }],
    documentos: [{ tipo: 'invoice', nombre: 'Invoice', estado: 'pendiente', obligatorio: true }, { tipo: 'bl', nombre: 'B/L', estado: 'pendiente', obligatorio: true }],
    hitos: [{ tipo: 'po', descripcion: 'PO emitida', fecha: formatFechaISO(diasAtras(16)), completado: true }, { tipo: 'produccion_fin', descripcion: 'Fin producción', fecha: formatFechaISO(diasAdelante(17)), completado: false }],
    responsable: 'Operaciones', alertas: [], bloqueo: null, proximaAccion: { texto: 'Seguimiento producción', owner: 'Operaciones' }
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// DATOS HOY - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

export const URGENT_ITEMS: UrgentItem[] = [
  { id: 'URG-001', tipo: 'aduana', texto: 'Responder observación AFIP - OP-072', operacionId: 'OP-072', owner: 'Operaciones', dueTime: 'Hoy', porQue: 'Canal rojo requiere respuesta urgente', accion: 'operaciones', prioridad: 'critica', ctaLabel: 'Responder AFIP' },
  { id: 'URG-002', tipo: 'aduana', texto: 'Validar NCM canal naranja - OP-088', operacionId: 'OP-088', owner: 'Operaciones', dueTime: 'Hoy', porQue: 'Free time vencido', accion: 'operaciones', prioridad: 'alta', ctaLabel: 'Validar NCM' },
  { id: 'URG-003', tipo: 'documento', texto: 'B/L pendiente - OP-091', operacionId: 'OP-091', owner: 'Logística', dueTime: formatFechaCorta(diasAdelante(2)), porQue: 'Sin B/L no se puede iniciar despacho', accion: 'operaciones', prioridad: 'alta', ctaLabel: 'Solicitar B/L' },
  { id: 'URG-004', tipo: 'pago', texto: 'Pagar honorarios OP-089', operacionId: 'OP-089', owner: 'Finanzas', dueTime: formatFechaCorta(diasAdelante(2)), porQue: 'Pendiente para liberar', accion: 'pagos', prioridad: 'media', ctaLabel: 'Registrar pago' },
];

export const PROXIMOS_HITOS: ProximoHito[] = [
  { fecha: formatFechaISO(diasAdelante(1)), tipo: 'pago', descripcion: 'Pago honorarios', operacionId: 'OP-072', operacionNombre: 'Pet Supplies Premium' },
  { fecha: formatFechaISO(diasAdelante(2)), tipo: 'pago', descripcion: 'Pago honorarios', operacionId: 'OP-089', operacionNombre: 'Electrónica Consumo' },
  { fecha: formatFechaISO(diasAdelante(5)), tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-094', operacionNombre: 'Smart Home Lote 3' },
  { fecha: formatFechaISO(diasAdelante(7)), tipo: 'free_time', descripcion: 'Vence free time', operacionId: 'OP-089', operacionNombre: 'Electrónica Consumo' },
  { fecha: formatFechaISO(diasAdelante(11)), tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-092', operacionNombre: 'Accesorios Móvil Q1' },
  { fecha: formatFechaISO(diasAdelante(14)), tipo: 'eta', descripcion: 'ETA Buenos Aires', operacionId: 'OP-091', operacionNombre: 'Repuestos Electrónicos' },
];

export const PAGOS_PROXIMOS: PagoProximo[] = [
  { fecha: formatFechaISO(diasAtras(3)), concepto: 'Honorarios despacho (VENCIDO)', montoUSD: 2800, operacionId: 'OP-072', beneficiario: 'García & Asociados', categoria: 'despachante' },
  { fecha: formatFechaISO(diasAdelante(2)), concepto: 'Honorarios despacho', montoUSD: 1200, operacionId: 'OP-089', beneficiario: 'García & Asociados', categoria: 'despachante' },
  { fecha: formatFechaISO(diasAdelante(12)), concepto: 'Saldo proveedor 70%', montoUSD: 26600, operacionId: 'OP-097', beneficiario: 'Guangzhou Toys Factory', categoria: 'proveedor' },
  { fecha: formatFechaISO(diasAdelante(19)), concepto: 'Saldo proveedor 70%', montoUSD: 12950, operacionId: 'OP-098', beneficiario: 'Yiwu Pet Supplies', categoria: 'proveedor' },
];

export const CAJA_BREAKDOWN: CajaBreakdown[] = [
  { categoria: 'proveedor', label: 'Proveedores', montoUSD: 39550, color: '#3b82f6' },
  { categoria: 'despachante', label: 'Despachantes', montoUSD: 4000, color: '#8b5cf6' },
];
