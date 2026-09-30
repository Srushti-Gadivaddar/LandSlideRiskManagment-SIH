import React, { useState } from 'react';
import {
  Send,
  Radio,
  Users,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Layers,
  ArrowDown,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import type { SupportedLanguage } from '../types';

export const CommunityAlertCenter: React.FC = () => {
  const { addToast } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('English');
  const [isSendingGov, setIsSendingGov] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [isSendingApp, setIsSendingApp] = useState(false);

  const templates = api.getCommunityTemplates();
  const currentTemplate = templates[selectedLanguage];

  const languages: SupportedLanguage[] = [
    'English',
    'Hindi',
    'Assamese',
    'Khasi',
    'Mizo',
    'Manipuri'
  ];

  const handleSendGovAlert = () => {
    setIsSendingGov(true);
    setTimeout(() => {
      setIsSendingGov(false);
      addToast(
        'Government Alert Queued',
        'Demo notification queued: Dispatched to DDMA, SDRF, and PWD road coordinators.',
        'success'
      );
    }, 450);
  };

  const handleSendSms = () => {
    setIsSendingSms(true);
    setTimeout(() => {
      setIsSendingSms(false);
      addToast(
        'Community SMS Queued',
        `Demo notification queued: [${selectedLanguage}] SMS broadcast initiated for registered mobile towers.`,
        'success'
      );
    }, 450);
  };

  const handleSendApp = () => {
    setIsSendingApp(true);
    setTimeout(() => {
      setIsSendingApp(false);
      addToast(
        'App Push Notification Queued',
        `Demo notification queued: [${selectedLanguage}] High-priority emergency notification broadcast to mobile subscribers.`,
        'success'
      );
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="pb-3 border-b border-[#1E2E44] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F766E]/20 text-[#14B8A6]">
              <Radio className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Alert & Communication Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect AI predictions directly to human action: Government coordination and multilingual community early warnings.
          </p>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
          CAP / NDMA Compliant Architecture
        </span>
      </div>

      {/* ALERT ARCHITECTURE VISUALIZATION */}
      <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-4 shadow-sm">
        <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
          End-to-End Alert Dissemination Architecture
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center text-xs">
          <div className="p-2 rounded bg-[#07111F] border border-[#1E2E44] w-full md:w-auto flex-1">
            <span className="text-[10px] font-mono text-slate-400 block">STEP 1</span>
            <span className="font-semibold text-slate-200">Environmental Data</span>
          </div>

          <span className="text-slate-500 font-mono hidden md:inline">→</span>

          <div className="p-2 rounded bg-[#07111F] border border-[#1E2E44] w-full md:w-auto flex-1">
            <span className="text-[10px] font-mono text-slate-400 block">STEP 2</span>
            <span className="font-semibold text-slate-200">Risk Engine</span>
          </div>

          <span className="text-slate-500 font-mono hidden md:inline">→</span>

          <div className="p-2 rounded bg-[#07111F] border border-red-500/30 w-full md:w-auto flex-1">
            <span className="text-[10px] font-mono text-red-400 block font-bold">STEP 3</span>
            <span className="font-semibold text-red-300">Risk Threshold &gt; 75</span>
          </div>

          <span className="text-slate-500 font-mono hidden md:inline">→</span>

          <div className="p-2 rounded bg-[#07111F] border border-[#0D9488]/40 w-full md:w-auto flex-1">
            <span className="text-[10px] font-mono text-[#2DD4BF] block font-bold">STEP 4</span>
            <span className="font-semibold text-white">Alert Engine</span>
          </div>

          <span className="text-slate-500 font-mono hidden md:inline">→</span>

          <div className="p-2 rounded bg-[#0F766E]/20 border border-[#0D9488]/50 w-full md:w-auto flex-1">
            <span className="text-[10px] font-mono text-[#2DD4BF] block font-bold">TWO CHANNELS</span>
            <span className="font-semibold text-white">Government & Community</span>
          </div>
        </div>
      </div>

      {/* Two Channels Grid: Government Response (Left 6 cols) + Community Warning (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* CHANNEL 1: GOVERNMENT RESPONSE */}
        <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#14B8A6]" />
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Government Response Channel
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
              PRIORITY LEVEL 1
            </span>
          </div>

          {/* Recipients List */}
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold mb-1.5">
              Authorized Operational Recipients
            </span>
            <div className="space-y-1 text-xs">
              {[
                'District Administration (Deputy Commissioner & DDMA)',
                'Disaster Management Authority (SDMA / SDRF Commander)',
                'Road/Infrastructure Response Team (NHIDCL & BRO Taskforce)',
                'Field Officers (Patrol Squad 07 & Incident Recon)'
              ].map((rec, i) => (
                <div key={i} className="p-2 rounded bg-[#07111F] border border-[#1E2E44] flex items-center justify-between text-slate-300">
                  <span>{rec}</span>
                  <span className="text-[9px] font-mono text-emerald-400">ENROLLED</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Preview Box */}
          <div className="p-3.5 rounded bg-[#07111F] border border-red-500/40 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-400 text-xs font-mono">
                HIGH LANDSLIDE RISK DETECTED
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                DISPATCH ADVISORY #ADV-902
              </span>
            </div>

            <div className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <div>
                <span className="text-slate-400">Location: </span>
                <strong className="text-white">East Khasi Hills (NH-106 Km 38-46 Corridor)</strong>
              </div>
              <div>
                <span className="text-slate-400">Risk Assessment: </span>
                <span className="text-red-400 font-mono font-bold">82 / 100 (CRITICAL)</span>
              </div>
              <div>
                <span className="text-slate-400">Major Contributing Factors: </span>
                <span>Heavy rainfall (186mm) + High soil moisture (82%) + Steep slope (38°)</span>
              </div>
              <div>
                <span className="text-slate-400">Recommended Action: </span>
                <span>Enforce vehicle detour via SH-4; deploy SDRF verification squad to Km 42.</span>
              </div>
              <div>
                <span className="text-slate-400">Field Verification Status: </span>
                <span className="text-amber-400 font-semibold font-mono">Under Verification (Report #FR-1042)</span>
              </div>
            </div>
          </div>

          {/* Send Government Alert Button */}
          <button
            onClick={handleSendGovAlert}
            disabled={isSendingGov}
            className="w-full py-2.5 px-4 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs tracking-wider uppercase shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Send className={`w-3.5 h-3.5 ${isSendingGov ? 'animate-bounce' : ''}`} />
            <span>{isSendingGov ? 'Broadcasting to Authorities...' : 'Send Government Alert'}</span>
          </button>
        </div>

        {/* CHANNEL 2: COMMUNITY WARNING */}
        <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Community Warning Channel
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              MULTILINGUAL BROADCAST
            </span>
          </div>

          {/* Language Selector */}
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#14B8A6]" />
              Select Regional Language:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-[#07111F] text-slate-300 hover:text-white border border-[#1E2E44]'
                  }`}
                >
                  <span>{lang}</span>
                  <span className="text-[10px] opacity-70 ml-1">({templates[lang].langNative})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Community Warning Mockup Card */}
          <div className="p-4 rounded bg-[#07111F] border border-amber-500/40 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-[#1E2E44] pb-2">
              <span className="font-bold text-amber-400 text-xs">
                {currentTemplate.title}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {currentTemplate.language} ({currentTemplate.langNative})
              </span>
            </div>

            <p className="text-slate-100 leading-relaxed text-xs">
              {currentTemplate.body}
            </p>

            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="text-slate-500 block text-[9px] mb-0.5">TELECOM SMS PREVIEW:</span>
              "{currentTemplate.smsPreview}"
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              {currentTemplate.advisory}
            </div>
          </div>

          {/* Action Buttons: [ Send SMS ] and [ Send App Notification ] */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleSendSms}
              disabled={isSendingSms}
              className="py-2.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{isSendingSms ? 'Queuing SMS...' : 'Send SMS'}</span>
            </button>

            <button
              onClick={handleSendApp}
              disabled={isSendingApp}
              className="py-2.5 px-3 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isSendingApp ? 'Broadcasting...' : 'Send App Notification'}</span>
            </button>
          </div>

          {/* Prototype disclaimer */}
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <strong>Prototype Actions:</strong> Simulated SMS and push notification broadcast. The architecture allows direct connection to CDAC / Common Alerting Protocol (CAP) and telecom SMS gateways.
          </div>
        </div>
      </div>
    </div>
  );
};
