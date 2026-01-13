import React, { useState } from 'react';
import {
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Star,
  DollarSign,
  Send,
  Search,
  Filter,
  Settings,
  Play,
  Pause,
  RefreshCw,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  Bot,
  Target,
  Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Types
interface Conversacion {
  id: string;
  cliente: string;
  tienda: string;
  canal: 'whatsapp' | 'instagram' | 'web' | 'mercadolibre';
  estado: 'activa' | 'cerrada' | 'escalada' | 'pendiente';
  mensajes: number;
  duracion: number; // minutos
  resultado: 'venta' | 'sin_venta' | 'pendiente' | 'escalado';
  montoVenta?: number;
  satisfaccion?: number;
  timestamp: string;
  ultimoMensaje: string;
}

interface Mensaje {
  id: string;
  tipo: 'cliente' | 'agente';
  texto: string;
  timestamp: string;
}

// Data
const CONVERSACIONES: Conversacion[] = [
  {
    id: 'CONV-001',
    cliente: 'María García',
    tienda: 'Pet Vogue',
    canal: 'whatsapp',
    estado: 'activa',
    mensajes: 8,
    duracion: 5,
    resultado: 'pendiente',
    timestamp: '2025-01-15T14:32:00',
    ultimoMensaje: '¿Tienen el arnés en talle M?'
  },
  {
    id: 'CONV-002',
    cliente: 'Carlos Rodríguez',
    tienda: 'CoreSmart',
    canal: 'instagram',
    estado: 'cerrada',
    mensajes: 12,
    duracion: 8,
    resultado: 'venta',
    montoVenta: 45000,
    satisfaccion: 5,
    timestamp: '2025-01-15T14:28:00',
    ultimoMensaje: 'Perfecto, gracias por la compra!'
  },
  {
    id: 'CONV-003',
    cliente: 'Laura Méndez',
    tienda: 'Sensuality',
    canal: 'web',
    estado: 'escalada',
    mensajes: 15,
    duracion: 12,
    resultado: 'escalado',
    timestamp: '2025-01-15T14:25:00',
    ultimoMensaje: 'Necesito hablar con un humano'
  },
  {
    id: 'CONV-004',
    cliente: 'Roberto Sánchez',
    tienda: 'Pet Vogue',
    canal: 'mercadolibre',
    estado: 'cerrada',
    mensajes: 6,
    duracion: 4,
    resultado: 'venta',
    montoVenta: 28500,
    satisfaccion: 4,
    timestamp: '2025-01-15T14:20:00',
    ultimoMensaje: 'Gracias, ya hice el pago'
  },
  {
    id: 'CONV-005',
    cliente: 'Ana Torres',
    tienda: 'CoreSmart',
    canal: 'whatsapp',
    estado: 'pendiente',
    mensajes: 3,
    duracion: 2,
    resultado: 'pendiente',
    timestamp: '2025-01-15T14:35:00',
    ultimoMensaje: 'Hola, quisiera saber el precio del timbre smart'
  }
];

const MENSAJES_EJEMPLO: Mensaje[] = [
  { id: '1', tipo: 'cliente', texto: 'Hola! Me interesa el arnés anti-tirones para perro', timestamp: '14:28' },
  { id: '2', tipo: 'agente', texto: '¡Hola María! 🐕 Gracias por contactarnos. El arnés anti-tirones es uno de nuestros productos más populares. ¿Qué talle necesitás? Tenemos S, M, L y XL.', timestamp: '14:28' },
  { id: '3', tipo: 'cliente', texto: 'Es para un golden retriever de 30kg', timestamp: '14:29' },
  { id: '4', tipo: 'agente', texto: 'Para un golden de 30kg te recomiendo el talle L. El arnés viene en colores negro, azul y rojo. Tiene un precio de $18.500 y el envío es gratis a CABA. ¿Te gustaría que te lo reserve?', timestamp: '14:29' },
  { id: '5', tipo: 'cliente', texto: '¿Tienen el arnés en talle M?', timestamp: '14:32' }
];

const RENDIMIENTO_HORA = [
  { hora: '09:00', conversaciones: 12, ventas: 8 },
  { hora: '10:00', conversaciones: 18, ventas: 11 },
  { hora: '11:00', conversaciones: 24, ventas: 15 },
  { hora: '12:00', conversaciones: 31, ventas: 19 },
  { hora: '13:00', conversaciones: 22, ventas: 12 },
  { hora: '14:00', conversaciones: 28, ventas: 17 },
  { hora: '15:00', conversaciones: 35, ventas: 22 }
];

const METRICAS = [
  { label: 'Conversaciones Hoy', value: '85', change: '+15%', icon: MessageSquare, color: 'blue' },
  { label: 'Ventas Cerradas', value: '47', change: '+8%', icon: ShoppingCart, color: 'green' },
  { label: 'Tasa Conversión', value: '55.3%', change: '+3.2%', icon: Target, color: 'purple' },
  { label: 'Ticket Promedio', value: '$38.2K', change: '+12%', icon: DollarSign, color: 'emerald' }
];

const AgenteVentasPage: React.FC = () => {
  const [conversacionActiva, setConversacionActiva] = useState<string | null>('CONV-001');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroCanal, setFiltroCanal] = useState<string>('');

  const conversacionesFiltradas = CONVERSACIONES.filter(conv => {
    const matchEstado = !filtroEstado || conv.estado === filtroEstado;
    const matchCanal = !filtroCanal || conv.canal === filtroCanal;
    return matchEstado && matchCanal;
  });

  const conversacionSeleccionada = CONVERSACIONES.find(c => c.id === conversacionActiva);

  const canalColors: Record<string, string> = {
    whatsapp: 'bg-green-100 text-green-700',
    instagram: 'bg-pink-100 text-pink-700',
    web: 'bg-blue-100 text-blue-700',
    mercadolibre: 'bg-yellow-100 text-yellow-700'
  };

  const estadoColors: Record<string, string> = {
    activa: 'bg-green-100 text-green-700',
    cerrada: 'bg-slate-100 text-slate-600',
    escalada: 'bg-red-100 text-red-700',
    pendiente: 'bg-amber-100 text-amber-700'
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingCart size={24} />
            </div>
            Agente de Ventas
          </h1>
          <p className="text-sm text-slate-500 mt-1">Conversaciones de venta automatizadas multi-tienda</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Activo</span>
          </div>
          <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
            <Pause size={18} />
          </button>
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

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Conversaciones */}
        <div className="col-span-1 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Conversaciones</h2>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                {conversacionesFiltradas.length} activas
              </span>
            </div>
            <div className="flex gap-2">
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="">Estado</option>
                <option value="activa">Activa</option>
                <option value="pendiente">Pendiente</option>
                <option value="escalada">Escalada</option>
                <option value="cerrada">Cerrada</option>
              </select>
              <select
                value={filtroCanal}
                onChange={(e) => setFiltroCanal(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="">Canal</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="web">Web</option>
                <option value="mercadolibre">MercadoLibre</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {conversacionesFiltradas.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setConversacionActiva(conv.id)}
                className={`p-4 cursor-pointer transition-colors ${conversacionActiva === conv.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                      {conv.cliente.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{conv.cliente}</p>
                      <p className="text-[10px] text-slate-400">{conv.tienda}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${estadoColors[conv.estado]}`}>
                    {conv.estado}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mb-2">{conv.ultimoMensaje}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${canalColors[conv.canal]}`}>
                    {conv.canal}
                  </span>
                  <span className="text-[10px] text-slate-400">{conv.mensajes} msgs · {conv.duracion}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          {conversacionSeleccionada ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                    {conversacionSeleccionada.cliente.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{conversacionSeleccionada.cliente}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className={`px-1.5 py-0.5 rounded ${canalColors[conversacionSeleccionada.canal]}`}>
                        {conversacionSeleccionada.canal}
                      </span>
                      <span>·</span>
                      <span>{conversacionSeleccionada.tienda}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Escalar
                  </button>
                  <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/50">
                {MENSAJES_EJEMPLO.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.tipo === 'agente' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.tipo === 'agente' ? 'bg-white border border-slate-200 text-slate-700' : 'bg-blue-600 text-white'}`}>
                      {msg.tipo === 'agente' && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Bot size={12} className="text-purple-500" />
                          <span className="text-[10px] font-medium text-purple-600">Emma Sales</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.texto}</p>
                      <p className={`text-[10px] mt-1 ${msg.tipo === 'agente' ? 'text-slate-400' : 'text-blue-200'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="El agente responderá automáticamente..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      disabled
                    />
                    <Bot size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500" />
                  </div>
                  <button className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                    <Zap size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">🤖 El agente AI está manejando esta conversación automáticamente</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                <p>Selecciona una conversación</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico de Rendimiento */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-slate-800">Rendimiento por Hora</h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Conversaciones</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Ventas</div>
          </div>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RENDIMIENTO_HORA}>
              <defs>
                <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="conversaciones" stroke="#3b82f6" strokeWidth={2} fill="url(#colorConv)" />
              <Area type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} fill="url(#colorVentas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AgenteVentasPage;
