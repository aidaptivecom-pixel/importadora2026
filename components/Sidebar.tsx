import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Heart,
  Megaphone,
  ImagePlus,
  FolderOpen,
  Wand2,
  Bot,
  HeadphonesIcon,
  RefreshCw,
  Palette
} from 'lucide-react';
import { PageType } from '../App';
import { getSidebarBadges, shouldShowBadge, getBadgeUrgency, BadgeUrgency } from '../utils/badgeData';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// Animation variants
const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  },
  pulse: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  // Get dynamic badge counts
  const badges = useMemo(() => getSidebarBadges(), []);

  return (
    <motion.aside 
      className="fixed left-4 top-4 h-[calc(100vh-32px)] w-64 bg-white border-r border-slate-100 flex flex-col z-20 rounded-l-2xl"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Header Logo */}
      <motion.div 
        className="h-16 flex items-center px-6 border-b border-slate-50 rounded-tl-2xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white mr-3 shadow-sm"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe size={18} />
        </motion.div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">Nexo Global</span>
      </motion.div>

      {/* Team Selector */}
      <motion.div 
        className="px-4 py-4"
        variants={itemVariants}
      >
        <motion.button 
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-2">
              NG
            </div>
            <span className="text-sm font-medium text-slate-700">Import Ops</span>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </motion.button>
      </motion.div>

      {/* Menu Area */}
      <motion.div 
        className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar"
        variants={sidebarVariants}
      >
        
        {/* Section: Principal */}
        <motion.div variants={itemVariants}>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Sun size={18} />} 
              label="Hoy" 
              active={currentPage === 'hoy'}
              onClick={() => onNavigate('hoy')}
              highlight
              index={0}
            />
            <MenuItem 
              icon={<CheckSquare size={18} />} 
              label="Tareas" 
              active={currentPage === 'tareas'}
              onClick={() => onNavigate('tareas')}
              badge={shouldShowBadge(badges.tareas) ? badges.tareas.toString() : undefined}
              badgeUrgency={getBadgeUrgency('tareas', badges.tareas)}
              index={1}
            />
            <MenuItem 
              icon={<BookOpen size={18} />} 
              label="Documentación" 
              active={currentPage === 'documentacion'}
              onClick={() => onNavigate('documentacion')}
              index={2}
            />
          </nav>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="border-t border-slate-100"
          variants={itemVariants}
        />

        {/* Section: Operaciones */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Operaciones</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={currentPage === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
              index={3}
            />
            <MenuItem 
              icon={<FolderKanban size={18} />} 
              label="Tablero" 
              active={currentPage === 'tablero'}
              onClick={() => onNavigate('tablero')}
              badge={shouldShowBadge(badges.tablero) ? badges.tablero.toString() : undefined}
              badgeColor="blue"
              index={4}
            />
            <MenuItem 
              icon={<Container size={18} />} 
              label="Operaciones" 
              active={currentPage === 'operaciones'}
              onClick={() => onNavigate('operaciones')}
              index={5}
            />
            <MenuItem 
              icon={<Ship size={18} />} 
              label="Embarques" 
              active={currentPage === 'embarques'}
              onClick={() => onNavigate('embarques')}
              index={6}
            />
            <MenuItem 
              icon={<Package size={18} />} 
              label="Inventario" 
              active={currentPage === 'inventario'}
              onClick={() => onNavigate('inventario')}
              index={7}
            />
            <MenuItem 
              icon={<Factory size={18} />} 
              label="Proveedores" 
              active={currentPage === 'proveedores'}
              onClick={() => onNavigate('proveedores')}
              index={8}
            />
          </nav>
        </motion.div>

        {/* Section: Ventas */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Ventas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Inbox size={18} />} 
              label="Inbox" 
              badge={shouldShowBadge(badges.inbox) ? badges.inbox.toString() : undefined}
              badgeColor="red"
              badgeUrgency={getBadgeUrgency('inbox', badges.inbox)}
              active={currentPage === 'inbox'}
              onClick={() => onNavigate('inbox')}
              index={9}
            />
            <MenuItem 
              icon={<MessageSquare size={18} />} 
              label="CRM" 
              badge={shouldShowBadge(badges.crm) ? badges.crm.toString() : undefined}
              badgeColor="blue"
              active={currentPage === 'crm'}
              onClick={() => onNavigate('crm')}
              index={10}
            />
            <MenuItem 
              icon={<Users size={18} />} 
              label="Mayoristas" 
              active={currentPage === 'mayoristas'}
              onClick={() => onNavigate('mayoristas')}
              index={11}
            />
            <MenuItem 
              icon={<ShoppingCart size={18} />} 
              label="Ecommerce" 
              active={currentPage === 'ecommerce'}
              onClick={() => onNavigate('ecommerce')}
              index={12}
            />
            <MenuItem 
              icon={<ClipboardList size={18} />} 
              label="Pedidos" 
              active={currentPage === 'pedidos'}
              onClick={() => onNavigate('pedidos')}
              index={13}
            />
            <MenuItem 
              icon={<Wallet size={18} />} 
              label="Cobranzas" 
              active={currentPage === 'cobranzas'}
              onClick={() => onNavigate('cobranzas')}
              badge={shouldShowBadge(badges.cobranzas) ? badges.cobranzas.toString() : undefined}
              badgeColor="red"
              badgeUrgency={getBadgeUrgency('cobranzas', badges.cobranzas)}
              index={14}
            />
          </nav>
        </motion.div>

        {/* Section: Tiendas Minoristas */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Tiendas Minoristas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Store size={18} />} 
              label="Vista General" 
              active={currentPage === 'tiendas-overview'}
              onClick={() => onNavigate('tiendas-overview')}
              badge={shouldShowBadge(badges.tiendasOverview) ? badges.tiendasOverview.toString() : undefined}
              badgeColor="green"
              index={15}
            />
            <MenuItem 
              icon={<span className="text-base">🐕</span>} 
              label="Pet Vogue" 
              active={currentPage === 'pet-vogue'}
              onClick={() => onNavigate('pet-vogue')}
              indent
              index={16}
            />
            <MenuItem 
              icon={<span className="text-base">🏠</span>} 
              label="CoreSmart" 
              active={currentPage === 'coresmart'}
              onClick={() => onNavigate('coresmart')}
              indent
              index={17}
            />
            <MenuItem 
              icon={<span className="text-base">💜</span>} 
              label="Sensuality" 
              active={currentPage === 'sensuality'}
              onClick={() => onNavigate('sensuality')}
              indent
              index={18}
            />
          </nav>
        </motion.div>

        {/* Section: Marketing Central */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Marketing Central</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Target size={18} />} 
              label="Dashboard" 
              active={currentPage === 'marketing'}
              onClick={() => onNavigate('marketing')}
              index={19}
            />
            <MenuItem 
              icon={<Calendar size={18} />} 
              label="Calendario Editorial" 
              active={currentPage === 'marketing-calendario'}
              onClick={() => onNavigate('marketing-calendario')}
              indent
              index={20}
            />
            <MenuItem 
              icon={<Sparkles size={18} />} 
              label="Avatares IA" 
              active={currentPage === 'marketing-avatares'}
              onClick={() => onNavigate('marketing-avatares')}
              badge="AI"
              badgeColor="purple"
              indent
              index={21}
            />
            <MenuItem 
              icon={<Wand2 size={18} />} 
              label="Generador" 
              active={currentPage === 'marketing-generador'}
              onClick={() => onNavigate('marketing-generador')}
              badge="AI"
              badgeColor="purple"
              indent
              index={22}
            />
            <MenuItem 
              icon={<Megaphone size={18} />} 
              label="Campañas" 
              active={currentPage === 'marketing-campanas'}
              onClick={() => onNavigate('marketing-campanas')}
              badge={shouldShowBadge(badges.marketingCampanas) ? badges.marketingCampanas.toString() : undefined}
              badgeColor="blue"
              indent
              index={23}
            />
            <MenuItem 
              icon={<FolderOpen size={18} />} 
              label="Assets" 
              active={currentPage === 'marketing-assets'}
              onClick={() => onNavigate('marketing-assets')}
              indent
              index={24}
            />
            <MenuItem 
              icon={<BarChart3 size={18} />} 
              label="Analytics" 
              active={currentPage === 'analytics'}
              onClick={() => onNavigate('analytics')}
              indent
              index={25}
            />
          </nav>
        </motion.div>

        {/* Section: Agentes AI */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Agentes AI</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Bot size={18} />} 
              label="Centro de Agentes" 
              active={currentPage === 'agentes-centro'}
              onClick={() => onNavigate('agentes-centro')}
              badge={shouldShowBadge(badges.agentesCentro) ? badges.agentesCentro.toString() : undefined}
              badgeColor="purple"
              index={26}
            />
            <MenuItem 
              icon={<ShoppingCart size={18} />} 
              label="Agente Ventas" 
              active={currentPage === 'agente-ventas'}
              onClick={() => onNavigate('agente-ventas')}
              badge={shouldShowBadge(badges.agenteVentas) ? badges.agenteVentas.toString() : undefined}
              badgeColor="green"
              indent
              index={27}
            />
            <MenuItem 
              icon={<HeadphonesIcon size={18} />} 
              label="Agente Soporte" 
              active={currentPage === 'agente-soporte'}
              onClick={() => onNavigate('agente-soporte')}
              badge={shouldShowBadge(badges.agenteSoporte) ? badges.agenteSoporte.toString() : undefined}
              badgeColor="blue"
              indent
              index={28}
            />
            <MenuItem 
              icon={<RefreshCw size={18} />} 
              label="Agente Postventa" 
              active={currentPage === 'agente-postventa'}
              onClick={() => onNavigate('agente-postventa')}
              badge={shouldShowBadge(badges.agentePostventa) ? badges.agentePostventa.toString() : undefined}
              badgeColor="blue"
              indent
              index={29}
            />
            <MenuItem 
              icon={<Palette size={18} />} 
              label="Agente Marketing" 
              active={currentPage === 'agente-marketing'}
              onClick={() => onNavigate('agente-marketing')}
              badge={shouldShowBadge(badges.agenteMarketing) ? badges.agenteMarketing.toString() : undefined}
              badgeColor="purple"
              indent
              index={30}
            />
          </nav>
        </motion.div>

        {/* Section: Finanzas */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Finanzas</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<FileText size={18} />} 
              label="Reportes" 
              active={currentPage === 'reportes'}
              onClick={() => onNavigate('reportes')}
              index={31}
            />
            <MenuItem 
              icon={<Receipt size={18} />} 
              label="Facturación" 
              active={currentPage === 'facturacion'}
              onClick={() => onNavigate('facturacion')}
              index={32}
            />
            <MenuItem 
              icon={<CreditCard size={18} />} 
              label="Pagos" 
              active={currentPage === 'pagos'}
              onClick={() => onNavigate('pagos')}
              badge={shouldShowBadge(badges.pagos) ? badges.pagos.toString() : undefined}
              badgeColor="red"
              badgeUrgency={getBadgeUrgency('pagos', badges.pagos)}
              index={33}
            />
          </nav>
        </motion.div>

        {/* Section: Inversores */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Inversores</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<TrendingUp size={18} />} 
              label="Dashboard" 
              active={currentPage === 'inversores'}
              onClick={() => onNavigate('inversores')}
              index={34}
            />
          </nav>
        </motion.div>
        
        {/* Section: Config */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Sistema</h3>
          <nav className="space-y-1">
            <MenuItem 
              icon={<Settings size={18} />} 
              label="Configuración" 
              active={currentPage === 'settings'}
              onClick={() => onNavigate('settings')}
              index={35}
            />
            <MenuItem 
              icon={<Plug size={18} />} 
              label="Integraciones" 
              active={currentPage === 'integraciones'}
              onClick={() => onNavigate('integraciones')}
              index={36}
            />
          </nav>
        </motion.div>
      </motion.div>

      {/* Footer User */}
      <motion.div 
        className="p-4 border-t border-slate-100 rounded-bl-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button 
          className="flex items-center w-full hover:bg-slate-50 p-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.img 
            src="https://i.pravatar.cc/32?img=12" 
            alt="Admin" 
            className="w-8 h-8 rounded-full border border-slate-200"
            whileHover={{ scale: 1.1 }}
          />
          <div className="ml-3 text-left flex-1">
            <p className="text-sm font-medium text-slate-700">Matías Admin</p>
            <p className="text-xs text-slate-400">CEO</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'purple' | 'blue' | 'green';
  badgeUrgency?: BadgeUrgency;
  highlight?: boolean;
  indent?: boolean;
  onClick: () => void;
  index?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  active, 
  badge, 
  badgeColor = 'red', 
  badgeUrgency,
  highlight, 
  indent, 
  onClick,
  index = 0
}) => {
  // Dynamic badge colors based on urgency
  const getBadgeStyle = () => {
    if (badgeUrgency === 'critical') {
      return 'bg-red-500 text-white';
    }
    if (badgeUrgency === 'high') {
      return 'bg-red-500 text-white';
    }
    
    const baseColors = {
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-emerald-100 text-emerald-600'
    };
    return baseColors[badgeColor];
  };

  return (
    <motion.button 
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors relative overflow-hidden
        ${indent ? 'pl-6' : ''}
        ${active 
          ? 'bg-blue-50 text-blue-600' 
          : highlight 
            ? 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
      `}
      variants={itemVariants}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator bar */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center">
        <motion.span 
          className={`${active ? 'text-blue-600' : highlight ? 'text-amber-500' : 'text-slate-400'} mr-3`}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
        {label}
      </div>
      
      <AnimatePresence mode="wait">
        {badge && (
          <motion.span 
            key={badge}
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${getBadgeStyle()}`}
            variants={badgeVariants}
            initial="initial"
            animate={badgeUrgency === 'critical' ? 'pulse' : 'animate'}
            exit={{ scale: 0, opacity: 0 }}
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Sidebar;
