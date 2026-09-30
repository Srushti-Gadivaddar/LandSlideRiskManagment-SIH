import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { AlertItem } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import {
  Bell,
  CheckCircle2,
  Send,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  X,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const Alerts: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, updateAlertStatus, addToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED' | 'ALL'>('ALL');
  const [composerAlert, setComposerAlert] = useState<AlertItem | null>(null);
  const [customActionText, setCustomActionText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'RESOLVED') return alert.status === 'RESOLVED';
    return alert.riskLevel === selectedFilter && alert.status !== 'RESOLVED';
  });

  const handleOpenComposer = (alert: AlertItem) => {
    setComposerAlert(alert);
    setCustomActionText(alert.recommendedAction);
  };

  const handleDispatchPreparedAlert = () => {
    if (!composerAlert) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(
        'Warning Dispatched',
        `Official alert for ${composerAlert.region} queued for multi-agency broadcast.`,
        'success'
      );
      setComposerAlert(null);
    }, 500);
  };

  return (
    <div className="space-y-5">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Bell className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Early Warning Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prediction → Alert → Action: Monitor and manage location-level risk advisories.
          </p>
        </div>

        {/* Top Filter Buttons: Critical, High, Moderate, Resolved */}
        <div className="flex items-center gap-1.5 p-1 rounded bg-[#0B1728] border border-[#1E2E44]">
          {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'RESOLVED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#0F766E] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {filter === 'ALL' ? 'All' : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-[#0B1728] rounded-lg border border-[#1E2E44]">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">No alerts found under current filter</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg bg-[#0B1728] border border-[#1E2E44] hover:border-slate-600 transition-colors shadow-sm space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                {/* Location, Risk Level, Score, Confidence */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {alert.id} • {alert.timestamp}
                    </span>
                    {alert.status === 'ESCALATED' && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-700">
                        ESCALATED
                      </span>
                    )}
                    {alert.status === 'RESOLVED' && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        RESOLVED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 mt-1">
                    <h3 className="text-base font-bold text-slate-100">
                      {alert.region}
                    </h3>
                    <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="sm" />
                    <span className="text-xs font-mono text-slate-400">
                      Confidence: {alert.confidence}%
                    </span>
                  </div>
                </div>

                {/* Buttons: [ View ] and [ Prepare Alert ] */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => navigate(`/location/${alert.zoneId}`)}
                    className="px-3 py-1.5 rounded bg-[#07111F] hover:bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleOpenComposer(alert)}
                    className="px-3.5 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Prepare Alert</span>
                  </button>
                </div>
              </div>

              {/* Main Contributing Factors & Action Required */}
              <div className="pt-2.5 border-t border-[#1E2E44]/70 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Main Contributing Factors
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {alert.trigger.map((trig, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#07111F] text-slate-300 font-mono text-[11px] border border-[#1E2E44]"
                      >
                        {trig}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Action / Response Status
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

      {/* Warning Composer Modal Drawer */}
      {composerAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[#0B1728] rounded-xl border border-[#1E2E44] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-[#1E2E44] bg-[#07111F] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-[#2DD4BF] uppercase font-semibold block">
                  WARNING COMPOSER
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  Prepare Operational Alert: {composerAlert.region}
                </h3>
              </div>
              <button
                onClick={() => setComposerAlert(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block font-mono">Assessed Hazard Level</span>
                  <span className="text-lg font-bold font-mono text-red-400">
                    {composerAlert.riskScore}/100 • {composerAlert.riskLevel}
                  </span>
                </div>
                <RiskBadge level={composerAlert.riskLevel} size="md" />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Alert Advisory Statement
                </label>
                <textarea
                  rows={3}
                  value={customActionText}
                  onChange={(e) => setCustomActionText(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#1E2E44] rounded p-2.5 text-slate-100 focus:outline-none focus:border-[#0D9488] leading-relaxed"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Designated Distribution Channels
                </span>
                <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  {composerAlert.recipients.map((rec, i) => (
                    <div key={i} className="px-2.5 py-1.5 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
                      <span>{rec}</span>
                      <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-1 rounded border border-emerald-800">READY</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-700/60 text-[11px] text-slate-400">
                <strong>Operational Protocol:</strong> Warning queue integrates into CAP feeds, state emergency operations desks, and multi-agency field radios upon authorized dispatch.
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[#1E2E44] bg-[#07111F] flex items-center justify-between">
              <button
                onClick={() => {
                  setComposerAlert(null);
                  navigate('/community-alerts');
                }}
                className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Multilingual Alert Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComposerAlert(null)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDispatchPreparedAlert}
                  disabled={isSending}
                  className="px-4 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? 'Dispatching...' : 'Dispatch Alert'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
