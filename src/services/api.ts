import type {
  RiskZone,
  AlertItem,
  FieldReport,
  SimulationResult,
  RoadSegment,
  ResponsePriorityItem,
  RiskLevel
} from '../types';

// Mock in-memory storage for demonstration session
let riskZonesData: RiskZone[] = [
  {
    id: 'east-khasi-hills',
    name: 'East Khasi Hills',
    state: 'Meghalaya',
    riskScore: 82,
    riskLevel: 'CRITICAL',
    confidence: 91,
    trend: 'Increasing',
    rainfall24h: 186,
    rainfallChangePercent: 34,
    soilMoisture: 82,
    slope: 38,
    historicalEventsCount: 7,
    activeSensors: '24 / 27',
    coordinates: { lat: 25.5788, lng: 91.8933 }, // Shillong / Sohra region
    boundsRadius: 18000,
    description: 'High precipitation plateau edge with deep gorges and fragile shale-sandstone strata along the NH-106 corridor.',
    contributingFactors: [
      { factor: 'Recent rainfall', percentage: 42, description: '186 mm cumulative 24h precipitation crossing threshold by +34%' },
      { factor: 'Slope gradient', percentage: 28, description: 'Steep escarpment angles averaging 38° with unconsolidated topsoil' },
      { factor: 'Soil moisture saturation', percentage: 18, description: 'Pore-water pressure elevated at 82% volumetric water content' },
      { factor: 'Historical susceptibility', percentage: 12, description: '7 prior slope failures recorded within 5km radius over last decade' }
    ],
    nearbyVillagesCount: 3,
    criticalRoadsCount: 2,
    infrastructureCount: 1,
    lastUpdated: '2 min ago'
  },
  {
    id: 'churachandpur',
    name: 'Churachandpur',
    state: 'Manipur',
    riskScore: 71,
    riskLevel: 'HIGH',
    confidence: 87,
    trend: 'Increasing',
    rainfall24h: 154,
    rainfallChangePercent: 22,
    soilMoisture: 74,
    slope: 32,
    historicalEventsCount: 5,
    activeSensors: '19 / 20',
    coordinates: { lat: 24.3333, lng: 93.6667 },
    boundsRadius: 15000,
    description: 'Hilly terrain with clay-rich weathered strata experiencing continuous monsoon downpours.',
    contributingFactors: [
      { factor: 'Recent rainfall', percentage: 38, description: 'Continuous precipitation over past 48 hours' },
      { factor: 'Historical susceptibility', percentage: 26, description: 'Active slide scars along arterial hill cuts' },
      { factor: 'Soil moisture saturation', percentage: 21, description: 'Elevated moisture levels causing reduced shear strength' },
      { factor: 'Slope gradient', percentage: 15, description: 'Moderate-steep slope averaging 32°' }
    ],
    nearbyVillagesCount: 2,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '5 min ago'
  },
  {
    id: 'aizawl-outskirts',
    name: 'Aizawl Outskirts',
    state: 'Mizoram',
    riskScore: 68,
    riskLevel: 'HIGH',
    confidence: 84,
    trend: 'Stable',
    rainfall24h: 142,
    rainfallChangePercent: 14,
    soilMoisture: 69,
    slope: 35,
    historicalEventsCount: 6,
    activeSensors: '16 / 18',
    coordinates: { lat: 23.7271, lng: 92.7176 },
    boundsRadius: 14000,
    description: 'Ridge-top urban sprawl with steep flanking valleys susceptible to slope subsidence.',
    contributingFactors: [
      { factor: 'Slope gradient', percentage: 35, description: 'Very steep valley cuts flanking residential areas' },
      { factor: 'Recent rainfall', percentage: 30, description: '142 mm persistent rainfall' },
      { factor: 'Soil moisture saturation', percentage: 20, description: 'Water saturation in loose silt loam' },
      { factor: 'Historical susceptibility', percentage: 15, description: 'Frequent minor slips along bypass routes' }
    ],
    nearbyVillagesCount: 2,
    criticalRoadsCount: 2,
    infrastructureCount: 1,
    lastUpdated: '12 min ago'
  },
  {
    id: 'tawang-corridor',
    name: 'Tawang Corridor',
    state: 'Arunachal Pradesh',
    riskScore: 48,
    riskLevel: 'MODERATE',
    confidence: 78,
    trend: 'Stable',
    rainfall24h: 98,
    rainfallChangePercent: -4,
    soilMoisture: 55,
    slope: 29,
    historicalEventsCount: 3,
    activeSensors: '12 / 15',
    coordinates: { lat: 27.5861, lng: 91.8653 },
    boundsRadius: 20000,
    description: 'High-altitude strategic transit route with glacial till and moraine deposits.',
    contributingFactors: [
      { factor: 'Slope gradient', percentage: 34, description: 'Alpine high-angle slopes with freeze-thaw weathering' },
      { factor: 'Recent rainfall', percentage: 28, description: '98 mm mixed precipitation' },
      { factor: 'Soil moisture saturation', percentage: 22, description: 'Moderate saturation from melt runoff' },
      { factor: 'Historical susceptibility', percentage: 16, description: 'Occasional seasonal rockfalls' }
    ],
    nearbyVillagesCount: 1,
    criticalRoadsCount: 1,
    infrastructureCount: 1,
    lastUpdated: '18 min ago'
  },
  {
    id: 'gangtok-outskirts',
    name: 'Gangtok Outskirts',
    state: 'Sikkim',
    riskScore: 44,
    riskLevel: 'MODERATE',
    confidence: 81,
    trend: 'Decreasing',
    rainfall24h: 84,
    rainfallChangePercent: -12,
    soilMoisture: 52,
    slope: 31,
    historicalEventsCount: 4,
    activeSensors: '14 / 16',
    coordinates: { lat: 27.3389, lng: 88.6065 },
    boundsRadius: 13000,
    description: 'Teesta basin tributary slopes with drainage containment works active.',
    contributingFactors: [
      { factor: 'Slope gradient', percentage: 36, description: 'Steep hill terraces' },
      { factor: 'Historical susceptibility', percentage: 26, description: 'Historical slope instability zones' },
      { factor: 'Recent rainfall', percentage: 22, description: '84 mm light to moderate rain' },
      { factor: 'Soil moisture saturation', percentage: 16, description: 'Stable drainage retention' }
    ],
    nearbyVillagesCount: 1,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '25 min ago'
  },
  {
    id: 'kohima-ridge',
    name: 'Kohima Ridge',
    state: 'Nagaland',
    riskScore: 36,
    riskLevel: 'LOW',
    confidence: 85,
    trend: 'Decreasing',
    rainfall24h: 62,
    rainfallChangePercent: -18,
    soilMoisture: 41,
    slope: 24,
    historicalEventsCount: 2,
    activeSensors: '15 / 15',
    coordinates: { lat: 25.6751, lng: 94.1086 },
    boundsRadius: 12000,
    description: 'Central ridge zone with stabilized retaining walls and normal groundwater discharge.',
    contributingFactors: [
      { factor: 'Slope gradient', percentage: 40, description: 'Moderate ridge slope' },
      { factor: 'Soil moisture saturation', percentage: 25, description: 'Below critical saturation threshold' },
      { factor: 'Recent rainfall', percentage: 20, description: '62 mm scattered showers' },
      { factor: 'Historical susceptibility', percentage: 15, description: 'Low historical activity in this quadrant' }
    ],
    nearbyVillagesCount: 0,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '31 min ago'
  },
  {
    id: 'haflong-slope',
    name: 'Haflong Slope',
    state: 'Assam (Dima Hasao)',
    riskScore: 28,
    riskLevel: 'LOW',
    confidence: 89,
    trend: 'Stable',
    rainfall24h: 48,
    rainfallChangePercent: -5,
    soilMoisture: 38,
    slope: 21,
    historicalEventsCount: 3,
    activeSensors: '11 / 12',
    coordinates: { lat: 25.1767, lng: 93.0189 },
    boundsRadius: 14000,
    description: 'Barail range hill pass with installed bio-engineering gabions and functioning culverts.',
    contributingFactors: [
      { factor: 'Slope gradient', percentage: 38, description: 'Gentle-to-moderate valley slope' },
      { factor: 'Historical susceptibility', percentage: 27, description: 'Previous monsoon washouts mitigated' },
      { factor: 'Recent rainfall', percentage: 20, description: '48 mm intermittent drizzle' },
      { factor: 'Soil moisture saturation', percentage: 15, description: 'Optimal pore-pressure dissipation' }
    ],
    nearbyVillagesCount: 0,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '40 min ago'
  }
];

let alertsData: AlertItem[] = [
  {
    id: 'ALT-8801',
    zoneId: 'east-khasi-hills',
    region: 'East Khasi Hills',
    riskScore: 82,
    riskLevel: 'CRITICAL',
    confidence: 91,
    trigger: ['Heavy rainfall (186 mm)', 'High soil moisture (82%)', 'Steep slope (38°)'],
    recommendedAction: 'Immediate field verification & pre-alert response deployment',
    recipients: ['District Disaster Management Authority (DDMA)', 'SDRF Rapid Response Team', 'Public Works / NHIDCL', 'Community Village Council'],
    timestamp: '12 min ago',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-8802',
    zoneId: 'churachandpur',
    region: 'Churachandpur',
    riskScore: 71,
    riskLevel: 'HIGH',
    confidence: 87,
    trigger: ['Rainfall trend (+22%)', 'Historical susceptibility (5 past events)'],
    recommendedAction: 'Restrict heavy vehicle movement and dispatch inspection team',
    recipients: ['District Administration', 'State Disaster Response', 'Traffic Enforcement'],
    timestamp: '35 min ago',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-8803',
    zoneId: 'aizawl-outskirts',
    region: 'Aizawl Outskirts',
    riskScore: 68,
    riskLevel: 'HIGH',
    confidence: 84,
    trigger: ['Steep urban flank (35°)', 'Soil saturation approaching critical 70%'],
    recommendedAction: 'Advise residents along slope toe to monitor drainage overflow',
    recipients: ['Aizawl Municipal Corporation', 'Disaster Management Cell'],
    timestamp: '1 hour ago',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-8804',
    zoneId: 'tawang-corridor',
    region: 'Tawang Corridor',
    riskScore: 48,
    riskLevel: 'MODERATE',
    confidence: 78,
    trigger: ['Mountain pass thaw runoff', 'Moderate continuous rainfall'],
    recommendedAction: 'Maintain routine highway patrol monitoring along hairpin bends',
    recipients: ['BRO Border Roads Taskforce', 'Local Sub-Divisional Magistrate'],
    timestamp: '3 hours ago',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-8805',
    zoneId: 'gangtok-outskirts',
    region: 'Gangtok Outskirts',
    riskScore: 44,
    riskLevel: 'MODERATE',
    confidence: 81,
    trigger: ['Terrace slope saturation', 'Tributary channel swell'],
    recommendedAction: 'Keep catchment sensor telemetry under observation',
    recipients: ['Sikkim SDMA Field Office'],
    timestamp: '5 hours ago',
    status: 'RESOLVED'
  }
];

let fieldReportsData: FieldReport[] = [
  {
    id: 'FR-1042',
    zoneId: 'east-khasi-hills',
    locationName: 'East Khasi Hills (NH-106 Km 42 Cut)',
    reportedBy: 'Field Officer 07 (J. Lyngdoh)',
    time: '14:32',
    date: 'Today',
    observationType: 'Slope crack',
    description: 'Visible tension cracks measuring 4-7 cm wide extending along 25m of the upper slope shoulder. Mud seeps noted above retaining barrier.',
    evidence: { photos: 3, videos: 1 },
    gps: { lat: 25.5682, lng: 91.8841, accuracyMeters: 4 },
    status: 'UNDER VERIFICATION',
    severity: 'CRITICAL'
  },
  {
    id: 'FR-1041',
    zoneId: 'churachandpur',
    locationName: 'Churachandpur Hill Bypass',
    reportedBy: 'Field Officer 03 (T. Haokip)',
    time: '13:15',
    date: 'Today',
    observationType: 'Blocked road',
    description: 'Minor debris spill covering one lane. Excavator currently clearing boulder obstruction.',
    evidence: { photos: 2, videos: 0 },
    gps: { lat: 24.3210, lng: 93.6540, accuracyMeters: 6 },
    status: 'VERIFIED',
    severity: 'HIGH'
  },
  {
    id: 'FR-1040',
    zoneId: 'east-khasi-hills',
    locationName: 'Cherra Ridge Footpath',
    reportedBy: 'Field Officer 12 (K. Marwein)',
    time: '11:45',
    date: 'Today',
    observationType: 'Water accumulation',
    description: 'Severe stormwater ponding behind masonry wall. Drainage weep holes appear clogged with clay silt.',
    evidence: { photos: 4, videos: 1 },
    gps: { lat: 25.5901, lng: 91.9022, accuracyMeters: 5 },
    status: 'ESCALATED',
    severity: 'HIGH'
  },
  {
    id: 'FR-1039',
    zoneId: 'aizawl-outskirts',
    locationName: 'Durtlang Quarry Road',
    reportedBy: 'Field Officer 09 (L. Sailo)',
    time: '09:20',
    date: 'Today',
    observationType: 'Soil movement',
    description: 'Creep movement detected along loose overburden spoil tip. Small slide of ~15 cubic meters.',
    evidence: { photos: 2, videos: 1 },
    gps: { lat: 23.7410, lng: 92.7310, accuracyMeters: 7 },
    status: 'VERIFIED',
    severity: 'MEDIUM'
  },
  {
    id: 'FR-1038',
    zoneId: 'tawang-corridor',
    locationName: 'Sela Pass Transit Sector',
    reportedBy: 'BRO Patrol Unit 02',
    time: 'Yesterday',
    date: 'Yesterday',
    observationType: 'Infrastructure damage',
    description: 'Guardrail bent and culvert apron cracked from minor rolling debris. Cleared by maintenance squad.',
    evidence: { photos: 1, videos: 0 },
    gps: { lat: 27.5720, lng: 91.8540, accuracyMeters: 8 },
    status: 'RESOLVED',
    severity: 'LOW'
  }
];

let roadSegmentsData: RoadSegment[] = [
  {
    id: 'rd-1',
    name: 'NH-106 Primary Ridge Road (Km 38 - 46)',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    blockageDetails: 'High probability of active slope detachment; precautionary vehicle diversion in place.',
    coordinates: [
      { lat: 25.5850, lng: 91.8820 },
      { lat: 25.5788, lng: 91.8933 },
      { lat: 25.5720, lng: 91.9050 }
    ]
  },
  {
    id: 'rd-2',
    name: 'Old Valley Link Road (SH-4 Bypass)',
    status: 'ALTERNATIVE_ROUTE',
    riskLevel: 'LOW',
    blockageDetails: 'Designated safe corridor. Graded slope with culvert drainage operational.',
    coordinates: [
      { lat: 25.5920, lng: 91.8700 },
      { lat: 25.5810, lng: 91.8750 },
      { lat: 25.5650, lng: 91.8890 }
    ]
  },
  {
    id: 'rd-3',
    name: 'East Khasi Southern Arterial Access',
    status: 'VULNERABLE',
    riskLevel: 'HIGH',
    blockageDetails: 'Single lane traffic allowed under slow-speed safety escort.',
    coordinates: [
      { lat: 25.5600, lng: 91.8980 },
      { lat: 25.5510, lng: 91.9120 }
    ]
  }
];

let responsePriorityData: ResponsePriorityItem[] = [
  {
    id: 'p-1',
    targetName: 'East Khasi Village Cluster (Mawkdok & Wahkhen)',
    type: 'VILLAGE_CLUSTER',
    priorityLevel: 'CRITICAL',
    populationEstimate: 1420,
    suggestedAction: 'Deploy SDRF verification unit, ready community shelter at Higher Secondary School, issue VHF broadcast.',
    routeStatus: 'Alternative Valley Route SH-4 clear for 4x4 and emergency ambulances.'
  },
  {
    id: 'p-2',
    targetName: 'NH-106 Corridor Segment (Km 42 Escarpment)',
    type: 'ROAD_CORRIDOR',
    priorityLevel: 'HIGH',
    populationEstimate: 350,
    suggestedAction: 'Close lane to commercial transport, stage earthmoving excavator at Km 39 staging outpost.',
    routeStatus: 'NH-106 blocked between Km 40 and 44; detour via SH-4 valley road active.'
  },
  {
    id: 'p-3',
    targetName: 'Lower Valley Terrace Settlement (Umiew Basin)',
    type: 'SETTLEMENT',
    priorityLevel: 'MODERATE',
    populationEstimate: 680,
    suggestedAction: 'Monitor stream gauge and silt runout; keep local volunteer civil defense on standby.',
    routeStatus: 'Local road accessible.'
  },
  {
    id: 'p-4',
    targetName: 'Sub-Station & Telecommunication Tower 04',
    type: 'INFRASTRUCTURE',
    priorityLevel: 'HIGH',
    populationEstimate: 0,
    suggestedAction: 'Inspect foundation soil anchors and initiate protective sandbag berming.',
    routeStatus: 'Direct access restricted; foot inspection squad assigned.'
  }
];

// Clean Service Layer functions
export const api = {
  // Get all monitored risk zones
  getRiskZones: async (): Promise<RiskZone[]> => {
    // Simulated async API delay
    await new Promise((r) => setTimeout(r, 60));
    return [...riskZonesData];
  },

  // Get specific risk zone details
  getRiskDetails: async (id: string): Promise<RiskZone | null> => {
    await new Promise((r) => setTimeout(r, 40));
    const zone = riskZonesData.find((z) => z.id === id);
    return zone ? { ...zone } : null;
  },

  // Get all active and resolved alerts
  getAlerts: async (): Promise<AlertItem[]> => {
    await new Promise((r) => setTimeout(r, 50));
    return [...alertsData];
  },

  // Update alert status
  updateAlertStatus: async (id: string, status: AlertItem['status']): Promise<AlertItem | null> => {
    await new Promise((r) => setTimeout(r, 40));
    const idx = alertsData.findIndex((a) => a.id === id);
    if (idx !== -1) {
      alertsData[idx] = { ...alertsData[idx], status };
      return alertsData[idx];
    }
    return null;
  },

  // Get field verification reports
  getFieldReports: async (): Promise<FieldReport[]> => {
    await new Promise((r) => setTimeout(r, 50));
    return [...fieldReportsData];
  },

  // Create a new field report
  createFieldReport: async (report: Omit<FieldReport, 'id' | 'time' | 'date'>): Promise<FieldReport> => {
    await new Promise((r) => setTimeout(r, 80));
    const newReport: FieldReport = {
      ...report,
      id: `FR-${1043 + fieldReportsData.length}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Just now'
    };
    fieldReportsData = [newReport, ...fieldReportsData];
    return newReport;
  },

  // Update field report verification status
  updateFieldReportStatus: async (id: string, status: FieldReport['status']): Promise<FieldReport | null> => {
    await new Promise((r) => setTimeout(r, 50));
    const index = fieldReportsData.findIndex((r) => r.id === id);
    if (index !== -1) {
      fieldReportsData[index] = { ...fieldReportsData[index], status };
      return fieldReportsData[index];
    }
    return null;
  },

  // What-If deterministic simulation
  runRiskSimulation: async (
    rainfall: number,
    soilMoisture: number,
    zoneId: string = 'east-khasi-hills'
  ): Promise<SimulationResult> => {
    await new Promise((r) => setTimeout(r, 90));
    const baseZone = riskZonesData.find((z) => z.id === zoneId) || riskZonesData[0];
    
    // Deterministic simulation algorithm:
    // Base slope factor is fixed
    const baseSlopeFactor = (baseZone.slope / 45) * 28; // ~23.6 pts
    // Rainfall factor: normalized (50mm = 10pts, 186mm = 38pts, 300mm = 52pts)
    const rainfallFactor = Math.min(55, Math.max(5, (rainfall / 300) * 55));
    // Soil moisture factor: (20% = 5pts, 82% = 24pts, 100% = 30pts)
    const moistureFactor = Math.min(30, Math.max(5, (soilMoisture / 100) * 30));
    // Historical vulnerability factor
    const histFactor = (baseZone.historicalEventsCount / 10) * 12;

    const computedRaw = Math.round(rainfallFactor + moistureFactor + baseSlopeFactor * 0.7 + histFactor);
    const simulatedRisk = Math.min(99, Math.max(15, computedRaw));
    const riskChange = simulatedRisk - baseZone.riskScore;

    let simulatedLevel: RiskLevel = 'LOW';
    if (simulatedRisk >= 75) simulatedLevel = 'CRITICAL';
    else if (simulatedRisk >= 60) simulatedLevel = 'HIGH';
    else if (simulatedRisk >= 40) simulatedLevel = 'MODERATE';

    // Calculate secondary impact estimates
    let additionalZones = 0;
    let affectedRoads = 1;
    if (simulatedRisk >= 85) {
      additionalZones = 3;
      affectedRoads = 3;
    } else if (simulatedRisk >= 70) {
      additionalZones = 2;
      affectedRoads = 2;
    } else if (simulatedRisk >= 55) {
      additionalZones = 1;
      affectedRoads = 1;
    }

    let recommendedAction = 'Routine automated telemetry monitoring.';
    if (simulatedLevel === 'CRITICAL') {
      recommendedAction = 'Prepare high-priority early warning, mobilize field verification squad, and pre-position detour signage.';
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

  // Road segments status
  getRoadStatus: async (): Promise<RoadSegment[]> => {
    await new Promise((r) => setTimeout(r, 40));
    return [...roadSegmentsData];
  },

  // Response priorities & route planning
  getResponsePriority: async (): Promise<ResponsePriorityItem[]> => {
    await new Promise((r) => setTimeout(r, 40));
    return [...responsePriorityData];
  },

  // Generate automated response plan
  generateResponsePlan: async (zoneId: string) => {
    await new Promise((r) => setTimeout(r, 120));
    const zone = riskZonesData.find((z) => z.id === zoneId) || riskZonesData[0];
    return {
      generatedAt: new Date().toLocaleTimeString(),
      zoneName: zone.name,
      priorityTarget: 'East Khasi Village Cluster (Mawkdok & Wahkhen)',
      suggestedAction: 'Deploy field verification team (SDRF Team Bravo) & pre-position heavy earthmover at Km 39 staging depot.',
      routeStatus: 'Alternative route available (SH-4 Valley Link bypass clear for emergency vehicles). NH-106 main ridge cut closed.',
      evacuationReadiness: 'High Priority (Standby Notice issued to 3 village councils)',
      logistics: [
        { item: 'SDRF Rapid Response Team', status: 'Mobilized', ETA: '25 min' },
        { item: 'Traffic Diversion at Cherra Cut', status: 'Active', ETA: 'Enforced' },
        { item: 'Emergency VHF Repeater', status: 'Online', ETA: 'Operational' }
      ]
    };
  },

  // Model metrics card
  getModelMetrics: async () => {
    await new Promise((r) => setTimeout(r, 30));
    return {
      modelName: 'Random Forest Baseline',
      modelType: 'Ensemble Decision Trees (Prototype Baseline)',
      featureCount: 6,
      trainingStatus: 'Prototype Baseline / Simulation Mode',
      disclaimer: 'Metrics will be populated after model training and validation against verified Geological Survey of India (GSI) and IMD regional datasets.',
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
      ],
      roadmapPhases: [
        { phase: 'Phase 1', title: 'Baseline risk model', desc: 'Rule-informed tabular Random Forest baseline with regional rainfall and slope features.' },
        { phase: 'Phase 2', title: 'Satellite computer vision', desc: 'Sentinel-2 and Cartosat-3 optical/SAR surface displacement & vegetation index anomaly detection.' },
        { phase: 'Phase 3', title: 'Multimodal fusion', desc: 'Deep learning fusion of rainfall telemetry, DEM elevation models, and SAR interferometry.' },
        { phase: 'Phase 4', title: 'Explainable AI', desc: 'Integrated SHAP/TreeSHAP local feature attribution and operational uncertainty intervals.' },
        { phase: 'Phase 5', title: 'Live weather + IoT', desc: 'Direct ingestion of IMD Doppler radar grids and ground piezometer/tiltmeter arrays.' },
        { phase: 'Phase 6', title: 'Segmentation + uncertainty', desc: 'Slope-unit spatial segmentation with Bayesian epistemic risk confidence bounds.' },
        { phase: 'Phase 7', title: 'Continuous learning', desc: 'Human-in-the-loop active learning fine-tuned on verified field officer damage reports.' }
      ]
    };
  }
};
