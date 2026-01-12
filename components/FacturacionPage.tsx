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
  Send,
  Eye,
  Printer,
  MoreHorizontal,
  Building2,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Receipt
} from 'lucide-react';

// Types
type EstadoFactura = 'borrador' | 'enviada' | 'pagada' | 'vencida' | 'anulada';
type TipoFactura = 'A' | 'B' | 'C' | 'E';

interface ItemFactura {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  iva: number;
}

interface Factura {
  id: string;
  numero: string;
  tipo: TipoFactura;
  fecha: string;
  fechaVencimiento: string;
  cliente: {
    nombre: string;
    cuit: string;
    direccion: string;
  };
  items: ItemFactura[];
  subtotal: number;
  iva: number;
  total: number;
  estado: EstadoFactura;
  operacionId?: string;
  observaciones?: string;
}

// Sample Data
const FACTURAS: Factura[] = [
  {
    id: 'FAC-001',
    numero: '0001-00001234',
    tipo: 'A',
    fecha: '2026-01-10',
    fechaVencimiento: '2026-01-25',
    cliente: { nombre: 'Electro Rosario SA', cuit: '30-71234567-8', direccion: 'Av. Pellegrini 1234, Rosario' },
    items: [
      { descripcion: 'Smart TV 55" LED 4K', cantidad: 50, precioUnitario: 450, iva: 21 },
      { descripcion: 'Soundbar Bluetooth', cantidad: 30, precioUnitario: 85, iva: 21 }
    ],
    subtotal: 25050,
    iva: 5260.50,
    total: 30310.50,
    estado: 'enviada',
    operacionId: 'OP-2026-003'
  },
  {
    id: 'FAC-002',
    numero: '0001-00001235',
    tipo: 'A',
    fecha: '2026-01-08',
    fechaVencimiento: '2026-01-23',
    cliente: { nombre: 'TechStore Córdoba', cuit: '30-72345678-9', direccion: 'Av. Colón 567, Córdoba' },
    items: [
      { descripcion: 'Auriculares TWS Premium', cantidad: 200, precioUnitario: 35, iva: 21 },
      { descripcion: 'Cargador Inalámbrico 15W', cantidad: 150, precioUnitario: 18, iva: 21 }
    ],
    subtotal: 9700,
    iva: 2037,
    total: 11737,
    estado: 'pagada',
    operacionId: 'OP-2026-001'
  },
  {
    id: 'FAC-003',
    numero: '0001-00001236',
    tipo: 'A',
    fecha: '2025-12-15',
    fechaVencimiento: '2025-12-30',
    cliente: { nombre: 'Distribuidora Norte SRL', cuit: '30-73456789-0', direccion: 'Ruta 9 Km 1420, Tucumán' },
    items: [
      { descripcion: 'Tablet 10" WiFi 64GB', cantidad: 80, precioUnitario: 180, iva: 21 },
      { descripcion: 'Funda Protectora Tablet', cantidad: 80, precioUnitario: 12, iva: 21 }
    ],
    subtotal: 15360,
    iva: 3225.60,
    total: 18585.60,
    estado: 'vencida',
    operacionId: 'OP-2025-048'
  },
  {
    id: 'FAC-004',
    numero: '0001-00001237',
    tipo: 'B',
    fecha: '2026-01-11',
    fechaVencimiento: '2026-01-26',
    cliente: { nombre: 'SmartHouse Argentina', cuit: '20-34567890-1', direccion: 'Av. Santa Fe 2345, CABA' },
    items: [
      { descripcion: 'Enchufe Inteligente WiFi', cantidad: 500, precioUnitario: 15, iva: 21 },
      { descripcion: 'Foco LED Smart RGB', cantidad: 300, precioUnitario: 12, iva: 21 }
    ],
    subtotal: 11100,
    iva: 2331,
    total: 13431,
    estado: 'enviada'
  },
  {
    id: 'FAC-005',
    numero: '0001-00001238',
    tipo: 'A',
    fecha: '2026-01-12',
    fechaVencimiento: '2026-01-27',
    cliente: { nombre: 'Importadora Mendoza', cuit: '30-74567890-2', direccion: 'San Martín 890, Mendoza' },
    items: [
      { descripcion: 'Robot Aspiradora WiFi', cantidad: 25, precioUnitario: 280, iva: 21 },
      { descripcion: 'Repuestos Robot (kit)', cantidad: 25, precioUnitario: 35, iva: 21 }
    ],
    subtotal: 7875,
    iva: 1653.75,
    total: 9528.75,
    estado: 'borrador'
  },
  {
    id: 'FAC-006',
    numero: '0001-00001239',
    tipo: 'E',
    fecha: '2026-01-05',
    fechaVencimiento: '2026-01-20',
    cliente: { nombre: 'Tech Export Chile', cuit: '50-12345678-9', direccion: 'Av. Providencia 1234, Santiago' },
    items: [
      { descripcion: 'Smartwatch Sport', cantidad: 100, precioUnitario: 65, iva: 0 }
    ],
    subtotal: 6500,
    iva: 0,
    total: 6500,
    estado: 'pagada'
  },
  {
    id: 'FAC-007',
    numero: '0001-00001240',
    tipo: 'A',
    fecha: '2025-11-20',
    fechaVencimiento: '2025-12-05',
    cliente: { nombre: 'Electrodomésticos del Sur', cuit: '30-75678901-3', direccion: 'Av. Kirchner 456, Neuquén' },
    items: [
      { descripcion: 'Aire Acondicionado Split 3000W', cantidad: 15, precioUnitario: 520, iva: 21 }
    ],
    subtotal: 7800,
    iva: 1638,
    total: 9438,
    estado: 'vencida'
  },
  {
    id: 'FAC-008',
    numero: '0001-00001241',
    tipo: 'A',
    fecha: '2026-01-09',
    fechaVencimiento: '2026-01-24',
    cliente: { nombre: 'Gaming Store BA', cuit: '30-76789012-4', direccion: 'Av. Corrientes 1234, CABA' },
    items: [
      { descripcion: 'Mouse Gaming RGB', cantidad: 200, precioUnitario: 28, iva: 21 },
      { descripcion: 'Teclado Mecánico', cantidad: 100, precioUnitario: 55, iva: 21 },
      { descripcion: 'Auriculares Gaming 7.1', cantidad: 80, precioUnitario: 42, iva: 21 }
    ],
    subtotal: 14260,
    iva: 2994.60,
    total: 17254.60,
    estado: 'pagada'
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
const EstadoBadge: React.FC<{ estado: EstadoFactura }> = ({ estado }) => {
  const config: Record<EstadoFactura, { bg: string; text: string; label: string }> = {
    borrador: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Borrador' },
    enviada: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Enviada' },
    pagada: { bg: 'bg-green-50', text: 'text-green-600', label: 'Pagada' },
    vencida: { bg: 'bg-red-50', text: 'text-red-600', label: 'Vencida' },
    anulada: { bg: 'bg-slate-100', text: 'text-slate-400', label: 'Anulada' }
  };
  const { bg, text, label } = config[estado];
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>{label}</span>;
};

// Tipo Badge Component
const TipoBadge: React.FC<{ tipo: TipoFactura }> = ({ tipo }) => {
  const colors: Record<TipoFactura, string> = {
    'A': 'bg-blue-600',
    'B': 'bg-emerald-600',
    'C': 'bg-amber-500',
    'E': 'bg-purple-600'
  };
  return (
    <span className={`w-7 h-7 rounded-lg ${colors[tipo]} text-white text-xs font-bold flex items-center justify-center`}>
      {tipo}
    </span>
  );
};

// Factura Detail Modal
const FacturaDetailModal: React.FC<{ factura: Factura; onClose: () => void }> = ({ factura, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TipoBadge tipo={factura.tipo} />
            <div>
              <h2 className="text-lg font-bold text-slate-800">Factura {factura.numero}</h2>
              <p className="text-sm text-slate-500">{factura.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {/* Estado y Fechas */}
          <div className="flex items-center justify-between">
            <EstadoBadge estado={factura.estado} />
            <div className="text-right text-sm">
              <p className="text-slate-500">Emisión: <span className="text-slate-700 font-medium">{new Date(factura.fecha).toLocaleDateString('es-AR')}</span></p>
              <p className="text-slate-500">Vence: <span className={`font-medium ${factura.estado === 'vencida' ? 'text-red-600' : 'text-slate-700'}`}>{new Date(factura.fechaVencimiento).toLocaleDateString('es-AR')}</span></p>
            </div>
          </div>

          {/* Cliente */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Cliente</h3>
            <p className="font-medium text-slate-800">{factura.cliente.nombre}</p>
            <p className="text-sm text-slate-500">CUIT: {factura.cliente.cuit}</p>
            <p className="text-sm text-slate-500">{factura.cliente.direccion}</p>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Detalle</h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="p-3 text-left">Descripción</th>
                    <th className="p-3 text-center">Cant.</th>
                    <th className="p-3 text-right">P. Unit.</th>
                    <th className="p-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {factura.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-slate-700">{item.descripcion}</td>
                      <td className="p-3 text-center text-slate-600">{item.cantidad}</td>
                      <td className="p-3 text-right text-slate-600">${item.precioUnitario.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium text-slate-800">${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totales */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-slate-700">${factura.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">IVA (21%)</span>
              <span className="text-slate-700">${factura.iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
              <span className="text-slate-700">Total USD</span>
              <span className="text-slate-800">${factura.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {factura.operacionId && (
            <div className="text-sm text-slate-500">
              Operación vinculada: <span className="text-blue-600 font-medium">{factura.operacionId}</span>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
              <Printer size={16} />Imprimir
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
              <Download size={16} />PDF
            </button>
          </div>
          {factura.estado === 'borrador' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors">
              <Send size={16} />Enviar Factura
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const FacturacionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [filterTipo, setFilterTipo] = useState<string>('');
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);

  const filteredFacturas = useMemo(() => {
    return FACTURAS.filter(fac => {
      const matchSearch = fac.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fac.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fac.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEstado = !filterEstado || fac.estado === filterEstado;
      const matchTipo = !filterTipo || fac.tipo === filterTipo;
      return matchSearch && matchEstado && matchTipo;
    });
  }, [searchTerm, filterEstado, filterTipo]);

  const clearFilters = () => { setSearchTerm(''); setFilterEstado(''); setFilterTipo(''); };
  const hasFilters = searchTerm || filterEstado || filterTipo;

  // KPIs
  const totalFacturado = FACTURAS.filter(f => f.estado !== 'anulada').reduce((acc, f) => acc + f.total, 0);
  const facturasVencidas = FACTURAS.filter(f => f.estado === 'vencida');
  const montoVencido = facturasVencidas.reduce((acc, f) => acc + f.total, 0);
  const facturasPendientes = FACTURAS.filter(f => f.estado === 'enviada');
  const montoPendiente = facturasPendientes.reduce((acc, f) => acc + f.total, 0);
  const facturasPagadas = FACTURAS.filter(f => f.estado === 'pagada');

  const handleExportExcel = () => console.log('Export Excel');
  const handleExportCSV = () => console.log('Export CSV');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Facturación</h1>
          <p className="text-sm text-slate-500 mt-1">{FACTURAS.length} facturas emitidas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar factura..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64"
            />
          </div>
          <ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} />
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <Plus size={16} />Nueva Factura
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Facturado</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${(totalFacturado / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{FACTURAS.filter(f => f.estado !== 'anulada').length} facturas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Pendiente Cobro</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">${(montoPendiente / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{facturasPendientes.length} facturas enviadas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Vencido</span>
          </div>
          <p className="text-2xl font-bold text-red-600">${(montoVencido / 1000).toFixed(1)}K</p>
          <p className="text-xs text-red-500 mt-1 font-medium">{facturasVencidas.length} facturas vencidas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Cobrado (Mes)</span>
          </div>
          <p className="text-2xl font-bold text-green-600">${(facturasPagadas.reduce((acc, f) => acc + f.total, 0) / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400 mt-1">{facturasPagadas.length} facturas pagadas</p>
        </div>
      </div>

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
            <option value="borrador">Borrador</option>
            <option value="enviada">Enviada</option>
            <option value="pagada">Pagada</option>
            <option value="vencida">Vencida</option>
            <option value="anulada">Anulada</option>
          </select>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todos los tipos</option>
            <option value="A">Tipo A</option>
            <option value="B">Tipo B</option>
            <option value="C">Tipo C</option>
            <option value="E">Tipo E (Exportación)</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredFacturas.length} de {FACTURAS.length} facturas</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Factura</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Vencimiento</th>
                <th className="p-4 text-right">Total USD</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
              {filteredFacturas.map((factura) => {
                const diasVencimiento = Math.ceil((new Date(factura.fechaVencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={factura.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <TipoBadge tipo={factura.tipo} />
                        <div>
                          <p className="font-medium text-slate-800">{factura.numero}</p>
                          <p className="text-xs text-slate-400">{factura.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700">{factura.cliente.nombre}</p>
                          <p className="text-xs text-slate-400">{factura.cliente.cuit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Date(factura.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`${factura.estado === 'vencida' ? 'text-red-600 font-medium' : diasVencimiento <= 3 && factura.estado === 'enviada' ? 'text-amber-600' : 'text-slate-600'}`}>
                          {new Date(factura.fechaVencimiento).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                        {factura.estado === 'enviada' && diasVencimiento <= 3 && diasVencimiento > 0 && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                            {diasVencimiento}d
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-800">
                      ${factura.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      <EstadoBadge estado={factura.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedFactura(factura)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Ver detalle"
                        >
                          <Eye size={16} className="text-slate-400" />
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
      </div>

      {/* Detail Modal */}
      {selectedFactura && (
        <FacturaDetailModal factura={selectedFactura} onClose={() => setSelectedFactura(null)} />
      )}
    </div>
  );
};

export default FacturacionPage;
