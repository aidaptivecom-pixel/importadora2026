// ============ BADGE DATA UTILITIES ============
// Centralizes dynamic badge calculations from various data sources

import { TIENDAS_MINORISTAS, TIENDAS_ALERTAS } from '../constants/tiendas';

// ============ TYPES ============
export interface SidebarBadges {
  tareas: number;
  tablero: number;
  inbox: number;
  crm: number;
  cobranzas: number;
  tiendasOverview: number;
  marketingCampanas: number;
  agentesCentro: number;
  agenteVentas: number;
  agenteSoporte: number;
  agentePostventa: number;
  agenteMarketing: number;
  pagos: number;
}

// ============ MOCK DATA COUNTS ============
// These simulate real-time data that would come from API/database

// Tareas pendientes (from TareasPage data structure)
const getTareasPendientes = (): number => {
  // Simulates counting incomplete tasks
  const tareasPorEstado = { pendiente: 3, en_progreso: 2, completada: 8, bloqueada: 1 };
  return tareasPorEstado.pendiente + tareasPorEstado.en_progreso;
};

// Operaciones activas en tablero
const getOperacionesActivas = (): number => {
  // Simulates counting active operations in Kanban
  const operacionesPorEtapa = {
    negociacion: 2,
    ordenCompra: 1,
    produccion: 3,
    embarque: 2,
    transito: 1,
    aduana: 0,
    entregado: 5
  };
  return operacionesPorEtapa.negociacion + 
         operacionesPorEtapa.ordenCompra + 
         operacionesPorEtapa.produccion + 
         operacionesPorEtapa.embarque + 
         operacionesPorEtapa.transito + 
         operacionesPorEtapa.aduana;
};

// Mensajes sin leer en inbox
const getMensajesSinLeer = (): number => {
  // Simulates unread messages count
  const conversaciones = [
    { mensajesNoLeidos: 2 },
    { mensajesNoLeidos: 0 },
    { mensajesNoLeidos: 1 },
    { mensajesNoLeidos: 0 },
    { mensajesNoLeidos: 1 },
    { mensajesNoLeidos: 0 },
    { mensajesNoLeidos: 0 },
    { mensajesNoLeidos: 0 }
  ];
  return conversaciones.reduce((acc, c) => acc + c.mensajesNoLeidos, 0);
};

// Leads activos en CRM
const getLeadsActivos = (): number => {
  // Simulates active leads count
  const leadsPorEtapa = {
    nuevo: 5,
    contactado: 8,
    calificado: 4,
    propuesta: 3,
    negociacion: 2,
    cerrado_ganado: 10,
    cerrado_perdido: 3
  };
  return leadsPorEtapa.nuevo + 
         leadsPorEtapa.contactado + 
         leadsPorEtapa.calificado + 
         leadsPorEtapa.propuesta + 
         leadsPorEtapa.negociacion;
};

// Cuentas por cobrar vencidas
const getCobranzasVencidas = (): number => {
  // Simulates overdue accounts
  const cuentas = [
    { estado: 'vencido' },
    { estado: 'al_dia' },
    { estado: 'vencido' },
    { estado: 'por_vencer' },
    { estado: 'vencido' },
    { estado: 'en_gestion' },
    { estado: 'al_dia' }
  ];
  return cuentas.filter(c => c.estado === 'vencido').length;
};

// Tiendas activas
const getTiendasActivas = (): number => {
  return TIENDAS_MINORISTAS.filter(t => t.estado === 'activa').length;
};

// Campañas activas
const getCampanasActivas = (): number => {
  // Simulates active campaigns
  const campanas = [
    { estado: 'activa' },
    { estado: 'activa' },
    { estado: 'pausada' },
    { estado: 'activa' },
    { estado: 'completada' },
    { estado: 'activa' },
    { estado: 'activa' }
  ];
  return campanas.filter(c => c.estado === 'activa').length;
};

// Agentes AI activos
const getAgentesActivos = (): number => {
  const agentes = [
    { estado: 'online' },
    { estado: 'online' },
    { estado: 'online' },
    { estado: 'entrenamiento' },
    { estado: 'online' }
  ];
  return agentes.filter(a => a.estado === 'online').length;
};

// Conversaciones por agente (simulated real-time)
const getConversacionesAgente = (tipo: 'ventas' | 'soporte' | 'postventa' | 'marketing'): number => {
  const conversacionesHoy: Record<string, number> = {
    ventas: 85,
    soporte: 23,
    postventa: 31,
    marketing: 8
  };
  return conversacionesHoy[tipo];
};

// Pagos pendientes/vencidos
const getPagosPendientes = (): number => {
  // Simulates pending/overdue payments
  const pagos = [
    { estado: 'vencido' },
    { estado: 'pendiente' },
    { estado: 'pendiente' },
    { estado: 'programado' },
    { estado: 'vencido' },
    { estado: 'pendiente' },
    { estado: 'pagado' },
    { estado: 'pagado' },
    { estado: 'programado' },
    { estado: 'pendiente' },
    { estado: 'pagado' },
    { estado: 'pendiente' }
  ];
  return pagos.filter(p => p.estado === 'vencido' || p.estado === 'pendiente').length;
};

// Alertas de tiendas
const getAlertasTiendas = (): number => {
  return TIENDAS_ALERTAS.filter(a => a.prioridad === 'alta').length;
};

// ============ MAIN FUNCTION ============
export const getSidebarBadges = (): SidebarBadges => {
  return {
    tareas: getTareasPendientes(),
    tablero: getOperacionesActivas(),
    inbox: getMensajesSinLeer(),
    crm: getLeadsActivos(),
    cobranzas: getCobranzasVencidas(),
    tiendasOverview: getTiendasActivas(),
    marketingCampanas: getCampanasActivas(),
    agentesCentro: getAgentesActivos(),
    agenteVentas: getConversacionesAgente('ventas'),
    agenteSoporte: getConversacionesAgente('soporte'),
    agentePostventa: getConversacionesAgente('postventa'),
    agenteMarketing: getConversacionesAgente('marketing'),
    pagos: getPagosPendientes()
  };
};

// ============ BADGE VISIBILITY RULES ============
// Determines when to show badges (e.g., only show if > 0)
export const shouldShowBadge = (count: number, minToShow: number = 1): boolean => {
  return count >= minToShow;
};

// ============ BADGE URGENCY ============
// Returns urgency level for styling
export type BadgeUrgency = 'low' | 'medium' | 'high' | 'critical';

export const getBadgeUrgency = (type: keyof SidebarBadges, count: number): BadgeUrgency => {
  const thresholds: Record<keyof SidebarBadges, { medium: number; high: number; critical: number }> = {
    tareas: { medium: 3, high: 5, critical: 10 },
    tablero: { medium: 5, high: 8, critical: 12 },
    inbox: { medium: 3, high: 5, critical: 10 },
    crm: { medium: 15, high: 25, critical: 40 },
    cobranzas: { medium: 2, high: 4, critical: 6 },
    tiendasOverview: { medium: 2, high: 3, critical: 5 },
    marketingCampanas: { medium: 3, high: 5, critical: 8 },
    agentesCentro: { medium: 3, high: 4, critical: 5 },
    agenteVentas: { medium: 50, high: 80, critical: 100 },
    agenteSoporte: { medium: 15, high: 25, critical: 40 },
    agentePostventa: { medium: 20, high: 35, critical: 50 },
    agenteMarketing: { medium: 5, high: 10, critical: 15 },
    pagos: { medium: 3, high: 5, critical: 8 }
  };

  const t = thresholds[type];
  if (count >= t.critical) return 'critical';
  if (count >= t.high) return 'high';
  if (count >= t.medium) return 'medium';
  return 'low';
};
