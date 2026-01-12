import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Users,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Rocket,
  Building2,
  Globe,
  ShoppingCart,
  Package,
  Zap,
  Shield,
  BarChart3,
  PieChart as PieChartIcon
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
  Bar
} from 'recharts';

// Datos de proyección financiera mensual
const PROYECCION_MENSUAL = [
  { mes: 'Ene', ingresos: 45000, gastos: 38000, margen: 7000 },
  { mes: 'Feb', ingresos: 52000, gastos: 42000, margen: 10000 },
  { mes: 'Mar', ingresos: 68000, gastos: 52000, margen: 16000 },
  { mes: 'Abr', ingresos: 85000, gastos: 62000, margen: 23000 },
  { mes: 'May', ingresos: 105000, gastos: 75000, margen: 30000 },
  { mes: 'Jun', ingresos: 125000, gastos: 85000, margen: 40000 },
  { mes: 'Jul', ingresos: 148000, gastos: 98000, margen: 50000 },
  { mes: 'Ago', ingresos: 172000, gastos: 112000, margen: 60000 },
  { mes: 'Sep', ingresos: 198000, gastos: 128000, margen: 70000 },
  { mes: 'Oct', ingresos: 225000, gastos: 145000, margen: 80000 },
  { mes: 'Nov', ingresos: 255000, gastos: 162000, margen: 93000 },
  { mes: 'Dic', ingresos: 285000, gastos: 180000, margen: 105000 },
];

// Distribución de inversión
const USO_FONDOS = [
  { name: 'Capital de Trabajo', value: 45000, color: '#3b82f6', descripcion: 'Compra de mercadería inicial' },
  { name: 'Tecnología', value: 15000, color: '#8b5cf6', descripcion: 'Plataforma Aidaptive + integraciones' },
  { name: 'Marketing', value: 12000, color: '#06b6d4', descripcion: 'Lanzamiento tiendas ecommerce' },
  { name: 'Operaciones', value: 8000, color: '#10b981', descripcion: 'Logística y estructura' },
  { name: 'Reserva', value: 5000, color: '#f59e0b', descripcion: 'Contingencias' },
];

// Métricas por vertical
const METRICAS_VERTICALES = [
  { vertical: 'Mayorista', ingresos: 640000, margen: 22, clientes: 34, crecimiento: 18.5 },
  { vertical: 'Ecommerce', ingresos: 250000, margen: 35, clientes: 1250, crecimiento: 45.2 },
  { vertical: 'Servicios', ingresos: 85000, margen: 65, clientes: 8, crecimiento: 120 },
];

// Hitos del roadmap
const ROADMAP = [
  { q: 'Q1 2026', hitos: ['Setup operacional', 'Primeros 3 embarques', 'Launch Pet Vogue'], status: 'completado' },
  { q: 'Q2 2026', hitos: ['Break-even mensual', 'Launch Royal Dolls', '10 clientes mayoristas'], status: 'en_progreso' },
  { q: 'Q3 2026', hitos: ['Launch CoreSmart', 'Servicios a terceros', 'Margen 25%+'], status: 'pendiente' },
  { q: 'Q4 2026', hitos: ['Expansión regional', 'ROI 100%+ anual', 'Serie A prep'], status: 'pendiente' },
];

const InversoresPage: React.FC = () => {
  const totalInversion = 85000;
  const roiProyectado = 156;
  const paybackMeses = 8;
  const margenPromedio = 28;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard de Inversores</h1>
          <p className="text-sm text-slate-500 mt-1">Nexo Global Trade SA - Ronda de Inversión USD $85K</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-semibold">📈 Ronda Abierta</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold">Mín. USD $10K</span>
        </div>
      </div>

      {/* KPIs principales para inversores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-blue-100">Inversión Solicitada</span>
          </div>
          <p className="text-3xl font-bold">USD {totalInversion.toLocaleString()}</p>
          <p className="text-xs text-blue-200 mt-1">Múltiples inversores aceptados</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-100">ROI Proyectado Año 1</span>
          </div>
          <p className="text-3xl font-bold">{roiProyectado}%</p>
          <p className="text-xs text-emerald-200 mt-1">Escenario conservador</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-purple-100">Payback Estimado</span>
          </div>
          <p className="text-3xl font-bold">{paybackMeses} meses</p>
          <p className="text-xs text-purple-200 mt-1">Desde desembolso</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Percent size={20} />
            </div>
            <span className="text-sm font-medium text-amber-100">Margen Bruto Prom.</span>
          </div>
          <p className="text-3xl font-bold">{margenPromedio}%</p>
          <p className="text-xs text-amber-200 mt-1">Promedio 3 verticales</p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proyección de ingresos */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Proyección Financiera 2026</h2>
              <p className="text-sm text-slate-500">Ingresos vs Gastos vs Margen</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-500">Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                <span className="text-slate-500">Gastos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-500">Margen</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROYECCION_MENSUAL} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMargen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
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
                <Area type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={2} fill="url(#colorIngresos)" name="Ingresos" />
                <Area type="monotone" dataKey="gastos" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Gastos" />
                <Area type="monotone" dataKey="margen" stroke="#10b981" strokeWidth={3} fill="url(#colorMargen)" name="Margen" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="text-center">
              <p className="text-xs text-slate-500">Ingresos Año 1</p>
              <p className="text-xl font-bold text-slate-800">$1.78M</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Margen Acumulado</p>
              <p className="text-xl font-bold text-emerald-600">$584K</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Crecimiento MoM</p>
              <p className="text-xl font-bold text-blue-600">+18%</p>
            </div>
          </div>
        </div>

        {/* Uso de fondos */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Uso de Fondos</h2>
          <p className="text-sm text-slate-500 mb-4">Distribución de USD $85K</p>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={USO_FONDOS}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {USO_FONDOS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-800">$85K</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {USO_FONDOS.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">${(item.value/1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas por vertical + Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance por vertical */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800">Performance por Vertical</h2>
            <p className="text-sm text-slate-500">Métricas clave de cada línea de negocio</p>
          </div>
          <div className="divide-y divide-slate-50">
            {METRICAS_VERTICALES.map((v, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      idx === 0 ? 'bg-blue-50 text-blue-600' : 
                      idx === 1 ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-purple-50 text-purple-600'
                    }`}>
                      {idx === 0 ? <Building2 size={20} /> : idx === 1 ? <ShoppingCart size={20} /> : <Package size={20} />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{v.vertical}</h3>
                      <p className="text-xs text-slate-500">{v.clientes} {idx === 1 ? 'órdenes' : 'clientes'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} />+{v.crecimiento}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Ingresos Proyectados</p>
                    <p className="text-lg font-bold text-slate-800">${(v.ingresos/1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Margen Bruto</p>
                    <p className="text-lg font-bold text-emerald-600">{v.margen}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800">Roadmap 2026</h2>
            <p className="text-sm text-slate-500">Hitos y objetivos por trimestre</p>
          </div>
          <div className="p-4 space-y-4">
            {ROADMAP.map((q, idx) => (
              <div key={idx} className={`p-4 rounded-lg border ${
                q.status === 'completado' ? 'border-emerald-200 bg-emerald-50/50' :
                q.status === 'en_progreso' ? 'border-blue-200 bg-blue-50/50' :
                'border-slate-200 bg-slate-50/50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {q.status === 'completado' ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : q.status === 'en_progreso' ? (
                      <Clock size={18} className="text-blue-600" />
                    ) : (
                      <Target size={18} className="text-slate-400" />
                    )}
                    <span className="font-semibold text-slate-800">{q.q}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                    q.status === 'completado' ? 'bg-emerald-100 text-emerald-700' :
                    q.status === 'en_progreso' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {q.status === 'completado' ? 'Completado' : q.status === 'en_progreso' ? 'En Progreso' : 'Pendiente'}
                  </span>
                </div>
                <div className="space-y-1 ml-6">
                  {q.hitos.map((hito, i) => (
                    <p key={i} className={`text-sm ${
                      q.status === 'completado' ? 'text-emerald-700' :
                      q.status === 'en_progreso' ? 'text-blue-700' :
                      'text-slate-600'
                    }`}>• {hito}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diferenciadores competitivos */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">¿Por qué invertir en Nexo Global Trade?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <Zap size={24} className="text-amber-400 mb-2" />
            <h3 className="font-semibold mb-1">Tecnología Propietaria</h3>
            <p className="text-sm text-slate-300">Plataforma Aidaptive con AI para automatización de operaciones</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <Globe size={24} className="text-blue-400 mb-2" />
            <h3 className="font-semibold mb-1">Red Establecida</h3>
            <p className="text-sm text-slate-300">6 proveedores verificados en China + despachante de confianza</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <Target size={24} className="text-emerald-400 mb-2" />
            <h3 className="font-semibold mb-1">3 Verticales</h3>
            <p className="text-sm text-slate-300">Diversificación de ingresos: mayorista, ecommerce, servicios</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <Shield size={24} className="text-purple-400 mb-2" />
            <h3 className="font-semibold mb-1">Equipo Experto</h3>
            <p className="text-sm text-slate-300">+10 años experiencia en comercio exterior y tecnología</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">¿Interesado en invertir?</h2>
        <p className="text-slate-500 mb-4">Inversión mínima USD $10,000 • Múltiples inversores aceptados</p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            Solicitar Term Sheet
          </button>
          <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors">
            Agendar Reunión
          </button>
        </div>
      </div>
    </div>
  );
};

export default InversoresPage;
