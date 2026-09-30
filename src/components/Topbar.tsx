import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, RefreshCw, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopbarProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  title = 'NER Landslide Risk Command Center',
  subtitle = 'AI-Based Early Warning & Landslide Risk Monitoring System'
}) => {
  const navigate = useNavigate();
  const { alerts, refreshData, isLoading, addToast } = useApp();
  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE');

  const handleRefresh = async () => {
    await refreshData();
    addToast('Telemetry Refreshed', 'Simulated regional sensor telemetry and risk indices updated.', 'info');
  };

  return (
    <header className="h-16 bg-[#07111F] border-b border-[#1E2E44] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/40 border border-slate-700/60 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
              {title}
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              SENSE-FLOW v1.2
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Demo Mode Badge, Telemetry Status, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Required DEMO MODE badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-extrabold tracking-wider text-[11px]">DEMO MODE</span>
          <span className="text-[10px] text-amber-400/80 font-mono hidden xl:inline">
            • Prototype data & simulated feeds
          </span>
        </div>

        {/* Refresh button with timestamp */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-[#101D2E] hover:bg-[#16273e] border border-[#1E2E44] rounded-lg transition-colors"
          title="Refresh simulated telemetry data"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
            Updated: 2 min ago
          </span>
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 text-slate-300 hover:text-white bg-[#101D2E] hover:bg-[#16273e] border border-[#1E2E44] rounded-lg transition-colors"
          aria-label="View Alerts"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-lg">
              {activeAlerts.length}
            </span>
          )}
        </button>

        {/* User profile dropdown / avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1E2E44]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            DA
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-slate-200 leading-tight">District Authority</p>
            <p className="text-[10px] text-cyan-400 font-mono">NER DDMA East Khasi</p>
          </div>
        </div>
      </div>
    </header>
  );
};
