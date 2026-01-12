import React from 'react';
import { Search, Bell, Mail, Plus, Download, Calendar } from 'lucide-react';
import { PageType } from '../App';

interface HeaderProps {
  currentPage: PageType;
  pageTitle: string;
  breadcrumb: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage, pageTitle, breadcrumb }) => {
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

  // Contar notificaciones (simulado)
  const notifications = {
    alerts: 3,
    messages: 24
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 px-8 flex items-center justify-between">
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
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <Bell size={20} />
            {notifications.alerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {notifications.alerts}
              </span>
            )}
          </button>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <Mail size={20} />
            {notifications.messages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {notifications.messages > 9 ? '9+' : notifications.messages}
              </span>
            )}
          </button>
        </div>

        {/* User & Action */}
        <div className="flex items-center gap-4">
           <img 
            src="https://i.pravatar.cc/32?img=12" 
            alt="User" 
            className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm cursor-pointer"
          />
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
