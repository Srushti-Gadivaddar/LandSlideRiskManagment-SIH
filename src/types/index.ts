export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RiskZone {
  id: string;
  name: string;
  state: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  confidence: number; // percentage
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  rainfall24h: number; // mm
  rainfallChangePercent: number;
  soilMoisture: number; // percentage
  slope: number; // degrees
  historicalEventsCount: number;
  activeSensors: string; // e.g. "24 / 27"
  coordinates: Coordinates;
  boundsRadius: number; // meters for circle display
  description: string;
  contributingFactors: {
    factor: string;
    percentage: number;
    description: string;
  }[];
  nearbyVillagesCount: number;
  criticalRoadsCount: number;
  infrastructureCount: number;
  lastUpdated: string;
}

export interface AlertItem {
  id: string;
  zoneId: string;
  region: string;
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  trigger: string[];
  recommendedAction: string;
  recipients: string[];
  timestamp: string;
  status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED';
}

export type ObservationType = 
  | 'Slope crack'
  | 'Blocked road'
  | 'Water accumulation'
  | 'Possible landslide'
  | 'Landslide'
  | 'Infrastructure damage'
  | 'Soil movement';

export interface FieldReport {
  id: string;
  zoneId: string;
  locationName: string;
  reportedBy: string;
  time: string;
  date: string;
  observationType: ObservationType;
  description: string;
  evidence: {
    photos: number;
    videos: number;
  };
  gps: {
    lat: number;
    lng: number;
    accuracyMeters: number;
  };
  status: 'UNDER VERIFICATION' | 'VERIFIED' | 'ESCALATED' | 'RESOLVED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface SimulationResult {
  currentRisk: number;
  simulatedRisk: number;
  riskChange: number;
  simulatedLevel: RiskLevel;
  additionalAffectedZones: number;
  potentiallyAffectedRoadSegments: number;
  recommendedAction: string;
  breakdown: {
    factor: string;
    currentValue: number;
    simulatedValue: number;
    unit: string;
  }[];
}

export interface RoadSegment {
  id: string;
  name: string;
  status: 'OPEN' | 'VULNERABLE' | 'BLOCKED' | 'ALTERNATIVE_ROUTE';
  riskLevel: RiskLevel;
  coordinates: Coordinates[];
  blockageDetails?: string;
}

export interface ResponsePriorityItem {
  id: string;
  targetName: string;
  type: 'VILLAGE_CLUSTER' | 'ROAD_CORRIDOR' | 'SETTLEMENT' | 'INFRASTRUCTURE';
  priorityLevel: RiskLevel;
  populationEstimate: number;
  suggestedAction: string;
  routeStatus: string;
}
