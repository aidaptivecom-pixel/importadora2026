import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Calendar,
  Sparkles,
  Play,
  Image,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Megaphone,
  Zap,
  Bot,
  Clock
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
import { PageType } from '../../App';

interface MarketingDashboardPageProps {
  onNavigate: (page: PageType) => void;
}

// Datos de ejemplo
const ENGAGEMENT_DATA = [
  { mes: 'Ago', petVogue: 12400, coreSmart: 8900, sensuality: 5600 },
  { mes: 'Sep', petVogue: 14200, coreSmart: 9800, sensuality: 6200 },
  { mes: 'Oct', petVogue: 15800, coreSmart: 11200, sensuality: 7100 },
  { mes: 'Nov', petVogue: 18200, coreSmart: 12800, sensuality: 8400 },
  { mes: 'Dic', petVogue: 22400, coreSmart: 15200, sensuality: 10200 },
  { mes: 'Ene', petVogue: 25800, coreSmart: 17400, sensuality: 12800 }
];

const CONTENIDO_POR_TIPO = [
  { name: 'Reels', value: 42, color: '#8b5cf6' },
  { name: 'Posts', value: 28, color: '#3b82f6' },
  { name: 'Stories', value: 18, color: '#10b981' },
  { name: 'Email', value: 12, color: '#f59e0b' }
];

const PERFORMANCE_TIENDAS = [
  { tienda: 'Pet Vogue', emoji: '🐕', engagement: 25800, followers: 48500, growth: 12.4, posts: 24, conversionRate: 3.2 },
  { tienda: 'CoreSmart', emoji: '🏠', engagement: 17400, followers: 32100, growth: 8.7, posts: 18, conversionRate: 2.8 },
  { tienda: 'Sensuality', emoji: '💜', engagement: 12800, followers: 21400, growth: 15.2, posts: 12, conversionRate: 4.1 }
];

const CONTENIDO_RECIENTE = [
  { id: 1, tienda: 'Pet Vogue', tipo: 'reel', titulo: 'Tutorial: Cómo usar el comedero WiFi', estado: 'publicado', reach: 45200, engagement: 3420, fecha: '2026-01-13', avatar: 'Emma' },
  { id: 2, tienda: 'CoreSmart', tipo: 'post', titulo: 'Smart Home 2026: Tendencias', estado: 'publicado', reach: 28400, engagement: 2180, fecha: '2026-01-13', avatar: 'Tech' },
  { id: 3, tienda: 'Sensuality', tipo: 'story', titulo: 'Tips bienestar pareja', estado: 'publicado', reach: 18200, engagement: 1560, fecha: '2026-01-13', avatar: 'Sofia' },
  { id: 4, tienda: 'Pet Vogue', tipo: 'email', titulo: 'Newsletter: Novedades enero', estado: 'programado', reach: 0, engagement: 0, fecha: '2026-01-16', avatar: 'Emma' },
  { id: 5, tienda: 'CoreSmart', tipo: 'reel', titulo: 'Instalación cerradura smart', estado: 'borrador', reach: 0, engagement: 0, fecha: '-', avatar: 'Tech' }
];

const AVATARES_ACTIVOS = [
  { nombre: 'Emma', tienda: 'Pet Vogue', estado: 'online', contenidoHoy: 3, totalMes: 24 },
  { nombre: 'Tech', tienda: 'CoreSmart', estado: 'online', contenidoHoy: 2, totalMes: 18 },
  { nombre: 'Sofia', tienda: 'Sensuality', estado: 'online', contenidoHoy: 1, totalMes: 12 }
];

const MarketingDashboardPage: React.FC<MarketingDashboardPageProps> = ({ onNavigate }) => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<'7d' | '30d' | '90d'>('30d');

  const totalEngagement = PERFORMANCE_TIENDAS.reduce((acc, t) => acc + t.engagement, 0);
  const totalFollowers = PERFORMANCE_TIENDAS.reduce((acc, t) => acc + t.followers, 0);
  const avgConversion = (PERFORMANCE_TIENDAS.reduce((acc, t) => acc + t.conversionRate, 0) / PERFORMANCE_TIENDAS.length).toFixed(1);

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'reel': return <Play size={14} className="text-purple-500" />;
      case 'post': return <Image size={14} className="text-blue-500" />;
      case 'story': return <Zap size={14} className="text-green-500" />;
      case 'email': return <Mail size={14} className="text-amber-500" />;
      default: return <FileText size={14} className="text-slate-400" />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    const estilos: Record<string, string> = {
      publicado: 'bg-green-50 text-green-600',
      programado: 'bg-blue-50 text-blue-600',
      borrador: 'bg-slate-100 text-slate-600',
      aprobacion: 'bg-amber-50 text-amber-600'
    };
    return estilos[estado] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Marketing Central</h1>
          <p className="text-sm text-slate-500 mt-1">Métricas y rendimiento de contenido en todas las marcas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((periodo) => (
              <button
                key={periodo}
                onClick={() => setPeriodoSeleccionado(periodo)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  periodoSeleccionado === periodo
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {periodo === '7d' ? '7 días' : periodo === '30d' ? '30 días' : '90 días'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Sparkles size={16} />
            Generar Contenido
          </button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Target size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Engagement Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{(totalEngagement / 1000).toFixed(1)}K</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight size={12} />
            <span>+12.4% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Seguidores</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{(totalFollowers / 1000).toFixed(1)}K</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight size={12} />
            <span>+3,240 este mes</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Eye size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Alcance</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">284K</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight size={12} />
            <span>+18.2% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Conversión</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{avgConversion}%</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight size={12} />
            <span>+0.4% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Megaphone size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Contenidos</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">54</p>
          <p className="text-xs text-slate-500 mt-1">este mes</p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-3 gap-6">
        {/* Engagement por Tienda */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-800">Engagement por Marca</h2>
              <p className="text-sm text-slate-500">Evolución mensual de interacciones</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-slate-500">Pet Vogue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-500">CoreSmart</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="text-slate-500">Sensuality</span>
              </div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPetVogue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCoreSmart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSensuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Area type="monotone" dataKey="petVogue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPetVogue)" name="Pet Vogue" />
                <Area type="monotone" dataKey="coreSmart" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCoreSmart)" name="CoreSmart" />
                <Area type="monotone" dataKey="sensuality" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorSensuality)" name="Sensuality" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por tipo */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Por Tipo de Contenido</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CONTENIDO_POR_TIPO}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {CONTENIDO_POR_TIPO.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-800">54</span>
              <span className="text-xs text-slate-500">contenidos</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {CONTENIDO_POR_TIPO.map((tipo) => (
              <div key={tipo.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tipo.color }}></span>
                  <span className="text-slate-600">{tipo.name}</span>
                </div>
                <span className="font-medium text-slate-800">{tipo.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance por Tienda + Avatares */}
      <div className="grid grid-cols-3 gap-6">
        {/* Performance por Tienda */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Rendimiento por Marca</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver detalle →</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="p-4">Marca</th>
                <th className="p-4 text-center">Engagement</th>
                <th className="p-4 text-center">Seguidores</th>
                <th className="p-4 text-center">Posts</th>
                <th className="p-4 text-center">Conversión</th>
                <th className="p-4 text-center">Crecimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PERFORMANCE_TIENDAS.map((tienda) => (
                <tr key={tienda.tienda} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tienda.emoji}</span>
                      <span className="font-medium text-slate-800">{tienda.tienda}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-800">
                    {(tienda.engagement / 1000).toFixed(1)}K
                  </td>
                  <td className="p-4 text-center text-slate-600">
                    {(tienda.followers / 1000).toFixed(1)}K
                  </td>
                  <td className="p-4 text-center text-slate-600">{tienda.posts}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                      {tienda.conversionRate}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      <ArrowUpRight size={14} />
                      <span className="font-medium">{tienda.growth}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Avatares Activos */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-purple-50">
            <div className="flex items-center gap-2">
              <Bot className="text-purple-600" size={20} />
              <h2 className="font-semibold text-purple-700">Avatares Digitales</h2>
            </div>
            <button onClick={() => onNavigate('avatar')} className="text-sm text-purple-600 hover:text-purple-700 font-medium">Gestionar →</button>
          </div>
          <div className="divide-y divide-slate-50">
            {AVATARES_ACTIVOS.map((avatar) => (
              <div key={avatar.nombre} className="p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {avatar.nombre[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{avatar.nombre}</p>
                      <p className="text-xs text-slate-500">{avatar.tienda}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {avatar.estado}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Hoy: {avatar.contenidoHoy} contenidos</span>
                  <span>Este mes: {avatar.totalMes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido Reciente */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-slate-400" size={20} />
            <h2 className="font-semibold text-slate-800">Contenido Reciente</h2>
          </div>
          <button onClick={() => onNavigate('contenido')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver calendario →</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Contenido</th>
              <th className="p-4">Marca</th>
              <th className="p-4">Avatar</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Alcance</th>
              <th className="p-4 text-right">Engagement</th>
              <th className="p-4">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {CONTENIDO_RECIENTE.map((contenido) => (
              <tr key={contenido.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {getTipoIcon(contenido.tipo)}
                    <div>
                      <p className="font-medium text-slate-800">{contenido.titulo}</p>
                      <p className="text-xs text-slate-400 capitalize">{contenido.tipo}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{contenido.tienda}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                    {contenido.avatar}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getEstadoBadge(contenido.estado)}`}>
                    {contenido.estado}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-slate-800">
                  {contenido.reach > 0 ? `${(contenido.reach / 1000).toFixed(1)}K` : '-'}
                </td>
                <td className="p-4 text-right font-medium text-slate-800">
                  {contenido.engagement > 0 ? contenido.engagement.toLocaleString() : '-'}
                </td>
                <td className="p-4 text-slate-500">{contenido.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketingDashboardPage;
