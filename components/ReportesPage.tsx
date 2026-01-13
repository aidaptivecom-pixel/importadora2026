import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Ship,
  Users,
  PieChart,
  BarChart3,
  LineChart,
  Filter,
  ChevronDown,
  Eye,
  Printer,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Building2,
  Wallet,
  CreditCard,
  Receipt,
  Target,
  Percent
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
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
  LineChart as RechartsLine,
  Line
} from 'recharts';

const ReportesPage: React.FC = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');
  const [categoriaReporte, setCategoriaReporte] = useState('todos');

  // Datos mock para gráficos
  const ventasMensuales = [
    { mes: 'Jul', mayorista: 85000, ecommerce: 32000 },
    { mes: 'Ago', mayorista: 92000, ecommerce: 38000 },
    { mes: 'Sep', mayorista: 78000, ecommerce: 41000 },
    { mes: 'Oct', mayorista: 105000, ecommerce: 45000 },
    { mes: 'Nov', mayorista: 118000, ecommerce: 52000 },
    { mes: 'Dic', mayorista: 142000, ecommerce: 68000 },
    { mes: 'Ene', mayorista: 125000, ecommerce: 58000 }
  ];

  const margenPorVertical = [
    { name: 'Pet Vogue', value: 42, fill: '#f97316' },
    { name: 'CoreSmart', value: 35, fill: '#3b82f6' },
    { name: 'Sensuality', value: 23, fill: '#ec4899' }
  ];

  const costosPorCategoria = [
    { categoria: 'Producto', valor: 485000, porcentaje: 58 },
    { categoria: 'Flete', valor: 125000, porcentaje: 15 },
    { categoria: 'Aduana', valor: 95000, porcentaje: 11 },
    { categoria: 'Operativo', valor: 75000, porcentaje: 9 },
    { categoria: 'Marketing', valor: 55000, porcentaje: 7 }
  ];

  const operacionesPorMes = [
    { mes: 'Jul', cantidad: 4, valor: 125000 },
    { mes: 'Ago', cantidad: 5, valor: 156000 },
    { mes: 'Sep', cantidad: 3, valor: 89000 },
    { mes: 'Oct', cantidad: 6, valor: 198000 },
    { mes: 'Nov', cantidad: 5, valor: 175000 },
    { mes: 'Dic', cantidad: 7, valor: 245000 },
    { mes: 'Ene', cantidad: 4, valor: 142000 }
  ];

  const kpisFinancieros = [
    { 
      label: 'Ingresos Totales', 
      valor: '$1.24M', 
      cambio: 18.5, 
      positivo: true,
      icon: DollarSign,
      color: 'emerald'
    },
    { 
      label: 'Margen Bruto', 
      valor: '34.2%', 
      cambio: 2.3, 
      positivo: true,
      icon: Percent,
      color: 'blue'
    },
    { 
      label: 'Gastos Operativos', 
      valor: '$835K', 
      cambio: 8.1, 
      positivo: false,
      icon: CreditCard,
      color: 'amber'
    },
    { 
      label: 'Utilidad Neta', 
      valor: '$405K', 
      cambio: 24.7, 
      positivo: true,
      icon: Target,
      color: 'purple'
    }
  ];

  const reportesDisponibles = [
    {
      id: 1,
      nombre: 'P&L Mensual',
      descripcion: 'Estado de resultados detallado por mes',
      categoria: 'financiero',
      ultimaGen: '2026-01-13',
      formato: 'xlsx',
      icon: FileSpreadsheet
    },
    {
      id: 2,
      nombre: 'Análisis de Márgenes',
      descripcion: 'Margen bruto y neto por vertical y producto',
      categoria: 'financiero',
      ultimaGen: '2026-01-12',
      formato: 'pdf',
      icon: PieChart
    },
    {
      id: 3,
      nombre: 'Reporte de Operaciones',
      descripcion: 'Resumen de importaciones y costos asociados',
      categoria: 'operativo',
      ultimaGen: '2026-01-13',
      formato: 'xlsx',
      icon: Ship
    },
    {
      id: 4,
      nombre: 'Ventas por Canal',
      descripcion: 'Desglose mayorista vs ecommerce por período',
      categoria: 'ventas',
      ultimaGen: '2026-01-11',
      formato: 'pdf',
      icon: BarChart3
    },
    {
      id: 5,
      nombre: 'Cartera de Clientes',
      descripcion: 'Análisis de clientes, deuda y rotación',
      categoria: 'ventas',
      ultimaGen: '2026-01-10',
      formato: 'xlsx',
      icon: Users
    },
    {
      id: 6,
      nombre: 'Performance Proveedores',
      descripcion: 'Evaluación de proveedores y tiempos',
      categoria: 'operativo',
      ultimaGen: '2026-01-09',
      formato: 'pdf',
      icon: Building2
    },
    {
      id: 7,
      nombre: 'Inventario Valorizado',
      descripcion: 'Stock actual con costos y rotación',
      categoria: 'operativo',
      ultimaGen: '2026-01-13',
      formato: 'xlsx',
      icon: Package
    },
    {
      id: 8,
      nombre: 'Flujo de Caja Proyectado',
      descripcion: 'Proyección de ingresos y egresos 90 días',
      categoria: 'financiero',
      ultimaGen: '2026-01-12',
      formato: 'pdf',
      icon: Wallet
    }
  ];

  const reportesFiltrados = categoriaReporte === 'todos' 
    ? reportesDisponibles 
    : reportesDisponibles.filter(r => r.categoria === categoriaReporte);

  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reportes</h1>
          <p className="text-sm text-slate-500 mt-1">Análisis financiero y operativo</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
            {['semana', 'mes', 'trimestre', 'año'].map((periodo) => (
              <button
                key={periodo}
                onClick={() => setPeriodoSeleccionado(periodo)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  periodoSeleccionado === periodo 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={16} />
            <span className="text-sm font-medium">Exportar Todo</span>
          </button>
        </div>
      </div>

      {/* KPIs Financieros */}
      <div className="grid grid-cols-4 gap-4">
        {kpisFinancieros.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[kpi.color]}`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center text-xs font-medium ${
                  kpi.positivo ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {kpi.positivo ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.cambio}%
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{kpi.valor}</p>
              <p className="text-sm text-slate-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-2 gap-6">
        {/* Ventas por Canal */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Ventas por Canal</h3>
              <p className="text-xs text-slate-500 mt-1">Últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-slate-500">Mayorista</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-500">Ecommerce</span>
              </div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ventasMensuales}>
                <defs>
                  <linearGradient id="colorMayorista" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEcommerce" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${v/1000}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Area type="monotone" dataKey="mayorista" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMayorista)" />
                <Area type="monotone" dataKey="ecommerce" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEcommerce)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Margen por Vertical */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Distribución de Ingresos</h3>
              <p className="text-xs text-slate-500 mt-1">Por vertical de negocio</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="h-[240px] w-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={margenPorVertical}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {margenPorVertical.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-4">
              {margenPorVertical.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></span>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-800">{item.value}%</span>
                    <p className="text-xs text-slate-500">${(item.value * 12400).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-3 gap-6">
        {/* Estructura de Costos */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Estructura de Costos</h3>
              <p className="text-xs text-slate-500 mt-1">Desglose por categoría</p>
            </div>
            <span className="text-sm font-semibold text-slate-800">Total: $835,000</span>
          </div>
          <div className="space-y-4">
            {costosPorCategoria.map((costo, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{costo.categoria}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{costo.porcentaje}%</span>
                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(costo.valor)}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${costo.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operaciones por Mes */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Operaciones</h3>
              <p className="text-xs text-slate-500 mt-1">Importaciones por mes</p>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operacionesPorMes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number, name: string) => [
                    name === 'cantidad' ? `${value} ops` : formatCurrency(value), 
                    name === 'cantidad' ? 'Cantidad' : 'Valor'
                  ]}
                />
                <Bar dataKey="cantidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Biblioteca de Reportes */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-slate-400" size={20} />
            <h3 className="font-semibold text-slate-800">Biblioteca de Reportes</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {reportesDisponibles.length} disponibles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={categoriaReporte}
              onChange={(e) => setCategoriaReporte(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
            >
              <option value="todos">Todas las categorías</option>
              <option value="financiero">Financiero</option>
              <option value="operativo">Operativo</option>
              <option value="ventas">Ventas</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {reportesFiltrados.map((reporte) => {
            const Icon = reporte.icon;
            return (
              <div 
                key={reporte.id} 
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    reporte.categoria === 'financiero' ? 'bg-emerald-50 text-emerald-600' :
                    reporte.categoria === 'operativo' ? 'bg-blue-50 text-blue-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800">{reporte.nombre}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                        reporte.formato === 'xlsx' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {reporte.formato}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{reporte.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        Actualizado: {new Date(reporte.ultimaGen).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Vista previa">
                          <Eye size={14} className="text-slate-400" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Descargar">
                          <Download size={14} className="text-slate-400" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Imprimir">
                          <Printer size={14} className="text-slate-400" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Enviar por email">
                          <Mail size={14} className="text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-emerald-100 text-sm font-medium">Mejor Mes</span>
            <TrendingUp size={20} className="text-emerald-200" />
          </div>
          <p className="text-2xl font-bold mb-1">Diciembre 2025</p>
          <p className="text-emerald-100 text-sm">$210,000 en ventas (+34%)</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-100 text-sm font-medium">Cliente Top</span>
            <Users size={20} className="text-blue-200" />
          </div>
          <p className="text-2xl font-bold mb-1">Distribuidora Norte</p>
          <p className="text-blue-100 text-sm">$342,500 en compras (Cat. A)</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-100 text-sm font-medium">Producto Estrella</span>
            <Package size={20} className="text-purple-200" />
          </div>
          <p className="text-2xl font-bold mb-1">Camas Premium Pet</p>
          <p className="text-purple-100 text-sm">892 unidades vendidas (42% margen)</p>
        </div>
      </div>
    </div>
  );
};

export default ReportesPage;
