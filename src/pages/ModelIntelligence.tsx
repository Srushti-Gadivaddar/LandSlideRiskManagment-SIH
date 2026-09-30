import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Brain,
  Layers,
  ArrowDown,
  Database,
  Radio,
  CheckCircle2,
  Circle,
  Cpu,
  Info,
  GitBranch,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ModelIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [modelData, setModelData] = useState<{
    modelName: string;
    modelType: string;
    featureCount: number;
    trainingStatus: string;
    disclaimer: string;
    metrics: { precision: string; recall: string; f1Score: string; rocAuc: string };
    systemStatus: { feature: string; status: string; isImplemented: boolean }[];
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await api.getModelMetrics();
      setModelData(data);
    };
    load();
  }, []);

  if (!modelData) return null;

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Brain className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Model Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete technical flow from multi-source data ingestion to operational decision support.
          </p>
        </div>

        <button
          onClick={() => navigate('/future-intelligence')}
          className="px-3.5 py-1.5 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Explore Future Intelligence Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* COMPLETE TECHNICAL FLOW ARCHITECTURE DIAGRAM */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            End-to-End Decision Support Pipeline
          </h2>
          <span className="text-[10px] font-mono text-[#2DD4BF]">
            DATA → PROCESSING → AI → OUTPUT → DECISION
          </span>
        </div>

        <div className="py-2 space-y-3">
          {/* 1. DATA SOURCES */}
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-2">
              1. DATA SOURCES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
              {[
                { name: 'Rainfall', sub: 'Telemetry' },
                { name: 'Weather', sub: 'Atmospheric' },
                { name: 'Terrain', sub: 'DEM Slope' },
                { name: 'Soil', sub: 'Moisture' },
                { name: 'Historical', sub: 'GSI Catalog' },
                { name: 'Satellite', sub: 'Sentinel/SAR' },
                { name: 'IoT Sensors', sub: 'Piezometers' },
                { name: 'Field Reports', sub: 'Ground Truth' }
              ].map((src, i) => (
                <div key={i} className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                  <span className="font-semibold text-slate-200 block text-xs truncate">{src.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">{src.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-[#14B8A6]">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 2. DATA PROCESSING */}
          <div className="p-3.5 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1.5">
              2. DATA PROCESSING
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Cleaning</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Normalization</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Geo-referencing (EPSG:4326)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Feature Extraction</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Temporal Alignment</span>
            </div>
          </div>

          <div className="flex justify-center text-[#14B8A6]">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 3. AI ENGINE */}
          <div className="p-3.5 rounded bg-[#07111F] border border-[#0D9488]/40">
            <span className="text-[10px] font-mono uppercase text-[#2DD4BF] font-semibold block mb-1.5">
              3. AI ENGINE
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-[#0F766E]/20 text-white font-semibold border border-[#0D9488]/50">Baseline Risk Model (Random Forest)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-300 border border-[#1E2E44]">Computer Vision (Segmentation)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-300 border border-[#1E2E44]">Multimodal Fusion</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-300 border border-[#1E2E44]">Temporal Modelling</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-300 border border-[#1E2E44]">Explainability (Feature Attribution)</span>
            </div>
          </div>

          <div className="flex justify-center text-[#14B8A6]">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 4. OUTPUT */}
          <div className="p-3.5 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1.5">
              4. OUTPUT
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-[#0B1728] text-red-400 font-bold border border-red-500/30">Risk Score (0–100)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">GIS Risk Map</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Segmentation Masks</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Confidence Bounds (91%)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Risk Factors Breakdown</span>
            </div>
          </div>

          <div className="flex justify-center text-[#14B8A6]">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 5. DECISION SUPPORT */}
          <div className="p-3.5 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1.5">
              5. DECISION SUPPORT
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Alerts (Gov & Community)</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Field Verification Ingestion</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Response Prioritisation</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-1 rounded bg-[#0B1728] text-slate-200 border border-[#1E2E44]">Evacuation Route Planning</span>
            </div>
          </div>
        </div>
      </div>

      {/* CURRENT MVP vs ADVANCED ROADMAP COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* CURRENT MVP */}
        <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1E2E44]">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Current MVP Capabilities
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              OPERATIONAL PROTOTYPE
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: 'Random Forest Baseline', desc: 'Ensemble decision model ingesting rainfall, terrain slope, soil moisture, and historical data.' },
              { title: 'GIS Risk Map', desc: 'Interactive Leaflet mapping with regional risk zones and catchment buffers.' },
              { title: 'Prototype Explainability', desc: 'Factor attribution breakdown demonstrating relative hazard contributions.' },
              { title: 'Prototype Alert Engine', desc: 'CAP-compliant warning composer and multi-stakeholder alert previews.' },
              { title: 'Field Reporting', desc: 'GPS-tagged photographic ground evidence collection and verification loop.' }
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal pl-5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ADVANCED ROADMAP */}
        <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1E2E44]">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Advanced Evolution Roadmap
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              PLANNED PHASES
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: 'Live Satellite Feeds', desc: 'Scheduled ingestion of Sentinel-1 SAR and Cartosat-3 optical imagery.' },
              { title: 'Real IoT Sensor Network', desc: 'Ground tiltmeter, piezometer, and rain gauge telemetry integration.' },
              { title: 'Multimodal Deep-Learning Fusion', desc: 'Cross-attention transformers fusing raster imagery, tabular telemetry, and DEMs.' },
              { title: 'U-Net / SegFormer Segmentation', desc: 'Pixel-level spatial slope instability boundary segmentation.' },
              { title: 'Temporal Transformers', desc: 'Sequence prediction modeling multi-day rainfall accumulation lag.' },
              { title: 'Uncertainty Calibration', desc: 'Bayesian epistemic confidence intervals for low-sensor zones.' },
              { title: 'Multilingual Automated Alerts', desc: 'Automated translation into 6+ local regional languages via CAP.' },
              { title: 'Continuous Learning', desc: 'Active learning fine-tuned on verified field officer damage reports.' }
            ].map((item, idx) => (
              <div key={idx} className="p-2 rounded bg-[#07111F] border border-[#1E2E44]">
                <div className="flex items-center gap-2">
                  <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="font-semibold text-slate-300">{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 pl-5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BASELINE MODEL CARD */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2E44]">
          <div>
            <span className="text-[10px] font-mono text-[#2DD4BF] font-semibold block">
              BASELINE MODEL CARD #RF-001
            </span>
            <h3 className="text-sm font-bold text-slate-100">
              {modelData.modelName}
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {modelData.trainingStatus}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs pt-1">
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block">Precision</span>
            <span className="text-base font-bold text-slate-400 mt-0.5 block">{modelData.metrics.precision}</span>
          </div>
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block">Recall</span>
            <span className="text-base font-bold text-slate-400 mt-0.5 block">{modelData.metrics.recall}</span>
          </div>
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block">F1 Score</span>
            <span className="text-base font-bold text-slate-400 mt-0.5 block">{modelData.metrics.f1Score}</span>
          </div>
          <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
            <span className="text-[10px] text-slate-400 block">ROC-AUC</span>
            <span className="text-base font-bold text-slate-400 mt-0.5 block">{modelData.metrics.rocAuc}</span>
          </div>
        </div>

        <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
          <strong>Validation Notice:</strong> Metrics will be populated after model training and validation against verified Geological Survey of India (GSI) historical inventory records and IMD rain gauge networks.
        </div>
      </div>
    </div>
  );
};
