import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, Shield, Ship, Store, Bot, TrendingUp } from 'lucide-react';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validar credenciales
    if (username === 'matias' && password === 'frigeri8') {
      // Guardar sesión en localStorage
      localStorage.setItem('nexo_auth', JSON.stringify({
        user: username,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
      }));
      onLogin(true);
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Ship, text: 'Gestión de importaciones', color: 'bg-blue-500' },
    { icon: Store, text: 'Ecommerce multitienda', color: 'bg-emerald-500' },
    { icon: Bot, text: 'Agentes IA integrados', color: 'bg-purple-500' },
    { icon: TrendingUp, text: 'Analytics en tiempo real', color: 'bg-amber-500' }
  ];

  const stats = [
    { value: '12', label: 'Operaciones activas' },
    { value: '3', label: 'Tiendas online' },
    { value: '$180K', label: 'Vol. mensual' }
  ];

  return (
    <div className="min-h-screen bg-slate-200 p-4">
      {/* Main Container - Same style as dashboard */}
      <div className="min-h-[calc(100vh-32px)] bg-[#f8fafc] rounded-2xl shadow-xl overflow-hidden flex">
        
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-20 top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 bottom-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-10">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Globe className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Nexo Global Trade</h1>
                  <p className="text-slate-400 text-sm">Sistema de Gestión Empresarial</p>
                </div>
              </div>

              {/* Tagline */}
              <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
                Plataforma integral de
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> comercio </span>
                exterior
              </h2>

              <p className="text-slate-400 mb-8 max-w-md">
                Controla importaciones, ventas mayoristas y ecommerce desde un único lugar con inteligencia artificial.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                  >
                    <div className={`w-9 h-9 rounded-lg ${feature.color} flex items-center justify-center shadow-sm`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-slate-300">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-6 border-t border-white/10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-6 left-12 xl:left-16 text-slate-500 text-xs">
              © 2026 Nexo Global Trade SA
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#f8fafc]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Nexo Global Trade</h1>
              </div>
            </div>

            {/* Login card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Bienvenido</h2>
                <p className="text-slate-500 mt-2 text-sm">Ingresa tus credenciales para acceder al sistema</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white text-slate-800"
                      placeholder="Ingresa tu usuario"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white text-slate-800"
                      placeholder="Ingresa tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <>
                      <span>Ingresar al Sistema</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer info */}
              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-xs">
                  Acceso restringido a usuarios autorizados
                </p>
              </div>
            </div>

            {/* Security badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Shield className="w-4 h-4" />
              <span>Conexión segura encriptada</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
