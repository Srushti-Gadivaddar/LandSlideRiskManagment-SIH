import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { RiskMap } from '../components/RiskMap';
import { CurrentConditionsPanel } from '../components/CurrentConditionsPanel';
import {
  AlertTriangle,
  Flame,
  Bell,
  ClipboardList,
  Sliders
} from 'lucide-react';
import type { RiskZone } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { riskZones } = useApp();
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);

  // Focus primary zone on East Khasi Hills as per specification
  const primaryZone = selectedZone || riskZones.find((z) => z.id === 'east-khasi-hills') || riskZones[0];
  const priorityZones = riskZones.slice(0, 4);

  return (
    <div className="space-y-5">
      {/* Top Banner: Environment Notice & Rapid Quick-Actions */}
      <div className="bg-[#0B1728] border border-[#1E2E44] rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <div className="text-xs">
            <span className="font-bold text-slate-100 uppercase tracking-wider">
              High Operational Alert Status:
            </span>
            <span className="text-slate-300 ml-1.5">
              Persistent monsoon front triggered elevated slope instability across East Khasi & Barak river corridors.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-[#101D2E] text-slate-400 font-mono border border-[#1E2E44]">
            DEMO DATA • Prototype Environment
          </span>
          <button
            onClick={() => navigate('/simulator')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch What-If Simulator</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="High Risk Zones"
          value="18"
          sublabel="11 hill quadrants active"
          trend="↑ +3 today"
          icon={AlertTriangle}
          variant="warning"
          badge="NER REGION"
          onClick={() => navigate('/alerts')}
        />
        <MetricCard
          title="Critical Zones"
          value="6"
          sublabel="Immediate surveillance"
          trend="Severe risk > 75"
          icon={Flame}
          variant="danger"
          badge="IMMEDIATE"
          onClick={() => navigate('/location/east-khasi-hills')}
        />
        <MetricCard
          title="Active Alerts"
          value="7"
          sublabel="4 critical advisories"
          trend="Live telemetry queue"
          icon={Bell}
          variant="info"
          badge="DISPATCHED"
          onClick={() => navigate('/alerts')}
        />
        <MetricCard
          title="Field Reports"
          value="24"
          sublabel="5 logged past 24 hrs"
          trend="GPS Geotagged"
          icon={ClipboardList}
          variant="default"
          badge="GROUND TRUTH"
          onClick={() => navigate('/field-reports')}
        />
      </div>

      {/* Main Grid: GIS Risk Map (Dominant) + Right Side Current Conditions Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Dominant GIS Map: 8 Cols */}
        <div className="xl:col-span-8 space-y-3">
          <RiskMap
            zones={riskZones}
            selectedZoneId={primaryZone?.id}
            onSelectZone={(zone) => setSelectedZone(zone)}
            height="580px"
          />

          {/* Quick Context Strip beneath map */}
          <div className="p-3 bg-[#0B1728] border border-[#1E2E44] rounded-xl flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Multi-Layer GIS: Geological Survey of India (GSI) 1:50k slope susceptibility overlaid with IMD radar.</span>
            </div>
            <span className="font-mono text-cyan-400">
              Selected: {primaryZone?.name || 'East Khasi Hills'} ({primaryZone?.riskScore || 82}/100)
            </span>
          </div>
        </div>

        {/* Right Side Panel: 4 Cols */}
        <div className="xl:col-span-4">
          {primaryZone && (
            <CurrentConditionsPanel
              primaryZone={primaryZone}
              priorityZones={priorityZones}
            />
          )}
        </div>
      </div>
    </div>
  );
};
