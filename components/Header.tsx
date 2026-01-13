import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Bell, Mail, Plus, Download, Calendar, X, Check, CheckCheck,
  Ship, AlertTriangle, DollarSign, Package, FileText, Users, Clock,
  ShoppingCart, MessageSquare, TrendingUp, Settings, ChevronRight
} from 'lucide-react';
import { PageType } from '../App';

// ============ NOTIFICATION TYPES ============
type NotificationType = 'alerta' | 'embarque' | 'pago' | 'pedido' | 'mensaje' | 'tarea' | 'sistema';
type NotificationPriority = 'alta' | 'media' | 'baja';

interface Notification {
  id: string;
  tipo: NotificationType;
  titulo: string;
  descripcion: string;
  fecha: Date;
  leida: boolean;
  prioridad: NotificationPriority;
  link?: string;
  accion?: string;
}

// ============ GENERATE DYNAMIC NOTIFICATIONS ============
const generateNotifications = (): Notification[] => {
  const now = Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  return [
    {
      id: 'N001',
      tipo: 'alerta',
      titulo: 'Factura vencida - Distribuidora Norte',
      descripcion: 'La factura 0001-00001236 por USD 18,585.60 tiene 13 días de mora',
      fecha: new Date(now - 15 * minute),
      leida: false,
      prioridad: 'alta',
      link: '/cobranzas',
      accion: 'Ver cuenta'
    },
    {
      id: 'N002',
      tipo: 'embarque',
      titulo: 'Contenedor CSLU7654321 arribó',
      descripcion: 'El embarque de Pet Vogue llegó al puerto de Buenos Aires',
      fecha: new Date(now - 2 * hour),
      leida: false,
      prioridad: 'alta',
      link: '/importaciones',
      accion: 'Ver detalles'
    },
    {
      id: 'N003',
      tipo: 'pedido',
      titulo: 'Nuevo pedido mayorista',
      descripcion: 'TechStore Córdoba realizó un pedido por USD 11,737',
      fecha: new Date(now - 3 * hour),
      leida: false,
      prioridad: 'media',
      link: '/pedidos',
      accion: 'Procesar'
    },
    {
      id: 'N004',
      tipo: 'pago',
      titulo: 'Pago recibido confirmado',
      descripcion: 'Gaming Store BA pagó USD 17,254.60 - Factura saldada',
      fecha: new Date(now - 5 * hour),
      leida: true,
      prioridad: 'baja',
      link: '/cobranzas'
    },
    {
      id: 'N005',
      tipo: 'mensaje',
      titulo: 'Mensaje de proveedor',
      descripcion: 'Shenzhen Electronics: Confirmación de producción lote #4521',
      fecha: new Date(now - 8 * hour),
      leida: true,
      prioridad: 'media',
      link: '/inbox'
    },
    {
      id: 'N006',
      tipo: 'tarea',
      titulo: 'Vencimiento documentación',
      descripcion: 'Certificado de origen OP-2026-003 vence en 3 días',
      fecha: new Date(now - 1 * day),
      leida: false,
      prioridad: 'media',
      link: '/importaciones/OP-2026-003'
    },
    {
      id: 'N007',
      tipo: 'sistema',
      titulo: 'Backup completado',
      descripcion: 'Respaldo automático de base de datos exitoso',
      fecha: new Date(now - 1 * day - 6 * hour),
      leida: true,
      prioridad: 'baja'
    },
    {
      id: 'N008',
      tipo: 'embarque',
      titulo: 'Contenedor en tránsito - ETA actualizado',
      descripcion: 'MSKU1234567 llegará 2 días antes: 18 Ene',
      fecha: new Date(now - 2 * day),
      leida: true,
      prioridad: 'media',
      link: '/importaciones'
    }
  ];
};

// ============ NOTIFICATION ICON ============
const NotificationIcon: React.FC<{ tipo: NotificationType; size?: number }> = ({ tipo, size = 16 }) => {
  const iconProps = { size };
  const baseClass = "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0";
  
  switch(tipo) {
    case 'alerta':
      return <div className={`${baseClass} bg-red-100 text-red-600`}><AlertTriangle {...iconProps} /></div>;
    case 'embarque':
      return <div className={`${baseClass} bg-blue-100 text-blue-600`}><Ship {...iconProps} /></div>;
    case 'pago':
      return <div className={`${baseClass} bg-emerald-100 text-emerald-600`}><DollarSign {...iconProps} /></div>;
    case 'pedido':
      return <div className={`${baseClass} bg-purple-100 text-purple-600`}><ShoppingCart {...iconProps} /></div>;
    case 'mensaje':
      return <div className={`${baseClass} bg-amber-100 text-amber-600`}><MessageSquare {...iconProps} /></div>;
    case 'tarea':
      return <div className={`${baseClass} bg-cyan-100 text-cyan-600`}><Clock {...iconProps} /></div>;
    case 'sistema':
      return <div className={`${baseClass} bg-slate-100 text-slate-600`}><Settings {...iconProps} /></div>;
    default:
      return <div className={`${baseClass} bg-slate-100 text-slate-500`}><Bell {...iconProps} /></div>;
  }
};

// ============ TIME AGO HELPER ============
const timeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days}d`;
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
};

// ============ NOTIFICATIONS DROPDOWN ============
interface NotificationsDropdownProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigate?: (page: PageType) => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.leida).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.leida) {
      onMarkAsRead(notification.id);
    }
    // Navigation would be handled by parent
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-800">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
              {unreadCount} nuevas
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <CheckCheck size={14} />
              Marcar todas
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${
                !notification.leida ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex gap-3">
                <NotificationIcon tipo={notification.tipo} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm ${!notification.leida ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                      {notification.titulo}
                    </p>
                    {!notification.leida && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notification.descripcion}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-400">{timeAgo(notification.fecha)}</span>
                    {notification.accion && (
                      <span className="text-xs text-blue-600 font-medium flex items-center gap-0.5">
                        {notification.accion}
                        <ChevronRight size={12} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">Sin notificaciones</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-slate-100 bg-slate-50">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1.5 hover:bg-white rounded-lg transition-colors">
            Ver todas las notificaciones
          </button>
        </div>
      )}
    </div>
  );
};

// ============ HEADER PROPS ============
interface HeaderProps {
  currentPage: PageType;
  pageTitle: string;
  breadcrumb: string;
  onNavigate?: (page: PageType) => void;
}

// ============ MAIN HEADER COMPONENT ============
const Header: React.FC<HeaderProps> = ({ currentPage, pageTitle, breadcrumb, onNavigate }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications());

  const getActionButton = () => {
    switch(currentPage) {
      case 'hoy':
        return { label: 'Nueva Tarea', icon: Plus };
      case 'tareas':
        return { label: 'Nueva Tarea', icon: Plus };
      case 'importaciones':
        return { label: 'Nueva Importación', icon: Plus };
      case 'embarques':
        return { label: 'Nuevo Embarque', icon: Plus };
      case 'reportes':
        return { label: 'Exportar PDF', icon: Download };
      case 'mayoristas':
        return { label: 'Nuevo Cliente', icon: Plus };
      case 'crm':
        return { label: 'Nueva Conversación', icon: Plus };
      case 'marketing':
        return { label: 'Nueva Campaña', icon: Plus };
      case 'contenido':
        return { label: 'Programar Post', icon: Calendar };
      default:
        return { label: 'Crear Nuevo', icon: Plus };
    }
  };

  const action = getActionButton();
  const ActionIcon = action.icon;

  // Count notifications
  const unreadAlerts = notifications.filter(n => !n.leida).length;
  const messagesCount = 24; // Simulated message count

  // Mark single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, leida: true } : n)
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, leida: true })));
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 px-8 flex items-center justify-between">
      {/* Left: Breadcrumbs */}
      <div className="flex flex-col justify-center">
        <nav className="text-sm text-slate-500 mb-0.5">
          <span className="hover:text-slate-800 cursor-pointer transition-colors">{breadcrumb}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">{pageTitle}</span>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘ K</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
          {/* Bell - Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-full transition-colors ${
                showNotifications 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bell size={20} />
              {unreadAlerts > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <NotificationsDropdown
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNavigate={onNavigate}
              />
            )}
          </div>

          {/* Mail - Messages */}
          <button 
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            onClick={() => onNavigate?.('inbox')}
          >
            <Mail size={20} />
            {messagesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {messagesCount > 9 ? '9+' : messagesCount}
              </span>
            )}
          </button>
        </div>

        {/* User & Action */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img 
              src="https://i.pravatar.cc/32?img=12" 
              alt="User" 
              className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm cursor-pointer hover:ring-blue-200 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 transition-all active:scale-95">
            <ActionIcon size={16} />
            {action.label}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
