import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RiskZone, AlertItem, FieldReport } from '../types';
import { RiskBadge } from './RiskBadge';
import {
  CloudRain,
  Droplets,
  Mountain,
  History,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  Clock,
  AlertOctagon,
  Bell
} from 'lucide-react';

interface CurrentConditionsPanelProps {
  primaryZone: RiskZone;
  alerts: AlertItem[];
  fieldReports: FieldReport[];
}

export const CurrentConditionsPanel: React.FC<CurrentConditionsPanelProps> = ({
  primaryZone,
  alerts,
  fieldReports
}) => {
  const navigate = useNavigate();

  const pendingVerificationCount = fieldReports.filter((r) => r.status === 'UNDER VERIFICATION').length;
  const warningsIssuedCount = alerts.filter((a) => a.status === 'ACTIVE').length;

  return (
    <div className="space-y-4">
      {/* 1. CURRENT CONDITIONS */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Current Conditions
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Sector: {primaryZone.name}
            </p>
          </div>
          <RiskBadge level={primaryZone.riskLevel} score={primaryZone.riskScore} size="sm" />
        </div>

        <div className="space-y-2 mt-3 text-xs">
          {/* Rainfall */}
          <div className="flex items-center justify-between p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-slate-400 flex items-center gap-2">
              <CloudRain className="w-3.5 h-3.5 text-[#14B8A6]" />
              Rainfall (24h)
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="font-semibold text-slate-200">{primaryZone.rainfall24h} mm</span>
              <span className="text-[10px] text-red-400 font-bold">↑ {primaryZone.rainfallChangePercent}%</span>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="flex items-center justify-between p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-slate-400 flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              Soil Moisture
            </span>
            <span className="font-mono font-semibold text-slate-200">{primaryZone.soilMoisture}%</span>
          </div>

          {/* Average Slope */}
          <div className="flex items-center justify-between p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-slate-400 flex items-center gap-2">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Average Slope
            </span>
            <span className="font-mono font-semibold text-slate-200">{primaryZone.slope}°</span>
          </div>

          {/* Historical Susceptibility */}
          <div className="flex items-center justify-between p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-slate-400 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-slate-400" />
              Historical Susceptibility
            </span>
            <span className="font-mono font-semibold text-slate-200">{primaryZone.historicalEventsCount} Events</span>
          </div>

          {/* Risk Trend */}
          <div className="flex items-center justify-between p-2 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-red-400" />
              Risk Trend
            </span>
            <span className="font-mono font-bold text-red-400 uppercase text-[11px]">{primaryZone.trend}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/location/${primaryZone.id}`)}
          className="mt-3 w-full py-1.5 px-3 rounded bg-[#0F766E]/20 hover:bg-[#0F766E]/30 border border-[#0D9488]/40 text-[#2DD4BF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Examine Risk Factors for {primaryZone.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. ACTIVE RESPONSE */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Active Response
          </h2>
          <span className="text-[10px] font-mono text-slate-400">
            Field Ops Desk
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block font-mono">Field Reports</span>
            <span className="text-base font-bold font-mono text-slate-200 mt-0.5 block">
              {fieldReports.length}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#07111F] border border-amber-500/30">
            <span className="text-[10px] text-amber-400 block font-mono">Pending Verification</span>
            <span className="text-base font-bold font-mono text-amber-400 mt-0.5 block">
              {pendingVerificationCount}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#07111F] border border-red-500/30">
            <span className="text-[10px] text-red-400 block font-mono">Road Blockages</span>
            <span className="text-base font-bold font-mono text-red-400 mt-0.5 block">
              1 (NH-106)
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block font-mono">Warnings Issued</span>
            <span className="text-base font-bold font-mono text-slate-200 mt-0.5 block">
              {warningsIssuedCount}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-[#1E2E44] flex items-center justify-between">
          <button
            onClick={() => navigate('/field-reports')}
            className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Verify Field Evidence</span>
          </button>
          <button
            onClick={() => navigate('/response')}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>Response Planning →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
