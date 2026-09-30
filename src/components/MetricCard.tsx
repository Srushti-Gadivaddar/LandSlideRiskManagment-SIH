import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
  variant?: 'danger' | 'warning' | 'info' | 'default';
  trend?: string;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  sublabel,
  icon: Icon,
  variant = 'default',
  trend,
  badge,
  onClick
}) => {
  const variantStyles = {
    danger: {
      border: 'border-red-500/30 hover:border-red-500/60',
      iconBg: 'bg-red-500/10 text-red-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(239,68,68,0.15)]',
      valColor: 'text-red-400'
    },
    warning: {
      border: 'border-orange-500/30 hover:border-orange-500/60',
      iconBg: 'bg-orange-500/10 text-orange-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(249,115,22,0.15)]',
      valColor: 'text-orange-400'
    },
    info: {
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]',
      valColor: 'text-cyan-400'
    },
    default: {
      border: 'border-[#1E2E44] hover:border-cyan-500/40',
      iconBg: 'bg-slate-800 text-slate-300',
      glow: '',
      valColor: 'text-slate-100'
    }
  };

  const style = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`relative bg-[#101D2E] rounded-xl p-4 border transition-all duration-200 ${style.border} ${style.glow} ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono tracking-tight ${style.valColor}`}>
              {value}
            </span>
            {badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg ${style.iconBg} border border-white/5`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(sublabel || trend) && (
        <div className="mt-3 pt-2.5 border-t border-[#1E2E44]/60 flex items-center justify-between text-xs text-slate-400">
          <span>{sublabel}</span>
          {trend && (
            <span className="font-mono text-cyan-400 text-[11px] font-semibold">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
