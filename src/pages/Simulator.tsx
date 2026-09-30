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
  History,
  Lock,
  Play,
  RotateCcw,
  Route,
  ShieldAlert,
  Info,
  MapPin,
  ArrowRight
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

  const [selectedZoneId, setSelectedZoneId] = useState('east-khasi-hills');
  const activeZone = riskZones.find((z) => z.id === selectedZoneId) || riskZones[0];

  // Sliders state
  const [rainfall, setRainfall] = useState<number>(240);
  const [soilMoisture, setSoilMoisture] = useState<number>(88);
  const slope = activeZone ? activeZone.slope : 38;
  const historicalEvents = activeZone ? activeZone.historicalEventsCount : 7;

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult>({
    currentRisk: 82,
    simulatedRisk: 91,
    riskChange: 9,
    simulatedLevel: 'CRITICAL',
    additionalAffectedZones: 3,
    potentiallyAffectedRoadSegments: 2,
    recommendedAction: 'Increase field verification and prepare warning workflow.',
    breakdown: [
      { factor: 'Rainfall (24h)', currentValue: 186, simulatedValue: 240, unit: 'mm' },
      { factor: 'Soil Moisture', currentValue: 82, simulatedValue: 88, unit: '%' },
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
        `Simulated scenario calculated: Risk increased to ${res.simulatedRisk}/100 (${res.simulatedLevel}).`,
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
    }
  };

  const chartData = [
    {
      name: 'Current Baseline',
      Score: result.currentRisk,
      fill: '#0D9488'
    },
    {
      name: 'Simulated Scenario',
      Score: result.simulatedRisk,
      fill: result.simulatedRisk >= 75 ? '#DC2626' : result.simulatedRisk >= 60 ? '#EA580C' : '#D97706'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Sliders className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Risk Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore how changing environmental conditions may influence simulated risk.
          </p>
        </div>

        {/* SELECT LOCATION Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-300">Select Location:</label>
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
            className="bg-[#0B1728] border border-[#1E2E44] text-slate-200 text-xs rounded px-3 py-1.5 focus:outline-none focus:border-[#0D9488] font-medium cursor-pointer"
          >
            {riskZones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} ({z.riskLevel} - {z.riskScore}/100)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Input Conditions Panel (5 Cols) + Simulation Results (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* INPUT CONDITIONS PANEL */}
        <div className="lg:col-span-5 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Input Conditions
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              title="Reset sliders to location baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider: Rainfall */}
          <div className="space-y-1.5 p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-[#14B8A6]" />
                Rainfall
              </span>
              <span className="font-mono font-bold text-[#2DD4BF]">
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
              className="w-full accent-[#0D9488] h-1.5 bg-slate-800 rounded cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>50 mm</span>
              <span>Baseline: {activeZone?.rainfall24h || 186} mm</span>
              <span>300 mm (Extreme)</span>
            </div>
          </div>

          {/* Slider: Soil Moisture */}
          <div className="space-y-1.5 p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                Soil Moisture
              </span>
              <span className="font-mono font-bold text-blue-400">
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
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>20%</span>
              <span>Baseline: {activeZone?.soilMoisture || 82}%</span>
              <span>100% (Saturation)</span>
            </div>
          </div>

          {/* Locked Parameter 1: Slope */}
          <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <span className="text-slate-300 font-medium block">Slope</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {slope}° • Locked for selected location
                </span>
              </div>
            </div>
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Locked Parameter 2: Historical Susceptibility */}
          <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-slate-400" />
              <div>
                <span className="text-slate-300 font-medium block">Historical Susceptibility</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {historicalEvents} Historical Events • Locked
                </span>
              </div>
            </div>
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* RUN SIMULATION Button */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 px-4 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs tracking-wider uppercase shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Stress Model...' : 'RUN SIMULATION'}</span>
          </button>

          {/* Prototype Simulation Notice */}
          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Prototype simulation:</strong> Deterministic stress testing. Not an operational forecast.
            </span>
          </div>
        </div>

        {/* RESULTS & SCENARIO IMPACT */}
        <div className="lg:col-span-7 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Simulation Results
            </h2>
            <RiskBadge level={result.simulatedLevel} score={result.simulatedRisk} size="md" />
          </div>

          {/* CURRENT vs SIMULATED vs CHANGE */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                CURRENT
              </span>
              <span className="text-3xl font-bold font-mono text-slate-200 mt-1 block">
                {result.currentRisk}
              </span>
              <span className="text-[10px] text-slate-400">Baseline Score</span>
            </div>

            <div className="p-3 rounded bg-red-950/20 border border-red-500/40">
              <span className="text-[10px] font-mono text-red-300 uppercase block">
                SIMULATED
              </span>
              <span className="text-3xl font-bold font-mono text-red-400 mt-1 block">
                {result.simulatedRisk}
              </span>
              <span className="text-[10px] text-red-400 uppercase font-semibold">
                {result.simulatedLevel}
              </span>
            </div>

            <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                CHANGE
              </span>
              <span className={`text-3xl font-bold font-mono mt-1 block ${result.riskChange >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {result.riskChange >= 0 ? `+${result.riskChange}` : result.riskChange}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Risk Points</span>
            </div>
          </div>

          {/* Before / After Bar Chart Visualization */}
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Before / After Comparison
            </span>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1728',
                      borderColor: '#1E2E44',
                      borderRadius: '6px',
                      color: '#F8FAFC',
                      fontSize: '11px'
                    }}
                  />
                  <Bar dataKey="Score" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SCENARIO IMPACT */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Scenario Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-[10px] text-slate-400 block">Potential Additional High-Risk Zones</span>
                <span className="text-lg font-bold font-mono text-amber-400 mt-0.5 block">
                  +{result.additionalAffectedZones}
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-[10px] text-slate-400 block">Potentially Affected Road Segments</span>
                <span className="text-lg font-bold font-mono text-orange-400 mt-0.5 block">
                  {result.potentiallyAffectedRoadSegments}
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-[10px] text-slate-400 block">Response Priority</span>
                <span className="text-lg font-bold font-mono text-red-400 mt-0.5 block">
                  High
                </span>
              </div>
            </div>
          </div>

          {/* RECOMMENDED ACTION */}
          <div className="p-3 rounded bg-orange-950/20 border border-orange-500/30 text-xs space-y-1">
            <span className="font-semibold text-orange-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              Recommended Action
            </span>
            <ul className="text-slate-200 space-y-1 list-disc list-inside font-medium pt-1">
              <li>Increase field verification along NH-106 corridor.</li>
              <li>Prepare warning workflow and alert emergency transit escorts.</li>
            </ul>
          </div>

          <div className="pt-2 border-t border-[#1E2E44] flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Act on this simulated threshold:
            </span>
            <button
              onClick={() => navigate('/alerts')}
              className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Proceed to Early Warning Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
