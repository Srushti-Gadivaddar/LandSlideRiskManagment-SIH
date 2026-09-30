import React from 'react';
import { RiskLevel } from '../types';
import { AlertTriangle, AlertCircle, ShieldCheck, Flame } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  score,
  size = 'md',
  showIcon = true
}) => {
  const configs = {
    CRITICAL: {
      bg: 'bg-red-500/15',
      border: 'border-red-500/60',
      text: 'text-red-400',
      dot: 'bg-red-500',
      icon: Flame,
      label: 'CRITICAL'
    },
    HIGH: {
      bg: 'bg-orange-500/15',
      border: 'border-orange-500/60',
      text: 'text-orange-400',
      dot: 'bg-orange-500',
      icon: AlertTriangle,
      label: 'HIGH'
    },
    MODERATE: {
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/60',
      text: 'text-amber-400',
      dot: 'bg-amber-500',
      icon: AlertCircle,
      label: 'MODERATE'
    },
    LOW: {
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/60',
      text: 'text-emerald-400',
      dot: 'bg-emerald-500',
      icon: ShieldCheck,
      label: 'LOW'
    }
  };

  const config = configs[level] || configs.LOW;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold tracking-wider'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bg} ${config.border} ${config.text} ${sizeClasses[size]}`}
      role="status"
      aria-label={`Risk Level: ${config.label}${score !== undefined ? `, Score: ${score}/100` : ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {showIcon && <IconComponent className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-90 font-mono text-[11px] ml-0.5">({score}/100)</span>
      )}
    </span>
  );
};
