import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup, Tooltip, Polyline } from 'react-leaflet';
import type { RiskZone, FieldReport } from '../types';
import { RiskBadge } from './RiskBadge';
import { CloudRain, Droplets, Mountain, ArrowUpRight } from 'lucide-react';

interface RiskMapProps {
  zones: RiskZone[];
  fieldReports?: FieldReport[];
  selectedZoneId?: string;
  onSelectZone?: (zone: RiskZone) => void;
  height?: string;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  zones,
  fieldReports = [],
  selectedZoneId,
  onSelectZone,
  height = '520px'
}) => {
  const navigate = useNavigate();

  // NER Centroid (Meghalaya / Assam border region)
  const defaultCenter: [number, number] = [25.5788, 92.2];
  const defaultZoom = 7;

  const getRiskColors = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return { color: '#DC2626', fillColor: '#DC2626', fillOpacity: 0.35, weight: 2 };
      case 'HIGH':
        return { color: '#EA580C', fillColor: '#EA580C', fillOpacity: 0.28, weight: 1.5 };
      case 'MODERATE':
        return { color: '#D97706', fillColor: '#D97706', fillOpacity: 0.22, weight: 1.5 };
      case 'LOW':
      default:
        return { color: '#059669', fillColor: '#059669', fillOpacity: 0.18, weight: 1 };
    }
  };

  // Arterial highway routes for geographic context
  const arterialCorridor1: [number, number][] = [
    [26.1445, 91.7362], // Guwahati
    [25.5788, 91.8933], // Shillong
    [24.8170, 92.8050]  // Silchar
  ];

  const arterialCorridor2: [number, number][] = [
    [25.5788, 91.8933], // Shillong
    [23.7271, 92.7176]  // Aizawl
  ];

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-[#1E2E44] bg-[#07111F] shadow-md">
      {/* Map Control / Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#0B1728]/95 backdrop-blur-md px-3 py-2.5 rounded border border-[#1E2E44] shadow-lg text-xs pointer-events-auto min-w-[190px]">
        <div className="font-semibold text-slate-300 text-[10px] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Risk Legend</span>
          <span className="text-[9px] text-slate-400 font-mono">GSI Index</span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-red-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-400" />
              Critical
            </span>
            <span className="text-slate-400">&gt; 75</span>
          </div>
          <div className="flex items-center justify-between text-orange-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 border border-orange-400" />
              High
            </span>
            <span className="text-slate-400">60 - 74</span>
          </div>
          <div className="flex items-center justify-between text-amber-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-400" />
              Moderate
            </span>
            <span className="text-slate-400">40 - 59</span>
          </div>
          <div className="flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-emerald-400" />
              Low
            </span>
            <span className="text-slate-400">&lt; 40</span>
          </div>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#1E2E44] text-[9px] text-slate-400">
          Click any zone for Location Intelligence
        </div>
      </div>

      {/* Region Status Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#0B1728]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#1E2E44] shadow pointer-events-auto">
        <span className="text-[10px] font-mono text-[#2DD4BF] font-semibold block uppercase">
          NER Geopolitical Matrix
        </span>
        <span className="text-[10px] text-slate-300">
          7 Monitored Sectors • Highway Corridors Active
        </span>
      </div>

      {/* Leaflet Map */}
      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#07111F' }}
          className="dark-map-tiles"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* Highway network lines for context */}
          <Polyline
            positions={arterialCorridor1}
            pathOptions={{ color: '#475569', weight: 2, dashArray: '4, 4', opacity: 0.6 }}
          />
          <Polyline
            positions={arterialCorridor2}
            pathOptions={{ color: '#475569', weight: 2, dashArray: '4, 4', opacity: 0.6 }}
          />

          {/* Risk Zones Circles & Markers */}
          {zones.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            const style = getRiskColors(zone.riskLevel);

            return (
              <React.Fragment key={zone.id}>
                {/* Catchment Radius */}
                <Circle
                  center={[zone.coordinates.lat, zone.coordinates.lng]}
                  radius={zone.boundsRadius}
                  pathOptions={{
                    color: style.color,
                    fillColor: style.fillColor,
                    fillOpacity: style.fillOpacity,
                    weight: isSelected ? 2.5 : 1.25,
                    dashArray: zone.riskLevel === 'CRITICAL' ? '4, 4' : undefined
                  }}
                  eventHandlers={{
                    click: () => {
                      if (onSelectZone) onSelectZone(zone);
                    }
                  }}
                />

                {/* Primary Circle Marker */}
                <CircleMarker
                  center={[zone.coordinates.lat, zone.coordinates.lng]}
                  radius={zone.riskLevel === 'CRITICAL' ? 12 : zone.riskLevel === 'HIGH' ? 10 : 8}
                  pathOptions={{
                    color: '#FFFFFF',
                    fillColor: style.fillColor,
                    fillOpacity: 0.95,
                    weight: 1.5
                  }}
                  eventHandlers={{
                    click: () => {
                      if (onSelectZone) onSelectZone(zone);
                    }
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]} permanent={zone.riskLevel === 'CRITICAL'}>
                    <div className="text-xs font-medium px-1 py-0.5 text-slate-900 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${zone.riskLevel === 'CRITICAL' ? 'bg-red-600' : 'bg-slate-700'}`} />
                      <span>{zone.name}</span>
                      <span className="font-mono font-bold">({zone.riskScore})</span>
                    </div>
                  </Tooltip>

                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 space-y-2 text-slate-100 min-w-[220px]">
                      <div className="flex items-start justify-between border-b border-[#1E2E44] pb-1.5">
                        <div>
                          <h3 className="font-bold text-xs text-slate-100">
                            {zone.name}
                          </h3>
                          <p className="text-[10px] text-slate-400">{zone.state}</p>
                        </div>
                        <RiskBadge level={zone.riskLevel} score={zone.riskScore} size="sm" />
                      </div>

                      <div className="grid grid-cols-3 gap-1 py-1 text-center bg-[#07111F] rounded p-1.5 border border-[#1E2E44]">
                        <div>
                          <span className="text-[9px] text-slate-400 block">Rainfall</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.rainfall24h} mm
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">Moisture</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.soilMoisture}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">Slope</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.slope}°
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-normal">
                        {zone.description}
                      </p>

                      <div className="pt-2 border-t border-[#1E2E44] flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">
                          Confidence: {zone.confidence}%
                        </span>
                        <button
                          onClick={() => navigate(`/location/${zone.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                        >
                          <span>Analyze</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            );
          })}

          {/* Small field report dots */}
          {fieldReports.map((r) => (
            <CircleMarker
              key={r.id}
              center={[r.gps.lat, r.gps.lng]}
              radius={4}
              pathOptions={{
                color: '#FFFFFF',
                fillColor: r.status === 'UNDER VERIFICATION' ? '#D97706' : '#059669',
                fillOpacity: 1,
                weight: 1
              }}
            >
              <Tooltip direction="bottom">
                <span className="text-[10px] font-mono">
                  {r.id}: {r.observationType}
                </span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
