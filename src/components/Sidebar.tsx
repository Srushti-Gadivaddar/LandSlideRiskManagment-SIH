import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sliders,
  AlertTriangle,
  MapPin,
  Route,
  Brain,
  Shield,
  Activity,
  UserCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { alerts, fieldReports } = useApp();
  const activeAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;
  const pendingReportsCount = fieldReports.filter((r) => r.status === 'UNDER VERIFICATION').length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'Command Center',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/simulator',
      label: 'Risk Intelligence',
      icon: Sliders,
      badge: 'What-If'
    },
    {
      to: '/alerts',
      label: 'Early Warnings',
      icon: AlertTriangle,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null,
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40'
    },
    {
      to: '/field-reports',
      label: 'Field Reports',
      icon: MapPin,
      badge: pendingReportsCount > 0 ? `${pendingReportsCount}` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      to: '/response',
      label: 'Response Planning',
      icon: Route,
      badge: null
    },
    {
      to: '/model',
      label: 'Model Intelligence',
      icon: Brain,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1728] border-r border-[#1E2E44] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-[#1E2E44] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-100 tracking-wider text-base">
                  GeoGuard
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-700">
                  NER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight">
                PSID: 260001 • SIH 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Pipeline Indicator */}
        <div className="px-4 py-2 bg-[#07111F]/70 border-b border-[#1E2E44]/70">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>Operational Workflow</span>
          </div>
          <div className="text-[9px] text-slate-400 font-mono truncate mt-0.5">
            SENSE → ANALYSE → PREDICT → ALERT
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer: System Status & User Profile */}
        <div className="p-3.5 border-t border-[#1E2E44] bg-[#07111F]">
          <div className="p-2.5 rounded-lg bg-[#101D2E] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span className="text-slate-400">System Status</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1E2E44]/70 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  District Authority
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  NER DDMA Command Desk
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
