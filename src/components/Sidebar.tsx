import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sliders,
  Bell,
  MapPin,
  Route,
  Brain,
  Shield,
  Scan,
  Send,
  Sparkles,
  UserCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { alerts, fieldReports, userRole, officialId } = useApp();
  const activeAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;
  const pendingReportsCount = fieldReports.filter((r) => r.status === 'UNDER VERIFICATION').length;

  const navSections = [
    {
      heading: 'Operations',
      items: [
        {
          to: '/dashboard',
          label: 'Command Center',
          icon: LayoutDashboard,
          badge: null
        },
        {
          to: '/alerts',
          label: 'Early Warning Center',
          icon: Bell,
          badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null,
          badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30'
        },
        {
          to: '/field-reports',
          label: 'Field Verification',
          icon: MapPin,
          badge: pendingReportsCount > 0 ? `${pendingReportsCount}` : null,
          badgeColor: 'bg-[#0F766E]/20 text-[#2DD4BF] border-[#0D9488]/30'
        },
        {
          to: '/response',
          label: 'Response Planning',
          icon: Route,
          badge: null
        },
        {
          to: '/community-alerts',
          label: 'Alert & Communication',
          icon: Send,
          badge: 'Gov & Public'
        }
      ]
    },
    {
      heading: 'Analytics & Models',
      items: [
        {
          to: '/simulator',
          label: 'Risk Intelligence',
          icon: Sliders,
          badge: 'Simulation'
        },
        {
          to: '/satellite',
          label: 'Satellite Intelligence',
          icon: Scan,
          badge: 'CV Demo'
        },
        {
          to: '/model',
          label: 'Model Architecture',
          icon: Brain,
          badge: null
        },
        {
          to: '/future-intelligence',
          label: 'Future Intelligence',
          icon: Sparkles,
          badge: 'Roadmap'
        }
      ]
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1728] border-r border-[#1E2E44] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-[#1E2E44] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E]/20 border border-[#0D9488]/40 flex items-center justify-center text-[#14B8A6]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100 tracking-tight text-sm">
                  GeoGuard NER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Disaster Decision Support
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workflow indicator */}
        <div className="px-4 py-2 bg-[#07111F]/60 border-b border-[#1E2E44]/70">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            Operational Lifecycle
          </div>
          <div className="text-[9px] text-[#2DD4BF] font-mono truncate mt-0.5 font-medium">
            SENSE → ANALYSE → ALERT → VERIFY → RESPOND
          </div>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {sec.heading}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0F766E]/15 text-[#2DD4BF] border border-[#0D9488]/30 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0 opacity-80" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                          item.badgeColor || 'bg-slate-800/80 text-slate-400 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer: Operational Status & Current User */}
        <div className="p-3 border-t border-[#1E2E44] bg-[#07111F]">
          <div className="p-2.5 rounded-lg bg-[#0B1728] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span className="text-slate-400">System Status</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1E2E44]/70 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-slate-200 truncate">
                  {userRole}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {officialId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
