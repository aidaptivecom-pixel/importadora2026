// ============ DATOS EXTENDIDOS PARA TIENDAS MINORISTAS ============
// Fase 2: Sub-pantallas de cada tienda

import { TiendaMinorista } from './tiendas';

// ============ VENTAS / PEDIDOS ============
export interface PedidoTienda {
  id: string;
  fecha: string;
  cliente: string;
  email: string;
  productos: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  metodoPago: string;
  canal: string;
  direccion: string;
  tracking?: string;
}

export const PEDIDOS_TIENDA: Record<string, PedidoTienda[]> = {
  'pet-vogue': [
    { id: 'PV-001234', fecha: '2026-01-13', cliente: 'María González', email: 'maria.g@email.com', productos: [{ nombre: 'Cama Ortopédica Premium L', cantidad: 1, precio: 89500 }, { nombre: 'Comedero Inteligente WiFi', cantidad: 1, precio: 45000 }], total: 134500, estado: 'pendiente', metodoPago: 'MercadoPago', canal: 'MercadoLibre', direccion: 'Av. Corrientes 1234, CABA' },
    { id: 'PV-001233', fecha: '2026-01-13', cliente: 'Carlos Rodríguez', email: 'carlos.r@email.com', productos: [{ nombre: 'Arnés Antitirones M', cantidad: 2, precio: 15000 }], total: 30000, estado: 'procesando', metodoPago: 'Tarjeta', canal: 'Web', direccion: 'Libertador 5678, Vicente López' },
    { id: 'PV-001232', fecha: '2026-01-12', cliente: 'Ana Martínez', email: 'ana.m@email.com', productos: [{ nombre: 'Kit Grooming Profesional', cantidad: 1, precio: 67000 }, { nombre: 'Shampoo Orgánico 500ml', cantidad: 3, precio: 8500 }], total: 92500, estado: 'enviado', metodoPago: 'Transferencia', canal: 'Instagram', direccion: 'San Martín 890, Quilmes', tracking: 'OCA-123456789' },
    { id: 'PV-001231', fecha: '2026-01-12', cliente: 'Diego López', email: 'diego.l@email.com', productos: [{ nombre: 'Transportadora Airline Approved', cantidad: 1, precio: 125000 }], total: 125000, estado: 'entregado', metodoPago: 'MercadoPago', canal: 'MercadoLibre', direccion: 'Mitre 456, Avellaneda' },
    { id: 'PV-001230', fecha: '2026-01-11', cliente: 'Laura Fernández', email: 'laura.f@email.com', productos: [{ nombre: 'Cama Térmica S', cantidad: 1, precio: 45000 }, { nombre: 'Manta Polar Premium', cantidad: 1, precio: 22000 }], total: 67000, estado: 'entregado', metodoPago: 'Tarjeta', canal: 'Web', direccion: 'Belgrano 789, Lanús' },
    { id: 'PV-001229', fecha: '2026-01-11', cliente: 'Roberto Sánchez', email: 'roberto.s@email.com', productos: [{ nombre: 'Collar GPS Tracker', cantidad: 1, precio: 85000 }], total: 85000, estado: 'cancelado', metodoPago: 'MercadoPago', canal: 'WhatsApp', direccion: 'Rivadavia 321, Morón' },
  ],
  'coresmart': [
    { id: 'CS-002156', fecha: '2026-01-13', cliente: 'Empresa TechSoft SA', email: 'compras@techsoft.com', productos: [{ nombre: 'Smart Hub Pro', cantidad: 5, precio: 45000 }, { nombre: 'Sensor Movimiento WiFi', cantidad: 10, precio: 12000 }], total: 345000, estado: 'pendiente', metodoPago: 'Transferencia', canal: 'Web', direccion: 'Av. del Libertador 1234, CABA' },
    { id: 'CS-002155', fecha: '2026-01-13', cliente: 'Martín Aguirre', email: 'martin.a@email.com', productos: [{ nombre: 'Cámara IP 360° 4K', cantidad: 2, precio: 89000 }], total: 178000, estado: 'procesando', metodoPago: 'Tarjeta', canal: 'MercadoLibre', direccion: 'Scalabrini Ortiz 567, CABA' },
    { id: 'CS-002154', fecha: '2026-01-12', cliente: 'Lucía Pereyra', email: 'lucia.p@email.com', productos: [{ nombre: 'Kit Iluminación Smart RGB', cantidad: 1, precio: 67000 }, { nombre: 'Dimmer WiFi Touch', cantidad: 3, precio: 18000 }], total: 121000, estado: 'enviado', metodoPago: 'MercadoPago', canal: 'Instagram', direccion: 'Cabildo 890, Belgrano', tracking: 'ANDREANI-987654' },
    { id: 'CS-002153', fecha: '2026-01-12', cliente: 'Federico Torres', email: 'fede.t@email.com', productos: [{ nombre: 'Cerradura Smart Fingerprint', cantidad: 1, precio: 145000 }], total: 145000, estado: 'entregado', metodoPago: 'Transferencia', canal: 'Web', direccion: 'Av. Santa Fe 2345, CABA' },
    { id: 'CS-002152', fecha: '2026-01-11', cliente: 'Inmobiliaria Norte', email: 'admin@inmobiliarianorte.com', productos: [{ nombre: 'Timbre Video WiFi', cantidad: 8, precio: 55000 }], total: 440000, estado: 'entregado', metodoPago: 'Transferencia', canal: 'Web', direccion: 'Maipú 678, San Isidro' },
  ],
  'sensuality': [
    { id: 'SN-003089', fecha: '2026-01-13', cliente: 'Cliente Anónimo #4521', email: 'privado@email.com', productos: [{ nombre: 'Kit Romance Premium', cantidad: 1, precio: 125000 }], total: 125000, estado: 'pendiente', metodoPago: 'MercadoPago', canal: 'Web', direccion: 'Envío discreto - Palermo' },
    { id: 'SN-003088', fecha: '2026-01-13', cliente: 'Cliente Anónimo #4520', email: 'privado2@email.com', productos: [{ nombre: 'Aceite Masajes Sensual 250ml', cantidad: 3, precio: 18000 }, { nombre: 'Velas Aromáticas Set x6', cantidad: 2, precio: 24000 }], total: 102000, estado: 'procesando', metodoPago: 'Tarjeta', canal: 'Web', direccion: 'Envío discreto - Recoleta' },
    { id: 'SN-003087', fecha: '2026-01-12', cliente: 'Cliente Anónimo #4519', email: 'privado3@email.com', productos: [{ nombre: 'Lencería Set Luxury', cantidad: 1, precio: 89000 }], total: 89000, estado: 'enviado', metodoPago: 'MercadoPago', canal: 'Instagram', direccion: 'Envío discreto - Caballito', tracking: 'PRIVADO-001' },
    { id: 'SN-003086', fecha: '2026-01-11', cliente: 'Cliente Anónimo #4518', email: 'privado4@email.com', productos: [{ nombre: 'Colección Bienestar Completa', cantidad: 1, precio: 245000 }], total: 245000, estado: 'entregado', metodoPago: 'Transferencia', canal: 'WhatsApp', direccion: 'Envío discreto - Zona Norte' },
  ]
};

// ============ CLIENTES CRM ============
export interface ClienteTienda {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaRegistro: string;
  totalCompras: number;
  cantidadCompras: number;
  ultimaCompra: string;
  segmento: 'VIP' | 'Frecuente' | 'Ocasional' | 'Nuevo' | 'Inactivo';
  tags: string[];
  notas?: string;
  nps?: number;
}

export const CLIENTES_TIENDA: Record<string, ClienteTienda[]> = {
  'pet-vogue': [
    { id: 'CLI-PV-001', nombre: 'María González', email: 'maria.g@email.com', telefono: '+54 11 5555-1234', fechaRegistro: '2024-03-15', totalCompras: 850000, cantidadCompras: 12, ultimaCompra: '2026-01-13', segmento: 'VIP', tags: ['Perro grande', 'Premium'], nps: 10 },
    { id: 'CLI-PV-002', nombre: 'Carlos Rodríguez', email: 'carlos.r@email.com', telefono: '+54 11 5555-2345', fechaRegistro: '2024-06-20', totalCompras: 420000, cantidadCompras: 8, ultimaCompra: '2026-01-13', segmento: 'Frecuente', tags: ['Gato', 'Grooming'], nps: 9 },
    { id: 'CLI-PV-003', nombre: 'Ana Martínez', email: 'ana.m@email.com', telefono: '+54 11 5555-3456', fechaRegistro: '2025-01-10', totalCompras: 180000, cantidadCompras: 3, ultimaCompra: '2026-01-12', segmento: 'Ocasional', tags: ['Perro pequeño'] },
    { id: 'CLI-PV-004', nombre: 'Diego López', email: 'diego.l@email.com', telefono: '+54 11 5555-4567', fechaRegistro: '2025-08-05', totalCompras: 125000, cantidadCompras: 1, ultimaCompra: '2026-01-12', segmento: 'Nuevo', tags: ['Viajero', 'Perro mediano'], nps: 8 },
    { id: 'CLI-PV-005', nombre: 'Laura Fernández', email: 'laura.f@email.com', telefono: '+54 11 5555-5678', fechaRegistro: '2024-09-12', totalCompras: 340000, cantidadCompras: 6, ultimaCompra: '2026-01-11', segmento: 'Frecuente', tags: ['Gato', 'Orgánico'], nps: 10 },
    { id: 'CLI-PV-006', nombre: 'Roberto Sánchez', email: 'roberto.s@email.com', telefono: '+54 11 5555-6789', fechaRegistro: '2024-02-28', totalCompras: 95000, cantidadCompras: 2, ultimaCompra: '2025-06-15', segmento: 'Inactivo', tags: ['Perro'] },
  ],
  'coresmart': [
    { id: 'CLI-CS-001', nombre: 'TechSoft SA', email: 'compras@techsoft.com', telefono: '+54 11 4444-1111', fechaRegistro: '2024-01-20', totalCompras: 2450000, cantidadCompras: 18, ultimaCompra: '2026-01-13', segmento: 'VIP', tags: ['Empresa', 'B2B', 'Volumen'], nps: 9 },
    { id: 'CLI-CS-002', nombre: 'Martín Aguirre', email: 'martin.a@email.com', telefono: '+54 11 4444-2222', fechaRegistro: '2024-05-15', totalCompras: 680000, cantidadCompras: 7, ultimaCompra: '2026-01-13', segmento: 'Frecuente', tags: ['Seguridad', 'Hogar'], nps: 10 },
    { id: 'CLI-CS-003', nombre: 'Inmobiliaria Norte', email: 'admin@inmobiliarianorte.com', telefono: '+54 11 4444-3333', fechaRegistro: '2024-08-10', totalCompras: 1890000, cantidadCompras: 12, ultimaCompra: '2026-01-11', segmento: 'VIP', tags: ['Empresa', 'B2B', 'Instalaciones'], nps: 8 },
    { id: 'CLI-CS-004', nombre: 'Lucía Pereyra', email: 'lucia.p@email.com', telefono: '+54 11 4444-4444', fechaRegistro: '2025-02-28', totalCompras: 245000, cantidadCompras: 4, ultimaCompra: '2026-01-12', segmento: 'Ocasional', tags: ['Iluminación', 'Diseño'] },
    { id: 'CLI-CS-005', nombre: 'Federico Torres', email: 'fede.t@email.com', telefono: '+54 11 4444-5555', fechaRegistro: '2025-06-01', totalCompras: 145000, cantidadCompras: 1, ultimaCompra: '2026-01-12', segmento: 'Nuevo', tags: ['Seguridad'], nps: 9 },
  ],
  'sensuality': [
    { id: 'CLI-SN-001', nombre: 'Cliente Premium #101', email: 'vip101@privado.com', telefono: 'Privado', fechaRegistro: '2024-04-10', totalCompras: 1250000, cantidadCompras: 15, ultimaCompra: '2026-01-10', segmento: 'VIP', tags: ['Premium', 'Recurrente'], nps: 10 },
    { id: 'CLI-SN-002', nombre: 'Cliente Premium #102', email: 'vip102@privado.com', telefono: 'Privado', fechaRegistro: '2024-07-22', totalCompras: 780000, cantidadCompras: 9, ultimaCompra: '2026-01-08', segmento: 'Frecuente', tags: ['Lencería', 'Bienestar'] },
    { id: 'CLI-SN-003', nombre: 'Cliente #4521', email: 'privado@email.com', telefono: 'Privado', fechaRegistro: '2026-01-13', totalCompras: 125000, cantidadCompras: 1, ultimaCompra: '2026-01-13', segmento: 'Nuevo', tags: ['Romance'] },
    { id: 'CLI-SN-004', nombre: 'Cliente #4520', email: 'privado2@email.com', telefono: 'Privado', fechaRegistro: '2025-11-05', totalCompras: 340000, cantidadCompras: 4, ultimaCompra: '2026-01-13', segmento: 'Frecuente', tags: ['Aromaterapia', 'Masajes'] },
  ]
};

// ============ INVENTARIO TIENDA ============
export interface ProductoInventarioTienda {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  stockReservado: number;
  costoImportadora: number;
  precioVenta: number;
  margen: number;
  ubicacion: string;
  ultimaReposicion: string;
  estado: 'disponible' | 'stock_bajo' | 'sin_stock' | 'descontinuado';
}

export const INVENTARIO_TIENDA: Record<string, ProductoInventarioTienda[]> = {
  'pet-vogue': [
    { id: 'INV-PV-001', sku: 'PV-CAM-ORT-L', nombre: 'Cama Ortopédica Premium L', categoria: 'Camas', stock: 12, stockMinimo: 5, stockReservado: 2, costoImportadora: 45000, precioVenta: 89500, margen: 49.7, ubicacion: 'A-1-01', ultimaReposicion: '2026-01-05', estado: 'disponible' },
    { id: 'INV-PV-002', sku: 'PV-COM-WIFI', nombre: 'Comedero Inteligente WiFi', categoria: 'Alimentación', stock: 8, stockMinimo: 8, stockReservado: 1, costoImportadora: 22000, precioVenta: 45000, margen: 51.1, ubicacion: 'A-2-03', ultimaReposicion: '2026-01-02', estado: 'stock_bajo' },
    { id: 'INV-PV-003', sku: 'PV-ARN-ANT-M', nombre: 'Arnés Antitirones M', categoria: 'Paseo', stock: 25, stockMinimo: 10, stockReservado: 4, costoImportadora: 7500, precioVenta: 15000, margen: 50.0, ubicacion: 'B-1-05', ultimaReposicion: '2026-01-08', estado: 'disponible' },
    { id: 'INV-PV-004', sku: 'PV-KIT-GRO', nombre: 'Kit Grooming Profesional', categoria: 'Grooming', stock: 3, stockMinimo: 5, stockReservado: 0, costoImportadora: 35000, precioVenta: 67000, margen: 47.8, ubicacion: 'C-1-02', ultimaReposicion: '2025-12-20', estado: 'stock_bajo' },
    { id: 'INV-PV-005', sku: 'PV-COL-GPS', nombre: 'Collar GPS Tracker', categoria: 'Tecnología', stock: 0, stockMinimo: 3, stockReservado: 0, costoImportadora: 42000, precioVenta: 85000, margen: 50.6, ubicacion: 'C-2-01', ultimaReposicion: '2025-12-15', estado: 'sin_stock' },
    { id: 'INV-PV-006', sku: 'PV-TRA-AIR', nombre: 'Transportadora Airline Approved', categoria: 'Transporte', stock: 6, stockMinimo: 4, stockReservado: 1, costoImportadora: 65000, precioVenta: 125000, margen: 48.0, ubicacion: 'D-1-01', ultimaReposicion: '2026-01-10', estado: 'disponible' },
  ],
  'coresmart': [
    { id: 'INV-CS-001', sku: 'CS-HUB-PRO', nombre: 'Smart Hub Pro', categoria: 'Hubs', stock: 18, stockMinimo: 10, stockReservado: 5, costoImportadora: 22000, precioVenta: 45000, margen: 51.1, ubicacion: 'A-1-01', ultimaReposicion: '2026-01-10', estado: 'disponible' },
    { id: 'INV-CS-002', sku: 'CS-SEN-MOV', nombre: 'Sensor Movimiento WiFi', categoria: 'Sensores', stock: 45, stockMinimo: 20, stockReservado: 10, costoImportadora: 5500, precioVenta: 12000, margen: 54.2, ubicacion: 'A-2-05', ultimaReposicion: '2026-01-08', estado: 'disponible' },
    { id: 'INV-CS-003', sku: 'CS-CAM-360', nombre: 'Cámara IP 360° 4K', categoria: 'Seguridad', stock: 7, stockMinimo: 8, stockReservado: 2, costoImportadora: 45000, precioVenta: 89000, margen: 49.4, ubicacion: 'B-1-01', ultimaReposicion: '2026-01-05', estado: 'stock_bajo' },
    { id: 'INV-CS-004', sku: 'CS-CER-FP', nombre: 'Cerradura Smart Fingerprint', categoria: 'Seguridad', stock: 4, stockMinimo: 5, stockReservado: 1, costoImportadora: 72000, precioVenta: 145000, margen: 50.3, ubicacion: 'B-2-03', ultimaReposicion: '2025-12-28', estado: 'stock_bajo' },
    { id: 'INV-CS-005', sku: 'CS-TIM-VID', nombre: 'Timbre Video WiFi', categoria: 'Seguridad', stock: 0, stockMinimo: 10, stockReservado: 0, costoImportadora: 27000, precioVenta: 55000, margen: 50.9, ubicacion: 'B-3-01', ultimaReposicion: '2025-12-20', estado: 'sin_stock' },
    { id: 'INV-CS-006', sku: 'CS-KIT-RGB', nombre: 'Kit Iluminación Smart RGB', categoria: 'Iluminación', stock: 12, stockMinimo: 8, stockReservado: 1, costoImportadora: 33000, precioVenta: 67000, margen: 50.7, ubicacion: 'C-1-02', ultimaReposicion: '2026-01-12', estado: 'disponible' },
  ],
  'sensuality': [
    { id: 'INV-SN-001', sku: 'SN-KIT-ROM', nombre: 'Kit Romance Premium', categoria: 'Kits', stock: 8, stockMinimo: 5, stockReservado: 1, costoImportadora: 62000, precioVenta: 125000, margen: 50.4, ubicacion: 'A-1-01', ultimaReposicion: '2026-01-08', estado: 'disponible' },
    { id: 'INV-SN-002', sku: 'SN-ACE-MAS', nombre: 'Aceite Masajes Sensual 250ml', categoria: 'Aromaterapia', stock: 35, stockMinimo: 15, stockReservado: 3, costoImportadora: 8500, precioVenta: 18000, margen: 52.8, ubicacion: 'A-2-03', ultimaReposicion: '2026-01-10', estado: 'disponible' },
    { id: 'INV-SN-003', sku: 'SN-VEL-SET', nombre: 'Velas Aromáticas Set x6', categoria: 'Aromaterapia', stock: 20, stockMinimo: 10, stockReservado: 2, costoImportadora: 11500, precioVenta: 24000, margen: 52.1, ubicacion: 'A-2-05', ultimaReposicion: '2026-01-06', estado: 'disponible' },
    { id: 'INV-SN-004', sku: 'SN-LEN-LUX', nombre: 'Lencería Set Luxury', categoria: 'Lencería', stock: 4, stockMinimo: 6, stockReservado: 1, costoImportadora: 44000, precioVenta: 89000, margen: 50.6, ubicacion: 'B-1-01', ultimaReposicion: '2025-12-28', estado: 'stock_bajo' },
    { id: 'INV-SN-005', sku: 'SN-COL-BIE', nombre: 'Colección Bienestar Completa', categoria: 'Kits', stock: 2, stockMinimo: 3, stockReservado: 0, costoImportadora: 120000, precioVenta: 245000, margen: 51.0, ubicacion: 'B-2-01', ultimaReposicion: '2025-12-20', estado: 'stock_bajo' },
  ]
};

// ============ FINANZAS TIENDA (P&L) ============
export interface FinanzasTienda {
  tiendaId: string;
  mes: string;
  ingresosBrutos: number;
  costoMercaderia: number;
  margenBruto: number;
  gastosOperativos: { concepto: string; monto: number }[];
  totalGastosOperativos: number;
  ebitda: number;
  impuestos: number;
  resultadoNeto: number;
  deudaImportadora: number;
  pagosRealizados: { fecha: string; monto: number; concepto: string }[];
  proximosPagos: { fecha: string; monto: number; concepto: string }[];
}

export const FINANZAS_TIENDA: Record<string, FinanzasTienda> = {
  'pet-vogue': {
    tiendaId: 'pet-vogue',
    mes: '2026-01',
    ingresosBrutos: 2850000,
    costoMercaderia: 1425000,
    margenBruto: 1425000,
    gastosOperativos: [
      { concepto: 'Comisiones ML/MP', monto: 285000 },
      { concepto: 'Envíos y logística', monto: 142500 },
      { concepto: 'Marketing pagado', monto: 85000 },
      { concepto: 'Packaging', monto: 42000 },
      { concepto: 'Herramientas SaaS', monto: 25000 },
    ],
    totalGastosOperativos: 579500,
    ebitda: 845500,
    impuestos: 168000,
    resultadoNeto: 677500,
    deudaImportadora: 450000,
    pagosRealizados: [
      { fecha: '2026-01-10', monto: 350000, concepto: 'Reposición stock enero' },
      { fecha: '2026-01-05', monto: 280000, concepto: 'Saldo diciembre' },
    ],
    proximosPagos: [
      { fecha: '2026-01-20', monto: 450000, concepto: 'Reposición stock febrero' },
      { fecha: '2026-02-05', monto: 200000, concepto: 'Saldo enero' },
    ]
  },
  'coresmart': {
    tiendaId: 'coresmart',
    mes: '2026-01',
    ingresosBrutos: 3200000,
    costoMercaderia: 1600000,
    margenBruto: 1600000,
    gastosOperativos: [
      { concepto: 'Comisiones ML/MP', monto: 256000 },
      { concepto: 'Envíos y logística', monto: 128000 },
      { concepto: 'Marketing pagado', monto: 120000 },
      { concepto: 'Soporte técnico', monto: 80000 },
      { concepto: 'Herramientas SaaS', monto: 35000 },
    ],
    totalGastosOperativos: 619000,
    ebitda: 981000,
    impuestos: 196000,
    resultadoNeto: 785000,
    deudaImportadora: 680000,
    pagosRealizados: [
      { fecha: '2026-01-12', monto: 420000, concepto: 'Reposición stock enero' },
      { fecha: '2026-01-03', monto: 380000, concepto: 'Saldo diciembre' },
    ],
    proximosPagos: [
      { fecha: '2026-01-25', monto: 680000, concepto: 'Reposición stock febrero' },
      { fecha: '2026-02-10', monto: 300000, concepto: 'Saldo enero' },
    ]
  },
  'sensuality': {
    tiendaId: 'sensuality',
    mes: '2026-01',
    ingresosBrutos: 2250000,
    costoMercaderia: 1080000,
    margenBruto: 1170000,
    gastosOperativos: [
      { concepto: 'Comisiones MP', monto: 180000 },
      { concepto: 'Envíos discretos', monto: 135000 },
      { concepto: 'Marketing (influencers)', monto: 150000 },
      { concepto: 'Packaging premium', monto: 90000 },
      { concepto: 'Herramientas SaaS', monto: 20000 },
    ],
    totalGastosOperativos: 575000,
    ebitda: 595000,
    impuestos: 119000,
    resultadoNeto: 476000,
    deudaImportadora: 320000,
    pagosRealizados: [
      { fecha: '2026-01-08', monto: 250000, concepto: 'Reposición stock enero' },
      { fecha: '2026-01-02', monto: 180000, concepto: 'Saldo diciembre' },
    ],
    proximosPagos: [
      { fecha: '2026-01-22', monto: 320000, concepto: 'Reposición stock febrero' },
      { fecha: '2026-02-05', monto: 150000, concepto: 'Saldo enero' },
    ]
  }
};

// ============ POSTVENTA ============
export interface CasoPostventa {
  id: string;
  fecha: string;
  pedidoId: string;
  cliente: string;
  tipo: 'devolucion' | 'garantia' | 'reclamo' | 'cambio';
  producto: string;
  motivo: string;
  estado: 'abierto' | 'en_proceso' | 'resuelto' | 'cerrado';
  prioridad: 'alta' | 'media' | 'baja';
  asignado: string;
  resolucion?: string;
  csat?: number;
}

export const CASOS_POSTVENTA: Record<string, CasoPostventa[]> = {
  'pet-vogue': [
    { id: 'PV-POST-001', fecha: '2026-01-12', pedidoId: 'PV-001220', cliente: 'Juan Méndez', tipo: 'devolucion', producto: 'Cama Ortopédica Premium M', motivo: 'Talla incorrecta', estado: 'en_proceso', prioridad: 'media', asignado: 'Agente AI' },
    { id: 'PV-POST-002', fecha: '2026-01-11', pedidoId: 'PV-001198', cliente: 'Sofía Ruiz', tipo: 'garantia', producto: 'Comedero Inteligente WiFi', motivo: 'Falla en sensor', estado: 'abierto', prioridad: 'alta', asignado: 'Soporte Humano' },
    { id: 'PV-POST-003', fecha: '2026-01-10', pedidoId: 'PV-001185', cliente: 'Pedro Álvarez', tipo: 'reclamo', producto: 'Kit Grooming', motivo: 'Producto incompleto', estado: 'resuelto', prioridad: 'alta', asignado: 'Agente AI', resolucion: 'Enviado pieza faltante', csat: 8 },
    { id: 'PV-POST-004', fecha: '2026-01-08', pedidoId: 'PV-001170', cliente: 'Carla Díaz', tipo: 'cambio', producto: 'Arnés M', motivo: 'Cambio de color', estado: 'cerrado', prioridad: 'baja', asignado: 'Agente AI', resolucion: 'Cambio realizado', csat: 10 },
  ],
  'coresmart': [
    { id: 'CS-POST-001', fecha: '2026-01-13', pedidoId: 'CS-002140', cliente: 'Empresa ABC', tipo: 'garantia', producto: 'Cámara IP 360°', motivo: 'No conecta WiFi', estado: 'abierto', prioridad: 'alta', asignado: 'Soporte Técnico' },
    { id: 'CS-POST-002', fecha: '2026-01-11', pedidoId: 'CS-002125', cliente: 'Ricardo Paz', tipo: 'reclamo', producto: 'Smart Hub Pro', motivo: 'Llegó dañado', estado: 'en_proceso', prioridad: 'alta', asignado: 'Soporte Humano' },
    { id: 'CS-POST-003', fecha: '2026-01-09', pedidoId: 'CS-002110', cliente: 'Marina López', tipo: 'devolucion', producto: 'Kit Iluminación', motivo: 'No compatible', estado: 'resuelto', prioridad: 'media', asignado: 'Agente AI', resolucion: 'Devolución procesada', csat: 7 },
  ],
  'sensuality': [
    { id: 'SN-POST-001', fecha: '2026-01-12', pedidoId: 'SN-003070', cliente: 'Cliente #4498', tipo: 'cambio', producto: 'Lencería Set', motivo: 'Talla incorrecta', estado: 'en_proceso', prioridad: 'media', asignado: 'Agente AI' },
    { id: 'SN-POST-002', fecha: '2026-01-10', pedidoId: 'SN-003055', cliente: 'Cliente #4485', tipo: 'devolucion', producto: 'Kit Romance', motivo: 'No cumple expectativas', estado: 'resuelto', prioridad: 'baja', asignado: 'Agente AI', resolucion: 'Devolución aprobada', csat: 6 },
  ]
};

// ============ MARKETING TIENDA (desde Central) ============
export interface ContenidoMarketing {
  id: string;
  fecha: string;
  tipo: 'post' | 'reel' | 'story' | 'email' | 'ad';
  plataforma: string;
  titulo: string;
  estado: 'programado' | 'publicado' | 'borrador' | 'aprobacion';
  engagement?: { likes: number; comments: number; shares: number; reach: number };
  asignadoA: string;
}

export const MARKETING_TIENDA: Record<string, ContenidoMarketing[]> = {
  'pet-vogue': [
    { id: 'MKT-PV-001', fecha: '2026-01-13', tipo: 'post', plataforma: 'Instagram', titulo: 'Producto destacado: Cama Ortopédica', estado: 'publicado', engagement: { likes: 234, comments: 18, shares: 12, reach: 4500 }, asignadoA: 'Avatar Emma' },
    { id: 'MKT-PV-002', fecha: '2026-01-14', tipo: 'reel', plataforma: 'Instagram', titulo: 'Tutorial: Uso del comedero WiFi', estado: 'programado', asignadoA: 'Avatar Emma' },
    { id: 'MKT-PV-003', fecha: '2026-01-15', tipo: 'story', plataforma: 'Instagram', titulo: 'Detrás de escena: Empaque pedidos', estado: 'borrador', asignadoA: 'Marketing Central' },
    { id: 'MKT-PV-004', fecha: '2026-01-16', tipo: 'email', plataforma: 'Email', titulo: 'Newsletter: Novedades enero', estado: 'aprobacion', asignadoA: 'Marketing Central' },
  ],
  'coresmart': [
    { id: 'MKT-CS-001', fecha: '2026-01-13', tipo: 'post', plataforma: 'Instagram', titulo: 'Smart Home 2026: Tendencias', estado: 'publicado', engagement: { likes: 189, comments: 24, shares: 31, reach: 5200 }, asignadoA: 'Avatar Tech' },
    { id: 'MKT-CS-002', fecha: '2026-01-14', tipo: 'reel', plataforma: 'TikTok', titulo: 'Instalación cerradura smart', estado: 'programado', asignadoA: 'Avatar Tech' },
    { id: 'MKT-CS-003', fecha: '2026-01-15', tipo: 'ad', plataforma: 'Meta Ads', titulo: 'Campaña Seguridad Hogar', estado: 'publicado', engagement: { likes: 0, comments: 0, shares: 0, reach: 12500 }, asignadoA: 'Marketing Central' },
  ],
  'sensuality': [
    { id: 'MKT-SN-001', fecha: '2026-01-13', tipo: 'story', plataforma: 'Instagram', titulo: 'Tips bienestar pareja', estado: 'publicado', engagement: { likes: 156, comments: 8, shares: 5, reach: 3200 }, asignadoA: 'Avatar Sofia' },
    { id: 'MKT-SN-002', fecha: '2026-01-14', tipo: 'post', plataforma: 'Instagram', titulo: 'Aromaterapia: Beneficios', estado: 'programado', asignadoA: 'Avatar Sofia' },
    { id: 'MKT-SN-003', fecha: '2026-01-16', tipo: 'email', plataforma: 'Email', titulo: 'Promo San Valentín', estado: 'borrador', asignadoA: 'Marketing Central' },
  ]
};

// ============ AGENTES AI TIENDA ============
export interface AgenteTienda {
  id: string;
  nombre: string;
  tipo: 'ventas' | 'soporte' | 'postventa' | 'marketing';
  estado: 'online' | 'offline' | 'entrenamiento';
  conversacionesHoy: number;
  resolucionAutomatica: number;
  tiempoRespuestaPromedio: number; // segundos
  satisfaccion: number;
  escalaciones: number;
  ultimaActualizacion: string;
}

export const AGENTES_TIENDA: Record<string, AgenteTienda[]> = {
  'pet-vogue': [
    { id: 'AG-PV-VEN', nombre: 'Luna Ventas', tipo: 'ventas', estado: 'online', conversacionesHoy: 45, resolucionAutomatica: 92, tiempoRespuestaPromedio: 8, satisfaccion: 4.8, escalaciones: 4, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-PV-SOP', nombre: 'Luna Soporte', tipo: 'soporte', estado: 'online', conversacionesHoy: 28, resolucionAutomatica: 85, tiempoRespuestaPromedio: 15, satisfaccion: 4.6, escalaciones: 6, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-PV-POST', nombre: 'Luna Postventa', tipo: 'postventa', estado: 'online', conversacionesHoy: 12, resolucionAutomatica: 78, tiempoRespuestaPromedio: 25, satisfaccion: 4.5, escalaciones: 3, ultimaActualizacion: '2026-01-13T10:30:00' },
  ],
  'coresmart': [
    { id: 'AG-CS-VEN', nombre: 'Core Ventas', tipo: 'ventas', estado: 'online', conversacionesHoy: 38, resolucionAutomatica: 88, tiempoRespuestaPromedio: 12, satisfaccion: 4.7, escalaciones: 5, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-CS-SOP', nombre: 'Core Soporte', tipo: 'soporte', estado: 'online', conversacionesHoy: 52, resolucionAutomatica: 82, tiempoRespuestaPromedio: 20, satisfaccion: 4.5, escalaciones: 10, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-CS-POST', nombre: 'Core Postventa', tipo: 'postventa', estado: 'entrenamiento', conversacionesHoy: 0, resolucionAutomatica: 0, tiempoRespuestaPromedio: 0, satisfaccion: 0, escalaciones: 0, ultimaActualizacion: '2026-01-12T18:00:00' },
  ],
  'sensuality': [
    { id: 'AG-SN-VEN', nombre: 'Mía Ventas', tipo: 'ventas', estado: 'online', conversacionesHoy: 22, resolucionAutomatica: 95, tiempoRespuestaPromedio: 6, satisfaccion: 4.9, escalaciones: 1, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-SN-SOP', nombre: 'Mía Soporte', tipo: 'soporte', estado: 'online', conversacionesHoy: 15, resolucionAutomatica: 90, tiempoRespuestaPromedio: 10, satisfaccion: 4.8, escalaciones: 2, ultimaActualizacion: '2026-01-13T10:30:00' },
    { id: 'AG-SN-POST', nombre: 'Mía Postventa', tipo: 'postventa', estado: 'online', conversacionesHoy: 8, resolucionAutomatica: 88, tiempoRespuestaPromedio: 18, satisfaccion: 4.7, escalaciones: 1, ultimaActualizacion: '2026-01-13T10:30:00' },
  ]
};

// ============ SOLICITUDES A IMPORTADORA ============
export interface SolicitudReposicion {
  id: string;
  fecha: string;
  productos: { sku: string; nombre: string; cantidad: number; urgencia: 'normal' | 'urgente' }[];
  estado: 'pendiente' | 'aprobada' | 'en_preparacion' | 'enviada' | 'recibida';
  montoEstimado: number;
  fechaEstimadaEntrega?: string;
  notas?: string;
}

export const SOLICITUDES_REPOSICION: Record<string, SolicitudReposicion[]> = {
  'pet-vogue': [
    { id: 'SOL-PV-001', fecha: '2026-01-13', productos: [{ sku: 'PV-COL-GPS', nombre: 'Collar GPS Tracker', cantidad: 10, urgencia: 'urgente' }, { sku: 'PV-KIT-GRO', nombre: 'Kit Grooming Profesional', cantidad: 8, urgencia: 'normal' }], estado: 'pendiente', montoEstimado: 700000 },
    { id: 'SOL-PV-002', fecha: '2026-01-10', productos: [{ sku: 'PV-COM-WIFI', nombre: 'Comedero Inteligente WiFi', cantidad: 15, urgencia: 'normal' }], estado: 'en_preparacion', montoEstimado: 330000, fechaEstimadaEntrega: '2026-01-16' },
  ],
  'coresmart': [
    { id: 'SOL-CS-001', fecha: '2026-01-13', productos: [{ sku: 'CS-TIM-VID', nombre: 'Timbre Video WiFi', cantidad: 20, urgencia: 'urgente' }, { sku: 'CS-CAM-360', nombre: 'Cámara IP 360° 4K', cantidad: 10, urgencia: 'normal' }], estado: 'aprobada', montoEstimado: 990000, fechaEstimadaEntrega: '2026-01-17' },
  ],
  'sensuality': [
    { id: 'SOL-SN-001', fecha: '2026-01-12', productos: [{ sku: 'SN-LEN-LUX', nombre: 'Lencería Set Luxury', cantidad: 10, urgencia: 'normal' }, { sku: 'SN-COL-BIE', nombre: 'Colección Bienestar Completa', cantidad: 5, urgencia: 'normal' }], estado: 'enviada', montoEstimado: 1040000, fechaEstimadaEntrega: '2026-01-15' },
  ]
};
