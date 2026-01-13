import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Image,
  Play,
  FileText,
  Mail,
  Target,
  RefreshCw,
  Copy,
  Check,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Edit3,
  Eye,
  Calendar,
  ChevronRight,
  Zap,
  MessageSquare,
  Wand2,
  Layers,
  AlertCircle
} from 'lucide-react';
import { PageType } from '../../App';

interface GeneradorContenidoPageProps {
  onNavigate: (page: PageType) => void;
}

interface BorradorContenido {
  id: string;
  titulo: string;
  tipo: 'reel' | 'post' | 'story' | 'email';
  tienda: string;
  avatar: string;
  contenido: string;
  estado: 'borrador' | 'aprobacion' | 'aprobado' | 'rechazado';
  fechaCreacion: string;
  sugerencias?: string[];
}

const BORRADORES: BorradorContenido[] = [
  {
    id: 'draft-001',
    titulo: 'Tutorial: Cómo programar el comedero WiFi',
    tipo: 'reel',
    tienda: 'Pet Vogue',
    avatar: 'Emma',
    contenido: '¡Hola pet lovers! 🐕 Hoy les voy a mostrar cómo programar el comedero inteligente WiFi en solo 3 pasos...',
    estado: 'aprobacion',
    fechaCreacion: '2026-01-13T09:00:00',
    sugerencias: ['Agregar música trending', 'Incluir call-to-action al final']
  },
  {
    id: 'draft-002',
    titulo: 'Smart Home 2026: Las 5 tendencias que no te puedes perder',
    tipo: 'post',
    tienda: 'CoreSmart',
    avatar: 'Tech',
    contenido: 'El futuro del hogar inteligente ya está aquí. Te comparto las 5 tendencias que dominarán este 2026...',
    estado: 'aprobado',
    fechaCreacion: '2026-01-13T08:30:00'
  },
  {
    id: 'draft-003',
    titulo: 'Newsletter: Novedades de enero',
    tipo: 'email',
    tienda: 'Pet Vogue',
    avatar: 'Emma',
    contenido: 'Queridos amantes de las mascotas, empezamos el año con novedades increíbles...',
    estado: 'borrador',
    fechaCreacion: '2026-01-12T16:00:00',
    sugerencias: ['Agregar sección de ofertas', 'Revisar asunto del email']
  },
  {
    id: 'draft-004',
    titulo: 'Tips de bienestar para parejas',
    tipo: 'story',
    tienda: 'Sensuality',
    avatar: 'Sofia',
    contenido: '💜 3 tips para mejorar la conexión con tu pareja esta semana...',
    estado: 'rechazado',
    fechaCreacion: '2026-01-12T14:00:00',
    sugerencias: ['Tono muy comercial, hacerlo más personal', 'Agregar más valor antes del CTA']
  }
];

const PLANTILLAS = [
  { id: 'tpl-1', nombre: 'Producto Destacado', tipo: 'post', descripcion: 'Presenta un producto con sus beneficios' },
  { id: 'tpl-2', nombre: 'Tutorial Paso a Paso', tipo: 'reel', descripcion: 'Guía visual de cómo usar un producto' },
  { id: 'tpl-3', nombre: 'Behind the Scenes', tipo: 'story', descripcion: 'Muestra el día a día de la marca' },
  { id: 'tpl-4', nombre: 'Newsletter Mensual', tipo: 'email', descripcion: 'Resumen de novedades del mes' },
  { id: 'tpl-5', nombre: 'Promoción Flash', tipo: 'story', descripcion: 'Oferta limitada con urgencia' },
  { id: 'tpl-6', nombre: 'Testimonial Cliente', tipo: 'post', descripcion: 'Historia de éxito de un cliente' },
];

const GeneradorContenidoPage: React.FC<GeneradorContenidoPageProps> = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState('Pet Vogue');
  const [tipoContenido, setTipoContenido] = useState<'reel' | 'post' | 'story' | 'email'>('post');
  const [generando, setGenerando] = useState(false);
  const [contenidoGenerado, setContenidoGenerado] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState<'generar' | 'cola' | 'plantillas'>('generar');

  const handleGenerar = () => {
    if (!prompt.trim()) return;
    setGenerando(true);
    // Simular generación
    setTimeout(() => {
      setContenidoGenerado(`¡Contenido generado para ${tiendaSeleccionada}! 🎉\n\nBasado en tu prompt: "${prompt}"\n\nEste es un ejemplo de contenido que el avatar generaría para un ${tipoContenido}. El contenido está optimizado para engagement y sigue las mejores prácticas de la plataforma.\n\n#${tiendaSeleccionada.replace(' ', '')} #Marketing #AI`);
      setGenerando(false);
    }, 2000);
  };

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'reel': return <Play size={14} />;
      case 'post': return <Image size={14} />;
      case 'story': return <Zap size={14} />;
      case 'email': return <Mail size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'aprobacion': return { color: 'bg-amber-50 text-amber-600', icon: <Clock size={12} />, label: 'En revisión' };
      case 'aprobado': return { color: 'bg-green-50 text-green-600', icon: <CheckCircle2 size={12} />, label: 'Aprobado' };
      case 'rechazado': return { color: 'bg-red-50 text-red-600', icon: <XCircle size={12} />, label: 'Rechazado' };
      default: return { color: 'bg-slate-100 text-slate-600', icon: <Edit3 size={12} />, label: 'Borrador' };
    }
  };

  const pendientesAprobacion = BORRADORES.filter(b => b.estado === 'aprobacion').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Generador de Contenido</h1>
          <p className="text-sm text-slate-500 mt-1">Crea contenido con IA para todas tus marcas</p>
        </div>
        {pendientesAprobacion > 0 && (
          <button
            onClick={() => setTabActiva('cola')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
          >
            <AlertCircle size={16} />
            {pendientesAprobacion} pendientes de aprobación
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="border-b border-slate-100">
          <div className="flex">
            {[
              { id: 'generar', label: 'Generar Nuevo', icon: <Wand2 size={16} /> },
              { id: 'cola', label: 'Cola de Aprobación', icon: <Layers size={16} />, badge: pendientesAprobacion },
              { id: 'plantillas', label: 'Plantillas', icon: <FileText size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  tabActiva === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.badge ? (
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Generar */}
        {tabActiva === 'generar' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Panel de Configuración */}
              <div className="col-span-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Marca</label>
                  <select
                    value={tiendaSeleccionada}
                    onChange={(e) => setTiendaSeleccionada(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                  >
                    <option value="Pet Vogue">🐕 Pet Vogue</option>
                    <option value="CoreSmart">🏠 CoreSmart</option>
                    <option value="Sensuality">💜 Sensuality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Contenido</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'post', label: 'Post', icon: <Image size={16} /> },
                      { id: 'reel', label: 'Reel', icon: <Play size={16} /> },
                      { id: 'story', label: 'Story', icon: <Zap size={16} /> },
                      { id: 'email', label: 'Email', icon: <Mail size={16} /> }
                    ].map((tipo) => (
                      <button
                        key={tipo.id}
                        onClick={() => setTipoContenido(tipo.id as any)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          tipoContenido === tipo.id
                            ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {tipo.icon}
                        {tipo.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Avatar</label>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {tiendaSeleccionada === 'Pet Vogue' ? 'E' : tiendaSeleccionada === 'CoreSmart' ? 'T' : 'S'}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {tiendaSeleccionada === 'Pet Vogue' ? 'Emma' : tiendaSeleccionada === 'CoreSmart' ? 'Tech' : 'Sofia'}
                      </p>
                      <p className="text-xs text-slate-500">Avatar asignado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel de Prompt y Generación */}
              <div className="col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Describe lo que quieres crear</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ej: Un post sobre los beneficios de las camas ortopédicas para perros mayores de 8 años, enfocado en el cuidado de sus articulaciones..."
                    className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGenerar}
                    disabled={generando || !prompt.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {generando ? (
                      <><RefreshCw size={16} className="animate-spin" /> Generando...</>
                    ) : (
                      <><Sparkles size={16} /> Generar con IA</>
                    )}
                  </button>
                  <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                    Sugerir ideas
                  </button>
                </div>

                {/* Contenido Generado */}
                {contenidoGenerado && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-700">✨ Contenido Generado</span>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-white/50 rounded text-slate-500">
                          <Copy size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-white/50 rounded text-slate-500">
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-line">{contenidoGenerado}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Check size={14} /> Guardar Borrador
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                        <Calendar size={14} /> Programar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Cola de Aprobación */}
        {tabActiva === 'cola' && (
          <div className="p-6">
            <div className="space-y-4">
              {BORRADORES.map((borrador) => {
                const estadoBadge = getEstadoBadge(borrador.estado);
                return (
                  <div key={borrador.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          {getTipoIcon(borrador.tipo)}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{borrador.titulo}</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span>{borrador.tienda}</span>
                            <span>•</span>
                            <span>Avatar: {borrador.avatar}</span>
                            <span>•</span>
                            <span>{new Date(borrador.fechaCreacion).toLocaleDateString('es-AR')}</span>
                          </div>
                          {borrador.sugerencias && borrador.sugerencias.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {borrador.sugerencias.map((sug, idx) => (
                                <p key={idx} className="text-xs text-amber-600 flex items-center gap-1">
                                  <AlertCircle size={10} /> {sug}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${estadoBadge.color}`}>
                          {estadoBadge.icon}
                          {estadoBadge.label}
                        </span>
                        {borrador.estado === 'aprobacion' && (
                          <div className="flex gap-2">
                            <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                              <Check size={16} />
                            </button>
                            <button className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors">
                              <XCircle size={16} />
                            </button>
                          </div>
                        )}
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                          <Eye size={16} className="text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Plantillas */}
        {tabActiva === 'plantillas' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {PLANTILLAS.map((plantilla) => (
                <div
                  key={plantilla.id}
                  className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                  onClick={() => {
                    setTipoContenido(plantilla.tipo as any);
                    setPrompt(`Crear contenido usando la plantilla: ${plantilla.nombre}`);
                    setTabActiva('generar');
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-purple-600 transition-colors">
                      {getTipoIcon(plantilla.tipo)}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">{plantilla.nombre}</h3>
                      <p className="text-xs text-slate-500 capitalize">{plantilla.tipo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{plantilla.descripcion}</p>
                  <button className="mt-3 flex items-center gap-1 text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Usar plantilla <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneradorContenidoPage;
