import React, { useState } from 'react';
import { AlertItem } from '../types';
import { RiskBadge } from './RiskBadge';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  AlertTriangle,
  Users,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertModalProps {
  alert: AlertItem | null;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ alert, onClose }) => {
  const { addToast, updateAlertStatus } = useApp();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  if (!alert) return null;

  const handleSendTestAlert = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(
        'Early Warning Dispatched',
        'Demo alert queued successfully. Prototype environment: simulated broadcast to authorized recipients.',
        'success'
      );
      onClose();
    }, 700);
  };

  const handleResolveAlert = async () => {
    await updateAlertStatus(alert.id, 'RESOLVED');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#101D2E] rounded-xl border border-[#1E2E44] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1E2E44] bg-[#0B1728] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                WARNING PREVIEW
              </span>
              <h2
                id="alert-modal-title"
                className="text-base font-bold text-slate-100 flex items-center gap-2"
              >
                <span>{alert.region}</span>
                <span className="text-xs text-slate-400 font-mono font-normal">
                  ({alert.id})
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close warning preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Risk Level & Confidence Card */}
          <div className="p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[11px] block">ASSESSED LANDSLIDE RISK</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold font-mono text-red-400">
                  {alert.riskScore}
                </span>
                <span className="text-slate-400 font-mono">/ 100</span>
              </div>
            </div>

            <div className="text-right">
              <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="md" />
              <div className="mt-1.5 text-[11px] text-cyan-400 font-mono">
                Model Confidence: {alert.confidence}%
              </div>
            </div>
          </div>

          {/* Major Contributing Factors */}
          <div>
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span>Major Contributing Factors</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {alert.trigger.map((trig, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#0B1728] border border-[#1E2E44] text-slate-300 font-medium"
                >
                  <span className="text-cyan-400 mr-1.5 font-bold">•</span>
                  <span>{trig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-3.5 rounded-lg bg-orange-950/20 border border-orange-500/30">
            <h3 className="font-semibold text-orange-300 text-[11px] uppercase tracking-wider mb-1">
              Recommended Action
            </h3>
            <p className="text-slate-200 leading-relaxed font-medium">
              {alert.recommendedAction}
            </p>
          </div>

          {/* Recipients */}
          <div>
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Notification Recipients</span>
            </h3>
            <div className="space-y-1.5">
              {alert.recipients.map((recipient, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg bg-[#07111F] border border-[#1E2E44] flex items-center justify-between text-slate-300"
                >
                  <span>{recipient}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                    CHANNEL READY
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prototype Interaction Disclaimer */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-[11px] text-slate-400 leading-normal">
            <strong>Prototype Interaction:</strong> This test alert dispatches to an internal simulation queue. Real SMS, VHF, CAP (Common Alerting Protocol), and Siren integrations will be linked upon formal DDMA deployment.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#1E2E44] bg-[#0B1728] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              navigate(`/location/${alert.zoneId}`);
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline underline-offset-4"
          >
            <span>Inspect Location Intelligence</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResolveAlert}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              Mark Resolved
            </button>

            <button
              onClick={handleSendTestAlert}
              disabled={isSending}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg shadow-lg shadow-red-600/20 flex items-center gap-2 transition-all"
            >
              <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-bounce' : ''}`} />
              <span>{isSending ? 'Queuing Demo Alert...' : 'SEND TEST ALERT'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
