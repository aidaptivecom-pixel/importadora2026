import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  ChevronDown,
  X,
  FileText,
  DollarSign,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Building2,
  Truck,
  Briefcase,
  Landmark,
  MoreHorizontal,
  ExternalLink,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  CalendarClock,
  CircleDollarSign
} from 'lucide-react';

// ============ TYPES ============
type EstadoPago = 'pendiente' | 'vencido' | 'pagado' | 'parcial' | 'programado';
type CategoriaPago = 'proveedor' | 'flete' | 'despachante' | 'terminal' | 'impuestos' | 'otros';
type MetodoPago = 'transferencia' | 'cheque' | 'efectivo' | 'tarjeta' | 'crypto';

interface Pago {
  id: string;
  concepto: string;
  descripcion: string;
  operacionId: string;
  operacionNombre: string;
  beneficiario: string;
  categoria: CategoriaPago;
  montoUSD: number;
  montoARS: number;
  fechaVencimiento: string;
  fechaPago?: string;
  estado: EstadoPago;
  metodoPago?: MetodoPago;
  comprobante?: string;
  notas?: string;
}

// ============ SAMPLE DATA ============
const PAGOS_DATA: Pago[] = [
  {
    id: 'PAG-001',
    concepto: 'Anticipo Proveedor 30%',
    descripcion: 'Anticipo producción lote electrónica',
    operacionId: 'OP-2025-001',
    operacionNombre: 'Electrónica Consumo Yiwu',
    beneficiario: 'Shenzhen Electronics Co.',
    categoria: 'proveedor',
    montoUSD: 12500,
    montoARS: 12500000,
    fechaVencimiento: '2025-01-10',
    estado: 'vencido'
  },
  {
    id: 'PAG-002',
    concepto: 'Flete Marítimo FOB-BA',
    descripcion: 'Contenedor 40HC Shanghai-Buenos Aires',
    operacionId: 'OP-2025-001',
    operacionNombre: 'Electrónica Consumo Yiwu',
    beneficiario: 'MSC Argentina',
    categoria: 'flete',
    montoUSD: 3800,
    montoARS: 3800000,
    fechaVencimiento: '2025-01-15',
    estado: 'pendiente'
  },
  {
    id: 'PAG-003',
    concepto: 'Honorarios Despachante',
    descripcion: 'Gestión nacionalización + canal',
    operacionId: 'OP-2025-002',
    operacionNombre: 'Textiles Hangzhou',
    beneficiario: 'García & Asociados',
    categoria: 'despachante',
    montoUSD: 1200,
    montoARS: 1200000,
    fechaVencimiento: '2025-01-18',
    estado: 'pendiente'
  },
  {
    id: 'PAG-004',
    concepto: 'Derechos de Importación',
    descripcion: 'Aranceles + tasa estadística',
    operacionId: 'OP-2025-002',
    operacionNombre: 'Textiles Hangzhou',
    beneficiario: 'AFIP - Aduana',
    categoria: 'impuestos',
    montoUSD: 8500,
    montoARS: 8500000,
    fechaVencimiento: '2025-01-20',
    estado: 'programado'
  },
  {
    id: 'PAG-005',
    concepto: 'Terminal Portuaria',
    descripcion: 'Almacenaje + manipuleo contenedor',
    operacionId: 'OP-2025-003',
    operacionNombre: 'Accesorios Pet Ningbo',
    beneficiario: 'Terminal 4 SA',
    categoria: 'terminal',
    montoUSD: 950,
    montoARS: 950000,
    fechaVencimiento: '2025-01-12',
    estado: 'vencido'
  },
  {
    id: 'PAG-006',
    concepto: 'Saldo Proveedor 70%',
    descripcion: 'Pago final contra BL',
    operacionId: 'OP-2025-001',
    operacionNombre: 'Electrónica Consumo Yiwu',
    beneficiario: 'Shenzhen Electronics Co.',
    categoria: 'proveedor',
    montoUSD: 29200,
    montoARS: 29200000,
    fechaVencimiento: '2025-01-25',
    estado: 'pendiente'
  },
  {
    id: 'PAG-007',
    concepto: 'IVA Adicional',
    descripcion: 'IVA adicional importación',
    operacionId: 'OP-2025-002',
    operacionNombre: 'Textiles Hangzhou',
    beneficiario: 'AFIP',
    categoria: 'impuestos',
    montoUSD: 4200,
    montoARS: 4200000,
    fechaVencimiento: '2025-01-22',
    estado: 'pendiente'
  },
  {
    id: 'PAG-008',
    concepto: 'Seguro de Carga',
    descripcion: 'Póliza todo riesgo marítimo',
    operacionId: 'OP-2025-003',
    operacionNombre: 'Accesorios Pet Ningbo',
    beneficiario: 'La Meridional Seguros',
    categoria: 'otros',
    montoUSD: 680,
    montoARS: 680000,
    fechaVencimiento: '2025-01-08',
    fechaPago: '2025-01-07',
    estado: 'pagado',
    metodoPago: 'transferencia',
    comprobante: 'TRF-2025-0892'
  },
  {
    id: 'PAG-009',
    concepto: 'Flete Aéreo Express',
    descripcion: 'Envío muestras urgentes',
    operacionId: 'OP-2025-004',
    operacionNombre: 'Smart Home Shenzhen',
    beneficiario: 'DHL Express',
    categoria: 'flete',
    montoUSD: 1850,
    montoARS: 1850000,
    fechaVencimiento: '2025-01-05',
    fechaPago: '2025-01-04',
    estado: 'pagado',
    metodoPago: 'tarjeta',
    comprobante: 'DHL-INV-88421'
  },
  {
    id: 'PAG-010',
    concepto: 'Anticipo Proveedor 50%',
    descripcion: 'Anticipo producción smart home',
    operacionId: 'OP-2025-004',
    operacionNombre: 'Smart Home Shenzhen',
    beneficiario: 'Guangzhou Smart Tech',
    categoria: 'proveedor',
    montoUSD: 18000,
    montoARS: 18000000,
    fechaVencimiento: '2025-01-28',
    estado: 'programado'
  },
  {
    id: 'PAG-011',
    concepto: 'Gastos Bancarios',
    descripcion: 'Comisión transferencia internacional',
    operacionId: 'OP-2025-001',
    operacionNombre: 'Electrónica Consumo Yiwu',
    beneficiario: 'Banco Galicia',
    categoria: 'otros',
    montoUSD: 85,
    montoARS: 85000,
    fechaVencimiento: '2025-01-10',
    fechaPago: '2025-01-10',
    estado: 'pagado',
    metodoPago: 'transferencia'
  },
  {
    id: 'PAG-012',
    concepto: 'Verificación Preembarque',
    descripcion: 'Inspección calidad origen',
    operacionId: 'OP-2025-002',
    operacionNombre: 'Textiles Hangzhou',
    beneficiario: 'SGS China',
    categoria: 'otros',
    montoUSD: 450,
    montoARS: 450000,
    fechaVencimiento: '2025-01-30',
    estado: 'pendiente'
  }
];

// ============ EXPORT DROPDOWN ============
const ExportDropdown: React.FC<{ onExportExcel: () => void; onExportCSV: () => void }> = ({ onExportExcel, onExportCSV }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm font-medium text-emerald-700 transition-colors"
      >
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

// ============ MAIN COMPONENT ============
const PagosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Cálculos
  const totales = useMemo(() => {
    const vencido = PAGOS_DATA.filter(p => p.estado === 'vencido').reduce((acc, p) => acc + p.montoUSD, 0);
    const pendiente = PAGOS_DATA.filter(p => p.estado === 'pendiente').reduce((acc, p) => acc + p.montoUSD, 0);
    const programado = PAGOS_DATA.filter(p => p.estado === 'programado').reduce((acc, p) => acc + p.montoUSD, 0);
    const pagado = PAGOS_DATA.filter(p => p.estado === 'pagado').reduce((acc, p) => acc + p.montoUSD, 0);
    return { vencido, pendiente, programado, pagado, total: vencido + pendiente + programado };
  }, []);

  // Filtrado
  const filteredPagos = useMemo(() => {
    return PAGOS_DATA.filter(pago => {
      const matchSearch = pago.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pago.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pago.operacionId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEstado = !filterEstado || pago.estado === filterEstado;
      const matchCategoria = !filterCategoria || pago.categoria === filterCategoria;
      return matchSearch && matchEstado && matchCategoria;
    });
  }, [searchTerm, filterEstado, filterCategoria]);

  // Pagos próximos (7 días)
  const pagosProximos = useMemo(() => {
    const hoy = new Date();
    const en7dias = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
    return PAGOS_DATA.filter(p => {
      if (p.estado === 'pagado') return false;
      const fecha = new Date(p.fechaVencimiento);
      return fecha <= en7dias;
    }).sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime());
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterEstado('');
    setFilterCategoria('');
  };

  const hasFilters = searchTerm || filterEstado || filterCategoria;

  const handleExportExcel = () => {
    console.log('Export Excel - Pagos');
    alert('Exportando a Excel...');
  };

  const handleExportCSV = () => {
    console.log('Export CSV - Pagos');
    alert('Exportando a CSV...');
  };

  const openDetail = (pago: Pago) => {
    setSelectedPago(pago);
    setShowModal(true);
  };

  // Helpers
  const getEstadoBadge = (estado: EstadoPago) => {
    const styles: Record<EstadoPago, string> = {
      vencido: 'bg-red-100 text-red-700',
      pendiente: 'bg-amber-100 text-amber-700',
      programado: 'bg-blue-100 text-blue-700',
      pagado: 'bg-green-100 text-green-700',
      parcial: 'bg-purple-100 text-purple-700'
    };
    const labels: Record<EstadoPago, string> = {
      vencido: 'Vencido',
      pendiente: 'Pendiente',
      programado: 'Programado',
      pagado: 'Pagado',
      parcial: 'Parcial'
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[estado]}`}>{labels[estado]}</span>;
  };

  const getCategoriaIcon = (categoria: CategoriaPago) => {
    const icons: Record<CategoriaPago, React.ReactNode> = {
      proveedor: <Building2 size={14} />,
      flete: <Truck size={14} />,
      despachante: <Briefcase size={14} />,
      terminal: <Landmark size={14} />,
      impuestos: <FileText size={14} />,
      otros: <MoreHorizontal size={14} />
    };
    return icons[categoria];
  };

  const getCategoriaLabel = (categoria: CategoriaPago) => {
    const labels: Record<CategoriaPago, string> = {
      proveedor: 'Proveedor',
      flete: 'Flete',
      despachante: 'Despachante',
      terminal: 'Terminal',
      impuestos: 'Impuestos',
      otros: 'Otros'
    };
    return labels[categoria];
  };

  const getDiasVencimiento = (fecha: string) => {
    const hoy = new Date();
    const vence = new Date(fecha);
    const diff = Math.ceil((vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Por categoría para el breakdown
  const porCategoria = useMemo(() => {
    const cats: Record<CategoriaPago, number> = {
      proveedor: 0, flete: 0, despachante: 0, terminal: 0, impuestos: 0, otros: 0
    };
    PAGOS_DATA.filter(p => p.estado !== 'pagado').forEach(p => {
      cats[p.categoria] += p.montoUSD;
    });
    return Object.entries(cats).filter(([_, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Pagos</h1>
          <p className="text-sm text-slate-500 mt-1">Control de pagos a proveedores, fletes y gastos operativos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar pago..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64"
            />
          </div>
          <ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} />
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <Plus size={16} />Nuevo Pago
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <CircleDollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Pendiente</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">USD {(totales.total / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Vencido</span>
          </div>
          <p className="text-2xl font-bold text-red-600">USD {(totales.vencido / 1000).toFixed(1)}K</p>
          <p className="text-xs text-red-500 mt-1">{PAGOS_DATA.filter(p => p.estado === 'vencido').length} pagos</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Por Vencer</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">USD {(totales.pendiente / 1000).toFixed(1)}K</p>
          <p className="text-xs text-amber-500 mt-1">{PAGOS_DATA.filter(p => p.estado === 'pendiente').length} pagos</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <CalendarClock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Programado</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">USD {(totales.programado / 1000).toFixed(1)}K</p>
          <p className="text-xs text-blue-500 mt-1">{PAGOS_DATA.filter(p => p.estado === 'programado').length} pagos</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Pagado (Mes)</span>
          </div>
          <p className="text-2xl font-bold text-green-600">USD {(totales.pagado / 1000).toFixed(1)}K</p>
          <p className="text-xs text-green-500 mt-1">{PAGOS_DATA.filter(p => p.estado === 'pagado').length} pagos</p>
        </div>
      </div>

      {/* Alertas Vencidas + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pagos Próximos 7 días */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-amber-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              <h2 className="font-semibold text-amber-700">Pagos Próximos 7 Días</h2>
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">{pagosProximos.length}</span>
            </div>
            <span className="text-sm font-bold text-amber-700">USD {(pagosProximos.reduce((a, p) => a + p.montoUSD, 0) / 1000).toFixed(1)}K</span>
          </div>
          <div className="divide-y divide-slate-50">
            {pagosProximos.slice(0, 6).map((pago) => {
              const dias = getDiasVencimiento(pago.fechaVencimiento);
              return (
                <div 
                  key={pago.id} 
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => openDetail(pago)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        dias < 0 ? 'bg-red-100 text-red-600' : dias <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {getCategoriaIcon(pago.categoria)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{pago.concepto}</p>
                        <p className="text-xs text-slate-400">{pago.beneficiario} • {pago.operacionId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">USD {pago.montoUSD.toLocaleString()}</p>
                      <p className={`text-xs font-medium ${
                        dias < 0 ? 'text-red-600' : dias === 0 ? 'text-red-500' : dias <= 3 ? 'text-amber-600' : 'text-slate-500'
                      }`}>
                        {dias < 0 ? `Vencido hace ${Math.abs(dias)} días` : dias === 0 ? 'Vence HOY' : `Vence en ${dias} días`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown por Categoría */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Pendiente por Categoría</h3>
          <div className="space-y-3">
            {porCategoria.map(([cat, monto]) => {
              const porcentaje = (monto / totales.total) * 100;
              const categoriaColors: Record<string, string> = {
                proveedor: 'bg-blue-500',
                flete: 'bg-cyan-500',
                despachante: 'bg-purple-500',
                terminal: 'bg-amber-500',
                impuestos: 'bg-red-500',
                otros: 'bg-slate-400'
              };
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${categoriaColors[cat]}`} />
                      <span className="text-slate-600">{getCategoriaLabel(cat as CategoriaPago)}</span>
                    </div>
                    <span className="font-semibold text-slate-800">USD {(monto / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${categoriaColors[cat]} rounded-full transition-all`}
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Pendiente</span>
              <span className="text-lg font-bold text-slate-800">USD {totales.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
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
            <option value="vencido">Vencido</option>
            <option value="pendiente">Pendiente</option>
            <option value="programado">Programado</option>
            <option value="pagado">Pagado</option>
          </select>
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todas las categorías</option>
            <option value="proveedor">Proveedor</option>
            <option value="flete">Flete</option>
            <option value="despachante">Despachante</option>
            <option value="terminal">Terminal</option>
            <option value="impuestos">Impuestos</option>
            <option value="otros">Otros</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredPagos.length} de {PAGOS_DATA.length} pagos</span>
        </div>
      </div>

      {/* Tabla de Pagos */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Concepto</th>
                <th className="p-4">Beneficiario</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Operación</th>
                <th className="p-4">Vencimiento</th>
                <th className="p-4 text-right">Monto USD</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
              {filteredPagos.map((pago) => {
                const dias = getDiasVencimiento(pago.fechaVencimiento);
                return (
                  <tr 
                    key={pago.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => openDetail(pago)}
                  >
                    <td className="p-4 font-medium text-blue-600">{pago.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{pago.concepto}</p>
                        <p className="text-xs text-slate-400">{pago.descripcion}</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{pago.beneficiario}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        {getCategoriaIcon(pago.categoria)}
                        <span className="text-xs">{getCategoriaLabel(pago.categoria)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{pago.operacionId}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-slate-700">{new Date(pago.fechaVencimiento).toLocaleDateString('es-AR')}</p>
                        {pago.estado !== 'pagado' && (
                          <p className={`text-[10px] font-medium ${
                            dias < 0 ? 'text-red-600' : dias <= 3 ? 'text-amber-600' : 'text-slate-400'
                          }`}>
                            {dias < 0 ? `${Math.abs(dias)}d vencido` : dias === 0 ? 'HOY' : `${dias}d`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-800">${pago.montoUSD.toLocaleString()}</td>
                    <td className="p-4">{getEstadoBadge(pago.estado)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalle */}
      {showModal && selectedPago && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedPago.id}</h2>
                  <p className="text-sm text-slate-500">{selectedPago.concepto}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Estado y Monto */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Monto</p>
                  <p className="text-2xl font-bold text-slate-800">USD {selectedPago.montoUSD.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">ARS {selectedPago.montoARS.toLocaleString()}</p>
                </div>
                {getEstadoBadge(selectedPago.estado)}
              </div>

              {/* Detalles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Beneficiario</p>
                  <p className="text-sm font-medium text-slate-800">{selectedPago.beneficiario}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Categoría</p>
                  <div className="flex items-center gap-1.5">
                    {getCategoriaIcon(selectedPago.categoria)}
                    <span className="text-sm font-medium text-slate-800">{getCategoriaLabel(selectedPago.categoria)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Operación</p>
                  <p className="text-sm font-medium text-blue-600">{selectedPago.operacionId}</p>
                  <p className="text-xs text-slate-400">{selectedPago.operacionNombre}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Vencimiento</p>
                  <p className="text-sm font-medium text-slate-800">
                    {new Date(selectedPago.fechaVencimiento).toLocaleDateString('es-AR', { 
                      weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Info de Pago si está pagado */}
              {selectedPago.estado === 'pagado' && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Pago Realizado</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-green-600">Fecha de Pago</p>
                      <p className="font-medium text-green-800">
                        {selectedPago.fechaPago && new Date(selectedPago.fechaPago).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">Método</p>
                      <p className="font-medium text-green-800 capitalize">{selectedPago.metodoPago}</p>
                    </div>
                    {selectedPago.comprobante && (
                      <div className="col-span-2">
                        <p className="text-xs text-green-600">Comprobante</p>
                        <p className="font-medium text-green-800">{selectedPago.comprobante}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Descripción */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Descripción</p>
                <p className="text-sm text-slate-700">{selectedPago.descripcion}</p>
              </div>

              {/* Acciones */}
              {selectedPago.estado !== 'pagado' && (
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    <Banknote size={16} />
                    Registrar Pago
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    <Calendar size={16} />
                    Reprogramar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagosPage;
