import React, { useState } from 'react';
import {
  Bot,
  Send,
  Mic,
  Settings,
  Sparkles,
  MessageSquare,
  Zap,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Package,
  DollarSign,
  Ship,
  Users,
  ShoppingCart,
  BarChart3,
  Clock,
  ArrowRight,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

// Conversaciones de ejemplo
const EJEMPLO_CONVERSACIONES = [
  {
    pregunta: "¿Cuál es el estado del embarque EMB-2025-089?",
    respuesta: "El embarque EMB-2025-089 (Electrónica Consumo Masivo) está actualmente en **etapa de Arribo**. Llegó a Buenos Aires el 6 de Enero 2026. El free time vence el 20 de Enero, tienes **8 días** para coordinar el retiro. Hay 1 pago pendiente de $1,200 USD por honorarios del despachante.",
    tipo: "consulta"
  },
  {
    pregunta: "Genera un reporte de ventas del último mes",
    respuesta: "He generado el reporte de ventas de Diciembre 2025:\n\n📊 **Resumen:**\n• Ventas totales: $891,450 USD\n• Mayorista: $640,000 (72%)\n• Ecommerce: $251,450 (28%)\n\n📈 **Crecimiento vs mes anterior:** +18.5%\n\n¿Quieres que te envíe el detalle por cliente o por tienda?",
    tipo: "reporte"
  },
  {
    pregunta: "¿Qué acciones urgentes tengo pendientes?",
    respuesta: "Tienes **4 acciones urgentes** pendientes:\n\n🔴 **Críticas (Hoy):**\n1. Responder observación AFIP - OP-072 (Canal rojo)\n2. Validar NCM canal naranja - OP-088\n\n🟠 **Altas (Esta semana):**\n3. B/L pendiente - OP-091 (15 Ene)\n4. Pagar honorarios OP-089 (15 Ene)\n\n¿Quieres que te ayude con alguna de estas tareas?",
    tipo: "urgente"
  }
];

// Sugerencias rápidas
const SUGERENCIAS = [
  { texto: "¿Qué embarques llegan esta semana?", icono: Ship },
  { texto: "Resumen de cobranzas pendientes", icono: DollarSign },
  { texto: "Estado de stock crítico", icono: Package },
  { texto: "Proyección de ventas Q2", icono: TrendingUp },
];

// Capacidades del Avatar
const CAPACIDADES = [
  { nombre: "Consultas Operativas", descripcion: "Estado de embarques, tracking, documentos", icono: Ship, color: "bg-blue-50 text-blue-600" },
  { nombre: "Análisis Financiero", descripcion: "Reportes, proyecciones, métricas", icono: BarChart3, color: "bg-emerald-50 text-emerald-600" },
  { nombre: "Gestión de Clientes", descripcion: "Historial, deudas, seguimiento", icono: Users, color: "bg-purple-50 text-purple-600" },
  { nombre: "Alertas Inteligentes", descripcion: "Notificaciones proactivas, urgencias", icono: AlertCircle, color: "bg-amber-50 text-amber-600" },
  { nombre: "Automatización", descripcion: "Tareas repetitivas, emails, recordatorios", icono: Zap, color: "bg-cyan-50 text-cyan-600" },
  { nombre: "Predicciones AI", descripcion: "Demanda, riesgos, oportunidades", icono: Brain, color: "bg-pink-50 text-pink-600" },
];

const AvatarDigitalPage: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const [conversacionActiva, setConversacionActiva] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-purple-500" size={28} />
            Avatar Digital - Aidaptive AI
          </h1>
          <p className="text-sm text-slate-500 mt-1">Tu asistente inteligente para gestión de importaciones</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-semibold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Online
          </span>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={28} className="text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-semibold">Nexo AI Assistant</h3>
                <p className="text-xs text-white/80">Powered by Aidaptive Platform</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {/* Welcome Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-purple-600" />
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-[80%]">
                <p className="text-sm text-slate-700">
                  ¡Hola Matías! 👋 Soy tu asistente de Nexo Global Trade. Puedo ayudarte con:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Estado de operaciones y embarques</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Reportes y análisis financiero</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Alertas y tareas pendientes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Automatización de procesos</li>
                </ul>
                <p className="mt-3 text-sm text-slate-500">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>

            {/* Ejemplo de conversación activa */}
            {conversacionActiva !== null && (
              <>
                {/* User message */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-blue-600 text-white rounded-lg rounded-tr-none p-4 shadow-sm max-w-[80%]">
                    <p className="text-sm">{EJEMPLO_CONVERSACIONES[conversacionActiva].pregunta}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600">MA</span>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-purple-600" />
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-[80%]">
                    <p className="text-sm text-slate-700 whitespace-pre-line">
                      {EJEMPLO_CONVERSACIONES[conversacionActiva].respuesta}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <ArrowRight size={12} /> Ver detalles
                      </button>
                      <span className="text-slate-300">|</span>
                      <button className="text-xs text-slate-500 hover:text-slate-600">Copiar</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sugerencias */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <Lightbulb size={12} /> Sugerencias rápidas:
            </p>
            <div className="flex gap-2 flex-wrap">
              {SUGERENCIAS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => setConversacionActiva(idx < EJEMPLO_CONVERSACIONES.length ? idx : 0)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-700 transition-colors"
                >
                  <sug.icono size={12} />
                  {sug.texto}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe tu mensaje o pregunta..."
                  className="w-full px-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
                />
              </div>
              <button className="p-3 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors">
                <Mic size={20} />
              </button>
              <button className="p-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Capacidades */}
        <div className="space-y-6">
          {/* Capacidades */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Brain size={18} className="text-purple-500" />
                Capacidades AI
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {CAPACIDADES.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cap.color}`}>
                    <cap.icono size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-800">{cap.nombre}</h4>
                    <p className="text-xs text-slate-500">{cap.descripcion}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap size={18} /> Estadísticas del Asistente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Consultas resueltas</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Tiempo ahorrado</span>
                <span className="font-bold">156 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Precisión respuestas</span>
                <span className="font-bold">94.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Automatizaciones</span>
                <span className="font-bold">89 activas</span>
              </div>
            </div>
          </div>

          {/* Ejemplos de conversación */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-500" />
                Ejemplos de Uso
              </h2>
            </div>
            <div className="divide-y divide-slate-50">
              {EJEMPLO_CONVERSACIONES.map((conv, idx) => (
                <button
                  key={idx}
                  onClick={() => setConversacionActiva(idx)}
                  className="w-full p-3 text-left hover:bg-slate-50 transition-colors"
                >
                  <p className="text-sm text-slate-700 truncate">"{conv.pregunta}"</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                    conv.tipo === 'consulta' ? 'bg-blue-100 text-blue-700' :
                    conv.tipo === 'reporte' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {conv.tipo === 'consulta' ? 'Consulta' : conv.tipo === 'reporte' ? 'Reporte' : 'Alertas'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDigitalPage;
