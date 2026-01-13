import React, { useState } from 'react';
import {
  Store,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Bot,
  Clock,
  Target,
  Zap,
  ChevronRight,
  BarChart2,
  PieChart as PieChartIcon,
  Calendar,
  RefreshCw,
  Eye,
  MessageSquare,
  Star,
  Award,
  Flame
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
  Cell,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { TIENDAS_MINORISTAS, TIENDAS_METRICAS_DIARIAS, TIENDAS_ALERTAS, TIENDAS_PROYECCIONES, getTiendasResumen } from '../constants/tiendas';
import { PageType } from '../App';

interface EcommerceHubPageProps {
  onNavigate: (page: PageType, operacionId?: string) => void;
}

// Datos para gráficos comparativos
const VENTAS_COMPARATIVA = [
  { mes: 'Ago', petVogue: 1850000, coresmart: 2100000, sensuality: 1450000 },
  { mes: 'Sep', petVogue: 2100000, coresmart: 2300000, sensuality: 1680000 },
  { mes: 'Oct', petVogue: 2450000, coresmart: 2650000, sensuality: 1920000 },
  { mes: 'Nov', petVogue: 2780000, coresmart: 3100000, sensuality: 2150000 },
  { mes: 'Dic', petVogue: 3200000, coresmart: 3450000, sensuality: 2480000 },
  { mes: 'Ene', petVogue: 2850000, coresmart: 3200000, sensuality: 2250000 },
];

const CONVERSION_DATA = [
  { tienda: 'Pet Vogue', visitas: 45000, conversiones: 1125, tasa: 2.5 },
  { tienda: 'CoreSmart', visitas: 52000, conversiones: 1144, tasa: 2.2 },
  { tienda: 'Sensuality', visitas: 28000, conversiones: 728, tasa: 2.6 },
];

const CANAL_VENTAS = [
  { name: 'Web Propia', value: 45, fill: '#3b82f6' },
  { name: 'MercadoLibre', value: 35, fill: '#22c55e' },
  { name: 'Instagram', value: 12, fill: '#ec4899' },
  { name: 'WhatsApp', value: 8, fill: '#10b981' },
];

const PERFORMANCE_RADAR = [
  { metric: 'Ventas', petVogue: 85, coresmart: 92, sensuality: 78 },
  { metric: 'Conversión', petVogue: 78, coresmart: 72, sensuality: 82 },
  { metric: 'Ticket', petVogue: 65, coresmart: 88, sensuality: 72 },
  { metric: 'Retención', petVogue: 82, coresmart: 75, sensuality: 68 },
  { metric: 'NPS', petVogue: 88, coresmart: 82, sensuality: 75 },
  { metric: 'Stock', petVogue: 70, coresmart: 85, sensuality: 90 },
];

const PROYECCION_MENSUAL = [
  { mes: 'Ene', real: 8300000, proyectado: 8000000 },
  { mes: 'Feb', real: null, proyectado: 8500000 },
  { mes: 'Mar', real: null, proyectado: 9200000 },
  { mes: 'Abr', real: null, proyectado: 9800000 },
  { mes: 'May', real: null, proyectado: 10500000 },
  { mes: 'Jun', real: null, proyectado: 11200000 },
];

const TOP_PRODUCTOS = [
  { nombre: 'Cuchas Premium XL', tienda: 'Pet Vogue', ventas: 234, ingreso: 4680000, trend: 12 },
  { nombre: 'Smart Doorbell Pro', tienda: 'CoreSmart', ventas: 189, ingreso: 5670000, trend: 8 },
  { nombre: 'Kit Wellness Deluxe', tienda: 'Sensuality', ventas: 156, ingreso: 3120000, trend: 15 },
  { nombre: 'Arnés Táctico K9', tienda: 'Pet Vogue', ventas: 312, ingreso: 2496000, trend: -3 },
  { nombre: 'Cámara 360° Indoor', tienda: 'CoreSmart', ventas: 145, ingreso: 3625000, trend: 22 },
];

const EcommerceHubPage: React.FC<EcommerceHubPageProps> = ({ onNavigate }) => {
  const [periodoComparativa, setPeriodoComparativa] = useState<'6m' | '3m' | '1m'>('6m');
  const resumen = getTiendasResumen();
  
  // Calcular totales
  const ventasTotales = TIENDAS_MINORISTAS.reduce((acc, t) => acc + t.metricas.ventasMes, 0);
  const ingresosTotales = TIENDAS_MINORISTAS.reduce((acc, t) => acc + t.metricas.ingresosMes, 0);
  const pedidosTotales = TIENDAS_MINORISTAS.reduce((acc, t) => acc + t.metricas.pedidosPendientes, 0);
  const ticketPromedio = Math.round(ingresosTotales / ventasTotales);
  
  // Alertas activas
  const alertasActivas = TIENDAS_ALERTAS.filter(a => a.estado === 'activa');
  const alertasCriticas = alertasActivas.filter(a => a.prioridad === 'alta').length;
  
  // Colores por tienda
  const tiendaColors: Record<string, string> = {
    'pet-vogue': '#f59e0b',
    'coresmart': '#3b82f6',
    'sensuality': '#8b5cf6'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ecommerce Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Vista consolidada de {TIENDAS_MINORISTAS.length} tiendas minoristas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100">
            <Clock size={14} />
            Actualizado hace 5 min
          </div>
          <button 
            onClick={() => onNavigate('tiendas-overview')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
          >
            <Store size={16} />
            Gestionar Tiendas
          </button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={10} />+18.5%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Ingresos Totales</p>
          <p className="text-2xl font-bold text-slate-800">${(ingresosTotales / 1000000).toFixed(2)}M</p>
          <p className="text-[10px] text-slate-400 mt-1">vs $7.0M mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ShoppingCart size={20} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={10} />+12.3%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Ventas Totales</p>
          <p className="text-2xl font-bold text-slate-800">{ventasTotales.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 mt-1">{pedidosTotales} pedidos pendientes</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Target size={20} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={10} />+5.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Ticket Promedio</p>
          <p className="text-2xl font-bold text-slate-800">${ticketPromedio.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 mt-1">Objetivo: $30,000</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
              <Users size={20} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={10} />+8.7%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Tasa Conversión</p>
          <p className="text-2xl font-bold text-slate-800">2.4%</p>
          <p className="text-[10px] text-slate-400 mt-1">125K visitas totales</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Bot size={20} />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Activos
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Agentes AI</p>
          <p className="text-2xl font-bold text-slate-800">9</p>
          <p className="text-[10px] text-slate-400 mt-1">3 por tienda</p>
        </div>
      </div>

      {/* Gráficos Principales */}
      <div className="grid grid-cols-3 gap-6">
        {/* Comparativa de Ventas */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-800">Comparativa de Ventas</h2>
              <p className="text-xs text-slate-500 mt-0.5">Evolución mensual por tienda</p>
            </div>
            <div className="flex items-center gap-2">
              {['6m', '3m', '1m'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodoComparativa(p as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    periodoComparativa === p 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VENTAS_COMPARATIVA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPetVogue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCoresmart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSensuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, '']}
                />
                <Area type="monotone" dataKey="petVogue" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPetVogue)" name="Pet Vogue" />
                <Area type="monotone" dataKey="coresmart" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCoresmart)" name="CoreSmart" />
                <Area type="monotone" dataKey="sensuality" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorSensuality)" name="Sensuality" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-xs text-slate-600">Pet Vogue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-slate-600">CoreSmart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-xs text-slate-600">Sensuality</span>
            </div>
          </div>
        </div>

        {/* Distribución por Canal */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Ventas por Canal</h2>
          <p className="text-xs text-slate-500 mb-4">Distribución consolidada</p>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CANAL_VENTAS}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {CANAL_VENTAS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">$8.3M</span>
              <span className="text-xs text-slate-400">Total Mes</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {CANAL_VENTAS.map((canal, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: canal.fill }}></span>
                  <span className="text-sm text-slate-600">{canal.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">{canal.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance y Proyecciones */}
      <div className="grid grid-cols-3 gap-6">
        {/* Radar de Performance */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-1">Performance Comparativo</h2>
          <p className="text-xs text-slate-500 mb-4">Métricas clave por tienda</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={PERFORMANCE_RADAR}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Pet Vogue" dataKey="petVogue" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="CoreSmart" dataKey="coresmart" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Sensuality" dataKey="sensuality" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proyección Anual */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-slate-800">Proyección Semestral</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real vs Proyectado - H1 2026</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-600">
                <TrendingUp size={12} />
                Meta: $58M anual
              </span>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROYECCION_MENSUAL} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000000).toFixed(0)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number | null) => value ? [`$${(value/1000000).toFixed(2)}M`, ''] : ['-', '']}
                />
                <Bar dataKey="proyectado" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Proyectado" />
                <Bar dataKey="real" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Real" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-200"></span>
              <span className="text-xs text-slate-500">Proyectado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              <span className="text-xs text-slate-500">Real</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Tiendas + Top Productos */}
      <div className="grid grid-cols-3 gap-6">
        {/* Cards de Tiendas */}
        <div className="col-span-2">
          <h2 className="font-semibold text-slate-800 mb-4">Rendimiento por Tienda</h2>
          <div className="grid grid-cols-3 gap-4">
            {TIENDAS_MINORISTAS.map((tienda) => {
              const alertasTienda = TIENDAS_ALERTAS.filter(a => a.tiendaId === tienda.id && a.estado === 'activa').length;
              return (
                <div 
                  key={tienda.id}
                  onClick={() => onNavigate(tienda.slug as PageType)}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${tienda.colorPrimario}15` }}
                    >
                      {tienda.icono}
                    </div>
                    <div className="flex items-center gap-2">
                      {alertasTienda > 0 && (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                          {alertasTienda} alertas
                        </span>
                      )}
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{tienda.nombre}</h3>
                  <p className="text-xs text-slate-500 mb-4">{tienda.descripcion}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Ingresos Mes</span>
                      <span className="text-sm font-bold text-slate-800">
                        ${(tienda.metricas.ingresosMes / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Ventas</span>
                      <span className="text-sm font-semibold text-slate-700">
                        {tienda.metricas.ventasMes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Crecimiento</span>
                      <span className={`text-sm font-semibold flex items-center gap-0.5 ${
                        tienda.metricas.crecimientoMes >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tienda.metricas.crecimientoMes >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {tienda.metricas.crecimientoMes}%
                      </span>
                    </div>
                  </div>

                  {/* Mini barra de progreso */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>Meta mensual</span>
                      <span>{Math.round((tienda.metricas.ingresosMes / 3500000) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${Math.min((tienda.metricas.ingresosMes / 3500000) * 100, 100)}%`,
                          backgroundColor: tienda.colorPrimario 
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Productos */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={18} />
              <h2 className="font-semibold text-slate-800">Top Productos</h2>
            </div>
            <span className="text-xs text-slate-400">Este mes</span>
          </div>
          <div className="divide-y divide-slate-50">
            {TOP_PRODUCTOS.map((prod, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      idx === 0 ? 'bg-amber-100 text-amber-700' : 
                      idx === 1 ? 'bg-slate-200 text-slate-600' : 
                      idx === 2 ? 'bg-orange-100 text-orange-700' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800">{prod.nombre}</span>
                  </div>
                  <span className={`text-[10px] font-medium flex items-center gap-0.5 ${
                    prod.trend >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {prod.trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {Math.abs(prod.trend)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{prod.tienda}</span>
                  <span className="text-slate-600 font-medium">{prod.ventas} uds · ${(prod.ingreso/1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas y Estado de Agentes */}
      <div className="grid grid-cols-2 gap-6">
        {/* Alertas Activas */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={18} />
              <h2 className="font-semibold text-red-700">Alertas Activas</h2>
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{alertasActivas.length}</span>
            </div>
            <button className="text-xs text-red-600 hover:text-red-700 font-medium">Ver todas →</button>
          </div>
          <div className="divide-y divide-slate-50">
            {alertasActivas.slice(0, 4).map((alerta) => {
              const tienda = TIENDAS_MINORISTAS.find(t => t.id === alerta.tiendaId);
              return (
                <div key={alerta.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      alerta.prioridad === 'alta' ? 'bg-red-500' : 
                      alerta.prioridad === 'media' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-slate-800">{alerta.mensaje}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{tienda?.nombre}</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-xs text-slate-400">{alerta.fecha}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      alerta.tipo === 'stock' ? 'bg-amber-50 text-amber-600' :
                      alerta.tipo === 'ventas' ? 'bg-blue-50 text-blue-600' :
                      alerta.tipo === 'operacion' ? 'bg-purple-50 text-purple-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {alerta.tipo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estado de Agentes AI */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-500" size={18} />
              <h2 className="font-semibold text-slate-800">Agentes AI</h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">9 activos</span>
            </div>
            <span className="text-xs text-slate-400">Rendimiento 24h</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {TIENDAS_MINORISTAS.map((tienda) => (
                <div key={tienda.id} className="text-center p-3 rounded-lg bg-slate-50">
                  <div className="text-xl mb-2">{tienda.icono}</div>
                  <p className="text-xs font-medium text-slate-700 mb-2">{tienda.nombre}</p>
                  <div className="space-y-1.5">
                    {tienda.agentes.map((agente, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{agente.nombre.split(' ')[1]}</span>
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            agente.estado === 'activo' ? 'bg-green-500' : 
                            agente.estado === 'entrenamiento' ? 'bg-amber-500' : 'bg-slate-300'
                          }`} />
                          <span className="text-slate-600 font-medium">{agente.precision}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Métricas de Agentes */}
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">847</p>
                <p className="text-[10px] text-slate-500">Conversaciones</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">94%</p>
                <p className="text-[10px] text-slate-500">Resueltas</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">2.3m</p>
                <p className="text-[10px] text-slate-500">Tiempo Resp.</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">4.7</p>
                <p className="text-[10px] text-slate-500">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con resumen */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Ecosistema Ecommerce Unificado</h3>
            <p className="text-sm text-white/80">
              {TIENDAS_MINORISTAS.length} tiendas · 9 agentes AI · {ventasTotales} ventas mensuales · ${(ingresosTotales/1000000).toFixed(1)}M facturados
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">+{Math.round((18.5 + 12.3 + 8.7) / 3)}%</p>
              <p className="text-xs text-white/70">Crecimiento Promedio</p>
            </div>
            <button 
              onClick={() => onNavigate('analytics')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <BarChart2 size={16} />
              Ver Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHubPage;
