import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FieldReportsMap } from '../components/FieldReportsMap';
import { FieldReportModal } from '../components/FieldReportModal';
import type { FieldReport, ObservationType } from '../types';
import {
  MapPin,
  Plus,
  Camera,
  Video,
  Check,
  Flame,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const FieldReports: React.FC = () => {
  const { fieldReports, updateReportStatus, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FieldReport | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredReports = fieldReports.filter((r) => {
    if (filterType === 'ALL') return true;
    return r.status === filterType;
  });

  const handleVerify = async (reportId: string) => {
    await updateReportStatus(reportId, 'VERIFIED');
    addToast(
      'Ground Truth Confirmed',
      `Field report #${reportId} verified. AI confidence calibrated.`,
      'success'
    );
  };

  const handleEscalate = async (reportId: string) => {
    await updateReportStatus(reportId, 'ESCALATED');
    addToast(
      'Report Escalated',
      `Field report #${reportId} escalated to State Emergency Ops.`,
      'warning'
    );
  };

  const handleResolve = async (reportId: string) => {
    await updateReportStatus(reportId, 'RESOLVED');
    addToast(
      'Hazard Cleared',
      `Field report #${reportId} marked resolved following road clearance.`,
      'info'
    );
  };

  return (
    <div className="space-y-5">
      {/* Title & Header */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <MapPin className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Field Verification
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect AI predictions with real-world observations and ground truth validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Field Report</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK LOOP VISUALIZATION BANNER */}
      <div className="p-3 bg-[#0B1728] border border-[#1E2E44] rounded-lg">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
          Human-in-the-Loop Operational Feedback Loop
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono text-red-400 block font-bold">1. AI WARNING</span>
            <span className="text-slate-300 font-medium">Suspected slope risk detected</span>
          </div>
          <div className="p-2 rounded bg-[#07111F] border border-[#0D9488]/40">
            <span className="text-[10px] font-mono text-[#2DD4BF] block font-bold">2. FIELD VERIFICATION</span>
            <span className="text-slate-300 font-medium">Officer inspects tension cracks</span>
          </div>
          <div className="p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">3. CONFIRMED EVENT</span>
            <span className="text-slate-300 font-medium">Ground evidence validated</span>
          </div>
          <div className="p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono text-emerald-400 block font-bold">4. RESPONSE ACTION</span>
            <span className="text-slate-300 font-medium">Detour enforced & model learns</span>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <FieldReportsMap
        reports={fieldReports}
        selectedReportId={selectedReport?.id}
        onSelectReport={(r) => setSelectedReport(r)}
        onVerifyReport={handleVerify}
        height="380px"
      />

      {/* Report Categories Legend & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B1728] p-3 rounded-lg border border-[#1E2E44]">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">Categories:</span>
          <span>⚡ Slope crack</span>
          <span>⛰️ Soil movement</span>
          <span>🚧 Blocked road</span>
          <span>💧 Water accumulation</span>
          <span>🏗️ Infrastructure damage</span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          {['ALL', 'UNDER VERIFICATION', 'VERIFIED', 'ESCALATED', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterType(status)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                filterType === status
                  ? 'bg-[#0F766E] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg border transition-colors ${
              report.status === 'UNDER VERIFICATION'
                ? 'bg-[#0B1728] border-amber-500/40'
                : report.status === 'ESCALATED'
                ? 'bg-[#0B1728] border-red-500/40'
                : 'bg-[#0B1728] border-[#1E2E44]'
            }`}
          >
            <div className="flex items-start justify-between pb-2 border-b border-[#1E2E44]">
              <div>
                <span className="text-[10px] font-mono text-[#2DD4BF] font-semibold block">
                  FIELD REPORT #{report.id}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                  {report.locationName}
                </h3>
              </div>

              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                  report.status === 'VERIFIED'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                    : report.status === 'UNDER VERIFICATION'
                    ? 'bg-amber-950/80 text-amber-400 border-amber-700'
                    : report.status === 'ESCALATED'
                    ? 'bg-red-950/80 text-red-400 border-red-700'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {report.status}
              </span>
            </div>

            <div className="py-2.5 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block">Reported by:</span>
                  <span className="text-slate-200">{report.reportedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Time:</span>
                  <span className="text-slate-200">{report.time}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">
                    Observation: <span className="text-[#2DD4BF]">{report.observationType}</span>
                  </span>
                  <span className="font-mono text-emerald-400">
                    GPS: Available (±{report.gps.accuracyMeters}m)
                  </span>
                </div>
                <p className="text-slate-200 leading-normal text-xs">
                  {report.description}
                </p>
              </div>

              {/* Photos & Video Evidence */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Camera className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>Photos: {report.evidence.photos}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>Video: {report.evidence.videos}</span>
                  </span>
                </div>

                <span>
                  {report.gps.lat.toFixed(4)}°N, {report.gps.lng.toFixed(4)}°E
                </span>
              </div>
            </div>

            {/* Action Buttons: [ Verify ], [ Escalate ], [ Resolve ] */}
            <div className="pt-2.5 border-t border-[#1E2E44] flex items-center justify-end gap-2">
              {report.status !== 'VERIFIED' && (
                <button
                  onClick={() => handleVerify(report.id)}
                  className="px-2.5 py-1 text-xs font-medium rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              )}

              {report.status !== 'ESCALATED' && (
                <button
                  onClick={() => handleEscalate(report.id)}
                  className="px-2.5 py-1 text-xs font-medium rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Escalate</span>
                </button>
              )}

              {report.status !== 'RESOLVED' && (
                <button
                  onClick={() => handleResolve(report.id)}
                  className="px-2.5 py-1 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Field Report Creation Modal */}
      <FieldReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
