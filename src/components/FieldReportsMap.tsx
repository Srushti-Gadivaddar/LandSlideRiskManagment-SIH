import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { FieldReport } from '../types';
import { RiskBadge } from './RiskBadge';
import { MapPin, Eye, Camera, Video, CheckCircle2 } from 'lucide-react';

interface FieldReportsMapProps {
  reports: FieldReport[];
  selectedReportId?: string;
  onSelectReport?: (report: FieldReport) => void;
  onVerifyReport?: (id: string) => void;
  height?: string;
}

export const FieldReportsMap: React.FC<FieldReportsMapProps> = ({
  reports,
  selectedReportId,
  onSelectReport,
  onVerifyReport,
  height = '420px'
}) => {
  const center: [number, number] = [25.5788, 92.5];

  const getMarkerIcon = (type: FieldReport['observationType'], status: FieldReport['status']) => {
    let color = '#06B6D4'; // cyan default
    let symbol = '⚠️';

    switch (type) {
      case 'Slope crack':
        color = '#EF4444'; // Red
        symbol = '⚡';
        break;
      case 'Blocked road':
        color = '#F97316'; // Orange
        symbol = '🚧';
        break;
      case 'Possible landslide':
      case 'Soil movement':
        color = '#DC2626'; // Dark Red
        symbol = '⛰️';
        break;
      case 'Water accumulation':
        color = '#3B82F6'; // Blue
        symbol = '💧';
        break;
      case 'Infrastructure damage':
        color = '#8B5CF6'; // Violet
        symbol = '🏗️';
        break;
    }

    return L.divIcon({
      className: 'custom-field-report-marker',
      html: `
        <div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-size: 13px;">
          ${symbol}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#1E2E44] bg-[#07111F] shadow-2xl">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#0B1728]/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#1E2E44] shadow-lg pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Field Reports & Ground Evidence Map
          </h2>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Showing {reports.length} verified & pending ground telemetry markers
        </p>
      </div>

      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#07111F' }}
          className="dark-map-tiles"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {reports.map((report) => {
            const isSelected = selectedReportId === report.id;
            const icon = getMarkerIcon(report.observationType, report.status);

            return (
              <Marker
                key={report.id}
                position={[report.gps.lat, report.gps.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    if (onSelectReport) onSelectReport(report);
                  }
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <span className="font-semibold text-xs">
                    {report.id}: {report.observationType} ({report.locationName})
                  </span>
                </Tooltip>

                <Popup>
                  <div className="p-1 space-y-2 text-slate-100 min-w-[220px]">
                    <div className="flex items-start justify-between border-b border-[#1E2E44] pb-1.5">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                          {report.id}
                        </span>
                        <h4 className="font-bold text-xs text-slate-100">
                          {report.observationType}
                        </h4>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          report.status === 'VERIFIED'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                            : report.status === 'UNDER VERIFICATION'
                            ? 'bg-amber-950 text-amber-400 border-amber-700'
                            : 'bg-red-950 text-red-400 border-red-700'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-normal">
                      {report.description}
                    </p>

                    <div className="text-[10px] font-mono text-slate-400 space-y-0.5 pt-1 border-t border-[#1E2E44]">
                      <div>Location: {report.locationName}</div>
                      <div>GPS: {report.gps.lat.toFixed(4)}°N, {report.gps.lng.toFixed(4)}°E (±{report.gps.accuracyMeters}m)</div>
                      <div>By: {report.reportedBy} • {report.time}</div>
                    </div>

                    {report.status === 'UNDER VERIFICATION' && onVerifyReport && (
                      <button
                        onClick={() => onVerifyReport(report.id)}
                        className="mt-2 w-full py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify Ground Evidence</span>
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
