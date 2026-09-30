import React, { useState } from 'react';
import { ResponseMap } from '../components/ResponseMap';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Route,
  CheckCircle2,
  Play,
  Info
} from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';

export const ResponsePlanning: React.FC = () => {
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
      const plan = await api.generateResponsePlan('east-khasi-hills');
      setResponsePlan(plan);
      addToast(
        'Response Plan Generated',
        'Optimized detour route & priority SDRF evacuation staging computed.',
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
      {/* Title & Header */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Route className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Response & Route Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              TACTICAL ROUTING
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prioritize multi-hazard field deployment, safe evacuation detours, and road network status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Computing Logistics...' : 'Generate Response Plan'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: GIS Response Map (Dominant) + Right Side Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Large GIS Response Map: 8 Cols */}
        <div className="xl:col-span-8 space-y-3">
          <ResponseMap height="560px" isPlanGenerated={!!responsePlan} />

          {/* Prototype Route Recommendation Notice */}
          <div className="p-3 bg-[#0B1728] border border-[#1E2E44] rounded-xl flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Demonstration Route Status:</strong> Simulated corridor clearance based on topographic slope isolation. Field patrol verification required prior to formal public convoy routing.
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hidden sm:inline">
              PROTOTYPE
            </span>
          </div>
        </div>

        {/* Right Panel: Affected Area & Response Priorities: 4 Cols */}
        <div className="xl:col-span-4 space-y-4">
          {/* Affected Area Stats */}
          <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-[#1E2E44]">
              Affected Area Summary
            </h2>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-slate-100">3</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Villages</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-red-400">2</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Road Cuts</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
                <span className="text-xl font-mono font-bold text-purple-400">1</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Substation</span>
              </div>
            </div>
          </div>

          {/* Response Priority List */}
          <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2E44]">
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Response Priority Ranking
              </h2>
              <span className="text-[10px] font-mono text-cyan-400">
                Composite Severity
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Item 1 */}
              <div className="p-3 rounded-lg bg-[#07111F] border border-red-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="font-bold text-slate-100">
                      East Khasi village cluster
                    </span>
                  </div>
                  <RiskBadge level="CRITICAL" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-normal">
                  Mawkdok & Wahkhen (Est. Pop: 1,420). Priority evacuation shelter staging.
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-lg bg-[#07111F] border border-orange-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="font-bold text-slate-100">
                      NH corridor segment
                    </span>
                  </div>
                  <RiskBadge level="HIGH" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-normal">
                  Km 38 - 46 escarpment. Enforce traffic diversion to alternative SH-4 bypass.
                </p>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="font-bold text-slate-100">
                      Lower settlement
                    </span>
                  </div>
                  <RiskBadge level="MODERATE" size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-normal">
                  Umiew basin terrace. Monitor silt runout buffer.
                </p>
              </div>
            </div>

            {/* Response Plan Generation Output */}
            {responsePlan && (
              <div className="mt-3 p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/40 space-y-2 text-xs animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RESPONSE PLAN GENERATED</span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-400">Target Priority: </span>
                    <strong className="text-white">{responsePlan.priorityTarget}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Suggested Action: </span>
                    <span className="text-slate-200">{responsePlan.suggestedAction}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Route Status: </span>
                    <span className="text-emerald-400 font-semibold">{responsePlan.routeStatus}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-slate-400">
                  Plan generated at: {responsePlan.generatedAt} • VHF Broadcast Ready
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
