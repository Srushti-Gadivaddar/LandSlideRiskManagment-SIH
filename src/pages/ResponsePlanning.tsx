import React, { useState } from 'react';
import { ResponseMap } from '../components/ResponseMap';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Route,
  CheckCircle2,
  Play,
  Info,
  ArrowRight,
  ShieldAlert,
  Send,
  AlertTriangle
} from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';
import { useNavigate } from 'react-router-dom';

export const ResponsePlanning: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [responsePlan, setResponsePlan] = useState<{
    generatedAt: string;
    zoneName: string;
    priorityTarget: string;
    suggestedAction: string;
    routeStatus: string;
    evacuationReadiness: string;
    logistics: { item: string; status: string; ETA: string }[];
  } | null>(null);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await api.getResponsePlan('east-khasi-hills');
      setResponsePlan(plan);
      addToast(
        'Response Plan Generated',
        'Tactical detour routes and evacuation priority staging computed.',
        'success'
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Route className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Response Planning
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prediction must lead to action: Coordinate evacuation corridors, road detours, and resource prioritization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="px-4 py-2 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Computing Logistics...' : 'Generate Response Plan'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Tactical Map (8 Cols) + Right Panel (4 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Large Tactical Map: 8 Cols */}
        <div className="xl:col-span-8 space-y-3">
          <ResponseMap height="540px" isPlanGenerated={!!responsePlan} />

          {/* Prototype Route Disclaimer */}
          <div className="p-3 bg-[#0B1728] border border-[#1E2E44] rounded text-xs text-amber-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Prototype Route Recommendation:</strong> Routing algorithm balances topographical stability and road slope safety. Final evacuation decisions remain with authorized authorities.
            </span>
          </div>
        </div>

        {/* Right Panel: Affected Area + Priorities + Route Intelligence (4 Cols) */}
        <div className="xl:col-span-4 space-y-4">
          {/* 1. AFFECTED AREA */}
          <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-[#1E2E44]">
              Affected Area
            </h2>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-slate-100">3</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Villages</span>
              </div>
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-red-400">2</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Road Segments</span>
              </div>
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-purple-400">1</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Infra Zone</span>
              </div>
            </div>
          </div>

          {/* 2. RESPONSE PRIORITY */}
          <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm space-y-2.5">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-[#1E2E44]">
              Response Priority
            </h2>

            <div className="space-y-2 text-xs">
              {/* 1. Critical village cluster */}
              <div className="p-2.5 rounded bg-[#07111F] border border-red-500/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    1. Critical village cluster
                  </span>
                  <RiskBadge level="CRITICAL" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Mawkdok & Wahkhen (Est. Pop: 1,420). Priority evacuation shelter staging.
                </p>
              </div>

              {/* 2. Road corridor */}
              <div className="p-2.5 rounded bg-[#07111F] border border-orange-500/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    2. Road corridor
                  </span>
                  <RiskBadge level="HIGH" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  NH-106 Km 38-46 escarpment. Enforce traffic diversion to alternative SH-4 bypass.
                </p>
              </div>

              {/* 3. Infrastructure zone */}
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    3. Infrastructure zone
                  </span>
                  <RiskBadge level="HIGH" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Regional 33kV Sub-station & Telecom Repeater Tower 04. Foundation protection.
                </p>
              </div>
            </div>
          </div>

          {/* 3. ROUTE INTELLIGENCE */}
          <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm space-y-2.5">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-[#1E2E44]">
              Route Intelligence
            </h2>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-[#07111F] border border-red-500/30 flex items-center justify-between">
                <span className="text-slate-400">Current route (NH-106):</span>
                <span className="text-red-400 font-bold">Potentially Unsafe</span>
              </div>

              <div className="p-2 rounded bg-[#07111F] border border-emerald-500/30 flex items-center justify-between">
                <span className="text-slate-400">Alternative route (SH-4):</span>
                <span className="text-emerald-400 font-bold">Available</span>
              </div>
            </div>
          </div>

          {/* RESPONSE PLAN RESULT DISPLAY */}
          {responsePlan && (
            <div className="bg-[#0B1728] rounded-lg border border-emerald-500/40 p-4 shadow-sm space-y-2.5 text-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Response Plan Generated</span>
              </div>

              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>
                  <span className="text-slate-400">Priority: </span>
                  <strong className="text-white">{responsePlan.priorityTarget}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Suggested Action: </span>
                  <span>{responsePlan.suggestedAction}</span>
                </div>
                <div>
                  <span className="text-slate-400">Route Status: </span>
                  <span className="text-emerald-400 font-semibold">{responsePlan.routeStatus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2E44] flex items-center justify-between">
                <button
                  onClick={() => navigate('/community-alerts')}
                  className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <span>Broadcast Warnings to Community & Teams</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
