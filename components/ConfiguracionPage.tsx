import React, { useState } from 'react';
import {
  Settings,
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Key,
  Lock,
  Smartphone,
  Users,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Database,
  Cloud,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Clock,
  Calendar,
  DollarSign,
  Palette,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Info
} from 'lucide-react';

type TabId = 'empresa' | 'usuarios' | 'notificaciones' | 'seguridad' | 'facturacion' | 'sistema';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'operador' | 'vendedor' | 'contador' | 'viewer';
  estado: 'activo' | 'inactivo' | 'pendiente';
  ultimoAcceso: string;
  avatar?: string;
}

const ConfiguracionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('empresa');
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  
  // Estado para toggles de notificaciones
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmbarques, setNotifEmbarques] = useState(true);
  const [notifPagos, setNotifPagos] = useState(true);
  const [notifStock, setNotifStock] = useState(true);
  const [notifVentas, setNotifVentas] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const usuarios: Usuario[] = [
    { id: '1', nombre: 'Matías Acosta', email: 'matias@nexoglobal.com', rol: 'admin', estado: 'activo', ultimoAcceso: '2026-01-13T15:30:00' },
    { id: '2', nombre: 'Carolina López', email: 'carolina@nexoglobal.com', rol: 'operador', estado: 'activo', ultimoAcceso: '2026-01-13T14:22:00' },
    { id: '3', nombre: 'Diego Fernández', email: 'diego@nexoglobal.com', rol: 'vendedor', estado: 'activo', ultimoAcceso: '2026-01-12T18:45:00' },
    { id: '4', nombre: 'Laura Martínez', email: 'laura@nexoglobal.com', rol: 'contador', estado: 'activo', ultimoAcceso: '2026-01-13T09:15:00' },
    { id: '5', nombre: 'Nuevo Usuario', email: 'nuevo@nexoglobal.com', rol: 'viewer', estado: 'pendiente', ultimoAcceso: '' }
  ];

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'facturacion', label: 'Facturación', icon: CreditCard },
    { id: 'sistema', label: 'Sistema', icon: Settings }
  ];

  const rolColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-700',
    operador: 'bg-blue-100 text-blue-700',
    vendedor: 'bg-green-100 text-green-700',
    contador: 'bg-amber-100 text-amber-700',
    viewer: 'bg-slate-100 text-slate-600'
  };

  const rolLabels: Record<string, string> = {
    admin: 'Administrador',
    operador: 'Operador',
    vendedor: 'Vendedor',
    contador: 'Contador',
    viewer: 'Solo Lectura'
  };

  const estadoColors: Record<string, string> = {
    activo: 'bg-green-100 text-green-700',
    inactivo: 'bg-slate-100 text-slate-500',
    pendiente: 'bg-amber-100 text-amber-700'
  };

  const Toggle: React.FC<{ enabled: boolean; onChange: (val: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : ''}`} />
    </button>
  );

  const renderEmpresaTab = () => (
    <div className="space-y-6">
      {/* Logo y datos básicos */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Información de la Empresa</h3>
        <div className="flex items-start gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              NG
            </div>
            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
              <Camera size={14} />
              Cambiar logo
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Razón Social</label>
              <input type="text" defaultValue="Nexo Global Trade SA" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Comercial</label>
              <input type="text" defaultValue="Nexo Global" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CUIT</label>
              <input type="text" defaultValue="30-71234567-8" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Condición IVA</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white">
                <option>Responsable Inscripto</option>
                <option>Monotributista</option>
                <option>Exento</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Datos de Contacto</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Mail size={14} className="inline mr-1.5" />Email Principal
            </label>
            <input type="email" defaultValue="info@nexoglobal.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Phone size={14} className="inline mr-1.5" />Teléfono
            </label>
            <input type="tel" defaultValue="+54 11 5555-4321" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <MapPin size={14} className="inline mr-1.5" />Dirección Fiscal
            </label>
            <input type="text" defaultValue="Av. Corrientes 1234, Piso 8, CABA, Argentina" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Globe size={14} className="inline mr-1.5" />Sitio Web
            </label>
            <input type="url" defaultValue="https://nexoglobal.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Zona Horaria</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white">
              <option>America/Argentina/Buenos_Aires (GMT-3)</option>
              <option>America/Santiago (GMT-4)</option>
              <option>America/New_York (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Save size={16} />
          Guardar Cambios
        </button>
      </div>
    </div>
  );

  const renderUsuariosTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">Usuarios del Sistema</h3>
          <p className="text-sm text-slate-500">{usuarios.length} usuarios registrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Invitar Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Usuario</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Último Acceso</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {usuarios.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-medium text-sm">
                      {user.nombre.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{user.nombre}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${rolColors[user.rol]}`}>
                    {rolLabels[user.rol]}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[user.estado]}`}>
                    {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-slate-500">
                  {user.ultimoAcceso ? new Date(user.ultimoAcceso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Editar">
                      <Edit2 size={14} className="text-slate-400" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles y permisos */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Roles y Permisos</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(rolLabels).map(([key, label]) => (
            <div key={key} className="p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${rolColors[key]}`}>{label}</span>
                <button className="text-xs text-blue-600 hover:text-blue-700">Editar</button>
              </div>
              <p className="text-xs text-slate-500">
                {key === 'admin' && 'Acceso completo a todas las funciones'}
                {key === 'operador' && 'Gestión de operaciones y embarques'}
                {key === 'vendedor' && 'Ventas, clientes y pedidos'}
                {key === 'contador' && 'Finanzas, facturación y reportes'}
                {key === 'viewer' && 'Solo visualización de datos'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificacionesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Canales de Notificación</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium text-slate-800">Notificaciones por Email</p>
                <p className="text-sm text-slate-500">Recibir alertas en tu correo</p>
              </div>
            </div>
            <Toggle enabled={notifEmail} onChange={setNotifEmail} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <Smartphone size={20} />
              </div>
              <div>
                <p className="font-medium text-slate-800">Notificaciones Push</p>
                <p className="text-sm text-slate-500">Alertas en tiempo real en el navegador</p>
              </div>
            </div>
            <Toggle enabled={notifPush} onChange={setNotifPush} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Tipos de Alertas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-50">
            <div>
              <p className="font-medium text-slate-700">Embarques y Operaciones</p>
              <p className="text-sm text-slate-400">Actualizaciones de estado, ETAs, documentos</p>
            </div>
            <Toggle enabled={notifEmbarques} onChange={setNotifEmbarques} />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-50">
            <div>
              <p className="font-medium text-slate-700">Pagos y Vencimientos</p>
              <p className="text-sm text-slate-400">Recordatorios de pagos, facturas pendientes</p>
            </div>
            <Toggle enabled={notifPagos} onChange={setNotifPagos} />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-50">
            <div>
              <p className="font-medium text-slate-700">Stock y Inventario</p>
              <p className="text-sm text-slate-400">Alertas de stock bajo y crítico</p>
            </div>
            <Toggle enabled={notifStock} onChange={setNotifStock} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-700">Ventas y Pedidos</p>
              <p className="text-sm text-slate-400">Nuevos pedidos, consultas de clientes</p>
            </div>
            <Toggle enabled={notifVentas} onChange={setNotifVentas} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Resumen Diario</h3>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
            <option>Enviar a las 8:00 AM</option>
            <option>Enviar a las 9:00 AM</option>
            <option>Enviar a las 10:00 AM</option>
            <option>No enviar resumen</option>
          </select>
          <p className="text-sm text-slate-500">Recibirás un resumen de actividad cada mañana</p>
        </div>
      </div>
    </div>
  );

  const renderSeguridadTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Cambiar Contraseña</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña Actual</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" 
                placeholder="••••••••"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" placeholder="••••••••" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Key size={16} />
            Actualizar Contraseña
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-slate-800">Autenticación de Dos Factores</h3>
            <p className="text-sm text-slate-500 mt-1">Añade una capa extra de seguridad a tu cuenta</p>
          </div>
          <Toggle enabled={twoFactorEnabled} onChange={setTwoFactorEnabled} />
        </div>
        {!twoFactorEnabled && (
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Recomendado activar 2FA</p>
              <p className="text-xs text-amber-600 mt-1">La autenticación de dos factores protege tu cuenta incluso si tu contraseña es comprometida.</p>
            </div>
          </div>
        )}
        {twoFactorEnabled && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start gap-3">
            <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">2FA Activado</p>
              <p className="text-xs text-green-600 mt-1">Tu cuenta está protegida con autenticación de dos factores.</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Sesiones Activas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
            <div className="flex items-center gap-3">
              <Monitor size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-slate-800">Chrome en MacOS</p>
                <p className="text-xs text-slate-500">Buenos Aires, Argentina • Sesión actual</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Activa</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-800">Safari en iPhone</p>
                <p className="text-xs text-slate-500">Buenos Aires • Hace 2 días</p>
              </div>
            </div>
            <button className="text-xs text-red-600 hover:text-red-700 font-medium">Cerrar</button>
          </div>
        </div>
        <button className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium">Cerrar todas las otras sesiones</button>
      </div>
    </div>
  );

  const renderFacturacionTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Plan Actual</p>
            <h3 className="text-2xl font-bold">Profesional</h3>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Activo</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-blue-100 text-xs">Usuarios</p>
            <p className="text-lg font-semibold">5 / 10</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs">Operaciones</p>
            <p className="text-lg font-semibold">Ilimitadas</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs">Almacenamiento</p>
            <p className="text-lg font-semibold">25 GB</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <p className="text-sm">Próxima facturación: <span className="font-semibold">15 Feb 2026</span></p>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            Cambiar Plan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Método de Pago</h3>
        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded flex items-center justify-center">
              <CreditCard size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-800">•••• •••• •••• 4242</p>
              <p className="text-xs text-slate-500">Vence 12/2027</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Cambiar</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Historial de Facturación</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todo</button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
            <tr>
              <th className="pb-3 text-left">Fecha</th>
              <th className="pb-3 text-left">Descripción</th>
              <th className="pb-3 text-right">Monto</th>
              <th className="pb-3 text-right">Estado</th>
              <th className="pb-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { fecha: '2026-01-15', desc: 'Plan Profesional - Enero 2026', monto: 149, estado: 'pagado' },
              { fecha: '2025-12-15', desc: 'Plan Profesional - Diciembre 2025', monto: 149, estado: 'pagado' },
              { fecha: '2025-11-15', desc: 'Plan Profesional - Noviembre 2025', monto: 149, estado: 'pagado' }
            ].map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 text-slate-600">{new Date(item.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="py-3 text-slate-800">{item.desc}</td>
                <td className="py-3 text-right font-medium text-slate-800">USD ${item.monto}</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">Pagado</span>
                </td>
                <td className="py-3 text-right">
                  <button className="text-blue-600 hover:text-blue-700">
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSistemaTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Preferencias de Visualización</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Tema de la Interfaz</label>
            <div className="flex gap-3">
              {[
                { id: 'light', icon: Sun, label: 'Claro' },
                { id: 'dark', icon: Moon, label: 'Oscuro' },
                { id: 'system', icon: Monitor, label: 'Sistema' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as typeof theme)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                    theme === t.id 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <t.icon size={18} />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Moneda Predeterminada</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                <option>USD - Dólar Estadounidense</option>
                <option>ARS - Peso Argentino</option>
                <option>EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Formato de Fecha</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-6">Datos y Almacenamiento</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700">Espacio Utilizado</p>
              <p className="text-sm text-slate-500">8.2 GB de 25 GB</p>
            </div>
            <span className="text-sm font-medium text-slate-600">33%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '33%' }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={16} />
              Exportar Datos
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Upload size={16} />
              Importar Datos
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Información del Sistema</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-xs mb-1">Versión</p>
            <p className="font-medium text-slate-800">v2.4.1</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-xs mb-1">Última Actualización</p>
            <p className="font-medium text-slate-800">10 Ene 2026</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-xs mb-1">ID de Instancia</p>
            <p className="font-medium text-slate-800 font-mono text-xs">NGT-AR-2024-001</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-xs mb-1">Estado del Sistema</p>
            <p className="font-medium text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Operativo
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-xl border border-red-100 p-6">
        <h3 className="font-semibold text-red-800 mb-2">Zona de Peligro</h3>
        <p className="text-sm text-red-600 mb-4">Estas acciones son irreversibles. Procede con precaución.</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            Eliminar todos los datos
          </button>
          <button className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            Cerrar cuenta
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'empresa': return renderEmpresaTab();
      case 'usuarios': return renderUsuariosTab();
      case 'notificaciones': return renderNotificacionesTab();
      case 'seguridad': return renderSeguridadTab();
      case 'facturacion': return renderFacturacionTab();
      case 'sistema': return renderSistemaTab();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-500 mt-1">Gestiona tu cuenta y preferencias del sistema</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <HelpCircle size={16} />
              <span className="text-sm font-medium">¿Necesitas ayuda?</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">Consulta nuestra documentación o contacta soporte.</p>
            <button className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={14} />
              Centro de Ayuda
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;
