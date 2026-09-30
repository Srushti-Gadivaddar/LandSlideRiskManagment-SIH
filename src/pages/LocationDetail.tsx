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
  ClipboardCheck,
  Sliders,
  Info
} from 'lucide-react';

export const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [zone, setZone] = useState<RiskZone | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchZone = async () => {
      setLoading(true);
      const data = await api.getLocationDetails(id || 'east-khasi-hills');
      setZone(data);
      setLoading(false);
    };
    fetchZone();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-[#14B8A6] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading Location Intelligence telemetry...</p>
        </div>
      </div>
    );
  }

  if (!zone) {
    return (
      <div className="p-8 text-center bg-[#0B1728] rounded-lg border border-[#1E2E44]">
        <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-slate-200">Location sector not found</h3>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-3 px-3.5 py-1.5 rounded bg-[#0F766E] text-white text-xs font-medium cursor-pointer"
        >
          Return to Command Center
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2E44]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-1.5 rounded bg-[#0B1728] hover:bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44] transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            aria-label="Back to Command Center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider text-[#2DD4BF] uppercase font-semibold">
                Location Intelligence
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{zone.district}, {zone.state}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              {zone.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/simulator')}
            className="px-3 py-1.5 rounded bg-[#0B1728] hover:bg-[#101D2E] text-slate-200 border border-[#1E2E44] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Run What-If</span>
          </button>

          <button
            onClick={() => navigate('/field-reports')}
            className="px-3 py-1.5 rounded bg-[#0B1728] hover:bg-[#101D2E] text-slate-200 border border-[#1E2E44] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Verify Location</span>
          </button>

          <button
            onClick={() => navigate('/response')}
            className="px-3.5 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Route className="w-3.5 h-3.5" />
            <span>View Response Plan</span>
          </button>
        </div>
      </div>

      {/* Main Risk Score Card & Environmental Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Risk Card: 5 cols */}
        <div className="lg:col-span-5 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Risk Score
            </span>
            <RiskBadge level={zone.riskLevel} score={zone.riskScore} size="md" />
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-extrabold font-mono tracking-tight text-red-500">
              {zone.riskScore}
            </span>
            <span className="text-xl font-mono text-slate-400">/ 100</span>
            <span className="ml-auto text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40">
              {zone.riskLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2.5 border-y border-[#1E2E44] text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">Trend</span>
              <span className="text-sm font-bold text-red-400 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {zone.trend}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-slate-200 mt-0.5 block">
                {zone.confidence}%
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {zone.description}
          </p>

          {/* Prototype / Simulated Risk Disclaimer */}
          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
            <strong>Prototype / Simulated Risk:</strong> Computed using baseline heuristic weighting. Not a validated operational prediction.
          </div>
        </div>

        {/* Environmental Conditions: 7 cols */}
        <div className="lg:col-span-7 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Environmental Conditions
            </h2>
            <span className="text-[10px] font-mono text-slate-400">
              Sensors: {zone.activeSensors} Online
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {/* Rainfall */}
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px] mb-1">
                <CloudRain className="w-3.5 h-3.5 text-[#14B8A6]" />
                Rainfall
              </span>
              <span className="text-lg font-mono font-bold text-slate-100 block">
                {zone.rainfall24h} mm / 24h
              </span>
              <span className="text-[10px] text-red-400 font-mono">
                ↑ {zone.rainfallChangePercent}% above threshold
              </span>
            </div>

            {/* Soil Moisture */}
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px] mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                Soil Moisture
              </span>
              <span className="text-lg font-mono font-bold text-slate-100 block">
                {zone.soilMoisture}%
              </span>
              <span className="text-[10px] text-blue-400 font-mono">
                Near Saturation
              </span>
            </div>

            {/* Slope */}
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px] mb-1">
                <Mountain className="w-4 h-4 text-amber-400" />
                Slope
              </span>
              <span className="text-lg font-mono font-bold text-slate-100 block">
                {zone.slope}°
              </span>
              <span className="text-[10px] text-amber-400 font-mono">
                Steep Escarpment
              </span>
            </div>

            {/* Recent Rainfall Trend */}
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px] mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                Rainfall Trend
              </span>
              <span className="text-base font-mono font-bold text-red-400 block">
                Increasing
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Persistent Front
              </span>
            </div>

            {/* Historical Events Nearby */}
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44] sm:col-span-2">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px] mb-1">
                <History className="w-3.5 h-3.5 text-slate-400" />
                Historical Landslide Events Nearby
              </span>
              <span className="text-base font-mono font-bold text-slate-100 block">
                {zone.historicalEventsCount} Recorded Incidents
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                GSI National Landslide Susceptibility Inventory
              </span>
            </div>
          </div>

          {/* System Recommendation */}
          <div className="p-3.5 rounded bg-red-950/20 border border-red-500/30 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-red-400 uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-4 h-4" />
              <span>System Recommendation</span>
            </div>
            <p className="text-slate-200 font-medium leading-relaxed">
              "Increase monitoring and initiate field verification."
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Escalate polling rate of slope telemetry to 15-minute cycles, dispatch ground verification patrol to NH-106 mileposts, and stage alternative detour route signage via SH-4.
            </p>
          </div>
        </div>
      </div>

      {/* Why is Risk Increasing? Horizontal Contribution Visualization */}
      <ContributionChart factors={zone.contributingFactors} />

      {/* Satellite / Terrain View (Two Panels: Previous vs Current Observation) */}
      <SatelliteComparison locationName={zone.name} />

      {/* Action Footer */}
      <div className="p-4 bg-[#0B1728] border border-[#1E2E44] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-white">Recommended Action:</span> Dispatch ground verification unit to confirm slope cracks along the highway corridor.
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/field-reports')}
            className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            Verify Location
          </button>

          <button
            onClick={() => navigate('/response')}
            className="px-4 py-2 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            View Response Plan
          </button>
        </div>
      </div>
    </div>
  );
};
