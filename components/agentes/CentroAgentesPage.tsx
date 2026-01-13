import React, { useState } from 'react';
import {
  Bot,
  MessageSquare,
  ShoppingCart,
  HeadphonesIcon,
  Package,
  Megaphone,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Settings,
  Play,
  Pause,
  MoreHorizontal,
  ArrowUpRight,
  Users,
  DollarSign,
  Star,
  RefreshCw
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
interface Agente {
  id: string;
  nombre: string;
  tipo: 'ventas' | 'soporte' | 'postventa' | 'marketing';
  tienda: string;
  estado: 'activo' | 'pausado' | 'entrenando';
  conversacionesHoy: number;
  conversacionesTotal: number;
  tasaResolucion: number;
  tiempoRespuesta: number; // segundos
  satisfaccion: number;
  ahorrroMensual: number;
  ultimaActividad: string;
  avatar: string;
}

// Data
const AGENTES: Agente[] = [
  {
    id: 'AGT-001',
    nombre: 'Emma Sales',
    tipo: 'ventas',
    tienda: 'Pet Vogue',
    estado: 'activo',
    conversacionesHoy: 47,
    conversacionesTotal: 2340,
    tasaResolucion: 94.2,
    tiempoRespuesta: 8,
    satisfaccion: 4.8,
    ahorrroMensual: 12500,
    ultimaActividad: '2025-01-15T14:32:00',
    avatar: '🐕'
  },
  {
    id: 'AGT-002',
    nombre: 'Tech Advisor',
    tipo: 'ventas',
    tienda: 'CoreSmart',
    estado: 'activo',
    conversacionesHoy: 38,
    conversacionesTotal: 1890,
    tasaResolucion: 91.5,
    tiempoRespuesta: 12,
    satisfaccion: 4.6,
    ahorrroMensual: 10800,
    ultimaActividad: '2025-01-15T14:28:00',
    avatar: '🏠'
  },
  {
    id: 'AGT-003',
    nombre: 'Sofia Care',
    tipo: 'soporte',
    tienda: 'Sensuality',
    estado: 'activo',
    conversacionesHoy: 23,
    conversacionesTotal: 1245,
    tasaResolucion: 96.8,
    tiempoRespuesta: 5,
    satisfaccion: 4.9,
    ahorrroMensual: 8200,
    ultimaActividad: '2025-01-15T14:35:00',
    avatar: '💜'
  },
  {
    id: 'AGT-004',
    nombre: 'Post Support',
    tipo: 'postventa',
    tienda: 'Multi-tienda',
    estado: 'activo',
    conversacionesHoy: 31,
    conversacionesTotal: 1678,
    tasaResolucion: 89.3,
    tiempoRespuesta: 15,
    satisfaccion: 4.5,
    ahorrroMensual: 9400,
    ultimaActividad: '2025-01-15T14:30:00',
    avatar: '📦'
  },
  {
    id: 'AGT-005',
    nombre: 'Content AI',
    tipo: 'marketing',
    tienda: 'Multi-tienda',
    estado: 'entrenando',
    conversacionesHoy: 0,
    conversacionesTotal: 456,
    tasaResolucion: 87.2,
    tiempoRespuesta: 45,
    satisfaccion: 4.3,
    ahorrroMensual: 15000,
    ultimaActividad: '2025-01-15T12:00:00',
    avatar: '🎨'
  }
];

const ACTIVIDAD_SEMANAL = [
  { dia: 'Lun', ventas: 89, soporte: 45, postventa: 32, marketing: 12 },
  { dia: 'Mar', ventas: 102, soporte: 52, postventa: 28, marketing: 18 },
  { dia: 'Mié', ventas: 95, soporte: 48, postventa: 35, marketing: 15 },
  { dia: 'Jue', ventas: 118, soporte: 61, postventa: 41, marketing: 22 },
  { dia: 'Vie', ventas: 134, soporte: 58, postventa: 38, marketing: 19 },
  { dia: 'Sáb', ventas: 156, soporte: 42, postventa: 25, marketing: 8 },
  { dia: 'Dom', ventas: 98, soporte: 28, postventa: 18, marketing: 5 }
];

const DISTRIBUCION_TIPO = [
  { name: 'Ventas', value: 45, color: '#3b82f6' },
  { name: 'Soporte', value: 28, color: '#10b981' },
  { name: 'Postventa', value: 18, color: '#f59e0b' },
  { name: 'Marketing', value: 9, color: '#8b5cf6' }
];

const METRICAS_GLOBALES = [
  { label: 'Conversaciones Hoy', value: '139', change: '+12%', icon: MessageSquare, color: 'blue' },
  { label: 'Tasa Resolución', value: '93.4%', change: '+2.1%', icon: CheckCircle2, color: 'green' },
  { label: 'Tiempo Respuesta', value: '9s', change: '-18%', icon: Clock, color: 'amber' },
  { label: 'Ahorro Mensual', value: '$55.9K', change: '+8%', icon: DollarSign, color: 'emerald' }
];

const CentroAgentesPage: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const agentesFiltrados = AGENTES.filter(ag => {
    const matchTipo = !filtroTipo || ag.tipo === filtroTipo;
    const matchEstado = !filtroEstado || ag.estado === filtroEstado;
    return matchTipo && matchEstado;
  });

  const tipoColors: Record<string, string> = {
    ventas: 'bg-blue-50 text-blue-600 border-blue-200',
    soporte: 'bg-green-50 text-green-600 border-green-200',
    postventa: 'bg-amber-50 text-amber-600 border-amber-200',
    marketing: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  const tipoIcons: Record<string, React.ReactNode> = {
    ventas: <ShoppingCart size={16} />,
    soporte: <HeadphonesIcon size={16} />,
    postventa: <Package size={16} />,
    marketing: <Megaphone size={16} />
  };

  const estadoColors: Record<string, string> = {
    activo: 'bg-green-100 text-green-700',
    pausado: 'bg-slate-100 text-slate-600',
    entrenando: 'bg-purple-100 text-purple-700'
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Bot className="text-purple-600" size={28} />
            Centro de Agentes AI
          </h1>
          <p className="text-sm text-slate-500 mt-1">Gestión centralizada de todos los agentes inteligentes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors">
            <RefreshCw size={16} />
            Sincronizar
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <Zap size={16} />
            Nuevo Agente
          </button>
        </div>
      </div>

      {/* KPIs Globales */}
      <div className="grid grid-cols-4 gap-4">
        {METRICAS_GLOBALES.map((metrica, idx) => {
          const Icon = metrica.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[metrica.color]}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${metrica.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
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
        {/* Actividad Semanal */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-800">Actividad Semanal por Tipo</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Ventas</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Soporte</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Postventa</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>Marketing</div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACTIVIDAD_SEMANAL}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="soporte" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="postventa" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="marketing" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Tipo */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Distribución por Tipo</h2>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DISTRIBUCION_TIPO}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {DISTRIBUCION_TIPO.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-800">5</p>
              <p className="text-xs text-slate-500">Agentes</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {DISTRIBUCION_TIPO.map((tipo, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tipo.color }}></span>
                  <span className="text-slate-600">{tipo.name}</span>
                </div>
                <span className="font-medium text-slate-800">{tipo.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">Filtrar:</span>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          >
            <option value="">Todos los tipos</option>
            <option value="ventas">Ventas</option>
            <option value="soporte">Soporte</option>
            <option value="postventa">Postventa</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="pausado">Pausado</option>
            <option value="entrenando">Entrenando</option>
          </select>
          <span className="ml-auto text-sm text-slate-500">{agentesFiltrados.length} agentes</span>
        </div>
      </div>

      {/* Grid de Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentesFiltrados.map((agente) => (
          <div key={agente.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-2xl">
                  {agente.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{agente.nombre}</h3>
                  <p className="text-xs text-slate-500">{agente.tienda}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${estadoColors[agente.estado]}`}>
                  {agente.estado === 'activo' ? '● Activo' : agente.estado === 'pausado' ? '◯ Pausado' : '◐ Entrenando'}
                </span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium mb-4 ${tipoColors[agente.tipo]}`}>
              {tipoIcons[agente.tipo]}
              {agente.tipo.charAt(0).toUpperCase() + agente.tipo.slice(1)}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 mb-0.5">Conversaciones Hoy</p>
                <p className="text-lg font-bold text-slate-800">{agente.conversacionesHoy}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 mb-0.5">Tasa Resolución</p>
                <p className="text-lg font-bold text-green-600">{agente.tasaResolucion}%</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 mb-0.5">Tiempo Resp.</p>
                <p className="text-lg font-bold text-slate-800">{agente.tiempoRespuesta}s</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 mb-0.5">Satisfacción</p>
                <p className="text-lg font-bold text-amber-600 flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {agente.satisfaccion}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400">Ahorro mensual</p>
                <p className="text-sm font-semibold text-emerald-600">${agente.ahorrroMensual.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {agente.estado === 'activo' ? (
                  <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                    <Pause size={14} />
                  </button>
                ) : (
                  <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors">
                    <Play size={14} />
                  </button>
                )}
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                  <Settings size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de Ahorro */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ahorro Total por Automatización</h3>
            <p className="text-emerald-100 text-sm">Los agentes AI han procesado 7,609 conversaciones este mes</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">$55,900</p>
            <p className="text-emerald-100 text-sm">ahorro mensual estimado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroAgentesPage;
