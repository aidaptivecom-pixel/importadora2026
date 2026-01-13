import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronDown,
  FileText,
  X,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  MoreHorizontal,
  Building2,
  Calendar,
  TrendingDown,
  ArrowUpRight,
  AlertCircle,
  Send,
  History,
  User,
  Bell
} from 'lucide-react';
import EmptyState from './EmptyState';

// Types
type EstadoCobranza = 'al_dia' | 'por_vencer' | 'vencido' | 'en_gestion' | 'incobrable' | 'cobrado';

interface GestionCobranza {
  fecha: string;
  tipo: 'llamada' | 'email' | 'whatsapp' | 'visita' | 'nota';
  descripcion: string;
  usuario: string;
  resultado?: string;
}

interface CuentaPorCobrar {
  id: string;
  facturaId: string;
  facturaNumero: string;
  cliente: {
    id: string;
    nombre: string;
    cuit: string;
    telefono: string;
    email: string;
    categoria: 'A' | 'B' | 'C';
  };
  montoOriginal: number;
  montoPendiente: number;
  fechaEmision: string;
  fechaVencimiento: string;
  diasVencido: number;
  estado: EstadoCobranza;
  gestiones: GestionCobranza[];
  proximaAccion?: string;
  fechaProximaAccion?: string;
  owner: string;
}

// Sample Data
const CUENTAS_POR_COBRAR: CuentaPorCobrar[] = [
  {
    id: 'COB-001',
    facturaId: 'FAC-003',
    facturaNumero: '0001-00001236',
    cliente: {
      id: 'CLI-003',
      nombre: 'Distribuidora Norte SRL',
      cuit: '30-73456789-0',
      telefono: '+54 381 456-7890',
      email: 'pagos@distnorte.com.ar',
      categoria: 'B'
    },
    montoOriginal: 18585.60,
    montoPendiente: 18585.60,
    fechaEmision: '2025-12-15',
    fechaVencimiento: '2025-12-30',
    diasVencido: 13,
    estado: 'vencido',
    gestiones: [
      { fecha: '2026-01-08', tipo: 'llamada', descripcion: 'Contactado, promete pago para el 15/01', usuario: 'MA', resultado: 'Promesa de pago' },
      { fecha: '2026-01-03', tipo: 'email', descripcion: 'Enviado recordatorio de pago vencido', usuario: 'MA' },
      { fecha: '2025-12-31', tipo: 'whatsapp', descripcion: 'Primer recordatorio enviado', usuario: 'MA' }
    ],
    proximaAccion: 'Confirmar transferencia',
    fechaProximaAccion: '2026-01-15',
    owner: 'MA'
  },
  {
    id: 'COB-002',
    facturaId: 'FAC-007',
    facturaNumero: '0001-00001240',
    cliente: {
      id: 'CLI-007',
      nombre: 'Electrodomésticos del Sur',
      cuit: '30-75678901-3',
      telefono: '+54 299 456-7890',
      email: 'admin@electrosur.com.ar',
      categoria: 'B'
    },
    montoOriginal: 9438,
    montoPendiente: 9438,
    fechaEmision: '2025-11-20',
    fechaVencimiento: '2025-12-05',
    diasVencido: 38,
    estado: 'en_gestion',
    gestiones: [
      { fecha: '2026-01-10', tipo: 'visita', descripcion: 'Visita comercial, acordado plan de pagos 3 cuotas', usuario: 'JC', resultado: 'Plan de pagos' },
      { fecha: '2026-01-05', tipo: 'llamada', descripcion: 'Sin respuesta', usuario: 'MA' },
      { fecha: '2025-12-20', tipo: 'email', descripcion: 'Segundo aviso de mora', usuario: 'MA' },
      { fecha: '2025-12-10', tipo: 'llamada', descripcion: 'Problemas financieros, solicita espera', usuario: 'MA', resultado: 'Espera solicitada' }
    ],
    proximaAccion: 'Primera cuota plan de pagos',
    fechaProximaAccion: '2026-01-20',
    owner: 'JC'
  },
  {
    id: 'COB-003',
    facturaId: 'FAC-001',
    facturaNumero: '0001-00001234',
    cliente: {
      id: 'CLI-001',
      nombre: 'Electro Rosario SA',
      cuit: '30-71234567-8',
      telefono: '+54 341 456-7890',
      email: 'pagos@electrorosario.com.ar',
      categoria: 'A'
    },
    montoOriginal: 30310.50,
    montoPendiente: 30310.50,
    fechaEmision: '2026-01-10',
    fechaVencimiento: '2026-01-25',
    diasVencido: -13,
    estado: 'al_dia',
    gestiones: [],
    owner: 'MA'
  },
  {
    id: 'COB-004',
    facturaId: 'FAC-004',
    facturaNumero: '0001-00001237',
    cliente: {
      id: 'CLI-004',
      nombre: 'SmartHouse Argentina',
      cuit: '20-34567890-1',
      telefono: '+54 11 5678-9012',
      email: 'finanzas@smarthouse.com.ar',
      categoria: 'A'
    },
    montoOriginal: 13431,
    montoPendiente: 13431,
    fechaEmision: '2026-01-11',
    fechaVencimiento: '2026-01-26',
    diasVencido: -14,
    estado: 'al_dia',
    gestiones: [],
    owner: 'MA'
  },
  {
    id: 'COB-005',
    facturaId: 'FAC-002',
    facturaNumero: '0001-00001235',
    cliente: {
      id: 'CLI-002',
      nombre: 'TechStore Córdoba',
      cuit: '30-72345678-9',
      telefono: '+54 351 234-5678',
      email: 'pagos@techstore.com.ar',
      categoria: 'A'
    },
    montoOriginal: 11737,
    montoPendiente: 0,
    fechaEmision: '2026-01-08',
    fechaVencimiento: '2026-01-23',
    diasVencido: 0,
    estado: 'cobrado',
    gestiones: [
      { fecha: '2026-01-12', tipo: 'nota', descripcion: 'Pago recibido por transferencia', usuario: 'MA', resultado: 'Cobrado' }
    ],
    owner: 'MA'
  },
  {
    id: 'COB-006',
    facturaId: 'FAC-008',
    facturaNumero: '0001-00001241',
    cliente: {
      id: 'CLI-008',
      nombre: 'Gaming Store BA',
      cuit: '30-76789012-4',
      telefono: '+54 11 3456-7890',
      email: 'admin@gamingstore.com.ar',
      categoria: 'A'
    },
    montoOriginal: 17254.60,
    montoPendiente: 0,
    fechaEmision: '2026-01-09',
    fechaVencimiento: '2026-01-24',
    diasVencido: 0,
    estado: 'cobrado',
    gestiones: [
      { fecha: '2026-01-11', tipo: 'nota', descripcion: 'Pago adelantado recibido', usuario: 'MA', resultado: 'Cobrado' }
    ],
    owner: 'MA'
  },
  {
    id: 'COB-007',
    facturaId: 'FAC-009',
    facturaNumero: '0001-00001242',
    cliente: {
      id: 'CLI-009',
      nombre: 'Importaciones Patagonia',
      cuit: '30-77890123-5',
      telefono: '+54 2944 567-890',
      email: 'compras@imppatagonia.com.ar',
      categoria: 'C'
    },
    montoOriginal: 5200,
    montoPendiente: 5200,
    fechaEmision: '2026-01-05',
    fechaVencimiento: '2026-01-15',
    diasVencido: -3,
    estado: 'por_vencer',
    gestiones: [
      { fecha: '2026-01-10', tipo: 'email', descripcion: 'Recordatorio preventivo enviado', usuario: 'MA' }
    ],
    proximaAccion: 'Llamar para confirmar pago',
    fechaProximaAccion: '2026-01-14',
    owner: 'MA'
  }
];

// Export Dropdown Component
const ExportDropdown: React.FC<{ onExportExcel: () => void; onExportCSV: () => void }> = ({ onExportExcel, onExportCSV }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm font-medium text-emerald-700 transition-colors">
        <Download size={16} />Exportar<ChevronDown size={14} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
            <button onClick={() => { onExportExcel(); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <FileText size={14} className="text-green-600" />Excel (.xlsx)
            </button>
            <button onClick={() => { onExportCSV(); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <FileText size={14} className="text-blue-600" />CSV (.csv)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Estado Badge Component
const EstadoBadge: React.FC<{ estado: EstadoCobranza }> = ({ estado }) => {
  const config: Record<EstadoCobranza, { bg: string; text: string; label: string }> = {
    al_dia: { bg: 'bg-green-50', text: 'text-green-600', label: 'Al día' },
    por_vencer: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Por vencer' },
    vencido: { bg: 'bg-red-50', text: 'text-red-600', label: 'Vencido' },
    en_gestion: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'En gestión' },
    incobrable: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Incobrable' },
    cobrado: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Cobrado' }
  };
  const { bg, text, label } = config[estado];
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>{label}</span>;
};

// Gestion Icon Component
const GestionIcon: React.FC<{ tipo: string }> = ({ tipo }) => {
  const iconClass = "w-6 h-6 rounded-full flex items-center justify-center";
  switch(tipo) {
    case 'llamada': return <div className={`${iconClass} bg-blue-50 text-blue-600`}><Phone size={12} /></div>;
    case 'email': return <div className={`${iconClass} bg-amber-50 text-amber-600`}><Mail size={12} /></div>;
    case 'whatsapp': return <div className={`${iconClass} bg-green-50 text-green-600`}><MessageSquare size={12} /></div>;
    case 'visita': return <div className={`${iconClass} bg-purple-50 text-purple-600`}><Building2 size={12} /></div>;
    default: return <div className={`${iconClass} bg-slate-100 text-slate-500`}><FileText size={12} /></div>;
  }
};

// Cuenta Detail Modal
const CuentaDetailModal: React.FC<{ cuenta: CuentaPorCobrar; onClose: () => void }> = ({ cuenta, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Cuenta {cuenta.id}</h2>
            <p className="text-sm text-slate-500">Factura {cuenta.facturaNumero}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {/* Estado y Monto */}
          <div className="flex items-center justify-between">
            <EstadoBadge estado={cuenta.estado} />
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800">${cuenta.montoPendiente.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
              {cuenta.montoPendiente !== cuenta.montoOriginal && (
                <p className="text-sm text-slate-400 line-through">${cuenta.montoOriginal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
              )}
            </div>
          </div>

          {/* Días Vencido */}
          {cuenta.diasVencido > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={24} />
              <div>
                <p className="font-semibold text-red-700">{cuenta.diasVencido} días vencido</p>
                <p className="text-sm text-red-600">Vencimiento: {new Date(cuenta.fechaVencimiento).toLocaleDateString('es-AR')}</p>
              </div>
            </div>
          )}

          {/* Cliente */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Cliente</h3>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-800">{cuenta.cliente.nombre}</p>
                <p className="text-sm text-slate-500">CUIT: {cuenta.cliente.cuit}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold ${
                  cuenta.cliente.categoria === 'A' ? 'bg-emerald-100 text-emerald-700' :
                  cuenta.cliente.categoria === 'B' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-200 text-slate-600'
                }`}>Categoría {cuenta.cliente.categoria}</span>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${cuenta.cliente.telefono}`} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <Phone size={16} className="text-blue-600" />
                </a>
                <a href={`mailto:${cuenta.cliente.email}`} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 hover:border-amber-200 transition-colors">
                  <Mail size={16} className="text-amber-600" />
                </a>
                <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                  <MessageSquare size={16} className="text-green-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Próxima Acción */}
          {cuenta.proximaAccion && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={16} className="text-blue-600" />
                <h3 className="text-sm font-semibold text-blue-700">Próxima Acción</h3>
              </div>
              <p className="text-slate-700">{cuenta.proximaAccion}</p>
              {cuenta.fechaProximaAccion && (
                <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(cuenta.fechaProximaAccion).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <User size={10} />Owner: {cuenta.owner}
              </p>
            </div>
          )}

          {/* Historial de Gestiones */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <History size={16} />
              Historial de Gestiones
            </h3>
            {cuenta.gestiones.length > 0 ? (
              <div className="space-y-3">
                {cuenta.gestiones.map((gestion, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <GestionIcon tipo={gestion.tipo} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">
                          {new Date(gestion.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                        <span className="text-xs text-slate-400">{gestion.usuario}</span>
                      </div>
                      <p className="text-sm text-slate-700">{gestion.descripcion}</p>
                      {gestion.resultado && (
                        <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          {gestion.resultado}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                type="messages" 
                title="Sin gestiones"
                description="Aún no hay gestiones registradas para esta cuenta."
                compact
              />
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-between">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
            <History size={16} />Ver Factura
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
              <Plus size={16} />Nueva Gestión
            </button>
            {cuenta.estado !== 'cobrado' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium text-white transition-colors">
                <CheckCircle2 size={16} />Registrar Pago
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CobranzasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');
  const [selectedCuenta, setSelectedCuenta] = useState<CuentaPorCobrar | null>(null);

  const filteredCuentas = useMemo(() => {
    return CUENTAS_POR_COBRAR.filter(cuenta => {
      const matchSearch = cuenta.facturaNumero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cuenta.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cuenta.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEstado = !filterEstado || cuenta.estado === filterEstado;
      const matchCategoria = !filterCategoria || cuenta.cliente.categoria === filterCategoria;
      return matchSearch && matchEstado && matchCategoria;
    });
  }, [searchTerm, filterEstado, filterCategoria]);

  const clearFilters = () => { setSearchTerm(''); setFilterEstado(''); setFilterCategoria(''); };
  const hasFilters = searchTerm || filterEstado || filterCategoria;

  // Determinar tipo de empty state
  const getEmptyStateType = () => {
    if (searchTerm) return 'search';
    if (filterEstado || filterCategoria) return 'filter';
    return 'payments';
  };

  // KPIs
  const cuentasActivas = CUENTAS_POR_COBRAR.filter(c => c.estado !== 'cobrado' && c.estado !== 'incobrable');
  const totalPendiente = cuentasActivas.reduce((acc, c) => acc + c.montoPendiente, 0);
  const cuentasVencidas = CUENTAS_POR_COBRAR.filter(c => c.estado === 'vencido' || c.estado === 'en_gestion');
  const montoVencido = cuentasVencidas.reduce((acc, c) => acc + c.montoPendiente, 0);
  const cobradoMes = CUENTAS_POR_COBRAR.filter(c => c.estado === 'cobrado').reduce((acc, c) => acc + c.montoOriginal, 0);
  const porVencer = CUENTAS_POR_COBRAR.filter(c => c.estado === 'por_vencer');

  const handleExportExcel = () => console.log('Export Excel');
  const handleExportCSV = () => console.log('Export CSV');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cobranzas</h1>
          <p className="text-sm text-slate-500 mt-1">{cuentasActivas.length} cuentas activas por cobrar</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cuenta..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64"
            />
          </div>
          <ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} />
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <Plus size={16} />Registrar Pago
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Total a Cobrar</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">${(totalPendiente / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{cuentasActivas.length} cuentas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Vencido</span>
          </div>
          <p className="text-2xl font-bold text-red-600">${(montoVencido / 1000).toFixed(1)}K</p>
          <p className="text-xs text-red-500 mt-1 font-medium">{cuentasVencidas.length} cuentas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Por Vencer (7d)</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">${(porVencer.reduce((acc, c) => acc + c.montoPendiente, 0) / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{porVencer.length} cuentas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Cobrado (Mes)</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${(cobradoMes / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{CUENTAS_POR_COBRAR.filter(c => c.estado === 'cobrado').length} facturas</p>
        </div>
      </div>

      {/* Alertas Críticas */}
      {cuentasVencidas.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="font-semibold text-red-700">Cuentas que requieren atención</h3>
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{cuentasVencidas.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cuentasVencidas.slice(0, 3).map((cuenta) => (
              <div
                key={cuenta.id}
                onClick={() => setSelectedCuenta(cuenta)}
                className="bg-white rounded-lg p-3 border border-red-100 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-800">{cuenta.cliente.nombre}</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                    {cuenta.diasVencido}d
                  </span>
                </div>
                <p className="text-lg font-bold text-red-600">${cuenta.montoPendiente.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                {cuenta.proximaAccion && (
                  <p className="text-xs text-slate-500 mt-1 truncate">→ {cuenta.proximaAccion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todos los estados</option>
            <option value="al_dia">Al día</option>
            <option value="por_vencer">Por vencer</option>
            <option value="vencido">Vencido</option>
            <option value="en_gestion">En gestión</option>
            <option value="cobrado">Cobrado</option>
            <option value="incobrable">Incobrable</option>
          </select>
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todas las categorías</option>
            <option value="A">Categoría A</option>
            <option value="B">Categoría B</option>
            <option value="C">Categoría C</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredCuentas.length} de {CUENTAS_POR_COBRAR.length} cuentas</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredCuentas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Factura</th>
                  <th className="p-4">Vencimiento</th>
                  <th className="p-4 text-right">Monto USD</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Última Gestión</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {filteredCuentas.map((cuenta) => {
                  const ultimaGestion = cuenta.gestiones[0];
                  return (
                    <tr key={cuenta.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                            cuenta.cliente.categoria === 'A' ? 'bg-emerald-500' :
                            cuenta.cliente.categoria === 'B' ? 'bg-blue-500' : 'bg-slate-400'
                          }`}>
                            {cuenta.cliente.categoria}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{cuenta.cliente.nombre}</p>
                            <p className="text-xs text-slate-400">{cuenta.cliente.cuit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-slate-700">{cuenta.facturaNumero}</p>
                        <p className="text-xs text-slate-400">{cuenta.id}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`${cuenta.estado === 'vencido' || cuenta.estado === 'en_gestion' ? 'text-red-600 font-medium' : cuenta.estado === 'por_vencer' ? 'text-amber-600' : 'text-slate-600'}`}>
                            {new Date(cuenta.fechaVencimiento).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                          </span>
                          {cuenta.diasVencido > 0 && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold">
                              +{cuenta.diasVencido}d
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold text-slate-800">
                        ${cuenta.montoPendiente.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-4">
                        <EstadoBadge estado={cuenta.estado} />
                      </td>
                      <td className="p-4">
                        {ultimaGestion ? (
                          <div className="flex items-center gap-2">
                            <GestionIcon tipo={ultimaGestion.tipo} />
                            <div>
                              <p className="text-xs text-slate-600 truncate max-w-[150px]">{ultimaGestion.descripcion}</p>
                              <p className="text-[10px] text-slate-400">{new Date(ultimaGestion.fecha).toLocaleDateString('es-AR')}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedCuenta(cuenta)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Ver detalle"
                          >
                            <Eye size={16} className="text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Llamar">
                            <Phone size={16} className="text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Más opciones">
                            <MoreHorizontal size={16} className="text-slate-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            type={getEmptyStateType()}
            title={searchTerm ? `Sin resultados para "${searchTerm}"` : undefined}
            actionLabel="Limpiar filtros"
            onAction={clearFilters}
          />
        )}
      </div>

      {/* Detail Modal */}
      {selectedCuenta && (
        <CuentaDetailModal cuenta={selectedCuenta} onClose={() => setSelectedCuenta(null)} />
      )}
    </div>
  );
};

export default CobranzasPage;
