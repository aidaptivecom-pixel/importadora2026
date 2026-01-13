import React, { useState } from 'react';
import {
  Package,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Shield,
  Truck,
  RotateCcw,
  Star,
  TrendingUp,
  Calendar,
  User,
  Settings,
  ArrowUpRight,
  Filter,
  Search,
  Bot,
  FileText
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

// Types
interface CasoPostventa {
  id: string;
  cliente: string;
  tienda: string;
  pedidoId: string;
  tipo: 'garantia' | 'devolucion' | 'cambio' | 'seguimiento' | 'reclamo';
  estado: 'abierto' | 'en_proceso' | 'resuelto' | 'cerrado';
  producto: string;
  fechaCompra: string;
  diasDesdeCompra: number;
  automatizado: boolean;
  prioridad: 'alta' | 'media' | 'baja';
  timestamp: string;
}

interface GarantiaActiva {
  id: string;
  producto: string;
  cliente: string;
  fechaInicio: string;
  fechaFin: string;
  diasRestantes: number;
  estado: 'vigente' | 'por_vencer' | 'vencida';
}

// Data
const CASOS: CasoPostventa[] = [
  {
    id: 'POST-001',
    cliente: 'Lucía Mendoza',
    tienda: 'CoreSmart',
    pedidoId: 'PED-4521',
    tipo: 'garantia',
    estado: 'en_proceso',
    producto: 'Cámara de Seguridad WiFi',
    fechaCompra: '2024-11-20',
    diasDesdeCompra: 56,
    automatizado: true,
    prioridad: 'alta',
    timestamp: '2025-01-15T14:20:00'
  },
  {
    id: 'POST-002',
    cliente: 'Andrés Vargas',
    tienda: 'Pet Vogue',
    pedidoId: 'PED-4498',
    tipo: 'devolucion',
    estado: 'abierto',
    producto: 'Cama Ortopédica Premium',
    fechaCompra: '2025-01-10',
    diasDesdeCompra: 5,
    automatizado: true,
    prioridad: 'media',
    timestamp: '2025-01-15T13:45:00'
  },
  {
    id: 'POST-003',
    cliente: 'Valentina Castro',
    tienda: 'Sensuality',
    pedidoId: 'PED-4510',
    tipo: 'cambio',
    estado: 'resuelto',
    producto: 'Set de Lencería Deluxe',
    fechaCompra: '2025-01-08',
    diasDesdeCompra: 7,
    automatizado: true,
    prioridad: 'baja',
    timestamp: '2025-01-15T12:30:00'
  },
  {
    id: 'POST-004',
    cliente: 'Ricardo Soto',
    tienda: 'CoreSmart',
    pedidoId: 'PED-4489',
    tipo: 'seguimiento',
    estado: 'cerrado',
    producto: 'Timbre Inteligente',
    fechaCompra: '2025-01-05',
    diasDesdeCompra: 10,
    automatizado: true,
    prioridad: 'baja',
    timestamp: '2025-01-15T11:00:00'
  },
  {
    id: 'POST-005',
    cliente: 'Mónica Ríos',
    tienda: 'Pet Vogue',
    pedidoId: 'PED-4502',
    tipo: 'reclamo',
    estado: 'en_proceso',
    producto: 'Transportadora Aérea',
    fechaCompra: '2025-01-03',
    diasDesdeCompra: 12,
    automatizado: false,
    prioridad: 'alta',
    timestamp: '2025-01-15T14:00:00'
  }
];

const GARANTIAS: GarantiaActiva[] = [
  { id: 'GAR-001', producto: 'Cámara WiFi Pro', cliente: 'Juan Pérez', fechaInicio: '2024-08-15', fechaFin: '2025-08-15', diasRestantes: 212, estado: 'vigente' },
  { id: 'GAR-002', producto: 'Timbre Smart Ring', cliente: 'María López', fechaInicio: '2024-12-01', fechaFin: '2025-06-01', diasRestantes: 137, estado: 'vigente' },
  { id: 'GAR-003', producto: 'Sensor de Movimiento', cliente: 'Carlos Ruiz', fechaInicio: '2024-07-20', fechaFin: '2025-01-20', diasRestantes: 5, estado: 'por_vencer' },
  { id: 'GAR-004', producto: 'Hub Central Smart', cliente: 'Ana García', fechaInicio: '2024-06-10', fechaFin: '2025-01-10', diasRestantes: 0, estado: 'vencida' }
];

const CASOS_POR_TIPO = [
  { tipo: 'Seguimiento', cantidad: 45, color: '#3b82f6' },
  { tipo: 'Garantía', cantidad: 28, color: '#f59e0b' },
  { tipo: 'Devolución', cantidad: 18, color: '#ef4444' },
  { tipo: 'Cambio', cantidad: 12, color: '#10b981' },
  { tipo: 'Reclamo', cantidad: 8, color: '#8b5cf6' }
];

const EVOLUCION_SEMANAL = [
  { dia: 'Lun', casos: 18, resueltos: 15, automatizados: 14 },
  { dia: 'Mar', casos: 22, resueltos: 19, automatizados: 17 },
  { dia: 'Mié', casos: 25, resueltos: 21, automatizados: 19 },
  { dia: 'Jue', casos: 20, resueltos: 18, automatizados: 16 },
  { dia: 'Vie', casos: 28, resueltos: 24, automatizados: 22 },
  { dia: 'Sáb', casos: 15, resueltos: 14, automatizados: 13 },
  { dia: 'Dom', casos: 8, resueltos: 7, automatizados: 6 }
];

const METRICAS = [
  { label: 'Casos Activos', value: '31', change: '-12%', icon: Package, color: 'blue' },
  { label: 'Tasa Automatización', value: '89.3%', change: '+5.2%', icon: Bot, color: 'purple' },
  { label: 'Tiempo Resolución', value: '4.2h', change: '-28%', icon: Clock, color: 'amber' },
  { label: 'Garantías Activas', value: '156', change: '+8%', icon: Shield, color: 'green' }
];

const AgentePostventaPage: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const casosFiltrados = CASOS.filter(c => {
    const matchTipo = !filtroTipo || c.tipo === filtroTipo;
    const matchEstado = !filtroEstado || c.estado === filtroEstado;
    return matchTipo && matchEstado;
  });

  const tipoColors: Record<string, string> = {
    garantia: 'bg-amber-100 text-amber-700',
    devolucion: 'bg-red-100 text-red-700',
    cambio: 'bg-green-100 text-green-700',
    seguimiento: 'bg-blue-100 text-blue-700',
    reclamo: 'bg-purple-100 text-purple-700'
  };

  const tipoIcons: Record<string, React.ReactNode> = {
    garantia: <Shield size={14} />,
    devolucion: <RotateCcw size={14} />,
    cambio: <RefreshCw size={14} />,
    seguimiento: <Truck size={14} />,
    reclamo: <AlertTriangle size={14} />
  };

  const estadoColors: Record<string, string> = {
    abierto: 'bg-blue-100 text-blue-700',
    en_proceso: 'bg-amber-100 text-amber-700',
    resuelto: 'bg-green-100 text-green-700',
    cerrado: 'bg-slate-100 text-slate-600'
  };

  const garantiaColors: Record<string, string> = {
    vigente: 'bg-green-100 text-green-700',
    por_vencer: 'bg-amber-100 text-amber-700',
    vencida: 'bg-red-100 text-red-700'
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Package size={24} />
            </div>
            Agente de Postventa
          </h1>
          <p className="text-sm text-slate-500 mt-1">Seguimiento automático de casos, garantías y devoluciones</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Activo</span>
          </div>
          <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {METRICAS.map((metrica, idx) => {
          const Icon = metrica.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[metrica.color]}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600 flex items-center gap-1">
                  <ArrowUpRight size={10} />
                  {metrica.change}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{metrica.label}</p>
              <p className="text-2xl font-bold text-slate-800">{metrica.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Evolución Semanal */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-800">Evolución Semanal</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Casos</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Resueltos</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>Automatizados</div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVOLUCION_SEMANAL}>
                <defs>
                  <linearGradient id="colorCasos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="casos" stroke="#3b82f6" strokeWidth={2} fill="url(#colorCasos)" />
                <Area type="monotone" dataKey="resueltos" stroke="#10b981" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="automatizados" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Por Tipo */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Casos por Tipo</h2>
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CASOS_POR_TIPO}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="cantidad"
                  stroke="none"
                >
                  {CASOS_POR_TIPO.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-800">111</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {CASOS_POR_TIPO.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-slate-600">{cat.tipo}</span>
                </div>
                <span className="font-medium text-slate-800">{cat.cantidad}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Casos y Garantías */}
      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Casos */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Casos de Postventa</h2>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                {casosFiltrados.length} casos
              </span>
            </div>
            <div className="flex gap-2">
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Tipo</option>
                <option value="garantia">Garantía</option>
                <option value="devolucion">Devolución</option>
                <option value="cambio">Cambio</option>
                <option value="seguimiento">Seguimiento</option>
                <option value="reclamo">Reclamo</option>
              </select>
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Estado</option>
                <option value="abierto">Abierto</option>
                <option value="en_proceso">En Proceso</option>
                <option value="resuelto">Resuelto</option>
                <option value="cerrado">Cerrado</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
            {casosFiltrados.map((caso) => (
              <div key={caso.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tipoColors[caso.tipo]}`}>
                      {tipoIcons[caso.tipo]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{caso.id}</p>
                      <p className="text-xs text-slate-500">{caso.cliente} · {caso.tienda}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {caso.automatizado && (
                      <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Bot size={10} /> Auto
                      </span>
                    )}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${estadoColors[caso.estado]}`}>
                      {caso.estado.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-2">{caso.producto}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><FileText size={12} />{caso.pedidoId}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{caso.diasDesdeCompra} días desde compra</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantías */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Shield className="text-green-600" size={18} />
              <h2 className="font-semibold text-slate-800">Garantías Activas</h2>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
            {GARANTIAS.map((gar) => (
              <div key={gar.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-slate-800 text-sm">{gar.producto}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${garantiaColors[gar.estado]}`}>
                    {gar.estado === 'vigente' ? '✓ Vigente' : gar.estado === 'por_vencer' ? '⚠ Por vencer' : '✗ Vencida'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{gar.cliente}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Vence: {new Date(gar.fechaFin).toLocaleDateString('es-AR')}</span>
                  <span className={`font-medium ${gar.diasRestantes <= 7 ? 'text-red-600' : gar.diasRestantes <= 30 ? 'text-amber-600' : 'text-green-600'}`}>
                    {gar.diasRestantes > 0 ? `${gar.diasRestantes} días` : 'Vencida'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-sm font-medium transition-colors">
              Ver todas las garantías
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentePostventaPage;
