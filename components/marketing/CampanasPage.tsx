import React, { useState } from 'react';
import {
  Megaphone,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointer,
  ShoppingCart,
  Play,
  Pause,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  PieChart as PieChartIcon,
  Settings,
  Copy,
  Trash2,
  ExternalLink
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

interface CampanasPageProps {
  onNavigate: (page: PageType) => void;
}

interface Campana {
  id: string;
  nombre: string;
  tienda: string;
  tiendaEmoji: string;
  tipo: 'awareness' | 'conversion' | 'retargeting' | 'engagement';
  plataforma: string;
  estado: 'activa' | 'pausada' | 'finalizada' | 'borrador';
  presupuesto: number;
  gastado: number;
  fechaInicio: string;
  fechaFin: string;
  metricas: {
    impresiones: number;
    alcance: number;
    clicks: number;
    ctr: number;
    conversiones: number;
    cpc: number;
    roas: number;
  };
}

const CAMPANAS: Campana[] = [
  {
    id: 'camp-001',
    nombre: 'Verano Pet Lovers 2026',
    tienda: 'Pet Vogue',
    tiendaEmoji: '🐕',
    tipo: 'conversion',
    plataforma: 'Meta Ads',
    estado: 'activa',
    presupuesto: 50000,
    gastado: 32500,
    fechaInicio: '2026-01-01',
    fechaFin: '2026-01-31',
    metricas: { impresiones: 245000, alcance: 128000, clicks: 4200, ctr: 1.71, conversiones: 156, cpc: 7.74, roas: 4.2 }
  },
  {
    id: 'camp-002',
    nombre: 'Smart Home Seguridad',
    tienda: 'CoreSmart',
    tiendaEmoji: '🏠',
    tipo: 'awareness',
    plataforma: 'Google Ads',
    estado: 'activa',
    presupuesto: 80000,
    gastado: 45000,
    fechaInicio: '2026-01-05',
    fechaFin: '2026-02-05',
    metricas: { impresiones: 380000, alcance: 195000, clicks: 6800, ctr: 1.79, conversiones: 89, cpc: 6.62, roas: 3.1 }
  },
  {
    id: 'camp-003',
    nombre: 'San Valentín Sensual',
    tienda: 'Sensuality',
    tiendaEmoji: '💜',
    tipo: 'conversion',
    plataforma: 'Meta Ads',
    estado: 'activa',
    presupuesto: 35000,
    gastado: 8500,
    fechaInicio: '2026-01-10',
    fechaFin: '2026-02-14',
    metricas: { impresiones: 85000, alcance: 42000, clicks: 1800, ctr: 2.12, conversiones: 45, cpc: 4.72, roas: 5.8 }
  },
  {
    id: 'camp-004',
    nombre: 'Retargeting Carritos',
    tienda: 'Pet Vogue',
    tiendaEmoji: '🐕',
    tipo: 'retargeting',
    plataforma: 'Meta Ads',
    estado: 'pausada',
    presupuesto: 20000,
    gastado: 18500,
    fechaInicio: '2025-12-01',
    fechaFin: '2026-01-15',
    metricas: { impresiones: 120000, alcance: 35000, clicks: 2800, ctr: 2.33, conversiones: 78, cpc: 6.61, roas: 6.2 }
  },
  {
    id: 'camp-005',
    nombre: 'Lanzamiento Cámaras 4K',
    tienda: 'CoreSmart',
    tiendaEmoji: '🏠',
    tipo: 'awareness',
    plataforma: 'YouTube Ads',
    estado: 'finalizada',
    presupuesto: 60000,
    gastado: 58000,
    fechaInicio: '2025-11-15',
    fechaFin: '2025-12-31',
    metricas: { impresiones: 520000, alcance: 280000, clicks: 8500, ctr: 1.63, conversiones: 124, cpc: 6.82, roas: 3.8 }
  }
];

const PERFORMANCE_DIARIA = [
  { dia: '07', gasto: 2800, conversiones: 12 },
  { dia: '08', gasto: 3200, conversiones: 15 },
  { dia: '09', gasto: 2900, conversiones: 11 },
  { dia: '10', gasto: 4100, conversiones: 22 },
  { dia: '11', gasto: 3800, conversiones: 18 },
  { dia: '12', gasto: 4500, conversiones: 25 },
  { dia: '13', gasto: 3100, conversiones: 14 },
];

const DISTRIBUCION_GASTO = [
  { name: 'Pet Vogue', value: 51000, color: '#3b82f6' },
  { name: 'CoreSmart', value: 103000, color: '#10b981' },
  { name: 'Sensuality', value: 8500, color: '#8b5cf6' }
];

const CampanasPage: React.FC<CampanasPageProps> = ({ onNavigate }) => {
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroTienda, setFiltroTienda] = useState<string>('');

  const campanasActivas = CAMPANAS.filter(c => c.estado === 'activa');
  const presupuestoTotal = CAMPANAS.reduce((acc, c) => acc + c.presupuesto, 0);
  const gastoTotal = CAMPANAS.reduce((acc, c) => acc + c.gastado, 0);
  const conversionesTotal = CAMPANAS.reduce((acc, c) => acc + c.metricas.conversiones, 0);
  const roasPromedio = (CAMPANAS.filter(c => c.estado === 'activa').reduce((acc, c) => acc + c.metricas.roas, 0) / campanasActivas.length).toFixed(1);

  const campanasFiltradas = CAMPANAS.filter(c => {
    if (filtroEstado && c.estado !== filtroEstado) return false;
    if (filtroTienda && c.tienda !== filtroTienda) return false;
    return true;
  });

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'activa': return { color: 'bg-green-50 text-green-600', icon: <Play size={10} fill="currentColor" /> };
      case 'pausada': return { color: 'bg-amber-50 text-amber-600', icon: <Pause size={10} /> };
      case 'finalizada': return { color: 'bg-slate-100 text-slate-500', icon: null };
      default: return { color: 'bg-slate-100 text-slate-500', icon: null };
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch(tipo) {
      case 'conversion': return 'bg-purple-50 text-purple-600';
      case 'awareness': return 'bg-blue-50 text-blue-600';
      case 'retargeting': return 'bg-amber-50 text-amber-600';
      case 'engagement': return 'bg-green-50 text-green-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Campañas de Marketing</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona campañas publicitarias de todas las marcas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Nueva Campaña
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Megaphone size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Campañas Activas</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{campanasActivas.length}</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Gasto Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">${(gastoTotal / 1000).toFixed(0)}K</p>
          <p className="text-xs text-slate-500">de ${(presupuestoTotal / 1000).toFixed(0)}K</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <ShoppingCart size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Conversiones</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{conversionesTotal}</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">ROAS Promedio</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{roasPromedio}x</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
              <Eye size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Impresiones</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{(CAMPANAS.reduce((acc, c) => acc + c.metricas.impresiones, 0) / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-3 gap-6">
        {/* Performance Diaria */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-800">Performance Últimos 7 Días</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="text-slate-500">Gasto ($)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-slate-500">Conversiones</span>
              </div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DIARIA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="gasto" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Gasto" />
                <Bar yAxisId="right" dataKey="conversiones" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversiones" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Marca */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Gasto por Marca</h2>
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DISTRIBUCION_GASTO}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {DISTRIBUCION_GASTO.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-slate-800">${(gastoTotal / 1000).toFixed(0)}K</span>
              <span className="text-xs text-slate-500">total</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {DISTRIBUCION_GASTO.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800">${(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filtros:</span>
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          >
            <option value="">Todos los estados</option>
            <option value="activa">Activas</option>
            <option value="pausada">Pausadas</option>
            <option value="finalizada">Finalizadas</option>
          </select>
          <select
            value={filtroTienda}
            onChange={(e) => setFiltroTienda(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          >
            <option value="">Todas las marcas</option>
            <option value="Pet Vogue">🐕 Pet Vogue</option>
            <option value="CoreSmart">🏠 CoreSmart</option>
            <option value="Sensuality">💜 Sensuality</option>
          </select>
          <span className="ml-auto text-sm text-slate-500">{campanasFiltradas.length} campañas</span>
        </div>
      </div>

      {/* Lista de Campañas */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Campaña</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Plataforma</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Presupuesto</th>
              <th className="p-4 text-right">CTR</th>
              <th className="p-4 text-right">ROAS</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {campanasFiltradas.map((campana) => {
              const estadoBadge = getEstadoBadge(campana.estado);
              const progreso = (campana.gastado / campana.presupuesto) * 100;
              return (
                <tr key={campana.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{campana.tiendaEmoji}</span>
                      <div>
                        <p className="font-medium text-slate-800">{campana.nombre}</p>
                        <p className="text-xs text-slate-500">{campana.tienda}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getTipoBadge(campana.tipo)}`}>
                      {campana.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{campana.plataforma}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold w-fit capitalize ${estadoBadge.color}`}>
                      {estadoBadge.icon}
                      {campana.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <p className="font-medium text-slate-800">${(campana.gastado / 1000).toFixed(1)}K</p>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 ml-auto">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${Math.min(progreso, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium text-slate-800">{campana.metricas.ctr}%</td>
                  <td className="p-4 text-right">
                    <span className={`font-bold ${campana.metricas.roas >= 4 ? 'text-green-600' : campana.metricas.roas >= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                      {campana.metricas.roas}x
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {campana.estado === 'activa' && (
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-amber-600">
                          <Pause size={14} />
                        </button>
                      )}
                      {campana.estado === 'pausada' && (
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-green-600">
                          <Play size={14} />
                        </button>
                      )}
                      <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400">
                        <MoreHorizontal size={14} />
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
  );
};

export default CampanasPage;
