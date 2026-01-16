// Supabase Tracking Service
const SUPABASE_URL = 'https://wdpxfpbxfgmwnncubzce.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcHhmcGJ4Zmdtd25uY3ViemNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTM5MzksImV4cCI6MjA4NDE2OTkzOX0.J94Z8l8C9wKmkoluWQ3e8oR4ZslEzoccr5POdwOlzY8';

// Generar ID de sesión único
export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Obtener información del dispositivo
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  
  // Detectar tipo de dispositivo
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    deviceType = /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile';
  }
  
  // Detectar navegador
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
  
  return { deviceType, browser, userAgent: ua };
};

// Obtener IP y ubicación (usando servicio gratuito)
export const getLocationInfo = async (): Promise<{ ip: string; country: string; city: string }> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'Unknown',
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown'
    };
  } catch {
    return { ip: 'Unknown', country: 'Unknown', city: 'Unknown' };
  }
};

// Función base para insertar en Supabase
const supabaseInsert = async (table: string, data: Record<string, unknown>) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error('Tracking error:', error);
    return false;
  }
};

// Función para actualizar en Supabase
const supabaseUpdate = async (table: string, match: Record<string, string>, data: Record<string, unknown>) => {
  try {
    const queryParams = Object.entries(match).map(([k, v]) => `${k}=eq.${v}`).join('&');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${queryParams}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error('Tracking update error:', error);
    return false;
  }
};

// Función para consultar Supabase
export const supabaseQuery = async (table: string, query: string = ''): Promise<unknown[]> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Tracking query error:', error);
    return [];
  }
};

// Registrar evento de acceso
export const trackEvent = async (
  sessionId: string,
  username: string,
  eventType: 'login' | 'logout' | 'page_view' | 'heartbeat',
  page?: string,
  locationInfo?: { ip: string; country: string; city: string }
) => {
  const { deviceType, browser, userAgent } = getDeviceInfo();
  const location = locationInfo || { ip: 'Unknown', country: 'Unknown', city: 'Unknown' };
  
  await supabaseInsert('access_logs', {
    session_id: sessionId,
    username,
    event_type: eventType,
    page,
    ip_address: location.ip,
    country: location.country,
    city: location.city,
    device_type: deviceType,
    browser,
    user_agent: userAgent
  });
};

// Crear/actualizar sesión activa
export const updateActiveSession = async (
  sessionId: string,
  username: string,
  currentPage: string,
  locationInfo?: { ip: string; country: string; city: string },
  isNew: boolean = false
) => {
  const { deviceType, browser } = getDeviceInfo();
  const location = locationInfo || { ip: 'Unknown', country: 'Unknown', city: 'Unknown' };
  
  if (isNew) {
    await supabaseInsert('active_sessions', {
      session_id: sessionId,
      username,
      current_page: currentPage,
      ip_address: location.ip,
      country: location.country,
      city: location.city,
      device_type: deviceType,
      browser,
      pages_visited: 1,
      is_online: true
    });
  } else {
    await supabaseUpdate('active_sessions', { session_id: sessionId }, {
      last_activity: new Date().toISOString(),
      current_page: currentPage,
      is_online: true
    });
  }
};

// Incrementar páginas visitadas
export const incrementPagesVisited = async (sessionId: string) => {
  try {
    // Obtener valor actual
    const sessions = await supabaseQuery('active_sessions', `session_id=eq.${sessionId}&select=pages_visited`) as { pages_visited: number }[];
    if (sessions.length > 0) {
      await supabaseUpdate('active_sessions', { session_id: sessionId }, {
        pages_visited: (sessions[0].pages_visited || 0) + 1,
        last_activity: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error incrementing pages:', error);
  }
};

// Marcar sesión como offline
export const markSessionOffline = async (sessionId: string) => {
  await supabaseUpdate('active_sessions', { session_id: sessionId }, {
    is_online: false,
    last_activity: new Date().toISOString()
  });
};

// Obtener sesiones activas (para panel admin)
export const getActiveSessions = async () => {
  return await supabaseQuery('active_sessions', 'is_online=eq.true&order=last_activity.desc');
};

// Obtener historial de accesos
export const getAccessLogs = async (limit: number = 50) => {
  return await supabaseQuery('access_logs', `order=created_at.desc&limit=${limit}`);
};

// Obtener estadísticas de usuario
export const getUserStats = async () => {
  return await supabaseQuery('user_stats', '');
};

// Obtener estadísticas de páginas
export const getPageStats = async () => {
  return await supabaseQuery('page_stats', '');
};

// Clase para manejar el tracking de sesión
export class SessionTracker {
  private sessionId: string;
  private username: string;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private locationInfo: { ip: string; country: string; city: string } | null = null;

  constructor(username: string) {
    this.sessionId = generateSessionId();
    this.username = username;
  }

  async start(initialPage: string) {
    // Obtener ubicación
    this.locationInfo = await getLocationInfo();
    
    // Registrar login
    await trackEvent(this.sessionId, this.username, 'login', initialPage, this.locationInfo);
    
    // Crear sesión activa
    await updateActiveSession(this.sessionId, this.username, initialPage, this.locationInfo, true);
    
    // Iniciar heartbeat cada 30 segundos
    this.heartbeatInterval = setInterval(async () => {
      await trackEvent(this.sessionId, this.username, 'heartbeat', undefined, this.locationInfo || undefined);
    }, 30000);

    // Manejar cierre de ventana
    window.addEventListener('beforeunload', this.handleUnload);
  }

  async trackPageView(page: string) {
    await trackEvent(this.sessionId, this.username, 'page_view', page, this.locationInfo || undefined);
    await updateActiveSession(this.sessionId, this.username, page, this.locationInfo || undefined);
    await incrementPagesVisited(this.sessionId);
  }

  private handleUnload = () => {
    // Usar sendBeacon para asegurar que se envíe al cerrar
    const data = JSON.stringify({
      session_id: this.sessionId,
      username: this.username,
      event_type: 'logout',
      ip_address: this.locationInfo?.ip,
      country: this.locationInfo?.country,
      city: this.locationInfo?.city,
      ...getDeviceInfo()
    });
    
    navigator.sendBeacon(
      `${SUPABASE_URL}/rest/v1/access_logs`,
      new Blob([data], { type: 'application/json' })
    );
  };

  async stop() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    window.removeEventListener('beforeunload', this.handleUnload);
    await trackEvent(this.sessionId, this.username, 'logout', undefined, this.locationInfo || undefined);
    await markSessionOffline(this.sessionId);
  }

  getSessionId() {
    return this.sessionId;
  }
}
