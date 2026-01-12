import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Percent,
  Clock,
  Zap,
  Filter,
  Download
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Datos de tendencias mensuales
const TENDENCIAS_MENSUALES = [
  { mes: 'Jul', mayorista: 520000, ecommerce: 180000, servicios: 45000 },
  { mes: 'Ago', mayorista: 580000, ecommerce: 195000, servicios: 52000 },
  { mes: 'Sep', mayorista: 545000, ecommerce: 210000, servicios: 58000 },
  { mes: 'Oct', mayorista: 620000, ecommerce: 225000, servicios: 65000 },
  { mes: 'Nov', mayorista: 680000, ecommerce: 240000, servicios: 72000 },
  { mes: 'Dic', mayorista: 640000, ecommerce: 251000, servicios: 85000 },
];

// Datos de métricas por vertical
const METRICAS_RADAR = [
  { metrica: 'Ingresos', mayorista: 90, ecommerce: 75, servicios: 40 },
  { metrica: 'Margen', mayorista: 55, ecommerce: 85, servicios: 95 },
  { metrica: 'Crecimiento', mayorista: 60, ecommerce: 90, servicios: 100 },
  { metrica: 'Recurrencia', mayorista: 85, ecommerce: 40, servicios: 75 },
  { metrica: 'Escalabilidad', mayorista: 70, ecommerce: 95, servicios: 60 },
];

// Distribución de clientes
const CLIENTES_DISTRIBUCION = [
  { name: 'Cat. A', value: 12, color: '#10b981' },
  { name: 'Cat. B', value: 14, color: '#3b82f6' },
  { name: 'Cat. C', value: 8, color: '#f59e0b' },
];

// Productos más vendidos
const TOP_PRODUCTOS = [
  { nombre: 'Smart Home Devices', ventas: 245, ingresos: 892000, crecimiento: 45 },
  { nombre: 'Accesorios Mascotas', ventas: 312, ingresos: 456000, crecimiento: 28 },
  { nombre: 'Electrónica Consumo', ventas: 189, ingresos: 378000, crecimiento: 15 },
  { nombre: 'Muñecas Colección', ventas: 156, ingresos: 312000, crecimiento: 32 },
  { nombre: 'Repuestos Tech', ventas: 98, ingresos: 196000, crecimiento: -5 },
];

// KPIs de eficiencia operativa
const KPIS_OPERATIVOS = [
  { nombre: 'Ciclo promedio importación', valor: '32', unidad: 'días', objetivo: 28, trend: 'down' },
  { nombre: 'Costo logístico / venta', valor: '8.5', unidad: '%', objetivo: 7, trend: 'down' },
  { nombre: 'Fill rate pedidos', valor: '94.2', unidad: '%', objetivo: 95, trend: 'up' },
  { nombre: 'Rotación inventario', valor: '6.8', unidad: 'veces/año', objetivo: 8, trend: 'up' },
];

const AnalyticsPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('6m');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics Consolidado</h1>
          <p className="text-sm text-slate-500 mt-1">Métricas cruzadas de todos los verticales</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-600 transition-colors">
            <Filter size={16} />Filtrar
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />Exportar
          </button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={12} />+18.5%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Ingresos Totales</p>
          <p className="text-2xl font-bold text-slate-800">$976K</p>
          <p className="text-xs text-slate-400 mt-1">vs $824K mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Percent size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={12} />+2.3%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Margen Bruto Prom.</p>
          <p className="text-2xl font-bold text-slate-800">28.4%</p>
          <p className="text-xs text-slate-400 mt-1">Objetivo: 30%</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Users size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={12} />+6
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Clientes Activos</p>
          <p className="text-2xl font-bold text-slate-800">42</p>
          <p className="text-xs text-slate-400 mt-1">34 mayoristas + 8 servicios</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Package size={20} />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowDownRight size={12} />-3
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Operaciones Activas</p>
          <p className="text-2xl font-bold text-slate-800">9</p>
          <p className="text-xs text-slate-400 mt-1">3 en aduana, 4 en tránsito</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
              <ShoppingCart size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={12} />+24%
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1">Ventas Ecommerce</p>
          <p className="text-2xl font-bold text-slate-800">312</p>
          <p className="text-xs text-slate-400 mt-1">3 tiendas activas</p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tendencias por vertical */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Tendencias por Vertical</h2>
              <p className="text-sm text-slate-500">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-500">Mayorista</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-500">Ecommerce</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-slate-500">Servicios</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TENDENCIAS_MENSUALES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="mayorista" stroke="#3b82f6" strokeWidth={2} fill="url(#colorMay)" name="Mayorista" />
                <Area type="monotone" dataKey="ecommerce" stroke="#10b981" strokeWidth={2} fill="url(#colorEco)" name="Ecommerce" />
                <Area type="monotone" dataKey="servicios" stroke="#8b5cf6" strokeWidth={2} fill="none" strokeDasharray="5 5" name="Servicios" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar de métricas */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Comparativa Verticales</h2>
          <p className="text-sm text-slate-500 mb-4">Score por métrica clave</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={METRICAS_RADAR}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metrica" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Mayorista" dataKey="mayorista" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Ecommerce" dataKey="ecommerce" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Servicios" dataKey="servicios" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs mt-2">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Mayorista</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Ecommerce</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>Servicios</div>
          </div>
        </div>
      </div>

      {/* Segunda fila: Top productos + KPIs operativos + Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top productos */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800">Top Productos por Ingresos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Producto</th>
                  <th className="p-4 text-center">Ventas</th>
                  <th className="p-4 text-right">Ingresos</th>
                  <th className="p-4 text-right">Crecimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {TOP_PRODUCTOS.map((prod, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-4 font-medium text-slate-800">{prod.nombre}</td>
                    <td className="p-4 text-center text-slate-600">{prod.ventas}</td>
                    <td className="p-4 text-right font-semibold text-slate-800">${(prod.ingresos/1000).toFixed(0)}K</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                        prod.crecimiento >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {prod.crecimiento >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {prod.crecimiento >= 0 ? '+' : ''}{prod.crecimiento}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribución clientes + KPIs operativos */}
        <div className="space-y-6">
          {/* Distribución clientes */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Clientes por Categoría</h2>
            <div className="h-[120px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CLIENTES_DISTRIBUCION}
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {CLIENTES_DISTRIBUCION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-slate-800">34</p>
                <p className="text-[10px] text-slate-500">Total</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-xs mt-2">
              {CLIENTES_DISTRIBUCION.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-slate-600">{cat.name}: {cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs operativos */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h2 className="font-semibold text-slate-800 mb-3">Eficiencia Operativa</h2>
            <div className="space-y-3">
              {KPIS_OPERATIVOS.map((kpi, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      kpi.trend === 'up' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    <span className="text-xs text-slate-600">{kpi.nombre}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-800">{kpi.valor}</span>
                    <span className="text-xs text-slate-400 ml-1">{kpi.unidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
