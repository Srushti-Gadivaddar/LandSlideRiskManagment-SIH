import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FieldReportsMap } from '../components/FieldReportsMap';
import { FieldReportModal } from '../components/FieldReportModal';
import type { FieldReport } from '../types';
import {
  MapPin,
  Plus,
  Camera,
  Video,
  Check,
  Flame
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
      'Evidence Verified',
      `Field report #${reportId} verified by District Authority desk. Model ground truth updated.`,
      'success'
    );
  };

  const handleEscalate = async (reportId: string) => {
    await updateReportStatus(reportId, 'ESCALATED');
    addToast(
      'Report Escalated',
      `Field report #${reportId} escalated to State Emergency Operation Center (SEOC).`,
      'warning'
    );
  };

  const handleResolve = async (reportId: string) => {
    await updateReportStatus(reportId, 'RESOLVED');
    addToast(
      'Hazard Cleared / Resolved',
      `Field report #${reportId} marked resolved following road clearance and gabion inspection.`,
      'info'
    );
  };

  return (
    <div className="space-y-5">
      {/* Title & Top Action Button */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <MapPin className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Field & Ground Verification
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              HUMAN-IN-THE-LOOP
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empower field officers and road crews to log geo-tagged ground evidence and ground-truth AI predictions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Field Report</span>
          </button>
        </div>
      </div>

      {/* Field Reports Map */}
      <FieldReportsMap
        reports={fieldReports}
        selectedReportId={selectedReport?.id}
        onSelectReport={(r) => setSelectedReport(r)}
        onVerifyReport={handleVerify}
        height="400px"
      />

      {/* Filter and Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B1728] p-3 rounded-xl border border-[#1E2E44]">
        <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
          <span>Logged Ground Reports ({filteredReports.length})</span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          {['ALL', 'UNDER VERIFICATION', 'VERIFIED', 'ESCALATED', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterType(status)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                filterType === status
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-xl border transition-all ${
              report.status === 'UNDER VERIFICATION'
                ? 'bg-[#101D2E] border-amber-500/40'
                : report.status === 'ESCALATED'
                ? 'bg-[#101D2E] border-red-500/40'
                : 'bg-[#101D2E] border-[#1E2E44]'
            }`}
          >
            <div className="flex items-start justify-between pb-2.5 border-b border-[#1E2E44]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                  FIELD REPORT #{report.id}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                  {report.locationName}
                </h3>
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
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
                  <span className="text-slate-500 block">Reported By:</span>
                  <span className="text-slate-200">{report.reportedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Time:</span>
                  <span className="text-slate-200">{report.time} ({report.date})</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#07111F] border border-[#1E2E44] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="font-semibold text-slate-300">
                    Observation: <span className="text-cyan-400">{report.observationType}</span>
                  </span>
                  <span className="font-mono text-emerald-400">
                    GPS: Available (±{report.gps.accuracyMeters}m)
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {report.description}
                </p>
              </div>

              {/* Evidence Counters & GPS tag */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{report.evidence.photos} photos</span>
                  </span>
                  <span className="flex items-center gap-1 text-violet-300">
                    <Video className="w-3.5 h-3.5" />
                    <span>{report.evidence.videos} video</span>
                  </span>
                </div>

                <span>
                  {report.gps.lat.toFixed(4)}°N, {report.gps.lng.toFixed(4)}°E
                </span>
              </div>
            </div>

            {/* Action Buttons: Verify, Escalate, Resolve */}
            <div className="pt-3 border-t border-[#1E2E44] flex items-center justify-end gap-2">
              {report.status !== 'VERIFIED' && (
                <button
                  onClick={() => handleVerify(report.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              )}

              {report.status !== 'ESCALATED' && (
                <button
                  onClick={() => handleEscalate(report.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition-colors flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Escalate</span>
                </button>
              )}

              {report.status !== 'RESOLVED' && (
                <button
                  onClick={() => handleResolve(report.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Field Report Modal */}
      <FieldReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
