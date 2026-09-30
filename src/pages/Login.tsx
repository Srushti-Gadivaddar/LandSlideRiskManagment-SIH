import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, ArrowRight, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [officialId, setOfficialId] = useState('NER-DDMA-SHILLONG-04');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(officialId);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background subtle tactical grid & radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E2E44_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-[#0B1728] border border-[#1E2E44] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10">
        {/* Left Side: Brand & Mission */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#0F1F35] to-[#07111F] border-b md:border-b-0 md:border-r border-[#1E2E44] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-wider text-white">
                    GeoGuard
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-700">
                    NER
                  </span>
                </div>
                <p className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wide">
                  PSID: 260001 • SIH 2026
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                AI-Based Early Warning & Landslide Risk Intelligence
              </h2>
              <p className="text-sm font-semibold text-cyan-300">
                North Eastern Region
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                Operational decision-support platform fusing precipitation telemetry, slope geotechnical indices, soil saturation, and ground truth field reports to safeguard vulnerable mountain communities.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E2E44]/80 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>DECISION LIFECYCLE</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-[#101D2E] border border-[#1E2E44]">SENSE</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#101D2E] border border-[#1E2E44]">ANALYSE</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#101D2E] border border-[#1E2E44]">PREDICT</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#101D2E] border border-[#1E2E44]">EXPLAIN</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#101D2E] border border-[#1E2E44]">ALERT</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-[#101D2E]/80">
          <div className="mb-6">
            <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase block">
              DISASTER MANAGEMENT DESK
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Command Portal Sign In
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter official authority credentials to access operational risk feeds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Official ID</span>
                <span className="text-[10px] text-cyan-400 font-mono">Verified Credential</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={officialId}
                  onChange={(e) => setOfficialId(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-medium"
                  required
                />
                <UserCheck className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-slate-500 font-mono">RSA-2048</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-medium"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
            >
              <span>{isLoading ? 'Authorizing Session...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Disclaimers */}
          <div className="mt-8 pt-6 border-t border-[#1E2E44] text-center space-y-1">
            <p className="text-[11px] font-semibold text-slate-300">
              Authorized Disaster Management Platform
            </p>
            <p className="text-[10px] text-amber-400/90 font-mono">
              Prototype environment • Simulated inputs for SIH 2026 Evaluation
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-slate-500 font-mono">
        GeoGuard NER • Decision Support Prototype • Smart India Hackathon
      </div>
    </div>
  );
};
