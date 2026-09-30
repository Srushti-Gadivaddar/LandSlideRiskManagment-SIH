import type {
  RiskZone,
  AlertItem,
  FieldReport,
  RoadSegment,
  ResponsePriorityItem,
  SatelliteAnalysis,
  CommunityAlertTemplate
} from '../types';

export const initialRiskZones: RiskZone[] = [
  {
    id: 'east-khasi-hills',
    name: 'East Khasi Hills',
    state: 'Meghalaya',
    district: 'East Khasi Hills District',
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
    coordinates: { lat: 25.5788, lng: 91.8933 },
    boundsRadius: 18000,
    description: 'High precipitation plateau edge with deep gorges and fragile shale-sandstone strata along the NH-106 corridor.',
    contributingFactors: [
      { factor: 'Recent Rainfall', level: 'High', percentage: 42, description: '186 mm cumulative 24h precipitation (+34% above seasonal threshold)' },
      { factor: 'Slope Gradient', level: 'High', percentage: 28, description: 'Steep escarpment angles averaging 38° with unconsolidated topsoil' },
      { factor: 'Soil Moisture', level: 'High', percentage: 18, description: 'Pore-water pressure elevated at 82% volumetric water content' },
      { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 12, description: '7 prior slope failures recorded within 5km radius over last decade' }
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
    district: 'Churachandpur District',
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
    description: 'Hilly terrain with weathered clay-shale strata experiencing continuous monsoon downpours.',
    contributingFactors: [
      { factor: 'Recent Rainfall', level: 'High', percentage: 38, description: 'Continuous precipitation over past 48 hours' },
      { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 26, description: 'Active slide scars along arterial hill cuts' },
      { factor: 'Soil Moisture', level: 'High', percentage: 21, description: 'Elevated moisture levels causing reduced shear strength' },
      { factor: 'Slope Gradient', level: 'Moderate', percentage: 15, description: 'Moderate-steep slope averaging 32°' }
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
    district: 'Aizawl District',
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
      { factor: 'Slope Gradient', level: 'High', percentage: 35, description: 'Very steep valley cuts flanking residential areas' },
      { factor: 'Recent Rainfall', level: 'High', percentage: 30, description: '142 mm persistent rainfall' },
      { factor: 'Soil Moisture', level: 'Moderate', percentage: 20, description: 'Water saturation in loose silt loam' },
      { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 15, description: 'Frequent minor slips along bypass routes' }
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
    district: 'Tawang District',
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
      { factor: 'Slope Gradient', level: 'Moderate', percentage: 34, description: 'Alpine high-angle slopes with freeze-thaw weathering' },
      { factor: 'Recent Rainfall', level: 'Moderate', percentage: 28, description: '98 mm mixed precipitation' },
      { factor: 'Soil Moisture', level: 'Moderate', percentage: 22, description: 'Moderate saturation from melt runoff' },
      { factor: 'Historical Susceptibility', level: 'Low', percentage: 16, description: 'Occasional seasonal rockfalls' }
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
    district: 'East Sikkim District',
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
      { factor: 'Slope Gradient', level: 'Moderate', percentage: 36, description: 'Steep hill terraces' },
      { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 26, description: 'Historical slope instability zones' },
      { factor: 'Recent Rainfall', level: 'Low', percentage: 22, description: '84 mm light to moderate rain' },
      { factor: 'Soil Moisture', level: 'Low', percentage: 16, description: 'Stable drainage retention' }
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
    district: 'Kohima District',
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
      { factor: 'Slope Gradient', level: 'Moderate', percentage: 40, description: 'Moderate ridge slope' },
      { factor: 'Soil Moisture', level: 'Low', percentage: 25, description: 'Below critical saturation threshold' },
      { factor: 'Recent Rainfall', level: 'Low', percentage: 20, description: '62 mm scattered showers' },
      { factor: 'Historical Susceptibility', level: 'Low', percentage: 15, description: 'Low historical activity in this quadrant' }
    ],
    nearbyVillagesCount: 0,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '31 min ago'
  },
  {
    id: 'haflong-slope',
    name: 'Haflong Slope',
    state: 'Assam',
    district: 'Dima Hasao District',
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
      { factor: 'Slope Gradient', level: 'Moderate', percentage: 38, description: 'Gentle-to-moderate valley slope' },
      { factor: 'Historical Susceptibility', level: 'Moderate', percentage: 27, description: 'Previous monsoon washouts mitigated' },
      { factor: 'Recent Rainfall', level: 'Low', percentage: 20, description: '48 mm intermittent drizzle' },
      { factor: 'Soil Moisture', level: 'Low', percentage: 15, description: 'Optimal pore-pressure dissipation' }
    ],
    nearbyVillagesCount: 0,
    criticalRoadsCount: 1,
    infrastructureCount: 0,
    lastUpdated: '40 min ago'
  }
];

export const initialAlerts: AlertItem[] = [
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

export const initialFieldReports: FieldReport[] = [
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

export const satelliteAnalysisData: Record<string, SatelliteAnalysis> = {
  'east-khasi-hills': {
    zoneId: 'east-khasi-hills',
    locationName: 'East Khasi Hills Escarpment Sector',
    captureDate: 'Today, 06:14 UTC',
    baselineDate: '30 Days Prior (Cloud-Free Baseline)',
    sensor: 'Sentinel-2 MSI (Optical 10m) + Sentinel-1 SAR (C-Band Interferometry)',
    terrainChange: 'High',
    landslideEvidence: 'Moderate',
    suspectedAreaHectares: 3.4,
    ndviDeltaPercent: -48,
    displacementMm: 38,
    summary: 'Localized optical reflectance anomaly and line-of-sight interferometric coherence loss detected along the NH-106 slope shoulder, indicating surface displacement and vegetation stripping.'
  }
};

export const communityAlertTemplates: Record<SupportedLanguage, CommunityAlertTemplate> = {
  English: {
    language: 'English',
    langNative: 'English',
    title: '⚠️ CRITICAL LANDSLIDE RISK WARNING',
    body: 'High landslide risk detected in the East Khasi Hills (NH-106 corridor) following extreme rainfall and slope saturation. Avoid vulnerable slope edges, stay alert along highway cuts, and follow official evacuation advisories.',
    smsPreview: 'ALERT: DDMA East Khasi Hills warns of high landslide risk near NH-106. Avoid steep slope corridors. Emergency Contact: 1077.',
    advisory: 'Issued by District Disaster Management Authority (DDMA) • For immediate broadcast'
  },
  Hindi: {
    language: 'Hindi',
    langNative: 'हिन्दी',
    title: '⚠️ गंभीर भूस्खलन चेतावनी',
    body: 'अत्यधिक वर्षा और ढलान संतृप्ति के बाद पूर्वी खासी हिल्स (NH-106 कॉरिडोर) में उच्च भूस्खलन जोखिम का पता चला है। संवेदनशील पहाड़ी ढलानों से दूर रहें और आधिकारिक सुरक्षा निर्देशों का पालन करें।',
    smsPreview: 'चेतावनी: डीडीएमए पूर्वी खासी हिल्स द्वारा एनएच-106 के पास भूस्खलन का उच्च जोखिम। ढलानों से दूर रहें। हेल्पलाइन: 1077.',
    advisory: 'जिला आपदा प्रबंधन प्राधिकरण (डीडीएमए) द्वारा जारी'
  },
  Assamese: {
    language: 'Assamese',
    langNative: 'অসমীয়া',
    title: '⚠️ সংকটজনক ভূমিস্খলন সতৰ্কবাৰ্তা',
    body: 'প্ৰচণ্ড বৰষুণৰ ফলত পূব খাচী পাহাৰ (NH-106 কৰিডৰ) অঞ্চলত ভয়াৱহ ভূমিস্খলনৰ সম্ভাৱনা ধৰা পৰিছে। পাহাৰীয়া ঢাল আৰু বিপজ্জনক পথৰ পৰা আঁতৰি থাকক আৰু জিলা প্ৰশাসনৰ নিৰ্দেশনা অনুসৰণ কৰক।',
    smsPreview: 'সতৰ্কবাৰ্তা: পূব খাচী পাহাৰত এনএইচ-১০৬ পথত ভূমিস্খলনৰ আশংকা। সতৰ্ক থাকক। জৰুৰী যোগাযোগ: ১০৭৭।',
    advisory: 'জিলা দুৰ্যোগ ব্যৱস্থাপনা কৰ্তৃপক্ষ (DDMA) দ্বাৰা প্ৰেৰিত'
  },
  Khasi: {
    language: 'Khasi',
    langNative: 'Ka Ktien Khasi',
    title: '⚠️ JINGMAHAM JINGTWA KA KHYNDEW',
    body: 'Ka don ka jingma kaba jur na ka jingtwa khyndew ha kylleng ka East Khasi Hills (NH-106) namar ka jinghap slap kaba jur. Ki paidbah ki dei ban kiar na ki jaka riat bad bud ia ki jingbthah jong ka District Authority.',
    smsPreview: 'JINGMAHAM: Ka jingma na ka jingtwa khyndew ha East Khasi Hills hajan NH-106. Kiar na ki jaka riat. Emergency: 1077.',
    advisory: 'Pynbna da ka District Disaster Management Authority (DDMA)'
  },
  Mizo: {
    language: 'Mizo',
    langNative: 'Mizo ṭawng',
    title: '⚠️ LEIMIN HLUAWHNA CHENG VEL',
    body: 'Ruah sur nasat avangin East Khasi Hills (NH-106 kawngpui) chhehvelah leimin hlauhawm tak hmuhchhuah a ni. Khawchhak lam tlangpang leh hmun hlauhawmte hlat ula, official hriattirna ngaichang ang che u.',
    smsPreview: 'ALERT: East Khasi Hills NH-106 kawngpuiah leimin hlauhawm a awm. Tlangpang hlat rawh u. Emergency: 1077.',
    advisory: 'District Disaster Management Authority (DDMA) hriattirna'
  },
  Manipuri: {
    language: 'Manipuri',
    langNative: 'মৈতৈলোন্',
    title: '⚠️ অকনবা চীংমায় কায়বগী চেকশিন-ৱাফম',
    body: 'অকনবা নোং চুবদগী ইষ্ট খাসি হিল্স (NH-106 লম্বী) লমদমদা চীংমায় কায়বগী অকনবা অশোই-অঙাম থোকপগী খুদোংথিবা লৈরে। চীংমায় ময়াদা লৈবা য়ুমশিং অমসুং লম্বীশিং চৎপদা চেকশিনগদবনি।',
    smsPreview: 'চেকশিন-ৱাফম: ইষ্ট খাসি হিল্স NH-106 দা চীং কায়বগী খুদোংথিবা লৈ। চেকশিন্না লৈবীয়ু। ইমার্জেন্সী: 1077।',
    advisory: 'ডিষ্ট্রিক্ট ডিজাষ্টর ম্যানেজমেন্ট ওথোরিটিনা থাদোকপা'
  }
};

export const roadSegmentsData: RoadSegment[] = [
  {
    id: 'rd-1',
    name: 'NH-106 Primary Ridge Road (Km 38 - 46)',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    blockageDetails: 'High probability of active slope detachment; precautionary vehicle diversion enforced.',
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

export const responsePriorityData: ResponsePriorityItem[] = [
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
