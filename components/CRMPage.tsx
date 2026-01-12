import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  MessageSquare,
  Clock,
  ChevronRight,
  Building2,
  MapPin,
  Tag,
  MoreHorizontal,
  X,
  Download,
  FileText,
  ChevronDown,
  User,
  Star,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { ContactoCRM, EtapaCRM } from '../types';
import { CRM_CONTACTOS } from '../constants';

// ============ EXPORT DROPDOWN ============
const ExportDropdown: React.FC<{ onExportExcel: () => void; onExportCSV: () => void }> = ({ onExportExcel, onExportCSV }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm font-medium text-emerald-700 transition-colors"
      >
        <Download size={16} />Exportar<ChevronDown size={14} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
            <button onClick={() => { onExportExcel(); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <FileText size={14} className="text-green-600" />Excel (.xlsx)
            </button>
            <button onClick={() => { onExportCSV(); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <FileText size={14} className="text-blue-600" />CSV (.csv)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ============ MAIN CRM PAGE ============
const CRMPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'pipeline' | 'lista'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEtapa, setFilterEtapa] = useState<string>('');
  const [filterOrigen, setFilterOrigen] = useState<string>('');
  const [selectedContact, setSelectedContact] = useState<ContactoCRM | null>(null);

  const etapas: { id: EtapaCRM; label: string; color: string; bgColor: string }[] = [
    { id: 'lead', label: 'Leads', color: 'text-slate-600', bgColor: 'bg-slate-100' },
    { id: 'contactado', label: 'Contactados', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'propuesta', label: 'Propuesta', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'negociacion', label: 'Negociación', color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { id: 'ganado', label: 'Ganados', color: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  const origenLabels: Record<string, string> = {
    referido: 'Referido',
    web: 'Web',
    feria: 'Feria',
    linkedin: 'LinkedIn',
    llamada_fria: 'Llamada Fría',
    ecommerce: 'Ecommerce',
    otro: 'Otro'
  };

  const filteredContactos = useMemo(() => {
    return CRM_CONTACTOS.filter(c => {
      const matchSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.empresa.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEtapa = !filterEtapa || c.etapa === filterEtapa;
      const matchOrigen = !filterOrigen || c.origen === filterOrigen;
      return matchSearch && matchEtapa && matchOrigen && c.etapa !== 'perdido';
    });
  }, [searchTerm, filterEtapa, filterOrigen]);

  const getContactosByEtapa = (etapa: EtapaCRM) => filteredContactos.filter(c => c.etapa === etapa);

  // KPIs
  const totalLeads = CRM_CONTACTOS.filter(c => c.etapa !== 'perdido' && c.etapa !== 'ganado').length;
  const leadsActivos = CRM_CONTACTOS.filter(c => c.etapa === 'lead' || c.etapa === 'contactado').length;
  const enNegociacion = CRM_CONTACTOS.filter(c => c.etapa === 'propuesta' || c.etapa === 'negociacion').length;
  const valorPipeline = CRM_CONTACTOS.filter(c => c.etapa !== 'perdido' && c.etapa !== 'ganado')
    .reduce((acc, c) => acc + (c.valorPotencial * c.probabilidad / 100), 0);
  const ganados30d = CRM_CONTACTOS.filter(c => c.etapa === 'ganado').length;

  const clearFilters = () => { setSearchTerm(''); setFilterEtapa(''); setFilterOrigen(''); };
  const hasFilters = searchTerm || filterEtapa || filterOrigen;

  const handleExportExcel = () => console.log('Export Excel');
  const handleExportCSV = () => console.log('Export CSV');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">CRM - Pipeline de Ventas</h1>
          <p className="text-sm text-slate-500 mt-1">{totalLeads} oportunidades activas • ${(valorPipeline / 1000).toFixed(0)}K valor ponderado</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'pipeline' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setViewMode('lista')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'lista' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Lista
            </button>
          </div>
          <ExportDropdown onExportExcel={handleExportExcel} onExportCSV={handleExportCSV} />
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <Plus size={16} />Nuevo Lead
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Users size={20} /></div>
            <span className="text-sm font-medium text-slate-500">Total Leads</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalLeads}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Target size={20} /></div>
            <span className="text-sm font-medium text-slate-500">En Negociación</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{enNegociacion}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><DollarSign size={20} /></div>
            <span className="text-sm font-medium text-slate-500">Valor Pipeline</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${(valorPipeline / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
            <span className="text-sm font-medium text-slate-500">Ganados (30d)</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{ganados30d}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><TrendingUp size={20} /></div>
            <span className="text-sm font-medium text-slate-500">Conversión</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">24%</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar contacto o empresa..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <select
            value={filterEtapa}
            onChange={(e) => setFilterEtapa(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todas las etapas</option>
            {etapas.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
          </select>
          <select
            value={filterOrigen}
            onChange={(e) => setFilterOrigen(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todos los orígenes</option>
            {Object.entries(origenLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500">{filteredContactos.length} contactos</span>
        </div>
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {etapas.filter(e => e.id !== 'perdido').map((etapa) => {
            const contactos = getContactosByEtapa(etapa.id);
            const valorEtapa = contactos.reduce((acc, c) => acc + c.valorPotencial, 0);
            return (
              <div key={etapa.id} className="flex-shrink-0 w-72">
                <div className={`${etapa.bgColor} rounded-t-xl p-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${etapa.color}`}>{etapa.label}</h3>
                    <span className="text-xs bg-white/60 text-slate-600 px-2 py-0.5 rounded-full font-medium">{contactos.length}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">${(valorEtapa / 1000).toFixed(0)}K</span>
                </div>
                <div className="bg-slate-50 rounded-b-xl p-3 min-h-[400px] space-y-3">
                  {contactos.map((contacto) => (
                    <ContactCard key={contacto.id} contacto={contacto} onClick={() => setSelectedContact(contacto)} />
                  ))}
                  {contactos.length === 0 && (
                    <div className="text-center text-slate-400 text-sm py-8">Sin contactos</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lista View */}
      {viewMode === 'lista' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Empresa</th>
                  <th className="p-4">Etapa</th>
                  <th className="p-4">Origen</th>
                  <th className="p-4 text-right">Valor Potencial</th>
                  <th className="p-4 text-center">Prob.</th>
                  <th className="p-4">Último Contacto</th>
                  <th className="p-4">Próxima Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {filteredContactos.map((contacto) => (
                  <tr
                    key={contacto.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedContact(contacto)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {contacto.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{contacto.nombre}</p>
                          <p className="text-xs text-slate-400">{contacto.cargo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Building2 size={14} className="text-slate-400" />
                        {contacto.empresa}
                      </div>
                    </td>
                    <td className="p-4">
                      <EtapaBadge etapa={contacto.etapa} />
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{origenLabels[contacto.origen]}</span>
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-800">${contacto.valorPotencial.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`text-sm font-medium ${contacto.probabilidad >= 70 ? 'text-green-600' : contacto.probabilidad >= 40 ? 'text-amber-600' : 'text-slate-500'}`}>
                        {contacto.probabilidad}%
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(contacto.ultimoContacto).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="p-4">
                      {contacto.proximaAccion ? (
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-blue-500" />
                          <span className="text-xs text-slate-600 max-w-[150px] truncate">{contacto.proximaAccion}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <ContactDetailModal contacto={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
    </div>
  );
};

// ============ CONTACT CARD (Pipeline) ============
const ContactCard: React.FC<{ contacto: ContactoCRM; onClick: () => void }> = ({ contacto, onClick }) => {
  const diasSinContacto = Math.floor((new Date().getTime() - new Date(contacto.ultimoContacto).getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {contacto.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800 leading-tight">{contacto.nombre}</p>
            <p className="text-xs text-slate-400">{contacto.empresa}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${contacto.probabilidad >= 70 ? 'bg-green-100 text-green-700' : contacto.probabilidad >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
          {contacto.probabilidad}%
        </span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-500">
          <span className="flex items-center gap-1">
            <DollarSign size={12} />
            ${(contacto.valorPotencial / 1000).toFixed(0)}K
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {contacto.ciudad}
          </span>
        </div>
        
        {diasSinContacto > 7 && (
          <div className="flex items-center gap-1 text-amber-600">
            <AlertCircle size={12} />
            {diasSinContacto} días sin contacto
          </div>
        )}
        
        {contacto.proximaAccion && (
          <div className="pt-2 border-t border-slate-50">
            <div className="flex items-start gap-1.5">
              <Clock size={10} className="text-blue-500 mt-0.5" />
              <span className="text-slate-600 line-clamp-1">{contacto.proximaAccion}</span>
            </div>
          </div>
        )}
      </div>
      
      {contacto.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {contacto.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{tag}</span>
          ))}
          {contacto.tags.length > 2 && (
            <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">+{contacto.tags.length - 2}</span>
          )}
        </div>
      )}
    </div>
  );
};

// ============ ETAPA BADGE ============
const EtapaBadge: React.FC<{ etapa: EtapaCRM }> = ({ etapa }) => {
  const styles: Record<EtapaCRM, string> = {
    lead: 'bg-slate-100 text-slate-600',
    contactado: 'bg-blue-50 text-blue-600',
    propuesta: 'bg-purple-50 text-purple-600',
    negociacion: 'bg-amber-50 text-amber-600',
    ganado: 'bg-green-50 text-green-600',
    perdido: 'bg-red-50 text-red-600'
  };
  const labels: Record<EtapaCRM, string> = {
    lead: 'Lead',
    contactado: 'Contactado',
    propuesta: 'Propuesta',
    negociacion: 'Negociación',
    ganado: 'Ganado',
    perdido: 'Perdido'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[etapa]}`}>
      {labels[etapa]}
    </span>
  );
};

// ============ CONTACT DETAIL MODAL ============
const ContactDetailModal: React.FC<{ contacto: ContactoCRM; onClose: () => void }> = ({ contacto, onClose }) => {
  const tipoIcons: Record<string, React.ReactNode> = {
    llamada: <Phone size={14} className="text-blue-500" />,
    email: <Mail size={14} className="text-purple-500" />,
    reunion: <Calendar size={14} className="text-green-500" />,
    whatsapp: <MessageSquare size={14} className="text-emerald-500" />,
    visita: <MapPin size={14} className="text-amber-500" />,
    nota: <FileText size={14} className="text-slate-400" />
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {contacto.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{contacto.nombre}</h2>
              <p className="text-sm text-slate-500">{contacto.cargo} en {contacto.empresa}</p>
              <div className="flex items-center gap-3 mt-2">
                <EtapaBadge etapa={contacto.etapa} />
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin size={14} />{contacto.ciudad}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-2 gap-6">
            {/* Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <a href={`mailto:${contacto.email}`} className="text-sm text-blue-600 hover:underline">{contacto.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{contacto.telefono}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{contacto.empresa}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Oportunidad</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Valor Potencial</p>
                    <p className="text-lg font-bold text-slate-800">${contacto.valorPotencial.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Probabilidad</p>
                    <p className="text-lg font-bold text-emerald-600">{contacto.probabilidad}%</p>
                  </div>
                </div>
              </div>

              {contacto.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contacto.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interacciones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Historial</h3>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <Plus size={12} />Agregar
                </button>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {contacto.interacciones.map((inter) => (
                  <div key={inter.id} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {tipoIcons[inter.tipo]}
                        <span className="text-xs font-medium text-slate-600 capitalize">{inter.tipo}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(inter.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{inter.descripcion}</p>
                    <p className="text-[10px] text-slate-400 mt-1">por {inter.usuario}</p>
                  </div>
                ))}
                {contacto.interacciones.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-4">Sin interacciones registradas</p>
                )}
              </div>
            </div>
          </div>

          {/* Próxima Acción */}
          {contacto.proximaAccion && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Próxima Acción</span>
              </div>
              <p className="text-sm text-blue-700">{contacto.proximaAccion}</p>
              {contacto.fechaProximaAccion && (
                <p className="text-xs text-blue-500 mt-1">
                  {new Date(contacto.fechaProximaAccion).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
              <Phone size={14} />Llamar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
              <Mail size={14} />Email
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
              <MessageSquare size={14} />WhatsApp
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Editar Contacto
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;
