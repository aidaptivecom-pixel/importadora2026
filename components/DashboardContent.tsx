import React, { useState, useMemo } from 'react';
import { 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar, 
  Ship, 
  Search, 
  Plus,
  DollarSign,
  Package,
  Users,
  Wallet,
  Container,
  MapPin,
  Clock,
  Plane,
  Anchor,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Filter,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  Instagram,
  ExternalLink,
  ChevronRight,
  Circle,
  CheckSquare,
  Square,
  GripVertical,
  FileText,
  Folder,
  BookOpen,
  Video,
  Link,
  Star,
  Eye,
  Factory,
  Building2,
  Globe,
  Boxes,
  ArrowDownUp,
  BarChart2,
  CircleDollarSign,
  CalendarClock,
  AlertOctagon,
  FileWarning,
  Zap,
  Target,
  Ban,
  User,
  Download,
  X,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { KPIS, REVENUE_DATA, RECENT_SHIPMENTS, CATEGORIES, DONUT_DATA, CLIENTES_MAYORISTAS, ECOMMERCE_STATS, PROVEEDORES, INVENTARIO, OPERACIONES, URGENT_ITEMS, PROXIMOS_HITOS, PAGOS_PROXIMOS, CAJA_BREAKDOWN } from '../constants';
import { TIENDAS_MINORISTAS } from '../constants/tiendas';
import { PageType } from '../App';
import { Operacion, EtapaOperacion } from '../types';
import OperacionDetallePage from './OperacionDetallePage';
import InversoresPage from './InversoresPage';
import AvatarDigitalPage from './AvatarDigitalPage';
import AnalyticsPage from './AnalyticsPage';
import IntegracionesPage from './IntegracionesPage';
import CRMPage from './CRMPage';
import FacturacionPage from './FacturacionPage';
import CobranzasPage from './CobranzasPage';
import PagosPage from './PagosPage';
import PedidosPage from './PedidosPage';
import InboxPage from './InboxPage';
import TiendasOverviewPage from './TiendasOverviewPage';
import TiendaPage from './TiendaPage';
import EcommerceHubPage from './EcommerceHubPage';
// Marketing Central Module
import MarketingDashboardPage from './marketing/MarketingDashboardPage';
import CalendarioEditorialPage from './marketing/CalendarioEditorialPage';
import AvataresCentralPage from './marketing/AvataresCentralPage';
import GeneradorContenidoPage from './marketing/GeneradorContenidoPage';
import CampanasPage from './marketing/CampanasPage';
import AssetsPage from './marketing/AssetsPage';
// Agentes AI Module
import CentroAgentesPage from './agentes/CentroAgentesPage';
import AgenteVentasPage from './agentes/AgenteVentasPage';
import AgenteSoportePage from './agentes/AgenteSoportePage';
import AgentePostventaPage from './agentes/AgentePostventaPage';
import AgenteMarketingPage from './agentes/AgenteMarketingPage';
import { exportToExcel, exportToCSV, formatEmbarquesForExport, formatInventarioForExport, formatMayoristasForExport, formatProveedoresForExport, formatOperacionesForExport } from '../utils/exportUtils';

interface DashboardContentProps {
  currentPage: PageType;
  onNavigate: (page: PageType, operacionId?: string) => void;
  selectedOperacionId?: string;
}

// ============ EXPORT DROPDOWN COMPONENT ============
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

// ============ FILTER BADGE COMPONENT ============
const FilterBadge: React.FC<{ label: string; onClear: () => void }> = ({ label, onClear }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
    {label}
    <button onClick={onClear} className="hover:bg-blue-100 rounded-full p-0.5"><X size={12} /></button>
  </span>
);

const DashboardContent: React.FC<DashboardContentProps> = ({ currentPage, onNavigate, selectedOperacionId }) => {
  // Helper to find tienda by slug
  const getTiendaBySlug = (slug: string) => TIENDAS_MINORISTAS.find(t => t.slug === slug);
  
  switch(currentPage) {
    case 'hoy':
      return <HoyPage onNavigate={onNavigate} />;
    case 'tareas':
      return <TareasPage />;
    case 'documentacion':
      return <DocumentacionPage />;
    case 'tablero':
      return <TableroOperacionesPage onNavigate={onNavigate} />;
    case 'operaciones':
      return <OperacionesPage onNavigate={onNavigate} />;
    case 'operacion_detalle':
      return <OperacionDetallePage operacionId={selectedOperacionId || ''} onNavigate={onNavigate} />;
    case 'embarques':
      return <EmbarquesPage />;
    case 'mayoristas':
      return <MayoristasPage />;
    case 'ecommerce':
      return <EcommerceHubPage onNavigate={onNavigate} />;
    case 'pedidos':
      return <PedidosPage />;
    case 'dashboard':
      return <DashboardHome onNavigate={onNavigate} />;
    case 'proveedores':
      return <ProveedoresPage />;
    case 'inventario':
      return <InventarioPage />;
    case 'inversores':
      return <InversoresPage />;
    case 'avatar':
      return <AvatarDigitalPage />;
    case 'analytics':
      return <AnalyticsPage />;
    case 'integraciones':
      return <IntegracionesPage />;
    case 'inbox':
      return <InboxPage />;
    case 'crm':
      return <CRMPage />;
    case 'facturacion':
      return <FacturacionPage />;
    case 'cobranzas':
      return <CobranzasPage />;
    case 'pagos':
      return <PagosPage />;
    // Tiendas Minoristas
    case 'tiendas-overview':
      return <TiendasOverviewPage onNavigate={onNavigate} />;
    case 'pet-vogue':
      const petVogue = getTiendaBySlug('pet-vogue');
      return petVogue ? <TiendaPage tienda={petVogue} onNavigate={onNavigate} /> : <PlaceholderPage pageName="Pet Vogue" />;
    case 'coresmart':
      const coresmart = getTiendaBySlug('coresmart');
      return coresmart ? <TiendaPage tienda={coresmart} onNavigate={onNavigate} /> : <PlaceholderPage pageName="CoreSmart" />;
    case 'sensuality':
      const sensuality = getTiendaBySlug('sensuality');
      return sensuality ? <TiendaPage tienda={sensuality} onNavigate={onNavigate} /> : <PlaceholderPage pageName="Sensuality" />;
    // Marketing Central Module
    case 'marketing':
      return <MarketingDashboardPage />;
    case 'marketing-calendario':
      return <CalendarioEditorialPage />;
    case 'marketing-avatares':
      return <AvataresCentralPage />;
    case 'marketing-generador':
      return <GeneradorContenidoPage />;
    case 'marketing-campanas':
      return <CampanasPage />;
    case 'marketing-assets':
      return <AssetsPage />;
    // Agentes AI Module
    case 'agentes-centro':
      return <CentroAgentesPage />;
    case 'agente-ventas':
      return <AgenteVentasPage />;
    case 'agente-soporte':
      return <AgenteSoportePage />;
    case 'agente-postventa':
      return <AgentePostventaPage />;
    case 'agente-marketing':
      return <AgenteMarketingPage />;
    default:
      return <PlaceholderPage pageName={currentPage} />;
  }
};

// ============ HOY - COMMAND CENTER ============
const HoyPage: React.FC<{ onNavigate: (page: PageType, operacionId?: string) => void }> = ({ onNavigate }) => {
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = currentDate.toLocaleDateString('es-AR', dateOptions);
  const operacionesActivas = OPERACIONES.filter(op => op.etapa !== 'cerrado').length;
  const operacionesEnRiesgo = OPERACIONES.filter(op => op.riesgo === 'alto' || op.riesgo === 'critico').length;
  const alertasCriticas = URGENT_ITEMS.filter(u => u.prioridad === 'critica').length;
  const alertasAltas = URGENT_ITEMS.filter(u => u.prioridad === 'alta').length;
  const cajaUSD = PAGOS_PROXIMOS.slice(0, 6).reduce((acc, p) => acc + p.montoUSD, 0);
  const stockCritico = INVENTARIO.filter(item => item.stock <= item.stockMinimo).slice(0, 3);
  const docsFaltantesMap = new Map<string, string[]>();
  OPERACIONES.forEach(op => {
    const pendientes = op.documentos.filter(d => d.estado === 'pendiente' && d.obligatorio).map(d => d.nombre);
    if (pendientes.length > 0) docsFaltantesMap.set(op.id, pendientes);
  });
  const docsFaltantesAgrupados = Array.from(docsFaltantesMap.entries()).slice(0, 4);
  const cajaBreakdownData = PAGOS_PROXIMOS.slice(0, 6).reduce((acc, pago) => {
    const cat = pago.categoria;
    if (!acc[cat]) acc[cat] = { label: cat, montoUSD: 0 };
    acc[cat].montoUSD += pago.montoUSD;
    return acc;
  }, {} as Record<string, { label: string; montoUSD: number }>);
  const categoriaLabels: Record<string, string> = { proveedor: 'Proveedores', flete: 'Fletes', despachante: 'Despachantes', terminal: 'Terminal', impuestos: 'Impuestos', otros: 'Otros' };
  const categoriaColors: Record<string, string> = { proveedor: 'bg-blue-500', flete: 'bg-cyan-500', despachante: 'bg-purple-500', terminal: 'bg-amber-500', impuestos: 'bg-red-500', otros: 'bg-slate-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">Buenos días, Matías 👋</h1><p className="text-slate-500 capitalize">{formattedDate}</p></div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100"><Clock size={14} />Actualizado hace 2 min</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div onClick={() => onNavigate('tablero')} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Container size={20} /></div><span className="text-sm font-medium text-slate-500">Operaciones</span></div>
          <div className="flex items-baseline gap-2"><p className="text-2xl font-bold text-slate-800">{operacionesActivas}</p><p className="text-sm text-slate-500">activas</p></div>
          {operacionesEnRiesgo > 0 && <p className="text-xs text-red-600 mt-1 font-medium">{operacionesEnRiesgo} en riesgo</p>}
        </div>
        <div onClick={() => onNavigate('pagos')} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CircleDollarSign size={20} /></div><span className="text-sm font-medium text-slate-500">Caja 7 días</span></div>
          <p className="text-2xl font-bold text-emerald-600">USD {(cajaUSD / 1000).toFixed(1)}K</p>
          <div className="mt-2 space-y-1">{Object.entries(cajaBreakdownData).map(([cat, data]) => (<div key={cat} className="flex items-center justify-between text-[10px]"><div className="flex items-center gap-1"><div className={`w-1.5 h-1.5 rounded-full ${categoriaColors[cat] || 'bg-slate-400'}`} /><span className="text-slate-500">{categoriaLabels[cat] || cat}</span></div><span className="text-slate-600 font-medium">${(data.montoUSD / 1000).toFixed(1)}K</span></div>))}</div>
        </div>
        <div onClick={() => onNavigate('embarques')} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Ship size={20} /></div><span className="text-sm font-medium text-slate-500">Embarques</span></div>
          <div className="flex items-baseline gap-2"><p className="text-2xl font-bold text-slate-800">3</p><p className="text-sm text-slate-500">en tránsito</p></div>
          <p className="text-xs text-amber-600 mt-1 font-medium">2 en aduana</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><AlertOctagon size={20} /></div><span className="text-sm font-medium text-slate-500">Alertas</span></div>
          <div className="flex items-baseline gap-3"><div className="flex items-center gap-1"><p className="text-2xl font-bold text-red-600">{alertasCriticas}</p><p className="text-xs text-red-500 font-medium">críticas</p></div>{alertasAltas > 0 && <div className="flex items-center gap-1"><p className="text-lg font-bold text-amber-500">{alertasAltas}</p><p className="text-xs text-amber-500">altas</p></div>}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-red-50"><div className="flex items-center gap-2"><AlertCircle className="text-red-500" size={20} /><h2 className="font-semibold text-red-700">Next Best Actions</h2><span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{URGENT_ITEMS.length}</span></div></div>
            <div className="divide-y divide-slate-50">{URGENT_ITEMS.slice(0, 5).map((item) => (<div key={item.id} className="p-4 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { if (item.operacionId) onNavigate('operacion_detalle', item.operacionId); else onNavigate(item.accion as PageType); }}><div className="flex items-start justify-between mb-2"><div className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-2 ${item.prioridad === 'critica' ? 'bg-red-500' : item.prioridad === 'alta' ? 'bg-amber-500' : 'bg-slate-400'}`} /><div><span className="text-sm font-medium text-slate-800">{item.texto}</span><div className="flex items-center gap-3 mt-1"><span className="text-xs text-slate-400">Owner: <span className="text-slate-600">{item.owner}</span></span><span className={`text-xs font-medium ${item.dueTime === 'Vencido' ? 'text-red-600' : item.dueTime === 'Hoy' ? 'text-amber-600' : 'text-slate-500'}`}>{item.dueTime}</span></div><p className="text-xs text-slate-400 mt-1 italic">→ {item.porQue}</p></div></div><button onClick={(e) => { e.stopPropagation(); if (item.operacionId) onNavigate('operacion_detalle', item.operacionId); else onNavigate(item.accion as PageType); }} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${item.prioridad === 'critica' ? 'bg-red-50 text-red-600 hover:bg-red-100' : item.prioridad === 'alta' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>{item.ctaLabel}</button></div></div>))}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-2"><AlertTriangle className="text-amber-500" size={18} /><h2 className="font-semibold text-slate-800 text-sm">Operaciones en Riesgo</h2></div><button onClick={() => onNavigate('tablero')} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Ver →</button></div><div className="divide-y divide-slate-50">{OPERACIONES.filter(op => op.riesgo === 'alto' || op.riesgo === 'critico').slice(0, 3).map((op) => (<div key={op.id} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => onNavigate('operacion_detalle', op.id)}><div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-slate-800">{op.id}</span><span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${op.riesgo === 'critico' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{op.riesgo.toUpperCase()}</span></div><p className="text-xs text-slate-500 mb-1">{op.nombre}</p>{op.alertas[0] && <p className="text-[10px] text-red-600">{op.alertas[0]}</p>}</div>))}</div></div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-2"><FileWarning className="text-slate-400" size={18} /><h2 className="font-semibold text-slate-800 text-sm">Docs Faltantes</h2></div></div><div className="p-3 space-y-2">{docsFaltantesAgrupados.map(([opId, docs], idx) => (<div key={idx} className="flex items-center justify-between text-sm hover:bg-slate-50 p-2 rounded cursor-pointer" onClick={() => onNavigate('operacion_detalle', opId)}><span className="text-slate-700 font-medium">{opId}</span><div className="flex items-center gap-1 flex-wrap justify-end">{docs.map((doc, i) => (<span key={i} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">{doc}</span>))}</div></div>))}{docsFaltantesAgrupados.length === 0 && <p className="text-sm text-slate-400 text-center py-4">✓ Todos los docs al día</p>}</div></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-2"><CircleDollarSign className="text-emerald-500" size={20} /><h2 className="font-semibold text-slate-800">Pagos Próximos</h2></div><button onClick={() => onNavigate('pagos')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos →</button></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase"><tr><th className="p-3">Fecha</th><th className="p-3">Concepto</th><th className="p-3">Operación</th><th className="p-3 text-right">Monto USD</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm">{PAGOS_PROXIMOS.slice(0, 4).map((pago, idx) => (<tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => onNavigate('operacion_detalle', pago.operacionId)}><td className={`p-3 ${pago.concepto.includes('VENCIDO') ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>{new Date(pago.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</td><td className="p-3 text-slate-800">{pago.concepto.replace(' (VENCIDO)', '')}</td><td className="p-3 text-slate-500">{pago.operacionId}</td><td className="p-3 text-right font-semibold text-slate-800">${pago.montoUSD.toLocaleString()}</td></tr>))}</tbody></table></div></div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-2"><CalendarClock className="text-blue-500" size={20} /><h2 className="font-semibold text-slate-800">Próximos Hitos</h2></div></div><div className="divide-y divide-slate-50">{PROXIMOS_HITOS.slice(0, 6).map((hito, idx) => { const fecha = new Date(hito.fecha); const hoy = new Date(); const esHoy = fecha.toDateString() === hoy.toDateString(); const esMañana = fecha.toDateString() === new Date(hoy.setDate(hoy.getDate() + 1)).toDateString(); return (<div key={idx} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => onNavigate('operacion_detalle', hito.operacionId)}><div className="flex items-center gap-3"><div className={`text-center min-w-[40px] ${esHoy ? 'text-red-600' : esMañana ? 'text-amber-600' : 'text-slate-500'}`}><p className="text-[10px] uppercase font-medium">{esHoy ? 'HOY' : fecha.toLocaleDateString('es-AR', { weekday: 'short' }).toUpperCase()}</p><p className="text-lg font-bold">{fecha.getDate()}</p></div><div className="flex-1"><p className="text-sm font-medium text-slate-800">{hito.descripcion}</p><p className="text-xs text-slate-400">{hito.operacionId} - {hito.operacionNombre}</p></div><HitoIcon tipo={hito.tipo} /></div></div>); })}</div></div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between bg-amber-50"><div className="flex items-center gap-2"><AlertTriangle className="text-amber-500" size={20} /><h2 className="font-semibold text-amber-700">Stock Crítico</h2></div><button onClick={() => onNavigate('inventario')} className="text-sm text-amber-700 hover:text-amber-800 font-medium">Ver →</button></div><div className="divide-y divide-slate-50">{stockCritico.map((item, idx) => (<div key={idx} className="p-3 flex items-center justify-between"><span className="text-sm text-slate-700">{item.nombre}</span><span className={`text-sm font-semibold ${item.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>{item.stock} uds</span></div>))}</div></div>
        </div>
      </div>
    </div>
  );
};

const HitoIcon: React.FC<{ tipo: string }> = ({ tipo }) => {
  const iconClass = "w-6 h-6 rounded-full flex items-center justify-center";
  switch(tipo) { case 'eta': return <div className={`${iconClass} bg-blue-50 text-blue-600`}><Ship size={12} /></div>; case 'free_time': return <div className={`${iconClass} bg-red-50 text-red-600`}><Clock size={12} /></div>; case 'cutoff': return <div className={`${iconClass} bg-amber-50 text-amber-600`}><FileText size={12} /></div>; case 'pago': return <div className={`${iconClass} bg-emerald-50 text-emerald-600`}><DollarSign size={12} /></div>; case 'turno_retiro': return <div className={`${iconClass} bg-purple-50 text-purple-600`}><Package size={12} /></div>; default: return <div className={`${iconClass} bg-slate-100 text-slate-500`}><Calendar size={12} /></div>; }
};

const calcularDiasRestantes = (freeTimeVence: string | null): number | null => { if (!freeTimeVence) return null; const hoy = new Date(); const vence = new Date(freeTimeVence); const diffTime = vence.getTime() - hoy.getTime(); return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); };
const getFreeTimeColor = (dias: number): string => { if (dias <= 0) return 'bg-red-500 text-white'; if (dias <= 3) return 'bg-red-100 text-red-700'; if (dias <= 7) return 'bg-amber-100 text-amber-700'; return 'bg-green-100 text-green-700'; };

// ============ TABLERO DE OPERACIONES (KANBAN) ============
const TableroOperacionesPage: React.FC<{ onNavigate: (page: PageType, operacionId?: string) => void }> = ({ onNavigate }) => {
  const etapas: { id: EtapaOperacion; label: string; color: string }[] = [{ id: 'produccion', label: 'Producción', color: 'bg-purple-100' }, { id: 'en_transito', label: 'En Tránsito', color: 'bg-blue-100' }, { id: 'arribo', label: 'Arribo', color: 'bg-cyan-100' }, { id: 'aduana', label: 'Aduana', color: 'bg-amber-100' }, { id: 'liberado', label: 'Liberado', color: 'bg-green-100' }];
  const getOperacionesByEtapa = (etapa: EtapaOperacion) => OPERACIONES.filter(op => op.etapa === etapa);
  const riesgoColors: Record<string, string> = { bajo: 'border-l-green-400', medio: 'border-l-amber-400', alto: 'border-l-orange-500', critico: 'border-l-red-500' };
  const canalColors: Record<string, string> = { verde: 'bg-green-100 text-green-700', naranja: 'bg-amber-100 text-amber-700', rojo: 'bg-red-100 text-red-700' };
  
  const handleExportExcel = () => exportToExcel(formatOperacionesForExport(OPERACIONES), 'operaciones', 'Operaciones');
  const handleExportCSV = () => exportToCSV(formatOperacionesForExport(OPERACIONES), 'operaciones');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-800">Tablero de Operaciones</h1><p className="text-sm text-slate-500 mt-1">{OPERACIONES.filter(op => op.etapa !== 'cerrado').length} operaciones activas</p></div><div className="flex items-center gap-3"><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors"><Filter size={16} />Filtrar</button><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nueva Operación</button></div></div>
      <div className="flex gap-4 overflow-x-auto pb-4">{etapas.map((etapa) => { const ops = getOperacionesByEtapa(etapa.id); return (<div key={etapa.id} className="flex-shrink-0 w-72"><div className={`${etapa.color} rounded-t-xl p-3 flex items-center justify-between`}><h3 className="font-semibold text-slate-700">{etapa.label}</h3><span className="text-xs bg-white/60 text-slate-600 px-2 py-0.5 rounded-full font-medium">{ops.length}</span></div><div className="bg-slate-50 rounded-b-xl p-3 min-h-[500px] space-y-3">{ops.map((op) => { const diasRestantes = calcularDiasRestantes(op.freeTimeVence); return (<div key={op.id} onClick={() => onNavigate('operacion_detalle', op.id)} className={`bg-white rounded-lg p-4 border-l-4 ${riesgoColors[op.riesgo]} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-slate-800">{op.id}</span><div className="flex items-center gap-1">{diasRestantes !== null && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getFreeTimeColor(diasRestantes)}`}>D{diasRestantes > 0 ? `-${diasRestantes}` : diasRestantes === 0 ? '-0' : `+${Math.abs(diasRestantes)}`}</span>}{(op.riesgo === 'alto' || op.riesgo === 'critico') && <AlertTriangle size={14} className={op.riesgo === 'critico' ? 'text-red-500' : 'text-amber-500'} />}</div></div><p className="text-sm text-slate-600 mb-3 line-clamp-1">{op.nombre}</p>{op.bloqueo && <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded text-xs mb-2"><Ban size={10} /><span className="font-medium line-clamp-1">{op.bloqueo}</span></div>}<div className="space-y-2 text-xs"><div className="flex items-center justify-between text-slate-500"><span>USD {(op.montoTotalUSD / 1000).toFixed(0)}K</span><span className="flex items-center gap-1">{op.tipoTransporte === 'maritimo' ? <Anchor size={10} /> : <Plane size={10} />}{op.proveedorCiudad}</span></div>{op.fechaETA && <div className="flex items-center gap-1 text-slate-500"><Clock size={10} />ETA: {new Date(op.fechaETA).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</div>}{op.canalAduana && <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${canalColors[op.canalAduana]}`}>Canal {op.canalAduana.toUpperCase()}</span>}{op.documentos.filter(d => d.estado === 'pendiente' && d.obligatorio).length > 0 && <div className="flex items-center gap-1 text-red-500"><FileWarning size={10} />{op.documentos.filter(d => d.estado === 'pendiente' && d.obligatorio).length} docs pendientes</div>}{op.pagos.filter(p => p.estado === 'pendiente' || p.estado === 'vencido').length > 0 && <div className={`flex items-center gap-1 ${op.pagos.some(p => p.estado === 'vencido') ? 'text-red-500' : 'text-amber-500'}`}><DollarSign size={10} />{op.pagos.filter(p => p.estado === 'pendiente' || p.estado === 'vencido').length} pagos pend.</div>}</div>{op.proximaAccion && <div className="mt-3 pt-2 border-t border-slate-100"><div className="flex items-start gap-2"><Target size={10} className="text-blue-500 mt-0.5 flex-shrink-0" /><div className="flex-1 min-w-0"><p className="text-[10px] text-slate-600 line-clamp-1">{op.proximaAccion.texto}</p><span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5"><User size={8} />{op.proximaAccion.owner}</span></div></div></div>}</div>); })}{ops.length === 0 && <div className="text-center text-slate-400 text-sm py-8">Sin operaciones</div>}</div></div>); })}</div>
    </div>
  );
};

// ============ OPERACIONES PAGE (Lista) ============
const OperacionesPage: React.FC<{ onNavigate: (page: PageType, operacionId?: string) => void }> = ({ onNavigate }) => {
  const etapaLabels: Record<EtapaOperacion, string> = { draft: 'Borrador', po_emitida: 'PO Emitida', produccion: 'Producción', listo_embarque: 'Listo Embarque', en_transito: 'En Tránsito', arribo: 'Arribo', aduana: 'Aduana', liberado: 'Liberado', deposito: 'Depósito', cerrado: 'Cerrado' };
  const etapaColors: Record<EtapaOperacion, string> = { draft: 'bg-slate-100 text-slate-600', po_emitida: 'bg-slate-100 text-slate-600', produccion: 'bg-purple-50 text-purple-600', listo_embarque: 'bg-indigo-50 text-indigo-600', en_transito: 'bg-blue-50 text-blue-600', arribo: 'bg-cyan-50 text-cyan-600', aduana: 'bg-amber-50 text-amber-600', liberado: 'bg-green-50 text-green-600', deposito: 'bg-emerald-50 text-emerald-600', cerrado: 'bg-slate-100 text-slate-400' };
  const riesgoColors: Record<string, string> = { bajo: 'bg-green-50 text-green-600', medio: 'bg-amber-50 text-amber-600', alto: 'bg-orange-50 text-orange-600', critico: 'bg-red-50 text-red-600' };
  
  const handleExportExcel = () => exportToExcel(formatOperacionesForExport(OPERACIONES), 'operaciones', 'Operaciones');
  const handleExportCSV = () => exportToCSV(formatOperacionesForExport(OPERACIONES), 'operaciones');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Operaciones</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Buscar operación..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors"><Filter size={16} />Filtrar</button><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nueva Operación</button></div></div>
      <div className="grid grid-cols-5 gap-4"><div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"><p className="text-xs text-slate-500 mb-1">Total Activas</p><p className="text-2xl font-bold text-slate-800">{OPERACIONES.filter(op => op.etapa !== 'cerrado').length}</p></div><div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"><p className="text-xs text-slate-500 mb-1">En Tránsito</p><p className="text-2xl font-bold text-blue-600">{OPERACIONES.filter(op => op.etapa === 'en_transito').length}</p></div><div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"><p className="text-xs text-slate-500 mb-1">En Aduana</p><p className="text-2xl font-bold text-amber-600">{OPERACIONES.filter(op => op.etapa === 'aduana').length}</p></div><div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"><p className="text-xs text-slate-500 mb-1">En Riesgo</p><p className="text-2xl font-bold text-red-600">{OPERACIONES.filter(op => op.riesgo === 'alto' || op.riesgo === 'critico').length}</p></div><div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"><p className="text-xs text-slate-500 mb-1">Valor Total</p><p className="text-2xl font-bold text-emerald-600">${(OPERACIONES.reduce((acc, op) => acc + op.montoTotalUSD, 0) / 1000).toFixed(0)}K</p></div></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">ID</th><th className="p-4">Operación</th><th className="p-4">Etapa</th><th className="p-4">Riesgo</th><th className="p-4">Bloqueo</th><th className="p-4">Próximo Hito</th><th className="p-4 text-right">Valor USD</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{OPERACIONES.map((op) => (<tr key={op.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => onNavigate('operacion_detalle', op.id)}><td className="p-4 font-medium text-blue-600">{op.id}</td><td className="p-4"><div><p className="font-medium text-slate-800">{op.nombre}</p><p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={10} />{op.proveedorCiudad}</p></div></td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${etapaColors[op.etapa]}`}>{etapaLabels[op.etapa]}</span></td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riesgoColors[op.riesgo]}`}>{op.riesgo.charAt(0).toUpperCase() + op.riesgo.slice(1)}</span></td><td className="p-4">{op.bloqueo ? <div className="flex items-center gap-1.5 text-red-600"><Ban size={12} /><span className="text-xs font-medium max-w-[150px] truncate" title={op.bloqueo}>{op.bloqueo}</span></div> : <span className="text-xs text-slate-300">—</span>}</td><td className="p-4">{op.proximaAccion ? <div><p className="text-xs text-slate-700 max-w-[180px] truncate" title={op.proximaAccion.texto}>{op.proximaAccion.texto}</p><span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><User size={8} />{op.proximaAccion.owner}</span></div> : <span className="text-xs text-slate-300">—</span>}</td><td className="p-4 text-right font-semibold text-slate-800">${op.montoTotalUSD.toLocaleString()}</td></tr>))}</tbody></table></div></div>
    </div>
  );
};

// ============ TAREAS - KANBAN ============
const TareasPage: React.FC = () => {
  const columns = [{ id: 'pendiente', title: 'Pendiente', color: 'bg-slate-100', tasks: [{ id: 1, title: 'Cotizar electrónica Yiwu', project: 'Sourcing', priority: 'high', assignee: 'MA' }, { id: 2, title: 'Llamar a Electro Mendoza', project: 'Ventas', priority: 'medium', assignee: 'MA' }, { id: 3, title: 'Actualizar precios catálogo', project: 'Ecommerce', priority: 'low', assignee: 'MA' }] }, { id: 'en_progreso', title: 'En Progreso', color: 'bg-blue-100', tasks: [{ id: 4, title: 'Negociar con proveedor Shanghai', project: 'Sourcing', priority: 'high', assignee: 'MA' }, { id: 5, title: 'Diseñar campaña verano', project: 'Marketing', priority: 'medium', assignee: 'MA' }] }, { id: 'revision', title: 'En Revisión', color: 'bg-amber-100', tasks: [{ id: 6, title: 'Aprobar contenido semanal', project: 'Marketing', priority: 'medium', assignee: 'MA' }] }, { id: 'completado', title: 'Completado', color: 'bg-green-100', tasks: [{ id: 7, title: 'Revisar factura EMB-091', project: 'Admin', priority: 'low', assignee: 'MA' }, { id: 8, title: 'Enviar cotización TechStore', project: 'Ventas', priority: 'high', assignee: 'MA' }] }];
  const priorityColors: Record<string, string> = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-slate-100 text-slate-600' };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Tareas</h1><div className="flex items-center gap-3"><button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors"><Filter size={16} />Filtrar</button><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nueva Tarea</button></div></div>
      <div className="grid grid-cols-4 gap-4">{columns.map((column) => (<div key={column.id} className="bg-slate-50 rounded-xl p-4"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${column.color}`} /><h3 className="font-semibold text-slate-700">{column.title}</h3><span className="text-xs bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{column.tasks.length}</span></div><button className="text-slate-400 hover:text-slate-600"><Plus size={16} /></button></div><div className="space-y-3">{column.tasks.map((task) => (<div key={task.id} className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"><div className="flex items-start justify-between mb-3"><h4 className="text-sm font-medium text-slate-800 leading-tight">{task.title}</h4><button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity"><MoreHorizontal size={14} /></button></div><div className="flex items-center justify-between"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>{task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</span><div className="flex items-center gap-2"><span className="text-xs text-slate-400">{task.project}</span><div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center">{task.assignee}</div></div></div></div>))}</div></div>))}</div>
    </div>
  );
};

// ============ DOCUMENTACIÓN ============
const DocumentacionPage: React.FC = () => {
  const categories = [{ id: 'operaciones', title: 'Operaciones', icon: Container, color: 'bg-blue-50 text-blue-600', docs: [{ title: 'Proceso de Importación', type: 'doc', views: 234 }, { title: 'Checklist Nacionalización', type: 'doc', views: 189 }, { title: 'Guía de Proveedores China', type: 'doc', views: 156 }] }, { id: 'ventas', title: 'Ventas', icon: Users, color: 'bg-green-50 text-green-600', docs: [{ title: 'Script de Ventas Mayorista', type: 'doc', views: 312 }, { title: 'Política de Crédito', type: 'doc', views: 145 }, { title: 'Catálogo de Productos 2025', type: 'pdf', views: 523 }] }, { id: 'marketing', title: 'Marketing', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', docs: [{ title: 'Brand Guidelines', type: 'doc', views: 89 }, { title: 'Calendario Editorial', type: 'sheet', views: 67 }, { title: 'Templates Redes Sociales', type: 'folder', views: 234 }] }, { id: 'tutoriales', title: 'Tutoriales', icon: Video, color: 'bg-amber-50 text-amber-600', docs: [{ title: 'Cómo crear un embarque', type: 'video', views: 456 }, { title: 'Gestión de inventario', type: 'video', views: 234 }, { title: 'Uso del CRM', type: 'video', views: 178 }] }];
  const recentDocs = [{ title: 'Proceso de Importación', category: 'Operaciones', updated: 'Hace 2 horas' }, { title: 'Catálogo de Productos 2025', category: 'Ventas', updated: 'Hace 1 día' }, { title: 'Checklist Nacionalización', category: 'Operaciones', updated: 'Hace 2 días' }];
  const getTypeIcon = (type: string) => { switch(type) { case 'video': return Video; case 'pdf': return FileText; case 'folder': return Folder; case 'sheet': return FileText; default: return BookOpen; } };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Documentación</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Buscar documentos..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nuevo Documento</button></div></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"><h2 className="font-semibold text-slate-800 mb-4">Acceso Rápido</h2><div className="grid grid-cols-4 gap-4">{recentDocs.map((doc, idx) => (<div key={idx} className="p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:shadow-sm cursor-pointer transition-all group"><div className="flex items-start justify-between mb-2"><BookOpen size={20} className="text-slate-400 group-hover:text-blue-500" /><Star size={14} className="text-slate-300 hover:text-amber-400 cursor-pointer" /></div><h3 className="text-sm font-medium text-slate-800 mb-1 truncate">{doc.title}</h3><p className="text-xs text-slate-400">{doc.updated}</p></div>))}<div className="p-4 rounded-lg border-2 border-dashed border-slate-200 hover:border-blue-300 cursor-pointer transition-all flex flex-col items-center justify-center text-slate-400 hover:text-blue-500"><Plus size={24} className="mb-1" /><span className="text-sm">Crear nuevo</span></div></div></div>
      <div className="grid grid-cols-2 gap-6">{categories.map((category) => { const Icon = category.icon; return (<div key={category.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}><Icon size={20} /></div><h2 className="font-semibold text-slate-800">{category.title}</h2></div><span className="text-xs text-slate-400">{category.docs.length} docs</span></div><div className="divide-y divide-slate-50">{category.docs.map((doc, idx) => { const TypeIcon = getTypeIcon(doc.type); return (<div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"><div className="flex items-center gap-3"><TypeIcon size={16} className="text-slate-400" /><span className="text-sm text-slate-700">{doc.title}</span></div><div className="flex items-center gap-2 text-xs text-slate-400"><Eye size={12} />{doc.views}</div></div>); })}</div></div>); })}</div>
    </div>
  );
};

// ============ PROVEEDORES PAGE (CON FILTROS Y EXPORT) ============
const ProveedoresPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCiudad, setFilterCiudad] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  
  const ciudadesUnicas = useMemo(() => [...new Set(PROVEEDORES.map(p => p.ciudad))], []);
  
  const filteredProveedores = useMemo(() => {
    return PROVEEDORES.filter(prov => {
      const matchSearch = prov.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prov.productos.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCiudad = !filterCiudad || prov.ciudad === filterCiudad;
      const matchEstado = !filterEstado || prov.estado === filterEstado;
      return matchSearch && matchCiudad && matchEstado;
    });
  }, [searchTerm, filterCiudad, filterEstado]);
  
  const handleExportExcel = () => exportToExcel(formatProveedoresForExport(filteredProveedores), 'proveedores', 'Proveedores');
  const handleExportCSV = () => exportToCSV(formatProveedoresForExport(filteredProveedores), 'proveedores');
  
  const estadoColors: Record<string, string> = { activo: 'bg-green-50 text-green-600', pendiente: 'bg-amber-50 text-amber-600', inactivo: 'bg-slate-100 text-slate-500' };
  const estadoLabels: Record<string, string> = { activo: 'Activo', pendiente: 'Pendiente', inactivo: 'Inactivo' };
  
  const clearFilters = () => { setSearchTerm(''); setFilterCiudad(''); setFilterEstado(''); };
  const hasFilters = searchTerm || filterCiudad || filterEstado;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Proveedores China</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar proveedor..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nuevo Proveedor</button></div></div>
      
      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select value={filterCiudad} onChange={(e) => setFilterCiudad(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todas las ciudades</option>
            {ciudadesUnicas.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
            <option value="inactivo">Inactivo</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredProveedores.length} de {PROVEEDORES.length} proveedores</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Factory size={20} /></div><span className="text-sm font-medium text-slate-500">Total Proveedores</span></div><p className="text-2xl font-bold text-slate-800">{PROVEEDORES.length}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div><span className="text-sm font-medium text-slate-500">Activos</span></div><p className="text-2xl font-bold text-green-600">{PROVEEDORES.filter(p => p.estado === 'activo').length}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><Globe size={20} /></div><span className="text-sm font-medium text-slate-500">Ciudades</span></div><p className="text-2xl font-bold text-purple-600">{new Set(PROVEEDORES.map(p => p.ciudad)).size}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><DollarSign size={20} /></div><span className="text-sm font-medium text-slate-500">Compras Totales</span></div><p className="text-2xl font-bold text-emerald-600">${(PROVEEDORES.reduce((acc, p) => acc + p.comprasTotal, 0) / 1000000).toFixed(2)}M</p></div></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">Proveedor</th><th className="p-4">Ciudad</th><th className="p-4">Productos</th><th className="p-4">Rating</th><th className="p-4 text-right">Compras</th><th className="p-4">Última Compra</th><th className="p-4">Estado</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{filteredProveedores.map((prov) => (<tr key={prov.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">{prov.nombre.slice(0, 2).toUpperCase()}</div><div><p className="font-medium text-slate-800">{prov.nombre}</p><p className="text-xs text-slate-400">{prov.contacto}</p></div></div></td><td className="p-4"><div className="flex items-center gap-1.5 text-slate-600"><MapPin size={14} className="text-slate-400" />{prov.ciudad}</div></td><td className="p-4"><div className="flex flex-wrap gap-1">{prov.productos.slice(0, 2).map((prod, idx) => (<span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{prod}</span>))}{prov.productos.length > 2 && <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded">+{prov.productos.length - 2}</span>}</div></td><td className="p-4"><div className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /><span className="font-medium text-slate-700">{prov.rating}</span></div></td><td className="p-4 text-right font-semibold text-slate-800">${(prov.comprasTotal / 1000).toFixed(0)}K</td><td className="p-4 text-slate-500">{new Date(prov.ultimaCompra).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[prov.estado]}`}>{estadoLabels[prov.estado]}</span></td></tr>))}</tbody></table></div></div>
    </div>
  );
};

// ============ INVENTARIO PAGE (CON FILTROS Y EXPORT) ============
const InventarioPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  
  const categoriasUnicas = useMemo(() => [...new Set(INVENTARIO.map(i => i.categoria))], []);
  
  const filteredInventario = useMemo(() => {
    return INVENTARIO.filter(item => {
      const matchSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategoria = !filterCategoria || item.categoria === filterCategoria;
      const isCritical = item.stock <= item.stockMinimo;
      const isOutOfStock = item.stock === 0;
      const matchEstado = !filterEstado || 
        (filterEstado === 'critico' && isCritical && !isOutOfStock) ||
        (filterEstado === 'sinstock' && isOutOfStock) ||
        (filterEstado === 'ok' && !isCritical);
      return matchSearch && matchCategoria && matchEstado;
    });
  }, [searchTerm, filterCategoria, filterEstado]);
  
  const handleExportExcel = () => exportToExcel(formatInventarioForExport(filteredInventario), 'inventario', 'Inventario');
  const handleExportCSV = () => exportToCSV(formatInventarioForExport(filteredInventario), 'inventario');
  
  const stockCritico = INVENTARIO.filter(item => item.stock <= item.stockMinimo);
  const stockOk = INVENTARIO.filter(item => item.stock > item.stockMinimo);
  const valorTotal = INVENTARIO.reduce((acc, item) => acc + (item.stock * item.costoUSD), 0);
  
  const clearFilters = () => { setSearchTerm(''); setFilterCategoria(''); setFilterEstado(''); };
  const hasFilters = searchTerm || filterCategoria || filterEstado;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Inventario</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar producto o SKU..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors"><ArrowDownUp size={16} />Movimientos</button><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Agregar Producto</button></div></div>
      
      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todas las categorías</option>
            {categoriasUnicas.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los estados</option>
            <option value="ok">Stock OK</option>
            <option value="critico">Stock Crítico</option>
            <option value="sinstock">Sin Stock</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredInventario.length} de {INVENTARIO.length} productos</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Boxes size={20} /></div><span className="text-sm font-medium text-slate-500">Total Productos</span></div><p className="text-2xl font-bold text-slate-800">{INVENTARIO.length}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><AlertTriangle size={20} /></div><span className="text-sm font-medium text-slate-500">Stock Crítico</span></div><p className="text-2xl font-bold text-red-600">{stockCritico.length}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div><span className="text-sm font-medium text-slate-500">Stock OK</span></div><p className="text-2xl font-bold text-green-600">{stockOk.length}</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><DollarSign size={20} /></div><span className="text-sm font-medium text-slate-500">Valor Inventario</span></div><p className="text-2xl font-bold text-emerald-600">${valorTotal.toLocaleString()}</p></div></div>
      {stockCritico.length > 0 && <div className="bg-red-50 border border-red-100 rounded-xl p-4"><div className="flex items-center gap-2 mb-3"><AlertTriangle className="text-red-500" size={20} /><h3 className="font-semibold text-red-700">Productos con Stock Crítico</h3></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3">{stockCritico.map((item) => (<div key={item.id} className="bg-white rounded-lg p-3 border border-red-100 flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">{item.nombre}</p><p className="text-xs text-slate-500">{item.sku}</p></div><div className="text-right"><p className={`text-lg font-bold ${item.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>{item.stock}</p><p className="text-xs text-slate-400">mín: {item.stockMinimo}</p></div></div>))}</div></div>}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">SKU</th><th className="p-4">Producto</th><th className="p-4">Categoría</th><th className="p-4 text-center">Stock</th><th className="p-4 text-right">Costo USD</th><th className="p-4 text-right">Precio Venta</th><th className="p-4">Ubicación</th><th className="p-4">Estado</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{filteredInventario.map((item) => { const isCritical = item.stock <= item.stockMinimo; const isOutOfStock = item.stock === 0; return (<tr key={item.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer"><td className="p-4 font-mono text-xs text-slate-500">{item.sku}</td><td className="p-4 font-medium text-slate-800">{item.nombre}</td><td className="p-4"><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.categoria}</span></td><td className="p-4 text-center"><div className="flex flex-col items-center"><span className={`text-lg font-bold ${isOutOfStock ? 'text-red-600' : isCritical ? 'text-amber-600' : 'text-slate-800'}`}>{item.stock}</span><span className="text-[10px] text-slate-400">mín: {item.stockMinimo}</span></div></td><td className="p-4 text-right text-slate-600">${item.costoUSD.toFixed(2)}</td><td className="p-4 text-right font-semibold text-slate-800">${item.precioVenta.toLocaleString()}</td><td className="p-4"><div className="flex items-center gap-1.5 text-slate-500 text-xs"><MapPin size={12} className="text-slate-400" />{item.ubicacion}</div></td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isOutOfStock ? 'bg-red-50 text-red-600' : isCritical ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>{isOutOfStock ? 'Sin Stock' : isCritical ? 'Crítico' : 'OK'}</span></td></tr>); })}</tbody></table></div></div>
    </div>
  );
};

// ============ PLACEHOLDER PAGE ============
const PlaceholderPage: React.FC<{ pageName: string }> = ({ pageName }) => (<div className="space-y-6"><h1 className="text-2xl font-bold text-slate-800 capitalize">{pageName}</h1><div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center"><Container size={48} className="mx-auto text-slate-300 mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Próximamente</h3><p className="text-slate-500 mb-4">Esta sección está en desarrollo</p></div></div>);

// ============ DASHBOARD HOME ============
const DashboardHome: React.FC<{ onNavigate: (page: PageType, operacionId?: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Dashboard</h1><div className="flex items-center gap-2 text-sm text-slate-500"><Clock size={14} />Actualizado hace 5 min</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{KPIS.map((kpi, idx) => (<KPICard key={idx} data={kpi} index={idx} />))}</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6"><div className="flex items-center justify-between mb-6"><div><h2 className="text-lg font-semibold text-slate-800">Reporte de Embarques</h2><div className="flex items-center gap-4 mt-1 text-xs"><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span className="text-slate-500">Marítimo <span className="text-slate-700 font-medium">$682K</span></span></div><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-slate-500">Aéreo <span className="text-slate-700 font-medium">$197K</span></span></div></div></div><button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-600 transition-colors"><Calendar size={14} />2025<MoreHorizontal size={14} /></button></div><div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}><defs><linearGradient id="colorMaritimo" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} /><Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} /><Area type="monotone" dataKey="maritimo" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMaritimo)" name="Marítimo" /><Area type="monotone" dataKey="aereo" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Aéreo" /></AreaChart></ResponsiveContainer></div></div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-between relative"><div className="w-full flex justify-between items-start"><div className="flex items-center gap-2"><div className="p-1.5 bg-slate-100 rounded-md text-slate-500"><TrendingUp size={16} /></div><h2 className="text-sm font-semibold text-slate-700">Ventas por Canal</h2></div><button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button></div><div className="relative w-full h-[220px] flex items-center justify-center"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={DONUT_DATA} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" startAngle={90} endAngle={-270} stroke="none" cornerRadius={5}>{DONUT_DATA.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><div className="p-3 bg-white shadow-sm rounded-full mb-1"><Wallet size={20} className="text-blue-500" /></div><span className="text-xs text-slate-400">Facturado Mes</span><span className="text-lg font-bold text-slate-800">$891,450</span></div></div><div className="w-full"><div className="flex justify-center gap-6 mb-4"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-xs text-slate-500">Mayorista 72%</span></div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span className="text-xs text-slate-500">Ecommerce 28%</span></div></div><button onClick={() => onNavigate('mayoristas')} className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">Ver Clientes<span className="text-xs">→</span></button></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="p-5 border-b border-slate-50 flex items-center justify-between"><div className="flex items-center gap-3"><div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Ship size={20} /></div><h2 className="font-semibold text-slate-800">Embarques Activos</h2></div><button onClick={() => onNavigate('embarques')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos →</button></div><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">ID</th><th className="p-4">Producto</th><th className="p-4">Origen</th><th className="p-4">Estado</th><th className="p-4 text-right">Valor</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{RECENT_SHIPMENTS.slice(0, 4).map((item) => (<tr key={item.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer"><td className="p-4 font-medium text-slate-900">{item.id}</td><td className="p-4"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.tipo === 'maritimo' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{item.tipo === 'maritimo' ? <Anchor size={16} /> : <Plane size={16} />}</div><span className="font-medium text-slate-700">{item.productName}</span></div></td><td className="p-4"><div className="flex items-center gap-1.5 text-slate-500"><MapPin size={14} />{item.origen}</div></td><td className="p-4"><StatusBadge status={item.status} /></td><td className="p-4 text-right font-semibold text-slate-800">${item.value.toLocaleString()}</td></tr>))}</tbody></table></div></div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"><div className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><div className="p-2 bg-slate-50 rounded-lg text-slate-500"><DollarSign size={20} /></div><h2 className="font-semibold text-slate-800">Importaciones por Categoría</h2></div></div><div className="mb-6"><p className="text-xs text-slate-400 font-medium mb-1">Valor Total en Tránsito</p><h3 className="text-2xl font-bold text-slate-800">$891,450</h3></div><div className="flex w-full h-3 rounded-full overflow-hidden mb-8">{CATEGORIES.map((cat, idx) => { const total = CATEGORIES.reduce((acc, c) => acc + c.value, 0); return (<div key={idx} style={{ width: `${(cat.value / total) * 100}%`, backgroundColor: cat.color }} className="h-full first:rounded-l-full last:rounded-r-full" />); })}</div><div className="space-y-3">{CATEGORIES.map((cat, idx) => (<div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"><div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span><span className="text-sm font-medium text-slate-700">{cat.name}</span></div><span className="text-sm font-semibold text-slate-600">${(cat.value / 1000).toFixed(0)}K</span></div>))}</div></div>
      </div>
    </div>
  );
};

// ============ EMBARQUES PAGE (CON FILTROS Y EXPORT) ============
const EmbarquesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  
  const filteredEmbarques = useMemo(() => {
    return RECENT_SHIPMENTS.filter(emb => {
      const matchSearch = emb.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emb.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTipo = !filterTipo || emb.tipo === filterTipo;
      const matchEstado = !filterEstado || emb.status === filterEstado;
      return matchSearch && matchTipo && matchEstado;
    });
  }, [searchTerm, filterTipo, filterEstado]);
  
  const handleExportExcel = () => exportToExcel(formatEmbarquesForExport(filteredEmbarques), 'embarques', 'Embarques');
  const handleExportCSV = () => exportToCSV(formatEmbarquesForExport(filteredEmbarques), 'embarques');
  
  const clearFilters = () => { setSearchTerm(''); setFilterTipo(''); setFilterEstado(''); };
  const hasFilters = searchTerm || filterTipo || filterEstado;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Embarques</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar embarque..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nuevo Embarque</button></div></div>
      
      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los tipos</option>
            <option value="maritimo">Marítimo</option>
            <option value="aereo">Aéreo</option>
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los estados</option>
            <option value="transito">En Tránsito</option>
            <option value="aduana">En Aduana</option>
            <option value="produccion">Producción</option>
            <option value="demorado">Demorado</option>
            <option value="entregado">Entregado</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredEmbarques.length} de {RECENT_SHIPMENTS.length} embarques</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Ship size={20} /></div><span className="text-sm font-medium text-slate-500">En Tránsito</span></div><p className="text-2xl font-bold text-slate-800">5</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Container size={20} /></div><span className="text-sm font-medium text-slate-500">En Aduana</span></div><p className="text-2xl font-bold text-slate-800">3</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><AlertTriangle size={20} /></div><span className="text-sm font-medium text-slate-500">Demorados</span></div><p className="text-2xl font-bold text-slate-800">1</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div><span className="text-sm font-medium text-slate-500">Entregados (Mes)</span></div><p className="text-2xl font-bold text-slate-800">12</p></div></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">ID</th><th className="p-4">Producto</th><th className="p-4">Origen</th><th className="p-4">Tipo</th><th className="p-4">Estado</th><th className="p-4">ETA</th><th className="p-4">Progreso</th><th className="p-4 text-right">Valor USD</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{filteredEmbarques.map((item) => (<tr key={item.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer"><td className="p-4 font-medium text-blue-600">{item.id}</td><td className="p-4 font-medium text-slate-800">{item.productName}</td><td className="p-4"><div className="flex items-center gap-1.5 text-slate-600"><MapPin size={14} className="text-slate-400" />{item.origen}</div></td><td className="p-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.tipo === 'maritimo' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{item.tipo === 'maritimo' ? <Anchor size={12} /> : <Plane size={12} />}{item.tipo === 'maritimo' ? 'Marítimo' : 'Aéreo'}</span></td><td className="p-4"><StatusBadge status={item.status} /></td><td className="p-4 text-slate-600">{item.eta}</td><td className="p-4"><div className="w-24"><div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-500">{item.progreso}%</span></div><div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${item.progreso}%` }} /></div></div></td><td className="p-4 text-right font-semibold text-slate-800">${item.value.toLocaleString()}</td></tr>))}</tbody></table></div></div>
    </div>
  );
};

// ============ MAYORISTAS PAGE (CON FILTROS Y EXPORT) ============
const MayoristasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  
  const filteredClientes = useMemo(() => {
    return CLIENTES_MAYORISTAS.filter(cli => {
      const matchSearch = cli.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cli.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategoria = !filterCategoria || cli.categoria === filterCategoria;
      const matchEstado = !filterEstado || 
        (filterEstado === 'deuda' && cli.deuda > 0) ||
        (filterEstado === 'aldia' && cli.deuda === 0);
      return matchSearch && matchCategoria && matchEstado;
    });
  }, [searchTerm, filterCategoria, filterEstado]);
  
  const handleExportExcel = () => exportToExcel(formatMayoristasForExport(filteredClientes), 'mayoristas', 'Mayoristas');
  const handleExportCSV = () => exportToCSV(formatMayoristasForExport(filteredClientes), 'mayoristas');
  
  const clearFilters = () => { setSearchTerm(''); setFilterCategoria(''); setFilterEstado(''); };
  const hasFilters = searchTerm || filterCategoria || filterEstado;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-800">Clientes Mayoristas</h1><div className="flex items-center gap-3"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar cliente..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64" /></div><ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} /><button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"><Plus size={16} />Nuevo Cliente</button></div></div>
      
      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todas las categorías</option>
            <option value="A">Categoría A</option>
            <option value="B">Categoría B</option>
            <option value="C">Categoría C</option>
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los estados</option>
            <option value="aldia">Al día</option>
            <option value="deuda">Con deuda</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredClientes.length} de {CLIENTES_MAYORISTAS.length} clientes</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><p className="text-sm text-slate-500 mb-1">Total Clientes</p><p className="text-2xl font-bold text-slate-800">34</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><p className="text-sm text-slate-500 mb-1">Categoría A</p><p className="text-2xl font-bold text-emerald-600">12</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><p className="text-sm text-slate-500 mb-1">Deuda Total</p><p className="text-2xl font-bold text-amber-600">$715K</p></div><div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"><p className="text-sm text-slate-500 mb-1">Ventas Mes</p><p className="text-2xl font-bold text-blue-600">$1.11M</p></div></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider"><tr><th className="p-4">ID</th><th className="p-4">Cliente</th><th className="p-4">Categoría</th><th className="p-4 text-right">Deuda</th><th className="p-4 text-right">Compras Mes</th><th className="p-4">Estado</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm text-slate-700">{filteredClientes.map((cliente) => (<tr key={cliente.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer"><td className="p-4 font-medium text-blue-600">{cliente.id}</td><td className="p-4 font-medium text-slate-800">{cliente.nombre}</td><td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${cliente.categoria === 'A' ? 'bg-emerald-50 text-emerald-600' : cliente.categoria === 'B' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>Cat. {cliente.categoria}</span></td><td className={`p-4 text-right font-medium ${cliente.deuda > 0 ? 'text-amber-600' : 'text-green-600'}`}>${cliente.deuda.toLocaleString()}</td><td className="p-4 text-right font-semibold text-slate-800">${cliente.comprasMes.toLocaleString()}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cliente.deuda === 0 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{cliente.deuda === 0 ? 'Al día' : 'Deuda'}</span></td></tr>))}</tbody></table></div></div>
    </div>
  );
};

// ============ SHARED COMPONENTS ============
const KPICard: React.FC<{ data: any, index: number }> = ({ data, index }) => { const icons = [DollarSign, Ship, Container, Wallet]; const Icon = icons[index % icons.length]; const isNegative = data.growth < 0; return (<div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"><div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500"><Icon size={20} /></div><span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ${isNegative ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>{isNegative ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}{isNegative ? '' : '+'}{data.growth}%</span></div><div className="mb-4"><p className="text-xs text-slate-500 mb-1">{data.label}</p><h3 className="text-2xl font-bold text-slate-800">{data.value}</h3></div><div className="h-10 w-full mt-auto"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.chartData}><Bar dataKey="val" fill="#3b82f6" radius={[2, 2, 2, 2]} barSize={6} /></BarChart></ResponsiveContainer></div></div>); };
const StatusBadge: React.FC<{ status: string }> = ({ status }) => { const styles: Record<string, string> = { transito: "bg-blue-50 text-blue-600", entregado: "bg-green-50 text-green-600", aduana: "bg-amber-50 text-amber-600", demorado: "bg-red-50 text-red-600", produccion: "bg-purple-50 text-purple-600" }; const labels: Record<string, string> = { transito: "En tránsito", entregado: "Entregado", aduana: "En aduana", demorado: "Demorado", produccion: "Producción" }; return (<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>{labels[status] || status}</span>); };

export default DashboardContent;
