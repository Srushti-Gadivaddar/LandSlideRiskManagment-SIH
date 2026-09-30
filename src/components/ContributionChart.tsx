import React from 'react';
import { HelpCircle, Info } from 'lucide-react';

interface FactorItem {
  factor: string;
  percentage: number;
  description: string;
}

interface ContributionChartProps {
  factors: FactorItem[];
}

export const ContributionChart: React.FC<ContributionChartProps> = ({ factors }) => {
  const getFactorColor = (index: number) => {
    switch (index) {
      case 0:
        return { bar: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/30' };
      case 1:
        return { bar: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 2:
        return { bar: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 3:
      default:
        return { bar: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500/30' };
    }
  };

  return (
    <div className="bg-[#101D2E] rounded-xl border border-[#1E2E44] p-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[#1E2E44]">
        <div>
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Why is the Risk High?
          </h2>
          <p className="text-[11px] text-slate-400">
            Relative weight of contributing environmental & geo-physical factors
          </p>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Illustrative Breakdown
        </span>
      </div>

      {/* Feature attribution progress bars */}
      <div className="space-y-3.5 my-4">
        {factors.map((item, idx) => {
          const colors = getFactorColor(idx);
          return (
            <div key={item.factor} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  {item.factor}
                </span>
                <span className={`font-mono font-bold text-sm ${colors.text}`}>
                  {item.percentage}%
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2.5 bg-[#07111F] rounded-full overflow-hidden p-0.5 border border-[#1E2E44]">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-700 shadow-sm`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-normal pl-0.5">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Required Disclaimer */}
      <div className="pt-3 border-t border-[#1E2E44] flex items-start gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          <strong>Illustrative contribution breakdown:</strong> Heuristic feature attribution displayed for operational prototype review. Formal tree-SHAP and Integrated Gradients values will be integrated with the trained production model.
        </span>
      </div>
    </div>
  );
};
