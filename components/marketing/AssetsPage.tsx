import React, { useState } from 'react';
import {
  FolderOpen,
  Image,
  Video,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  MoreHorizontal,
  Star,
  Eye,
  Copy,
  Trash2,
  Tag,
  Calendar,
  HardDrive,
  Palette,
  Layout,
  Music,
  File
} from 'lucide-react';
import { PageType } from '../../App';

interface AssetsPageProps {
  onNavigate: (page: PageType) => void;
}

interface Asset {
  id: string;
  nombre: string;
  tipo: 'imagen' | 'video' | 'template' | 'documento' | 'audio';
  tienda: string;
  tiendaEmoji: string;
  categoria: string;
  tamano: string;
  fechaSubida: string;
  usos: number;
  favorito: boolean;
  preview?: string;
}

const ASSETS: Asset[] = [
  // Pet Vogue
  { id: 'asset-001', nombre: 'Logo Pet Vogue Principal', tipo: 'imagen', tienda: 'Pet Vogue', tiendaEmoji: '🐕', categoria: 'Logos', tamano: '2.4 MB', fechaSubida: '2025-12-01', usos: 145, favorito: true },
  { id: 'asset-002', nombre: 'Banner Verano 2026', tipo: 'imagen', tienda: 'Pet Vogue', tiendaEmoji: '🐕', categoria: 'Banners', tamano: '4.8 MB', fechaSubida: '2026-01-10', usos: 23, favorito: false },
  { id: 'asset-003', nombre: 'Video Producto Cama Ortopédica', tipo: 'video', tienda: 'Pet Vogue', tiendaEmoji: '🐕', categoria: 'Videos Producto', tamano: '45.2 MB', fechaSubida: '2026-01-05', usos: 18, favorito: true },
  { id: 'asset-004', nombre: 'Template Post Instagram', tipo: 'template', tienda: 'Pet Vogue', tiendaEmoji: '🐕', categoria: 'Templates', tamano: '1.2 MB', fechaSubida: '2025-11-15', usos: 89, favorito: true },
  { id: 'asset-005', nombre: 'Fotos Productos Mascotas Pack', tipo: 'imagen', tienda: 'Pet Vogue', tiendaEmoji: '🐕', categoria: 'Fotos Producto', tamano: '128 MB', fechaSubida: '2026-01-08', usos: 56, favorito: false },
  
  // CoreSmart
  { id: 'asset-006', nombre: 'Logo CoreSmart Horizontal', tipo: 'imagen', tienda: 'CoreSmart', tiendaEmoji: '🏠', categoria: 'Logos', tamano: '1.8 MB', fechaSubida: '2025-11-20', usos: 132, favorito: true },
  { id: 'asset-007', nombre: 'Demo Cerradura Inteligente', tipo: 'video', tienda: 'CoreSmart', tiendaEmoji: '🏠', categoria: 'Videos Demo', tamano: '78.5 MB', fechaSubida: '2026-01-02', usos: 34, favorito: true },
  { id: 'asset-008', nombre: 'Infografía Smart Home', tipo: 'imagen', tienda: 'CoreSmart', tiendaEmoji: '🏠', categoria: 'Infografías', tamano: '3.2 MB', fechaSubida: '2025-12-18', usos: 67, favorito: false },
  { id: 'asset-009', nombre: 'Template Story Promoción', tipo: 'template', tienda: 'CoreSmart', tiendaEmoji: '🏠', categoria: 'Templates', tamano: '0.9 MB', fechaSubida: '2025-12-10', usos: 45, favorito: false },
  { id: 'asset-010', nombre: 'Catálogo Productos PDF', tipo: 'documento', tienda: 'CoreSmart', tiendaEmoji: '🏠', categoria: 'Documentos', tamano: '12.4 MB', fechaSubida: '2026-01-01', usos: 89, favorito: true },
  
  // Sensuality
  { id: 'asset-011', nombre: 'Logo Sensuality Elegante', tipo: 'imagen', tienda: 'Sensuality', tiendaEmoji: '💜', categoria: 'Logos', tamano: '1.5 MB', fechaSubida: '2025-10-15', usos: 98, favorito: true },
  { id: 'asset-012', nombre: 'Fotos Lifestyle Bienestar', tipo: 'imagen', tienda: 'Sensuality', tiendaEmoji: '💜', categoria: 'Fotos Lifestyle', tamano: '85 MB', fechaSubida: '2025-12-20', usos: 42, favorito: false },
  { id: 'asset-013', nombre: 'Video Aromaterapia', tipo: 'video', tienda: 'Sensuality', tiendaEmoji: '💜', categoria: 'Videos', tamano: '34.7 MB', fechaSubida: '2026-01-06', usos: 15, favorito: false },
  { id: 'asset-014', nombre: 'Paleta de Colores Marca', tipo: 'documento', tienda: 'Sensuality', tiendaEmoji: '💜', categoria: 'Brand', tamano: '0.5 MB', fechaSubida: '2025-09-01', usos: 156, favorito: true },
  { id: 'asset-015', nombre: 'Música Ambiente Tienda', tipo: 'audio', tienda: 'Sensuality', tiendaEmoji: '💜', categoria: 'Audio', tamano: '8.2 MB', fechaSubida: '2025-11-01', usos: 23, favorito: false },
];

const CATEGORIAS = [
  { id: 'all', nombre: 'Todos', icon: FolderOpen, count: ASSETS.length },
  { id: 'imagen', nombre: 'Imágenes', icon: Image, count: ASSETS.filter(a => a.tipo === 'imagen').length },
  { id: 'video', nombre: 'Videos', icon: Video, count: ASSETS.filter(a => a.tipo === 'video').length },
  { id: 'template', nombre: 'Templates', icon: Layout, count: ASSETS.filter(a => a.tipo === 'template').length },
  { id: 'documento', nombre: 'Documentos', icon: FileText, count: ASSETS.filter(a => a.tipo === 'documento').length },
  { id: 'audio', nombre: 'Audio', icon: Music, count: ASSETS.filter(a => a.tipo === 'audio').length },
];

const AssetsPage: React.FC<AssetsPageProps> = ({ onNavigate }) => {
  const [vistaActual, setVistaActual] = useState<'grid' | 'list'>('grid');
  const [busqueda, setBusqueda] = useState('');
  const [filtroTienda, setFiltroTienda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [assetSeleccionado, setAssetSeleccionado] = useState<Asset | null>(null);

  const assetsFiltrados = ASSETS.filter(asset => {
    if (busqueda && !asset.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    if (filtroTienda && asset.tienda !== filtroTienda) return false;
    if (filtroTipo && filtroTipo !== 'all' && asset.tipo !== filtroTipo) return false;
    return true;
  });

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'imagen': return <Image size={20} className="text-blue-500" />;
      case 'video': return <Video size={20} className="text-purple-500" />;
      case 'template': return <Layout size={20} className="text-green-500" />;
      case 'documento': return <FileText size={20} className="text-amber-500" />;
      case 'audio': return <Music size={20} className="text-pink-500" />;
      default: return <File size={20} className="text-slate-400" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch(tipo) {
      case 'imagen': return 'bg-blue-100';
      case 'video': return 'bg-purple-100';
      case 'template': return 'bg-green-100';
      case 'documento': return 'bg-amber-100';
      case 'audio': return 'bg-pink-100';
      default: return 'bg-slate-100';
    }
  };

  // Calcular espacio usado por tienda
  const espacioPorTienda = {
    'Pet Vogue': ASSETS.filter(a => a.tienda === 'Pet Vogue').reduce((acc, a) => acc + parseFloat(a.tamano), 0),
    'CoreSmart': ASSETS.filter(a => a.tienda === 'CoreSmart').reduce((acc, a) => acc + parseFloat(a.tamano), 0),
    'Sensuality': ASSETS.filter(a => a.tienda === 'Sensuality').reduce((acc, a) => acc + parseFloat(a.tamano), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Biblioteca de Assets</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona fotos, videos, templates y documentos de marca</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Upload size={16} />
          Subir Assets
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <FolderOpen size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Assets</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{ASSETS.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <HardDrive size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Espacio Usado</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {(ASSETS.reduce((acc, a) => acc + parseFloat(a.tamano), 0) / 1000).toFixed(1)} GB
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Star size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Favoritos</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{ASSETS.filter(a => a.favorito).length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Eye size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Usos Totales</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{ASSETS.reduce((acc, a) => acc + a.usos, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar de Categorías */}
        <div className="col-span-1 space-y-4">
          {/* Categorías por tipo */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h3 className="font-semibold text-slate-800">Tipo de Asset</h3>
            </div>
            <div className="p-2">
              {CATEGORIAS.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFiltroTipo(cat.id === 'all' ? '' : cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      (filtroTipo === cat.id || (!filtroTipo && cat.id === 'all'))
                        ? 'bg-purple-50 text-purple-700'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="text-sm font-medium">{cat.nombre}</span>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Espacio por marca */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h3 className="font-semibold text-slate-800">Espacio por Marca</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🐕</span>
                  <span className="text-sm text-slate-600">Pet Vogue</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{espacioPorTienda['Pet Vogue'].toFixed(0)} MB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🏠</span>
                  <span className="text-sm text-slate-600">CoreSmart</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{espacioPorTienda['CoreSmart'].toFixed(0)} MB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>💜</span>
                  <span className="text-sm text-slate-600">Sensuality</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{espacioPorTienda['Sensuality'].toFixed(0)} MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="col-span-3 space-y-4">
          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar assets..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                />
              </div>
              <select
                value={filtroTienda}
                onChange={(e) => setFiltroTienda(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              >
                <option value="">Todas las marcas</option>
                <option value="Pet Vogue">🐕 Pet Vogue</option>
                <option value="CoreSmart">🏠 CoreSmart</option>
                <option value="Sensuality">💜 Sensuality</option>
              </select>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setVistaActual('grid')}
                  className={`p-2 rounded ${vistaActual === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid size={16} className="text-slate-600" />
                </button>
                <button
                  onClick={() => setVistaActual('list')}
                  className={`p-2 rounded ${vistaActual === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List size={16} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Assets */}
          {vistaActual === 'grid' ? (
            <div className="grid grid-cols-3 gap-4">
              {assetsFiltrados.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setAssetSeleccionado(asset)}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className={`h-32 ${getTipoColor(asset.tipo)} flex items-center justify-center relative`}>
                    {getTipoIcon(asset.tipo)}
                    {asset.favorito && (
                      <Star size={16} className="absolute top-2 right-2 text-amber-500 fill-amber-500" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors">
                        <Eye size={16} className="text-slate-600" />
                      </button>
                      <button className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors">
                        <Download size={16} className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-slate-800 line-clamp-1">{asset.nombre}</h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{asset.tiendaEmoji} {asset.tienda}</span>
                      <span>{asset.tamano}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Eye size={10} /> {asset.u