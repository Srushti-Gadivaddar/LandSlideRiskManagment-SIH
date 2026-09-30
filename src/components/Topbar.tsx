import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopbarProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  title = 'Command Center',
  subtitle = 'AI-Powered Landslide Risk Intelligence & Early Warning'
}) => {
  const navigate = useNavigate();
  const { alerts, refreshData, isLoading, addToast, userRole, officialId } = useApp();
  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE');

  const handleRefresh = async () => {
    await refreshData();
    addToast('Telemetry Synchronized', 'Updated sensor streams and risk indices.', 'info');
  };

  return (
    <header className="h-16 bg-[#07111F] border-b border-[#1E2E44] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/40 border border-slate-700/60 lg:hidden cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#14B8A6] font-mono tracking-wider hidden sm:inline">
              GeoGuard NER
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block truncate max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Operational Status, Refresh, Alerts, User Profile */}
      <div className="flex items-center gap-3">
        {/* System Status: Operational */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B1728] border border-[#1E2E44] text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">System Status:</span>
          <span className="text-emerald-400 font-semibold">Operational</span>
        </div>

        {/* Prototype Environment Notice */}
        <span className="hidden xl:inline text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Prototype Environment
        </span>

        {/* Refresh button with timestamp */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-[#0B1728] hover:bg-[#101D2E] border border-[#1E2E44] rounded transition-colors cursor-pointer"
          title="Refresh telemetry stream"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#14B8A6] ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden lg:inline text-[11px] text-slate-400 font-mono">
            Updated: 2 min ago
          </span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 text-slate-300 hover:text-white bg-[#0B1728] hover:bg-[#101D2E] border border-[#1E2E44] rounded transition-colors cursor-pointer"
          aria-label="View early warnings"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center">
              {activeAlerts.length}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1E2E44]">
          <div className="w-7 h-7 rounded bg-[#0F766E]/20 border border-[#0D9488]/40 flex items-center justify-center text-[#14B8A6] font-bold text-xs">
            {userRole.charAt(0)}
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-slate-200 leading-tight truncate max-w-[130px]">
              {userRole}
            </p>
            <p className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
              {officialId}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
