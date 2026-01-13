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
  // Marketing Central
  | 'marketing'
  | 'marketing-calendario'
  | 'marketing-avatares'
  | 'marketing-generador'
  | 'marketing-campanas'
  | 'marketing-assets'
  | 'contenido'
  | 'avatar'
  | 'analytics'
  // Agentes AI
  | 'agentes-centro'
  | 'agente-ventas'
  | 'agente-soporte'
  | 'agente-postventa'
  | 'agente-marketing'
  // Finanzas
  | 'reportes'
  | 'facturacion'
  | 'pagos'
  // Tiendas Minoristas
  | 'tiendas-overview'
  | 'pet-vogue'
  | 'coresmart'
  | 'sensuality'
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
      marketing: 'Marketing Central',
      'marketing-calendario': 'Calendario Editorial',
      'marketing-avatares': 'Avatares Digitales',
      'marketing-generador': 'Generador de Contenido',
      'marketing-campanas': 'Campañas',
      'marketing-assets': 'Biblioteca de Assets',
      contenido: 'Contenido',
      avatar: 'Avatar Digital',
      analytics: 'Analytics',
      'agentes-centro': 'Centro de Agentes AI',
      'agente-ventas': 'Agente de Ventas',
      'agente-soporte': 'Agente de Soporte',
      'agente-postventa': 'Agente de Postventa',
      'agente-marketing': 'Agente de Marketing',
      reportes: 'Reportes',
      facturacion: 'Facturación',
      pagos: 'Pagos',
      'tiendas-overview': 'Tiendas Minoristas',
      'pet-vogue': 'Pet Vogue',
      'coresmart': 'CoreSmart',
      'sensuality': 'Sensuality',
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
      marketing: 'Marketing Central',
      'marketing-calendario': 'Marketing Central',
      'marketing-avatares': 'Marketing Central',
      'marketing-generador': 'Marketing Central',
      'marketing-campanas': 'Marketing Central',
      'marketing-assets': 'Marketing Central',
      contenido: 'Marketing',
      avatar: 'Marketing',
      analytics: 'Marketing',
      'agentes-centro': 'Agentes AI',
      'agente-ventas': 'Agentes AI',
      'agente-soporte': 'Agentes AI',
      'agente-postventa': 'Agentes AI',
      'agente-marketing': 'Agentes AI',
      reportes: 'Finanzas',
      facturacion: 'Finanzas',
      pagos: 'Finanzas',
      'tiendas-overview': 'Tiendas Minoristas',
      'pet-vogue': 'Tiendas Minoristas',
      'coresmart': 'Tiendas Minoristas',
      'sensuality': 'Tiendas Minoristas',
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
            onNavigate={handleNavigate}
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
