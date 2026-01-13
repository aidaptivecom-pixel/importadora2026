// ══════════════════════════════════════════════════════════════════════════════
// TIENDAS MINORISTAS - DATOS COMPLETOS
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS - FECHAS DINÁMICAS
// ══════════════════════════════════════════════════════════════════════════════

const hoy = new Date();

const diasAtras = (dias: number): Date => {
  const fecha = new Date(hoy);
  fecha.setDate(fecha.getDate() - dias);
  return fecha;
};

const formatFechaISO = (fecha: Date): string => {
  return fecha.toISOString().split('T')[0];
};

const formatFechaCorta = (fecha: Date): string => {
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
};

// ══════════════════════════════════════════════════════════════════════════════
// INTERFACES
// ══════════════════════════════════════════════════════════════════════════════

export interface TiendaAgente {
  nombre: string;
  tipo: 'ventas' | 'soporte' | 'postventa';
  estado: 'activo' | 'entrenamiento' | 'pausado';
  precision: number;
  conversacionesHoy: number;
}

export interface TiendaMinorista {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  vertical: string;
  logo: string;
  icono: string;
  color: string;
  colorPrimario: string;
  colorSecundario: string;
  estado: 'activa' | 'desarrollo' | 'pausada';
  plataformas: string[];
  fechaCreacion: string;
  // Métricas anidadas (para EcommerceHubPage)
  metricas: {
    ventasMes: number;
    ingresosMes: number;
    ticketPromedio: number;
    crecimientoMes: number;
    pedidosPendientes: number;
  };
  // Métricas planas (para compatibilidad)
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
  agentes: TiendaAgente[];
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
  tipo: 'stock' | 'devolucion' | 'garantia' | 'pago' | 'agente' | 'conversion' | 'ventas' | 'operacion';
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  accion: string;
  estado: 'activa' | 'resuelta';
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
    icono: '🐕',
    color: '#f59e0b',
    colorPrimario: '#f59e0b',
    colorSecundario: '#fef3c7',
    estado: 'activa',
    plataformas: ['WooCommerce', 'MercadoLibre', 'Instagram Shop'],
    fechaCreacion: '2025-06-15',
    metricas: {
      ventasMes: 156,
      ingresosMes: 2850000,
      ticketPromedio: 18269,
      crecimientoMes: 18.5,
      pedidosPendientes: 12
    },
    ventasMes: 156,
    ingresosMes: 2850000,
    ticketPromedio: 18269,
    crecimientoMes: 18.5,
    productosActivos: 145,
    stockCritico: 8,
    clientesActivos: 892,
    nuevosClientesMes: 67,
    deudaImportadora: 0,
    comprasAcumuladas: 45000,
    ultimaCompra: formatFechaISO(diasAtras(5)),
    agentes: [
      { nombre: 'Agente Ventas', tipo: 'ventas', estado: 'activo', precision: 92, conversacionesHoy: 18 },
      { nombre: 'Agente Soporte', tipo: 'soporte', estado: 'activo', precision: 88, conversacionesHoy: 12 },
      { nombre: 'Agente Postventa', tipo: 'postventa', estado: 'activo', precision: 85, conversacionesHoy: 4 }
    ],
    agentesActivos: 3,
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
    icono: '🏠',
    color: '#3b82f6',
    colorPrimario: '#3b82f6',
    colorSecundario: '#dbeafe',
    estado: 'activa',
    plataformas: ['Tienda Nube', 'MercadoLibre', 'Amazon'],
    fechaCreacion: '2025-04-20',
    metricas: {
      ventasMes: 67,
      ingresosMes: 3200000,
      ticketPromedio: 47761,
      crecimientoMes: 31.2,
      pedidosPendientes: 8
    },
    ventasMes: 67,
    ingresosMes: 3200000,
    ticketPromedio: 47761,
    crecimientoMes: 31.2,
    productosActivos: 89,
    stockCritico: 3,
    clientesActivos: 456,
    nuevosClientesMes: 45,
    deudaImportadora: 12500,
    comprasAcumuladas: 78000,
    ultimaCompra: formatFechaISO(diasAtras(3)),
    agentes: [
      { nombre: 'Agente Ventas', tipo: 'ventas', estado: 'activo', precision: 94, conversacionesHoy: 15 },
      { nombre: 'Agente Soporte', tipo: 'soporte', estado: 'activo', precision: 91, conversacionesHoy: 10 },
      { nombre: 'Agente Postventa', tipo: 'postventa', estado: 'activo', precision: 87, conversacionesHoy: 3 }
    ],
    agentesActivos: 3,
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
    icono: '💜',
    color: '#8b5cf6',
    colorPrimario: '#8b5cf6',
    colorSecundario: '#ede9fe',
    estado: 'activa',
    plataformas: ['WooCommerce', 'MercadoLibre'],
    fechaCreacion: '2025-08-10',
    metricas: {
      ventasMes: 89,
      ingresosMes: 2250000,
      ticketPromedio: 25281,
      crecimientoMes: 24.1,
      pedidosPendientes: 6
    },
    ventasMes: 89,
    ingresosMes: 2250000,
    ticketPromedio: 25281,
    crecimientoMes: 24.1,
    productosActivos: 112,
    stockCritico: 5,
    clientesActivos: 634,
    nuevosClientesMes: 52,
    deudaImportadora: 8200,
    comprasAcumuladas: 32000,
    ultimaCompra: formatFechaISO(diasAtras(8)),
    agentes: [
      { nombre: 'Agente Ventas', tipo: 'ventas', estado: 'activo', precision: 90, conversacionesHoy: 10 },
      { nombre: 'Agente Soporte', tipo: 'soporte', estado: 'activo', precision: 86, conversacionesHoy: 7 },
      { nombre: 'Agente Postventa', tipo: 'postventa', estado: 'activo', precision: 83, conversacionesHoy: 2 }
    ],
    agentesActivos: 3,
    conversacionesHoy: 19,
    ticketsAbiertos: 2,
    devolucionesPendientes: 3,
    garantiasPendientes: 0
  }
];

// Métricas diarias - últimos 7 días dinámicos
export const TIENDAS_METRICAS_DIARIAS: Record<string, TiendaMetricaDiaria[]> = {
  'tienda-001': [
    { fecha: formatFechaISO(diasAtras(6)), ventas: 18, ingresos: 270000, visitas: 1250, conversiones: 1.44 },
    { fecha: formatFechaISO(diasAtras(5)), ventas: 22, ingresos: 330000, visitas: 1380, conversiones: 1.59 },
    { fecha: formatFechaISO(diasAtras(4)), ventas: 19, ingresos: 285000, visitas: 1420, conversiones: 1.34 },
    { fecha: formatFechaISO(diasAtras(3)), ventas: 25, ingresos: 375000, visitas: 1560, conversiones: 1.60 },
    { fecha: formatFechaISO(diasAtras(2)), ventas: 21, ingresos: 315000, visitas: 1340, conversiones: 1.57 },
    { fecha: formatFechaISO(diasAtras(1)), ventas: 28, ingresos: 420000, visitas: 1680, conversiones: 1.67 },
    { fecha: formatFechaISO(hoy), ventas: 23, ingresos: 345000, visitas: 1450, conversiones: 1.59 },
  ],
  'tienda-002': [
    { fecha: formatFechaISO(diasAtras(6)), ventas: 8, ingresos: 372536, visitas: 890, conversiones: 0.90 },
    { fecha: formatFechaISO(diasAtras(5)), ventas: 11, ingresos: 512237, visitas: 1020, conversiones: 1.08 },
    { fecha: formatFechaISO(diasAtras(4)), ventas: 9, ingresos: 419103, visitas: 945, conversiones: 0.95 },
    { fecha: formatFechaISO(diasAtras(3)), ventas: 12, ingresos: 558804, visitas: 1150, conversiones: 1.04 },
    { fecha: formatFechaISO(diasAtras(2)), ventas: 7, ingresos: 325969, visitas: 820, conversiones: 0.85 },
    { fecha: formatFechaISO(diasAtras(1)), ventas: 10, ingresos: 465670, visitas: 980, conversiones: 1.02 },
    { fecha: formatFechaISO(hoy), ventas: 10, ingresos: 465681, visitas: 1100, conversiones: 0.91 },
  ],
  'tienda-003': [
    { fecha: formatFechaISO(diasAtras(6)), ventas: 11, ingresos: 233596, visitas: 780, conversiones: 1.41 },
    { fecha: formatFechaISO(diasAtras(5)), ventas: 14, ingresos: 297304, visitas: 890, conversiones: 1.57 },
    { fecha: formatFechaISO(diasAtras(4)), ventas: 12, ingresos: 254832, visitas: 845, conversiones: 1.42 },
    { fecha: formatFechaISO(diasAtras(3)), ventas: 15, ingresos: 318540, visitas: 920, conversiones: 1.63 },
    { fecha: formatFechaISO(diasAtras(2)), ventas: 10, ingresos: 212360, visitas: 710, conversiones: 1.41 },
    { fecha: formatFechaISO(diasAtras(1)), ventas: 13, ingresos: 276068, visitas: 865, conversiones: 1.50 },
    { fecha: formatFechaISO(hoy), ventas: 14, ingresos: 297300, visitas: 900, conversiones: 1.56 },
  ]
};

// Alertas con fechas dinámicas
export const TIENDAS_ALERTAS: TiendaAlerta[] = [
  { id: 'ALT-001', tiendaId: 'tienda-001', tipo: 'stock', mensaje: '8 productos con stock crítico', prioridad: 'alta', fecha: formatFechaCorta(hoy), accion: 'Ver productos', estado: 'activa' },
  { id: 'ALT-002', tiendaId: 'tienda-001', tipo: 'devolucion', mensaje: '2 devoluciones pendientes de procesar', prioridad: 'media', fecha: formatFechaCorta(diasAtras(1)), accion: 'Procesar', estado: 'activa' },
  { id: 'ALT-003', tiendaId: 'tienda-002', tipo: 'garantia', mensaje: '4 reclamos de garantía sin respuesta', prioridad: 'alta', fecha: formatFechaCorta(hoy), accion: 'Revisar casos', estado: 'activa' },
  { id: 'ALT-004', tiendaId: 'tienda-002', tipo: 'stock', mensaje: '3 productos sin stock', prioridad: 'alta', fecha: formatFechaCorta(hoy), accion: 'Reponer', estado: 'activa' },
  { id: 'ALT-005', tiendaId: 'tienda-003', tipo: 'devolucion', mensaje: '3 devoluciones en proceso', prioridad: 'media', fecha: formatFechaCorta(diasAtras(2)), accion: 'Ver estado', estado: 'activa' },
  { id: 'ALT-006', tiendaId: 'tienda-003', tipo: 'conversion', mensaje: 'Conversión bajó 0.3% vs semana anterior', prioridad: 'baja', fecha: formatFechaCorta(hoy), accion: 'Analizar', estado: 'activa' },
  { id: 'ALT-007', tiendaId: 'tienda-001', tipo: 'ventas', mensaje: 'Meta mensual alcanzada al 95%', prioridad: 'baja', fecha: formatFechaCorta(diasAtras(1)), accion: 'Ver detalle', estado: 'resuelta' },
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
