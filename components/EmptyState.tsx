import React from 'react';
import {
  Package,
  Search,
  FileText,
  Users,
  ShoppingCart,
  Inbox,
  Calendar,
  AlertCircle,
  Filter,
  Database,
  TrendingUp,
  MessageSquare,
  Bell,
  FolderOpen,
  Ship,
  Truck,
  CreditCard,
  BarChart2,
  Settings,
  HelpCircle
} from 'lucide-react';

export type EmptyStateType = 
  | 'search'
  | 'filter'
  | 'data'
  | 'orders'
  | 'clients'
  | 'products'
  | 'shipments'
  | 'messages'
  | 'notifications'
  | 'documents'
  | 'payments'
  | 'reports'
  | 'calendar'
  | 'settings'
  | 'generic';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

const emptyStateConfig: Record<EmptyStateType, { icon: React.ElementType; defaultTitle: string; defaultDescription: string; color: string }> = {
  search: {
    icon: Search,
    defaultTitle: 'Sin resultados',
    defaultDescription: 'No encontramos coincidencias para tu búsqueda. Probá con otros términos.',
    color: 'text-blue-500 bg-blue-50'
  },
  filter: {
    icon: Filter,
    defaultTitle: 'Sin resultados para este filtro',
    defaultDescription: 'No hay elementos que coincidan con los filtros seleccionados. Probá ajustando los criterios.',
    color: 'text-purple-500 bg-purple-50'
  },
  data: {
    icon: Database,
    defaultTitle: 'Sin datos',
    defaultDescription: 'Aún no hay datos para mostrar en esta sección.',
    color: 'text-slate-500 bg-slate-50'
  },
  orders: {
    icon: ShoppingCart,
    defaultTitle: 'Sin pedidos',
    defaultDescription: 'No hay pedidos para mostrar. Los nuevos pedidos aparecerán aquí.',
    color: 'text-emerald-500 bg-emerald-50'
  },
  clients: {
    icon: Users,
    defaultTitle: 'Sin clientes',
    defaultDescription: 'No hay clientes registrados aún. Agregá tu primer cliente para comenzar.',
    color: 'text-cyan-500 bg-cyan-50'
  },
  products: {
    icon: Package,
    defaultTitle: 'Sin productos',
    defaultDescription: 'No hay productos en el inventario. Agregá productos para comenzar a vender.',
    color: 'text-amber-500 bg-amber-50'
  },
  shipments: {
    icon: Ship,
    defaultTitle: 'Sin embarques',
    defaultDescription: 'No hay embarques activos en este momento.',
    color: 'text-blue-500 bg-blue-50'
  },
  messages: {
    icon: MessageSquare,
    defaultTitle: 'Sin mensajes',
    defaultDescription: 'No hay mensajes nuevos. Tu bandeja está vacía.',
    color: 'text-green-500 bg-green-50'
  },
  notifications: {
    icon: Bell,
    defaultTitle: 'Sin notificaciones',
    defaultDescription: 'No tenés notificaciones pendientes. ¡Todo al día!',
    color: 'text-orange-500 bg-orange-50'
  },
  documents: {
    icon: FileText,
    defaultTitle: 'Sin documentos',
    defaultDescription: 'No hay documentos cargados en esta sección.',
    color: 'text-indigo-500 bg-indigo-50'
  },
  payments: {
    icon: CreditCard,
    defaultTitle: 'Sin pagos pendientes',
    defaultDescription: 'No hay pagos pendientes. ¡Excelente gestión!',
    color: 'text-emerald-500 bg-emerald-50'
  },
  reports: {
    icon: BarChart2,
    defaultTitle: 'Sin reportes',
    defaultDescription: 'No hay reportes disponibles para el período seleccionado.',
    color: 'text-violet-500 bg-violet-50'
  },
  calendar: {
    icon: Calendar,
    defaultTitle: 'Sin eventos',
    defaultDescription: 'No hay eventos programados para este período.',
    color: 'text-rose-500 bg-rose-50'
  },
  settings: {
    icon: Settings,
    defaultTitle: 'Sin configuración',
    defaultDescription: 'No hay configuraciones personalizadas aún.',
    color: 'text-slate-500 bg-slate-50'
  },
  generic: {
    icon: FolderOpen,
    defaultTitle: 'Sin contenido',
    defaultDescription: 'No hay contenido para mostrar en esta sección.',
    color: 'text-slate-400 bg-slate-50'
  }
};

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'generic',
  title,
  description,
  actionLabel,
  onAction,
  compact = false
}) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;
  
  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center mb-3`}>
          <Icon size={20} />
        </div>
        <p className="text-sm text-slate-500 text-center">
          {title || config.defaultTitle}
        </p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Ilustración decorativa */}
      <div className="relative mb-6">
        <div className={`w-20 h-20 rounded-2xl ${config.color} flex items-center justify-center`}>
          <Icon size={36} />
        </div>
        {/* Elementos decorativos */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-100"></div>
        <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-slate-200"></div>
      </div>
      
      {/* Texto */}
      <h3 className="text-lg font-semibold text-slate-700 mb-2 text-center">
        {title || config.defaultTitle}
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-sm mb-4">
        {description || config.defaultDescription}
      </p>
      
      {/* Acción opcional */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
