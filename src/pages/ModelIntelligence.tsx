import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Brain,
  Layers,
  ArrowDown,
  Database,
  Radio,
  Sparkles
} from 'lucide-react';

export const ModelIntelligence: React.FC = () => {
  const [modelData, setModelData] = useState<{
    modelName: string;
    modelType: string;
    featureCount: number;
    trainingStatus: string;
    disclaimer: string;
    metrics: {
      precision: string;
      recall: string;
      f1Score: string;
      rocAuc: string;
    };
    systemStatus: { feature: string; status: string; isImplemented: boolean }[];
    roadmapPhases: { phase: string; title: string; desc: string }[];
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
      {/* Title & Header */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-violet-500/10 text-violet-400">
              <Brain className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Model & System Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              ARCHITECTURE & CAPABILITIES
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            System pipeline, prototype baseline model card, operational matrix, and 7-phase evolution roadmap.
          </p>
        </div>
      </div>

      {/* 1. END-TO-END ARCHITECTURE FLOW */}
      <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              End-to-End Decision Architecture Flow
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">
            SENSE → ANALYSE → PREDICT → ALERT → LEARN
          </span>
        </div>

        {/* Visual Architecture Pipeline */}
        <div className="py-6 space-y-4">
          {/* Layer 1: Ingestion Sources */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 text-center sm:text-left">
              MULTIMODAL INGESTION LAYER
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
              {[
                { label: 'Rainfall Telemetry', icon: '🌧️', sub: 'IMD / AWS' },
                { label: 'Terrain / Slope', icon: '⛰️', sub: 'DEM 30m' },
                { label: 'Soil Moisture', icon: '💧', sub: 'Volumetric' },
                { label: 'Historical Events', icon: '📜', sub: 'GSI Catalog' },
                { label: 'Satellite Indicators', icon: '🛰️', sub: 'Sentinel SAR' },
                { label: 'Field Reports', icon: '📍', sub: 'Human-in-Loop' }
              ].map((src, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#07111F] border border-[#1E2E44] hover:border-cyan-500/50 transition-colors"
                >
                  <span className="text-xl block mb-1">{src.icon}</span>
                  <span className="text-xs font-semibold text-slate-200 block truncate">
                    {src.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {src.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connector Down */}
          <div className="flex justify-center text-cyan-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 2: Data Processing */}
          <div className="p-3.5 rounded-xl bg-[#07111F] border border-[#1E2E44] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Database className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Data Processing & Spatial Feature Engineering
                </h3>
                <p className="text-[11px] text-slate-400">
                  Spatial indexing (EPSG:4326), rainfall anomaly normalization, hydrological pore-pressure modeling
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              PIPELINE v1.0
            </span>
          </div>

          {/* Connector Down */}
          <div className="flex justify-center text-cyan-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 3: Risk Model */}
          <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
                <Brain className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Landslide Susceptibility & Risk Model
                </h3>
                <p className="text-[11px] text-slate-300">
                  Probabilistic slope failure inference + Heuristic explainability weighting
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-700">
              BASELINE RANDOM FOREST
            </span>
          </div>

          {/* Connector Down */}
          <div className="flex justify-center text-cyan-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 4: Risk Score */}
          <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] text-center">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
              OUTPUT INFERENCE
            </span>
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-xs font-mono font-bold text-slate-200">
                Composite Risk Score (0 - 100)
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-mono font-bold text-red-400">
                Categorical Threat Tier (LOW / MODERATE / HIGH / CRITICAL)
              </span>
            </div>
          </div>

          {/* Connector Down */}
          <div className="flex justify-center text-cyan-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 5: GIS + Alert Engine */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                <Radio className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  GIS Command Center + CAP Early Alert Engine
                </h3>
                <p className="text-[11px] text-slate-300">
                  Real-time interactive Leaflet mapping, evacuation corridor routing, and human-in-the-loop escalation
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              OPERATIONAL LAYER
            </span>
          </div>
        </div>
      </div>

      {/* 2. BASELINE MODEL CARD & SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Model Card: 6 cols */}
        <div className="lg:col-span-6 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                MODEL CARD #RF-001
              </span>
              <h2 className="text-sm font-bold text-slate-100 mt-0.5">
                Baseline Model: Random Forest
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40">
              Prototype Baseline
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-slate-400 text-[10px] block font-mono">Architecture</span>
                <span className="font-semibold text-slate-100">Ensemble Decision Trees</span>
              </div>
              <div className="p-2.5 rounded bg-[#07111F] border border-[#1E2E44]">
                <span className="text-slate-400 text-[10px] block font-mono">Input Features</span>
                <span className="font-semibold text-slate-100">6 Multi-Source Signals</span>
              </div>
            </div>

            {/* Metrics Table: Precision, Recall, F1, ROC-AUC with strict "--" per requirement */}
            <div>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Validation Metrics
              </span>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
                  <span className="text-[10px] text-slate-400 block">Precision</span>
                  <span className="text-base font-bold text-slate-400 mt-0.5 block">
                    {modelData.metrics.precision}
                  </span>
                </div>
                <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
                  <span className="text-[10px] text-slate-400 block">Recall</span>
                  <span className="text-base font-bold text-slate-400 mt-0.5 block">
                    {modelData.metrics.recall}
                  </span>
                </div>
                <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
                  <span className="text-[10px] text-slate-400 block">F1 Score</span>
                  <span className="text-base font-bold text-slate-400 mt-0.5 block">
                    {modelData.metrics.f1Score}
                  </span>
                </div>
                <div className="p-3 rounded bg-[#07111F] border border-[#1E2E44]">
                  <span className="text-[10px] text-slate-400 block">ROC-AUC</span>
                  <span className="text-base font-bold text-slate-400 mt-0.5 block">
                    {modelData.metrics.rocAuc}
                  </span>
                </div>
              </div>
            </div>

            {/* Required notice: Do NOT invent metrics */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-normal">
              <strong>Evaluation Notice:</strong> Metrics will be populated after model training and validation against verified Geological Survey of India (GSI) historical inventory records and IMD rain gauge networks.
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS MATRIX: 6 cols */}
        <div className="lg:col-span-6 bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              System Capability Matrix
            </h2>
            <span className="text-[10px] font-mono text-cyan-400">
              Prototype vs Roadmap
            </span>
          </div>

          <div className="divide-y divide-[#1E2E44]/70 text-xs">
            {modelData.systemStatus.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.status === 'Implemented' ? (
                    <span className="text-emerald-400 font-bold">✓</span>
                  ) : item.status === 'Prototype' ? (
                    <span className="text-cyan-400 font-bold">✓</span>
                  ) : (
                    <span className="text-slate-400 font-bold">○</span>
                  )}
                  <span className="text-slate-200 font-medium">{item.feature}</span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    item.status === 'Implemented'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : item.status === 'Prototype'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {item.status === 'Implemented' ? '✓ Implemented' : item.status === 'Prototype' ? '✓ Prototype' : '○ Roadmap'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ADVANCED ROADMAP: FUTURE INTELLIGENCE LAYER */}
      <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Future Intelligence Layer (Beyond MVP)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-violet-300">
            7-Phase AI Evolution Strategy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-2">
          {modelData.roadmapPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-[#07111F] border border-[#1E2E44] hover:border-violet-500/40 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-violet-400">
                  {phase.phase}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {idx === 0 ? 'Active' : 'Planned'}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-100">
                {phase.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
