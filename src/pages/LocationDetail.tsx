import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { RiskZone } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { ContributionChart } from '../components/ContributionChart';
import { SatelliteComparison } from '../components/SatelliteComparison';
import {
  ArrowLeft,
  CloudRain,
  Droplets,
  Mountain,
  History,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Route,
  Sliders
} from 'lucide-react';

export const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [zone, setZone] = useState<RiskZone | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchZone = async () => {
      setLoading(true);
      const data = await api.getRiskDetails(id || 'east-khasi-hills');
      setZone(data);
      setLoading(false);
    };
    fetchZone();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading Location Intelligence telemetry...</p>
        </div>
      </div>
    );
  }

  if (!zone) {
    return (
      <div className="p-8 text-center bg-[#101D2E] rounded-xl border border-[#1E2E44]">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-200">Location sector not found</h3>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 rounded bg-cyan-600 text-white text-xs font-semibold"
        >
          Return to Command Center
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1E2E44]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg bg-[#101D2E] hover:bg-[#16273E] text-slate-300 hover:text-white border border-[#1E2E44] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Back to Command Center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                LOCATION INTELLIGENCE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {zone.state}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              {zone.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/simulator')}
            className="px-3 py-1.5 rounded-lg bg-[#101D2E] hover:bg-[#16273E] text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate What-If</span>
          </button>

          <button
            onClick={() => navigate('/response')}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 flex items-center gap-1.5 transition-all"
          >
            <Route className="w-3.5 h-3.5" />
            <span>View Response Plan</span>
          </button>
        </div>
      </div>

      {/* Main Risk Card & Summary Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Current Risk Hero Card: 5 Cols */}
        <div className="lg:col-span-5 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Current Risk Assessment
              </span>
              <RiskBadge level={zone.riskLevel} score={zone.riskScore} size="lg" />
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-red-400">
                {zone.riskScore}
              </span>
              <span className="text-xl font-mono text-slate-400">/ 100</span>
              <span className="ml-auto text-sm font-extrabold text-red-400 uppercase tracking-widest bg-red-950/60 px-2.5 py-1 rounded border border-red-600">
                {zone.riskLevel}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 py-3 border-y border-[#1E2E44]/70 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Model Confidence</span>
                <span className="text-sm font-mono font-bold text-cyan-300">
                  {zone.confidence}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Risk Trend</span>
                <span className="text-sm font-mono font-bold text-red-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {zone.trend}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {zone.description}
            </p>
          </div>

          {/* Prototype / Simulated Risk Disclaimer Banner */}
          <div className="mt-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
            <strong>Demonstration / Simulated Risk:</strong> Computed using regional prototype baseline weighting. Calibrated against historical GSI slope hazard records.
          </div>
        </div>

        {/* Current Conditions 4 KPIs: 7 Cols */}
        <div className="lg:col-span-7 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Current Conditions & Geo-Physical Factors
            </h2>
            <span className="text-[10px] font-mono text-cyan-400">
              Sensor Feeds: {zone.activeSensors} Online
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {/* Rainfall */}
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] text-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
                <CloudRain className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 block">Rainfall</span>
              <span className="text-lg font-mono font-bold text-slate-100">
                {zone.rainfall24h} mm
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">/ 24h</span>
            </div>

            {/* Soil Moisture */}
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] text-center">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 block">Soil Moisture</span>
              <span className="text-lg font-mono font-bold text-slate-100">
                {zone.soilMoisture}%
              </span>
              <span className="text-[10px] text-blue-400 block font-mono">Saturation</span>
            </div>

            {/* Slope */}
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] text-center">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Mountain className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 block">Slope</span>
              <span className="text-lg font-mono font-bold text-slate-100">
                {zone.slope}°
              </span>
              <span className="text-[10px] text-amber-400 block font-mono">Steep Cut</span>
            </div>

            {/* Historical events nearby */}
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] text-center">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mx-auto mb-2">
                <History className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 block">Past Slides</span>
              <span className="text-lg font-mono font-bold text-slate-100">
                {zone.historicalEventsCount}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">Nearby Events</span>
            </div>
          </div>

          {/* System Recommendation Box */}
          <div className="mt-4 p-4 rounded-lg bg-red-950/20 border border-red-500/40">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
                System Recommendation (Human-In-The-Loop)
              </span>
            </div>
            <ul className="text-xs text-slate-200 space-y-1 list-disc list-inside font-medium">
              <li>Increase telemetry monitoring polling interval from 60m to 15m.</li>
              <li>Verify ground conditions: Deploy SDRF field reconnaissance unit to inspect road cut mileposts.</li>
              <li>Prepare high-priority early warning workflow and activate traffic detour routing via SH-4.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* WHY IS THE RISK HIGH? Feature Attribution */}
      <ContributionChart factors={zone.contributingFactors} />

      {/* SATELLITE / TERRAIN CHANGE Side-by-Side Comparison */}
      <SatelliteComparison locationName={zone.name} />

      {/* Footer Call to Action: View Response Plan */}
      <div className="p-4 bg-[#0B1728] border border-[#1E2E44] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-white">Next Operational Action:</span> Review prioritized evacuation corridors and emergency road detour staging for {zone.name}.
        </div>

        <button
          onClick={() => navigate('/response')}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Route className="w-4 h-4" />
          <span>View Response Plan</span>
        </button>
      </div>
    </div>
  );
};
