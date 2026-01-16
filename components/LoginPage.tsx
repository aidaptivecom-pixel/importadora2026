import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, Shield, Ship, Store, Bot, TrendingUp } from 'lucide-react';

interface LoginPageProps {
  onLogin: (success: boolean, username?: string) => void;
}

const LoginPage: React.FC&lt;LoginPageProps&gt; = ({ onLogin }) => {
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
      onLogin(true, username);
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
    &lt;div className="min-h-screen bg-slate-200 p-4"&gt;
      {/* Main Container - Same style as dashboard */}
      &lt;div className="min-h-[calc(100vh-32px)] bg-[#f8fafc] rounded-2xl shadow-xl overflow-hidden flex"&gt;
        
        {/* Left Panel - Branding */}
        &lt;div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden"&gt;
          {/* Background pattern */}
          &lt;div className="absolute inset-0 opacity-5"&gt;
            &lt;div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} /&gt;
          &lt;/div&gt;

          {/* Decorative circles */}
          &lt;div className="absolute -right-20 top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" /&gt;
          &lt;div className="absolute -left-20 bottom-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" /&gt;
          
          {/* Content */}
          &lt;div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white w-full"&gt;
            &lt;motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            &gt;
              {/* Logo */}
              &lt;div className="flex items-center gap-3 mb-10"&gt;
                &lt;motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                &gt;
                  &lt;Globe className="w-7 h-7 text-white" /&gt;
                &lt;/motion.div&gt;
                &lt;div&gt;
                  &lt;h1 className="text-2xl font-bold tracking-tight"&gt;Nexo Global Trade&lt;/h1&gt;
                  &lt;p className="text-slate-400 text-sm"&gt;Sistema de Gestión Empresarial&lt;/p&gt;
                &lt;/div&gt;
              &lt;/div&gt;

              {/* Tagline */}
              &lt;h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4"&gt;
                Plataforma integral de
                &lt;span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"&gt; comercio &lt;/span&gt;
                exterior
              &lt;/h2&gt;

              &lt;p className="text-slate-400 mb-8 max-w-md"&gt;
                Controla importaciones, ventas mayoristas y ecommerce desde un único lugar con inteligencia artificial.
              &lt;/p&gt;

              {/* Features Grid */}
              &lt;div className="grid grid-cols-2 gap-3 mb-8"&gt;
                {features.map((feature, index) =&gt; (
                  &lt;motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                  &gt;
                    &lt;div className={`w-9 h-9 rounded-lg ${feature.color} flex items-center justify-center shadow-sm`}&gt;
                      &lt;feature.icon className="w-5 h-5 text-white" /&gt;
                    &lt;/div&gt;
                    &lt;span className="text-sm text-slate-300"&gt;{feature.text}&lt;/span&gt;
                  &lt;/motion.div&gt;
                ))}
              &lt;/div&gt;

              {/* Stats */}
              &lt;div className="flex gap-6 pt-6 border-t border-white/10"&gt;
                {stats.map((stat, index) =&gt; (
                  &lt;motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  &gt;
                    &lt;p className="text-2xl font-bold text-white"&gt;{stat.value}&lt;/p&gt;
                    &lt;p className="text-xs text-slate-400"&gt;{stat.label}&lt;/p&gt;
                  &lt;/motion.div&gt;
                ))}
              &lt;/div&gt;
            &lt;/motion.div&gt;

            {/* Footer */}
            &lt;div className="absolute bottom-6 left-12 xl:left-16 text-slate-500 text-xs"&gt;
              © 2026 Nexo Global Trade SA
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Right Panel - Login Form */}
        &lt;div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#f8fafc]"&gt;
          &lt;motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          &gt;
            {/* Mobile logo */}
            &lt;div className="lg:hidden flex items-center gap-3 mb-8 justify-center"&gt;
              &lt;div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm"&gt;
                &lt;Globe className="w-6 h-6 text-white" /&gt;
              &lt;/div&gt;
              &lt;div&gt;
                &lt;h1 className="text-xl font-bold text-slate-800"&gt;Nexo Global Trade&lt;/h1&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            {/* Login card */}
            &lt;div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"&gt;
              &lt;div className="text-center mb-8"&gt;
                &lt;h2 className="text-2xl font-bold text-slate-800"&gt;Bienvenido&lt;/h2&gt;
                &lt;p className="text-slate-500 mt-2 text-sm"&gt;Ingresa tus credenciales para acceder al sistema&lt;/p&gt;
              &lt;/div&gt;

              &lt;form onSubmit={handleSubmit} className="space-y-5"&gt;
                {/* Username field */}
                &lt;div&gt;
                  &lt;label className="block text-sm font-medium text-slate-700 mb-2"&gt;
                    Usuario
                  &lt;/label&gt;
                  &lt;div className="relative"&gt;
                    &lt;div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"&gt;
                      &lt;User className="h-5 w-5 text-slate-400" /&gt;
                    &lt;/div&gt;
                    &lt;input
                      type="text"
                      value={username}
                      onChange={(e) =&gt; setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white text-slate-800"
                      placeholder="Ingresa tu usuario"
                      required
                    /&gt;
                  &lt;/div&gt;
                &lt;/div&gt;

                {/* Password field */}
                &lt;div&gt;
                  &lt;label className="block text-sm font-medium text-slate-700 mb-2"&gt;
                    Contraseña
                  &lt;/label&gt;
                  &lt;div className="relative"&gt;
                    &lt;div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"&gt;
                      &lt;Lock className="h-5 w-5 text-slate-400" /&gt;
                    &lt;/div&gt;
                    &lt;input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) =&gt; setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white text-slate-800"
                      placeholder="Ingresa tu contraseña"
                      required
                    /&gt;
                    &lt;button
                      type="button"
                      onClick={() =&gt; setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    &gt;
                      {showPassword ? &lt;EyeOff className="h-5 w-5" /&gt; : &lt;Eye className="h-5 w-5" /&gt;}
                    &lt;/button&gt;
                  &lt;/div&gt;
                &lt;/div&gt;

                {/* Error message */}
                {error && (
                  &lt;motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
                  &gt;
                    &lt;AlertCircle className="w-5 h-5 flex-shrink-0" /&gt;
                    &lt;span&gt;{error}&lt;/span&gt;
                  &lt;/motion.div&gt;
                )}

                {/* Submit button */}
                &lt;button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                &gt;
                  {isLoading ? (
                    &lt;&gt;
                      &lt;svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"&gt;
                        &lt;circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /&gt;
                        &lt;path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /&gt;
                      &lt;/svg&gt;
                      &lt;span&gt;Verificando...&lt;/span&gt;
                    &lt;/&gt;
                  ) : (
                    &lt;&gt;
                      &lt;span&gt;Ingresar al Sistema&lt;/span&gt;
                      &lt;ArrowRight className="w-5 h-5" /&gt;
                    &lt;/&gt;
                  )}
                &lt;/button&gt;
              &lt;/form&gt;

              {/* Footer info */}
              &lt;div className="mt-6 pt-6 border-t border-slate-100 text-center"&gt;
                &lt;p className="text-slate-400 text-xs"&gt;
                  Acceso restringido a usuarios autorizados
                &lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            {/* Security badge */}
            &lt;div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs"&gt;
              &lt;Shield className="w-4 h-4" /&gt;
              &lt;span&gt;Conexión segura encriptada&lt;/span&gt;
            &lt;/div&gt;
          &lt;/motion.div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default LoginPage;
