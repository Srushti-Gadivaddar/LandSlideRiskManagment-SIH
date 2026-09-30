import type {
  RiskZone,
  AlertItem,
  FieldReport,
  SimulationResult,
  RoadSegment,
  ResponsePriorityItem,
  SatelliteAnalysis,
  CommunityAlertTemplate,
  SupportedLanguage,
  RiskLevel
} from '../types';
import {
  initialRiskZones,
  initialAlerts,
  initialFieldReports,
  satelliteAnalysisData,
  communityAlertTemplates,
  roadSegmentsData,
  responsePriorityData
} from '../data/mockData';

// State stored in memory for interactive session
let riskZones = [...initialRiskZones];
let alerts = [...initialAlerts];
let fieldReports = [...initialFieldReports];

export const api = {
  // 1. Get Risk Zones
  getRiskZones: async (): Promise<RiskZone[]> => {
    await new Promise((r) => setTimeout(r, 40));
    return [...riskZones];
  },

  // 2. Get Location Details
  getLocationDetails: async (id: string): Promise<RiskZone | null> => {
    await new Promise((r) => setTimeout(r, 40));
    const zone = riskZones.find((z) => z.id === id);
    return zone ? { ...zone } : null;
  },

  // 3. Get Alerts
  getAlerts: async (): Promise<AlertItem[]> => {
    await new Promise((r) => setTimeout(r, 40));
    return [...alerts];
  },

  // Update alert status
  updateAlertStatus: async (id: string, status: AlertItem['status']): Promise<AlertItem | null> => {
    await new Promise((r) => setTimeout(r, 40));
    const idx = alerts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      alerts[idx] = { ...alerts[idx], status };
      return alerts[idx];
    }
    return null;
  },

  // 4. Get Field Reports
  getFieldReports: async (): Promise<FieldReport[]> => {
    await new Promise((r) => setTimeout(r, 40));
    return [...fieldReports];
  },

  // Create new Field Report
  createFieldReport: async (report: Omit<FieldReport, 'id' | 'time' | 'date'>): Promise<FieldReport> => {
    await new Promise((r) => setTimeout(r, 60));
    const newReport: FieldReport = {
      ...report,
      id: `FR-${1043 + fieldReports.length}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today'
    };
    fieldReports = [newReport, ...fieldReports];
    return newReport;
  },

  // Update report verification status
  updateFieldReportStatus: async (id: string, status: FieldReport['status']): Promise<FieldReport | null> => {
    await new Promise((r) => setTimeout(r, 40));
    const idx = fieldReports.findIndex((r) => r.id === id);
    if (idx !== -1) {
      fieldReports[idx] = { ...fieldReports[idx], status };
      return fieldReports[idx];
    }
    return null;
  },

  // 5. Run Risk Simulation
  runRiskSimulation: async (
    rainfall: number,
    soilMoisture: number,
    zoneId: string = 'east-khasi-hills'
  ): Promise<SimulationResult> => {
    await new Promise((r) => setTimeout(r, 70));
    const baseZone = riskZones.find((z) => z.id === zoneId) || riskZones[0];

    // Deterministic mathematical heuristic
    const baseSlopeFactor = (baseZone.slope / 45) * 28;
    const rainfallFactor = Math.min(55, Math.max(5, (rainfall / 300) * 55));
    const moistureFactor = Math.min(30, Math.max(5, (soilMoisture / 100) * 30));
    const histFactor = (baseZone.historicalEventsCount / 10) * 12;

    const raw = Math.round(rainfallFactor + moistureFactor + baseSlopeFactor * 0.7 + histFactor);
    const simulatedRisk = Math.min(99, Math.max(15, raw));
    const riskChange = simulatedRisk - baseZone.riskScore;

    let simulatedLevel: RiskLevel = 'LOW';
    if (simulatedRisk >= 75) simulatedLevel = 'CRITICAL';
    else if (simulatedRisk >= 60) simulatedLevel = 'HIGH';
    else if (simulatedRisk >= 40) simulatedLevel = 'MODERATE';

    let additionalZones = 0;
    let affectedRoads = 1;
    if (simulatedRisk >= 85) {
      additionalZones = 3;
      affectedRoads = 2;
    } else if (simulatedRisk >= 70) {
      additionalZones = 2;
      affectedRoads = 2;
    } else if (simulatedRisk >= 55) {
      additionalZones = 1;
      affectedRoads = 1;
    }

    let recommendedAction = 'Routine telemetry monitoring.';
    if (simulatedLevel === 'CRITICAL') {
      recommendedAction = 'Increase field verification. Prepare warning workflow and coordinate traffic detour staging.';
    } else if (simulatedLevel === 'HIGH') {
      recommendedAction = 'Issue heightened advisory to road transport authorities and dispatch slope inspection patrols.';
    } else if (simulatedLevel === 'MODERATE') {
      recommendedAction = 'Increase sensor polling frequency to 15-minute cycles and notify local disaster desk.';
    }

    return {
      currentRisk: baseZone.riskScore,
      simulatedRisk,
      riskChange,
      simulatedLevel,
      additionalAffectedZones: additionalZones,
      potentiallyAffectedRoadSegments: affectedRoads,
      recommendedAction,
      breakdown: [
        { factor: 'Rainfall (24h)', currentValue: baseZone.rainfall24h, simulatedValue: rainfall, unit: 'mm' },
        { factor: 'Soil Moisture', currentValue: baseZone.soilMoisture, simulatedValue: soilMoisture, unit: '%' },
        { factor: 'Slope (Locked)', currentValue: baseZone.slope, simulatedValue: baseZone.slope, unit: '°' }
      ]
    };
  },

  // 6. Get Response Plan
  getResponsePlan: async (zoneId: string) => {
    await new Promise((r) => setTimeout(r, 80));
    const zone = riskZones.find((z) => z.id === zoneId) || riskZones[0];
    return {
      generatedAt: new Date().toLocaleTimeString(),
      zoneName: zone.name,
      priorityTarget: 'Critical village cluster (Mawkdok & Wahkhen)',
      suggestedAction: 'Deploy field verification team (SDRF Team Bravo) and stage heavy clearing excavator at Km 39 outpost.',
      routeStatus: 'Alternative route available (SH-4 Valley Link bypass clear for emergency transport). NH-106 main ridge cut closed.',
      evacuationReadiness: 'High Priority (Standby notice issued to 3 village councils)',
      logistics: [
        { item: 'SDRF Rapid Response Team', status: 'Mobilized', ETA: '25 min' },
        { item: 'Traffic Diversion at Cherra Cut', status: 'Active', ETA: 'Enforced' },
        { item: 'Emergency VHF Repeater', status: 'Online', ETA: 'Operational' }
      ]
    };
  },

  // 7. Get Satellite Analysis
  getSatelliteAnalysis: async (zoneId: string): Promise<SatelliteAnalysis> => {
    await new Promise((r) => setTimeout(r, 40));
    return satelliteAnalysisData[zoneId] || satelliteAnalysisData['east-khasi-hills'];
  },

  // 8. Send Government Alert (Mock)
  sendGovernmentAlert: async (alertId: string) => {
    await new Promise((r) => setTimeout(r, 90));
    return {
      success: true,
      alertId,
      dispatchedAt: new Date().toLocaleTimeString(),
      channels: ['CAP National Feed (Simulated)', 'State Emergency Operation Center (SEOC)', 'DDMA High-Priority VHF Desk']
    };
  },

  // 9. Send Community Alert (Mock)
  sendCommunityAlert: async (language: SupportedLanguage, channel: 'SMS' | 'APP') => {
    await new Promise((r) => setTimeout(r, 90));
    const template = communityAlertTemplates[language];
    return {
      success: true,
      language,
      channel,
      dispatchedAt: new Date().toLocaleTimeString(),
      messagePreview: channel === 'SMS' ? template.smsPreview : template.body
    };
  },

  // Multilingual Templates
  getCommunityTemplates: (): Record<SupportedLanguage, CommunityAlertTemplate> => {
    return communityAlertTemplates;
  },

  // Road status
  getRoadStatus: async (): Promise<RoadSegment[]> => {
    await new Promise((r) => setTimeout(r, 30));
    return [...roadSegmentsData];
  },

  // Response Priority
  getResponsePriority: async (): Promise<ResponsePriorityItem[]> => {
    await new Promise((r) => setTimeout(r, 30));
    return [...responsePriorityData];
  },

  // Model Metrics
  getModelMetrics: async () => {
    await new Promise((r) => setTimeout(r, 30));
    return {
      modelName: 'Baseline Model: Random Forest',
      modelType: 'Ensemble Decision Trees (Prototype Baseline)',
      featureCount: 6,
      trainingStatus: 'Prototype Baseline / Simulation Mode',
      disclaimer: 'Metrics will be populated after model training and validation against verified Geological Survey of India (GSI) historical inventory records and IMD rain gauge networks.',
      metrics: {
        precision: '--',
        recall: '--',
        f1Score: '--',
        rocAuc: '--'
      },
      systemStatus: [
        { feature: 'Risk scoring', status: 'Prototype', isImplemented: true },
        { feature: 'GIS visualization', status: 'Implemented', isImplemented: true },
        { feature: 'Explainability', status: 'Prototype', isImplemented: true },
        { feature: 'Alert engine', status: 'Prototype', isImplemented: true },
        { feature: 'Field reporting', status: 'Prototype', isImplemented: true },
        { feature: 'Satellite integration', status: 'Roadmap', isImplemented: false },
        { feature: 'IoT integration', status: 'Roadmap', isImplemented: false },
        { feature: 'Multimodal deep learning', status: 'Roadmap', isImplemented: false },
        { feature: 'Segmentation', status: 'Roadmap', isImplemented: false },
        { feature: 'Temporal prediction', status: 'Roadmap', isImplemented: false }
      ]
    };
  }
};
