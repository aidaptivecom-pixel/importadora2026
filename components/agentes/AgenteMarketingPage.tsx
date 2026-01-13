import React, { useState } from 'react';
import {
  Megaphone,
  FileText,
  Image,
  Video,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  MessageSquare,
  Calendar,
  Settings,
  ArrowUpRight,
  Bot,
  Wand2,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Trash2,
  Copy
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
interface ContenidoGenerado {
  id: string;
  tipo: 'post' | 'reel' | 'story' | 'email' | 'ad';
  tienda: string;
  titulo: string;
  descripcion: string;
  estado: 'borrador' | 'pendiente' | 'aprobado' | 'rechazado' | 'publicado';
  avatar: string;
  fechaCreacion: string;
  fechaProgramada?: string;
  metricas?: {
    vistas: number;
    likes: number;
    shares: number;
    comentarios: number;
  };
}

// Data
const CONTENIDO: ContenidoGenerado[] = [
  {
    id: 'CONT-001',
    tipo: 'reel',
    tienda: 'Pet Vogue',
    titulo: '5 Tips para pasear a tu perro en verano',
    descripcion: 'Reel educativo con consejos de hidratación y horarios recomendados para paseos en época de calor.',
    estado: 'pendiente',
    avatar: 'Emma',
    fechaCreacion: '2025-01-15T14:00:00',
    fechaProgramada: '2025-01-16T10:00:00'
  },
  {
    id: 'CONT-002',
    tipo: 'post',
    tienda: 'CoreSmart',
    titulo: 'Lanzamiento: Nueva cámara 4K Ultra',
    descripcion: 'Post de producto destacando las características principales de la nueva cámara de seguridad.',
    estado: 'aprobado',
    avatar: 'Tech',
    fechaCreacion: '2025-01-15T12:30:00',
    fechaProgramada: '2025-01-15T18:00:00'
  },
  {
    id: 'CONT-003',
    tipo: 'story',
    tienda: 'Sensuality',
    titulo: 'San Valentín - Countdown',
    descripcion: 'Serie de stories con cuenta regresiva para San Valentín mostrando productos destacados.',
    estado: 'publicado',
    avatar: 'Sofia',
    fechaCreacion: '2025-01-14T16:00:00',
    metricas: { vistas: 2340, likes: 189, shares: 45, comentarios: 23 }
  },
  {
    id: 'CONT-004',
    tipo: 'email',
    tienda: 'Pet Vogue',
    titulo: 'Newsletter: Novedades de Enero',
    descripcion: 'Email mensual con nuevos productos, ofertas especiales y contenido de valor sobre cuidado de mascotas.',
    estado: 'borrador',
    avatar: 'Emma',
    fechaCreacion: '2025-01-15T10:00:00'
  },
  {
    id: 'CONT-005',
    tipo: 'ad',
    tienda: 'CoreSmart',
    titulo: 'Campaña: Seguridad para tu Hogar',
    descripcion: 'Anuncio para Meta Ads promocionando el kit de seguridad completo con descuento del 20%.',
    estado: 'rechazado',
    avatar: 'Tech',
    fechaCreacion: '2025-01-14T14:00:00'
  },
  {
    id: 'CONT-006',
    tipo: 'reel',
    tienda: 'Sensuality',
    titulo: 'Unboxing: Colección Premium',
    descripcion: 'Video de unboxing mostrando el empaque especial y productos de la colección premium.',
    estado: 'pendiente',
    avatar: 'Sofia',
    fechaCreacion: '2025-01-15T13:00:00'
  }
];

const CONTENIDO_POR_TIPO = [
  { tipo: 'Reels', cantidad: 45, color: '#ef4444' },
  { tipo: 'Posts', cantidad: 38, color: '#3b82f6' },
  { tipo: 'Stories', cantidad: 52, color: '#f59e0b' },
  { tipo: 'Emails', cantidad: 12, color: '#10b981' },
  { tipo: 'Ads', cantidad: 18, color: '#8b5cf6' }
];

const RENDIMIENTO_SEMANAL = [
  { dia: 'Lun', generados: 8, aprobados: 6, publicados: 5 },
  { dia: 'Mar', generados: 12, aprobados: 9, publicados: 8 },
  { dia: 'Mié', generados: 10, aprobados: 8, publicados: 7 },
  { dia: 'Jue', generados: 15, aprobados: 12, publicados: 10 },
  { dia: 'Vie', generados: 18, aprobados: 14, publicados: 12 },
  { dia: 'Sáb', generados: 6, aprobados: 5, publicados: 4 },
  { dia: 'Dom', generados: 4, aprobados: 3, publicados: 3 }
];

const METRICAS = [
  { label: 'Contenido Generado', value: '165', change: '+24%', icon: Sparkles, color: 'purple' },
  { label: 'Pendientes Aprobación', value: '8', change: '-3', icon: Clock, color: 'amber' },
  { label: 'Tasa Aprobación', value: '87.2%', change: '+4.5%', icon: CheckCircle2, color: 'green' },
  { label: 'Engagement Promedio', value: '4.8%', change: '+0.6%', icon: Heart, color: 'pink' }
];

const AgenteMarketingPage: React.FC = () => {
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroTienda, setFiltroTienda] = useState<string>('');

  const contenidoFiltrado = CONTENIDO.filter(c => {
    const matchEstado = !filtroEstado || c.estado === filtroEstado;
    const matchTipo = !filtroTipo || c.tipo === filtroTipo;
    const matchTienda = !filtroTienda || c.tienda === filtroTienda;
    return matchEstado && matchTipo && matchTienda;
  });

  const pendientes = CONTENIDO.filter(c => c.estado === 'pendiente');

  const tipoColors: Record<string, string> = {
    post: 'bg-blue-100 text-blue-700',
    reel: 'bg-red-100 text-red-700',
    story: 'bg-amber-100 text-amber-700',
    email: 'bg-green-100 text-green-700',
    ad: 'bg-purple-100 text-purple-700'
  };

  const tipoIcons: Record<string, React.ReactNode> = {
    post: <Image size={14} />,
    reel: <Video size={14} />,
    story: <Sparkles size={14} />,
    email: <FileText size={14} />,
    ad: <Megaphone size={14} />
  };

  const estadoColors: Record<string, string> = {
    borrador: 'bg-slate-100 text-slate-600',
    pendiente: 'bg-amber-100 text-amber-700',
    aprobado: 'bg-green-100 text-green-700',
    rechazado: 'bg-red-100 text-red-700',
    publicado: 'bg-blue-100 text-blue-700'
  };

  const colorMap: Record<string, string> = {
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    pink: 'bg-pink-50 text-pink-600'
  };

  const avatarEmojis: Record<string, string> = {
    Emma: '🐕',
    Tech: '🏠',
    Sofia: '💜'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Megaphone size={24} />
            </div>
            Agente de Marketing
          </h1>
          <p className="text-sm text-slate-500 mt-1">Generación automática de contenido con aprobación humana</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-sm font-medium text-purple-700">Entrenando</span>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Wand2 size={16} />
            Generar Contenido
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

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Rendimiento Semanal */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-800">Rendimiento Semanal</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>Generados</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Aprobados</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Publicados</div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RENDIMIENTO_SEMANAL}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="generados" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aprobados" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="publicados" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Por Tipo */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Contenido por Tipo</h2>
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CONTENIDO_POR_TIPO}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="cantidad"
                  stroke="none"
                >
                  {CONTENIDO_POR_TIPO.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-800">165</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {CONTENIDO_POR_TIPO.map((cat, idx) => (
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

      {/* Aprobaciones Pendientes y Lista de Contenido */}
      <div className="grid grid-cols-3 gap-6">
        {/* Aprobaciones Pendientes */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-amber-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-amber-600" size={18} />
                <h2 className="font-semibold text-amber-800">Pendientes de Aprobación</h2>
              </div>
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                {pendientes.length}
              </span>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
            {pendientes.map((cont) => (
              <div key={cont.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 ${tipoColors[cont.tipo]}`}>
                      {tipoIcons[cont.tipo]}
                      {cont.tipo}
                    </span>
                    <span className="text-xs text-slate-400">{cont.tienda}</span>
                  </div>
                  <span className="text-lg">{avatarEmojis[cont.avatar]}</span>
                </div>
                <p className="text-sm font-medium text-slate-800 mb-1">{cont.titulo}</p>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{cont.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {cont.fechaProgramada ? new Date(cont.fechaProgramada).toLocaleDateString('es-AR') : 'Sin programar'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors">
                      <ThumbsDown size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                      <Edit3 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Todo el Contenido */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Todo el Contenido</h2>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                {contenidoFiltrado.length} items
              </span>
            </div>
            <div className="flex gap-2">
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Estado</option>
                <option value="borrador">Borrador</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="publicado">Publicado</option>
              </select>
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Tipo</option>
                <option value="post">Post</option>
                <option value="reel">Reel</option>
                <option value="story">Story</option>
                <option value="email">Email</option>
                <option value="ad">Ad</option>
              </select>
              <select value={filtroTienda} onChange={(e) => setFiltroTienda(e.target.value)} className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="">Tienda</option>
                <option value="Pet Vogue">Pet Vogue</option>
                <option value="CoreSmart">CoreSmart</option>
                <option value="Sensuality">Sensuality</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="p-4">Contenido</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Tienda</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Métricas</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {contenidoFiltrado.map((cont) => (
                  <tr key={cont.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{avatarEmojis[cont.avatar]}</span>
                        <div>
                          <p className="font-medium text-slate-800 max-w-[200px] truncate">{cont.titulo}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Bot size={10} className="text-purple-500" />{cont.avatar}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 w-fit ${tipoColors[cont.tipo]}`}>
                        {tipoIcons[cont.tipo]}
                        {cont.tipo}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{cont.tienda}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${estadoColors[cont.estado]}`}>
                        {cont.estado}
                      </span>
                    </td>
                    <td className="p-4">
                      {cont.metricas ? (
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Eye size={12} />{cont.metricas.vistas}</span>
                          <span className="flex items-center gap-1"><Heart size={12} />{cont.metricas.likes}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                          <Copy size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenteMarketingPage;
