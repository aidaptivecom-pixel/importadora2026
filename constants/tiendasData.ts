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

export const PEDIDOS_TIENDA: Record&lt;string, PedidoTienda[]&gt; = {
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

export const CLIENTES_TIENDA: Record&lt;string, ClienteTienda[]&gt; = {
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

export const INVENTARIO_TIENDA: Record&lt;string, ProductoInventarioTienda[]&gt; = {
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

export const FINANZAS_TIENDA: Record&lt;string, FinanzasTienda&gt; = {
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

export const CASOS_POSTVENTA: Record&lt;string, CasoPostventa[]&gt; = {
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

export const MARKETING_TIENDA: Record&lt;string, ContenidoMarketing[]&gt; = {
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

export const AGENTES_TIENDA: Record&lt;string, AgenteTienda[]&gt; = {
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

export const SOLICITUDES_REPOSICION: Record&lt;string, SolicitudReposicion[]&gt; = {
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

// ============ INBOX UNIFICADO MULTICANAL ============
export interface MensajeChat {
  id: string;
  tipo: 'entrante' | 'saliente';
  contenido: string;
  fecha: string;
  hora: string;
  autor: string;
  autorTipo: 'cliente' | 'agente_ai' | 'humano';
  leido: boolean;
}

export interface MensajeInbox {
  id: string;
  conversacionId: string;
  canal: 'whatsapp' | 'instagram' | 'mercadolibre' | 'email' | 'web_chat' | 'facebook';
  cliente: {
    id: string;
    nombre: string;
    avatar?: string;
    telefono?: string;
    email?: string;
  };
  asunto?: string;
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  horaUltimoMensaje: string;
  estado: 'nuevo' | 'en_proceso' | 'respondido' | 'cerrado' | 'esperando_cliente';
  prioridad: 'alta' | 'media' | 'baja';
  asignado: 'Agente AI' | 'Soporte Humano' | 'Sin asignar';
  etiquetas: string[];
  mensajesSinLeer: number;
  tiempoEspera?: number;
  pedidoRelacionado?: string;
  sentimiento?: 'positivo' | 'neutral' | 'negativo';
}

export const INBOX_TIENDA: Record&lt;string, MensajeInbox[]&gt; = {
  'pet-vogue': [
    {
      id: 'INB-PV-001',
      conversacionId: 'CONV-PV-001',
      canal: 'whatsapp',
      cliente: { id: 'CLI-PV-001', nombre: 'María González', telefono: '+54 11 5555-1234' },
      ultimoMensaje: 'Hola! Quería consultar si tienen stock del collar GPS en color negro. Gracias!',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:45',
      estado: 'nuevo',
      prioridad: 'alta',
      asignado: 'Agente AI',
      etiquetas: ['Consulta stock', 'VIP'],
      mensajesSinLeer: 1,
      tiempoEspera: 5,
      sentimiento: 'positivo'
    },
    {
      id: 'INB-PV-002',
      conversacionId: 'CONV-PV-002',
      canal: 'instagram',
      cliente: { id: 'CLI-PV-NEW-01', nombre: 'Luciana_pets', avatar: '🐕' },
      ultimoMensaje: 'Me encantó la cama que compraron mis amigos para su golden! Envían a zona sur?',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:32',
      estado: 'en_proceso',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Nuevo cliente', 'Envíos'],
      mensajesSinLeer: 0,
      tiempoEspera: 18,
      sentimiento: 'positivo'
    },
    {
      id: 'INB-PV-003',
      conversacionId: 'CONV-PV-003',
      canal: 'mercadolibre',
      cliente: { id: 'CLI-PV-002', nombre: 'Carlos Rodríguez', email: 'carlos.r@email.com' },
      asunto: 'Pregunta sobre Arnés Antitirones M',
      ultimoMensaje: 'Sirve para un labrador de 30kg? Necesito saber antes de comprarlo',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '09:58',
      estado: 'respondido',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Pre-venta', 'MercadoLibre'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'PV-001233',
      sentimiento: 'neutral'
    },
    {
      id: 'INB-PV-004',
      conversacionId: 'CONV-PV-004',
      canal: 'email',
      cliente: { id: 'CLI-PV-003', nombre: 'Ana Martínez', email: 'ana.m@email.com' },
      asunto: 'RE: Seguimiento de mi pedido PV-001232',
      ultimoMensaje: 'Perfecto, gracias por la info! Quedo atenta al tracking.',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '09:15',
      estado: 'cerrado',
      prioridad: 'baja',
      asignado: 'Agente AI',
      etiquetas: ['Seguimiento', 'Resuelto'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'PV-001232',
      sentimiento: 'positivo'
    },
    {
      id: 'INB-PV-005',
      conversacionId: 'CONV-PV-005',
      canal: 'whatsapp',
      cliente: { id: 'CLI-PV-006', nombre: 'Roberto Sánchez', telefono: '+54 11 5555-6789' },
      ultimoMensaje: 'Necesito cancelar mi pedido URGENTE. No me contestan!!',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '08:22',
      estado: 'en_proceso',
      prioridad: 'alta',
      asignado: 'Soporte Humano',
      etiquetas: ['Cancelación', 'Urgente', 'Escalado'],
      mensajesSinLeer: 3,
      tiempoEspera: 148,
      pedidoRelacionado: 'PV-001229',
      sentimiento: 'negativo'
    },
    {
      id: 'INB-PV-006',
      conversacionId: 'CONV-PV-006',
      canal: 'web_chat',
      cliente: { id: 'CLI-PV-NEW-02', nombre: 'Visitante Web', avatar: '👤' },
      ultimoMensaje: 'Tienen descuento por cantidad? Quiero comprar 5 camas para mi guardería canina',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:52',
      estado: 'nuevo',
      prioridad: 'alta',
      asignado: 'Agente AI',
      etiquetas: ['Mayorista', 'Oportunidad'],
      mensajesSinLeer: 1,
      tiempoEspera: 2,
      sentimiento: 'positivo'
    },
    {
      id: 'INB-PV-007',
      conversacionId: 'CONV-PV-007',
      canal: 'instagram',
      cliente: { id: 'CLI-PV-004', nombre: 'Diego López', avatar: '🐾' },
      ultimoMensaje: 'Genial el servicio! Ya llegó mi transportadora. 10 puntos 👏',
      fechaUltimoMensaje: '2026-01-12',
      horaUltimoMensaje: '18:45',
      estado: 'cerrado',
      prioridad: 'baja',
      asignado: 'Agente AI',
      etiquetas: ['Feedback positivo', 'NPS'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'PV-001231',
      sentimiento: 'positivo'
    },
    {
      id: 'INB-PV-008',
      conversacionId: 'CONV-PV-008',
      canal: 'facebook',
      cliente: { id: 'CLI-PV-NEW-03', nombre: 'Mariana B.', avatar: '🐱' },
      ultimoMensaje: 'El comedero sirve para gatos? O es solo para perros?',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '07:30',
      estado: 'esperando_cliente',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Consulta producto'],
      mensajesSinLeer: 0,
      tiempoEspera: 0,
      sentimiento: 'neutral'
    }
  ],
  'coresmart': [
    {
      id: 'INB-CS-001',
      conversacionId: 'CONV-CS-001',
      canal: 'whatsapp',
      cliente: { id: 'CLI-CS-001', nombre: 'TechSoft SA', telefono: '+54 11 4444-1111', email: 'compras@techsoft.com' },
      ultimoMensaje: 'Necesitamos cotización para 20 Smart Hubs y 50 sensores. Es para un proyecto corporativo.',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '11:02',
      estado: 'nuevo',
      prioridad: 'alta',
      asignado: 'Agente AI',
      etiquetas: ['B2B', 'VIP', 'Cotización'],
      mensajesSinLeer: 1,
      tiempoEspera: 3,
      sentimiento: 'neutral'
    },
    {
      id: 'INB-CS-002',
      conversacionId: 'CONV-CS-002',
      canal: 'mercadolibre',
      cliente: { id: 'CLI-CS-002', nombre: 'Martín Aguirre', email: 'martin.a@email.com' },
      asunto: 'Consulta sobre Cámara IP 360° 4K',
      ultimoMensaje: 'Tiene visión nocturna? Cuántos metros de alcance?',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:28',
      estado: 'respondido',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Pre-venta', 'Especificaciones'],
      mensajesSinLeer: 0,
      sentimiento: 'neutral'
    },
    {
      id: 'INB-CS-003',
      conversacionId: 'CONV-CS-003',
      canal: 'email',
      cliente: { id: 'CLI-CS-003', nombre: 'Inmobiliaria Norte', email: 'admin@inmobiliarianorte.com' },
      asunto: 'Soporte técnico - Timbres no funcionan correctamente',
      ultimoMensaje: '3 de los 8 timbres instalados tienen delay en la notificación. Necesitamos solución urgente.',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '09:45',
      estado: 'en_proceso',
      prioridad: 'alta',
      asignado: 'Soporte Humano',
      etiquetas: ['Soporte técnico', 'VIP', 'Urgente'],
      mensajesSinLeer: 2,
      tiempoEspera: 75,
      pedidoRelacionado: 'CS-002152',
      sentimiento: 'negativo'
    },
    {
      id: 'INB-CS-004',
      conversacionId: 'CONV-CS-004',
      canal: 'web_chat',
      cliente: { id: 'CLI-CS-NEW-01', nombre: 'Visitante Web', avatar: '👤' },
      ultimoMensaje: 'La cerradura smart es compatible con Google Home?',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:55',
      estado: 'nuevo',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Compatibilidad', 'Pre-venta'],
      mensajesSinLeer: 1,
      tiempoEspera: 1,
      sentimiento: 'neutral'
    },
    {
      id: 'INB-CS-005',
      conversacionId: 'CONV-CS-005',
      canal: 'instagram',
      cliente: { id: 'CLI-CS-004', nombre: 'Lucía Pereyra', avatar: '💡' },
      ultimoMensaje: 'Mil gracias por el kit de iluminación! Quedó increíble mi depto 🙌',
      fechaUltimoMensaje: '2026-01-12',
      horaUltimoMensaje: '20:12',
      estado: 'cerrado',
      prioridad: 'baja',
      asignado: 'Agente AI',
      etiquetas: ['Feedback positivo'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'CS-002154',
      sentimiento: 'positivo'
    },
    {
      id: 'INB-CS-006',
      conversacionId: 'CONV-CS-006',
      canal: 'whatsapp',
      cliente: { id: 'CLI-CS-005', nombre: 'Federico Torres', telefono: '+54 11 4444-5555' },
      ultimoMensaje: 'Cómo hago para agregar más huellas a la cerradura? El manual no es muy claro',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '08:15',
      estado: 'esperando_cliente',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Soporte', 'Tutorial'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'CS-002153',
      sentimiento: 'neutral'
    }
  ],
  'sensuality': [
    {
      id: 'INB-SN-001',
      conversacionId: 'CONV-SN-001',
      canal: 'whatsapp',
      cliente: { id: 'CLI-SN-001', nombre: 'Cliente Premium #101', telefono: 'Privado' },
      ultimoMensaje: 'Tienen novedades para San Valentín? Me interesa algo especial',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:38',
      estado: 'en_proceso',
      prioridad: 'alta',
      asignado: 'Agente AI',
      etiquetas: ['VIP', 'San Valentín'],
      mensajesSinLeer: 0,
      tiempoEspera: 12,
      sentimiento: 'positivo'
    },
    {
      id: 'INB-SN-002',
      conversacionId: 'CONV-SN-002',
      canal: 'web_chat',
      cliente: { id: 'CLI-SN-NEW-01', nombre: 'Visitante Anónimo', avatar: '👤' },
      ultimoMensaje: 'El envío es discreto? No quiero que figure el nombre de la tienda en el paquete',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '10:48',
      estado: 'nuevo',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Envío discreto', 'Nuevo cliente'],
      mensajesSinLeer: 1,
      tiempoEspera: 6,
      sentimiento: 'neutral'
    },
    {
      id: 'INB-SN-003',
      conversacionId: 'CONV-SN-003',
      canal: 'instagram',
      cliente: { id: 'CLI-SN-002', nombre: 'Cliente Premium #102', avatar: '💜' },
      ultimoMensaje: 'Los aceites nuevos tienen aroma a lavanda? Es mi favorito',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '09:22',
      estado: 'respondido',
      prioridad: 'media',
      asignado: 'Agente AI',
      etiquetas: ['Productos', 'Frecuente'],
      mensajesSinLeer: 0,
      sentimiento: 'positivo'
    },
    {
      id: 'INB-SN-004',
      conversacionId: 'CONV-SN-004',
      canal: 'email',
      cliente: { id: 'CLI-SN-004', nombre: 'Cliente #4520', email: 'privado2@email.com' },
      asunto: 'Consulta sobre mi pedido SN-003088',
      ultimoMensaje: 'Cuándo estiman que llegue? Necesito que sea antes del viernes.',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '08:55',
      estado: 'en_proceso',
      prioridad: 'alta',
      asignado: 'Agente AI',
      etiquetas: ['Seguimiento', 'Urgente'],
      mensajesSinLeer: 1,
      tiempoEspera: 65,
      pedidoRelacionado: 'SN-003088',
      sentimiento: 'neutral'
    },
    {
      id: 'INB-SN-005',
      conversacionId: 'CONV-SN-005',
      canal: 'whatsapp',
      cliente: { id: 'CLI-SN-003', nombre: 'Cliente #4521', telefono: 'Privado' },
      ultimoMensaje: 'Perfecto, ya realicé el pago. Me avisan cuando despachen?',
      fechaUltimoMensaje: '2026-01-13',
      horaUltimoMensaje: '07:40',
      estado: 'cerrado',
      prioridad: 'baja',
      asignado: 'Agente AI',
      etiquetas: ['Pago confirmado'],
      mensajesSinLeer: 0,
      pedidoRelacionado: 'SN-003089',
      sentimiento: 'positivo'
    }
  ]
};

// ============ HISTORIAL DE CONVERSACIONES ============
export const CONVERSACIONES_CHAT: Record&lt;string, MensajeChat[]&gt; = {
  // Pet Vogue - María González (consulta stock GPS)
  'CONV-PV-001': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Quería consultar si tienen stock del collar GPS en color negro. Gracias!', fecha: '2026-01-13', hora: '10:45', autor: 'María González', autorTipo: 'cliente', leido: true }
  ],
  
  // Pet Vogue - Luciana_pets (envíos zona sur)
  'CONV-PV-002': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Me encantó la cama que compraron mis amigos para su golden!', fecha: '2026-01-13', hora: '10:15', autor: 'Luciana_pets', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Luciana! 🐕 ¡Qué bueno que te gustó! Es una de nuestras camas más populares. La Cama Ortopédica Premium es perfecta para razas grandes como el Golden. ¿En qué puedo ayudarte hoy?', fecha: '2026-01-13', hora: '10:16', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Envían a zona sur? Estoy en Quilmes', fecha: '2026-01-13', hora: '10:28', autor: 'Luciana_pets', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Sí, por supuesto! Hacemos envíos a todo el país 📦 Para Quilmes el envío sale $3.500 y llega en 2-3 días hábiles. También tenés la opción de retiro gratis en nuestro showroom de CABA (Palermo). ¿Querés que te arme un presupuesto con la cama?', fecha: '2026-01-13', hora: '10:29', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'entrante', contenido: 'Me encantó la cama que compraron mis amigos para su golden! Envían a zona sur?', fecha: '2026-01-13', hora: '10:32', autor: 'Luciana_pets', autorTipo: 'cliente', leido: true }
  ],
  
  // Pet Vogue - Carlos (MercadoLibre arnés)
  'CONV-PV-003': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, tengo una consulta sobre el arnés antitirones', fecha: '2026-01-13', hora: '09:45', autor: 'Carlos Rodríguez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Carlos! Gracias por tu consulta. El Arnés Antitirones es uno de nuestros productos más vendidos. ¿Qué necesitás saber?', fecha: '2026-01-13', hora: '09:46', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Sirve para un labrador de 30kg? Necesito saber antes de comprarlo', fecha: '2026-01-13', hora: '09:58', autor: 'Carlos Rodríguez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Perfecto para tu labrador! 🐕 El talle M que estás viendo es ideal para perros de 20-35kg. El arnés tiene ajuste en 4 puntos para un calce perfecto. Además viene con garantía de 6 meses. ¿Querés que te lo reserve?', fecha: '2026-01-13', hora: '09:59', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Pet Vogue - Ana (seguimiento pedido)
  'CONV-PV-004': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, quería saber el estado de mi pedido PV-001232', fecha: '2026-01-13', hora: '08:30', autor: 'Ana Martínez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Ana! 📦 Tu pedido PV-001232 ya fue despachado. Incluye el Kit Grooming Profesional y 3 Shampoos Orgánicos. El tracking es OCA-123456789. Podés seguirlo en https://oca.com.ar/tracking', fecha: '2026-01-13', hora: '08:31', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Genial! Y cuando llega aproximadamente?', fecha: '2026-01-13', hora: '08:45', autor: 'Ana Martínez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: 'Según el tracking, la entrega estimada es mañana (14/01) entre las 9 y 18hs en tu domicilio de Quilmes. Te van a enviar un SMS cuando salga a reparto. ¿Necesitás algo más?', fecha: '2026-01-13', hora: '08:46', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'entrante', contenido: 'Perfecto, gracias por la info! Quedo atenta al tracking.', fecha: '2026-01-13', hora: '09:15', autor: 'Ana Martínez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-006', tipo: 'saliente', contenido: '¡De nada Ana! Cualquier consulta estamos acá. Que disfrutes tus productos 🐾✨', fecha: '2026-01-13', hora: '09:16', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Pet Vogue - Roberto (cancelación ESCALADO)
  'CONV-PV-005': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola necesito cancelar mi pedido', fecha: '2026-01-13', hora: '07:45', autor: 'Roberto Sánchez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Roberto! Lamento que quieras cancelar. ¿Podrías indicarme el número de pedido y el motivo? Así puedo ayudarte mejor.', fecha: '2026-01-13', hora: '07:46', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Es el PV-001229. Me equivoqué de producto', fecha: '2026-01-13', hora: '07:50', autor: 'Roberto Sánchez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: 'Entiendo Roberto. Veo que tu pedido del Collar GPS ya está en preparación. Voy a consultar con el equipo si podemos detenerlo. Dame unos minutos por favor.', fecha: '2026-01-13', hora: '07:51', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'entrante', contenido: 'Pero necesito cancelarlo YA. No quiero ese producto!!', fecha: '2026-01-13', hora: '08:05', autor: 'Roberto Sánchez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-006', tipo: 'entrante', contenido: 'HOLA??? ALGUIEN ME RESPONDE??', fecha: '2026-01-13', hora: '08:15', autor: 'Roberto Sánchez', autorTipo: 'cliente', leido: true },
    { id: 'MSG-007', tipo: 'saliente', contenido: '⚠️ He escalado tu caso a un agente humano que te va a contactar en breve para resolver la cancelación. Disculpá la demora Roberto.', fecha: '2026-01-13', hora: '08:16', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-008', tipo: 'entrante', contenido: 'Necesito cancelar mi pedido URGENTE. No me contestan!!', fecha: '2026-01-13', hora: '08:22', autor: 'Roberto Sánchez', autorTipo: 'cliente', leido: false }
  ],
  
  // Pet Vogue - Visitante mayorista
  'CONV-PV-006': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Tengo una guardería canina y me interesan sus productos', fecha: '2026-01-13', hora: '10:48', autor: 'Visitante Web', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! 🐾 ¡Qué bueno! Trabajamos con varias guarderías y veterinarias. ¿Qué productos te interesan?', fecha: '2026-01-13', hora: '10:49', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Tienen descuento por cantidad? Quiero comprar 5 camas para mi guardería canina', fecha: '2026-01-13', hora: '10:52', autor: 'Visitante Web', autorTipo: 'cliente', leido: false }
  ],
  
  // Pet Vogue - Diego feedback positivo
  'CONV-PV-007': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Solo quería agradecerles', fecha: '2026-01-12', hora: '18:30', autor: 'Diego López', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Diego! ¿Todo bien con tu pedido? 🐾', fecha: '2026-01-12', hora: '18:31', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Genial el servicio! Ya llegó mi transportadora. 10 puntos 👏', fecha: '2026-01-12', hora: '18:45', autor: 'Diego López', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Qué alegría Diego! 🎉 Nos encanta saber que todo llegó perfecto. Si tenés un minuto, ¿podrías dejarnos una reseña en MercadoLibre? Nos ayuda mucho. ¡Gracias por elegirnos!', fecha: '2026-01-12', hora: '18:46', autor: 'Luna Soporte', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Pet Vogue - Mariana (consulta gatos)
  'CONV-PV-008': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Vi el comedero inteligente en su página', fecha: '2026-01-13', hora: '07:20', autor: 'Mariana B.', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Mariana! Sí, el Comedero Inteligente WiFi es uno de nuestros productos estrella ⭐ ¿Tenés alguna consulta?', fecha: '2026-01-13', hora: '07:21', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'El comedero sirve para gatos? O es solo para perros?', fecha: '2026-01-13', hora: '07:30', autor: 'Mariana B.', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Sirve para ambos! 🐱🐕 El comedero tiene capacidad de 4L y porciones programables desde 10g, ideal para gatos. Muchos clientes lo usan para sus michis. ¿Tu gato es de comer mucho o poco?', fecha: '2026-01-13', hora: '07:31', autor: 'Luna Ventas', autorTipo: 'agente_ai', leido: true }
  ],

  // CoreSmart - TechSoft cotización B2B
  'CONV-CS-001': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Buenos días, somos de TechSoft SA', fecha: '2026-01-13', hora: '10:55', autor: 'TechSoft SA', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Buenos días! Bienvenidos de nuevo a CoreSmart 🏢 ¿En qué puedo ayudarlos hoy?', fecha: '2026-01-13', hora: '10:56', autor: 'Core Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Necesitamos cotización para 20 Smart Hubs y 50 sensores. Es para un proyecto corporativo.', fecha: '2026-01-13', hora: '11:02', autor: 'TechSoft SA', autorTipo: 'cliente', leido: false }
  ],
  
  // CoreSmart - Martín cámara
  'CONV-CS-002': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, consulta sobre la cámara 360', fecha: '2026-01-13', hora: '10:20', autor: 'Martín Aguirre', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Martín! La Cámara IP 360° 4K es excelente para seguridad del hogar. ¿Qué te gustaría saber?', fecha: '2026-01-13', hora: '10:21', autor: 'Core Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Tiene visión nocturna? Cuántos metros de alcance?', fecha: '2026-01-13', hora: '10:28', autor: 'Martín Aguirre', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Sí! Tiene visión nocturna infrarroja con alcance de 15 metros en total oscuridad 🌙 Durante el día graba en 4K real. También tiene detección de movimiento con alertas al celular. ¿La querés para interior o exterior?', fecha: '2026-01-13', hora: '10:29', autor: 'Core Ventas', autorTipo: 'agente_ai', leido: true }
  ],
  
  // CoreSmart - Inmobiliaria soporte técnico ESCALADO
  'CONV-CS-003': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Tenemos un problema con los timbres que compramos', fecha: '2026-01-13', hora: '09:30', autor: 'Inmobiliaria Norte', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: 'Buenos días. Lamento escuchar eso. ¿Podrían describir el problema? Tengo registrado su pedido CS-002152 de 8 timbres.', fecha: '2026-01-13', hora: '09:31', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: '3 de los 8 timbres instalados tienen delay en la notificación. Necesitamos solución urgente.', fecha: '2026-01-13', hora: '09:45', autor: 'Inmobiliaria Norte', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: 'Entiendo la urgencia. El delay puede deberse a la configuración de red. ¿Los timbres con problema están más lejos del router? Voy a escalar esto a soporte técnico especializado para una revisión remota.', fecha: '2026-01-13', hora: '09:46', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'saliente', contenido: '⚠️ He asignado un técnico para contactarlos. Les escribirá en los próximos 30 minutos para coordinar una revisión.', fecha: '2026-01-13', hora: '09:47', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true }
  ],
  
  // CoreSmart - Visitante compatibilidad
  'CONV-CS-004': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'La cerradura smart es compatible con Google Home?', fecha: '2026-01-13', hora: '10:55', autor: 'Visitante Web', autorTipo: 'cliente', leido: false }
  ],
  
  // CoreSmart - Lucía feedback
  'CONV-CS-005': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Quería contarles que ya instalé el kit', fecha: '2026-01-12', hora: '20:00', autor: 'Lucía Pereyra', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Lucía! ¿Qué tal quedó? 💡', fecha: '2026-01-12', hora: '20:01', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Mil gracias por el kit de iluminación! Quedó increíble mi depto 🙌', fecha: '2026-01-12', hora: '20:12', autor: 'Lucía Pereyra', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Nos alegra muchísimo! 🎉 Si querés, compartinos una foto para nuestras redes (con tu permiso). ¡Y cualquier duda sobre la app estamos acá!', fecha: '2026-01-12', hora: '20:13', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true }
  ],
  
  // CoreSmart - Federico tutorial
  'CONV-CS-006': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, compré la cerradura la semana pasada', fecha: '2026-01-13', hora: '08:00', autor: 'Federico Torres', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola Federico! Sí, veo tu pedido CS-002153. ¿Todo bien con la instalación?', fecha: '2026-01-13', hora: '08:01', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Si, ya está instalada. Pero tengo una duda', fecha: '2026-01-13', hora: '08:10', autor: 'Federico Torres', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Perfecto! Decime, ¿cuál es tu duda?', fecha: '2026-01-13', hora: '08:11', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'entrante', contenido: 'Cómo hago para agregar más huellas a la cerradura? El manual no es muy claro', fecha: '2026-01-13', hora: '08:15', autor: 'Federico Torres', autorTipo: 'cliente', leido: true },
    { id: 'MSG-006', tipo: 'saliente', contenido: '¡Claro! Es muy fácil: 1) Abrí la app SmartLock 2) Andá a Configuración > Huellas 3) Tocá "Agregar nueva" 4) Seguí las instrucciones en pantalla para escanear. Podés agregar hasta 100 huellas diferentes. ¿Te sale?', fecha: '2026-01-13', hora: '08:16', autor: 'Core Soporte', autorTipo: 'agente_ai', leido: true }
  ],

  // Sensuality - Cliente VIP San Valentín
  'CONV-SN-001': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Ya se viene San Valentín 💕', fecha: '2026-01-13', hora: '10:30', autor: 'Cliente Premium #101', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! 💜 ¡Sí, ya estamos preparando todo para esa fecha especial! Como cliente VIP vas a tener acceso anticipado a la colección. ¿Buscás algo en particular?', fecha: '2026-01-13', hora: '10:31', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Tienen novedades para San Valentín? Me interesa algo especial', fecha: '2026-01-13', hora: '10:38', autor: 'Cliente Premium #101', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Tenemos cosas hermosas! 🌹 Esta semana llega la Colección "Noche Especial" con sets de lencería edición limitada, kits de masajes con aceites premium, y velas aromáticas exclusivas. ¿Te mando fotos cuando llegue? También podemos armarte un pack personalizado.', fecha: '2026-01-13', hora: '10:39', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Sensuality - Visitante envío discreto
  'CONV-SN-002': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, es la primera vez que compro en una tienda así', fecha: '2026-01-13', hora: '10:40', autor: 'Visitante Anónimo', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! Bienvenido/a 💜 No te preocupes, estás en un espacio seguro y confidencial. ¿En qué puedo ayudarte?', fecha: '2026-01-13', hora: '10:41', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'El envío es discreto? No quiero que figure el nombre de la tienda en el paquete', fecha: '2026-01-13', hora: '10:48', autor: 'Visitante Anónimo', autorTipo: 'cliente', leido: false }
  ],
  
  // Sensuality - Cliente aceites
  'CONV-SN-003': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Me encantan sus aceites de masajes', fecha: '2026-01-13', hora: '09:15', autor: 'Cliente Premium #102', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! 💜 ¡Qué bueno que te gustan! Son de los productos favoritos de nuestros clientes. ¿Ya probaste todos los aromas?', fecha: '2026-01-13', hora: '09:16', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Los aceites nuevos tienen aroma a lavanda? Es mi favorito', fecha: '2026-01-13', hora: '09:22', autor: 'Cliente Premium #102', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: '¡Sí! 🪻 La nueva línea tiene Lavanda Provenzal, es súper relajante. También llegó Vainilla & Canela (más sensual) y Rosa Damascena (romántico). El de lavanda viene en 250ml y 500ml. ¿Te reservo uno?', fecha: '2026-01-13', hora: '09:23', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Sensuality - Seguimiento pedido
  'CONV-SN-004': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola, hice un pedido hace 2 días', fecha: '2026-01-13', hora: '08:45', autor: 'Cliente #4520', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! 💜 Sí, veo tu pedido SN-003088. Está en proceso de preparación. ¿Tenés alguna consulta?', fecha: '2026-01-13', hora: '08:46', autor: 'Mía Soporte', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Cuándo estiman que llegue? Necesito que sea antes del viernes.', fecha: '2026-01-13', hora: '08:55', autor: 'Cliente #4520', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: 'Tu pedido sale hoy y con envío express llegaría el jueves 15. ¿Te sirve? Si necesitás que llegue antes, tenemos la opción de envío en el día para CABA/GBA por un adicional de $2.500.', fecha: '2026-01-13', hora: '08:56', autor: 'Mía Soporte', autorTipo: 'agente_ai', leido: true }
  ],
  
  // Sensuality - Pago confirmado
  'CONV-SN-005': [
    { id: 'MSG-001', tipo: 'entrante', contenido: 'Hola! Quiero comprar el Kit Romance Premium', fecha: '2026-01-13', hora: '07:15', autor: 'Cliente #4521', autorTipo: 'cliente', leido: true },
    { id: 'MSG-002', tipo: 'saliente', contenido: '¡Hola! 💜 Excelente elección. El Kit Romance Premium incluye aceites, velas aromáticas, pétalos de rosa y una guía de masajes. ¿Lo enviamos a la dirección de siempre?', fecha: '2026-01-13', hora: '07:16', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-003', tipo: 'entrante', contenido: 'Si, mismo lugar. Cuánto sale con envío?', fecha: '2026-01-13', hora: '07:25', autor: 'Cliente #4521', autorTipo: 'cliente', leido: true },
    { id: 'MSG-004', tipo: 'saliente', contenido: 'El kit está $125.000 + envío $3.500 a Palermo = $128.500 total. El pago puede ser por MercadoPago (link que te mando) o transferencia. Llega en 24-48hs en paquete totalmente discreto. ¿Procedemos?', fecha: '2026-01-13', hora: '07:26', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-005', tipo: 'entrante', contenido: 'Dale, mandame el link', fecha: '2026-01-13', hora: '07:32', autor: 'Cliente #4521', autorTipo: 'cliente', leido: true },
    { id: 'MSG-006', tipo: 'saliente', contenido: '¡Listo! Acá tenés el link de pago: [link de MercadoPago]. Una vez acreditado te confirmo y sale hoy mismo. 💜', fecha: '2026-01-13', hora: '07:33', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true },
    { id: 'MSG-007', tipo: 'entrante', contenido: 'Perfecto, ya realicé el pago. Me avisan cuando despachen?', fecha: '2026-01-13', hora: '07:40', autor: 'Cliente #4521', autorTipo: 'cliente', leido: true },
    { id: 'MSG-008', tipo: 'saliente', contenido: '✅ ¡Pago recibido! Tu pedido SN-003089 está confirmado. Te aviso apenas salga. ¡Gracias por tu compra! 💜🌹', fecha: '2026-01-13', hora: '07:41', autor: 'Mía Ventas', autorTipo: 'agente_ai', leido: true }
  ]
};

// Estadísticas de Inbox por tienda
export interface InboxStats {
  totalConversaciones: number;
  nuevas: number;
  enProceso: number;
  esperandoCliente: number;
  cerradas: number;
  tiempoPromedioRespuesta: number;
  resolucionPrimerContacto: number;
  satisfaccionPromedio: number;
  porCanal: Record&lt;string, number&gt;;
}

export const INBOX_STATS: Record&lt;string, InboxStats&gt; = {
  'pet-vogue': {
    totalConversaciones: 8,
    nuevas: 2,
    enProceso: 2,
    esperandoCliente: 1,
    cerradas: 3,
    tiempoPromedioRespuesta: 12,
    resolucionPrimerContacto: 78,
    satisfaccionPromedio: 4.6,
    porCanal: { whatsapp: 3, instagram: 2, mercadolibre: 1, email: 1, web_chat: 1, facebook: 1 }
  },
  'coresmart': {
    totalConversaciones: 6,
    nuevas: 2,
    enProceso: 1,
    esperandoCliente: 1,
    cerradas: 2,
    tiempoPromedioRespuesta: 18,
    resolucionPrimerContacto: 72,
    satisfaccionPromedio: 4.5,
    porCanal: { whatsapp: 2, mercadolibre: 1, email: 1, web_chat: 1, instagram: 1 }
  },
  'sensuality': {
    totalConversaciones: 5,
    nuevas: 1,
    enProceso: 2,
    esperandoCliente: 0,
    cerradas: 2,
    tiempoPromedioRespuesta: 8,
    resolucionPrimerContacto: 85,
    satisfaccionPromedio: 4.8,
    porCanal: { whatsapp: 2, web_chat: 1, instagram: 1, email: 1 }
  }
};
