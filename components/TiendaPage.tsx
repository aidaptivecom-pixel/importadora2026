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

const TiendaPage: React.FC&lt;TiendaPageProps&gt; = ({ tienda, onNavigate }) => {
  const [activeTab, setActiveTab] = useState&lt;TabType&gt;('dashboard');
  
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
        return &lt;DashboardTab tienda={tienda} metricas={metricas} alertas={alertas} proyeccion={proyeccion} /&gt;;
      case 'inbox':
        return &lt;InboxTab tienda={tienda} /&gt;;
      case 'ventas':
        return &lt;VentasTab tienda={tienda} /&gt;;
      case 'clientes':
        return &lt;ClientesTab tienda={tienda} /&gt;;
      case 'inventario':
        return &lt;InventarioTab tienda={tienda} /&gt;;
      case 'finanzas':
        return &lt;FinanzasTab tienda={tienda} /&gt;;
      case 'postventa':
        return &lt;PostventaTab tienda={tienda} /&gt;;
      case 'marketing':
        return &lt;MarketingTab tienda={tienda} /&gt;;
      case 'agentes':
        return &lt;AgentesTab tienda={tienda} /&gt;;
      default:
        return null;
    }
  };

  return (
    &lt;div className="space-y-6"&gt;
      {/* Header de Tienda */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
        &lt;div className="p-6" style={{ backgroundColor: tienda.colorSecundario }}&gt;
          &lt;div className="flex items-center justify-between"&gt;
            &lt;div className="flex items-center gap-4"&gt;
              &lt;div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-sm"&gt;
                {tienda.logo}
              &lt;/div&gt;
              &lt;div&gt;
                &lt;div className="flex items-center gap-3"&gt;
                  &lt;h1 className="text-2xl font-bold text-slate-800"&gt;{tienda.nombre}&lt;/h1&gt;
                  &lt;span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700"&gt;
                    {tienda.estado === 'activa' ? '● Activa' : tienda.estado}
                  &lt;/span&gt;
                &lt;/div&gt;
                &lt;p className="text-slate-600 mt-1"&gt;{tienda.descripcion}&lt;/p&gt;
                &lt;div className="flex items-center gap-3 mt-2"&gt;
                  {tienda.plataformas.map(plat =&gt; (
                    &lt;span key={plat} className="text-xs bg-white/60 text-slate-600 px-2 py-1 rounded"&gt;{plat}&lt;/span&gt;
                  ))}
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center gap-3"&gt;
              &lt;button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"&gt;
                &lt;ExternalLink size={16} /&gt;Ver Tienda
              &lt;/button&gt;
              &lt;button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: tienda.color }}&gt;
                &lt;Settings size={16} /&gt;Configurar
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        
        {/* Tabs de navegación */}
        &lt;div className="border-t border-slate-100 px-4"&gt;
          &lt;div className="flex items-center gap-1 overflow-x-auto"&gt;
            {tabs.map(tab =&gt; {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                &lt;button
                  key={tab.id}
                  onClick={() =&gt; setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'border-current text-slate-800' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                  style={isActive ? { color: tienda.color, borderColor: tienda.color } : {}}
                &gt;
                  &lt;Icon size={16} /&gt;
                  {tab.label}
                  {tab.badge &amp;&amp; tab.badge &gt; 0 &amp;&amp; (
                    &lt;span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white"&gt;
                      {tab.badge}
                    &lt;/span&gt;
                  )}
                &lt;/button&gt;
              );
            })}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Contenido del tab activo */}
      {renderContent()}
    &lt;/div&gt;
  );
};

// ============ DASHBOARD TAB ============
const DashboardTab: React.FC&lt;{ tienda: TiendaMinorista; metricas: any[]; alertas: any[]; proyeccion: any }&gt; = ({ tienda, metricas, alertas, proyeccion }) =&gt; {
  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-6 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Ingresos Mes&lt;/p&gt;
          &lt;p className="text-xl font-bold" style={{ color: tienda.color }}&gt;${(tienda.ingresosMes / 1000000).toFixed(2)}M&lt;/p&gt;
          &lt;p className={`text-xs flex items-center gap-1 mt-1 ${tienda.crecimientoMes &gt; 0 ? 'text-green-600' : 'text-red-600'}`}&gt;
            {tienda.crecimientoMes &gt; 0 ? &lt;ArrowUpRight size={12} /&gt; : &lt;ArrowDownRight size={12} /&gt;}
            {tienda.crecimientoMes &gt; 0 ? '+' : ''}{tienda.crecimientoMes}%
          &lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Ventas Mes&lt;/p&gt;
          &lt;p className="text-xl font-bold text-slate-800"&gt;{tienda.ventasMes}&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;pedidos completados&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Ticket Promedio&lt;/p&gt;
          &lt;p className="text-xl font-bold text-slate-800"&gt;${tienda.ticketPromedio.toLocaleString()}&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;por venta&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Clientes&lt;/p&gt;
          &lt;p className="text-xl font-bold text-slate-800"&gt;{tienda.clientesActivos}&lt;/p&gt;
          &lt;p className="text-xs text-green-600"&gt;+{tienda.nuevosClientesMes} nuevos&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Productos&lt;/p&gt;
          &lt;p className="text-xl font-bold text-slate-800"&gt;{tienda.productosActivos}&lt;/p&gt;
          &lt;p className={`text-xs ${tienda.stockCritico &gt; 0 ? 'text-amber-600' : 'text-green-600'}`}&gt;
            {tienda.stockCritico &gt; 0 ? `${tienda.stockCritico} stock bajo` : '✓ Stock OK'}
          &lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Meta Mes&lt;/p&gt;
          &lt;p className="text-xl font-bold" style={{ color: proyeccion?.cumplimiento &gt;= 100 ? '#10b981' : tienda.color }}&gt;
            {proyeccion?.cumplimiento || 0}%
          &lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;${((proyeccion?.metaMes || 0) / 1000000).toFixed(1)}M objetivo&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Gráficos */}
      &lt;div className="grid grid-cols-3 gap-6"&gt;
        &lt;div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6"&gt;
          &lt;div className="flex items-center justify-between mb-6"&gt;
            &lt;div&gt;
              &lt;h2 className="text-lg font-semibold text-slate-800"&gt;Tendencia de Ingresos&lt;/h2&gt;
              &lt;p className="text-sm text-slate-500"&gt;Últimos 7 días&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div className="h-[250px]"&gt;
            &lt;ResponsiveContainer width="100%" height="100%"&gt;
              &lt;AreaChart data={metricas}&gt;
                &lt;defs&gt;
                  &lt;linearGradient id={`color${tienda.slug}`} x1="0" y1="0" x2="0" y2="1"&gt;
                    &lt;stop offset="5%" stopColor={tienda.color} stopOpacity={0.2}/&gt;
                    &lt;stop offset="95%" stopColor={tienda.color} stopOpacity={0}/&gt;
                  &lt;/linearGradient&gt;
                &lt;/defs&gt;
                &lt;CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /&gt;
                &lt;XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) =&gt; v.split('-')[2]} /&gt;
                &lt;YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) =&gt; `$${(v/1000).toFixed(0)}K`} /&gt;
                &lt;Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(value: number) =&gt; [`$${value.toLocaleString()}`, 'Ingresos']} /&gt;
                &lt;Area type="monotone" dataKey="ingresos" stroke={tienda.color} strokeWidth={3} fillOpacity={1} fill={`url(#color${tienda.slug})`} /&gt;
              &lt;/AreaChart&gt;
            &lt;/ResponsiveContainer&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
          &lt;div className="p-4 border-b border-slate-50" style={{ backgroundColor: tienda.colorSecundario }}&gt;
            &lt;div className="flex items-center gap-2"&gt;
              &lt;AlertTriangle size={18} style={{ color: tienda.color }} /&gt;
              &lt;h2 className="font-semibold text-slate-800"&gt;Estado de la Tienda&lt;/h2&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div className="p-4 space-y-2"&gt;
            {[
              { icon: Package, label: 'Stock Crítico', value: tienda.stockCritico, bad: tienda.stockCritico &gt; 0 },
              { icon: MessageSquare, label: 'Tickets Abiertos', value: tienda.ticketsAbiertos, bad: tienda.ticketsAbiertos &gt; 0 },
              { icon: RotateCcw, label: 'Devoluciones', value: tienda.devolucionesPendientes, bad: tienda.devolucionesPendientes &gt; 0 },
              { icon: Shield, label: 'Garantías', value: tienda.garantiasPendientes, bad: tienda.garantiasPendientes &gt; 0 },
            ].map((item, idx) =&gt; (
              &lt;div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50"&gt;
                &lt;div className="flex items-center gap-2"&gt;
                  &lt;item.icon size={14} className="text-slate-500" /&gt;
                  &lt;span className="text-sm text-slate-600"&gt;{item.label}&lt;/span&gt;
                &lt;/div&gt;
                &lt;span className={`text-sm font-semibold ${item.bad ? 'text-amber-600' : 'text-green-600'}`}&gt;{item.value}&lt;/span&gt;
              &lt;/div&gt;
            ))}
            {alertas.length &gt; 0 &amp;&amp; (
              &lt;div className="border-t border-slate-100 pt-3 mt-3"&gt;
                &lt;p className="text-xs font-semibold text-slate-500 mb-2"&gt;ALERTAS ACTIVAS&lt;/p&gt;
                {alertas.slice(0, 3).map(alerta =&gt; (
                  &lt;div key={alerta.id} className="flex items-start gap-2 mb-1"&gt;
                    &lt;div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${alerta.prioridad === 'alta' ? 'bg-red-500' : 'bg-amber-500'}`} /&gt;
                    &lt;p className="text-xs text-slate-600"&gt;{alerta.mensaje}&lt;/p&gt;
                  &lt;/div&gt;
                ))}
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Agentes AI y Cuenta Importadora */}
      &lt;div className="grid grid-cols-2 gap-6"&gt;
        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"&gt;
          &lt;div className="flex items-center justify-between mb-4"&gt;
            &lt;div className="flex items-center gap-2"&gt;
              &lt;Bot size={20} className="text-cyan-500" /&gt;
              &lt;h2 className="font-semibold text-slate-800"&gt;Agentes AI&lt;/h2&gt;
            &lt;/div&gt;
            &lt;span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full"&gt;{tienda.agentesActivos} activos&lt;/span&gt;
          &lt;/div&gt;
          &lt;div className="grid grid-cols-2 gap-4"&gt;
            {['Ventas', 'Soporte'].map((tipo, idx) =&gt; (
              &lt;div key={tipo} className={`p-4 rounded-xl ${idx === 0 ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100'}`}&gt;
                &lt;div className="flex items-center gap-2 mb-2"&gt;
                  {idx === 0 ? &lt;MessageSquare size={16} className="text-cyan-600" /&gt; : &lt;Shield size={16} className="text-purple-600" /&gt;}
                  &lt;span className="text-sm font-medium text-slate-700"&gt;Agente {tipo}&lt;/span&gt;
                &lt;/div&gt;
                &lt;p className={`text-2xl font-bold ${idx === 0 ? 'text-cyan-700' : 'text-purple-700'}`}&gt;{Math.floor(tienda.conversacionesHoy * (idx === 0 ? 0.6 : 0.4))}&lt;/p&gt;
                &lt;p className="text-xs text-slate-500"&gt;conversaciones hoy&lt;/p&gt;
                &lt;div className="mt-2 flex items-center gap-1"&gt;
                  &lt;span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /&gt;
                  &lt;span className="text-xs text-green-600"&gt;Online&lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            ))}
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"&gt;
          &lt;div className="flex items-center gap-2 mb-4"&gt;
            &lt;DollarSign size={20} className="text-emerald-500" /&gt;
            &lt;h2 className="font-semibold text-slate-800"&gt;Cuenta con Importadora&lt;/h2&gt;
          &lt;/div&gt;
          &lt;div className="grid grid-cols-2 gap-4 mb-4"&gt;
            &lt;div className="p-4 rounded-xl bg-emerald-50"&gt;
              &lt;p className="text-xs text-emerald-600 mb-1"&gt;Compras Acumuladas&lt;/p&gt;
              &lt;p className="text-2xl font-bold text-emerald-700"&gt;${(tienda.comprasAcumuladas / 1000).toFixed(0)}K&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className={`p-4 rounded-xl ${tienda.deudaImportadora &gt; 0 ? 'bg-amber-50' : 'bg-green-50'}`}&gt;
              &lt;p className={`text-xs mb-1 ${tienda.deudaImportadora &gt; 0 ? 'text-amber-600' : 'text-green-600'}`}&gt;Saldo Pendiente&lt;/p&gt;
              &lt;p className={`text-2xl font-bold ${tienda.deudaImportadora &gt; 0 ? 'text-amber-700' : 'text-green-700'}`}&gt;
                {tienda.deudaImportadora &gt; 0 ? `$${(tienda.deudaImportadora / 1000).toFixed(1)}K` : '✓ Al día'}
              &lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div className="flex items-center justify-between text-sm mb-4"&gt;
            &lt;span className="text-slate-500"&gt;Última compra:&lt;/span&gt;
            &lt;span className="font-medium text-slate-700"&gt;{tienda.ultimaCompra}&lt;/span&gt;
          &lt;/div&gt;
          &lt;button className="w-full py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"&gt;
            Solicitar mercadería
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ INBOX TAB ============
const InboxTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const mensajes = INBOX_TIENDA[tienda.slug] || [];
  const stats = INBOX_STATS[tienda.slug];
  const [filtroCanal, setFiltroCanal] = useState&lt;string&gt;('');
  const [filtroEstado, setFiltroEstado] = useState&lt;string&gt;('');
  const [busqueda, setBusqueda] = useState&lt;string&gt;('');
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState&lt;MensajeInbox | null&gt;(null);
  const [nuevoMensaje, setNuevoMensaje] = useState&lt;string&gt;('');
  const chatContainerRef = useRef&lt;HTMLDivElement&gt;(null);

  // Obtener historial de chat de la conversación seleccionada
  const conversacionActual = mensajeSeleccionado 
    ? CONVERSACIONES_CHAT[mensajeSeleccionado.conversacionId] || []
    : [];

  // Scroll al final del chat cuando cambia la conversación
  useEffect(() =&gt; {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajeSeleccionado, conversacionActual]);

  const mensajesFiltrados = mensajes.filter(m =&gt; {
    if (filtroCanal &amp;&amp; m.canal !== filtroCanal) return false;
    if (filtroEstado &amp;&amp; m.estado !== filtroEstado) return false;
    if (busqueda &amp;&amp; !m.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) &amp;&amp; !m.ultimoMensaje.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const canalIcons: Record&lt;string, { icon: React.ElementType; color: string; bg: string }&gt; = {
    whatsapp: { icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
    instagram: { icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    mercadolibre: { icon: ShoppingCart, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    email: { icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
    web_chat: { icon: Globe, color: 'text-slate-600', bg: 'bg-slate-100' },
    facebook: { icon: Facebook, color: 'text-blue-700', bg: 'bg-blue-50' }
  };

  const estadoColors: Record&lt;string, { bg: string; text: string; label: string }&gt; = {
    nuevo: { bg: 'bg-red-50', text: 'text-red-700', label: 'Nuevo' },
    en_proceso: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En proceso' },
    respondido: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Respondido' },
    esperando_cliente: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Esperando' },
    cerrado: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Cerrado' }
  };

  const sentimientoIcons: Record&lt;string, { icon: React.ElementType; color: string }&gt; = {
    positivo: { icon: Smile, color: 'text-green-500' },
    neutral: { icon: Meh, color: 'text-slate-400' },
    negativo: { icon: Frown, color: 'text-red-500' }
  };

  const handleEnviarMensaje = () =&gt; {
    if (!nuevoMensaje.trim() || !mensajeSeleccionado) return;
    // En producción, esto enviaría el mensaje al backend
    console.log('Enviando mensaje:', nuevoMensaje, 'a conversación:', mensajeSeleccionado.conversacionId);
    setNuevoMensaje('');
  };

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs de Inbox */}
      &lt;div className="grid grid-cols-6 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Total Conversaciones&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{stats?.totalConversaciones || 0}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Nuevas&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-red-600"&gt;{stats?.nuevas || 0}&lt;/p&gt;
          &lt;p className="text-xs text-red-500"&gt;requieren atención&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;En Proceso&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-amber-600"&gt;{stats?.enProceso || 0}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Tiempo Respuesta&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-blue-600"&gt;{stats?.tiempoPromedioRespuesta || 0}m&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;promedio&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Resolución 1er Contacto&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;{stats?.resolucionPrimerContacto || 0}%&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Satisfacción&lt;/p&gt;
          &lt;div className="flex items-center gap-1"&gt;
            &lt;Star size={18} className="text-amber-400 fill-amber-400" /&gt;
            &lt;p className="text-2xl font-bold text-slate-800"&gt;{stats?.satisfaccionPromedio?.toFixed(1) || 0}&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Distribución por Canal */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"&gt;
        &lt;div className="flex items-center justify-between"&gt;
          &lt;div className="flex items-center gap-4"&gt;
            {Object.entries(stats?.porCanal || {}).map(([canal, count]) =&gt; {
              const config = canalIcons[canal];
              const Icon = config?.icon || MessageSquare;
              return (
                &lt;button
                  key={canal}
                  onClick={() =&gt; setFiltroCanal(filtroCanal === canal ? '' : canal)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    filtroCanal === canal ? 'ring-2 ring-offset-1' : 'hover:bg-slate-50'
                  } ${config?.bg || 'bg-slate-50'}`}
                  style={filtroCanal === canal ? { ringColor: tienda.color } : {}}
                &gt;
                  &lt;Icon size={16} className={config?.color || 'text-slate-500'} /&gt;
                  &lt;span className="text-sm font-medium text-slate-700 capitalize"&gt;{canal.replace('_', ' ')}&lt;/span&gt;
                  &lt;span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${config?.bg || 'bg-slate-100'} ${config?.color || 'text-slate-600'}`}&gt;
                    {count}
                  &lt;/span&gt;
                &lt;/button&gt;
              );
            })}
          &lt;/div&gt;
          &lt;div className="flex items-center gap-2"&gt;
            &lt;div className="relative"&gt;
              &lt;Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /&gt;
              &lt;input
                type="text"
                placeholder="Buscar conversación..."
                value={busqueda}
                onChange={(e) =&gt; setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64"
              /&gt;
            &lt;/div&gt;
            &lt;select
              value={filtroEstado}
              onChange={(e) =&gt; setFiltroEstado(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            &gt;
              &lt;option value=""&gt;Todos los estados&lt;/option&gt;
              &lt;option value="nuevo"&gt;Nuevos&lt;/option&gt;
              &lt;option value="en_proceso"&gt;En proceso&lt;/option&gt;
              &lt;option value="respondido"&gt;Respondidos&lt;/option&gt;
              &lt;option value="esperando_cliente"&gt;Esperando cliente&lt;/option&gt;
              &lt;option value="cerrado"&gt;Cerrados&lt;/option&gt;
            &lt;/select&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Lista de Conversaciones + Chat */}
      &lt;div className="grid grid-cols-5 gap-6"&gt;
        {/* Lista de conversaciones */}
        &lt;div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
          &lt;div className="p-4 border-b border-slate-50 flex items-center justify-between"&gt;
            &lt;div className="flex items-center gap-2"&gt;
              &lt;Inbox size={18} style={{ color: tienda.color }} /&gt;
              &lt;h3 className="font-semibold text-slate-800"&gt;Conversaciones&lt;/h3&gt;
              &lt;span className="text-xs text-slate-400"&gt;({mensajesFiltrados.length})&lt;/span&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto"&gt;
            {mensajesFiltrados.map(mensaje =&gt; {
              const canalConfig = canalIcons[mensaje.canal];
              const CanalIcon = canalConfig?.icon || MessageSquare;
              const estadoConfig = estadoColors[mensaje.estado];
              const sentConfig = mensaje.sentimiento ? sentimientoIcons[mensaje.sentimiento] : null;
              const SentIcon = sentConfig?.icon || Meh;
              const isSelected = mensajeSeleccionado?.id === mensaje.id;

              return (
                &lt;div
                  key={mensaje.id}
                  onClick={() =&gt; setMensajeSeleccionado(mensaje)}
                  className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-slate-50 border-l-4' : ''
                  } ${mensaje.estado === 'nuevo' ? 'bg-red-50/30' : ''}`}
                  style={isSelected ? { borderLeftColor: tienda.color } : {}}
                &gt;
                  &lt;div className="flex items-start gap-3"&gt;
                    {/* Avatar/Canal */}
                    &lt;div className="relative"&gt;
                      &lt;div className={`w-10 h-10 rounded-full flex items-center justify-center ${canalConfig?.bg || 'bg-slate-100'}`}&gt;
                        &lt;CanalIcon size={18} className={canalConfig?.color || 'text-slate-500'} /&gt;
                      &lt;/div&gt;
                      {mensaje.mensajesSinLeer &gt; 0 &amp;&amp; (
                        &lt;span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"&gt;
                          {mensaje.mensajesSinLeer}
                        &lt;/span&gt;
                      )}
                    &lt;/div&gt;

                    {/* Contenido */}
                    &lt;div className="flex-1 min-w-0"&gt;
                      &lt;div className="flex items-center justify-between mb-1"&gt;
                        &lt;div className="flex items-center gap-2"&gt;
                          &lt;span className={`font-semibold text-sm ${mensaje.estado === 'nuevo' ? 'text-slate-900' : 'text-slate-700'}`}&gt;
                            {mensaje.cliente.nombre}
                          &lt;/span&gt;
                          {mensaje.prioridad === 'alta' &amp;&amp; (
                            &lt;span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-semibold"&gt;URGENTE&lt;/span&gt;
                          )}
                        &lt;/div&gt;
                        &lt;span className="text-xs text-slate-400"&gt;{mensaje.horaUltimoMensaje}&lt;/span&gt;
                      &lt;/div&gt;

                      &lt;p className={`text-sm truncate ${mensaje.estado === 'nuevo' ? 'text-slate-800 font-medium' : 'text-slate-500'}`}&gt;
                        {mensaje.ultimoMensaje}
                      &lt;/p&gt;

                      &lt;div className="flex items-center gap-2 mt-2"&gt;
                        &lt;span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${estadoConfig.bg} ${estadoConfig.text}`}&gt;
                          {estadoConfig.label}
                        &lt;/span&gt;
                        {mensaje.asignado !== 'Sin asignar' &amp;&amp; (
                          &lt;span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"&gt;
                            {mensaje.asignado === 'Agente AI' ? '🤖' : '👤'} {mensaje.asignado}
                          &lt;/span&gt;
                        )}
                      &lt;/div&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
              );
            })}
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Panel de Chat */}
        &lt;div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"&gt;
          {mensajeSeleccionado ? (
            &lt;&gt;
              {/* Header del Chat */}
              &lt;div className="p-4 border-b border-slate-100" style={{ backgroundColor: tienda.colorSecundario }}&gt;
                &lt;div className="flex items-center justify-between"&gt;
                  &lt;div className="flex items-center gap-3"&gt;
                    &lt;div className={`w-10 h-10 rounded-full flex items-center justify-center ${canalIcons[mensajeSeleccionado.canal]?.bg || 'bg-slate-100'}`}&gt;
                      {React.createElement(canalIcons[mensajeSeleccionado.canal]?.icon || MessageSquare, {
                        size: 18,
                        className: canalIcons[mensajeSeleccionado.canal]?.color || 'text-slate-500'
                      })}
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;p className="font-semibold text-slate-800"&gt;{mensajeSeleccionado.cliente.nombre}&lt;/p&gt;
                      &lt;div className="flex items-center gap-2"&gt;
                        &lt;p className="text-xs text-slate-500 capitalize"&gt;{mensajeSeleccionado.canal.replace('_', ' ')}&lt;/p&gt;
                        {mensajeSeleccionado.pedidoRelacionado &amp;&amp; (
                          &lt;span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"&gt;
                            📦 {mensajeSeleccionado.pedidoRelacionado}
                          &lt;/span&gt;
                        )}
                      &lt;/div&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                  &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className={`text-xs px-2 py-1 rounded-full font-semibold ${estadoColors[mensajeSeleccionado.estado].bg} ${estadoColors[mensajeSeleccionado.estado].text}`}&gt;
                      {estadoColors[mensajeSeleccionado.estado].label}
                    &lt;/span&gt;
                    &lt;span className={`text-xs px-2 py-1 rounded-full ${
                      mensajeSeleccionado.asignado === 'Agente AI' ? 'bg-cyan-50 text-cyan-700' : 'bg-purple-50 text-purple-700'
                    }`}&gt;
                      {mensajeSeleccionado.asignado === 'Agente AI' ? '🤖 Agente AI' : '👤 Humano'}
                    &lt;/span&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;

              {/* Área de Mensajes */}
              &lt;div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                style={{ maxHeight: '400px', minHeight: '400px' }}
              &gt;
                {conversacionActual.length === 0 ? (
                  &lt;div className="flex items-center justify-center h-full text-slate-400"&gt;
                    &lt;p className="text-sm"&gt;No hay mensajes en esta conversación&lt;/p&gt;
                  &lt;/div&gt;
                ) : (
                  conversacionActual.map((msg) =&gt; (
                    &lt;div
                      key={msg.id}
                      className={`flex ${msg.tipo === 'saliente' ? 'justify-end' : 'justify-start'}`}
                    &gt;
                      &lt;div className={`max-w-[75%] ${msg.tipo === 'saliente' ? 'order-2' : 'order-1'}`}&gt;
                        {/* Autor */}
                        &lt;div className={`flex items-center gap-2 mb-1 ${msg.tipo === 'saliente' ? 'justify-end' : 'justify-start'}`}&gt;
                          {msg.tipo === 'entrante' ? (
                            &lt;User size={12} className="text-slate-400" /&gt;
                          ) : msg.autorTipo === 'agente_ai' ? (
                            &lt;Bot size={12} className="text-cyan-500" /&gt;
                          ) : (
                            &lt;UserCheck size={12} className="text-purple-500" /&gt;
                          )}
                          &lt;span className={`text-xs ${
                            msg.autorTipo === 'cliente' ? 'text-slate-500' :
                            msg.autorTipo === 'agente_ai' ? 'text-cyan-600' : 'text-purple-600'
                          }`}&gt;
                            {msg.autor}
                          &lt;/span&gt;
                          &lt;span className="text-[10px] text-slate-400"&gt;{msg.hora}&lt;/span&gt;
                        &lt;/div&gt;
                        
                        {/* Burbuja de mensaje */}
                        &lt;div
                          className={`rounded-2xl px-4 py-2.5 ${
                            msg.tipo === 'entrante'
                              ? 'bg-white border border-slate-200 rounded-tl-md'
                              : msg.autorTipo === 'agente_ai'
                              ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-tr-md'
                              : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-md'
                          }`}
                        &gt;
                          &lt;p className={`text-sm ${msg.tipo === 'entrante' ? 'text-slate-700' : 'text-white'}`}&gt;
                            {msg.contenido}
                          &lt;/p&gt;
                        &lt;/div&gt;
                        
                        {/* Indicador de leído */}
                        {msg.tipo === 'saliente' &amp;&amp; (
                          &lt;div className="flex justify-end mt-1"&gt;
                            &lt;span className="text-[10px] text-slate-400"&gt;
                              {msg.leido ? '✓✓ Leído' : '✓ Enviado'}
                            &lt;/span&gt;
                          &lt;/div&gt;
                        )}
                      &lt;/div&gt;
                    &lt;/div&gt;
                  ))
                )}
              &lt;/div&gt;

              {/* Input de Mensaje */}
              &lt;div className="p-4 border-t border-slate-100 bg-white"&gt;
                {mensajeSeleccionado.asignado === 'Soporte Humano' || mensajeSeleccionado.estado === 'en_proceso' ? (
                  &lt;div className="flex items-center gap-3"&gt;
                    &lt;div className="flex-1 relative"&gt;
                      &lt;input
                        type="text"
                        value={nuevoMensaje}
                        onChange={(e) =&gt; setNuevoMensaje(e.target.value)}
                        onKeyPress={(e) =&gt; e.key === 'Enter' &amp;&amp; handleEnviarMensaje()}
                        placeholder="Escribí tu mensaje..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm pr-24 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ focusRing: tienda.color }}
                      /&gt;
                      &lt;div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"&gt;
                        &lt;button className="text-slate-400 hover:text-slate-600"&gt;
                          &lt;Paperclip size={18} /&gt;
                        &lt;/button&gt;
                        &lt;button className="text-slate-400 hover:text-slate-600"&gt;
                          &lt;Image size={18} /&gt;
                        &lt;/button&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;button
                      onClick={handleEnviarMensaje}
                      disabled={!nuevoMensaje.trim()}
                      className="px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                      style={{ backgroundColor: tienda.color }}
                    &gt;
                      &lt;Send size={16} /&gt;
                      Enviar
                    &lt;/button&gt;
                  &lt;/div&gt;
                ) : (
                  &lt;div className="flex items-center justify-between bg-slate-50 rounded-xl p-4"&gt;
                    &lt;div className="flex items-center gap-3"&gt;
                      &lt;Bot size={20} className="text-cyan-500" /&gt;
                      &lt;div&gt;
                        &lt;p className="text-sm font-medium text-slate-700"&gt;Conversación manejada por Agente AI&lt;/p&gt;
                        &lt;p className="text-xs text-slate-500"&gt;Podés tomar el control en cualquier momento&lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;button
                      className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors hover:bg-white"
                      style={{ borderColor: tienda.color, color: tienda.color }}
                    &gt;
                      Tomar Control
                    &lt;/button&gt;
                  &lt;/div&gt;
                )}
                
                {/* Acciones rápidas */}
                &lt;div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100"&gt;
                  &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className="text-xs text-slate-500"&gt;Acciones:&lt;/span&gt;
                    &lt;button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"&gt;
                      Escalar
                    &lt;/button&gt;
                    &lt;button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"&gt;
                      Marcar resuelto
                    &lt;/button&gt;
                    &lt;button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"&gt;
                      Agregar etiqueta
                    &lt;/button&gt;
                  &lt;/div&gt;
                  &lt;div className="flex items-center gap-1"&gt;
                    {mensajeSeleccionado.etiquetas.slice(0, 3).map(tag =&gt; (
                      &lt;span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500"&gt;
                        #{tag.toLowerCase().replace(' ', '')}
                      &lt;/span&gt;
                    ))}
                  &lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/&gt;
          ) : (
            &lt;div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '550px' }}&gt;
              &lt;div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: tienda.colorSecundario }}&gt;
                &lt;MessageSquare size={40} style={{ color: tienda.color }} /&gt;
              &lt;/div&gt;
              &lt;p className="text-slate-600 font-medium mb-1"&gt;Seleccioná una conversación&lt;/p&gt;
              &lt;p className="text-sm text-slate-400"&gt;Hacé clic en cualquier mensaje para ver el historial completo&lt;/p&gt;
            &lt;/div&gt;
          )}
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ VENTAS TAB ============
const VentasTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const pedidos = PEDIDOS_TIENDA[tienda.slug] || [];
  const [filtroEstado, setFiltroEstado] = useState&lt;string&gt;('');
  
  const pedidosFiltrados = filtroEstado ? pedidos.filter(p =&gt; p.estado === filtroEstado) : pedidos;
  
  const estadoColors: Record&lt;string, string&gt; = {
    pendiente: 'bg-amber-50 text-amber-700',
    procesando: 'bg-blue-50 text-blue-700',
    enviado: 'bg-purple-50 text-purple-700',
    entregado: 'bg-green-50 text-green-700',
    cancelado: 'bg-red-50 text-red-700'
  };
  
  const estadoIcons: Record&lt;string, React.ElementType&gt; = {
    pendiente: Clock,
    procesando: RefreshCcw,
    enviado: Truck,
    entregado: CheckCircle2,
    cancelado: XCircle
  };

  const totalVentas = pedidos.filter(p =&gt; p.estado !== 'cancelado').reduce((acc, p) =&gt; acc + p.total, 0);
  const pedidosPendientes = pedidos.filter(p =&gt; p.estado === 'pendiente').length;
  const pedidosEnviados = pedidos.filter(p =&gt; p.estado === 'enviado').length;

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs Ventas */}
      &lt;div className="grid grid-cols-4 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Ventas del Día&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;${(totalVentas / 1000).toFixed(0)}K&lt;/p&gt;
          &lt;p className="text-xs text-green-600"&gt;+12% vs ayer&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Pedidos Hoy&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-slate-800"&gt;{pedidos.length}&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;pedidos recibidos&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Pendientes&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-amber-600"&gt;{pedidosPendientes}&lt;/p&gt;
          &lt;p className="text-xs text-amber-600"&gt;requieren acción&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;En Tránsito&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-purple-600"&gt;{pedidosEnviados}&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;en camino&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Filtros */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"&gt;
        &lt;div className="flex items-center justify-between"&gt;
          &lt;div className="flex items-center gap-3"&gt;
            &lt;div className="relative"&gt;
              &lt;Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /&gt;
              &lt;input type="text" placeholder="Buscar pedido..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64" /&gt;
            &lt;/div&gt;
            &lt;select value={filtroEstado} onChange={(e) =&gt; setFiltroEstado(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"&gt;
              &lt;option value=""&gt;Todos los estados&lt;/option&gt;
              &lt;option value="pendiente"&gt;Pendiente&lt;/option&gt;
              &lt;option value="procesando"&gt;Procesando&lt;/option&gt;
              &lt;option value="enviado"&gt;Enviado&lt;/option&gt;
              &lt;option value="entregado"&gt;Entregado&lt;/option&gt;
              &lt;option value="cancelado"&gt;Cancelado&lt;/option&gt;
            &lt;/select&gt;
          &lt;/div&gt;
          &lt;button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}&gt;
            &lt;Plus size={16} /&gt;Nuevo Pedido
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Lista de Pedidos */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
        &lt;table className="w-full text-left"&gt;
          &lt;thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase"&gt;
            &lt;tr&gt;
              &lt;th className="p-4"&gt;Pedido&lt;/th&gt;
              &lt;th className="p-4"&gt;Cliente&lt;/th&gt;
              &lt;th className="p-4"&gt;Productos&lt;/th&gt;
              &lt;th className="p-4"&gt;Canal&lt;/th&gt;
              &lt;th className="p-4 text-right"&gt;Total&lt;/th&gt;
              &lt;th className="p-4"&gt;Estado&lt;/th&gt;
              &lt;th className="p-4"&gt;&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className="divide-y divide-slate-50 text-sm"&gt;
            {pedidosFiltrados.map(pedido =&gt; {
              const Icon = estadoIcons[pedido.estado] || Clock;
              return (
                &lt;tr key={pedido.id} className="hover:bg-slate-50 cursor-pointer"&gt;
                  &lt;td className="p-4"&gt;
                    &lt;p className="font-semibold" style={{ color: tienda.color }}&gt;{pedido.id}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{pedido.fecha}&lt;/p&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;p className="font-medium text-slate-800"&gt;{pedido.cliente}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{pedido.email}&lt;/p&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;p className="text-slate-700"&gt;{pedido.productos.length} producto(s)&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400 truncate max-w-[200px]"&gt;{pedido.productos.map(p =&gt; p.nombre).join(', ')}&lt;/p&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"&gt;{pedido.canal}&lt;/span&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4 text-right font-semibold text-slate-800"&gt;${pedido.total.toLocaleString()}&lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[pedido.estado]}`}&gt;
                      &lt;Icon size={12} /&gt;
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    &lt;/span&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;button className="text-slate-400 hover:text-slate-600"&gt;&lt;MoreHorizontal size={16} /&gt;&lt;/button&gt;
                  &lt;/td&gt;
                &lt;/tr&gt;
              );
            })}
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ CLIENTES TAB ============
const ClientesTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const clientes = CLIENTES_TIENDA[tienda.slug] || [];
  
  const segmentoColors: Record&lt;string, string&gt; = {
    VIP: 'bg-purple-50 text-purple-700 border-purple-200',
    Frecuente: 'bg-blue-50 text-blue-700 border-blue-200',
    Ocasional: 'bg-slate-50 text-slate-600 border-slate-200',
    Nuevo: 'bg-green-50 text-green-700 border-green-200',
    Inactivo: 'bg-red-50 text-red-600 border-red-200'
  };

  const totalClientes = clientes.length;
  const clientesVIP = clientes.filter(c =&gt; c.segmento === 'VIP').length;
  const clientesNuevos = clientes.filter(c =&gt; c.segmento === 'Nuevo').length;
  const npsPromedio = clientes.filter(c =&gt; c.nps).reduce((acc, c) =&gt; acc + (c.nps || 0), 0) / clientes.filter(c =&gt; c.nps).length;

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-4 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Total Clientes&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{totalClientes}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Clientes VIP&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-purple-600"&gt;{clientesVIP}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Nuevos (Mes)&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;{clientesNuevos}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;NPS Promedio&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-emerald-600"&gt;{npsPromedio.toFixed(1)}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Lista de Clientes */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
        &lt;div className="p-4 border-b border-slate-50 flex items-center justify-between"&gt;
          &lt;h3 className="font-semibold text-slate-800"&gt;Base de Clientes&lt;/h3&gt;
          &lt;div className="flex items-center gap-3"&gt;
            &lt;div className="relative"&gt;
              &lt;Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /&gt;
              &lt;input type="text" placeholder="Buscar cliente..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64" /&gt;
            &lt;/div&gt;
            &lt;button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}&gt;
              &lt;Plus size={16} /&gt;Agregar
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;table className="w-full text-left"&gt;
          &lt;thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase"&gt;
            &lt;tr&gt;
              &lt;th className="p-4"&gt;Cliente&lt;/th&gt;
              &lt;th className="p-4"&gt;Segmento&lt;/th&gt;
              &lt;th className="p-4"&gt;Compras&lt;/th&gt;
              &lt;th className="p-4 text-right"&gt;Total Gastado&lt;/th&gt;
              &lt;th className="p-4"&gt;Última Compra&lt;/th&gt;
              &lt;th className="p-4"&gt;NPS&lt;/th&gt;
              &lt;th className="p-4"&gt;Tags&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className="divide-y divide-slate-50 text-sm"&gt;
            {clientes.map(cliente =&gt; (
              &lt;tr key={cliente.id} className="hover:bg-slate-50 cursor-pointer"&gt;
                &lt;td className="p-4"&gt;
                  &lt;div className="flex items-center gap-3"&gt;
                    &lt;div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: tienda.colorSecundario, color: tienda.color }}&gt;
                      {cliente.nombre.split(' ').map(n =&gt; n[0]).join('').slice(0, 2)}
                    &lt;/div&gt;
                    &lt;div&gt;
                      &lt;p className="font-medium text-slate-800"&gt;{cliente.nombre}&lt;/p&gt;
                      &lt;p className="text-xs text-slate-400"&gt;{cliente.email}&lt;/p&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                &lt;/td&gt;
                &lt;td className="p-4"&gt;
                  &lt;span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${segmentoColors[cliente.segmento]}`}&gt;
                    {cliente.segmento}
                  &lt;/span&gt;
                &lt;/td&gt;
                &lt;td className="p-4 text-slate-700"&gt;{cliente.cantidadCompras}&lt;/td&gt;
                &lt;td className="p-4 text-right font-semibold text-slate-800"&gt;${cliente.totalCompras.toLocaleString()}&lt;/td&gt;
                &lt;td className="p-4 text-slate-500"&gt;{cliente.ultimaCompra}&lt;/td&gt;
                &lt;td className="p-4"&gt;
                  {cliente.nps ? (
                    &lt;div className="flex items-center gap-1"&gt;
                      &lt;Star size={14} className="text-amber-400 fill-amber-400" /&gt;
                      &lt;span className="font-medium"&gt;{cliente.nps}&lt;/span&gt;
                    &lt;/div&gt;
                  ) : &lt;span className="text-slate-300"&gt;—&lt;/span&gt;}
                &lt;/td&gt;
                &lt;td className="p-4"&gt;
                  &lt;div className="flex flex-wrap gap-1"&gt;
                    {cliente.tags.slice(0, 2).map(tag =&gt; (
                      &lt;span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"&gt;{tag}&lt;/span&gt;
                    ))}
                  &lt;/div&gt;
                &lt;/td&gt;
              &lt;/tr&gt;
            ))}
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ INVENTARIO TAB ============
const InventarioTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const inventario = INVENTARIO_TIENDA[tienda.slug] || [];
  const solicitudes = SOLICITUDES_REPOSICION[tienda.slug] || [];
  
  const estadoColors: Record&lt;string, string&gt; = {
    disponible: 'bg-green-50 text-green-700',
    stock_bajo: 'bg-amber-50 text-amber-700',
    sin_stock: 'bg-red-50 text-red-700',
    descontinuado: 'bg-slate-100 text-slate-500'
  };

  const totalProductos = inventario.length;
  const stockBajo = inventario.filter(p =&gt; p.estado === 'stock_bajo').length;
  const sinStock = inventario.filter(p =&gt; p.estado === 'sin_stock').length;
  const valorInventario = inventario.reduce((acc, p) =&gt; acc + (p.stock * p.costoImportadora), 0);

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-5 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Total SKUs&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{totalProductos}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Stock Bajo&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-amber-600"&gt;{stockBajo}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Sin Stock&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-red-600"&gt;{sinStock}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Valor Inventario&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-emerald-600"&gt;${(valorInventario / 1000).toFixed(0)}K&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Solicitudes&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-blue-600"&gt;{solicitudes.filter(s =&gt; s.estado !== 'recibida').length}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div className="grid grid-cols-3 gap-6"&gt;
        {/* Tabla de Inventario */}
        &lt;div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
          &lt;div className="p-4 border-b border-slate-50 flex items-center justify-between"&gt;
            &lt;h3 className="font-semibold text-slate-800"&gt;Stock por Producto&lt;/h3&gt;
            &lt;button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"&gt;
              &lt;Upload size={16} /&gt;Solicitar Reposición
            &lt;/button&gt;
          &lt;/div&gt;
          &lt;table className="w-full text-left"&gt;
            &lt;thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase"&gt;
              &lt;tr&gt;
                &lt;th className="p-4"&gt;SKU&lt;/th&gt;
                &lt;th className="p-4"&gt;Producto&lt;/th&gt;
                &lt;th className="p-4 text-center"&gt;Stock&lt;/th&gt;
                &lt;th className="p-4 text-right"&gt;Costo&lt;/th&gt;
                &lt;th className="p-4 text-right"&gt;Precio&lt;/th&gt;
                &lt;th className="p-4"&gt;Estado&lt;/th&gt;
              &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody className="divide-y divide-slate-50 text-sm"&gt;
              {inventario.map(item =&gt; (
                &lt;tr key={item.id} className="hover:bg-slate-50"&gt;
                  &lt;td className="p-4 font-mono text-xs text-slate-500"&gt;{item.sku}&lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;p className="font-medium text-slate-800"&gt;{item.nombre}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{item.categoria}&lt;/p&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4 text-center"&gt;
                    &lt;p className={`text-lg font-bold ${item.stock &lt;= item.stockMinimo ? 'text-red-600' : 'text-slate-800'}`}&gt;{item.stock}&lt;/p&gt;
                    &lt;p className="text-[10px] text-slate-400"&gt;mín: {item.stockMinimo}&lt;/p&gt;
                  &lt;/td&gt;
                  &lt;td className="p-4 text-right text-slate-600"&gt;${item.costoImportadora.toLocaleString()}&lt;/td&gt;
                  &lt;td className="p-4 text-right font-semibold text-slate-800"&gt;${item.precioVenta.toLocaleString()}&lt;/td&gt;
                  &lt;td className="p-4"&gt;
                    &lt;span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[item.estado]}`}&gt;
                      {item.estado === 'stock_bajo' ? 'Stock Bajo' : item.estado === 'sin_stock' ? 'Sin Stock' : 'OK'}
                    &lt;/span&gt;
                  &lt;/td&gt;
                &lt;/tr&gt;
              ))}
            &lt;/tbody&gt;
          &lt;/table&gt;
        &lt;/div&gt;

        {/* Solicitudes de Reposición */}
        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
          &lt;div className="p-4 border-b border-slate-50"&gt;
            &lt;h3 className="font-semibold text-slate-800"&gt;Solicitudes Activas&lt;/h3&gt;
          &lt;/div&gt;
          &lt;div className="divide-y divide-slate-50"&gt;
            {solicitudes.map(sol =&gt; (
              &lt;div key={sol.id} className="p-4"&gt;
                &lt;div className="flex items-center justify-between mb-2"&gt;
                  &lt;span className="text-sm font-semibold" style={{ color: tienda.color }}&gt;{sol.id}&lt;/span&gt;
                  &lt;span className={`text-xs px-2 py-0.5 rounded-full ${
                    sol.estado === 'pendiente' ? 'bg-amber-50 text-amber-700' :
                    sol.estado === 'aprobada' ? 'bg-blue-50 text-blue-700' :
                    sol.estado === 'en_preparacion' ? 'bg-purple-50 text-purple-700' :
                    sol.estado === 'enviada' ? 'bg-cyan-50 text-cyan-700' :
                    'bg-green-50 text-green-700'
                  }`}&gt;{sol.estado.replace('_', ' ')}&lt;/span&gt;
                &lt;/div&gt;
                &lt;p className="text-xs text-slate-500 mb-2"&gt;{sol.productos.length} producto(s)&lt;/p&gt;
                &lt;div className="flex items-center justify-between text-xs"&gt;
                  &lt;span className="text-slate-400"&gt;Estimado: ${(sol.montoEstimado / 1000).toFixed(0)}K&lt;/span&gt;
                  {sol.fechaEstimadaEntrega &amp;&amp; &lt;span className="text-slate-500"&gt;ETA: {sol.fechaEstimadaEntrega}&lt;/span&gt;}
                &lt;/div&gt;
              &lt;/div&gt;
            ))}
            {solicitudes.length === 0 &amp;&amp; (
              &lt;div className="p-8 text-center text-slate-400"&gt;
                &lt;Box size={32} className="mx-auto mb-2 opacity-50" /&gt;
                &lt;p className="text-sm"&gt;Sin solicitudes activas&lt;/p&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ FINANZAS TAB ============
const FinanzasTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const finanzas = FINANZAS_TIENDA[tienda.slug];
  
  if (!finanzas) return &lt;div className="text-center text-slate-400 py-12"&gt;Sin datos financieros&lt;/div&gt;;

  const margenPct = ((finanzas.margenBruto / finanzas.ingresosBrutos) * 100).toFixed(1);
  const ebitdaPct = ((finanzas.ebitda / finanzas.ingresosBrutos) * 100).toFixed(1);
  const netoPct = ((finanzas.resultadoNeto / finanzas.ingresosBrutos) * 100).toFixed(1);

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs Financieros */}
      &lt;div className="grid grid-cols-5 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Ingresos Brutos&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;${(finanzas.ingresosBrutos / 1000000).toFixed(2)}M&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Margen Bruto&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-emerald-600"&gt;{margenPct}%&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;${(finanzas.margenBruto / 1000).toFixed(0)}K&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;EBITDA&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-blue-600"&gt;{ebitdaPct}%&lt;/p&gt;
          &lt;p className="text-xs text-slate-400"&gt;${(finanzas.ebitda / 1000).toFixed(0)}K&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Resultado Neto&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;${(finanzas.resultadoNeto / 1000).toFixed(0)}K&lt;/p&gt;
          &lt;p className="text-xs text-green-600"&gt;{netoPct}% margen&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Deuda Importadora&lt;/p&gt;
          &lt;p className={`text-2xl font-bold ${finanzas.deudaImportadora &gt; 0 ? 'text-amber-600' : 'text-green-600'}`}&gt;
            {finanzas.deudaImportadora &gt; 0 ? `$${(finanzas.deudaImportadora / 1000).toFixed(0)}K` : '✓ Al día'}
          &lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div className="grid grid-cols-2 gap-6"&gt;
        {/* P&L Simplificado */}
        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"&gt;
          &lt;h3 className="font-semibold text-slate-800 mb-4"&gt;P&amp;L Mensual - {finanzas.mes}&lt;/h3&gt;
          &lt;div className="space-y-3"&gt;
            &lt;div className="flex items-center justify-between py-2 border-b border-slate-100"&gt;
              &lt;span className="text-sm text-slate-600"&gt;Ingresos Brutos&lt;/span&gt;
              &lt;span className="font-semibold text-slate-800"&gt;${finanzas.ingresosBrutos.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center justify-between py-2 border-b border-slate-100"&gt;
              &lt;span className="text-sm text-slate-600"&gt;(−) Costo Mercadería&lt;/span&gt;
              &lt;span className="font-semibold text-red-600"&gt;−${finanzas.costoMercaderia.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center justify-between py-2 border-b border-slate-100 bg-slate-50 -mx-6 px-6"&gt;
              &lt;span className="text-sm font-semibold text-slate-700"&gt;= Margen Bruto&lt;/span&gt;
              &lt;span className="font-bold text-emerald-600"&gt;${finanzas.margenBruto.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            {finanzas.gastosOperativos.map((gasto, idx) =&gt; (
              &lt;div key={idx} className="flex items-center justify-between py-1"&gt;
                &lt;span className="text-xs text-slate-500"&gt;(−) {gasto.concepto}&lt;/span&gt;
                &lt;span className="text-sm text-red-500"&gt;−${gasto.monto.toLocaleString()}&lt;/span&gt;
              &lt;/div&gt;
            ))}
            &lt;div className="flex items-center justify-between py-2 border-t border-slate-100"&gt;
              &lt;span className="text-sm text-slate-600"&gt;(−) Total Gastos Op.&lt;/span&gt;
              &lt;span className="font-semibold text-red-600"&gt;−${finanzas.totalGastosOperativos.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center justify-between py-2 bg-blue-50 -mx-6 px-6"&gt;
              &lt;span className="text-sm font-semibold text-blue-700"&gt;= EBITDA&lt;/span&gt;
              &lt;span className="font-bold text-blue-700"&gt;${finanzas.ebitda.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center justify-between py-2"&gt;
              &lt;span className="text-sm text-slate-600"&gt;(−) Impuestos&lt;/span&gt;
              &lt;span className="font-semibold text-red-600"&gt;−${finanzas.impuestos.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center justify-between py-3 bg-green-50 -mx-6 px-6 rounded-b-lg"&gt;
              &lt;span className="text-sm font-bold text-green-700"&gt;= RESULTADO NETO&lt;/span&gt;
              &lt;span className="font-bold text-green-700 text-lg"&gt;${finanzas.resultadoNeto.toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Pagos */}
        &lt;div className="space-y-6"&gt;
          &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
            &lt;div className="p-4 border-b border-slate-50 bg-emerald-50"&gt;
              &lt;h3 className="font-semibold text-emerald-800"&gt;Pagos Realizados&lt;/h3&gt;
            &lt;/div&gt;
            &lt;div className="divide-y divide-slate-50"&gt;
              {finanzas.pagosRealizados.map((pago, idx) =&gt; (
                &lt;div key={idx} className="p-4 flex items-center justify-between"&gt;
                  &lt;div&gt;
                    &lt;p className="text-sm font-medium text-slate-800"&gt;{pago.concepto}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{pago.fecha}&lt;/p&gt;
                  &lt;/div&gt;
                  &lt;span className="font-semibold text-emerald-600"&gt;${pago.monto.toLocaleString()}&lt;/span&gt;
                &lt;/div&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
            &lt;div className="p-4 border-b border-slate-50 bg-amber-50"&gt;
              &lt;h3 className="font-semibold text-amber-800"&gt;Próximos Pagos&lt;/h3&gt;
            &lt;/div&gt;
            &lt;div className="divide-y divide-slate-50"&gt;
              {finanzas.proximosPagos.map((pago, idx) =&gt; (
                &lt;div key={idx} className="p-4 flex items-center justify-between"&gt;
                  &lt;div&gt;
                    &lt;p className="text-sm font-medium text-slate-800"&gt;{pago.concepto}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{pago.fecha}&lt;/p&gt;
                  &lt;/div&gt;
                  &lt;span className="font-semibold text-amber-600"&gt;${pago.monto.toLocaleString()}&lt;/span&gt;
                &lt;/div&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ POSTVENTA TAB ============
const PostventaTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const casos = CASOS_POSTVENTA[tienda.slug] || [];
  
  const tipoColors: Record&lt;string, string&gt; = {
    devolucion: 'bg-purple-50 text-purple-700',
    garantia: 'bg-red-50 text-red-700',
    reclamo: 'bg-amber-50 text-amber-700',
    cambio: 'bg-blue-50 text-blue-700'
  };
  
  const estadoColors: Record&lt;string, string&gt; = {
    abierto: 'bg-red-50 text-red-700',
    en_proceso: 'bg-amber-50 text-amber-700',
    resuelto: 'bg-green-50 text-green-700',
    cerrado: 'bg-slate-100 text-slate-600'
  };

  const casosAbiertos = casos.filter(c =&gt; c.estado === 'abierto' || c.estado === 'en_proceso').length;
  const csatPromedio = casos.filter(c =&gt; c.csat).reduce((acc, c) =&gt; acc + (c.csat || 0), 0) / casos.filter(c =&gt; c.csat).length || 0;

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-4 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Casos Totales&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{casos.length}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Casos Abiertos&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-amber-600"&gt;{casosAbiertos}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Resueltos (Mes)&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;{casos.filter(c =&gt; c.estado === 'resuelto' || c.estado === 'cerrado').length}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;CSAT Promedio&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-emerald-600"&gt;{csatPromedio.toFixed(1)}/10&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Lista de Casos */}
      &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
        &lt;div className="p-4 border-b border-slate-50 flex items-center justify-between"&gt;
          &lt;h3 className="font-semibold text-slate-800"&gt;Casos de Postventa&lt;/h3&gt;
          &lt;button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: tienda.color }}&gt;
            &lt;Plus size={16} /&gt;Nuevo Caso
          &lt;/button&gt;
        &lt;/div&gt;
        &lt;table className="w-full text-left"&gt;
          &lt;thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase"&gt;
            &lt;tr&gt;
              &lt;th className="p-4"&gt;Caso&lt;/th&gt;
              &lt;th className="p-4"&gt;Cliente&lt;/th&gt;
              &lt;th className="p-4"&gt;Tipo&lt;/th&gt;
              &lt;th className="p-4"&gt;Producto&lt;/th&gt;
              &lt;th className="p-4"&gt;Estado&lt;/th&gt;
              &lt;th className="p-4"&gt;Asignado&lt;/th&gt;
              &lt;th className="p-4"&gt;CSAT&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className="divide-y divide-slate-50 text-sm"&gt;
            {casos.map(caso =&gt; (
              &lt;tr key={caso.id} className="hover:bg-slate-50 cursor-pointer"&gt;
                &lt;td className="p-4"&gt;
                  &lt;p className="font-semibold" style={{ color: tienda.color }}&gt;{caso.id}&lt;/p&gt;
                  &lt;p className="text-xs text-slate-400"&gt;{caso.fecha}&lt;/p&gt;
                &lt;/td&gt;
                &lt;td className="p-4 text-slate-700"&gt;{caso.cliente}&lt;/td&gt;
                &lt;td className="p-4"&gt;
                  &lt;span className={`px-2 py-1 rounded-full text-xs font-semibold ${tipoColors[caso.tipo]}`}&gt;
                    {caso.tipo.charAt(0).toUpperCase() + caso.tipo.slice(1)}
                  &lt;/span&gt;
                &lt;/td&gt;
                &lt;td className="p-4"&gt;
                  &lt;p className="text-slate-700 text-sm"&gt;{caso.producto}&lt;/p&gt;
                  &lt;p className="text-xs text-slate-400"&gt;{caso.motivo}&lt;/p&gt;
                &lt;/td&gt;
                &lt;td className="p-4"&gt;
                  &lt;span className={`px-2 py-1 rounded-full text-xs font-semibold ${estadoColors[caso.estado]}`}&gt;
                    {caso.estado.replace('_', ' ')}
                  &lt;/span&gt;
                &lt;/td&gt;
                &lt;td className="p-4 text-slate-600 text-sm"&gt;{caso.asignado}&lt;/td&gt;
                &lt;td className="p-4"&gt;
                  {caso.csat ? (
                    &lt;div className="flex items-center gap-1"&gt;
                      &lt;Star size={14} className={caso.csat &gt;= 8 ? 'text-green-500 fill-green-500' : caso.csat &gt;= 6 ? 'text-amber-500 fill-amber-500' : 'text-red-500 fill-red-500'} /&gt;
                      &lt;span className="font-medium"&gt;{caso.csat}&lt;/span&gt;
                    &lt;/div&gt;
                  ) : &lt;span className="text-slate-300"&gt;—&lt;/span&gt;}
                &lt;/td&gt;
              &lt;/tr&gt;
            ))}
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ MARKETING TAB ============
const MarketingTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const contenidos = MARKETING_TIENDA[tienda.slug] || [];
  
  const tipoIcons: Record&lt;string, string&gt; = {
    post: '📸',
    reel: '🎬',
    story: '📱',
    email: '📧',
    ad: '📢'
  };
  
  const estadoColors: Record&lt;string, string&gt; = {
    publicado: 'bg-green-50 text-green-700',
    programado: 'bg-blue-50 text-blue-700',
    borrador: 'bg-slate-100 text-slate-600',
    aprobacion: 'bg-amber-50 text-amber-700'
  };

  const publicados = contenidos.filter(c =&gt; c.estado === 'publicado');
  const totalReach = publicados.reduce((acc, c) =&gt; acc + (c.engagement?.reach || 0), 0);
  const totalEngagement = publicados.reduce((acc, c) =&gt; acc + (c.engagement?.likes || 0) + (c.engagement?.comments || 0) + (c.engagement?.shares || 0), 0);

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-4 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Contenidos (Mes)&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{contenidos.length}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Publicados&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;{publicados.length}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Alcance Total&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-blue-600"&gt;{(totalReach / 1000).toFixed(1)}K&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Engagement&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-purple-600"&gt;{totalEngagement}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Calendario y Lista */}
      &lt;div className="grid grid-cols-3 gap-6"&gt;
        &lt;div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"&gt;
          &lt;div className="p-4 border-b border-slate-50 flex items-center justify-between"&gt;
            &lt;h3 className="font-semibold text-slate-800"&gt;Plan de Contenidos&lt;/h3&gt;
            &lt;span className="text-xs text-slate-500"&gt;Asignado desde Marketing Central&lt;/span&gt;
          &lt;/div&gt;
          &lt;div className="divide-y divide-slate-50"&gt;
            {contenidos.map(cont =&gt; (
              &lt;div key={cont.id} className="p-4 flex items-center justify-between hover:bg-slate-50"&gt;
                &lt;div className="flex items-center gap-4"&gt;
                  &lt;span className="text-2xl"&gt;{tipoIcons[cont.tipo]}&lt;/span&gt;
                  &lt;div&gt;
                    &lt;p className="font-medium text-slate-800"&gt;{cont.titulo}&lt;/p&gt;
                    &lt;div className="flex items-center gap-2 mt-1"&gt;
                      &lt;span className="text-xs text-slate-400"&gt;{cont.fecha}&lt;/span&gt;
                      &lt;span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"&gt;{cont.plataforma}&lt;/span&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center gap-3"&gt;
                  {cont.engagement &amp;&amp; (
                    &lt;div className="text-right"&gt;
                      &lt;p className="text-sm font-medium text-slate-700"&gt;{cont.engagement.reach.toLocaleString()} reach&lt;/p&gt;
                      &lt;p className="text-xs text-slate-400"&gt;{cont.engagement.likes} likes · {cont.engagement.comments} comments&lt;/p&gt;
                    &lt;/div&gt;
                  )}
                  &lt;span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[cont.estado]}`}&gt;
                    {cont.estado.charAt(0).toUpperCase() + cont.estado.slice(1)}
                  &lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            ))}
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Avatar Asignado */}
        &lt;div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"&gt;
          &lt;h3 className="font-semibold text-slate-800 mb-4"&gt;Avatar Digital&lt;/h3&gt;
          &lt;div className="text-center"&gt;
            &lt;div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl" style={{ backgroundColor: tienda.colorSecundario }}&gt;
              {tienda.slug === 'pet-vogue' ? '👩‍🦰' : tienda.slug === 'coresmart' ? '🧑‍💻' : '👩'}
            &lt;/div&gt;
            &lt;p className="font-semibold text-slate-800"&gt;
              {tienda.slug === 'pet-vogue' ? 'Emma' : tienda.slug === 'coresmart' ? 'Alex Tech' : 'Sofía'}
            &lt;/p&gt;
            &lt;p className="text-sm text-slate-500 mb-4"&gt;Avatar de {tienda.nombre}&lt;/p&gt;
            &lt;div className="space-y-2 text-left"&gt;
              &lt;div className="flex items-center justify-between text-sm"&gt;
                &lt;span className="text-slate-500"&gt;Contenidos generados&lt;/span&gt;
                &lt;span className="font-medium"&gt;{contenidos.length}&lt;/span&gt;
              &lt;/div&gt;
              &lt;div className="flex items-center justify-between text-sm"&gt;
                &lt;span className="text-slate-500"&gt;Engagement rate&lt;/span&gt;
                &lt;span className="font-medium text-green-600"&gt;4.2%&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ============ AGENTES AI TAB ============
const AgentesTab: React.FC&lt;{ tienda: TiendaMinorista }&gt; = ({ tienda }) =&gt; {
  const agentes = AGENTES_TIENDA[tienda.slug] || [];
  
  const tipoColors: Record&lt;string, { bg: string; text: string; icon: React.ElementType }&gt; = {
    ventas: { bg: 'from-cyan-50 to-blue-50', text: 'text-cyan-700', icon: MessageSquare },
    soporte: { bg: 'from-purple-50 to-pink-50', text: 'text-purple-700', icon: Shield },
    postventa: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-700', icon: RotateCcw },
    marketing: { bg: 'from-pink-50 to-red-50', text: 'text-pink-700', icon: Sparkles }
  };

  const totalConversaciones = agentes.reduce((acc, a) =&gt; acc + a.conversacionesHoy, 0);
  const promedioResolucion = agentes.filter(a =&gt; a.resolucionAutomatica &gt; 0).reduce((acc, a) =&gt; acc + a.resolucionAutomatica, 0) / agentes.filter(a =&gt; a.resolucionAutomatica &gt; 0).length || 0;
  const promedioSatisfaccion = agentes.filter(a =&gt; a.satisfaccion &gt; 0).reduce((acc, a) =&gt; acc + a.satisfaccion, 0) / agentes.filter(a =&gt; a.satisfaccion &gt; 0).length || 0;

  return (
    &lt;div className="space-y-6"&gt;
      {/* KPIs */}
      &lt;div className="grid grid-cols-4 gap-4"&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Agentes Activos&lt;/p&gt;
          &lt;p className="text-2xl font-bold" style={{ color: tienda.color }}&gt;{agentes.filter(a =&gt; a.estado === 'online').length}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Conversaciones Hoy&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-cyan-600"&gt;{totalConversaciones}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Resolución Auto.&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-green-600"&gt;{promedioResolucion.toFixed(0)}%&lt;/p&gt;
        &lt;/div&gt;
        &lt;div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"&gt;
          &lt;p className="text-xs text-slate-500 mb-1"&gt;Satisfacción&lt;/p&gt;
          &lt;p className="text-2xl font-bold text-emerald-600"&gt;{promedioSatisfaccion.toFixed(1)}/5&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Cards de Agentes */}
      &lt;div className="grid grid-cols-3 gap-6"&gt;
        {agentes.map(agente =&gt; {
          const config = tipoColors[agente.tipo];
          const Icon = config.icon;
          return (
            &lt;div key={agente.id} className={`bg-gradient-to-br ${config.bg} rounded-xl border border-slate-100 p-6`}&gt;
              &lt;div className="flex items-center justify-between mb-4"&gt;
                &lt;div className="flex items-center gap-3"&gt;
                  &lt;div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center"&gt;
                    &lt;Icon size={24} className={config.text} /&gt;
                  &lt;/div&gt;
                  &lt;div&gt;
                    &lt;h3 className="font-semibold text-slate-800"&gt;{agente.nombre}&lt;/h3&gt;
                    &lt;p className="text-xs text-slate-500 capitalize"&gt;{agente.tipo}&lt;/p&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center gap-1.5"&gt;
                  &lt;span className={`w-2.5 h-2.5 rounded-full ${agente.estado === 'online' ? 'bg-green-500 animate-pulse' : agente.estado === 'entrenamiento' ? 'bg-amber-500' : 'bg-slate-400'}`} /&gt;
                  &lt;span className={`text-xs font-medium ${agente.estado === 'online' ? 'text-green-600' : agente.estado === 'entrenamiento' ? 'text-amber-600' : 'text-slate-500'}`}&gt;
                    {agente.estado === 'online' ? 'Online' : agente.estado === 'entrenamiento' ? 'Entrenando' : 'Offline'}
                  &lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              
              &lt;div className="grid grid-cols-2 gap-4 mb-4"&gt;
                &lt;div className="bg-white/60 rounded-lg p-3"&gt;
                  &lt;p className="text-xs text-slate-500"&gt;Conversaciones&lt;/p&gt;
                  &lt;p className={`text-xl font-bold ${config.text}`}&gt;{agente.conversacionesHoy}&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/60 rounded-lg p-3"&gt;
                  &lt;p className="text-xs text-slate-500"&gt;Resolución&lt;/p&gt;
                  &lt;p className={`text-xl font-bold ${config.text}`}&gt;{agente.resolucionAutomatica}%&lt;/p&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              
              &lt;div className="space-y-2"&gt;
                &lt;div className="flex items-center justify-between text-sm"&gt;
                  &lt;span className="text-slate-500"&gt;Tiempo respuesta&lt;/span&gt;
                  &lt;span className="font-medium text-slate-700"&gt;{agente.tiempoRespuestaPromedio}s&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center justify-between text-sm"&gt;
                  &lt;span className="text-slate-500"&gt;Satisfacción&lt;/span&gt;
                  &lt;div className="flex items-center gap-1"&gt;
                    &lt;Star size={14} className="text-amber-400 fill-amber-400" /&gt;
                    &lt;span className="font-medium text-slate-700"&gt;{agente.satisfaccion}&lt;/span&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center justify-between text-sm"&gt;
                  &lt;span className="text-slate-500"&gt;Escalaciones&lt;/span&gt;
                  &lt;span className={`font-medium ${agente.escalaciones &gt; 5 ? 'text-amber-600' : 'text-slate-700'}`}&gt;{agente.escalaciones}&lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              
              &lt;button className="w-full mt-4 py-2 rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"&gt;
                Configurar Agente
              &lt;/button&gt;
            &lt;/div&gt;
          );
        })}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default TiendaPage;
