import React from 'react';
import { MapContainer, TileLayer, Circle, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, AlertTriangle, CheckCircle, Navigation, Home, Zap } from 'lucide-react';

interface ResponseMapProps {
  height?: string;
  isPlanGenerated?: boolean;
}

export const ResponseMap: React.FC<ResponseMapProps> = ({
  height = '520px',
  isPlanGenerated = false
}) => {
  // Center around East Khasi Hills / Cherrapunji corridor
  const center: [number, number] = [25.5788, 91.8933];

  // SVG divIcons for roadblocks, settlements, and infrastructure
  const roadblockIcon = L.divIcon({
    className: 'custom-roadblock-marker',
    html: `
      <div style="background-color: #EF4444; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 4px 12px rgba(239,68,68,0.6);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const settlementIcon = L.divIcon({
    className: 'custom-settlement-marker',
    html: `
      <div style="background-color: #3B82F6; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 4px 12px rgba(59,130,246,0.6);">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const infrastructureIcon = L.divIcon({
    className: 'custom-infra-marker',
    html: `
      <div style="background-color: #8B5CF6; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 4px 12px rgba(139,92,246,0.6);">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const shelterIcon = L.divIcon({
    className: 'custom-shelter-marker',
    html: `
      <div style="background-color: #10B981; width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 4px 14px rgba(16,185,129,0.7);">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  // Coordinates for paths
  const blockedRoadCoords: [number, number][] = [
    [25.591, 91.879],
    [25.5788, 91.8933],
    [25.565, 91.908]
  ];

  const safeAlternativeRouteCoords: [number, number][] = [
    [25.602, 91.865],
    [25.592, 91.87],
    [25.575, 91.875],
    [25.56, 91.888],
    [25.548, 91.905]
  ];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#1E2E44] bg-[#07111F] shadow-2xl">
      {/* Route & Zone Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#0B1728]/95 backdrop-blur-md p-3 rounded-lg border border-[#1E2E44] shadow-xl text-xs pointer-events-auto min-w-[240px]">
        <div className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Route & Zone Intelligence</span>
          <span className="text-[10px] text-cyan-400 font-mono">DEMO PLAN</span>
        </div>
        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-4 h-1.5 rounded bg-red-500 border border-red-300" />
            <span>High-Risk Blocked Zone (NH-106)</span>
          </div>
          <div className="flex items-center gap-2 text-orange-400">
            <span className="w-4 h-1.5 rounded bg-orange-500/70 border border-orange-300" />
            <span>Potentially Affected Valley Area</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-4 h-1.5 rounded bg-emerald-500 border border-emerald-300 ring-2 ring-emerald-500/30" />
            <span>Designated Safer Detour (SH-4)</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#1E2E44] text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Settlement Cluster
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-purple-500" />
              Critical Infra
            </span>
          </div>
        </div>
      </div>

      {/* Real-time routing status badge */}
      <div className="absolute top-3 right-3 z-[1000] bg-[#101D2E]/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#1E2E44] text-right pointer-events-auto">
        <span className="text-[10px] font-mono text-cyan-400 font-bold block">
          LOGISTICS PROTOCOL: ACT-04
        </span>
        <span className="text-xs text-slate-200 font-semibold flex items-center gap-1.5 justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {isPlanGenerated ? 'Detour Route Active' : 'Surveying Corridors'}
        </span>
      </div>

      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#07111F' }}
          className="dark-map-tiles"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* Red: High-risk zone */}
          <Circle
            center={[25.5788, 91.8933]}
            radius={3200}
            pathOptions={{
              color: '#EF4444',
              fillColor: '#EF4444',
              fillOpacity: 0.35,
              weight: 2.5,
              dashArray: '6, 6'
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -20]}>
              <span className="font-bold text-red-600 text-xs">
                HIGH RISK ESCARPMENT ZONE
              </span>
            </Tooltip>
          </Circle>

          {/* Orange: Potentially affected zone */}
          <Circle
            center={[25.562, 91.908]}
            radius={2200}
            pathOptions={{
              color: '#F97316',
              fillColor: '#F97316',
              fillOpacity: 0.25,
              weight: 2
            }}
          >
            <Tooltip direction="bottom">
              <span className="text-orange-600 font-semibold text-xs">
                POTENTIALLY AFFECTED VALLEY SECTOR
              </span>
            </Tooltip>
          </Circle>

          {/* Blocked Road (NH-106) Red Polyline */}
          <Polyline
            positions={blockedRoadCoords}
            pathOptions={{
              color: '#EF4444',
              weight: 5,
              dashArray: '8, 8',
              opacity: 0.85
            }}
          >
            <Tooltip sticky>
              <span className="text-red-600 font-bold">NH-106 Escarpment: BLOCKED</span>
            </Tooltip>
          </Polyline>

          {/* Green: Safer Route (SH-4 Bypass) */}
          <Polyline
            positions={safeAlternativeRouteCoords}
            pathOptions={{
              color: '#10B981',
              weight: 5,
              opacity: 0.95
            }}
          >
            <Tooltip sticky permanent={isPlanGenerated}>
              <span className="text-emerald-700 font-bold">
                RECOMMENDED SAFE ROUTE: SH-4 VALLEY DETOUR
              </span>
            </Tooltip>
          </Polyline>

          {/* Roadblock Marker */}
          <Marker position={[25.5788, 91.8933]} icon={roadblockIcon}>
            <Popup>
              <div className="p-1 text-slate-100">
                <p className="font-bold text-red-400 text-xs">ROADBLOCK: NH-106 Km 42</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Active landslide debris & slope detachment. Commercial vehicle transit suspended.
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Settlement Markers */}
          <Marker position={[25.592, 91.87]} icon={settlementIcon}>
            <Popup>
              <div className="p-1 text-slate-100">
                <p className="font-bold text-blue-400 text-xs">East Khasi Village Cluster</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Mawkdok & Wahkhen (Est. Pop: 1,420). Evacuation standby notification dispatched.
                </p>
              </div>
            </Popup>
          </Marker>

          <Marker position={[25.556, 91.912]} icon={settlementIcon}>
            <Popup>
              <div className="p-1 text-slate-100">
                <p className="font-bold text-blue-400 text-xs">Lower Umiew Basin Settlement</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Est. Pop: 680. Debris runout warning issued.
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Infrastructure Marker */}
          <Marker position={[25.568, 91.878]} icon={infrastructureIcon}>
            <Popup>
              <div className="p-1 text-slate-100">
                <p className="font-bold text-purple-400 text-xs">Critical Infrastructure #04</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Regional 33kV Sub-station & Telecom Repeater Tower. Foundation monitoring active.
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Shelter Marker */}
          <Marker position={[25.602, 91.865]} icon={shelterIcon}>
            <Popup>
              <div className="p-1 text-slate-100">
                <p className="font-bold text-emerald-400 text-xs">
                  Designated Emergency Relief Center
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Higher Secondary School Campus. Capacity: 2,000 persons with emergency medical supplies.
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
