import React from 'react';
import {
  Store,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  AlertTriangle,
  Package,
  RotateCcw,
  Shield,
  Bot,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
  Target,
  Zap,
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
import { PageType } from '../App';
import { TIENDAS_MINORISTAS, TIENDAS_ALERTAS, TIENDAS_METRICAS_DIARIAS, getTiendasResumen } from '../constants/tiendas';

interface TiendasOverviewPageProps {
  onNavigate: (page: PageType) => void;
}

const TiendasOverviewPage: React.FC<TiendasOverviewPageProps> = ({ onNavigate }) => {
  const resumen = getTiendasResumen();
  
  // Datos para gráfico de ingresos por tienda
  const ingresosData = TIENDAS_MINORISTAS.map(t => ({
    nombre: t.nombre,
    ingresos: t.ingresosMes,
    color: t.color
  }));
  
  // Datos para gráfico de tendencia semanal consolidada
  const tendenciaSemanal = (() => {
    const dias = ['07', '08', '09', '10', '11', '12', '13'];
    return dias.map((dia, idx) => {
      let totalIngresos = 0;
      let totalVentas = 0;
      Object.values(TIENDAS_METRICAS_DIARIAS).forEach(metricas => {
        if (metricas[idx]) {
          totalIngresos += metricas[idx].ingresos;
          totalVentas += metricas[idx].ventas;
        }
      });
      return { dia: `${dia} Ene`, ingresos: totalIngresos, ventas: totalVentas };
    });
  })();
  
  const alertasActivas = TIENDAS_ALERTAS.filter(a => a.prioridad === 'alta' || a.prioridad === 'media');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tiendas Minoristas</h1>
          <p className="text-sm text-slate-500 mt-1">Vista consolidada de todas las tiendas del ecosistema</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100">
          <Clock size={14} />
          Actualizado hace 5 min
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Store size={18} className="text-blue-500" />
            <span className="text-xs text-slate-500">Tiendas Activas</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{resumen.tiendasActivas}</p>
          <p className="text-xs text-slate-400">de {resumen.totalTiendas} totales</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} className="text-emerald-500" />
            <span className="text-xs text-slate-500">Ingresos Mes</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${(resumen.ingresosTotalesMes / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-green-600 flex items-center gap-1"><ArrowUpRight size={12} />+24.3% vs mes ant.</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={18} className="text-blue-500" />
            <span className="text-xs text-slate-500">Ventas Mes</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{resumen.ventasTotalesMes}</p>
          <p className="text-xs text-green-600 flex items-center gap-1"><ArrowUpRight size={12} />+18.7% vs mes ant.</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-purple-500" />
            <span className="text-xs text-slate-500">Clientes Activos</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{resumen.clientesTotales.toLocaleString()}</p>
          <p className="text-xs text-slate-400">en todas las tiendas</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Bot size={18} className="text-cyan-500" />
            <span className="text-xs text-slate-500">Agentes AI</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{resumen.agentesActivosTotal}</p>
          <p className="text-xs text-cyan-600">{resumen.conversacionesHoyTotal} chats hoy</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <span className="text-xs text-slate-500">Alertas</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{alertasActivas.length}</p>
          <p className="text-xs text-slate-400">requieren atención</p>
        </div>
      </div>

      {/* Gráficos y Tiendas */}
      <div className="grid grid-cols-3 gap-6">
        {/* Tendencia Semanal */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Tendencia Semanal Consolidada</h2>
              <p className="text-sm text-slate-500">Ingresos de todas las tiendas</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tendenciaSemanal}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                />
                <Area type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Tienda */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Distribución Ingresos</h2>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ingresosData}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="ingresos"
                  cornerRadius={5}
                >
                  {ingresosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-lg font-bold text-slate-800">${(resumen.ingresosTotalesMes / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {TIENDAS_MINORISTAS.map(tienda => (
              <div key={tienda.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tienda.color }} />
                  <span className="text-slate-600">{tienda.nombre}</span>
                </div>
                <span className="font-medium text-slate-800">{((tienda.ingresosMes / resumen.ingresosTotalesMes) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de Tiendas */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Detalle por Tienda</h2>
        <div className="grid grid-cols-3 gap-6">
          {TIENDAS_MINORISTAS.map(tienda => {
            const tiendaAlertas = TIENDAS_ALERTAS.filter(a => a.tiendaId === tienda.id && a.prioridad === 'alta');
            return (
              <div 
                key={tienda.id} 
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate(tienda.slug as PageType)}
              >
                {/* Header tienda */}
                <div className="p-4 border-b border-slate-50" style={{ backgroundColor: tienda.colorSecundario }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: tienda.color + '20' }}>
                        {tienda.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{tienda.nombre}</h3>
                        <p className="text-xs text-slate-500">{tienda.vertical}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${tienda.crecimientoMes > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {tienda.crecimientoMes > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {tienda.crecimientoMes > 0 ? '+' : ''}{tienda.crecimientoMes}%
                    </span>
                  </div>
                </div>
                
                {/* Métricas */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400">Ingresos Mes</p>
                      <p className="text-lg font-bold" style={{ color: tienda.color }}>
                        ${(tienda.ingresosMes / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Ventas</p>
                      <p className="text-lg font-bold text-slate-800">{tienda.ventasMes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Ticket Prom.</p>
                      <p className="text-sm font-semibold text-slate-700">${tienda.ticketPromedio.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Clientes</p>
                      <p className="text-sm font-semibold text-slate-700">{tienda.clientesActivos}</p>
                    </div>
                  </div>
                  
                  {/* Indicadores rápidos */}
                  <div className="flex items-center gap-3 text-xs border-t border-slate-100 pt-3">
                    {tienda.stockCritico > 0 && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <Package size={12} />{tienda.stockCritico} stock bajo
                      </span>
                    )}
                    {tienda.ticketsAbiertos > 0 && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <MessageSquare size={12} />{tienda.ticketsAbiertos} tickets
                      </span>
                    )}
                    {tiendaAlertas.length > 0 && (
                      <span className="flex items-center gap-1 text-red-600">
                        <AlertTriangle size={12} />{tiendaAlertas.length} alertas
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-4 py-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Bot size={12} className="text-cyan-500" />
                    {tienda.conversacionesHoy} chats hoy
                  </div>
                  <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                    Ver tienda <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alertas y Relación con Importadora */}
      <div className="grid grid-cols-2 gap-6">
        {/* Alertas Activas */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              <h2 className="font-semibold text-amber-700">Alertas Activas</h2>
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">{alertasActivas.length}</span>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[280px] overflow-y-auto">
            {alertasActivas.map(alerta => {
              const tienda = TIENDAS_MINORISTAS.find(t => t.id === alerta.tiendaId);
              return (
                <div key={alerta.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${alerta.prioridad === 'alta' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{alerta.mensaje}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: tienda?.colorSecundario, color: tienda?.color }}>
                            {tienda?.nombre}
                          </span>
                          <span className="text-xs text-slate-400">{alerta.fecha}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                      {alerta.accion}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Relación con Importadora */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="text-emerald-500" size={20} />
              <h2 className="font-semibold text-slate-800">Relación con Importadora</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs text-emerald-600 mb-1">Compras Acumuladas</p>
                <p className="text-xl font-bold text-emerald-700">${(resumen.comprasAcumuladasTotal / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-amber-600 mb-1">Deuda Pendiente</p>
                <p className="text-xl font-bold text-amber-700">${(resumen.deudaImportadoraTotal / 1000).toFixed(1)}K</p>
              </div>
            </div>
            <div className="space-y-3">
              {TIENDAS_MINORISTAS.map(tienda => (
                <div key={tienda.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{tienda.logo}</span>
                    <span className="text-sm font-medium text-slate-700">{tienda.nombre}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">Compras: <span className="font-medium text-slate-700">${(tienda.comprasAcumuladas / 1000).toFixed(0)}K</span></span>
                    <span className={tienda.deudaImportadora > 0 ? 'text-amber-600' : 'text-green-600'}>
                      {tienda.deudaImportadora > 0 ? `Deuda: $${(tienda.deudaImportadora / 1000).toFixed(1)}K` : '✓ Al día'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Métricas de Problemas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-amber-500" />
            <span className="text-sm text-slate-600">Stock Crítico Total</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{resumen.stockCriticoTotal}</p>
          <p className="text-xs text-slate-400">productos bajo mínimo</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={18} className="text-blue-500" />
            <span className="text-sm text-slate-600">Tickets Abiertos</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{resumen.ticketsAbiertosTotal}</p>
          <p className="text-xs text-slate-400">requieren atención</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw size={18} className="text-purple-500" />
            <span className="text-sm text-slate-600">Devoluciones Pend.</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{resumen.devolucionesPendientesTotal}</p>
          <p className="text-xs text-slate-400">en proceso</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-red-500" />
            <span className="text-sm text-slate-600">Garantías Pend.</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{resumen.garantiasPendientesTotal}</p>
          <p className="text-xs text-slate-400">reclamos activos</p>
        </div>
      </div>
    </div>
  );
};

export default TiendasOverviewPage;
