import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Clock, 
  MapPin, 
  Monitor, 
  Smartphone,
  Globe,
  Eye,
  RefreshCw,
  FileText,
  BarChart3,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { getActiveSessions, getAccessLogs, supabaseQuery } from '../utils/tracking';

interface ActiveSession {
  id: string;
  session_id: string;
  username: string;
  started_at: string;
  last_activity: string;
  current_page: string;
  ip_address: string;
  country: string;
  city: string;
  device_type: string;
  browser: string;
  pages_visited: number;
  is_online: boolean;
}

interface AccessLog {
  id: string;
  session_id: string;
  username: string;
  event_type: string;
  page: string;
  ip_address: string;
  country: string;
  city: string;
  device_type: string;
  browser: string;
  created_at: string;
}

interface UserStat {
  username: string;
  total_sessions: number;
  total_logins: number;
  total_page_views: number;
  first_access: string;
  last_access: string;
  unique_pages_visited: number;
}

const AdminMonitoreoPage: React.FC = () => {
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'online' | 'history' | 'stats'>('online');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [sessions, logs, stats] = await Promise.all([
        getActiveSessions(),
        getAccessLogs(100),
        supabaseQuery('user_stats', '')
      ]);
      setActiveSessions(sessions as ActiveSession[]);
      setAccessLogs(logs as AccessLog[]);
      setUserStats(stats as UserStat[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    
    // Auto refresh cada 30 segundos
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchData, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays}d`;
  };

  const getDeviceIcon = (deviceType: string) => {
    return deviceType === 'mobile' || deviceType === 'tablet' 
      ? <Smartphone size={16} className="text-slate-400" />
      : <Monitor size={16} className="text-slate-400" />;
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'login': return 'bg-green-100 text-green-700';
      case 'logout': return 'bg-red-100 text-red-700';
      case 'page_view': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const pageNameMap: Record<string, string> = {
    'hoy': 'Hoy',
    'inversores': 'Dashboard Inversores',
    'dashboard': 'Dashboard',
    'analytics': 'Analytics',
    'operaciones': 'Operaciones',
    'ecommerce': 'Ecommerce',
    'mayoristas': 'Mayoristas',
    'marketing': 'Marketing'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Monitoreo de Accesos</h1>
          <p className="text-slate-500 mt-1">Control de sesiones y actividad de usuarios</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
            />
            Auto-refresh
          </label>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{activeSessions.length}</p>
              <p className="text-sm text-slate-500">Online ahora</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {accessLogs.filter(l => l.event_type === 'login').length}
              </p>
              <p className="text-sm text-slate-500">Logins totales</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Eye size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {accessLogs.filter(l => l.event_type === 'page_view').length}
              </p>
              <p className="text-sm text-slate-500">Páginas vistas</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Globe size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {new Set(accessLogs.map(l => l.country).filter(Boolean)).size}
              </p>
              <p className="text-sm text-slate-500">Países</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'online' ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users size={18} />
              Usuarios Online ({activeSessions.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={18} />
              Historial de Actividad
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 size={18} />
              Estadísticas por Usuario
            </div>
          </button>
        </div>

        <div className="p-6">
          {/* Online Users Tab */}
          {activeTab === 'online' && (
            <div className="space-y-4">
              {activeSessions.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">No hay usuarios conectados en este momento</p>
                </div>
              ) : (
                activeSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                          {session.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{session.username}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {session.city}, {session.country}
                          </span>
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(session.device_type)}
                            {session.browser}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">
                        Viendo: {pageNameMap[session.current_page] || session.current_page}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>{session.pages_visited} páginas</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {getTimeSince(session.last_activity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-500 border-b border-slate-100">
                    <th className="pb-3 font-medium">Usuario</th>
                    <th className="pb-3 font-medium">Evento</th>
                    <th className="pb-3 font-medium">Página</th>
                    <th className="pb-3 font-medium">Ubicación</th>
                    <th className="pb-3 font-medium">Dispositivo</th>
                    <th className="pb-3 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {accessLogs.slice(0, 50).map((log) => (
                    <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3">
                        <span className="font-medium text-slate-700">{log.username}</span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(log.event_type)}`}>
                          {log.event_type === 'login' && 'Login'}
                          {log.event_type === 'logout' && 'Logout'}
                          {log.event_type === 'page_view' && 'Vista'}
                          {log.event_type === 'heartbeat' && 'Activo'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600">
                        {log.page ? (pageNameMap[log.page] || log.page) : '-'}
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          {log.city || 'Unknown'}, {log.country || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          {getDeviceIcon(log.device_type)}
                          {log.browser}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">
                        {formatDate(log.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {userStats.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">No hay estadísticas disponibles</p>
                </div>
              ) : (
                userStats.map((stat) => (
                  <motion.div
                    key={stat.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                          {stat.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{stat.username}</p>
                          <p className="text-xs text-slate-500">Primer acceso: {formatDate(stat.first_access)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Último acceso</p>
                        <p className="text-sm font-medium text-slate-700">{formatDate(stat.last_access)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-xl font-bold text-blue-600">{stat.total_sessions}</p>
                        <p className="text-xs text-slate-500">Sesiones</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-xl font-bold text-green-600">{stat.total_logins}</p>
                        <p className="text-xs text-slate-500">Logins</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-xl font-bold text-purple-600">{stat.total_page_views}</p>
                        <p className="text-xs text-slate-500">Páginas vistas</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-xl font-bold text-amber-600">{stat.unique_pages_visited}</p>
                        <p className="text-xs text-slate-500">Páginas únicas</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMonitoreoPage;
