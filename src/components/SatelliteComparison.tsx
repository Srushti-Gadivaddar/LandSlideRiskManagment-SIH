import React, { useState } from 'react';
import { Scan, Info, AlertTriangle } from 'lucide-react';

interface SatelliteComparisonProps {
  locationName: string;
}

export const SatelliteComparison: React.FC<SatelliteComparisonProps> = ({ locationName }) => {
  const [showAnnotation, setShowAnnotation] = useState(true);

  return (
    <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E2E44]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-violet-500/10 text-violet-400">
              <Scan className="w-4 h-4" />
            </span>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Satellite / Terrain Change Detection: {locationName}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              Sentinel-2 & SAR Demo
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Multi-spectral surface displacement & vegetation moisture index delta
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAnnotation(!showAnnotation)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              showAnnotation
                ? 'bg-violet-600/20 border-violet-500/50 text-violet-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {showAnnotation ? 'Hide Anomaly ROI' : 'Show Anomaly ROI'}
          </button>
        </div>
      </div>

      {/* Demo Warning / Disclaimer Banner */}
      <div className="my-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Demonstration Imagery:</strong> Simulated satellite change detection for hackathon demonstration. Live ISRO/ESA radar pipeline to be integrated in Phase 2.
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40">
          PROTOTYPE HUD
        </span>
      </div>

      {/* Imagery Comparison Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE Panel */}
        <div className="rounded-lg overflow-hidden border border-[#1E2E44] bg-[#07111F]">
          <div className="p-2 bg-[#0B1728] border-b border-[#1E2E44] flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              BEFORE (T-30 Days: Baseline)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              NDVI: 0.74 (Dense Canopy)
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Visual simulation of baseline stable slope */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B1C2D" />
                  <stop offset="100%" stopColor="#1E384D" />
                </linearGradient>
                <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1B4D3E" />
                  <stop offset="100%" stopColor="#0F2B22" />
                </linearGradient>
                <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D6A4F" />
                  <stop offset="100%" stopColor="#1B4332" />
                </linearGradient>
              </defs>
              <rect width="400" height="250" fill="url(#skyGrad)" />
              <polygon points="0,250 0,90 80,60 160,110 240,45 320,95 400,70 400,250" fill="#14362A" opacity="0.6" />
              <polygon points="0,250 0,130 110,80 200,140 290,100 400,160 400,250" fill="url(#hillGrad1)" />
              <polygon points="0,250 50,150 150,130 250,180 350,140 400,170 400,250" fill="url(#hillGrad2)" />
              <path d="M 0,210 Q 140,195 240,215 T 400,190" stroke="#475569" strokeWidth="6" fill="none" />
              <path d="M 0,210 Q 140,195 240,215 T 400,190" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="6,4" fill="none" />
              <line x1="100" y1="0" x2="100" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="200" y1="0" x2="200" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="300" y1="0" x2="300" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="0" y1="125" x2="400" y2="125" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
            </svg>

            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[10px] text-emerald-400">
              HISTORICAL BASELINE: STABLE
            </div>
          </div>
        </div>

        {/* CURRENT Panel */}
        <div className="rounded-lg overflow-hidden border border-red-500/40 bg-[#07111F] relative">
          <div className="p-2 bg-[#0B1728] border-b border-[#1E2E44] flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-red-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              CURRENT (T-0: Post-Precipitation)
            </span>
            <span className="text-[10px] font-mono text-red-400">
              NDVI: 0.38 (-48% Soil Scour)
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Visual simulation of degraded slope with scar */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B1728" />
                  <stop offset="100%" stopColor="#15263B" />
                </linearGradient>
                <linearGradient id="hillGradDegraded" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#254B3B" />
                  <stop offset="100%" stopColor="#1A3328" />
                </linearGradient>
                <linearGradient id="mudScar" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B45309" />
                  <stop offset="50%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
              </defs>
              <rect width="400" height="250" fill="url(#skyGradDark)" />
              <polygon points="0,250 0,90 80,60 160,110 240,45 320,95 400,70 400,250" fill="#14362A" opacity="0.6" />
              <polygon points="0,250 0,130 110,80 200,140 290,100 400,160 400,250" fill="url(#hillGradDegraded)" />
              <polygon points="0,250 50,150 150,130 250,180 350,140 400,170 400,250" fill="url(#hillGradDegraded)" />
              
              {/* Exposed Landslide Scar / Mud Runout */}
              <path
                d="M 175,115 Q 195,140 180,165 Q 165,190 205,212 Q 220,225 210,240 L 250,240 Q 235,215 220,180 Q 215,145 195,112 Z"
                fill="url(#mudScar)"
                stroke="#DC2626"
                strokeWidth="1.5"
              />

              {/* Road ribbon covered by mud */}
              <path d="M 0,210 Q 140,195 240,215 T 400,190" stroke="#475569" strokeWidth="6" fill="none" />
              <path d="M 0,210 Q 140,195 240,215 T 400,190" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="6,4" fill="none" />
              <ellipse cx="205" cy="212" rx="24" ry="9" fill="#78350F" stroke="#EF4444" strokeWidth="1" />

              <line x1="100" y1="0" x2="100" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="200" y1="0" x2="200" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="300" y1="0" x2="300" y2="250" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="0" y1="125" x2="400" y2="125" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
            </svg>

            {/* Bounding box around suspected change region */}
            {showAnnotation && (
              <div className="absolute top-[38%] left-[36%] w-[32%] h-[56%] border-2 border-dashed border-red-500 bg-red-500/15 rounded flex flex-col justify-between p-1.5 pointer-events-none animate-pulse">
                <div className="flex items-center justify-between text-[9px] font-mono font-bold bg-red-950/90 text-red-300 px-1 py-0.5 rounded border border-red-600">
                  <span>ROI: DETACHMENT SCAR</span>
                  <span>Δ -48%</span>
                </div>
                <div className="text-[8px] font-mono text-white bg-black/80 px-1 rounded self-start">
                  25.578°N, 91.893°E
                </div>
              </div>
            )}

            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-red-950/80 border border-red-600 font-mono text-[10px] text-red-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>SUSPECTED SLOPE ANOMALY DETECTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
