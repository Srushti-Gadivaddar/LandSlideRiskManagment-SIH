import React, { useState } from 'react';
import {
  Scan,
  Layers,
  Info,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ZoomIn,
  Eye,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const SatelliteIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState<'current' | 'before' | 'change-map'>('change-map');
  const [showMask, setShowMask] = useState(true);
  const [sliderPos, setSliderPos] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCompareHistorical = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveLayer('change-map');
      setShowMask(true);
    }, 400);
  };

  return (
    <div className="space-y-5">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Scan className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Satellite Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Computer vision-assisted terrain and landslide evidence analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCompareHistorical}
            className="px-3.5 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Compare Historical Image</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Satellite Image (7 cols) + Right Analysis Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT: SATELLITE IMAGE VIEWPORT */}
        <div className="lg:col-span-7 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm space-y-3">
          {/* Layer Selector Bar: BEFORE | CURRENT | CHANGE MAP */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#1E2E44]">
            <div className="flex items-center gap-1 p-0.5 rounded bg-[#07111F] border border-[#1E2E44] text-xs">
              <button
                onClick={() => setActiveLayer('before')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLayer === 'before'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                BEFORE
              </button>
              <button
                onClick={() => setActiveLayer('current')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLayer === 'current'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CURRENT
              </button>
              <button
                onClick={() => setActiveLayer('change-map')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLayer === 'change-map'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CHANGE MAP
              </button>
            </div>

            <button
              onClick={() => setShowMask(!showMask)}
              className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                showMask
                  ? 'bg-[#0F766E]/20 border-[#0D9488]/50 text-[#2DD4BF]'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {showMask ? 'Hide Segmentation Mask' : 'Show Segmentation Mask'}
            </button>
          </div>

          {/* Satellite Canvas Viewport */}
          <div className="relative aspect-[16/10] bg-slate-950 rounded border border-[#1E2E44] overflow-hidden flex items-center justify-center select-none">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 500 320"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="satBase" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#081422" />
                  <stop offset="100%" stopColor="#10253B" />
                </linearGradient>
                <pattern id="gridOverlay" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.12" />
                </pattern>
                {/* Segmentation Mask Fill */}
                <pattern id="hazardHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#EF4444" strokeWidth="2" strokeOpacity="0.8" />
                </pattern>
              </defs>

              <rect width="500" height="320" fill="url(#satBase)" />

              {/* Mountain Terrain Contours */}
              <polygon points="0,320 0,110 90,80 180,140 280,60 380,120 500,90 500,320" fill="#132E24" opacity="0.7" />
              <polygon points="0,320 0,160 140,110 250,180 360,130 500,200 500,320" fill="#1B4332" />
              <polygon points="0,320 60,200 180,170 300,220 420,180 500,210 500,320" fill="#245440" />

              {/* Highway NH-106 Ribbon */}
              <path d="M 0,270 Q 180,250 300,275 T 500,245" stroke="#475569" strokeWidth="8" fill="none" />
              <path d="M 0,270 Q 180,250 300,275 T 500,245" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="8,6" fill="none" />

              {/* In CURRENT or CHANGE-MAP mode: Mud Slide Runout */}
              {(activeLayer === 'current' || activeLayer === 'change-map') && (
                <>
                  <path
                    d="M 220,150 Q 250,180 230,210 Q 210,240 260,270 Q 280,285 270,305 L 320,305 Q 300,275 280,230 Q 275,190 250,145 Z"
                    fill="#78350F"
                    stroke="#DC2626"
                    strokeWidth="1.5"
                  />
                  <ellipse cx="260" cy="270" rx="30" ry="12" fill="#451A03" stroke="#DC2626" strokeWidth="1" />
                </>
              )}

              {/* Grid HUD Overlay */}
              <rect width="500" height="320" fill="url(#gridOverlay)" />

              {/* LANDSLIDE SEGMENTATION MASK OVERLAY */}
              {showMask && (activeLayer === 'change-map' || activeLayer === 'current') && (
                <g>
                  {/* Segmentation polygon with red hazard hatch & border */}
                  <polygon
                    points="215,145 255,140 285,185 285,230 325,310 265,310 255,270 205,240 225,205"
                    fill="url(#hazardHatch)"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="4, 3"
                    className="animate-pulse"
                  />
                </g>
              )}
            </svg>

            {/* Segmentation Callout Label */}
            {showMask && (activeLayer === 'change-map' || activeLayer === 'current') && (
              <div className="absolute top-1/3 left-1/2 -translate-x-1/4 bg-[#0B1728]/95 border border-red-500/70 p-2 rounded shadow-lg text-[10px] pointer-events-none">
                <span className="font-mono font-bold text-red-400 block uppercase">
                  LANDSLIDE SEGMENTATION
                </span>
                <span className="text-slate-200 block font-medium">
                  Potential unstable / affected region
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  Est. 3.4 Hectares • Loss of Coherence: -48%
                </span>
              </div>
            )}

            {/* Viewport HUD tags */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#2DD4BF]">
              COORDINATES: 25.578° N, 91.893° E • EPSG:4326
            </div>

            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-slate-300">
              LAYER: {activeLayer.toUpperCase()} {showMask ? '(MASK ACTIVE)' : ''}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>Sensor: Sentinel-2 MSI (10m Optical) + Sentinel-1 C-SAR</span>
            <span>Downlink: Cloud-free Pass (Today, 06:14 UTC)</span>
          </div>
        </div>

        {/* RIGHT: ANALYSIS PANEL */}
        <div className="lg:col-span-5 bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Computer Vision Analysis Panel
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Pass Verified
            </span>
          </div>

          {/* Key Metrics Table as required by Section 11 */}
          <div className="space-y-2.5 text-xs">
            {/* Image Analysis Status */}
            <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
              <span className="text-slate-400">Image Analysis Status</span>
              <span className="font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Processed (T-0 Pass)
              </span>
            </div>

            {/* Detected Terrain Change: High */}
            <div className="p-2.5 rounded bg-[#07111F] border border-red-500/30 flex items-center justify-between">
              <span className="text-slate-400">Detected Terrain Change</span>
              <span className="font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40">
                High
              </span>
            </div>

            {/* Potential Landslide Evidence: Moderate */}
            <div className="p-2.5 rounded bg-[#07111F] border border-amber-500/30 flex items-center justify-between">
              <span className="text-slate-400">Potential Landslide Evidence</span>
              <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                Moderate
              </span>
            </div>

            {/* Affected Region: Highlighted */}
            <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
              <span className="text-slate-400">Affected Region</span>
              <span className="font-mono font-semibold text-slate-200">
                Highlighted (3.4 Hectares)
              </span>
            </div>
          </div>

          {/* Quantitative Indicators */}
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44] space-y-1.5 text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
              Multi-Spectral Evidence Metrics
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block">NDVI Canopy Delta:</span>
                <span className="text-red-400 font-bold">-48% Scour</span>
              </div>
              <div>
                <span className="text-slate-500 block">SAR Displacement:</span>
                <span className="text-amber-400 font-bold">38 mm Line-of-Sight</span>
              </div>
            </div>
          </div>

          {/* Prototype CV Disclaimer */}
          <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Prototype Computer-Vision Demonstration</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              This interface demonstrates computer-vision assisted terrain segmentation. The pipeline architecture is structured to seamlessly plug in a production U-Net / SegFormer model trained on verified ISRO and Sentinel disaster imagery.
            </p>
          </div>

          {/* Navigation Action */}
          <div className="pt-2 border-t border-[#1E2E44] flex items-center justify-between">
            <button
              onClick={() => navigate('/response')}
              className="w-full py-2 px-3 rounded bg-[#0F766E]/20 hover:bg-[#0F766E]/30 border border-[#0D9488]/40 text-[#2DD4BF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Integrate Terrain Change into Response Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
