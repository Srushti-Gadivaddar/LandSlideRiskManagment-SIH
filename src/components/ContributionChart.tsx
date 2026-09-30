import React from 'react';
import { Info } from 'lucide-react';

interface FactorItem {
  factor: string;
  level: 'High' | 'Moderate' | 'Low';
  percentage: number;
  description: string;
}

interface ContributionChartProps {
  factors?: FactorItem[];
}

export const ContributionChart: React.FC<ContributionChartProps> = ({ factors }) => {
  // Standard breakdown as requested in Section 7
  const defaultFactors: FactorItem[] = [
    { factor: 'Rainfall', level: 'High', percentage: 42, description: '186 mm cumulative 24h precipitation (+34% above threshold)' },
    { factor: 'Soil Moisture', level: 'High', percentage: 22, description: '82% pore-water saturation in topsoil horizon' },
    { factor: 'Slope Gradient', level: 'High', percentage: 18, description: '38° steep escarpment angle along valley cut' },
    { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 10, description: '7 prior slope failures recorded within 5km radius' },
    { factor: 'Satellite Terrain Indicators', level: 'Moderate', percentage: 8, description: 'Interferometric coherence loss and vegetation reflectance drop' }
  ];

  const items = factors && factors.length > 0 ? factors : defaultFactors;

  const getLevelBadge = (level: 'High' | 'Moderate' | 'Low') => {
    switch (level) {
      case 'High':
        return 'text-red-400 bg-red-950/60 border-red-500/40';
      case 'Moderate':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'Low':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    }
  };

  return (
    <div className="bg-[#0B1728] rounded-lg border border-[#1E2E44] p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E2E44] gap-2">
        <div>
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Why is Risk Increasing?
          </h2>
          <p className="text-[11px] text-slate-400">
            Relative contribution of key environmental and geotechnical indicators
          </p>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
          Illustrative model contribution view
        </span>
      </div>

      <div className="space-y-3.5 my-3">
        {items.map((item) => (
          <div key={item.factor} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">
                {item.factor}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${getLevelBadge(item.level)}`}>
                  {item.level}
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">
                  {item.percentage}%
                </span>
              </div>
            </div>

            {/* Horizontal progress bar */}
            <div className="w-full h-2 bg-[#07111F] rounded overflow-hidden border border-[#1E2E44]">
              <div
                className={`h-full rounded transition-all duration-500 ${
                  item.level === 'High' ? 'bg-[#0D9488]' : 'bg-slate-500'
                }`}
                style={{ width: `${item.percentage * 2}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-normal pl-0.5">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#1E2E44] flex items-start gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
        <span>
          <strong>Illustrative Model Contribution View:</strong> Indicative heuristic weights presented for operational demonstration. Live feature attribution (TreeSHAP) will be connected following regional baseline calibration.
        </span>
      </div>
    </div>
  );
};
