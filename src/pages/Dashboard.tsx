import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { RiskMap } from '../components/RiskMap';
import { CurrentConditionsPanel } from '../components/CurrentConditionsPanel';
import { RiskBadge } from '../components/RiskBadge';
import {
  AlertTriangle,
  Flame,
  Bell,
  Clock,
  ArrowRight,
  MapPin,
  ExternalLink
} from 'lucide-react';
import type { RiskZone } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { riskZones, alerts, fieldReports } = useApp();
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);

  // Primary focus sector (default East Khasi Hills)
  const primaryZone = selectedZone || riskZones.find((z) => z.id === 'east-khasi-hills') || riskZones[0];

  // Priority locations table data with explicit triggers and operational statuses
  const priorityLocations = [
    {
      id: 'east-khasi-hills',
      name: 'East Khasi Hills',
      state: 'Meghalaya',
      riskScore: 82,
      riskLevel: 'CRITICAL' as const,
      mainTrigger: 'Heavy rainfall (186mm) + high soil moisture (82%)',
      responseStatus: 'Verification required',
      statusColor: 'text-red-400 bg-red-950/60 border-red-500/40'
    },
    {
      id: 'churachandpur',
      name: 'Churachandpur',
      state: 'Manipur',
      riskScore: 71,
      riskLevel: 'HIGH' as const,
      mainTrigger: 'Continuous rain trend (+22%) + historical slide scars',
      responseStatus: 'Inspection dispatched',
      statusColor: 'text-amber-400 bg-amber-950/60 border-amber-500/40'
    },
    {
      id: 'aizawl-outskirts',
      name: 'Aizawl Outskirts',
      state: 'Mizoram',
      riskScore: 68,
      riskLevel: 'HIGH' as const,
      mainTrigger: 'Steep urban flanking slope (35°) + pore saturation',
      responseStatus: 'Advisory issued',
      statusColor: 'text-orange-400 bg-orange-950/60 border-orange-500/40'
    },
    {
      id: 'tawang-corridor',
      name: 'Tawang Corridor',
      state: 'Arunachal Pradesh',
      riskScore: 48,
      riskLevel: 'MODERATE' as const,
      mainTrigger: 'High-altitude freeze-thaw runoff + seasonal rain',
      responseStatus: 'Highway patrol active',
      statusColor: 'text-slate-300 bg-slate-800 border-slate-700'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Top 4 Operational Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          title="Critical Zones"
          value="6"
          sublabel="Immediate surveillance required"
          trend="Score > 75"
          icon={Flame}
          variant="danger"
          badge="CRITICAL"
          onClick={() => navigate('/location/east-khasi-hills')}
        />
        <MetricCard
          title="High-Risk Zones"
          value="18"
          sublabel="Active monitoring sectors"
          trend="Score 60–74"
          icon={AlertTriangle}
          variant="warning"
          badge="ELEVATED"
          onClick={() => navigate('/alerts')}
        />
        <MetricCard
          title="Active Alerts"
          value="7"
          sublabel="4 priority warnings queued"
          trend="CAP Channel"
          icon={Bell}
          variant="info"
          badge="DISPATCHED"
          onClick={() => navigate('/alerts')}
        />
        <MetricCard
          title="Pending Verification"
          value="1"
          sublabel="Field evidence awaiting review"
          trend="Report #FR-1042"
          icon={Clock}
          variant="default"
          badge="GROUND TRUTH"
          onClick={() => navigate('/field-reports')}
        />
      </div>

      {/* Main Layout: Left/Center Large GIS Map + Right Current Situation Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left / Center: Large GIS Risk Map (8 Cols) */}
        <div className="xl:col-span-8 space-y-3">
          <RiskMap
            zones={riskZones}
            fieldReports={fieldReports}
            selectedZoneId={primaryZone?.id}
            onSelectZone={(zone) => setSelectedZone(zone)}
            height="540px"
          />

          <div className="p-2.5 bg-[#0B1728] border border-[#1E2E44] rounded flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
              Multi-Source GIS: OpenStreetMap base + Geological Survey of India (GSI) slope susceptibility layers.
            </span>
            <span className="font-mono text-[#2DD4BF] text-[11px]">
              Active: {primaryZone?.name} ({primaryZone?.riskScore}/100)
            </span>
          </div>
        </div>

        {/* Right: Current Situation Panel (4 Cols) */}
        <div className="xl:col-span-4">
          {primaryZone && (
            <CurrentConditionsPanel
              primaryZone={primaryZone}
              alerts={alerts}
              fieldReports={fieldReports}
            />
          )}
        </div>
      </div>

      {/* Bottom: Priority Locations Table */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Priority Locations
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Actionable summary of prioritized regional landslide corridors
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Top Priority Order
          </span>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E2E44] text-[10px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
                <th className="py-2.5 px-3">Main Trigger</th>
                <th className="py-2.5 px-3">Response Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E44]/70">
              {priorityLocations.map((loc) => (
                <tr
                  key={loc.id}
                  onClick={() => navigate(`/location/${loc.id}`)}
                  className="hover:bg-[#101D2E]/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-200 group-hover:text-[#2DD4BF] transition-colors block">
                      {loc.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{loc.state}</span>
                  </td>
                  <td className="py-3 px-3">
                    <RiskBadge level={loc.riskLevel} score={loc.riskScore} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium">
                    {loc.mainTrigger}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${loc.statusColor}`}>
                      {loc.responseStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/location/${loc.id}`);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2DD4BF] hover:underline cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
