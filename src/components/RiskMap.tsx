import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup, Tooltip } from 'react-leaflet';
import { RiskZone } from '../types';
import { RiskBadge } from './RiskBadge';
import { Eye, CloudRain, Droplets, Mountain, ArrowUpRight } from 'lucide-react';

interface RiskMapProps {
  zones: RiskZone[];
  selectedZoneId?: string;
  onSelectZone?: (zone: RiskZone) => void;
  height?: string;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  zones,
  selectedZoneId,
  onSelectZone,
  height = '560px'
}) => {
  const navigate = useNavigate();

  // NER Centroid (Meghalaya, Assam, Mizoram, Manipur convergence)
  const defaultCenter: [number, number] = [25.5788, 92.2];
  const defaultZoom = 7;

  const getRiskColors = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return { color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.45, weight: 2.5 };
      case 'HIGH':
        return { color: '#F97316', fillColor: '#F97316', fillOpacity: 0.35, weight: 2 };
      case 'MODERATE':
        return { color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.3, weight: 1.5 };
      case 'LOW':
      default:
        return { color: '#10B981', fillColor: '#10B981', fillOpacity: 0.25, weight: 1.5 };
    }
  };

  const handleZoneNavigate = (zoneId: string) => {
    navigate(`/location/${zoneId}`);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#1E2E44] bg-[#07111F] shadow-2xl">
      {/* GIS Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#0B1728]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#1E2E44] shadow-lg max-w-sm pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            GIS Risk Intelligence Matrix
          </h2>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          North Eastern Region (NER) Multi-Hazard Surveillance
        </p>
      </div>

      {/* Map Control / Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#0B1728]/95 backdrop-blur-md p-3 rounded-lg border border-[#1E2E44] shadow-xl text-xs pointer-events-auto min-w-[210px]">
        <div className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Risk Level Legend</span>
          <span className="text-[10px] text-slate-400 font-mono">GSI/IMD Index</span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-red-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-300 ring-2 ring-red-500/30 animate-pulse" />
              CRITICAL
            </span>
            <span className="text-slate-400">&gt; 75 / 100</span>
          </div>
          <div className="flex items-center justify-between text-orange-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500/80 border border-orange-300" />
              HIGH
            </span>
            <span className="text-slate-400">60 - 74</span>
          </div>
          <div className="flex items-center justify-between text-amber-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300" />
              MODERATE
            </span>
            <span className="text-slate-400">40 - 59</span>
          </div>
          <div className="flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300" />
              LOW
            </span>
            <span className="text-slate-400">&lt; 40</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#1E2E44] text-[10px] text-slate-400">
          • Click markers for Location Intelligence
        </div>
      </div>

      {/* Simulated Live Feed Banner Overlay */}
      <div className="absolute top-3 right-3 z-[1000] bg-[#101D2E]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1E2E44] text-right pointer-events-auto hidden sm:block">
        <span className="text-[10px] font-mono text-cyan-300 font-semibold block">
          COORDINATES: NER CLUSTER GRID
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          25.57° N, 91.89° E • EPSG:4326
        </span>
      </div>

      {/* Leaflet Map Container */}
      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#07111F' }}
          className="dark-map-tiles"
        >
          {/* CartoDB Dark Matter tiles (OpenStreetMap-based) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {zones.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            const style = getRiskColors(zone.riskLevel);
            const radiusMeters = zone.boundsRadius;

            return (
              <React.Fragment key={zone.id}>
                {/* Outer buffer circle representing danger catchment zone */}
                <Circle
                  center={[zone.coordinates.lat, zone.coordinates.lng]}
                  radius={radiusMeters}
                  pathOptions={{
                    color: style.color,
                    fillColor: style.fillColor,
                    fillOpacity: zone.riskLevel === 'CRITICAL' ? 0.25 : 0.15,
                    weight: isSelected ? 3 : 1.5,
                    dashArray: zone.riskLevel === 'CRITICAL' ? '4, 4' : undefined
                  }}
                  eventHandlers={{
                    click: () => {
                      if (onSelectZone) onSelectZone(zone);
                    }
                  }}
                />

                {/* Primary Risk Marker */}
                <CircleMarker
                  center={[zone.coordinates.lat, zone.coordinates.lng]}
                  radius={zone.riskLevel === 'CRITICAL' ? 14 : zone.riskLevel === 'HIGH' ? 12 : 9}
                  pathOptions={{
                    color: '#FFFFFF',
                    fillColor: style.fillColor,
                    fillOpacity: 0.95,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => {
                      if (onSelectZone) onSelectZone(zone);
                    }
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.95} permanent={zone.riskLevel === 'CRITICAL'}>
                    <div className="text-xs font-semibold px-1 py-0.5 text-slate-900 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${zone.riskLevel === 'CRITICAL' ? 'bg-red-600 animate-ping' : 'bg-slate-700'}`} />
                      <span>{zone.name}</span>
                      <span className="font-mono font-bold">({zone.riskScore})</span>
                    </div>
                  </Tooltip>

                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 space-y-2.5 text-slate-100 min-w-[230px]">
                      <div className="flex items-start justify-between border-b border-[#1E2E44] pb-2">
                        <div>
                          <h3 className="font-bold text-sm text-slate-100 leading-tight">
                            {zone.name}
                          </h3>
                          <p className="text-[11px] text-slate-400">{zone.state}</p>
                        </div>
                        <RiskBadge level={zone.riskLevel} score={zone.riskScore} size="sm" />
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 py-1 text-center bg-[#07111F] rounded p-2 border border-[#1E2E44]">
                        <div>
                          <div className="flex items-center justify-center text-cyan-400 mb-0.5">
                            <CloudRain className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] text-slate-400 block">Rainfall</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.rainfall24h} mm
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center text-blue-400 mb-0.5">
                            <Droplets className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] text-slate-400 block">Moisture</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.soilMoisture}%
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center text-amber-400 mb-0.5">
                            <Mountain className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] text-slate-400 block">Slope</span>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {zone.slope}°
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {zone.description}
                      </p>

                      <div className="pt-2 border-t border-[#1E2E44] flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">
                          Confidence: {zone.confidence}%
                        </span>
                        <button
                          onClick={() => handleZoneNavigate(zone.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
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
        </MapContainer>
      </div>
    </div>
  );
};
