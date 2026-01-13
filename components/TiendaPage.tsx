import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCcw,
  Star,
  Send,
  Activity,
  PieChart,
  TrendingUp as Trending,
  CreditCard,
  Receipt,
  ArrowRight,
  Plus,
  MoreHorizontal,
  Download,
  Upload,
  Box,
  Inbox,
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  Hash,
  Circle,
  Archive,
  Reply,
  UserCheck,
  Smile,
  Frown,
  Meh,
  ChevronDown,
  Paperclip,
  Image,
  User
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
  LineChart,
  Line
} from 'recharts';
import { PageType } from '../App';
import { TiendaMinorista, TIENDAS_ALERTAS, TIENDAS_METRICAS_DIARIAS, TIENDAS_PROYECCIONES } from '../constants/tiendas';
import {
  PEDIDOS_TIENDA,
  CLIENTES_TIENDA,
  INVENTARIO_TIENDA,
  FINANZAS_TIENDA,
  CASOS_POSTVENTA,
  MARKETING_TIENDA,
  AGENTES_TIENDA,
  SOLICITUDES_REPOSICION,
  INBOX_TIENDA,
  INBOX_STATS,
  CONVERSACIONES_CHAT,
  MensajeInbox,
  MensajeChat
} from '../constants/tiendasData';

interface TiendaPageProps {
  tienda: TiendaMinorista;
  onNavigate: (page: PageType) => void;
}

type TabType = 'dashboard' | 'inbox' | 'ventas' | 'clientes' | 'inventario' | 'finanzas' | 'postventa' | 'marketing' | 'agentes';

const TiendaPage: React.FC<TiendaPageProps> = ({ tienda, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  const metricas = TIENDAS_METRICAS_DIARIAS[tienda.id] || [];
  const alertas = TIENDAS_ALERTAS.filter(a => a.tiendaId === tienda.id);
  const proyeccion = TIENDAS_PROYECCIONES[tienda.id as keyof typeof TIENDAS_PROYECCIONES];
  const inboxStats = INBOX_STATS[tienda.slug];
  
  const tabs: { id: TabType; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: inboxStats?.nuevas || 0 },
    { id: 'ventas', label: 'Ventas', icon: ShoppingCart },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'inventario', label: 'Inventario', icon: Package },
    { id: 'finanzas', label: 'Finanzas', icon: Wallet },
    { id: 'postventa', label: 'Postventa', icon: RotateCcw },
    { id: 'marketing', label: 'Marketing', icon: Sparkles },
    { id: 'agentes', label: 'Agentes AI', icon: Bot },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab tienda={tienda} metricas={metricas} alertas={alertas} proyeccion={proyeccion} />;
      case 'inbox':
        return <InboxTab tienda={tienda} />;
      case 'ventas':
        return <VentasTab tienda={tienda} />;
      case 'clientes':
        return <ClientesTab tienda={tienda} />;
      case 'inventario':
        return <InventarioTab tienda={tienda} />;
      case 'finanzas':
        return <FinanzasTab tienda={tienda} />;
      case 'postventa':
        return <PostventaTab tienda={tienda} />;
      case 'marketing':
        return <MarketingTab tienda={tienda} />;
      case 'agentes':
        return <AgentesTab tienda={tienda} />;
      default:
        return null;
    }
  };

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
        
        {/* Tabs de navegación */}
        <div className="border-t border-slate-100 px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'border-current text-slate-800' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                  style={isActive ? { color: tienda.color, borderColor: tienda.color } : {}}
                >
                  <Icon size={16} />
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido del tab activo */}
      {renderContent()}
    </div>
  );
};

// ============ DASHBOARD TAB ============
const DashboardTab: React.FC<{ tienda: TiendaMinorista; metricas: any[]; alertas: any[]; proyeccion: any }> = ({ tienda, metricas, alertas, proyeccion }) => {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ingresos Mes</p>
          <p className="text-xl font-bold" style={{ color: tienda.color }}>${(tienda.ingresosMes / 1000000).toFixed(2)}M</p>
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

      {/* Gráficos */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Tendencia de Ingresos</h2>
              <p className="text-sm text-slate-500">Últimos 7 días</p>
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
                <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => v.split('-')[2]} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']} />
                <Area type="monotone" dataKey="ingresos" stroke={tienda.color} strokeWidth={3} fillOpacity={1} fill={`url(#color${tienda.slug})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50" style={{ backgroundColor: tienda.colorSecundario }}>
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} style={{ color: tienda.color }} />
              <h2 className="font-semibold text-slate-800">Estado de la Tienda</h2>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {[
              { icon: Package, label: 'Stock Crítico', value: tienda.stockCritico, bad: tienda.stockCritico > 0 },
              { icon: MessageSquare, label: 'Tickets Abiertos', value: tienda.ticketsAbiertos, bad: tienda.ticketsAbiertos > 0 },
              { icon: RotateCcw, label: 'Devoluciones', value: tienda.devolucionesPendientes, bad: tienda.devolucionesPendientes > 0 },
              { icon: Shield, label: 'Garantías', value: tienda.garantiasPendientes, bad: tienda.garantiasPendientes > 0 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <item.icon size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
                <span className={`text-sm font-semibold ${item.bad ? 'text-amber-600' : 'text-green-600'}`}>{item.value}</span>
              </div>
            ))}
            {alertas.length > 0 && (
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-xs font-semibold text-slate-500 mb-2">ALERTAS ACTIVAS</p>
                {alertas.slice(0, 3).map(alerta => (
                  <div key={alerta.id} className="flex items-start gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${alerta.prioridad === 'alta' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <p className="text-xs text-slate-600">{alerta.mensaje}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Agentes AI y Cuenta Importadora */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-cyan-500" />
              <h2 className="font-semibold text-slate-800">Agentes AI</h2>
            </div>
            <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">{tienda.agentesActivos} activos</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Ventas', 'Soporte'].map((tipo, idx) => (
              <div key={tipo} className={`p-4 rounded-xl ${idx === 0 ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {idx === 0 ? <MessageSquare size={16} className="text-cyan-600" /> : <Shield size={16} className="text-purple-600" />}
                  <span className="text-sm font-medium text-slate-700">Agente {tipo}</span>
                </div>
                <p className={`text-2xl font-bold ${idx === 0 ? 'text-cyan-700' : 'text-purple-700'}`}>{Math.floor(tienda.conversacionesHoy * (idx === 0 ? 0.6 : 0.4))}</p>
                <p className="text-xs text-slate-500">conversaciones hoy</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-emerald-500" />
            <h2 className="font-semibold text-slate-800">Cuenta con Importadora</h2>
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
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-slate-500">Última compra:</span>
            <span className="font-medium text-slate-700">{tienda.ultimaCompra}</span>
          </div>
          <button className="w-full py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Solicitar mercadería
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ INBOX TAB ============
const InboxTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const mensajes = INBOX_TIENDA[tienda.slug] || [];
  const stats = INBOX_STATS[tienda.slug];
  const [filtroCanal, setFiltroCanal] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<MensajeInbox | null>(null);
  const [nuevoMensaje, setNuevoMensaje] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Obtener historial de chat de la conversación seleccionada
  const conversacionActual = mensajeSeleccionado 
    ? CONVERSACIONES_CHAT[mensajeSeleccionado.conversacionId] || []
    : [];

  // Scroll al final del chat cuando cambia la conversación
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajeSeleccionado, conversacionActual]);

  const mensajesFiltrados = mensajes.filter(m => {
    if (filtroCanal && m.canal !== filtroCanal) return false;
    if (filtroEstado && m.estado !== filtroEstado) return false;
    if (busqueda && !m.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) && !m.ultimoMensaje.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const canalIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    whatsapp: { icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
    instagram: { icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    mercadolibre: { icon: ShoppingCart, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    email: { icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
    web_chat: { icon: Globe, color: 'text-slate-600', bg: 'bg-slate-100' },
    facebook: { icon: Facebook, color: 'text-blue-700', bg: 'bg-blue-50' }
  };

  const estadoColors: Record<string, { bg: string; text: string; label: string }> = {
    nuevo: { bg: 'bg-red-50', text: 'text-red-700', label: 'Nuevo' },
    en_proceso: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En proceso' },
    respondido: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Respondido' },
    esperando_cliente: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Esperando' },
    cerrado: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Cerrado' }
  };

  const sentimientoIcons: Record<string, { icon: React.ElementType; color: string }> = {
    positivo: { icon: Smile, color: 'text-green-500' },
    neutral: { icon: Meh, color: 'text-slate-400' },
    negativo: { icon: Frown, color: 'text-red-500' }
  };

  const handleEnviarMensaje = () => {
    if (!nuevoMensaje.trim() || !mensajeSeleccionado) return;
    // En producción, esto enviaría el mensaje al backend
    console.log('Enviando mensaje:', nuevoMensaje, 'a conversación:', mensajeSeleccionado.conversacionId);
    setNuevoMensaje('');
  };

  return (
    <div className="space-y-6">
      {/* KPIs de Inbox */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Conversaciones</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{stats?.totalConversaciones || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Nuevas</p>
          <p className="text-2xl font-bold text-red-600">{stats?.nuevas || 0}</p>
          <p className="text-xs text-red-500">requieren atención</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">En Proceso</p>
          <p className="text-2xl font-bold text-amber-600">{stats?.enProceso || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Tiempo Respuesta</p>
          <p className="text-2xl font-bold text-blue-600">{stats?.tiempoPromedioRespuesta || 0}m</p>
          <p className="text-xs text-slate-400">promedio</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Resolución 1er Contacto</p>
          <p className="text-2xl font-bold text-green-600">{stats?.resolucionPrimerContacto || 0}%</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Satisfacción</p>
          <div className="flex items-center gap-1">
            <Star size={18} className="text-amber-400 fill-amber-400" />
            <p className="text-2xl font-bold text-slate-800">{stats?.satisfaccionPromedio?.toFixed(1) || 0}</p>
          </div>
        </div>
      </div>

      {/* Distribución por Canal */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Object.entries(stats?.porCanal || {}).map(([canal, count]) => {
              const config = canalIcons[canal];
              const Icon = config?.icon || MessageSquare;
              return (
                <button
                  key={canal}
                  onClick={() => setFiltroCanal(filtroCanal === canal ? '' : canal)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    filtroCanal === canal ? 'ring-2 ring-offset-1' : 'hover:bg-slate-50'
                  } ${config?.bg || 'bg-slate-50'}`}
                  style={filtroCanal === canal ? { ringColor: tienda.color } : {}}
                >
                  <Icon size={16} className={config?.color || 'text-slate-500'} />
                  <span className="text-sm font-medium text-slate-700 capitalize">{canal.replace('_', ' ')}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${config?.bg || 'bg-slate-100'} ${config?.color || 'text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar conversación..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64"
              />
            </div>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="nuevo">Nuevos</option>
              <option value="en_proceso">En proceso</option>
              <option value="respondido">Respondidos</option>
              <option value="esperando_cliente">Esperando cliente</option>
              <option value="cerrado">Cerrados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Conversaciones + Chat */}
      <div className="grid grid-cols-5 gap-6">
        {/* Lista de conversaciones */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox size={18} style={{ color: tienda.color }} />
              <h3 className="font-semibold text-slate-800">Conversaciones</h3>
              <span className="text-xs text-slate-400">({mensajesFiltrados.length})</span>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
            {mensajesFiltrados.map(mensaje => {
              const canalConfig = canalIcons[mensaje.canal];
              const CanalIcon = canalConfig?.icon || MessageSquare;
              const estadoConfig = estadoColors[mensaje.estado];
              const isSelected = mensajeSeleccionado?.id === mensaje.id;

              return (
                <div
                  key={mensaje.id}
                  onClick={() => setMensajeSeleccionado(mensaje)}
                  className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-slate-50 border-l-4' : ''
                  } ${mensaje.estado === 'nuevo' ? 'bg-red-50/30' : ''}`}
                  style={isSelected ? { borderLeftColor: tienda.color } : {}}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar/Canal */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${canalConfig?.bg || 'bg-slate-100'}`}>
                        <CanalIcon size={18} className={canalConfig?.color || 'text-slate-500'} />
                      </div>
                      {mensaje.mensajesSinLeer > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {mensaje.mensajesSinLeer}
                        </span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${mensaje.estado === 'nuevo' ? 'text-slate-900' : 'text-slate-700'}`}>
                            {mensaje.cliente.nombre}
                          </span>
                          {mensaje.prioridad === 'alta' && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-semibold">URGENTE</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{mensaje.horaUltimoMensaje}</span>
                      </div>

                      <p className={`text-sm truncate ${mensaje.estado === 'nuevo' ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                        {mensaje.ultimoMensaje}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${estadoConfig.bg} ${estadoConfig.text}`}>
                          {estadoConfig.label}
                        </span>
                        {mensaje.asignado !== 'Sin asignar' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {mensaje.asignado === 'Agente AI' ? '🤖' : '👤'} {mensaje.asignado}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de Chat */}
        <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          {mensajeSeleccionado ? (
            <>
              {/* Header del Chat */}
              <div className="p-4 border-b border-slate-100" style={{ backgroundColor: tienda.colorSecundario }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${canalIcons[mensajeSeleccionado.canal]?.bg || 'bg-slate-100'}`}>
                      {React.createElement(canalIcons[mensajeSeleccionado.canal]?.icon || MessageSquare, {
                        size: 18,
                        className: canalIcons[mensajeSeleccionado.canal]?.color || 'text-slate-500'
                      })}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{mensajeSeleccionado.cliente.nombre}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 capitalize">{mensajeSeleccionado.canal.replace('_', ' ')}</p>
                        {mensajeSeleccionado.pedidoRelacionado && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            📦 {mensajeSeleccionado.pedidoRelacionado}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${estadoColors[mensajeSeleccionado.estado].bg} ${estadoColors[mensajeSeleccionado.estado].text}`}>
                      {estadoColors[mensajeSeleccionado.estado].label}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      mensajeSeleccionado.asignado === 'Agente AI' ? 'bg-cyan-50 text-cyan-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                      {mensajeSeleccionado.asignado === 'Agente AI' ? '🤖 Agente AI' : '👤 Humano'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Área de Mensajes */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                style={{ maxHeight: '400px', minHeight: '400px' }}
              >
                {conversacionActual.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <p className="text-sm">No hay mensajes en esta conversación</p>
                  </div>
                ) : (
                  conversacionActual.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.tipo === 'saliente' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${msg.tipo === 'saliente' ? 'order-2' : 'order-1'}`}>
                        {/* Autor */}
                        <div className={`flex items-center gap-2 mb-1 ${msg.tipo === 'saliente' ? 'justify-end' : 'justify-start'}`}>
                          {msg.tipo === 'entrante' ? (
                            <User size={12} className="text-slate-400" />
                          ) : msg.autorTipo === 'agente_ai' ? (
                            <Bot size={12} className="text-cyan-500" />
                          ) : (
                            <UserCheck size={12} className="text-purple-500" />
                          )}
                          <span className={`text-xs ${
                            msg.autorTipo === 'cliente' ? 'text-slate-500' :
                            msg.autorTipo === 'agente_ai' ? 'text-cyan-600' : 'text-purple-600'
                          }`}>
                            {msg.autor}
                          </span>
                          <span className="text-[10px] text-slate-400">{msg.hora}</span>
                        </div>
                        
                        {/* Burbuja de mensaje */}
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            msg.tipo === 'entrante'
                              ? 'bg-white border border-slate-200 rounded-tl-md'
                              : msg.autorTipo === 'agente_ai'
                              ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-tr-md'
                              : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-md'
                          }`}
                        >
                          <p className={`text-sm ${msg.tipo === 'entrante' ? 'text-slate-700' : 'text-white'}`}>
                            {msg.contenido}
                          </p>
                        </div>
                        
                        {/* Indicador de leído */}
                        {msg.tipo === 'saliente' && (
                          <div className="flex justify-end mt-1">
                            <span className="text-[10px] text-slate-400">
                              {msg.leido ? '✓✓ Leído' : '✓ Enviado'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input de Mensaje */}
              <div className="p-4 border-t border-slate-100 bg-white">
                {mensajeSeleccionado.asignado === 'Soporte Humano' || mensajeSeleccionado.estado === 'en_proceso' ? (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEnviarMensaje()}
                        placeholder="Escribí tu mensaje..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm pr-24 focus:outline-none focus:ring-2 focus:border-transparent"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="text-slate-400 hover:text-slate-600">
                          <Paperclip size={18} />
                        </button>
                        <button className="text-slate-400 hover:text-slate-600">
                          <Image size={18} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleEnviarMensaje}
                      disabled={!nuevoMensaje.trim()}
                      className="px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                      style={{ backgroundColor: tienda.color }}
                    >
                      <Send size={16} />
                      Enviar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Bot size={20} className="text-cyan-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Conversación manejada por Agente AI</p>
                        <p className="text-xs text-slate-500">Podés tomar el control en cualquier momento</p>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors hover:bg-white"
                      style={{ borderColor: tienda.color, color: tienda.color }}
                    >
                      Tomar Control
                    </button>
                  </div>
                )}
                
                {/* Acciones rápidas */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Acciones:</span>
                    <button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                      Escalar
                    </button>
                    <button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                      Marcar resuelto
                    </button>
                    <button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                      Agregar etiqueta
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {mensajeSeleccionado.etiquetas.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        #{tag.toLowerCase().replace(' ', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '550px' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: tienda.colorSecundario }}>
                <MessageSquare size={40} style={{ color: tienda.color }} />
              </div>
              <p className="text-slate-600 font-medium mb-1">Seleccioná una conversación</p>
              <p className="text-sm text-slate-400">Hacé clic en cualquier mensaje para ver el historial completo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============ VENTAS TAB ============
const VentasTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const pedidos = PEDIDOS_TIENDA[tienda.slug] || [];
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  
  const pedidosFiltrados = filtroEstado ? pedidos.filter(p => p.estado === filtroEstado) : pedidos;
  
  const estadoColors: Record<string, string> = {
    pendiente: 'bg-amber-50 text-amber-700',
    procesando: 'bg-blue-50 text-blue-700',
    enviado: 'bg-purple-50 text-purple-700',
    entregado: 'bg-green-50 text-green-700',
    cancelado: 'bg-red-50 text-red-700'
  };
  
  const estadoIcons: Record<string, React.ElementType> = {
    pendiente: Clock,
    procesando: RefreshCcw,
    enviado: Truck,
    entregado: CheckCircle2,
    cancelado: XCircle
  };

  const totalVentas = pedidos.filter(p => p.estado !== 'cancelado').reduce((acc, p) => acc + p.total, 0);
  const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
  const pedidosEnviados = pedidos.filter(p => p.estado === 'enviado').length;

  return (
    <div className="space-y-6">
      {/* KPIs Ventas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ventas del Día</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>${(totalVentas / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600">+12% vs ayer</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Pedidos Hoy</p>
          <p className="text-2xl font-bold text-slate-800">{pedidos.length}</p>
          <p className="text-xs text-slate-400">pedidos recibidos</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-amber-600">{pedidosPendientes}</p>
          <p className="text-xs text-amber-600">requieren acción</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">En Tránsito</p>
          <p className="text-2xl font-bold text-purple-600">{pedidosEnviados}</p>
          <p className="text-xs text-slate-400">en camino</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar pedido..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64" />
            </div>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="procesando">Procesando</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}>
            <Plus size={16} />Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Pedido</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Productos</th>
              <th className="p-4">Canal</th>
              <th className="p-4 text-right">Total</th>
              <th className="p-4">Estado</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {pedidosFiltrados.map(pedido => {
              const Icon = estadoIcons[pedido.estado] || Clock;
              return (
                <tr key={pedido.id} className="hover:bg-slate-50 cursor-pointer">
                  <td className="p-4">
                    <p className="font-semibold" style={{ color: tienda.color }}>{pedido.id}</p>
                    <p className="text-xs text-slate-400">{pedido.fecha}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{pedido.cliente}</p>
                    <p className="text-xs text-slate-400">{pedido.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700">{pedido.productos.length} producto(s)</p>
                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{pedido.productos.map(p => p.nombre).join(', ')}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{pedido.canal}</span>
                  </td>
                  <td className="p-4 text-right font-semibold text-slate-800">${pedido.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[pedido.estado]}`}>
                      <Icon size={12} />
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
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

// ============ CLIENTES TAB ============
const ClientesTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const clientes = CLIENTES_TIENDA[tienda.slug] || [];
  
  const segmentoColors: Record<string, string> = {
    VIP: 'bg-purple-50 text-purple-700 border-purple-200',
    Frecuente: 'bg-blue-50 text-blue-700 border-blue-200',
    Ocasional: 'bg-slate-50 text-slate-600 border-slate-200',
    Nuevo: 'bg-green-50 text-green-700 border-green-200',
    Inactivo: 'bg-red-50 text-red-600 border-red-200'
  };

  const totalClientes = clientes.length;
  const clientesVIP = clientes.filter(c => c.segmento === 'VIP').length;
  const clientesNuevos = clientes.filter(c => c.segmento === 'Nuevo').length;
  const npsPromedio = clientes.filter(c => c.nps).reduce((acc, c) => acc + (c.nps || 0), 0) / clientes.filter(c => c.nps).length;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Clientes</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{totalClientes}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Clientes VIP</p>
          <p className="text-2xl font-bold text-purple-600">{clientesVIP}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Nuevos (Mes)</p>
          <p className="text-2xl font-bold text-green-600">{clientesNuevos}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">NPS Promedio</p>
          <p className="text-2xl font-bold text-emerald-600">{npsPromedio.toFixed(1)}</p>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Base de Clientes</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar cliente..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}>
              <Plus size={16} />Agregar
            </button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Segmento</th>
              <th className="p-4">Compras</th>
              <th className="p-4 text-right">Total Gastado</th>
              <th className="p-4">Última Compra</th>
              <th className="p-4">NPS</th>
              <th className="p-4">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {clientes.map(cliente => (
              <tr key={cliente.id} className="hover:bg-slate-50 cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: tienda.colorSecundario, color: tienda.color }}>
                      {cliente.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{cliente.nombre}</p>
                      <p className="text-xs text-slate-400">{cliente.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${segmentoColors[cliente.segmento]}`}>
                    {cliente.segmento}
                  </span>
                </td>
                <td className="p-4 text-slate-700">{cliente.cantidadCompras}</td>
                <td className="p-4 text-right font-semibold text-slate-800">${cliente.totalCompras.toLocaleString()}</td>
                <td className="p-4 text-slate-500">{cliente.ultimaCompra}</td>
                <td className="p-4">
                  {cliente.nps ? (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-medium">{cliente.nps}</span>
                    </div>
                  ) : <span className="text-slate-300">—</span>}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {cliente.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ INVENTARIO TAB ============
const InventarioTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const inventario = INVENTARIO_TIENDA[tienda.slug] || [];
  const solicitudes = SOLICITUDES_REPOSICION[tienda.slug] || [];
  
  const estadoColors: Record<string, string> = {
    disponible: 'bg-green-50 text-green-700',
    stock_bajo: 'bg-amber-50 text-amber-700',
    sin_stock: 'bg-red-50 text-red-700',
    descontinuado: 'bg-slate-100 text-slate-500'
  };

  const totalProductos = inventario.length;
  const stockBajo = inventario.filter(p => p.estado === 'stock_bajo').length;
  const sinStock = inventario.filter(p => p.estado === 'sin_stock').length;
  const valorInventario = inventario.reduce((acc, p) => acc + (p.stock * p.costoImportadora), 0);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total SKUs</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{totalProductos}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Stock Bajo</p>
          <p className="text-2xl font-bold text-amber-600">{stockBajo}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Sin Stock</p>
          <p className="text-2xl font-bold text-red-600">{sinStock}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Valor Inventario</p>
          <p className="text-2xl font-bold text-emerald-600">${(valorInventario / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Solicitudes</p>
          <p className="text-2xl font-bold text-blue-600">{solicitudes.filter(s => s.estado !== 'recibida').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Tabla de Inventario */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Stock por Producto</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">
              <Upload size={16} />Solicitar Reposición
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="p-4">SKU</th>
                <th className="p-4">Producto</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-right">Costo</th>
                <th className="p-4 text-right">Precio</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {inventario.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{item.nombre}</p>
                    <p className="text-xs text-slate-400">{item.categoria}</p>
                  </td>
                  <td className="p-4 text-center">
                    <p className={`text-lg font-bold ${item.stock <= item.stockMinimo ? 'text-red-600' : 'text-slate-800'}`}>{item.stock}</p>
                    <p className="text-[10px] text-slate-400">mín: {item.stockMinimo}</p>
                  </td>
                  <td className="p-4 text-right text-slate-600">${item.costoImportadora.toLocaleString()}</td>
                  <td className="p-4 text-right font-semibold text-slate-800">${item.precioVenta.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[item.estado]}`}>
                      {item.estado === 'stock_bajo' ? 'Stock Bajo' : item.estado === 'sin_stock' ? 'Sin Stock' : 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Solicitudes de Reposición */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <h3 className="font-semibold text-slate-800">Solicitudes Activas</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {solicitudes.map(sol => (
              <div key={sol.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: tienda.color }}>{sol.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    sol.estado === 'pendiente' ? 'bg-amber-50 text-amber-700' :
                    sol.estado === 'aprobada' ? 'bg-blue-50 text-blue-700' :
                    sol.estado === 'en_preparacion' ? 'bg-purple-50 text-purple-700' :
                    sol.estado === 'enviada' ? 'bg-cyan-50 text-cyan-700' :
                    'bg-green-50 text-green-700'
                  }`}>{sol.estado.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{sol.productos.length} producto(s)</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Estimado: ${(sol.montoEstimado / 1000).toFixed(0)}K</span>
                  {sol.fechaEstimadaEntrega && <span className="text-slate-500">ETA: {sol.fechaEstimadaEntrega}</span>}
                </div>
              </div>
            ))}
            {solicitudes.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <Box size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Sin solicitudes activas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ FINANZAS TAB ============
const FinanzasTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const finanzas = FINANZAS_TIENDA[tienda.slug];
  
  if (!finanzas) return <div className="text-center text-slate-400 py-12">Sin datos financieros</div>;

  const margenPct = ((finanzas.margenBruto / finanzas.ingresosBrutos) * 100).toFixed(1);
  const ebitdaPct = ((finanzas.ebitda / finanzas.ingresosBrutos) * 100).toFixed(1);
  const netoPct = ((finanzas.resultadoNeto / finanzas.ingresosBrutos) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* KPIs Financieros */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Ingresos Brutos</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>${(finanzas.ingresosBrutos / 1000000).toFixed(2)}M</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Margen Bruto</p>
          <p className="text-2xl font-bold text-emerald-600">{margenPct}%</p>
          <p className="text-xs text-slate-400">${(finanzas.margenBruto / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">EBITDA</p>
          <p className="text-2xl font-bold text-blue-600">{ebitdaPct}%</p>
          <p className="text-xs text-slate-400">${(finanzas.ebitda / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Resultado Neto</p>
          <p className="text-2xl font-bold text-green-600">${(finanzas.resultadoNeto / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600">{netoPct}% margen</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Deuda Importadora</p>
          <p className={`text-2xl font-bold ${finanzas.deudaImportadora > 0 ? 'text-amber-600' : 'text-green-600'}`}>
            {finanzas.deudaImportadora > 0 ? `$${(finanzas.deudaImportadora / 1000).toFixed(0)}K` : '✓ Al día'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* P&L Simplificado */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-4">P&L Mensual - {finanzas.mes}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Ingresos Brutos</span>
              <span className="font-semibold text-slate-800">${finanzas.ingresosBrutos.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">(−) Costo Mercadería</span>
              <span className="font-semibold text-red-600">−${finanzas.costoMercaderia.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 bg-slate-50 -mx-6 px-6">
              <span className="text-sm font-semibold text-slate-700">= Margen Bruto</span>
              <span className="font-bold text-emerald-600">${finanzas.margenBruto.toLocaleString()}</span>
            </div>
            {finanzas.gastosOperativos.map((gasto, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <span className="text-xs text-slate-500">(−) {gasto.concepto}</span>
                <span className="text-sm text-red-500">−${gasto.monto.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-sm text-slate-600">(−) Total Gastos Op.</span>
              <span className="font-semibold text-red-600">−${finanzas.totalGastosOperativos.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 bg-blue-50 -mx-6 px-6">
              <span className="text-sm font-semibold text-blue-700">= EBITDA</span>
              <span className="font-bold text-blue-700">${finanzas.ebitda.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600">(−) Impuestos</span>
              <span className="font-semibold text-red-600">−${finanzas.impuestos.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 bg-green-50 -mx-6 px-6 rounded-b-lg">
              <span className="text-sm font-bold text-green-700">= RESULTADO NETO</span>
              <span className="font-bold text-green-700 text-lg">${finanzas.resultadoNeto.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pagos */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 bg-emerald-50">
              <h3 className="font-semibold text-emerald-800">Pagos Realizados</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {finanzas.pagosRealizados.map((pago, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{pago.concepto}</p>
                    <p className="text-xs text-slate-400">{pago.fecha}</p>
                  </div>
                  <span className="font-semibold text-emerald-600">${pago.monto.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 bg-amber-50">
              <h3 className="font-semibold text-amber-800">Próximos Pagos</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {finanzas.proximosPagos.map((pago, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{pago.concepto}</p>
                    <p className="text-xs text-slate-400">{pago.fecha}</p>
                  </div>
                  <span className="font-semibold text-amber-600">${pago.monto.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ POSTVENTA TAB ============
const PostventaTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const casos = CASOS_POSTVENTA[tienda.slug] || [];
  
  const tipoColors: Record<string, string> = {
    devolucion: 'bg-purple-50 text-purple-700',
    garantia: 'bg-red-50 text-red-700',
    reclamo: 'bg-amber-50 text-amber-700',
    cambio: 'bg-blue-50 text-blue-700'
  };
  
  const estadoColors: Record<string, string> = {
    abierto: 'bg-red-50 text-red-700',
    en_proceso: 'bg-amber-50 text-amber-700',
    resuelto: 'bg-green-50 text-green-700',
    cerrado: 'bg-slate-100 text-slate-600'
  };

  const casosAbiertos = casos.filter(c => c.estado === 'abierto' || c.estado === 'en_proceso').length;
  const csatPromedio = casos.filter(c => c.csat).reduce((acc, c) => acc + (c.csat || 0), 0) / casos.filter(c => c.csat).length || 0;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Casos Totales</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{casos.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Casos Abiertos</p>
          <p className="text-2xl font-bold text-amber-600">{casosAbiertos}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Resueltos (Mes)</p>
          <p className="text-2xl font-bold text-green-600">{casos.filter(c => c.estado === 'resuelto' || c.estado === 'cerrado').length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">CSAT Promedio</p>
          <p className="text-2xl font-bold text-emerald-600">{csatPromedio.toFixed(1)}/10</p>
        </div>
      </div>

      {/* Lista de Casos */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Casos de Postventa</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}>
            <Plus size={16} />Nuevo Caso
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Caso</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Producto</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Asignado</th>
              <th className="p-4">CSAT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {casos.map(caso => (
              <tr key={caso.id} className="hover:bg-slate-50 cursor-pointer">
                <td className="p-4">
                  <p className="font-semibold" style={{ color: tienda.color }}>{caso.id}</p>
                  <p className="text-xs text-slate-400">{caso.fecha}</p>
                </td>
                <td className="p-4 text-slate-700">{caso.cliente}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tipoColors[caso.tipo]}`}>
                    {caso.tipo.charAt(0).toUpperCase() + caso.tipo.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-slate-700 text-sm">{caso.producto}</p>
                  <p className="text-xs text-slate-400">{caso.motivo}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${estadoColors[caso.estado]}`}>
                    {caso.estado.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-slate-600 text-sm">{caso.asignado}</td>
                <td className="p-4">
                  {caso.csat ? (
                    <div className="flex items-center gap-1">
                      <Star size={14} className={caso.csat >= 8 ? 'text-green-500 fill-green-500' : caso.csat >= 6 ? 'text-amber-500 fill-amber-500' : 'text-red-500 fill-red-500'} />
                      <span className="font-medium">{caso.csat}</span>
                    </div>
                  ) : <span className="text-slate-300">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ MARKETING TAB ============
const MarketingTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const contenidos = MARKETING_TIENDA[tienda.slug] || [];
  
  const tipoIcons: Record<string, string> = {
    post: '📸',
    reel: '🎬',
    story: '📱',
    email: '📧',
    ad: '📢'
  };
  
  const estadoColors: Record<string, string> = {
    publicado: 'bg-green-50 text-green-700',
    programado: 'bg-blue-50 text-blue-700',
    borrador: 'bg-slate-100 text-slate-600',
    aprobacion: 'bg-amber-50 text-amber-700'
  };

  const publicados = contenidos.filter(c => c.estado === 'publicado');
  const totalReach = publicados.reduce((acc, c) => acc + (c.engagement?.reach || 0), 0);
  const totalEngagement = publicados.reduce((acc, c) => acc + (c.engagement?.likes || 0) + (c.engagement?.comments || 0) + (c.engagement?.shares || 0), 0);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Contenidos (Mes)</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{contenidos.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Publicados</p>
          <p className="text-2xl font-bold text-green-600">{publicados.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Alcance Total</p>
          <p className="text-2xl font-bold text-blue-600">{(totalReach / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Engagement</p>
          <p className="text-2xl font-bold text-purple-600">{totalEngagement}</p>
        </div>
      </div>

      {/* Calendario y Lista */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Plan de Contenidos</h3>
            <span className="text-xs text-slate-500">Asignado desde Marketing Central</span>
          </div>
          <div className="divide-y divide-slate-50">
            {contenidos.map(cont => (
              <div key={cont.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{tipoIcons[cont.tipo]}</span>
                  <div>
                    <p className="font-medium text-slate-800">{cont.titulo}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{cont.fecha}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{cont.plataforma}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {cont.engagement && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{cont.engagement.reach.toLocaleString()} reach</p>
                      <p className="text-xs text-slate-400">{cont.engagement.likes} likes · {cont.engagement.comments} comments</p>
                    </div>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[cont.estado]}`}>
                    {cont.estado.charAt(0).toUpperCase() + cont.estado.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Asignado */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Avatar Digital</h3>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl" style={{ backgroundColor: tienda.colorSecundario }}>
              {tienda.slug === 'pet-vogue' ? '👩‍🦰' : tienda.slug === 'coresmart' ? '🧑‍💻' : '👩'}
            </div>
            <p className="font-semibold text-slate-800">
              {tienda.slug === 'pet-vogue' ? 'Emma' : tienda.slug === 'coresmart' ? 'Alex Tech' : 'Sofía'}
            </p>
            <p className="text-sm text-slate-500 mb-4">Avatar de {tienda.nombre}</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Contenidos generados</span>
                <span className="font-medium">{contenidos.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Engagement rate</span>
                <span className="font-medium text-green-600">4.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ AGENTES AI TAB ============
const AgentesTab: React.FC<{ tienda: TiendaMinorista }> = ({ tienda }) => {
  const agentes = AGENTES_TIENDA[tienda.slug] || [];
  
  const tipoColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    ventas: { bg: 'from-cyan-50 to-blue-50', text: 'text-cyan-700', icon: MessageSquare },
    soporte: { bg: 'from-purple-50 to-pink-50', text: 'text-purple-700', icon: Shield },
    postventa: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-700', icon: RotateCcw },
    marketing: { bg: 'from-pink-50 to-red-50', text: 'text-pink-700', icon: Sparkles }
  };

  const totalConversaciones = agentes.reduce((acc, a) => acc + a.conversacionesHoy, 0);
  const promedioResolucion = agentes.filter(a => a.resolucionAutomatica > 0).reduce((acc, a) => acc + a.resolucionAutomatica, 0) / agentes.filter(a => a.resolucionAutomatica > 0).length || 0;
  const promedioSatisfaccion = agentes.filter(a => a.satisfaccion > 0).reduce((acc, a) => acc + a.satisfaccion, 0) / agentes.filter(a => a.satisfaccion > 0).length || 0;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Agentes Activos</p>
          <p className="text-2xl font-bold" style={{ color: tienda.color }}>{agentes.filter(a => a.estado === 'online').length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Conversaciones Hoy</p>
          <p className="text-2xl font-bold text-cyan-600">{totalConversaciones}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Resolución Auto.</p>
          <p className="text-2xl font-bold text-green-600">{promedioResolucion.toFixed(0)}%</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Satisfacción</p>
          <p className="text-2xl font-bold text-emerald-600">{promedioSatisfaccion.toFixed(1)}/5</p>
        </div>
      </div>

      {/* Cards de Agentes */}
      <div className="grid grid-cols-3 gap-6">
        {agentes.map(agente => {
          const config = tipoColors[agente.tipo];
          const Icon = config.icon;
          return (
            <div key={agente.id} className={`bg-gradient-to-br ${config.bg} rounded-xl border border-slate-100 p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon size={24} className={config.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{agente.nombre}</h3>
                    <p className="text-xs text-slate-500 capitalize">{agente.tipo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${agente.estado === 'online' ? 'bg-green-500 animate-pulse' : agente.estado === 'entrenamiento' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                  <span className={`text-xs font-medium ${agente.estado === 'online' ? 'text-green-600' : agente.estado === 'entrenamiento' ? 'text-amber-600' : 'text-slate-500'}`}>
                    {agente.estado === 'online' ? 'Online' : agente.estado === 'entrenamiento' ? 'Entrenando' : 'Offline'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Conversaciones</p>
                  <p className={`text-xl font-bold ${config.text}`}>{agente.conversacionesHoy}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Resolución</p>
                  <p className={`text-xl font-bold ${config.text}`}>{agente.resolucionAutomatica}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Tiempo respuesta</span>
                  <span className="font-medium text-slate-700">{agente.tiempoRespuestaPromedio}s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Satisfacción</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-700">{agente.satisfaccion}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Escalaciones</span>
                  <span className={`font-medium ${agente.escalaciones > 5 ? 'text-amber-600' : 'text-slate-700'}`}>{agente.escalaciones}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Configurar Agente
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TiendaPage;
