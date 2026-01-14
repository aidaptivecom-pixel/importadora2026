export interface Shipment {
  id: string;
  productName: string;
  productImage: string;
  date: string;
  status: 'transito' | 'aduana' | 'demorado' | 'entregado' | 'produccion';
  value: number;
  origen: string;
  tipo: 'maritimo' | 'aereo';
  eta: string;
  progreso: number;
}

export interface KPIStats {
  label: string;
  value: string;
  growth: number;
  chartData: { val: number }[];
}

export interface ChartDataPoint {
  month: string;
  maritimo: number;
  aereo: number;
}

export interface CategoryStat {
  name: string;
  value: number;
  color: string;
}

export interface ClienteMayorista {
  id: string;
  nombre: string;
  tipo: string;
  ciudad: string;
  contacto: string;
  telefono: string;
  email: string;
  facturacionTotal: number;
  ultimaCompra: string;
  estado: 'activo' | 'potencial' | 'inactivo';
}

export interface EcommerceTienda {
  tienda: string;
  ventas: number;
  ingresos: number;
  crecimiento: number;
}

export interface Proveedor {
  id: string;
  nombre: string;
  ciudad: string;
  productos: string[];
  rating: number;
  comprasTotal: number;
  ultimaCompra: string;
  estado: 'activo' | 'pendiente' | 'inactivo';
  contacto: string;
}

export interface InventarioItem {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  costoUSD: number;
  precioVenta: number;
  ubicacion: string;
  ultimoMovimiento: string;
}

// ============ OPERACIONES (FASE 2A) ============

export type EtapaOperacion = 
  | 'draft'
  | 'po_emitida'
  | 'produccion'
  | 'listo_embarque'
  | 'en_transito'
  | 'arribo'
  | 'aduana'
  | 'liberado'
  | 'deposito'
  | 'cerrado';

export type CanalAduana = 'verde' | 'naranja' | 'rojo' | null;

export type NivelRiesgo = 'bajo' | 'medio' | 'alto' | 'critico';

export interface DocumentoOperacion {
  tipo: 'invoice' | 'packing_list' | 'bl' | 'awb' | 'seguro' | 'cert_origen' | 'dui' | 'otros';
  nombre: string;
  estado: 'pendiente' | 'recibido' | 'validado';
  fechaRecibido?: string;
  obligatorio: boolean;
}

export interface PagoOperacion {
  id: string;
  concepto: 'anticipo_proveedor' | 'saldo_proveedor' | 'flete' | 'seguro' | 'despachante' | 'impuestos' | 'terminal' | 'deposito' | 'otros';
  descripcion: string;
  montoUSD: number;
  fechaVencimiento: string;
  estado: 'pendiente' | 'pagado' | 'vencido';
}

export interface HitoOperacion {
  tipo: 'po' | 'produccion_fin' | 'etd' | 'eta' | 'cutoff' | 'free_time' | 'turno_retiro' | 'pago';
  descripcion: string;
  fecha: string;
  completado: boolean;
}

export interface CostoOperacion {
  concepto: string;
  estimadoUSD: number;
  realUSD: number | null;
}

// Fase 2D: Próxima acción pendiente
export interface ProximaAccion {
  texto: string;
  owner: string;
}

export interface Operacion {
  id: string;
  nombre: string;
  descripcion: string;
  etapa: EtapaOperacion;
  riesgo: NivelRiesgo;
  
  // Datos básicos
  proveedor: string;
  proveedorCiudad: string;
  forwarder: string;
  despachante: string;
  incoterm: string;
  ncm: string;
  tipoContenedor: string;
  tipoTransporte: 'maritimo' | 'aereo';
  
  // Fechas
  fechaPO: string;
  fechaETD: string | null;
  fechaETA: string | null;
  fechaArribo: string | null;
  freeTimeDias: number | null;
  freeTimeVence: string | null;
  
  // Aduana
  canalAduana: CanalAduana;
  observacionesAduana: string | null;
  
  // Financiero
  montoTotalUSD: number;
  costos: CostoOperacion[];
  pagos: PagoOperacion[];
  
  // Documentos
  documentos: DocumentoOperacion[];
  
  // Hitos
  hitos: HitoOperacion[];
  
  // Owner
  responsable: string;
  
  // Alertas activas
  alertas: string[];
  
  // Fase 2D: Bloqueo y próxima acción
  bloqueo: string | null; // Motivo de bloqueo actual (si aplica)
  proximaAccion: ProximaAccion | null; // Próxima acción pendiente con owner
}

export interface UrgentItem {
  id: string;
  tipo: 'pago' | 'documento' | 'aduana' | 'free_time' | 'embarque' | 'cliente';
  texto: string;
  operacionId?: string;
  owner: string;
  dueTime: string;
  porQue: string;
  accion: string;
  prioridad: 'critica' | 'alta' | 'media';
  ctaLabel: string; // Fase 2C: CTA real como "Pagar", "Solicitar B/L", etc.
}

export interface ProximoHito {
  fecha: string;
  tipo: HitoOperacion['tipo'];
  descripcion: string;
  operacionId: string;
  operacionNombre: string;
}

export interface PagoProximo {
  fecha: string;
  concepto: string;
  montoUSD: number;
  operacionId?: string;
  beneficiario: string;
  categoria: 'proveedor' | 'flete' | 'despachante' | 'terminal' | 'impuestos' | 'otros';
}

// Fase 2C: Breakdown de caja por categoría
export interface CajaBreakdown {
  categoria: 'proveedor' | 'flete' | 'despachante' | 'terminal' | 'impuestos' | 'otros';
  label: string;
  montoUSD: number;
  color: string;
}

// ============ CRM (FASE 3) ============

export type EtapaCRM = 'lead' | 'contactado' | 'propuesta' | 'negociacion' | 'ganado' | 'perdido';

export type OrigenLead = 'referido' | 'web' | 'feria' | 'linkedin' | 'llamada_fria' | 'ecommerce' | 'otro';

export interface InteraccionCRM {
  id: string;
  tipo: 'llamada' | 'email' | 'reunion' | 'whatsapp' | 'visita' | 'nota';
  fecha: string;
  descripcion: string;
  usuario: string;
}

export interface ContactoCRM {
  id: string;
  nombre: string;
  empresa: string;
  cargo: string;
  email: string;
  telefono: string;
  ciudad: string;
  etapa: EtapaCRM;
  origen: OrigenLead;
  valorPotencial: number;
  probabilidad: number; // 0-100
  ultimoContacto: string;
  proximaAccion?: string;
  fechaProximaAccion?: string;
  ownerVentas: string;
  tags: string[];
  interacciones: InteraccionCRM[];
  fechaCreacion: string;
  notas?: string;
}

export interface OportunidadCRM {
  id: string;
  contactoId: string;
  titulo: string;
  valorUSD: number;
  etapa: EtapaCRM;
  probabilidad: number;
  fechaCierre: string;
  productos: string[];
  notas: string;
}
