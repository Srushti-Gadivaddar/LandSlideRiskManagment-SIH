import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiskZone } from '../types';
import { RiskBadge } from './RiskBadge';
import {
  CloudRain,
  Droplets,
  Mountain,
  Radio,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface CurrentConditionsPanelProps {
  primaryZone: RiskZone;
  priorityZones: RiskZone[];
}

export const CurrentConditionsPanel: React.FC<CurrentConditionsPanelProps> = ({
  primaryZone,
  priorityZones
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Current Conditions Card */}
      <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Current Conditions
              </h2>
              <p className="text-[10px] text-slate-400 font-mono">
                Primary Focus: {primaryZone.name}
              </p>
            </div>
          </div>
          <RiskBadge level={primaryZone.riskLevel} score={primaryZone.riskScore} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Rainfall */}
          <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44]/70">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <span>Rainfall (24h)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-slate-100">
                {primaryZone.rainfall24h} mm
              </span>
              <span className="text-[11px] font-bold text-red-400 font-mono">
                ↑ {primaryZone.rainfallChangePercent}%
              </span>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44]/70">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Soil Moisture</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-slate-100">
                {primaryZone.soilMoisture}%
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Saturated
              </span>
            </div>
          </div>

          {/* Average Slope */}
          <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44]/70">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Mountain className="w-4 h-4 text-amber-400" />
              <span>Average Slope</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-slate-100">
                {primaryZone.slope}°
              </span>
              <span className="text-[10px] text-orange-400 font-mono">
                Escarpment
              </span>
            </div>
          </div>

          {/* Active Sensors */}
          <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44]/70">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Active Sensors</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-slate-100">
                {primaryZone.activeSensors}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Risk Trend Banner */}
        <div className="mt-3 p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-slate-300">Risk Trend</span>
          </div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
            {primaryZone.trend}
          </span>
        </div>

        <button
          onClick={() => navigate(`/location/${primaryZone.id}`)}
          className="mt-3 w-full py-2 px-3 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-cyan-400"
        >
          <span>Open Full Analysis for {primaryZone.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* High Priority Locations List */}
      <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              High Priority Locations
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Ordered by composite vulnerability
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Top 4
          </span>
        </div>

        <div className="divide-y divide-[#1E2E44]/70 mt-1">
          {priorityZones.map((zone) => (
            <div
              key={zone.id}
              className="py-2.5 flex items-center justify-between hover:bg-[#16273E]/50 px-2 rounded-lg transition-colors group cursor-pointer"
              onClick={() => navigate(`/location/${zone.id}`)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {zone.name}
                  </h3>
                  <span className="text-[10px] text-slate-400">{zone.state}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5 font-mono">
                  <span>Rain: {zone.rainfall24h}mm</span>
                  <span>Slope: {zone.slope}°</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <RiskBadge level={zone.riskLevel} score={zone.riskScore} size="sm" showIcon={false} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/location/${zone.id}`);
                  }}
                  className="p-1 text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-700/50 transition-colors"
                  title="View Location Intelligence"
                  aria-label={`View details for ${zone.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
