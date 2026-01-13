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
  ExternalLink,
  Settings,
  Calendar,
  FileText,
  Wallet,
  BarChart3,
  Sparkles
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
  Bar
} from 'recharts';
import { PageType } from '../App';
import { TIENDAS_MINORISTAS, TIENDAS_ALERTAS, TIENDAS_METRICAS_DIARIAS, TIENDAS_PROYECCIONES, TiendaMinorista } from '../constants/tiendas';

interface TiendaPageProps {
  tiendaSlug: string;
  onNavigate: (page: PageType) => void;
}

const TiendaPage: React.FC<TiendaPageProps> = ({ tiendaSlug, onNavigate }) => {
  const tienda = TIENDAS_MINORISTAS.find(t => t.slug === tiendaSlug);
  
  if (!tienda) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Store size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800">Tienda no encontrada</h3>
          <button onClick={() => onNavigate('tiendas-overview')} className="mt-4 text-blue-600 hover:text-blue-700">
            Volver a Tiendas
          </button>
        </div>
      </div>
    );
  }

  const metricas = TIENDAS_METRICAS_DIARIAS[tienda.id] || [];
  const alertas = TIENDAS_ALERTAS.filter(a => a.tiendaId === tienda.id);
  const proyeccion = TIENDAS_PROYECCIONES[tienda.id as keyof typeof TIENDAS_PROYECCIONES];

  // Quick actions para la tienda
  const quickActions = [
    { icon: ShoppingCart, label: 'Ventas', color: 'bg-blue-50 text-blue-600' },
    { icon: Users, label: 'Clientes', color: 'bg-purple-50 text-purple-600' },
    { icon: Package, label: 'Inventario', color: 'bg-amber-50 text-amber-600' },
    { icon: Wallet, label: 'Finanzas', color: 'bg-emerald-50 text-emerald-600' },
    { icon: RotateCcw, label: 'Postventa', color: 'bg-red-50 text-red-600' },
    { icon: Calendar, label: 'Marketing', color: 'bg-pink-50 text-pink-600' },
    { icon: Bot, label: 'Agentes AI', color: 'bg-cyan-50 text-cyan-600' },
    { icon: Settings, label: 'Config', color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header de Tienda */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6" style={{ backgroundColor: tienda.colorSecundario }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-sm">
                {tienda.logo}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-800">{tienda.nombre}</h1>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {tienda.estado === 'activa' ? '● Activa' : tienda.estado}
                  </span>
                </div>
                <p className="text-slate-600 mt-1">{tienda.descripcion}</p>
                <div className="flex items-center gap-3 mt-2">
                  {tienda.plataformas.map(plat => (
                    <span key={plat} className="text-xs bg-white/60 text-slate-600 px-2 py-1 rounded">{plat}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <ExternalLink size={16} />Ver Tienda
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: tienda.color }}>
                <Settings size={16} />Configurar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs de la Tienda */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ingresos Mes</p>
          <p className="text-xl font-bold" style={{ color: tienda.color }}>
            ${(tienda.ingresosMes / 1000000).toFixed(2)}M
          </p>
          <p className={`text-xs flex items-center gap-1 mt-1 ${tienda.crecimientoMes > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {tienda.crecimientoMes > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {tienda.crecimientoMes > 0 ? '+' : ''}{tienda.crecimientoMes}%
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ventas Mes</p>
          <p className="text-xl font-bold text-slate-800">{tienda.ventasMes}</p>
          <p className="text-xs text-slate-400">pedidos completados</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ticket Promedio</p>
          <p className="text-xl font-bold text-slate-800">${tienda.ticketPromedio.toLocaleString()}</p>
          <p className="text-xs text-slate-400">por venta</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Clientes</p>
          <p className="text-xl font-bold text-slate-800">{tienda.clientesActivos}</p>
          <p className="text-xs text-green-600">+{tienda.nuevosClientesMes} nuevos</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Productos</p>
          <p className="text-xl font-bold text-slate-800">{tienda.productosActivos}</p>
          <p className={`text-xs ${tienda.stockCritico > 0 ? 'text-amber-600' : 'text-green-600'}`}>
            {tienda.stockCritico > 0 ? `${tienda.stockCritico} stock bajo` : '✓ Stock OK'}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Meta Mes</p>
          <p className="text-xl font-bold" style={{ color: proyeccion?.cumplimiento >= 100 ? '#10b981' : tienda.color }}>
            {proyeccion?.cumplimiento || 0}%
          </p>
          <p className="text-xs text-slate-400">${((proyeccion?.metaMes || 0) / 1000000).toFixed(1)}M objetivo</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between">
          {quickActions.map(action => (
            <button
              key={action.label}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl hover:shadow-sm transition-all ${action.color}`}
            >
              <action.icon size={20} />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gráficos y Alertas */}
      <div className="grid grid-cols-3 gap-6">
        {/* Tendencia de Ventas */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Tendencia de Ingresos</h2>
              <p className="text-sm text-slate-500">Últimos 7 días</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Promedio:</span>
              <span className="text-sm font-semibold" style={{ color: tienda.color }}>
                ${(metricas.reduce((acc, m) => acc + m.ingresos, 0) / metricas.length / 1000).toFixed(0)}K/día
              </span>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricas}>
                <defs>
                  <linearGradient id={`color${tienda.slug}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tienda.color} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={tienda.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="fecha" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(v) => v.split('-')[2]}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                />
                <Area 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke={tienda.color} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill={`url(#color${tienda.slug})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas y Estado */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between" style={{ backgroundColor: tienda.colorSecundario }}>
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} style={{ color: tienda.color }} />
              <h2 className="font-semibold text-slate-800">Estado de la Tienda</h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {/* Indicadores de estado */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600">Stock Crítico</span>
                </div>
                <span className={`text-sm font-semibold ${tienda.stockCritico > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                  {tienda.stockCritico}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600">Tickets Abiertos</span>
                </div>
                <span className={`text-sm font-semibold ${tienda.ticketsAbiertos > 0 ? 'text-blue-600' : 'text-green-600'}`}>
                  {tienda.ticketsAbiertos}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600">Devoluciones</span>
                </div>
                <span className={`text-sm font-semibold ${tienda.devolucionesPendientes > 0 ? 'text-purple-600' : 'text-green-600'}`}>
                  {tienda.devolucionesPendientes}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600">Garantías</span>
                </div>
                <span className={`text-sm font-semibold ${tienda.garantiasPendientes > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {tienda.garantiasPendientes}
                </span>
              </div>
            </div>
            
            {/* Alertas */}
            {alertas.length > 0 && (
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-xs font-semibold text-slate-500 mb-2">ALERTAS ACTIVAS</p>
                <div className="space-y-2">
                  {alertas.slice(0, 3).map(alerta => (
                    <div key={alerta.id} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${alerta.prioridad === 'alta' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <p className="text-xs text-slate-600">{alerta.mensaje}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Agentes AI y Relación Importadora */}
      <div className="grid grid-cols-2 gap-6">
        {/* Agentes AI */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-cyan-500" />
              <h2 className="font-semibold text-slate-800">Agentes AI</h2>
            </div>
            <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
              {tienda.agentesActivos} activos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-cyan-600" />
                <span className="text-sm font-medium text-slate-700">Agente Ventas</span>
              </div>
              <p className="text-2xl font-bold text-cyan-700">{Math.floor(tienda.conversacionesHoy * 0.6)}</p>
              <p className="text-xs text-slate-500">conversaciones hoy</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Agente Soporte</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">{Math.floor(tienda.conversacionesHoy * 0.4)}</p>
              <p className="text-xs text-slate-500">conversaciones hoy</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Relación con Importadora */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-500" />
              <h2 className="font-semibold text-slate-800">Cuenta con Importadora</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-emerald-50">
              <p className="text-xs text-emerald-600 mb-1">Compras Acumuladas</p>
              <p className="text-2xl font-bold text-emerald-700">${(tienda.comprasAcumuladas / 1000).toFixed(0)}K</p>
            </div>
            <div className={`p-4 rounded-xl ${tienda.deudaImportadora > 0 ? 'bg-amber-50' : 'bg-green-50'}`}>
              <p className={`text-xs mb-1 ${tienda.deudaImportadora > 0 ? 'text-amber-600' : 'text-green-600'}`}>Saldo Pendiente</p>
              <p className={`text-2xl font-bold ${tienda.deudaImportadora > 0 ? 'text-amber-700' : 'text-green-700'}`}>
                {tienda.deudaImportadora > 0 ? `$${(tienda.deudaImportadora / 1000).toFixed(1)}K` : '✓ Al día'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Última compra:</span>
            <span className="font-medium text-slate-700">{tienda.ultimaCompra}</span>
          </div>
          <button className="w-full mt-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Solicitar mercadería
          </button>
        </div>
      </div>

      {/* Plan de Marketing (heredado del central) */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-pink-500" />
            <h2 className="font-semibold text-slate-800">Plan de Marketing (desde Central)</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Ver calendario completo <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {['Lun 13', 'Mar 14', 'Mié 15', 'Jue 16'].map((dia, idx) => (
            <div key={dia} className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
              <p className="text-xs font-medium text-slate-500 mb-2">{dia}</p>
              <div className="space-y-2">
                <div className="p-2 rounded bg-pink-50">
                  <p className="text-xs font-medium text-pink-700">📸 Post Instagram</p>
                  <p className="text-[10px] text-slate-500">Producto destacado</p>
                </div>
                {idx % 2 === 0 && (
                  <div className="p-2 rounded bg-blue-50">
                    <p className="text-xs font-medium text-blue-700">🎬 Reel</p>
                    <p className="text-[10px] text-slate-500">Tutorial uso</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiendaPage;
