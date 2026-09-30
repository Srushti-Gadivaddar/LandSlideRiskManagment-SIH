import React, { useState } from 'react';
import { ObservationType, FieldReport } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Camera,
  Video,
  CheckCircle,
  AlertCircle,
  Crosshair
} from 'lucide-react';

interface FieldReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultZoneId?: string;
}

export const FieldReportModal: React.FC<FieldReportModalProps> = ({
  isOpen,
  onClose,
  defaultZoneId = 'east-khasi-hills'
}) => {
  const { addNewReport, riskZones } = useApp();

  const [zoneId, setZoneId] = useState(defaultZoneId);
  const [locationName, setLocationName] = useState('East Khasi Hills (NH-106 Km 44)');
  const [lat, setLat] = useState('25.5682');
  const [lng, setLng] = useState('91.8841');
  const [accuracy, setAccuracy] = useState('4');
  const [observationType, setObservationType] = useState<ObservationType>('Slope crack');
  const [description, setDescription] = useState(
    'Noticed fresh hairline shear fractures extending diagonally across the upper highway cut slope.'
  );
  const [photosCount, setPhotosCount] = useState(2);
  const [videosCount, setVideosCount] = useState(1);
  const [severity, setSeverity] = useState<FieldReport['severity']>('HIGH');
  const [reportedBy, setReportedBy] = useState('Field Officer 07 (J. Lyngdoh)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const observationTypes: ObservationType[] = [
    'Slope crack',
    'Blocked road',
    'Soil movement',
    'Landslide',
    'Infrastructure damage',
    'Water accumulation'
  ];

  const handleUseCurrentGPS = () => {
    // Fill realistic coordinates based on selected zone
    const target = riskZones.find((z) => z.id === zoneId);
    if (target) {
      setLat((target.coordinates.lat + (Math.random() * 0.01 - 0.005)).toFixed(4));
      setLng((target.coordinates.lng + (Math.random() * 0.01 - 0.005)).toFixed(4));
      setAccuracy('3');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addNewReport({
        zoneId,
        locationName,
        reportedBy,
        observationType,
        description,
        evidence: {
          photos: photosCount,
          videos: videosCount
        },
        gps: {
          lat: parseFloat(lat) || 25.5682,
          lng: parseFloat(lng) || 91.8841,
          accuracyMeters: parseFloat(accuracy) || 5
        },
        status: 'UNDER VERIFICATION',
        severity
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#101D2E] rounded-xl border border-[#1E2E44] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1E2E44] bg-[#0B1728] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                GROUND TRUTH INGESTION
              </span>
              <h2 id="report-modal-title" className="text-base font-bold text-slate-100">
                Submit New Field Observation
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close field report modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Zone & Officer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Monitored Sector
              </label>
              <select
                value={zoneId}
                onChange={(e) => {
                  setZoneId(e.target.value);
                  const z = riskZones.find((rz) => rz.id === e.target.value);
                  if (z) setLocationName(`${z.name} Sector`);
                }}
                className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                {riskZones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Reported By (Officer ID)
              </label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                required
              />
            </div>
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Specific Landmark / Highway Milepost
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="e.g. NH-106 Km 44 Escarpment Bend"
              required
            />
          </div>

          {/* GPS Coordinates with Auto-Locate Button */}
          <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                <span>Geotagged GPS Location</span>
              </span>
              <button
                type="button"
                onClick={handleUseCurrentGPS}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline"
              >
                Sync with Sector Coordinates
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Latitude (°N)</span>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-[#0B1728] border border-[#1E2E44] rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                  required
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Longitude (°E)</span>
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-[#0B1728] border border-[#1E2E44] rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                  required
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Accuracy (m)</span>
                <input
                  type="text"
                  value={accuracy}
                  onChange={(e) => setAccuracy(e.target.value)}
                  className="w-full bg-[#0B1728] border border-[#1E2E44] rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Observation Type & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Observation Type
              </label>
              <select
                value={observationType}
                onChange={(e) => setObservationType(e.target.value as ObservationType)}
                className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                {observationTypes.map((ot) => (
                  <option key={ot} value={ot}>
                    {ot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Field Assessed Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as FieldReport['severity'])}
                className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                <option value="CRITICAL">CRITICAL - Active Slope Failure</option>
                <option value="HIGH">HIGH - Severe Cracking / Hazard</option>
                <option value="MEDIUM">MEDIUM - Moderate Soil Creep</option>
                <option value="LOW">LOW - Minor Debris / Clogged Drain</option>
              </select>
            </div>
          </div>

          {/* Observation Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Field Observation Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#07111F] border border-[#1E2E44] rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
              placeholder="Detail visible fracture depth, water seepage, soil displacement, or road impingement..."
              required
            />
          </div>

          {/* Evidence Attachments (Simulated Photo/Video) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Photos Attached:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPhotosCount(Math.max(1, photosCount - 1))}
                  className="w-6 h-6 rounded bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44]"
                >
                  -
                </button>
                <span className="font-mono font-bold text-slate-100">{photosCount}</span>
                <button
                  type="button"
                  onClick={() => setPhotosCount(photosCount + 1)}
                  className="w-6 h-6 rounded bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#07111F] border border-[#1E2E44] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-violet-400" />
                <span>Video Clips:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVideosCount(Math.max(0, videosCount - 1))}
                  className="w-6 h-6 rounded bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44]"
                >
                  -
                </button>
                <span className="font-mono font-bold text-slate-100">{videosCount}</span>
                <button
                  type="button"
                  onClick={() => setVideosCount(videosCount + 1)}
                  className="w-6 h-6 rounded bg-[#101D2E] text-slate-300 hover:text-white border border-[#1E2E44]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-[11px] text-slate-400">
            Field reports feed directly into the human-in-the-loop verification pipeline to calibrate AI risk weights.
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-[#1E2E44] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Ingesting Report...' : 'Submit Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
