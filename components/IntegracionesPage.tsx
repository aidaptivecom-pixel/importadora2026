import React, { useState } from 'react';
import {
  Plug,
  CheckCircle2,
  Clock,
  AlertCircle,
  Settings,
  ExternalLink,
  Zap,
  RefreshCw,
  ArrowRight,
  Shield,
  Database,
  Cloud,
  Webhook,
  Mail,
  MessageSquare,
  FileText,
  CreditCard,
  Truck,
  ShoppingBag,
  BarChart3,
  Bot,
  Globe,
  Lock
} from 'lucide-react';

// Integraciones activas
const INTEGRACIONES_ACTIVAS = [
  {
    id: 'woocommerce',
    nombre: 'WooCommerce',
    descripcion: 'Sincronización de productos, órdenes e inventario',
    icono: ShoppingBag,
    color: 'bg-purple-100 text-purple-600',
    estado: 'conectado',
    ultimaSync: 'Hace 5 min',
    metrica: '312 órdenes sincronizadas'
  },
  {
    id: 'mercadolibre',
    nombre: 'MercadoLibre',
    descripcion: 'Publicaciones, ventas y mensajes',
    icono: ShoppingBag,
    color: 'bg-yellow-100 text-yellow-600',
    estado: 'conectado',
    ultimaSync: 'Hace 12 min',
    metrica: '89 publicaciones activas'
  },
  {
    id: 'google-sheets',
    nombre: 'Google Sheets',
    descripcion: 'Exportación automática de reportes',
    icono: FileText,
    color: 'bg-green-100 text-green-600',
    estado: 'conectado',
    ultimaSync: 'Hace 1 hora',
    metrica: '24 reportes generados'
  },
  {
    id: 'whatsapp',
    nombre: 'WhatsApp Business',
    descripcion: 'Notificaciones y atención al cliente',
    icono: MessageSquare,
    color: 'bg-green-100 text-green-600',
    estado: 'conectado',
    ultimaSync: 'Tiempo real',
    metrica: '156 mensajes hoy'
  },
];

// Integraciones disponibles
const INTEGRACIONES_DISPONIBLES = [
  {
    id: 'afip',
    nombre: 'AFIP / Factura Electrónica',
    descripcion: 'Emisión automática de facturas y remitos',
    icono: FileText,
    color: 'bg-blue-100 text-blue-600',
    categoria: 'Facturación',
    popular: true
  },
  {
    id: 'correo-argentino',
    nombre: 'Correo Argentino',
    descripcion: 'Tracking y generación de guías',
    icono: Truck,
    color: 'bg-blue-100 text-blue-600',
    categoria: 'Logística',
    popular: true
  },
  {
    id: 'andreani',
    nombre: 'Andreani',
    descripcion: 'Envíos y seguimiento de paquetes',
    icono: Truck,
    color: 'bg-red-100 text-red-600',
    categoria: 'Logística',
    popular: false
  },
  {
    id: 'mercadopago',
    nombre: 'MercadoPago',
    descripcion: 'Cobros y conciliación de pagos',
    icono: CreditCard,
    color: 'bg-cyan-100 text-cyan-600',
    categoria: 'Pagos',
    popular: true
  },
  {
    id: 'stripe',
    nombre: 'Stripe',
    descripcion: 'Pagos internacionales con tarjeta',
    icono: CreditCard,
    color: 'bg-purple-100 text-purple-600',
    categoria: 'Pagos',
    popular: false
  },
  {
    id: 'slack',
    nombre: 'Slack',
    descripcion: 'Notificaciones y alertas del equipo',
    icono: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    categoria: 'Comunicación',
    popular: false
  },
  {
    id: 'google-analytics',
    nombre: 'Google Analytics',
    descripcion: 'Métricas de tráfico web y conversiones',
    icono: BarChart3,
    color: 'bg-orange-100 text-orange-600',
    categoria: 'Analytics',
    popular: true
  },
  {
    id: 'chatgpt',
    nombre: 'ChatGPT / OpenAI',
    descripcion: 'Automatización con inteligencia artificial',
    icono: Bot,
    color: 'bg-emerald-100 text-emerald-600',
    categoria: 'AI',
    popular: true
  },
];

// Webhooks configurados
const WEBHOOKS = [
  { evento: 'Nueva orden ecommerce', url: 'https://api.nexo.com/webhooks/orders', activo: true },
  { evento: 'Cambio estado embarque', url: 'https://api.nexo.com/webhooks/shipments', activo: true },
  { evento: 'Pago recibido', url: 'https://api.nexo.com/webhooks/payments', activo: false },
  { evento: 'Stock bajo mínimo', url: 'https://api.nexo.com/webhooks/inventory', activo: true },
];

const IntegracionesPage: React.FC = () => {
  const [tabActiva, setTabActiva] = useState<'activas' | 'disponibles' | 'webhooks'>('activas');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Integraciones</h1>
          <p className="text-sm text-slate-500 mt-1">Conecta Nexo con tus herramientas favoritas</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Plug size={16} />Nueva Integración
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Activas</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">4</p>
          <p className="text-xs text-slate-400 mt-1">integraciones conectadas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <RefreshCw size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Syncs Hoy</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">1,247</p>
          <p className="text-xs text-slate-400 mt-1">sincronizaciones exitosas</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Webhook size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Webhooks</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">4</p>
          <p className="text-xs text-slate-400 mt-1">endpoints configurados</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Zap size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Uptime</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">99.8%</p>
          <p className="text-xs text-slate-400 mt-1">últimos 30 días</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100">
          <div className="flex">
            <button
              onClick={() => setTabActiva('activas')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tabActiva === 'activas' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Integraciones Activas
            </button>
            <button
              onClick={() => setTabActiva('disponibles')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tabActiva === 'disponibles' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setTabActiva('webhooks')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tabActiva === 'webhooks' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Webhooks & API
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Activas */}
          {tabActiva === 'activas' && (
            <div className="space-y-4">
              {INTEGRACIONES_ACTIVAS.map((int) => (
                <div key={int.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${int.color}`}>
                      <int.icono size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{int.nombre}</h3>
                        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          Conectado
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{int.descripcion}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} />{int.ultimaSync}
                        </span>
                        <span className="text-xs text-blue-600 font-medium">{int.metrica}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                      <RefreshCw size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                      <Settings size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Disponibles */}
          {tabActiva === 'disponibles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTEGRACIONES_DISPONIBLES.map((int) => (
                <div key={int.id} className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${int.color}`}>
                      <int.icono size={20} />
                    </div>
                    {int.popular && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{int.nombre}</h3>
                  <p className="text-sm text-slate-500 mb-3">{int.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{int.categoria}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Conectar <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Webhooks */}
          {tabActiva === 'webhooks' && (
            <div className="space-y-6">
              {/* API Info */}
              <div className="bg-slate-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">API de Nexo Global Trade</h3>
                    <p className="text-sm text-slate-500">Acceso programatico a todos los datos</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">API Key</p>
                    <code className="text-sm font-mono text-slate-700">ngt_live_**********************</code>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Base URL</p>
                    <code className="text-sm font-mono text-slate-700">https://api.nexoglobal.com/v1</code>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <FileText size={14} /> Ver Documentación
                  </button>
                  <button className="text-sm text-slate-600 hover:text-slate-700 font-medium flex items-center gap-1">
                    <ExternalLink size={14} /> Playground
                  </button>
                </div>
              </div>

              {/* Webhooks List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Webhooks Configurados</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Nuevo Webhook</button>
                </div>
                <div className="space-y-3">
                  {WEBHOOKS.map((wh, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${wh.activo ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-800">{wh.evento}</h4>
                          <code className="text-xs text-slate-500 font-mono">{wh.url}</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          wh.activo ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {wh.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                          <Settings size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-1">¿Necesitas una integración personalizada?</h2>
            <p className="text-sm text-white/80">Nuestro equipo puede desarrollar conectores a medida para tu negocio</p>
          </div>
          <button className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegracionesPage;
