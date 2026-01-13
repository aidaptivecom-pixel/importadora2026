import React, { useState } from 'react';
import {
  HeadphonesIcon,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Star,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Zap,
  Tag,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Types
interface Ticket {
  id: string;
  cliente: string;
  tienda: string;
  asunto: string;
  categoria: 'envio' | 'producto' | 'pago' | 'devolucion' | 'otro';
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'abierto' | 'en_proceso' | 'resuelto' | 'escalado';
  csat?: number;
  tiempoResolucion?: number; // minutos
  timestamp: string;
  mensajes: number;
}

// Data
const TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    cliente: 'Patricia López',
    tienda: 'Pet Vogue',
    asunto: 'Mi pedido no llegó en la fecha prometida',
    categoria: 'envio',
    prioridad: 'alta',
    estado: 'en_proceso',
    timestamp: '2025-01-15T14:30:00',
    mensajes: 6
  },
  {
    id: 'TKT-002',
    cliente: 'Miguel Fernández',
    tienda: 'CoreSmart',
    asunto: 'El producto llegó dañado',
    categoria: 'producto',
    prioridad: 'alta',
    estado: 'escalado',
    timestamp: '2025-01-15T14:15:00',
    mensajes: 8
  },
  {
    id: 'TKT-003',
    cliente: 'Sandra Ruiz',
    tienda: 'Sensuality',
    asunto: 'No puedo completar el pago',
    categoria: 'pago',
    prioridad: 'media',
    estado: 'resuelto',
    csat: 5,
    tiempoResolucion: 12,
    timestamp: '2025-01-15T14:00:00',
    mensajes: 4
  },
  {
    id: 'TKT-004',
    cliente: 'Fernando Díaz',
    tienda: 'Pet Vogue',
    asunto: 'Quiero hacer una devolución',
    categoria: 'devolucion',
    prioridad: 'media',
    estado: 'en_proceso',
    timestamp: '2025-01-15T13:45:00',
    mensajes: 5
  },
  {
    id: 'TKT-005',
    cliente: 'Carolina Martín',
    tienda: 'CoreSmart',
    asunto: 'Consulta sobre garantía',
    categoria: 'otro',
    prioridad: 'baja',
    estado: 'resuelto',
    csat: 4,
    tiempoResolucion: 8,
    timestamp: '2025-01-15T13:30:00',
    mensajes: 3
  },
  {
    id: 'TKT-006',
    cliente: 'Diego Morales',
    tienda: 'Sensuality',
    asunto: 'Producto diferente al de la foto',
    categoria: 'producto',
    prioridad: 'alta',
    estado: 'abierto',
    timestamp: '2025-01-15T14:35:00',
    mensajes: 2
  }
];

const TICKETS_POR_CATEGORIA = [
  { categoria: 'Envío', cantidad: 34, color: '#3b82f6' },
  { categoria: 'Producto', cantidad: 28, color: '#f59e0b' },
  { categoria: 'Pago', cantidad: 18, color: '#10b981' },
  { categoria: 'Devolución', cantidad: 15, color: '#ef4444' },
  { categoria: 'Otro', cantidad: 12, color: '#8b5cf6' }
];

const CSAT_SEMANAL = [
  { dia: 'Lun', csat: 4.5, resueltos: 32 },
  { dia: 'Mar', csat: 4.7, resueltos: 38 },
  { dia: 'Mié', csat: 4.6, resueltos: 35 },
  { dia: 'Jue', csat: 4.8, resueltos: 42 },
  { dia: 'Vie', csat: 4.7, resueltos: 45 },
  { dia: 'Sáb', csat: 4.9, resueltos: 28 },
  { dia: 'Dom', csat: 4.6, resueltos: 18 }
];

const METRICAS = [
  { label: 'Tickets Abiertos', value: '23', change: '-8%', icon: MessageSquare, color: 'blue', positive: true },
  { label: 'Tasa Resolución', value: '96.8%', change: '+2.4%', icon: CheckCircle2, color: 'green', positive: true },
  { label: 'CSAT Promedio', value: '4.7', change: '+0.2', icon: Star, color: 'amber', positive: true },
  { label: 'Tiempo Promedio', value: '8m', change: '-23%', icon: Clock, color: 'purple', positive: true }
];

const ESCALACIONES = [
  { id: 'ESC-001', ticket: 'TKT-002', motivo: 'Cliente insiste en reembolso completo', agente: 'Sofia Care', timestamp: '14:20' },
  { id: 'ESC-002', ticket: 'TKT-008', motivo: 'Problema técnico requiere soporte especializado', agente: 'Sofia Care', timestamp: '13:45' },
  { id: 'ESC-003', ticket: 'TKT-012', motivo: 'Cliente amenaza con queja pública', agente: 'Sofia Care', timestamp: '12:30' }
];

const AgenteSoportePage: React.FC = () => {
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('');

  const ticketsFiltrados = TICKETS.filter(t => {
    const matchEstado = !filtroEstado || t.estado === filtroEstado;
    const matchCategoria = !filtroCategoria || t.categoria === filtroCategoria;
    const matchPrioridad = !filtroPrioridad || t.prioridad === filtroPrioridad;
    return matchEstado && matchCategoria && matchPrioridad;
  });

  const categoriaColors: Record<string, string> = {
    envio: 'bg-blue-100 text-blue-700',
    producto: 'bg-amber-100 text-amber-700',
    pago: 'bg-green-100 text-green-700',
    devolucion: 'bg-red-100 text-red-700',
    otro: 'bg-purple-100 text-purple-700'
  };

  const prioridadColors: Record<string, string> = {
    alta: 'bg-red-100 text-red-700',
    media: 'bg-amber-100 text-amber-700',
    baja: 'bg-slate-100 text-slate-600'
  };

  const estadoColors: Record<string, string> = {
    abierto: 'bg-blue-100 text-blue-700',
    en_proceso: 'bg-amber-100 text-amber-700',
    resuelto: 'bg-green-100 text-green-700',
    escalado: 'bg-red-100 text-red-700'
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
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <HeadphonesIcon size={24} />
            </div>
            Agente de Soporte
          </h1>
          <p className="text-sm text-slate-500 mt-1">Resolución automatizada de tickets y consultas</p>
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
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${metrica.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {metrica.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
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
        {/* CSAT y Resoluciones */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-800">CSAT y Resoluciones Semanal</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>CSAT</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Resueltos</div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CSAT_SEMANAL}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar yAxisId="right" dataKey="resueltos" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Line yAxisId="left" type="monotone" dataKey="csat" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Por Categoría */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Por Categoría</h2>
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TICKETS_POR_CATEGORIA}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="cantidad"
                  stroke="none"
                >
                  {TICKETS_POR_CATEGORIA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-800">107</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {TICKETS_POR_CATEGORIA.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-slate-600">{cat.categoria}</span>
                </div>
                <span className="font-medium text-slate-800">{cat.cantidad}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets y Escalaciones */}
      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Tickets */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Tickets Recientes</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos →</button>
            </div>
            <div className="flex gap-2">
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Estado</option>
                <option value="abierto">Abierto</option>
                <option value="en_proceso">En Proceso</option>
                <option value="resuelto">Resuelto</option>
                <option value="escalado">Escalado</option>
              </select>
              <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Categoría</option>
                <option value="envio">Envío</option>
                <option value="producto">Producto</option>
                <option value="pago">Pago</option>
                <option value="devolucion">Devolución</option>
              </select>
              <select value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Prioridad</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="p-4">Ticket</th>
                  <th className="p-4">Asunto</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Prioridad</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">CSAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50 cursor-pointer">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-blue-600">{ticket.id}</p>
                        <p className="text-xs text-slate-400">{ticket.cliente}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-700 max-w-[200px] truncate">{ticket.asunto}</p>
                      <p className="text-xs text-slate-400">{ticket.tienda}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${categoriaColors[ticket.categoria]}`}>
                        {ticket.categoria}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${prioridadColors[ticket.prioridad]}`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${estadoColors[ticket.estado]}`}>
                        {ticket.estado.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      {ticket.csat ? (
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span className="font-medium text-slate-700">{ticket.csat}</span>
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Escalaciones */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={18} />
              <h2 className="font-semibold text-red-700">Escalaciones Pendientes</h2>
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">{ESCALACIONES.length}</span>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {ESCALACIONES.map((esc) => (
              <div key={esc.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-600">{esc.ticket}</span>
                  <span className="text-xs text-slate-400">{esc.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{esc.motivo}</p>
                <div className="flex items-center gap-2">
                  <Bot size={12} className="text-purple-500" />
                  <span className="text-xs text-slate-500">{esc.agente}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors">
              Ver todas las escalaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenteSoportePage;
