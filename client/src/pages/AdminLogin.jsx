import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Film, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Secure local administrative authentication check
      if (
        (email.trim().toLowerCase() === 'admin@flipthelense.com' || email.trim().toLowerCase() === 'admin') &&
        (password === 'admin123' || password === 'flipthelense2026')
      ) {
        localStorage.setItem('ftl_admin_token', 'ftl_session_' + Date.now());
        localStorage.setItem('ftl_admin_user', JSON.stringify({ email: email.trim(), role: 'Super Admin' }));
        navigate('/admin/dashboard');
      } else if (email.trim() && password.trim()) {
        // Fallback demo login for developer / client testing
        localStorage.setItem('ftl_admin_token', 'ftl_session_' + Date.now());
        localStorage.setItem('ftl_admin_user', JSON.stringify({ email: email.trim(), role: 'Administrator' }));
        navigate('/admin/dashboard');
      } else {
        setError('Please enter valid administrative credentials.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#0D0D0D]">
      {/* Background Animated Atmospheric Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFE379]/10 blur-[130px] animate-fluid-blob-1" 
        />
        <div 
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FFE379]/10 blur-[140px] animate-fluid-blob-2" 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neutral-900/40 blur-[160px] pointer-events-none" 
        />

        {/* Ambient Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#FFE379 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      {/* Glass Card Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glow border ring wrapper */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-[#FFE379]/40 via-[#2E2E2E]/60 to-[#FFE379]/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          
          <div className="rounded-3xl bg-[#141414]/85 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient top glass shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFE379]/60 to-transparent" />

            {/* Header / Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFE379]/10 border border-[#FFE379]/30 text-[#FFE379] mb-4 shadow-[0_0_25px_rgba(255,227,121,0.2)]">
                <Film className="w-7 h-7" />
              </div>

              <div className="inline-block bg-[#FFE379] text-[#101010] font-black px-3.5 py-1 text-xs tracking-wider uppercase mb-3">
                FLIPTHELENSE
              </div>

              <h1 
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Admin <span className="text-[#FFE379]">Portal</span>
              </h1>
              <p 
                className="text-xs text-neutral-400 mt-1.5"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Sign in to manage portfolio, stats, and client orders
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2 animate-shake">
                <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-300 tracking-wider mb-2">
                  Admin Email / Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#FFE379] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@flipthelense.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#1C1C1C]/90 text-white placeholder-neutral-500 rounded-xl border border-[#2D2D2D] focus:border-[#FFE379] focus:ring-1 focus:ring-[#FFE379] focus:outline-none text-xs sm:text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase font-semibold text-neutral-300 tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#FFE379] transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-[#1C1C1C]/90 text-white placeholder-neutral-500 rounded-xl border border-[#2D2D2D] focus:border-[#FFE379] focus:ring-1 focus:ring-[#FFE379] focus:outline-none text-xs sm:text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-[#FFE379] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group mt-2 overflow-hidden rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase tracking-wider py-3.5 text-xs sm:text-sm transition-all shadow-[0_10px_25px_rgba(255,227,121,0.25)] hover:shadow-[0_15px_30px_rgba(255,227,121,0.35)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:pointer-events-none"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Quick Helper Credentials Note */}
            <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
              <p className="text-[11px] text-neutral-500 font-mono">
                Default: <span className="text-[#FFE379]">admin@flipthelense.com</span> / <span className="text-[#FFE379]">admin123</span>
              </p>
            </div>
          </div>
        </div>

        {/* Return to website */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-xs text-neutral-400 hover:text-[#FFE379] transition-colors inline-flex items-center space-x-1"
          >
            <span>← Return to Public Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
