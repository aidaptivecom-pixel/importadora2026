import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  X,
  Send,
  Paperclip,
  Image,
  Smile,
  Phone,
  Video,
  Star,
  Archive,
  Trash2,
  Clock,
  CheckCheck,
  Check,
  AlertCircle,
  User,
  Building2,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Mail,
  Instagram,
  Facebook,
  AtSign,
  Users,
  Tag,
  MoreVertical,
  ArrowLeft,
  Circle,
  Zap,
  UserPlus
} from 'lucide-react';

// ============ TYPES ============
type CanalMensaje = 'whatsapp' | 'instagram' | 'email' | 'facebook' | 'web';
type EstadoConversacion = 'sin_responder' | 'en_espera' | 'resuelto' | 'archivado';
type TipoMensaje = 'texto' | 'imagen' | 'archivo' | 'audio' | 'video';

interface Mensaje {
  id: string;
  contenido: string;
  tipo: TipoMensaje;
  timestamp: string;
  esEntrante: boolean;
  leido: boolean;
  usuario?: string;
}

interface Conversacion {
  id: string;
  contactoNombre: string;
  contactoAvatar?: string;
  contactoEmpresa?: string;
  contactoEmail?: string;
  contactoTelefono?: string;
  canal: CanalMensaje;
  estado: EstadoConversacion;
  ultimoMensaje: string;
  ultimoMensajeTimestamp: string;
  mensajesNoLeidos: number;
  asignadoA?: string;
  tags: string[];
  crmContactoId?: string;
  mensajes: Mensaje[];
  destacado: boolean;
}

// ============ SAMPLE DATA ============
const CONVERSACIONES: Conversacion[] = [
  {
    id: 'conv-001',
    contactoNombre: 'María García',
    contactoEmpresa: 'Electro Mendoza',
    contactoEmail: 'maria@electromendoza.com',
    contactoTelefono: '+54 261 456 7890',
    canal: 'whatsapp',
    estado: 'sin_responder',
    ultimoMensaje: 'Hola! Quería consultar por el precio de los auriculares Bluetooth que vi en su catálogo',
    ultimoMensajeTimestamp: '2025-01-13T10:30:00',
    mensajesNoLeidos: 2,
    asignadoA: 'Matías',
    tags: ['mayorista', 'electrónica'],
    crmContactoId: 'CRM-001',
    destacado: true,
    mensajes: [
      { id: 'm1', contenido: 'Hola! Vi su catálogo de productos', tipo: 'texto', timestamp: '2025-01-13T10:25:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Quería consultar por el precio de los auriculares Bluetooth que vi en su catálogo', tipo: 'texto', timestamp: '2025-01-13T10:30:00', esEntrante: true, leido: false },
    ]
  },
  {
    id: 'conv-002',
    contactoNombre: 'Carlos Rodríguez',
    contactoEmpresa: 'TechStore BA',
    contactoEmail: 'carlos@techstoreba.com',
    contactoTelefono: '+54 11 5678 1234',
    canal: 'email',
    estado: 'en_espera',
    ultimoMensaje: 'Perfecto, quedo a la espera de la cotización actualizada',
    ultimoMensajeTimestamp: '2025-01-13T09:15:00',
    mensajesNoLeidos: 0,
    asignadoA: 'Matías',
    tags: ['mayorista', 'smart home'],
    crmContactoId: 'CRM-002',
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Buenos días, necesito una cotización para 50 unidades de smart plugs', tipo: 'texto', timestamp: '2025-01-12T14:00:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Buen día Carlos! Te paso la cotización en breve', tipo: 'texto', timestamp: '2025-01-12T14:30:00', esEntrante: false, leido: true, usuario: 'Matías' },
      { id: 'm3', contenido: 'Perfecto, quedo a la espera de la cotización actualizada', tipo: 'texto', timestamp: '2025-01-13T09:15:00', esEntrante: true, leido: true },
    ]
  },
  {
    id: 'conv-003',
    contactoNombre: 'Laura Fernández',
    canal: 'instagram',
    estado: 'sin_responder',
    ultimoMensaje: 'Hacen envíos a Córdoba? 📦',
    ultimoMensajeTimestamp: '2025-01-13T11:45:00',
    mensajesNoLeidos: 1,
    tags: ['consulta', 'retail'],
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Hola! Me encantaron los productos de su tienda 😍', tipo: 'texto', timestamp: '2025-01-13T11:40:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Hacen envíos a Córdoba? 📦', tipo: 'texto', timestamp: '2025-01-13T11:45:00', esEntrante: true, leido: false },
    ]
  },
  {
    id: 'conv-004',
    contactoNombre: 'Roberto Sánchez',
    contactoEmpresa: 'Distribuidora Norte',
    contactoEmail: 'roberto@distnorte.com',
    contactoTelefono: '+54 381 234 5678',
    canal: 'whatsapp',
    estado: 'resuelto',
    ultimoMensaje: 'Genial, gracias por la info! Hacemos el pedido la semana que viene',
    ultimoMensajeTimestamp: '2025-01-12T16:20:00',
    mensajesNoLeidos: 0,
    asignadoA: 'Matías',
    tags: ['mayorista', 'pet'],
    crmContactoId: 'CRM-005',
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Hola, tienen stock de camas para perros grandes?', tipo: 'texto', timestamp: '2025-01-12T15:00:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Hola Roberto! Sí, tenemos 45 unidades disponibles', tipo: 'texto', timestamp: '2025-01-12T15:30:00', esEntrante: false, leido: true, usuario: 'Matías' },
      { id: 'm3', contenido: 'Genial, gracias por la info! Hacemos el pedido la semana que viene', tipo: 'texto', timestamp: '2025-01-12T16:20:00', esEntrante: true, leido: true },
    ]
  },
  {
    id: 'conv-005',
    contactoNombre: 'Ana Martínez',
    canal: 'facebook',
    estado: 'sin_responder',
    ultimoMensaje: 'Buenas! Cuál es el precio del smartwatch deportivo?',
    ultimoMensajeTimestamp: '2025-01-13T08:00:00',
    mensajesNoLeidos: 1,
    tags: ['retail', 'consulta precio'],
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Buenas! Cuál es el precio del smartwatch deportivo?', tipo: 'texto', timestamp: '2025-01-13T08:00:00', esEntrante: true, leido: false },
    ]
  },
  {
    id: 'conv-006',
    contactoNombre: 'Diego López',
    contactoEmpresa: 'Pet Shop Rosario',
    contactoEmail: 'diego@petshoprosario.com',
    contactoTelefono: '+54 341 567 8901',
    canal: 'email',
    estado: 'en_espera',
    ultimoMensaje: 'Adjunto el comprobante de transferencia. Por favor confirmar cuando reciban el pago.',
    ultimoMensajeTimestamp: '2025-01-13T07:30:00',
    mensajesNoLeidos: 0,
    asignadoA: 'Matías',
    tags: ['mayorista', 'pago pendiente'],
    crmContactoId: 'CRM-008',
    destacado: true,
    mensajes: [
      { id: 'm1', contenido: 'Realicé la transferencia por el pedido #2025-089', tipo: 'texto', timestamp: '2025-01-13T07:25:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Adjunto el comprobante de transferencia. Por favor confirmar cuando reciban el pago.', tipo: 'texto', timestamp: '2025-01-13T07:30:00', esEntrante: true, leido: true },
    ]
  },
  {
    id: 'conv-007',
    contactoNombre: 'Valentina Torres',
    canal: 'instagram',
    estado: 'resuelto',
    ultimoMensaje: 'Gracias! Ya hice la compra por la web 🛒',
    ultimoMensajeTimestamp: '2025-01-12T20:15:00',
    mensajesNoLeidos: 0,
    tags: ['retail', 'venta completada'],
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Hola! Está disponible la funda para iPhone 15?', tipo: 'texto', timestamp: '2025-01-12T19:00:00', esEntrante: true, leido: true },
      { id: 'm2', contenido: 'Hola Valentina! Sí, está disponible. Podés comprarlo en nuestra web coresmart.com.ar', tipo: 'texto', timestamp: '2025-01-12T19:30:00', esEntrante: false, leido: true, usuario: 'Matías' },
      { id: 'm3', contenido: 'Gracias! Ya hice la compra por la web 🛒', tipo: 'texto', timestamp: '2025-01-12T20:15:00', esEntrante: true, leido: true },
    ]
  },
  {
    id: 'conv-008',
    contactoNombre: 'Proveedor Shenzhen Tech',
    canal: 'email',
    estado: 'en_espera',
    ultimoMensaje: 'Dear customer, your order has been shipped. Tracking number: SZ2025011234',
    ultimoMensajeTimestamp: '2025-01-12T03:00:00',
    mensajesNoLeidos: 0,
    asignadoA: 'Matías',
    tags: ['proveedor', 'tracking'],
    destacado: false,
    mensajes: [
      { id: 'm1', contenido: 'Dear customer, your order has been shipped. Tracking number: SZ2025011234', tipo: 'texto', timestamp: '2025-01-12T03:00:00', esEntrante: true, leido: true },
    ]
  }
];

// ============ CHANNEL ICON COMPONENT ============
const ChannelIcon: React.FC<{ canal: CanalMensaje; size?: number; className?: string }> = ({ canal, size = 16, className = '' }) => {
  const icons: Record<CanalMensaje, React.ReactNode> = {
    whatsapp: <MessageSquare size={size} className={`text-green-500 ${className}`} />,
    instagram: <Instagram size={size} className={`text-pink-500 ${className}`} />,
    email: <Mail size={size} className={`text-blue-500 ${className}`} />,
    facebook: <Facebook size={size} className={`text-blue-600 ${className}`} />,
    web: <AtSign size={size} className={`text-slate-500 ${className}`} />
  };
  return <>{icons[canal]}</>;
};

// ============ MAIN INBOX PAGE ============
const InboxPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversacion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCanal, setFilterCanal] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  // KPIs
  const sinResponder = CONVERSACIONES.filter(c => c.estado === 'sin_responder').length;
  const enEspera = CONVERSACIONES.filter(c => c.estado === 'en_espera').length;
  const totalNoLeidos = CONVERSACIONES.reduce((acc, c) => acc + c.mensajesNoLeidos, 0);

  // Filtrado
  const filteredConversaciones = useMemo(() => {
    return CONVERSACIONES.filter(conv => {
      const matchSearch = conv.contactoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.ultimoMensaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (conv.contactoEmpresa?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCanal = !filterCanal || conv.canal === filterCanal;
      const matchEstado = !filterEstado || conv.estado === filterEstado;
      return matchSearch && matchCanal && matchEstado;
    }).sort((a, b) => {
      // Destacados primero, luego por fecha
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return new Date(b.ultimoMensajeTimestamp).getTime() - new Date(a.ultimoMensajeTimestamp).getTime();
    });
  }, [searchTerm, filterCanal, filterEstado]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCanal('');
    setFilterEstado('');
  };

  const hasFilters = searchTerm || filterCanal || filterEstado;

  const handleSelectConversation = (conv: Conversacion) => {
    setSelectedConversation(conv);
    setShowMobileChat(true);
  };

  const handleSendMessage = () => {
    if (!nuevoMensaje.trim() || !selectedConversation) return;
    // Aquí iría la lógica de envío real
    console.log('Enviando:', nuevoMensaje, 'a', selectedConversation.contactoNombre);
    setNuevoMensaje('');
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'ayer';
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
  };

  const getEstadoBadge = (estado: EstadoConversacion) => {
    const styles: Record<EstadoConversacion, string> = {
      sin_responder: 'bg-red-100 text-red-700',
      en_espera: 'bg-amber-100 text-amber-700',
      resuelto: 'bg-green-100 text-green-700',
      archivado: 'bg-slate-100 text-slate-500'
    };
    const labels: Record<EstadoConversacion, string> = {
      sin_responder: 'Sin responder',
      en_espera: 'En espera',
      resuelto: 'Resuelto',
      archivado: 'Archivado'
    };
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${styles[estado]}`}>{labels[estado]}</span>;
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inbox Unificado</h1>
          <p className="text-sm text-slate-500 mt-1">
            {sinResponder > 0 && <span className="text-red-600 font-medium">{sinResponder} sin responder</span>}
            {sinResponder > 0 && enEspera > 0 && ' • '}
            {enEspera > 0 && <span className="text-amber-600">{enEspera} en espera</span>}
            {(sinResponder > 0 || enEspera > 0) && ' • '}
            {totalNoLeidos} mensajes no leídos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full"><MessageSquare size={12} />WA</span>
            <span className="flex items-center gap-1 px-2 py-1 bg-pink-50 text-pink-600 rounded-full"><Instagram size={12} />IG</span>
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full"><Mail size={12} />Email</span>
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full"><Facebook size={12} />FB</span>
          </div>
        </div>
      </div>

      {/* KPI Pills */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <button 
          onClick={() => setFilterEstado('sin_responder')}
          className={`p-3 rounded-xl border transition-all ${filterEstado === 'sin_responder' ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-white hover:border-red-200'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Sin responder</span>
            <AlertCircle size={14} className="text-red-500" />
          </div>
          <p className="text-xl font-bold text-red-600 mt-1">{sinResponder}</p>
        </button>
        <button 
          onClick={() => setFilterEstado('en_espera')}
          className={`p-3 rounded-xl border transition-all ${filterEstado === 'en_espera' ? 'border-amber-300 bg-amber-50' : 'border-slate-100 bg-white hover:border-amber-200'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">En espera</span>
            <Clock size={14} className="text-amber-500" />
          </div>
          <p className="text-xl font-bold text-amber-600 mt-1">{enEspera}</p>
        </button>
        <button 
          onClick={() => setFilterEstado('resuelto')}
          className={`p-3 rounded-xl border transition-all ${filterEstado === 'resuelto' ? 'border-green-300 bg-green-50' : 'border-slate-100 bg-white hover:border-green-200'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Resueltos hoy</span>
            <CheckCheck size={14} className="text-green-500" />
          </div>
          <p className="text-xl font-bold text-green-600 mt-1">{CONVERSACIONES.filter(c => c.estado === 'resuelto').length}</p>
        </button>
        <button 
          onClick={() => clearFilters()}
          className={`p-3 rounded-xl border transition-all ${!hasFilters ? 'border-blue-300 bg-blue-50' : 'border-slate-100 bg-white hover:border-blue-200'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Total conversaciones</span>
            <Users size={14} className="text-blue-500" />
          </div>
          <p className="text-xl font-bold text-blue-600 mt-1">{CONVERSACIONES.length}</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Conversation List */}
        <div className={`w-96 border-r border-slate-100 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Search & Filters */}
          <div className="p-3 border-b border-slate-100 space-y-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar conversación..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCanal}
                onChange={(e) => setFilterCanal(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
              >
                <option value="">Todos los canales</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="email">Email</option>
                <option value="facebook">Facebook</option>
              </select>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
              >
                <option value="">Todos los estados</option>
                <option value="sin_responder">Sin responder</option>
                <option value="en_espera">En espera</option>
                <option value="resuelto">Resuelto</option>
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversaciones.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`p-3 border-b border-slate-50 cursor-pointer transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                } ${conv.mensajesNoLeidos > 0 ? 'bg-amber-50/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm">
                      {conv.contactoNombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <ChannelIcon canal={conv.canal} size={12} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-800 truncate">{conv.contactoNombre}</span>
                        {conv.destacado && <Star size={12} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <span className={`text-[10px] ${conv.mensajesNoLeidos > 0 ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
                        {getTimeAgo(conv.ultimoMensajeTimestamp)}
                      </span>
                    </div>
                    {conv.contactoEmpresa && (
                      <p className="text-[10px] text-slate-400 mb-1">{conv.contactoEmpresa}</p>
                    )}
                    <p className={`text-xs truncate ${conv.mensajesNoLeidos > 0 ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                      {conv.ultimoMensaje}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {getEstadoBadge(conv.estado)}
                      {conv.mensajesNoLeidos > 0 && (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {conv.mensajesNoLeidos}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredConversaciones.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay conversaciones</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat View */}
        {selectedConversation ? (
          <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-1 hover:bg-slate-100 rounded"
                >
                  <ArrowLeft size={20} className="text-slate-500" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm">
                  {selectedConversation.contactoNombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{selectedConversation.contactoNombre}</h3>
                    <ChannelIcon canal={selectedConversation.canal} size={14} />
                  </div>
                  {selectedConversation.contactoEmpresa && (
                    <p className="text-xs text-slate-500">{selectedConversation.contactoEmpresa}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedConversation.crmContactoId ? (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs font-medium text-blue-600 transition-colors">
                    <User size={12} />Ver en CRM
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 transition-colors">
                    <UserPlus size={12} />Crear en CRM
                  </button>
                )}
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Star size={16} className={selectedConversation.destacado ? 'text-amber-400 fill-amber-400' : 'text-slate-400'} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical size={16} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {selectedConversation.mensajes.map((msg) => (
                <div key={msg.id} className={`flex ${msg.esEntrante ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] ${msg.esEntrante ? 'order-1' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-2.5 ${
                      msg.esEntrante 
                        ? 'bg-white border border-slate-100 rounded-tl-sm' 
                        : 'bg-blue-600 text-white rounded-tr-sm'
                    }`}>
                      <p className="text-sm">{msg.contenido}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 ${msg.esEntrante ? '' : 'justify-end'}`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
                      {!msg.esEntrante && (
                        <>
                          <span>• {msg.usuario}</span>
                          {msg.leido ? <CheckCheck size={12} className="text-blue-400" /> : <Check size={12} />}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Escribe un mensaje..."
                    className="w-full px-4 py-3 pr-24 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Paperclip size={16} className="text-slate-400" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Image size={16} className="text-slate-400" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Smile size={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!nuevoMensaje.trim()}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <Send size={18} className={nuevoMensaje.trim() ? 'text-white' : 'text-slate-400'} />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ChannelIcon canal={selectedConversation.canal} size={10} />
                  Respondiendo por {selectedConversation.canal === 'whatsapp' ? 'WhatsApp' : selectedConversation.canal === 'instagram' ? 'Instagram' : selectedConversation.canal === 'facebook' ? 'Facebook' : 'Email'}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-1">
                    <Zap size={10} />Respuesta rápida
                  </button>
                  <button className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-1">
                    <Tag size={10} />Agregar tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center bg-slate-50/50">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-600 mb-1">Selecciona una conversación</h3>
              <p className="text-sm text-slate-400">Elige una conversación de la lista para ver los mensajes</p>
            </div>
          </div>
        )}

        {/* Contact Info Sidebar */}
        {selectedConversation && (
          <div className="w-72 border-l border-slate-100 bg-white hidden lg:block overflow-y-auto">
            <div className="p-4 border-b border-slate-100">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Información del contacto</h4>
            </div>
            <div className="p-4 space-y-4">
              {/* Contact Details */}
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {selectedConversation.contactoNombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="font-semibold text-slate-800">{selectedConversation.contactoNombre}</h3>
                {selectedConversation.contactoEmpresa && (
                  <p className="text-sm text-slate-500">{selectedConversation.contactoEmpresa}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {selectedConversation.contactoEmail && (
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-600 truncate">{selectedConversation.contactoEmail}</span>
                  </div>
                )}
                {selectedConversation.contactoTelefono && (
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-600">{selectedConversation.contactoTelefono}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <ChannelIcon canal={selectedConversation.canal} size={14} />
                  <span className="text-sm text-slate-600 capitalize">{selectedConversation.canal}</span>
                </div>
              </div>

              {/* Tags */}
              {selectedConversation.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h5 className="text-xs font-medium text-slate-500 mb-2">Tags</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedConversation.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Asignado */}
              {selectedConversation.asignadoA && (
                <div className="pt-4 border-t border-slate-100">
                  <h5 className="text-xs font-medium text-slate-500 mb-2">Asignado a</h5>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center">
                      {selectedConversation.asignadoA.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-700">{selectedConversation.asignadoA}</span>
                  </div>
                </div>
              )}

              {/* CRM Link */}
              <div className="pt-4 border-t border-slate-100">
                {selectedConversation.crmContactoId ? (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-600 transition-colors">
                    <ExternalLink size={14} />
                    Ver en CRM
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                    <UserPlus size={14} />
                    Crear contacto en CRM
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 transition-colors">
                  <Archive size={14} />Archivar conversación
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg text-sm text-red-600 transition-colors">
                  <Trash2 size={14} />Eliminar conversación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
