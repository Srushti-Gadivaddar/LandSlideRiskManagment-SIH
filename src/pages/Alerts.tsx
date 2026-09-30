import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { AlertItem } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { AlertModal } from '../components/AlertModal';
import {
  Bell,
  CheckCircle2,
  Send,
  ArrowUpRight
} from 'lucide-react';

export const Alerts: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, updateAlertStatus, addToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED'>('ALL');
  const [activeModalAlert, setActiveModalAlert] = useState<AlertItem | null>(null);

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'RESOLVED') return alert.status === 'RESOLVED';
    return alert.riskLevel === selectedFilter && alert.status !== 'RESOLVED';
  });

  const handleEscalate = async (e: React.MouseEvent, alert: AlertItem) => {
    e.stopPropagation();
    await updateAlertStatus(alert.id, 'ESCALATED');
    addToast(
      'Alert Escalated',
      `Disaster advisory for ${alert.region} escalated to Level 1 Emergency Desk.`,
      'warning'
    );
  };

  const handleQuickPreview = (alert: AlertItem) => {
    setActiveModalAlert(alert);
  };

  return (
    <div className="space-y-5">
      {/* Title & Header */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-red-500/10 text-red-400">
              <Bell className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Early Warning Center
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
              CAP COMPLIANT (DEMO)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor and manage location-level risk alerts across NER sectors.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#101D2E] border border-[#1E2E44]">
          {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'RESOLVED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                selectedFilter === filter
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-[#101D2E] rounded-xl border border-[#1E2E44]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-200">No alerts found under current filter</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleQuickPreview(alert)}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg ${
                alert.riskLevel === 'CRITICAL'
                  ? 'bg-[#101D2E] border-red-500/40 hover:border-red-500/70 shadow-[0_0_15px_-3px_rgba(239,68,68,0.1)]'
                  : alert.riskLevel === 'HIGH'
                  ? 'bg-[#101D2E] border-orange-500/40 hover:border-orange-500/70 shadow-[0_0_15px_-3px_rgba(249,115,22,0.1)]'
                  : 'bg-[#101D2E] border-[#1E2E44] hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Left side: Region, Level, ID */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {alert.id} • {alert.timestamp}
                    </span>
                    {alert.status === 'ESCALATED' && (
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-700">
                        ESCALATED
                      </span>
                    )}
                    {alert.status === 'RESOLVED' && (
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        RESOLVED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-extrabold text-slate-100">
                      {alert.region}
                    </h3>
                    <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="sm" />
                    <span className="text-xs font-mono text-cyan-400">
                      Confidence: {alert.confidence}%
                    </span>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/location/${alert.zoneId}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Location</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleEscalate(e, alert)}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-semibold transition-colors"
                  >
                    Escalate
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickPreview(alert);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Preview & Send</span>
                  </button>
                </div>
              </div>

              {/* Triggers & Recommended Action */}
              <div className="mt-3 pt-3 border-t border-[#1E2E44]/70 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[11px] mb-1">
                    Multi-Factor Triggers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {alert.trigger.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#07111F] text-slate-300 font-mono text-[11px] border border-[#1E2E44]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[11px] mb-1">
                    Recommended Action:
                  </span>
                  <p className="text-slate-200 font-medium">
                    {alert.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Warning Preview Modal */}
      <AlertModal
        alert={activeModalAlert}
        onClose={() => setActiveModalAlert(null)}
      />
    </div>
  );
};
