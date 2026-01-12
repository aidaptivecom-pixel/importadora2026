import React, { useState } from 'react';
import { 
  ArrowLeft, Package, Calendar, Clock, Flag, DollarSign, CreditCard, FileText, Activity,
  CheckCircle, Circle, AlertCircle, AlertTriangle, TrendingUp, LayoutDashboard,
  CheckSquare, Plus, Check, Edit3, MoreHorizontal, Download, Upload,
  Send, Ship, Anchor, Building2, Truck, Warehouse, Archive,
  FileCheck, FileClock
} from 'lucide-react';
import { PageType } from '../App';
import { OPERACIONES } from '../constants';
import { EtapaOperacion } from '../types';

// Factory and PackageCheck as alternatives if not available
const Factory = Building2;
const PackageCheck = Package;

interface OperacionDetallePageProps {
  operacionId: string;
  onNavigate: (page: PageType, operacionId?: string) => void;
}

const OperacionDetallePage: React.FC<OperacionDetallePageProps> = ({ operacionId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'timeline' | 'documentos' | 'costos' | 'pagos' | 'tareas' | 'log'>('resumen');
  
  const operacion = OPERACIONES.find(op => op.id === operacionId);
  
  if (!operacion) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-500">Operación no encontrada</p>
        <button 
          onClick={() => onNavigate('operaciones')}
          className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver a operaciones
        </button>
      </div>
    );
  }

  const etapasConfig: { key: EtapaOperacion; label: string; icon: any }[] = [
    { key: 'draft', label: 'Borrador', icon: FileText },
    { key: 'po_emitida', label: 'PO Emitida', icon: Send },
    { key: 'produccion', label: 'Producción', icon: Factory },
    { key: 'listo_embarque', label: 'Listo', icon: PackageCheck },
    { key: 'en_transito', label: 'Tránsito', icon: Ship },
    { key: 'arribo', label: 'Arribo', icon: Anchor },
    { key: 'aduana', label: 'Aduana', icon: Building2 },
    { key: 'liberado', label: 'Liberado', icon: CheckCircle },
    { key: 'deposito', label: 'Depósito', icon: Warehouse },
    { key: 'cerrado', label: 'Cerrado', icon: Archive }
  ];

  const currentEtapaIndex = etapasConfig.findIndex(e => e.key === operacion.etapa);
  const getEtapaColor = (index: number) => {
    if (index < currentEtapaIndex) return 'bg-green-500 text-white';
    if (index === currentEtapaIndex) return 'bg-blue-600 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const getRiesgoColor = (riesgo: string) => {
    switch (riesgo) {
      case 'critico': return 'bg-red-100 text-red-700 border-red-200';
      case 'alto': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medio': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const tabs = [
    { key: 'resumen', label: 'Resumen', icon: LayoutDashboard },
    { key: 'timeline', label: 'Timeline', icon: Clock },
    { key: 'documentos', label: 'Documentos', icon: FileText },
    { key: 'costos', label: 'Costos', icon: DollarSign },
    { key: 'pagos', label: 'Pagos', icon: CreditCard },
    { key: 'tareas', label: 'Tareas', icon: CheckSquare },
    { key: 'log', label: 'Log', icon: Activity }
  ];

  const mockTareas = [
    { id: 1, titulo: 'Confirmar booking con naviera', completada: true, fecha: '2025-01-03', owner: 'Juan' },
    { id: 2, titulo: 'Enviar instrucciones de embarque', completada: true, fecha: '2025-01-04', owner: 'María' },
    { id: 3, titulo: 'Solicitar certificado de origen', completada: false, fecha: '2025-01-08', owner: 'Juan' },
    { id: 4, titulo: 'Coordinar con despachante', completada: false, fecha: '2025-01-15', owner: 'Carlos' },
  ];

  const mockLog = [
    { id: 1, tipo: 'etapa', mensaje: `Operación en etapa ${operacion.etapa}`, fecha: '2025-01-05 14:30', usuario: 'Sistema' },
    { id: 2, tipo: 'documento', mensaje: 'Invoice validado', fecha: '2025-01-03 11:20', usuario: 'María' },
    { id: 3, tipo: 'pago', mensaje: 'Pago anticipo registrado', fecha: '2025-01-03 09:45', usuario: 'Carlos' },
    { id: 4, tipo: 'creacion', mensaje: 'Operación creada', fecha: operacion.fechaPO, usuario: 'Juan' },
  ];

  const renderResumen = () => {
    const docsPendientes = operacion.documentos.filter(d => d.estado === 'pendiente').length;
    const pagosPendientes = operacion.pagos.filter(p => p.estado !== 'pagado').reduce((sum, p) => sum + p.montoUSD, 0);
    const costosReales = operacion.costos.reduce((sum, c) => sum + (c.realUSD || 0), 0);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><DollarSign className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-sm text-slate-500">Valor Total</p><p className="text-xl font-bold text-slate-800">${operacion.montoTotalUSD.toLocaleString()}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><TrendingUp className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-sm text-slate-500">Costos Reales</p><p className="text-xl font-bold text-slate-800">${costosReales.toLocaleString()}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg"><FileText className="w-5 h-5 text-amber-600" /></div>
              <div><p className="text-sm text-slate-500">Docs Pendientes</p><p className="text-xl font-bold text-slate-800">{docsPendientes} de {operacion.documentos.length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><CreditCard className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-sm text-slate-500">Pagos Pendientes</p><p className="text-xl font-bold text-slate-800">${pagosPendientes.toLocaleString()}</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-blue-600" />Datos Generales</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-slate-500">Proveedor</span><span className="font-medium text-slate-800">{operacion.proveedor}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Forwarder</span><span className="font-medium text-slate-800">{operacion.forwarder}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Despachante</span><span className="font-medium text-slate-800">{operacion.despachante}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Incoterm</span><span className="font-medium text-slate-800">{operacion.incoterm}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">NCM</span><span className="font-medium text-slate-800">{operacion.ncm}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Contenedor</span><span className="font-medium text-slate-800">{operacion.tipoContenedor}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-600" />Fechas</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-slate-500">Fecha PO</span><span className="font-medium text-slate-800">{new Date(operacion.fechaPO).toLocaleDateString('es-AR')}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">ETD</span><span className="font-medium text-slate-800">{operacion.fechaETD ? new Date(operacion.fechaETD).toLocaleDateString('es-AR') : '-'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">ETA</span><span className="font-medium text-slate-800">{operacion.fechaETA ? new Date(operacion.fechaETA).toLocaleDateString('es-AR') : '-'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Free Time</span><span className="font-medium text-slate-800">{operacion.freeTimeDias ? `${operacion.freeTimeDias} días` : '-'}</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500">Canal</span>
                <span className={`font-medium px-2 py-0.5 rounded ${operacion.canalAduana === 'verde' ? 'bg-green-100 text-green-700' : operacion.canalAduana === 'naranja' ? 'bg-orange-100 text-orange-700' : operacion.canalAduana === 'rojo' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                  {operacion.canalAduana ? operacion.canalAduana.charAt(0).toUpperCase() + operacion.canalAduana.slice(1) : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Flag className="w-5 h-5 text-blue-600" />Próximos Hitos</h3>
          <div className="grid grid-cols-4 gap-4">
            {operacion.hitos.filter(h => !h.completado).slice(0, 4).map((hito, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-blue-100 rounded"><Clock className="w-4 h-4 text-blue-600" /></div><span className="text-sm font-medium text-slate-700">{hito.descripcion}</span></div>
                <p className="text-xs text-slate-500">{new Date(hito.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-6">Progreso</h3>
        <div className="relative">
          <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded"><div className="h-full bg-blue-600 rounded" style={{ width: `${(currentEtapaIndex / (etapasConfig.length - 1)) * 100}%` }} /></div>
          <div className="flex justify-between relative">
            {etapasConfig.slice(0, 8).map((etapa, index) => {
              const Icon = etapa.icon;
              return (
                <div key={etapa.key} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEtapaColor(index)} shadow-sm`}><Icon className="w-5 h-5" /></div>
                  <span className={`mt-3 text-xs font-medium ${index <= currentEtapaIndex ? 'text-slate-700' : 'text-slate-400'}`}>{etapa.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Hitos</h3>
        <div className="space-y-3">
          {operacion.hitos.map((hito, i) => (
            <div key={i} className={`flex items-center gap-4 p-3 rounded-lg ${hito.completado ? 'bg-green-50' : 'bg-slate-50'}`}>
              <div className={`p-2 rounded-full ${hito.completado ? 'bg-green-100' : 'bg-slate-200'}`}>{hito.completado ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Circle className="w-4 h-4 text-slate-400" />}</div>
              <div className="flex-1"><p className={`font-medium ${hito.completado ? 'text-green-700' : 'text-slate-700'}`}>{hito.descripcion}</p><p className="text-sm text-slate-500">{new Date(hito.fecha).toLocaleDateString('es-AR')}</p></div>
              {hito.completado && <span className="text-xs text-green-600 font-medium">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocumentos = () => {
    const validados = operacion.documentos.filter(d => d.estado === 'validado').length;
    const recibidos = operacion.documentos.filter(d => d.estado === 'recibido').length;
    const pendientes = operacion.documentos.filter(d => d.estado === 'pendiente').length;
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200"><div className="flex items-center gap-3"><FileCheck className="w-8 h-8 text-green-600" /><div><p className="text-2xl font-bold text-green-700">{validados}</p><p className="text-sm text-green-600">Validados</p></div></div></div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200"><div className="flex items-center gap-3"><FileText className="w-8 h-8 text-blue-600" /><div><p className="text-2xl font-bold text-blue-700">{recibidos}</p><p className="text-sm text-blue-600">Recibidos</p></div></div></div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200"><div className="flex items-center gap-3"><FileClock className="w-8 h-8 text-amber-600" /><div><p className="text-2xl font-bold text-amber-700">{pendientes}</p><p className="text-sm text-amber-600">Pendientes</p></div></div></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center"><h3 className="font-semibold text-slate-800">Documentos</h3><button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"><Upload className="w-4 h-4" />Subir</button></div>
          <div className="divide-y divide-slate-100">
            {operacion.documentos.map((doc, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                <div className={`p-2 rounded-lg ${doc.estado === 'validado' ? 'bg-green-100' : doc.estado === 'recibido' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                  {doc.estado === 'validado' ? <FileCheck className="w-5 h-5 text-green-600" /> : doc.estado === 'recibido' ? <FileText className="w-5 h-5 text-blue-600" /> : <FileClock className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="font-medium text-slate-800">{doc.nombre}</span>{doc.obligatorio && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Obligatorio</span>}</div>
                  <p className="text-sm text-slate-500">{doc.fechaRecibido ? `Recibido: ${new Date(doc.fechaRecibido).toLocaleDateString('es-AR')}` : 'Sin recibir'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${doc.estado === 'validado' ? 'bg-green-100 text-green-700' : doc.estado === 'recibido' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{doc.estado}</span>
                <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"><Download className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCostos = () => {
    const totalEst = operacion.costos.reduce((s, c) => s + c.estimadoUSD, 0);
    const totalReal = operacion.costos.reduce((s, c) => s + (c.realUSD || 0), 0);
    const costosConReal = operacion.costos.filter(c => c.realUSD !== null);
    const dif = totalReal - costosConReal.reduce((s, c) => s + c.estimadoUSD, 0);
    const ejec = (costosConReal.length / operacion.costos.length) * 100;
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200"><p className="text-sm text-slate-500 mb-1">Valor</p><p className="text-2xl font-bold text-slate-800">${operacion.montoTotalUSD.toLocaleString()}</p></div>
          <div className="bg-white rounded-xl p-4 border border-slate-200"><p className="text-sm text-slate-500 mb-1">Estimados</p><p className="text-2xl font-bold text-blue-600">${totalEst.toLocaleString()}</p></div>
          <div className="bg-white rounded-xl p-4 border border-slate-200"><p className="text-sm text-slate-500 mb-1">Reales</p><p className="text-2xl font-bold text-green-600">${totalReal.toLocaleString()}</p></div>
          <div className="bg-white rounded-xl p-4 border border-slate-200"><p className="text-sm text-slate-500 mb-1">Diferencia</p><p className={`text-2xl font-bold ${dif > 0 ? 'text-red-600' : 'text-green-600'}`}>{dif > 0 ? '+' : ''}${dif.toLocaleString()}</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200"><div className="flex justify-between mb-2"><span className="text-sm font-medium">Ejecución</span><span className="text-sm text-slate-500">{ejec.toFixed(0)}%</span></div><div className="h-3 bg-slate-200 rounded-full"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${ejec}%` }} /></div></div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50"><tr><th className="text-left p-4 text-sm font-semibold text-slate-600">Concepto</th><th className="text-right p-4 text-sm font-semibold text-slate-600">Estimado</th><th className="text-right p-4 text-sm font-semibold text-slate-600">Real</th><th className="text-right p-4 text-sm font-semibold text-slate-600">Dif</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {operacion.costos.map((c, i) => {
                const d = c.realUSD !== null ? c.realUSD - c.estimadoUSD : null;
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{c.concepto}</td>
                    <td className="p-4 text-right text-slate-600">${c.estimadoUSD.toLocaleString()}</td>
                    <td className="p-4 text-right font-medium">{c.realUSD !== null ? `$${c.realUSD.toLocaleString()}` : '-'}</td>
                    <td className={`p-4 text-right font-medium ${d === null ? 'text-slate-400' : d > 0 ? 'text-red-600' : d < 0 ? 'text-green-600' : ''}`}>{d !== null ? (d > 0 ? '+' : '') + `$${d.toLocaleString()}` : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPagos = () => {
    const pagado = operacion.pagos.filter(p => p.estado === 'pagado').reduce((s, p) => s + p.montoUSD, 0);
    const pend = operacion.pagos.filter(p => p.estado === 'pendiente').reduce((s, p) => s + p.montoUSD, 0);
    const venc = operacion.pagos.filter(p => p.estado === 'vencido').reduce((s, p) => s + p.montoUSD, 0);
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200"><p className="text-sm text-green-600 mb-1">Pagado</p><p className="text-2xl font-bold text-green-700">${pagado.toLocaleString()}</p></div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200"><p className="text-sm text-amber-600 mb-1">Pendiente</p><p className="text-2xl font-bold text-amber-700">${pend.toLocaleString()}</p></div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200"><p className="text-sm text-red-600 mb-1">Vencido</p><p className="text-2xl font-bold text-red-700">${venc.toLocaleString()}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200"><h3 className="font-semibold text-slate-800">Pagos</h3></div>
          <table className="w-full">
            <thead className="bg-slate-50"><tr><th className="text-left p-4 text-sm font-semibold text-slate-600">Concepto</th><th className="text-right p-4 text-sm font-semibold text-slate-600">Monto</th><th className="text-center p-4 text-sm font-semibold text-slate-600">Vence</th><th className="text-center p-4 text-sm font-semibold text-slate-600">Estado</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {operacion.pagos.map(p => (
                <tr key={p.id} className={`hover:bg-slate-50 ${p.estado === 'vencido' ? 'bg-red-50' : ''}`}>
                  <td className="p-4"><p className="font-medium text-slate-800">{p.descripcion}</p></td>
                  <td className="p-4 text-right font-semibold">${p.montoUSD.toLocaleString()}</td>
                  <td className={`p-4 text-center ${p.estado === 'vencido' ? 'text-red-600 font-medium' : ''}`}>{new Date(p.fechaVencimiento).toLocaleDateString('es-AR')}</td>
                  <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-sm font-medium ${p.estado === 'pagado' ? 'bg-green-100 text-green-700' : p.estado === 'vencido' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{p.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTareas = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h3 className="font-semibold text-slate-800">Tareas</h3><button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" />Nueva</button></div>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {mockTareas.map(t => (
          <div key={t.id} className={`p-4 flex items-center gap-4 ${t.completada ? 'bg-slate-50' : ''}`}>
            <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${t.completada ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'}`}>{t.completada && <Check className="w-4 h-4" />}</button>
            <div className="flex-1"><p className={`font-medium ${t.completada ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{t.titulo}</p><p className="text-sm text-slate-500">{t.fecha} • {t.owner}</p></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLog = () => {
    const getIcon = (t: string) => {
      switch (t) { case 'etapa': return <Activity className="w-4 h-4" />; case 'documento': return <FileText className="w-4 h-4" />; case 'pago': return <DollarSign className="w-4 h-4" />; default: return <Plus className="w-4 h-4" />; }
    };
    const getColor = (t: string) => {
      switch (t) { case 'etapa': return 'bg-blue-100 text-blue-600'; case 'documento': return 'bg-purple-100 text-purple-600'; case 'pago': return 'bg-green-100 text-green-600'; default: return 'bg-slate-100 text-slate-600'; }
    };
    return (
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-200"><h3 className="font-semibold text-slate-800">Historial</h3></div>
        <div className="divide-y divide-slate-100">
          {mockLog.map(e => (<div key={e.id} className="p-4 flex gap-4"><div className={`p-2 rounded-lg ${getColor(e.tipo)}`}>{getIcon(e.tipo)}</div><div className="flex-1"><p className="text-slate-800">{e.mensaje}</p><p className="text-sm text-slate-500">{e.fecha} • {e.usuario}</p></div></div>))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <button onClick={() => onNavigate('operaciones')} className="flex items-center gap-2 text-slate-600 hover:text-blue-600"><ArrowLeft className="w-4 h-4" /><span>Volver</span></button>
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-800">{operacion.id}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{etapasConfig.find(e => e.key === operacion.etapa)?.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiesgoColor(operacion.riesgo)}`}>Riesgo {operacion.riesgo}</span>
            </div>
            <p className="text-slate-600">{operacion.nombre} • {operacion.proveedor}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2"><Edit3 className="w-4 h-4" />Editar</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><MoreHorizontal className="w-4 h-4" />Acciones</button>
          </div>
        </div>
        {operacion.alertas.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700"><AlertTriangle className="w-5 h-5" /><span className="font-medium">{operacion.alertas.length} alerta(s):</span></div>
            <ul className="mt-2 space-y-1">{operacion.alertas.map((a, i) => <li key={i} className="text-sm text-red-600 ml-7">• {a}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex border-b border-slate-200">
          {tabs.map(t => {
            const I = t.icon;
            return (<button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 ${activeTab === t.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><I className="w-4 h-4" />{t.label}</button>);
          })}
        </div>
        <div className="p-6">
          {activeTab === 'resumen' && renderResumen()}
          {activeTab === 'timeline' && renderTimeline()}
          {activeTab === 'documentos' && renderDocumentos()}
          {activeTab === 'costos' && renderCostos()}
          {activeTab === 'pagos' && renderPagos()}
          {activeTab === 'tareas' && renderTareas()}
          {activeTab === 'log' && renderLog()}
        </div>
      </div>
    </div>
  );
};

export default OperacionDetallePage;
