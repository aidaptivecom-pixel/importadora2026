import React from 'react';
import { 
  LayoutDashboard, 
  Container, 
  Ship, 
  Package, 
  Factory,
  MessageSquare, 
  Users, 
  ShoppingCart, 
  ClipboardList,
  Wallet,
  Target,
  Calendar,
  BarChart3,
  FileText,
  Receipt,
  CreditCard,
  Settings,
  Plug,
  ChevronDown,
  Globe,
  Sun,
  CheckSquare,
  BookOpen,
  Sparkles,
  Kanban,
  FolderKanban,
  Inbox,
  Mail,
  Store,
  TrendingUp,
  PawPrint,
  Home,
  Heart
} from 'lucide-react';
import { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="fixed left-4 top-4 h-[calc(100vh-32px)] w-64 bg-white border-r border-slate-100 flex flex-col z-20 rounded-l-2xl">
      {/* Header Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-50 rounded-tl-2xl">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white mr-3 shadow-sm">
          <Globe size={18} />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">Nexo Global</span>
      </div>

      {/* Team Selector */}
      <div className="px-4 py-4">
        <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg transition-colors">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-2">
              NG
            </div>
            <span className="text-sm font-medium text-slate-700">Import Ops</span>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
        
        {/* Section: Principal */}
        <div>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Sun size={18} />} 
              label="Hoy" 
              active={currentPage === 'hoy'}
              onClick={() => onNavigate('hoy')}
              highlight
            />
            <MenuItem 
              icon={<CheckSquare size={18} />} 
              label="Tareas" 
              active={currentPage === 'tareas'}
              onClick={() => onNavigate('tareas')}
              badge="5"
            />
            <MenuItem 
              icon={<BookOpen size={18} />} 
              label="Documentación" 
              active={currentPage === 'documentacion'}
              onClick={() => onNavigate('documentacion')}
            />
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100"></div>

        {/* Section: Operaciones */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Operaciones</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={currentPage === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
            />
            <MenuItem 
              icon={<FolderKanban size={18} />} 
              label="Tablero" 
              active={currentPage === 'tablero'}
              onClick={() => onNavigate('tablero')}
              badge="9"
              badgeColor="blue"
            />
            <MenuItem 
              icon={<Container size={18} />} 
              label="Operaciones" 
              active={currentPage === 'operaciones'}
              onClick={() => onNavigate('operaciones')}
            />
            <MenuItem 
              icon={<Ship size={18} />} 
              label="Embarques" 
              active={currentPage === 'embarques'}
              onClick={() => onNavigate('embarques')}
            />
            <MenuItem 
              icon={<Package size={18} />} 
              label="Inventario" 
              active={currentPage === 'inventario'}
              onClick={() => onNavigate('inventario')}
            />
            <MenuItem 
              icon={<Factory size={18} />} 
              label="Proveedores" 
              active={currentPage === 'proveedores'}
              onClick={() => onNavigate('proveedores')}
            />
          </nav>
        </div>

        {/* Section: Ventas */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Ventas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Inbox size={18} />} 
              label="Inbox" 
              badge="4"
              badgeColor="red"
              active={currentPage === 'inbox'}
              onClick={() => onNavigate('inbox')}
            />
            <MenuItem 
              icon={<MessageSquare size={18} />} 
              label="CRM" 
              badge="24"
              badgeColor="blue"
              active={currentPage === 'crm'}
              onClick={() => onNavigate('crm')}
            />
            <MenuItem 
              icon={<Users size={18} />} 
              label="Mayoristas" 
              active={currentPage === 'mayoristas'}
              onClick={() => onNavigate('mayoristas')}
            />
            <MenuItem 
              icon={<ShoppingCart size={18} />} 
              label="Ecommerce" 
              active={currentPage === 'ecommerce'}
              onClick={() => onNavigate('ecommerce')}
            />
            <MenuItem 
              icon={<ClipboardList size={18} />} 
              label="Pedidos" 
              active={currentPage === 'pedidos'}
              onClick={() => onNavigate('pedidos')}
            />
            <MenuItem 
              icon={<Wallet size={18} />} 
              label="Cobranzas" 
              active={currentPage === 'cobranzas'}
              onClick={() => onNavigate('cobranzas')}
              badge="3"
            />
          </nav>
        </div>

        {/* Section: Tiendas Minoristas */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Tiendas Minoristas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Store size={18} />} 
              label="Vista General" 
              active={currentPage === 'tiendas-overview'}
              onClick={() => onNavigate('tiendas-overview')}
              badge="3"
              badgeColor="green"
            />
            <MenuItem 
              icon={<span className="text-base">🐕</span>} 
              label="Pet Vogue" 
              active={currentPage === 'pet-vogue'}
              onClick={() => onNavigate('pet-vogue')}
              indent
            />
            <MenuItem 
              icon={<span className="text-base">🏠</span>} 
              label="CoreSmart" 
              active={currentPage === 'coresmart'}
              onClick={() => onNavigate('coresmart')}
              indent
            />
            <MenuItem 
              icon={<span className="text-base">💜</span>} 
              label="Sensuality" 
              active={currentPage === 'sensuality'}
              onClick={() => onNavigate('sensuality')}
              indent
            />
          </nav>
        </div>

        {/* Section: Marketing */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Marketing</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Target size={18} />} 
              label="Marketing Hub" 
              active={currentPage === 'marketing'}
              onClick={() => onNavigate('marketing')}
            />
            <MenuItem 
              icon={<Calendar size={18} />} 
              label="Contenido" 
              active={currentPage === 'contenido'}
              onClick={() => onNavigate('contenido')}
            />
            <MenuItem 
              icon={<Sparkles size={18} />} 
              label="Avatar Digital" 
              active={currentPage === 'avatar'}
              onClick={() => onNavigate('avatar')}
              badge="AI"
              badgeColor="purple"
            />
            <MenuItem 
              icon={<BarChart3 size={18} />} 
              label="Analytics" 
              active={currentPage === 'analytics'}
              onClick={() => onNavigate('analytics')}
            />
          </nav>
        </div>

        {/* Section: Finanzas */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Finanzas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<FileText size={18} />} 
              label="Reportes" 
              active={currentPage === 'reportes'}
              onClick={() => onNavigate('reportes')}
            />
            <MenuItem 
              icon={<Receipt size={18} />} 
              label="Facturación" 
              active={currentPage === 'facturacion'}
              onClick={() => onNavigate('facturacion')}
            />
            <MenuItem 
              icon={<CreditCard size={18} />} 
              label="Pagos" 
              active={currentPage === 'pagos'}
              onClick={() => onNavigate('pagos')}
            />
          </nav>
        </div>

        {/* Section: Inversores */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Inversores</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<TrendingUp size={18} />} 
              label="Dashboard" 
              active={currentPage === 'inversores'}
              onClick={() => onNavigate('inversores')}
            />
          </nav>
        </div>
        
        {/* Section: Config */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Sistema</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Settings size={18} />} 
              label="Configuración" 
              active={currentPage === 'settings'}
              onClick={() => onNavigate('settings')}
            />
            <MenuItem 
              icon={<Plug size={18} />} 
              label="Integraciones" 
              active={currentPage === 'integraciones'}
              onClick={() => onNavigate('integraciones')}
            />
          </nav>
        </div>
      </div>

      {/* Footer User */}
      <div className="p-4 border-t border-slate-100 rounded-bl-2xl">
        <button className="flex items-center w-full hover:bg-slate-50 p-2 rounded-lg transition-colors">
          <img 
            src="https://i.pravatar.cc/32?img=12" 
            alt="Admin" 
            className="w-8 h-8 rounded-full border border-slate-200"
          />
          <div className="ml-3 text-left flex-1">
            <p className="text-sm font-medium text-slate-700">Matías Admin</p>
            <p className="text-xs text-slate-400">CEO</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </aside>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'purple' | 'blue' | 'green';
  highlight?: boolean;
  indent?: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, active, badge, badgeColor = 'red', highlight, indent, onClick }) => {
  const badgeColors = {
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-emerald-100 text-emerald-600'
  };

  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${indent ? 'pl-6' : ''}
        ${active 
          ? 'bg-blue-50 text-blue-600' 
          : highlight 
            ? 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
      `}
    >
      <div className="flex items-center">
        <span className={`${active ? 'text-blue-600' : highlight ? 'text-amber-500' : 'text-slate-400'} mr-3`}>
          {icon}
        </span>
        {label}
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
      )}
    </button>
  );
};

export default Sidebar;
