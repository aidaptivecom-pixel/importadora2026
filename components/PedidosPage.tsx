import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  AlertCircle,
  ChevronDown,
  MoreHorizontal,
  Eye,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Phone,
  Mail,
  Copy,
  Printer
} from 'lucide-react';
import EmptyState from './EmptyState';

interface Pedido {
  id: string;
  numero: string;
  cliente: {
    nombre: string;
    empresa: string;
    email: string;
    telefono: string;
    categoria: 'A' | 'B' | 'C';
  };
  fecha: string;
  fechaEntrega: string;
  estado: 'pendiente' | 'confirmado' | 'preparacion' | 'despachado' | 'entregado' | 'cancelado';
  items: number;
  total: number;
  formaPago: string;
  origen: 'whatsapp' | 'email' | 'telefono' | 'presencial' | 'web';
  prioridad: 'normal' | 'urgente';
  notas?: string;
}

const PedidosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterOrigen, setFilterOrigen] = useState<string>('todos');
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  // Mock data - Pedidos mayoristas
  const pedidos: Pedido[] = [
    {
      id: '1',
      numero: 'PED-2026-0892',
      cliente: {
        nombre: 'Roberto Méndez',
        empresa: 'Distribuidora Norte SRL',
        email: 'roberto@distnorte.com',
        telefono: '+54 11 4555-1234',
        categoria: 'A'
      },
      fecha: '2026-01-13',
      fechaEntrega: '2026-01-15',
      estado: 'preparacion',
      items: 45,
      total: 892500,
      formaPago: 'Transferencia 30 días',
      origen: 'whatsapp',
      prioridad: 'urgente',
      notas: 'Cliente solicita entrega antes de las 10am'
    },
    {
      id: '2',
      numero: 'PED-2026-0891',
      cliente: {
        nombre: 'María González',
        empresa: 'Pet Shop Central',
        email: 'maria@petshopcentral.com',
        telefono: '+54 11 4666-5678',
        categoria: 'A'
      },
      fecha: '2026-01-13',
      fechaEntrega: '2026-01-16',
      estado: 'confirmado',
      items: 28,
      total: 456000,
      formaPago: 'Cuenta Corriente',
      origen: 'email',
      prioridad: 'normal'
    },
    {
      id: '3',
      numero: 'PED-2026-0890',
      cliente: {
        nombre: 'Carlos Ruiz',
        empresa: 'TecnoHogar SA',
        email: 'cruiz@tecnohogar.com',
        telefono: '+54 11 4777-9012',
        categoria: 'B'
      },
      fecha: '2026-01-12',
      fechaEntrega: '2026-01-14',
      estado: 'despachado',
      items: 15,
      total: 328750,
      formaPago: 'Contado',
      origen: 'telefono',
      prioridad: 'normal'
    },
    {
      id: '4',
      numero: 'PED-2026-0889',
      cliente: {
        nombre: 'Ana Martínez',
        empresa: 'Mascotas Felices',
        email: 'ana@mascotasfelices.com',
        telefono: '+54 351 555-3456',
        categoria: 'B'
      },
      fecha: '2026-01-12',
      fechaEntrega: '2026-01-13',
      estado: 'entregado',
      items: 62,
      total: 1125000,
      formaPago: 'Transferencia',
      origen: 'presencial',
      prioridad: 'normal'
    },
    {
      id: '5',
      numero: 'PED-2026-0888',
      cliente: {
        nombre: 'Jorge Fernández',
        empresa: 'Electro Mendoza',
        email: 'jfernandez@electromza.com',
        telefono: '+54 261 444-7890',
        categoria: 'A'
      },
      fecha: '2026-01-11',
      fechaEntrega: '2026-01-15',
      estado: 'preparacion',
      items: 33,
      total: 567800,
      formaPago: 'Cheque 60 días',
      origen: 'whatsapp',
      prioridad: 'normal'
    },
    {
      id: '6',
      numero: 'PED-2026-0887',
      cliente: {
        nombre: 'Laura Sánchez',
        empresa: 'Import Rosario',
        email: 'lsanchez@importros.com',
        telefono: '+54 341 666-1234',
        categoria: 'C'
      },
      fecha: '2026-01-11',
      fechaEntrega: '2026-01-18',
      estado: 'pendiente',
      items: 8,
      total: 89500,
      formaPago: 'Contado',
      origen: 'web',
      prioridad: 'normal'
    },
    {
      id: '7',
      numero: 'PED-2026-0886',
      cliente: {
        nombre: 'Pedro López',
        empresa: 'Distribuidora Sur',
        email: 'plopez@distsur.com',
        telefono: '+54 11 4888-5678',
        categoria: 'A'
      },
      fecha: '2026-01-10',
      fechaEntrega: '2026-01-12',
      estado: 'entregado',
      items: 95,
      total: 2340000,
      formaPago: 'Cuenta Corriente',
      origen: 'email',
      prioridad: 'urgente'
    },
    {
      id: '8',
      numero: 'PED-2026-0885',
      cliente: {
        nombre: 'Silvia Romero',
        empresa: 'Casa del Hogar',
        email: 'sromero@casahogar.com',
        telefono: '+54 11 4999-9012',
        categoria: 'B'
      },
      fecha: '2026-01-10',
      fechaEntrega: '2026-01-13',
      estado: 'cancelado',
      items: 12,
      total: 156000,
      formaPago: 'Transferencia',
      origen: 'telefono',
      prioridad: 'normal',
      notas: 'Cancelado por cliente - cambio de proveedor'
    }
  ];

  // KPIs
  const kpis = {
    pedidosMes: 47,
    pedidosMesAnterior: 42,
    valorPromedio: 485000,
    valorPromedioAnterior: 412000,
    tiempoDespacho: 2.3,
    tiempoDespachoAnterior: 2.8,
    tasaCumplimiento: 94.5,
    pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    enProceso: pedidos.filter(p => ['confirmado', 'preparacion'].includes(p.estado)).length,
    despachados: pedidos.filter(p => p.estado === 'despachado').length
  };

  const getEstadoConfig = (estado: Pedido['estado']) => {
    const configs = {
      pendiente: { 
        label: 'Pendiente', 
        color: 'bg-amber-100 text-amber-700',
        icon: Clock
      },
      confirmado: { 
        label: 'Confirmado', 
        color: 'bg-blue-100 text-blue-700',
        icon: CheckCircle2
      },
      preparacion: { 
        label: 'En Preparación', 
        color: 'bg-purple-100 text-purple-700',
        icon: Package
      },
      despachado: { 
        label: 'Despachado', 
        color: 'bg-indigo-100 text-indigo-700',
        icon: Truck
      },
      entregado: { 
        label: 'Entregado', 
        color: 'bg-emerald-100 text-emerald-700',
        icon: PackageCheck
      },
      cancelado: { 
        label: 'Cancelado', 
        color: 'bg-red-100 text-red-700',
        icon: AlertCircle
      }
    };
    return configs[estado];
  };

  const getOrigenIcon = (origen: Pedido['origen']) => {
    const icons = {
      whatsapp: '💬',
      email: '📧',
      telefono: '📞',
      presencial: '🏢',
      web: '🌐'
    };
    return icons[origen];
  };

  const getCategoriaColor = (categoria: 'A' | 'B' | 'C') => {
    const colors = {
      A: 'bg-emerald-100 text-emerald-700',
      B: 'bg-blue-100 text-blue-700',
      C: 'bg-slate-100 text-slate-700'
    };
    return colors[categoria];
  };

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = 
      pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || pedido.estado === filterEstado;
    const matchesOrigen = filterOrigen === 'todos' || pedido.origen === filterOrigen;
    return matchesSearch && matchesEstado && matchesOrigen;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short'
    });
  };

  // Determinar tipo de empty state
  const getEmptyStateType = () => {
    if (searchTerm) return 'search';
    if (filterEstado !== 'todos' || filterOrigen !== 'todos') return 'filter';
    return 'orders';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterEstado('todos');
    setFilterOrigen('todos');
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
            <div className={`flex items-center text-xs font-medium ${
              kpis.pedidosMes >= kpis.pedidosMesAnterior ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {kpis.pedidosMes >= kpis.pedidosMesAnterior ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(Math.round((kpis.pedidosMes - kpis.pedidosMesAnterior) / kpis.pedidosMesAnterior * 100))}%
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{kpis.pedidosMes}</p>
          <p className="text-sm text-slate-500">Pedidos este mes</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign className="text-emerald-600" size={20} />
            </div>
            <div className={`flex items-center text-xs font-medium ${
              kpis.valorPromedio >= kpis.valorPromedioAnterior ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {kpis.valorPromedio >= kpis.valorPromedioAnterior ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(Math.round((kpis.valorPromedio - kpis.valorPromedioAnterior) / kpis.valorPromedioAnterior * 100))}%
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(kpis.valorPromedio)}</p>
          <p className="text-sm text-slate-500">Ticket promedio</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Timer className="text-purple-600" size={20} />
            </div>
            <div className={`flex items-center text-xs font-medium ${
              kpis.tiempoDespacho <= kpis.tiempoDespachoAnterior ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {kpis.tiempoDespacho <= kpis.tiempoDespachoAnterior ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(Math.round((kpis.tiempoDespachoAnterior - kpis.tiempoDespacho) / kpis.tiempoDespachoAnterior * 100))}%
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{kpis.tiempoDespacho} días</p>
          <p className="text-sm text-slate-500">Tiempo despacho prom.</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-amber-600" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{kpis.tasaCumplimiento}%</p>
          <p className="text-sm text-slate-500">Tasa de cumplimiento</p>
        </div>
      </div>

      {/* Estado rápido */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => setFilterEstado('pendiente')}
          className={`bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-4 text-left transition-colors ${filterEstado === 'pendiente' ? 'ring-2 ring-amber-400' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-700">{kpis.pendientes}</p>
              <p className="text-sm text-amber-600">Pendientes de confirmar</p>
            </div>
            <Clock className="text-amber-400" size={32} />
          </div>
        </button>
        <button 
          onClick={() => setFilterEstado('preparacion')}
          className={`bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-4 text-left transition-colors ${filterEstado === 'preparacion' ? 'ring-2 ring-purple-400' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-700">{kpis.enProceso}</p>
              <p className="text-sm text-purple-600">En proceso</p>
            </div>
            <Package className="text-purple-400" size={32} />
          </div>
        </button>
        <button 
          onClick={() => setFilterEstado('despachado')}
          className={`bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl p-4 text-left transition-colors ${filterEstado === 'despachado' ? 'ring-2 ring-indigo-400' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-indigo-700">{kpis.despachados}</p>
              <p className="text-sm text-indigo-600">En tránsito</p>
            </div>
            <Truck className="text-indigo-400" size={32} />
          </div>
        </button>
      </div>

      {/* Filtros y acciones */}
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por número, cliente o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmado">Confirmado</option>
              <option value="preparacion">En Preparación</option>
              <option value="despachado">Despachado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <select
              value={filterOrigen}
              onChange={(e) => setFilterOrigen(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todos">Todos los canales</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="telefono">Teléfono</option>
              <option value="presencial">Presencial</option>
              <option value="web">Web</option>
            </select>

            {(searchTerm || filterEstado !== 'todos' || filterOrigen !== 'todos') && (
              <button 
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Download size={18} />
              <span className="text-sm font-medium">Exportar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span className="text-sm font-medium">Nuevo Pedido</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos o Empty State */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {filteredPedidos.length > 0 ? (
          <>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Pedido</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Cliente</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Fecha</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Entrega</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Items</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Total</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Canal</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPedidos.map((pedido) => {
                  const estadoConfig = getEstadoConfig(pedido.estado);
                  const EstadoIcon = estadoConfig.icon;
                  
                  return (
                    <tr 
                      key={pedido.id} 
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPedido(pedido)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-800">{pedido.numero}</span>
                          {pedido.prioridad === 'urgente' && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded">
                              URGENTE
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getCategoriaColor(pedido.cliente.categoria)}`}>
                            {pedido.cliente.categoria}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{pedido.cliente.empresa}</p>
                            <p className="text-xs text-slate-500">{pedido.cliente.nombre}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{formatDate(pedido.fecha)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{formatDate(pedido.fechaEntrega)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{pedido.items} items</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(pedido.total)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${estadoConfig.color}`}>
                          <EstadoIcon size={12} />
                          {estadoConfig.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-lg" title={pedido.origen}>
                          {getOrigenIcon(pedido.origen)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPedido(pedido);
                            }}
                          >
                            <Eye size={16} className="text-slate-400" />
                          </button>
                          <button 
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Printer size={16} className="text-slate-400" />
                          </button>
                          <button 
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal size={16} className="text-slate-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-sm text-slate-500">
                Mostrando {filteredPedidos.length} de {pedidos.length} pedidos
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-white rounded border border-slate-200">
                  Anterior
                </button>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-white rounded border border-slate-200">
                  2
                </button>
                <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-white rounded border border-slate-200">
                  Siguiente
                </button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState 
            type={getEmptyStateType()}
            title={searchTerm ? `Sin resultados para "${searchTerm}"` : undefined}
            actionLabel="Limpiar filtros"
            onAction={clearFilters}
          />
        )}
      </div>

      {/* Panel lateral de detalle */}
      {selectedPedido && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-end" onClick={() => setSelectedPedido(null)}>
          <div 
            className="w-[500px] bg-white h-full shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del panel */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{selectedPedido.numero}</h3>
                    {selectedPedido.prioridad === 'urgente' && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-600 rounded">
                        URGENTE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">
                    Creado el {new Date(selectedPedido.fecha).toLocaleDateString('es-AR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedPedido(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <span className="text-slate-400 text-xl">×</span>
                </button>
              </div>

              {/* Estado actual */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getEstadoConfig(selectedPedido.estado).color}`}>
                {React.createElement(getEstadoConfig(selectedPedido.estado).icon, { size: 16 })}
                {getEstadoConfig(selectedPedido.estado).label}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Cliente */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Cliente</h4>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getCategoriaColor(selectedPedido.cliente.categoria)}`}>
                      {selectedPedido.cliente.categoria}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{selectedPedido.cliente.empresa}</p>
                      <p className="text-sm text-slate-500">{selectedPedido.cliente.nombre}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={14} className="text-slate-400" />
                      {selectedPedido.cliente.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={14} className="text-slate-400" />
                      {selectedPedido.cliente.telefono}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles del pedido */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Detalles</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Fecha de entrega</p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(selectedPedido.fechaEntrega).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Canal de origen</p>
                    <p className="font-semibold text-slate-800">
                      {getOrigenIcon(selectedPedido.origen)} {selectedPedido.origen.charAt(0).toUpperCase() + selectedPedido.origen.slice(1)}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Items</p>
                    <p className="font-semibold text-slate-800">{selectedPedido.items} productos</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Forma de pago</p>
                    <p className="font-semibold text-slate-800">{selectedPedido.formaPago}</p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">Total del pedido</span>
                  <span className="text-2xl font-bold text-blue-700">{formatCurrency(selectedPedido.total)}</span>
                </div>
              </div>

              {/* Notas */}
              {selectedPedido.notas && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Notas</h4>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">{selectedPedido.notas}</p>
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {selectedPedido.estado === 'pendiente' && (
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Confirmar Pedido
                  </button>
                )}
                {selectedPedido.estado === 'confirmado' && (
                  <button className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Iniciar Preparación
                  </button>
                )}
                {selectedPedido.estado === 'preparacion' && (
                  <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Marcar como Despachado
                  </button>
                )}
                {selectedPedido.estado === 'despachado' && (
                  <button className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    Confirmar Entrega
                  </button>
                )}
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    <Printer size={16} />
                    Imprimir
                  </button>
                  <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    <FileText size={16} />
                    Remito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
