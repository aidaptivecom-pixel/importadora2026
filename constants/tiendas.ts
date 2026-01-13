// ══════════════════════════════════════════════════════════════════════════════
// TIENDAS MINORISTAS - DATOS COMPLETOS PARA FASE 1
// ══════════════════════════════════════════════════════════════════════════════

export interface TiendaMinorista {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  vertical: string;
  logo: string;
  color: string;
  colorSecundario: string;
  estado: 'activa' | 'desarrollo' | 'pausada';
  plataformas: string[];
  fechaCreacion: string;
  // Métricas
  ventasMes: number;
  ingresosMes: number;
  ticketPromedio: number;
  crecimientoMes: number;
  // Inventario
  productosActivos: number;
  stockCritico: number;
  // Clientes
  clientesActivos: number;
  nuevosClientesMes: number;
  // Finanzas con importadora
  deudaImportadora: number;
  comprasAcumuladas: number;
  ultimaCompra: string;
  // Agentes AI
  agentesActivos: number;
  conversacionesHoy: number;
  // Problemas
  ticketsAbiertos: number;
  devolucionesPendientes: number;
  garantiasPendientes: number;
}

export interface TiendaMetricaDiaria {
  fecha: string;
  ventas: number;
  ingresos: number;
  visitas: number;
  conversiones: number;
}

export interface TiendaProductoTop {
  id: string;
  nombre: string;
  sku: string;
  ventasMes: number;
  ingresosMes: number;
  stock: number;
  imagen: string;
}

export interface TiendaAlerta {
  id: string;
  tiendaId: string;
  tipo: 'stock' | 'devolucion' | 'garantia' | 'pago' | 'agente' | 'conversion';
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  accion: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// DATOS DE TIENDAS
// ══════════════════════════════════════════════════════════════════════════════

export const TIENDAS_MINORISTAS: TiendaMinorista[] = [
  {
    id: 'tienda-001',
    nombre: 'Pet Vogue',
    slug: 'pet-vogue',
    descripcion: 'Accesorios premium para mascotas',
    vertical: 'Mascotas',
    logo: '🐕',
    color: '#10b981',
    colorSecundario: '#d1fae5',
    estado: 'activa',
    plataformas: ['WooCommerce', 'MercadoLibre', 'Instagram Shop'],
    fechaCreacion: '2025-06-15',
    ventasMes: 156,
    ingresosMes: 2340000,
    ticketPromedio: 15000,
    crecimientoMes: 18.5,
    productosActivos: 145,
    stockCritico: 8,
    clientesActivos: 892,
    nuevosClientesMes: 67,
    deudaImportadora: 0,
    comprasAcumuladas: 45000,
    ultimaCompra: '2026-01-08',
    agentesActivos: 2,
    conversacionesHoy: 34,
    ticketsAbiertos: 5,
    devolucionesPendientes: 2,
    garantiasPendientes: 1
  },
  {
    id: 'tienda-002',
    nombre: 'CoreSmart',
    slug: 'coresmart',
    descripcion: 'Tecnología inteligente para el hogar',
    vertical: 'Smart Home',
    logo: '🏠',
    color: '#3b82f6',
    colorSecundario: '#dbeafe',
    estado: 'activa',
    plataformas: ['Tienda Nube', 'MercadoLibre', 'Amazon'],
    fechaCreacion: '2025-04-20',
    ventasMes: 67,
    ingresosMes: 3120000,
    ticketPromedio: 46567,
    crecimientoMes: 31.2,
    productosActivos: 89,
    stockCritico: 3,
    clientesActivos: 456,
    nuevosClientesMes: 45,
    deudaImportadora: 12500,
    comprasAcumuladas: 78000,
    ultimaCompra: '2026-01-10',
    agentesActivos: 2,
    conversacionesHoy: 28,
    ticketsAbiertos: 3,
    devolucionesPendientes: 1,
    garantiasPendientes: 4
  },
  {
    id: 'tienda-003',
    nombre: 'Sensuality',
    slug: 'sensuality',
    descripcion: 'Productos de bienestar adulto',
    vertical: 'Adult Wellness',
    logo: '💜',
    color: '#8b5cf6',
    colorSecundario: '#ede9fe',
    estado: 'activa',
    plataformas: ['WooCommerce', 'MercadoLibre'],
    fechaCreacion: '2025-08-10',
    ventasMes: 89,
    ingresosMes: 1890000,
    ticketPromedio: 21236,
    crecimientoMes: 24.1,
    productosActivos: 112,
    stockCritico: 5,
    clientesActivos: 634,
    nuevosClientesMes: 52,
    deudaImportadora: 8200,
    comprasAcumuladas: 32000,
    ultimaCompra: '2026-01-05',
    agentesActivos: 2,
    conversacionesHoy: 19,
    ticketsAbiertos: 2,
    devolucionesPendientes: 3,
    garantiasPendientes: 0
  }
];

export const TIENDAS_METRICAS_DIARIAS: Record<string, TiendaMetricaDiaria[]> = {
  'tienda-001': [
    { fecha: '2026-01-07', ventas: 18, ingresos: 270000, visitas: 1250, conversiones: 1.44 },
    { fecha: '2026-01-08', ventas: 22, ingresos: 330000, visitas: 1380, conversiones: 1.59 },
    { fecha: '2026-01-09', ventas: 19, ingresos: 285000, visitas: 1420, conversiones: 1.34 },
    { fecha: '2026-01-10', ventas: 25, ingresos: 375000, visitas: 1560, conversiones: 1.60 },
    { fecha: '2026-01-11', ventas: 21, ingresos: 315000, visitas: 1340, conversiones: 1.57 },
    { fecha: '2026-01-12', ventas: 28, ingresos: 420000, visitas: 1680, conversiones: 1.67 },
    { fecha: '2026-01-13', ventas: 23, ingresos: 345000, visitas: 1450, conversiones: 1.59 },
  ],
  'tienda-002': [
    { fecha: '2026-01-07', ventas: 8, ingresos: 372536, visitas: 890, conversiones: 0.90 },
    { fecha: '2026-01-08', ventas: 11, ingresos: 512237, visitas: 1020, conversiones: 1.08 },
    { fecha: '2026-01-09', ventas: 9, ingresos: 419103, visitas: 945, conversiones: 0.95 },
    { fecha: '2026-01-10', ventas: 12, ingresos: 558804, visitas: 1150, conversiones: 1.04 },
    { fecha: '2026-01-11', ventas: 7, ingresos: 325969, visitas: 820, conversiones: 0.85 },
    { fecha: '2026-01-12', ventas: 10, ingresos: 465670, visitas: 980, conversiones: 1.02 },
    { fecha: '2026-01-13', ventas: 10, ingresos: 465681, visitas: 1100, conversiones: 0.91 },
  ],
  'tienda-003': [
    { fecha: '2026-01-07', ventas: 11, ingresos: 233596, visitas: 780, conversiones: 1.41 },
    { fecha: '2026-01-08', ventas: 14, ingresos: 297304, visitas: 890, conversiones: 1.57 },
    { fecha: '2026-01-09', ventas: 12, ingresos: 254832, visitas: 845, conversiones: 1.42 },
    { fecha: '2026-01-10', ventas: 15, ingresos: 318540, visitas: 920, conversiones: 1.63 },
    { fecha: '2026-01-11', ventas: 10, ingresos: 212360, visitas: 710, conversiones: 1.41 },
    { fecha: '2026-01-12', ventas: 13, ingresos: 276068, visitas: 865, conversiones: 1.50 },
    { fecha: '2026-01-13', ventas: 14, ingresos: 297300, visitas: 900, conversiones: 1.56 },
  ]
};

export const TIENDAS_ALERTAS: TiendaAlerta[] = [
  { id: 'ALT-001', tiendaId: 'tienda-001', tipo: 'stock', mensaje: '8 productos con stock crítico', prioridad: 'alta', fecha: '2026-01-13', accion: 'Ver productos' },
  { id: 'ALT-002', tiendaId: 'tienda-001', tipo: 'devolucion', mensaje: '2 devoluciones pendientes de procesar', prioridad: 'media', fecha: '2026-01-12', accion: 'Procesar' },
  { id: 'ALT-003', tiendaId: 'tienda-002', tipo: 'garantia', mensaje: '4 reclamos de garantía sin respuesta', prioridad: 'alta', fecha: '2026-01-13', accion: 'Revisar casos' },
  { id: 'ALT-004', tiendaId: 'tienda-002', tipo: 'stock', mensaje: '3 productos sin stock', prioridad: 'alta', fecha: '2026-01-13', accion: 'Reponer' },
  { id: 'ALT-005', tiendaId: 'tienda-003', tipo: 'devolucion', mensaje: '3 devoluciones en proceso', prioridad: 'media', fecha: '2026-01-11', accion: 'Ver estado' },
  { id: 'ALT-006', tiendaId: 'tienda-003', tipo: 'conversion', mensaje: 'Conversión bajó 0.3% vs semana anterior', prioridad: 'baja', fecha: '2026-01-13', accion: 'Analizar' },
];

export const TIENDAS_PROYECCIONES = {
  'tienda-001': { proyeccionMes: 2800000, metaMes: 2500000, cumplimiento: 94 },
  'tienda-002': { proyeccionMes: 3500000, metaMes: 3000000, cumplimiento: 104 },
  'tienda-003': { proyeccionMes: 2100000, metaMes: 2000000, cumplimiento: 95 },
};

// Resumen consolidado para vista global
export const getTiendasResumen = () => {
  const tiendas = TIENDAS_MINORISTAS;
  return {
    totalTiendas: tiendas.length,
    tiendasActivas: tiendas.filter(t => t.estado === 'activa').length,
    ventasTotalesMes: tiendas.reduce((acc, t) => acc + t.ventasMes, 0),
    ingresosTotalesMes: tiendas.reduce((acc, t) => acc + t.ingresosMes, 0),
    clientesTotales: tiendas.reduce((acc, t) => acc + t.clientesActivos, 0),
    stockCriticoTotal: tiendas.reduce((acc, t) => acc + t.stockCritico, 0),
    ticketsAbiertosTotal: tiendas.reduce((acc, t) => acc + t.ticketsAbiertos, 0),
    devolucionesPendientesTotal: tiendas.reduce((acc, t) => acc + t.devolucionesPendientes, 0),
    garantiasPendientesTotal: tiendas.reduce((acc, t) => acc + t.garantiasPendientes, 0),
    deudaImportadoraTotal: tiendas.reduce((acc, t) => acc + t.deudaImportadora, 0),
    comprasAcumuladasTotal: tiendas.reduce((acc, t) => acc + t.comprasAcumuladas, 0),
    agentesActivosTotal: tiendas.reduce((acc, t) => acc + t.agentesActivos, 0),
    conversacionesHoyTotal: tiendas.reduce((acc, t) => acc + t.conversacionesHoy, 0),
  };
};
