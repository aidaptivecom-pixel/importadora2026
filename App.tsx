import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';

export type PageType = 
  // Principal
  | 'hoy' 
  | 'tareas' 
  | 'documentacion'
  // Operaciones
  | 'dashboard' 
  | 'tablero'
  | 'operaciones'
  | 'operacion_detalle'
  | 'embarques' 
  | 'inventario' 
  | 'proveedores'
  // Ventas
  | 'inbox'
  | 'crm'
  | 'mayoristas' 
  | 'ecommerce' 
  | 'pedidos' 
  | 'cobranzas'
  // Marketing
  | 'marketing'
  | 'contenido'
  | 'avatar'
  | 'analytics'
  // Finanzas
  | 'reportes'
  | 'facturacion'
  | 'pagos'
  // Inversores
  | 'inversores'
  // Config
  | 'settings'
  | 'integraciones';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('hoy');
  const [selectedOperacionId, setSelectedOperacionId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageType, operacionId?: string) => {
    setCurrentPage(page);
    if (operacionId) {
      setSelectedOperacionId(operacionId);
    } else if (page !== 'operacion_detalle') {
      setSelectedOperacionId(undefined);
    }
  };

  const getPageTitle = (): string => {
    const titles: Record<PageType, string> = {
      hoy: 'Hoy',
      tareas: 'Tareas',
      documentacion: 'Documentación',
      dashboard: 'Dashboard',
      tablero: 'Tablero de Operaciones',
      operaciones: 'Operaciones',
      operacion_detalle: selectedOperacionId ? `Operación ${selectedOperacionId}` : 'Detalle Operación',
      embarques: 'Embarques',
      inventario: 'Inventario',
      proveedores: 'Proveedores',
      inbox: 'Inbox',
      crm: 'CRM',
      mayoristas: 'Clientes Mayoristas',
      ecommerce: 'Ecommerce Hub',
      pedidos: 'Pedidos',
      cobranzas: 'Cobranzas',
      marketing: 'Marketing Hub',
      contenido: 'Contenido',
      avatar: 'Avatar Digital',
      analytics: 'Analytics',
      reportes: 'Reportes',
      facturacion: 'Facturación',
      pagos: 'Pagos',
      inversores: 'Dashboard Inversores',
      settings: 'Configuración',
      integraciones: 'Integraciones'
    };
    return titles[currentPage];
  };

  const getBreadcrumb = (): string => {
    const sections: Record<PageType, string> = {
      hoy: 'Principal',
      tareas: 'Principal',
      documentacion: 'Principal',
      dashboard: 'Operaciones',
      tablero: 'Operaciones',
      operaciones: 'Operaciones',
      operacion_detalle: 'Operaciones',
      embarques: 'Operaciones',
      inventario: 'Operaciones',
      proveedores: 'Operaciones',
      inbox: 'Ventas',
      crm: 'Ventas',
      mayoristas: 'Ventas',
      ecommerce: 'Ventas',
      pedidos: 'Ventas',
      cobranzas: 'Ventas',
      marketing: 'Marketing',
      contenido: 'Marketing',
      avatar: 'Marketing',
      analytics: 'Marketing',
      reportes: 'Finanzas',
      facturacion: 'Finanzas',
      pagos: 'Finanzas',
      inversores: 'Inversores',
      settings: 'Configuración',
      integraciones: 'Configuración'
    };
    return sections[currentPage];
  };

  return (
    <div className="min-h-screen bg-slate-200 p-4">
      {/* Dashboard Container with rounded corners */}
      <div className="flex min-h-[calc(100vh-32px)] bg-[#f8fafc] text-slate-800 font-sans rounded-2xl shadow-xl overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

        <div className="flex-1 flex flex-col min-w-0 ml-64">
          <Header 
            currentPage={currentPage} 
            pageTitle={getPageTitle()} 
            breadcrumb={getBreadcrumb()}
          />
          
          <main className="flex-1 p-8 overflow-y-auto">
            <DashboardContent 
              currentPage={currentPage} 
              onNavigate={handleNavigate}
              selectedOperacionId={selectedOperacionId}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
