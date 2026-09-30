import React, { useState } from 'react';
import { api } from '../services/api';
import type { SimulationResult } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  CloudRain,
  Droplets,
  Mountain,
  Lock,
  Play,
  RotateCcw,
  Route,
  ShieldAlert,
  Info,
  ArrowRight,
  MapPin
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const Simulator: React.FC = () => {
  const navigate = useNavigate();
  const { addToast, riskZones } = useApp();

  // Location selector (default East Khasi Hills)
  const [selectedZoneId, setSelectedZoneId] = useState('east-khasi-hills');
  const activeZone = riskZones.find((z) => z.id === selectedZoneId) || riskZones[0];

  // Sliders state
  const [rainfall, setRainfall] = useState<number>(186);
  const [soilMoisture, setSoilMoisture] = useState<number>(82);
  const slope = activeZone ? activeZone.slope : 38;

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult>({
    currentRisk: 82,
    simulatedRisk: 91,
    riskChange: 9,
    simulatedLevel: 'CRITICAL',
    additionalAffectedZones: 3,
    potentiallyAffectedRoadSegments: 2,
    recommendedAction: 'Prepare high-priority warning and immediate field verification. Pre-position heavy machinery along alternative bypass SH-4.',
    breakdown: [
      { factor: 'Rainfall (24h)', currentValue: 186, simulatedValue: 186, unit: 'mm' },
      { factor: 'Soil Moisture', currentValue: 82, simulatedValue: 82, unit: '%' },
      { factor: 'Slope (Locked)', currentValue: 38, simulatedValue: 38, unit: '°' }
    ]
  });

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await api.runRiskSimulation(rainfall, soilMoisture, selectedZoneId);
      setResult(res);
      addToast(
        'Simulation Complete',
        `Evaluated simulated scenario: Risk calculated at ${res.simulatedRisk}/100 (${res.simulatedLevel}).`,
        res.simulatedRisk >= 75 ? 'warning' : 'info'
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    if (activeZone) {
      setRainfall(activeZone.rainfall24h);
      setSoilMoisture(activeZone.soilMoisture);
    } else {
      setRainfall(186);
      setSoilMoisture(82);
    }
  };

  // Recharts comparison data
  const comparisonData = [
    {
      name: 'Baseline Telemetry',
      Risk: result.currentRisk,
      fill: '#06B6D4'
    },
    {
      name: 'Simulated Stress Test',
      Risk: result.simulatedRisk,
      fill: result.simulatedRisk >= 75 ? '#EF4444' : result.simulatedRisk >= 60 ? '#F97316' : '#F59E0B'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Title & Header */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Sliders className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Risk Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-700">
              WHAT-IF ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore how changing environmental conditions may affect the simulated risk score.
          </p>
        </div>

        {/* Sector Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400">Target Sector:</label>
          <select
            value={selectedZoneId}
            onChange={(e) => {
              setSelectedZoneId(e.target.value);
              const z = riskZones.find((rz) => rz.id === e.target.value);
              if (z) {
                setRainfall(z.rainfall24h);
                setSoilMoisture(z.soilMoisture);
              }
            }}
            className="bg-[#101D2E] border border-[#1E2E44] text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold"
          >
            {riskZones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} ({z.riskLevel} - {z.riskScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Control Sliders Panel (5 cols) + Simulation Output Matrix (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* WHAT-IF RISK SIMULATOR CONTROLS: 5 Cols */}
        <div className="lg:col-span-5 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <div>
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                What-If Risk Simulator
              </h2>
              <p className="text-[10px] text-slate-400">
                Stress-test micro-watershed rainfall thresholds
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
              title="Reset to current baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider 1: Rainfall */}
          <div className="space-y-2 p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Rainfall (24h)
              </span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {rainfall} mm / 24h
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={300}
              step={2}
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>50 mm (Light)</span>
              <span>186 mm (Current)</span>
              <span>300 mm (Extreme Downpour)</span>
            </div>
          </div>

          {/* Slider 2: Soil Moisture */}
          <div className="space-y-2 p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                Soil Moisture Saturation
              </span>
              <span className="font-mono font-bold text-blue-400 text-sm">
                {soilMoisture}%
              </span>
            </div>

            <input
              type="range"
              min={20}
              max={100}
              step={1}
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>20% (Dry)</span>
              <span>82% (Baseline)</span>
              <span>100% (Fully Saturated)</span>
            </div>
          </div>

          {/* Locked Slope Indicator */}
          <div className="p-3 rounded-lg bg-[#07111F]/80 border border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-300 font-semibold block">Terrain Slope Angle</span>
                <span className="text-[10px] text-amber-400/90 font-mono">
                  {slope}° • LOCKED FOR SELECTED LOCATION
                </span>
              </div>
            </div>
            <div className="p-1 rounded bg-slate-800 text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {/* Run Simulation Action Button */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
          >
            <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Computing Stress Scenario...' : 'RUN SIMULATION'}</span>
          </button>

          {/* Prototype simulation disclaimer */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-[11px] text-amber-300">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Prototype simulation:</strong> Deterministic demonstration engine for what-if scenario exploration. Not a validated operational prediction.
            </span>
          </div>
        </div>

        {/* SIMULATED RESULTS MATRIX: 7 Cols */}
        <div className="lg:col-span-7 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Simulation Impact Assessment
            </h2>
            <RiskBadge level={result.simulatedLevel} score={result.simulatedRisk} size="md" />
          </div>

          {/* 3 Metric Score Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Current Risk */}
            <div className="p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                Current Risk
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black font-mono text-slate-200">
                  {result.currentRisk}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 100</span>
              </div>
              <span className="text-[10px] text-slate-400">Baseline Telemetry</span>
            </div>

            {/* Simulated Risk */}
            <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/40">
              <span className="text-[10px] font-mono text-red-300 uppercase font-semibold block">
                Simulated Risk
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black font-mono text-red-400">
                  {result.simulatedRisk}
                </span>
                <span className="text-xs text-red-300/80 font-mono">/ 100</span>
              </div>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                {result.simulatedLevel}
              </span>
            </div>

            {/* Risk Change */}
            <div className="p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44]">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                Risk Delta
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className={`text-3xl font-black font-mono ${
                    result.riskChange >= 0 ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {result.riskChange >= 0 ? `+${result.riskChange}` : result.riskChange}
                </span>
                <span className="text-xs text-slate-400 font-mono">pts</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {result.riskChange >= 0 ? 'Elevation Factor' : 'Risk Dissipation'}
              </span>
            </div>
          </div>

          {/* Secondary Impact Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44] flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs block">Additional Affected Zones</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  +{result.additionalAffectedZones} Zones
                </span>
              </div>
              <span className="p-2 rounded bg-amber-500/10 text-amber-400">
                <MapPin className="w-5 h-5" />
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0B1728] border border-[#1E2E44] flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs block">Potentially Affected Roads</span>
                <span className="text-xl font-bold font-mono text-orange-400">
                  {result.potentiallyAffectedRoadSegments} Road Segments
                </span>
              </div>
              <span className="p-2 rounded bg-orange-500/10 text-orange-400">
                <Route className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Recharts Simple Bar Chart Comparison */}
          <div className="p-4 rounded-lg bg-[#07111F] border border-[#1E2E44]">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Risk Score Comparison (Baseline vs Simulated)
            </h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101D2E',
                      borderColor: '#1E2E44',
                      borderRadius: '8px',
                      color: '#E2E8F0',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="Risk" radius={[6, 6, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-lg bg-orange-950/20 border border-orange-500/30 space-y-1">
            <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              Recommended Action
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {result.recommendedAction}
            </p>
          </div>

          {/* Action Link to Early Warnings */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1E2E44]">
            <span className="text-xs text-slate-400">
              Trigger simulated early warning based on these conditions:
            </span>
            <button
              onClick={() => navigate('/alerts')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Early Warning Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
