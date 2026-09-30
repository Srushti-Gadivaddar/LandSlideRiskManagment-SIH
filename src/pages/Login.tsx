import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [officialId, setOfficialId] = useState('NER-DDMA-SHILLONG-04');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('District Authority');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(officialId, role);
      navigate('/dashboard');
    }, 350);
  };

  const roleOptions: UserRole[] = [
    'District Authority',
    'State Disaster Management Authority',
    'Road Agency (NHIDCL / BRO)',
    'Field Operations Lead'
  ];

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative select-none">
      {/* Subtle topographic contour background styling */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topoGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1E2E44" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topoGrid)" />
          {/* Subtle topographic contour curves */}
          <path d="M-100,200 Q200,100 600,250 T1400,180" fill="none" stroke="#14B8A6" strokeWidth="0.75" strokeOpacity="0.25" />
          <path d="M-100,350 Q300,220 700,380 T1500,300" fill="none" stroke="#14B8A6" strokeWidth="0.75" strokeOpacity="0.18" />
          <path d="M-100,500 Q400,340 800,520 T1600,440" fill="none" stroke="#14B8A6" strokeWidth="0.75" strokeOpacity="0.15" />
          <path d="M-100,650 Q500,460 900,660 T1700,580" fill="none" stroke="#14B8A6" strokeWidth="0.75" strokeOpacity="0.12" />
        </svg>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-[#0B1728] border border-[#1E2E44] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
        {/* Left Side: Product Identity (5 cols) */}
        <div className="md:col-span-6 p-8 sm:p-10 bg-[#081220] border-b md:border-b-0 md:border-r border-[#1E2E44] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F766E]/20 border border-[#0D9488]/40 flex items-center justify-center text-[#14B8A6]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-white">
                    GeoGuard NER
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Landslide Decision Support
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
                AI-Powered Landslide Risk Intelligence
              </h1>

              <p className="text-xs text-slate-300 leading-relaxed">
                "Helping authorities detect risk earlier, verify conditions faster, and coordinate response."
              </p>

              <div className="pt-4 border-t border-[#1E2E44] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Core Decision Flow
                </span>
                <p className="text-[11px] font-mono text-[#2DD4BF] leading-relaxed">
                  SENSE → ANALYSE → PREDICT → EXPLAIN → ALERT → VERIFY → RESPOND → LEARN
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E2E44] flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6] shrink-0" />
            <span>Operational Decision-Support System • North Eastern Region</span>
          </div>
        </div>

        {/* Right Side: Sign In Form (6 cols) */}
        <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-center bg-[#0B1728]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Sign in
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter official credentials to access the command center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Official ID */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Official ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={officialId}
                  onChange={(e) => setOfficialId(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] font-mono text-xs transition-colors"
                  placeholder="e.g. NER-DDMA-SHILLONG-04"
                  required
                />
                <UserCheck className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] font-mono text-xs transition-colors"
                  placeholder="••••••••••••"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full appearance-none bg-[#07111F] border border-[#1E2E44] rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] font-medium text-xs pr-9 transition-colors cursor-pointer"
                >
                  {roleOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B1728] text-slate-100 py-1">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs tracking-wide shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{isLoading ? 'Authorizing Access...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Bottom Disclaimers */}
          <div className="mt-8 pt-6 border-t border-[#1E2E44] text-center space-y-1">
            <p className="text-[11px] font-medium text-slate-300">
              Secure decision-support environment
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Prototype / Demo Environment
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-[11px] text-slate-500 font-mono">
        GeoGuard NER • Disaster Management Command Platform
      </div>
    </div>
  );
};
