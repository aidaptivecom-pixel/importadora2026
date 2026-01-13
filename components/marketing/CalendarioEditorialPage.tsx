import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Play,
  Image,
  Zap,
  Mail,
  Target,
  Clock,
  User,
  MoreHorizontal,
  Eye,
  Edit3,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook
} from 'lucide-react';
import { PageType } from '../../App';

interface CalendarioEditorialPageProps {
  onNavigate: (page: PageType) => void;
}

interface ContenidoCalendario {
  id: string;
  titulo: string;
  tipo: 'reel' | 'post' | 'story' | 'email' | 'ad';
  tienda: string;
  tiendaColor: string;
  avatar: string;
  estado: 'publicado' | 'programado' | 'borrador' | 'aprobacion';
  hora?: string;
  plataforma: string;
}

// Datos de contenido por día
const CONTENIDO_CALENDARIO: Record<string, ContenidoCalendario[]> = {
  '2026-01-13': [
    { id: '1', titulo: 'Tutorial comedero WiFi', tipo: 'reel', tienda: 'Pet Vogue', tiendaColor: 'bg-blue-500', avatar: 'Emma', estado: 'publicado', hora: '10:00', plataforma: 'Instagram' },
    { id: '2', titulo: 'Smart Home Tendencias', tipo: 'post', tienda: 'CoreSmart', tiendaColor: 'bg-emerald-500', avatar: 'Tech', estado: 'publicado', hora: '14:00', plataforma: 'Instagram' },
    { id: '3', titulo: 'Tips bienestar', tipo: 'story', tienda: 'Sensuality', tiendaColor: 'bg-purple-500', avatar: 'Sofia', estado: 'publicado', hora: '18:00', plataforma: 'Instagram' },
  ],
  '2026-01-14': [
    { id: '4', titulo: 'Instalación cerradura', tipo: 'reel', tienda: 'CoreSmart', tiendaColor: 'bg-emerald-500', avatar: 'Tech', estado: 'programado', hora: '11:00', plataforma: 'TikTok' },
    { id: '5', titulo: 'Nuevo collar GPS', tipo: 'post', tienda: 'Pet Vogue', tiendaColor: 'bg-blue-500', avatar: 'Emma', estado: 'programado', hora: '16:00', plataforma: 'Instagram' },
    { id: '6', titulo: 'Aromaterapia beneficios', tipo: 'post', tienda: 'Sensuality', tiendaColor: 'bg-purple-500', avatar: 'Sofia', estado: 'programado', hora: '20:00', plataforma: 'Instagram' },
  ],
  '2026-01-15': [
    { id: '7', titulo: 'Detrás de escena', tipo: 'story', tienda: 'Pet Vogue', tiendaColor: 'bg-blue-500', avatar: 'Emma', estado: 'borrador', plataforma: 'Instagram' },
    { id: '8', titulo: 'Campaña Seguridad', tipo: 'ad', tienda: 'CoreSmart', tiendaColor: 'bg-emerald-500', avatar: 'Tech', estado: 'aprobacion', plataforma: 'Meta Ads' },
  ],
  '2026-01-16': [
    { id: '9', titulo: 'Newsletter enero', tipo: 'email', tienda: 'Pet Vogue', tiendaColor: 'bg-blue-500', avatar: 'Emma', estado: 'aprobacion', hora: '09:00', plataforma: 'Email' },
    { id: '10', titulo: 'Promo San Valentín', tipo: 'email', tienda: 'Sensuality', tiendaColor: 'bg-purple-500', avatar: 'Sofia', estado: 'borrador', plataforma: 'Email' },
  ],
  '2026-01-17': [
    { id: '11', titulo: 'Cuidado de mascotas invierno', tipo: 'reel', tienda: 'Pet Vogue', tiendaColor: 'bg-blue-500', avatar: 'Emma', estado: 'borrador', plataforma: 'Instagram' },
  ],
  '2026-01-20': [
    { id: '12', titulo: 'Automatización hogar', tipo: 'reel', tienda: 'CoreSmart', tiendaColor: 'bg-emerald-500', avatar: 'Tech', estado: 'borrador', plataforma: 'YouTube' },
    { id: '13', titulo: 'Consejos parejas', tipo: 'story', tienda: 'Sensuality', tiendaColor: 'bg-purple-500', avatar: 'Sofia', estado: 'borrador', plataforma: 'Instagram' },
  ]
};

const CalendarioEditorialPage: React.FC<CalendarioEditorialPageProps> = ({ onNavigate }) => {
  const [vistaActual, setVistaActual] = useState<'mes' | 'semana'>('semana');
  const [fechaActual, setFechaActual] = useState(new Date(2026, 0, 13)); // Enero 2026
  const [filtroTienda, setFiltroTienda] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState<ContenidoCalendario | null>(null);

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'reel': return <Play size={12} />;
      case 'post': return <Image size={12} />;
      case 'story': return <Zap size={12} />;
      case 'email': return <Mail size={12} />;
      case 'ad': return <Target size={12} />;
      default: return null;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'publicado': return 'border-l-green-500 bg-green-50/50';
      case 'programado': return 'border-l-blue-500 bg-blue-50/50';
      case 'borrador': return 'border-l-slate-400 bg-slate-50/50';
      case 'aprobacion': return 'border-l-amber-500 bg-amber-50/50';
      default: return 'border-l-slate-300';
    }
  };

  // Generar días de la semana actual
  const getDiasSemana = () => {
    const dias = [];
    const inicioSemana = new Date(fechaActual);
    const diaSemana = inicioSemana.getDay();
    inicioSemana.setDate(inicioSemana.getDate() - diaSemana + 1); // Lunes

    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicioSemana);
      dia.setDate(inicioSemana.getDate() + i);
      dias.push(dia);
    }
    return dias;
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toISOString().split('T')[0];
  };

  const diasSemana = getDiasSemana();
  const nombresDias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const navegarSemana = (direccion: number) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(nuevaFecha.getDate() + (direccion * 7));
    setFechaActual(nuevaFecha);
  };

  const contenidoFiltrado = (contenidos: ContenidoCalendario[]) => {
    return contenidos.filter(c => {
      if (filtroTienda && c.tienda !== filtroTienda) return false;
      if (filtroTipo && c.tipo !== filtroTipo) return false;
      return true;
    });
  };

  // Estadísticas de la semana
  const statsSemanales = diasSemana.reduce((acc, dia) => {
    const key = formatearFecha(dia);
    const contenidos = CONTENIDO_CALENDARIO[key] || [];
    acc.total += contenidos.length;
    acc.publicados += contenidos.filter(c => c.estado === 'publicado').length;
    acc.programados += contenidos.filter(c => c.estado === 'programado').length;
    acc.pendientes += contenidos.filter(c => c.estado === 'borrador' || c.estado === 'aprobacion').length;
    return acc;
  }, { total: 0, publicados: 0, programados: 0, pendientes: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Calendario Editorial</h1>
          <p className="text-sm text-slate-500 mt-1">Planifica y gestiona el contenido de todas las marcas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setVistaActual('semana')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                vistaActual === 'semana' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setVistaActual('mes')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                vistaActual === 'mes' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
              }`}
            >
              Mes
            </button>
          </div>
          <button
            onClick={() => onNavigate('marketing-generador')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Crear Contenido
          </button>
        </div>
      </div>

      {/* Stats de la semana */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Total Semana</p>
          <p className="text-2xl font-bold text-slate-800">{statsSemanales.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Publicados</p>
          <p className="text-2xl font-bold text-green-600">{statsSemanales.publicados}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Programados</p>
          <p className="text-2xl font-bold text-blue-600">{statsSemanales.programados}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-amber-600">{statsSemanales.pendientes}</p>
        </div>
      </div>

      {/* Filtros y navegación */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navegarSemana(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              <div className="text-center min-w-[200px]">
                <p className="font-semibold text-slate-800">
                  {diasSemana[0].toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })} - {diasSemana[6].toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => navegarSemana(1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
            <button
              onClick={() => setFechaActual(new Date(2026, 0, 13))}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Hoy
            </button>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filtroTienda}
              onChange={(e) => setFiltroTienda(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Todas las marcas</option>
              <option value="Pet Vogue">🐕 Pet Vogue</option>
              <option value="CoreSmart">🏠 CoreSmart</option>
              <option value="Sensuality">💜 Sensuality</option>
            </select>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Todos los tipos</option>
              <option value="reel">🎬 Reels</option>
              <option value="post">📷 Posts</option>
              <option value="story">⚡ Stories</option>
              <option value="email">📧 Email</option>
              <option value="ad">📢 Ads</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendario Semanal */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header días */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {diasSemana.map((dia, idx) => {
            const esHoy = formatearFecha(dia) === '2026-01-13';
            return (
              <div
                key={idx}
                className={`p-4 text-center border-r border-slate-100 last:border-r-0 ${
                  esHoy ? 'bg-blue-50' : ''
                }`}
              >
                <p className="text-xs font-medium text-slate-500 uppercase">{nombresDias[idx]}</p>
                <p className={`text-xl font-bold mt-1 ${
                  esHoy ? 'text-blue-600' : 'text-slate-800'
                }`}>
                  {dia.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contenido por día */}
        <div className="grid grid-cols-7 min-h-[500px]">
          {diasSemana.map((dia, idx) => {
            const key = formatearFecha(dia);
            const contenidos = contenidoFiltrado(CONTENIDO_CALENDARIO[key] || []);
            const esHoy = key === '2026-01-13';

            return (
              <div
                key={idx}
                className={`border-r border-slate-100 last:border-r-0 p-2 ${
                  esHoy ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="space-y-2">
                  {contenidos.map((contenido) => (
                    <div
                      key={contenido.id}
                      onClick={() => setContenidoSeleccionado(contenido)}
                      className={`p-2 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${getEstadoColor(contenido.estado)}`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${contenido.tiendaColor}`}></div>
                        <span className="text-[10px] font-medium text-slate-500">{contenido.tienda}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 line-clamp-2 mb-1">
                        {contenido.titulo}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-400">
                          {getTipoIcon(contenido.tipo)}
                          <span className="text-[10px]">{contenido.plataforma}</span>
                        </div>
                        {contenido.hora && (
                          <span className="text-[10px] text-slate-400">{contenido.hora}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {contenidos.length === 0 && (
                    <button className="w-full p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                      <Plus size={16} className="mx-auto" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-l-4 border-l-green-500 bg-green-50"></div>
          <span>Publicado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-l-4 border-l-blue-500 bg-blue-50"></div>
          <span>Programado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-l-4 border-l-amber-500 bg-amber-50"></div>
          <span>En aprobación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-l-4 border-l-slate-400 bg-slate-50"></div>
          <span>Borrador</span>
        </div>
      </div>

      {/* Modal de detalle (simplificado) */}
      {contenidoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setContenidoSeleccionado(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${contenidoSeleccionado.tiendaColor}`}></div>
                  <span className="text-sm font-medium text-slate-600">{contenidoSeleccionado.tienda}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{contenidoSeleccionado.titulo}</h3>
              </div>
              <button onClick={() => setContenidoSeleccionado(null)} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Tipo</span>
                <span className="font-medium text-slate-800 capitalize">{contenidoSeleccionado.tipo}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Plataforma</span>
                <span className="font-medium text-slate-800">{contenidoSeleccionado.plataforma}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Avatar</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">{contenidoSeleccionado.avatar}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Estado</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                  contenidoSeleccionado.estado === 'publicado' ? 'bg-green-50 text-green-600' :
                  contenidoSeleccionado.estado === 'programado' ? 'bg-blue-50 text-blue-600' :
                  contenidoSeleccionado.estado === 'aprobacion' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-600'
                }`}>{contenidoSeleccionado.estado}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Editar
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                <Copy size={16} />
              </button>
              <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioEditorialPage;
