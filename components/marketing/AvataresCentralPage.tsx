import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Play,
  Image,
  MessageCircle,
  TrendingUp,
  Users,
  Settings,
  Edit3,
  Eye,
  Heart,
  Share2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  MoreHorizontal,
  Volume2,
  Video,
  Palette,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { PageType } from '../../App';

interface AvataresCentralPageProps {
  onNavigate: (page: PageType) => void;
}

interface Avatar {
  id: string;
  nombre: string;
  tienda: string;
  tiendaEmoji: string;
  rol: string;
  estado: 'online' | 'offline' | 'entrenamiento';
  imagen: string;
  personalidad: string[];
  voz: string;
  idiomas: string[];
  contenidoGenerado: number;
  engagementPromedio: number;
  seguidoresGanados: number;
  ultimaActividad: string;
  historial: { fecha: string; tipo: string; titulo: string; engagement: number }[];
}

const AVATARES: Avatar[] = [
  {
    id: 'avatar-emma',
    nombre: 'Emma',
    tienda: 'Pet Vogue',
    tiendaEmoji: '🐕',
    rol: 'Pet Lifestyle Influencer',
    estado: 'online',
    imagen: 'https://i.pravatar.cc/150?img=1',
    personalidad: ['Amigable', 'Experta en mascotas', 'Divertida', 'Cercana'],
    voz: 'Femenina, cálida y energética',
    idiomas: ['Español', 'Inglés'],
    contenidoGenerado: 248,
    engagementPromedio: 4.8,
    seguidoresGanados: 12400,
    ultimaActividad: '2026-01-13T10:30:00',
    historial: [
      { fecha: '2026-01-13', tipo: 'reel', titulo: 'Tutorial comedero WiFi', engagement: 3420 },
      { fecha: '2026-01-12', tipo: 'post', titulo: 'Camas ortopédicas: guía', engagement: 2180 },
      { fecha: '2026-01-11', tipo: 'story', titulo: 'Q&A mascotas', engagement: 1890 },
    ]
  },
  {
    id: 'avatar-tech',
    nombre: 'Tech',
    tienda: 'CoreSmart',
    tiendaEmoji: '🏠',
    rol: 'Smart Home Expert',
    estado: 'online',
    imagen: 'https://i.pravatar.cc/150?img=12',
    personalidad: ['Técnico', 'Profesional', 'Innovador', 'Confiable'],
    voz: 'Masculina, clara y profesional',
    idiomas: ['Español', 'Inglés', 'Portugués'],
    contenidoGenerado: 186,
    engagementPromedio: 3.9,
    seguidoresGanados: 8200,
    ultimaActividad: '2026-01-13T14:00:00',
    historial: [
      { fecha: '2026-01-13', tipo: 'post', titulo: 'Tendencias Smart Home 2026', engagement: 2180 },
      { fecha: '2026-01-12', tipo: 'reel', titulo: 'Instalación cámara 360', engagement: 3100 },
      { fecha: '2026-01-10', tipo: 'ad', titulo: 'Campaña Seguridad', engagement: 4500 },
    ]
  },
  {
    id: 'avatar-sofia',
    nombre: 'Sofia',
    tienda: 'Sensuality',
    tiendaEmoji: '💜',
    rol: 'Wellness & Lifestyle Coach',
    estado: 'online',
    imagen: 'https://i.pravatar.cc/150?img=5',
    personalidad: ['Elegante', 'Discreta', 'Empática', 'Sofisticada'],
    voz: 'Femenina, suave y sensual',
    idiomas: ['Español'],
    contenidoGenerado: 124,
    engagementPromedio: 5.2,
    seguidoresGanados: 6800,
    ultimaActividad: '2026-01-13T18:00:00',
    historial: [
      { fecha: '2026-01-13', tipo: 'story', titulo: 'Tips bienestar', engagement: 1560 },
      { fecha: '2026-01-12', tipo: 'post', titulo: 'Aromaterapia en casa', engagement: 2400 },
      { fecha: '2026-01-10', tipo: 'reel', titulo: 'Rutina relajación', engagement: 3200 },
    ]
  }
];

const PERFORMANCE_DATA = [
  { mes: 'Sep', Emma: 2400, Tech: 1800, Sofia: 1200 },
  { mes: 'Oct', Emma: 2800, Tech: 2100, Sofia: 1500 },
  { mes: 'Nov', Emma: 3200, Tech: 2400, Sofia: 1900 },
  { mes: 'Dic', Emma: 3800, Tech: 2900, Sofia: 2400 },
  { mes: 'Ene', Emma: 4200, Tech: 3200, Sofia: 2800 },
];

const AvataresCentralPage: React.FC<AvataresCentralPageProps> = ({ onNavigate }) => {
  const [avatarSeleccionado, setAvatarSeleccionado] = useState<Avatar>(AVATARES[0]);
  const [vistaDetalle, setVistaDetalle] = useState<'perfil' | 'historial' | 'config'>('perfil');

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-slate-400';
      case 'entrenamiento': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'reel': return <Play size={14} className="text-purple-500" />;
      case 'post': return <Image size={14} className="text-blue-500" />;
      case 'story': return <Sparkles size={14} className="text-amber-500" />;
      case 'ad': return <TrendingUp size={14} className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Avatares Digitales</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona tus influencers virtuales AI para cada marca</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Crear Avatar
        </button>
      </div>

      {/* Stats Globales */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Bot size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Avatares Activos</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{AVATARES.filter(a => a.estado === 'online').length}/{AVATARES.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Sparkles size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Contenido Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{AVATARES.reduce((acc, a) => acc + a.contenidoGenerado, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Users size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Seguidores Ganados</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">+{(AVATARES.reduce((acc, a) => acc + a.seguidoresGanados, 0) / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Heart size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Engagement Prom.</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{(AVATARES.reduce((acc, a) => acc + a.engagementPromedio, 0) / AVATARES.length).toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Avatares */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800">Mis Avatares</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {AVATARES.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setAvatarSeleccionado(avatar)}
                className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 ${
                  avatarSeleccionado.id === avatar.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                      {avatar.nombre[0]}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${getEstadoColor(avatar.estado)}`}></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-800">{avatar.nombre}</p>
                      <span className="text-sm">{avatar.tiendaEmoji}</span>
                    </div>
                    <p className="text-xs text-slate-500">{avatar.rol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{avatar.contenidoGenerado}</p>
                    <p className="text-xs text-slate-400">contenidos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle del Avatar */}
        <div className="col-span-2 space-y-6">
          {/* Perfil del Avatar */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold">
                    {avatarSeleccionado.nombre[0]}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-purple-600 ${getEstadoColor(avatarSeleccionado.estado)}`}></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{avatarSeleccionado.nombre}</h2>
                    <span className="text-lg">{avatarSeleccionado.tiendaEmoji}</span>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {avatarSeleccionado.estado === 'online' ? '● Online' : avatarSeleccionado.estado === 'entrenamiento' ? '◐ Entrenando' : '○ Offline'}
                    </span>
                  </div>
                  <p className="text-white/80 mb-3">{avatarSeleccionado.rol}</p>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span className="flex items-center gap-1"><Sparkles size={14} /> {avatarSeleccionado.contenidoGenerado} contenidos</span>
                    <span className="flex items-center gap-1"><Heart size={14} /> {avatarSeleccionado.engagementPromedio}% eng.</span>
                    <span className="flex items-center gap-1"><Users size={14} /> +{(avatarSeleccionado.seguidoresGanados/1000).toFixed(1)}K seguidores</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Edit3 size={18} />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-100">
              <div className="flex">
                {(['perfil', 'historial', 'config'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setVistaDetalle(tab)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      vistaDetalle === tab
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab === 'perfil' ? 'Perfil' : tab === 'historial' ? 'Historial' : 'Configuración'}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido del Tab */}
            <div className="p-6">
              {vistaDetalle === 'perfil' && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Personalidad</h3>
                    <div className="flex flex-wrap gap-2">
                      {avatarSeleccionado.personalidad.map((trait, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Voz</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <Volume2 size={20} />
                      </div>
                      <p className="text-sm text-slate-600">{avatarSeleccionado.voz}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Idiomas</h3>
                    <div className="flex gap-2">
                      {avatarSeleccionado.idiomas.map((idioma, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                          {idioma}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Última Actividad</h3>
                    <p className="text-sm text-slate-600">
                      {new Date(avatarSeleccionado.ultimaActividad).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              )}

              {vistaDetalle === 'historial' && (
                <div className="space-y-3">
                  {avatarSeleccionado.historial.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTipoIcon(item.tipo)}
                        <div>
                          <p className="font-medium text-slate-800">{item.titulo}</p>
                          <p className="text-xs text-slate-500">{item.fecha}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{item.engagement.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">interacciones</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {vistaDetalle === 'config' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Palette size={20} className="text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-800">Estilo Visual</p>
                        <p className="text-xs text-slate-500">Paleta de colores y estética</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Editar</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-800">Tono de Comunicación</p>
                        <p className="text-xs text-slate-500">Cómo se expresa el avatar</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Editar</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <RefreshCw size={20} className="text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-800">Re-entrenar Avatar</p>
                        <p className="text-xs text-slate-500">Actualizar con nuevos datos</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Iniciar</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Engagement por Avatar (últimos 5 meses)</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="Emma" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Tech" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Sofia" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvataresCentralPage;
