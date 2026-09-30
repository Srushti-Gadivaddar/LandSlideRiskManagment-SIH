# GeoGuard NER • AI-Based Early Warning & Landslide Risk Monitoring System
> **Smart India Hackathon (SIH) 2026 Prototype**  
> **Problem Statement ID (PSID):** 260001  
> **Target Region:** North Eastern Region (NER) of India  
> **Core Architecture:** SENSE → ANALYSE → PREDICT → EXPLAIN → ALERT → VERIFY → PRIORITISE → LEARN

---

## 🏔️ 1. Executive Summary & Problem Context

The **North Eastern Region (NER) of India** (Meghalaya, Mizoram, Manipur, Arunachal Pradesh, Sikkim, Nagaland, Assam) faces frequent, devastating landslides, slope failures, flash floods, and national highway blockages triggered by intense monsoonal downpours, high pore-water saturation, fragile tectonic stratigraphy, and steep topography.

**GeoGuard NER** is a next-generation, high-density disaster management command center prototype designed for **District Disaster Management Authorities (DDMA)**, **State Disaster Management Authorities (SDMA)**, road agencies (**NHIDCL / BRO**), and emergency first responders.

The platform provides **AI-assisted decision support** rather than claiming 100% autonomous prediction, combining:
- Multi-source spatial inputs (Rainfall telemetry, Soil moisture saturation, DEM slope gradients, Historical landslide events)
- Interactive GIS situational awareness mapping
- Explainable feature attribution (interpretable contribution breakdowns)
- What-If environmental stress simulation
- Geotagged ground truth reporting (human-in-the-loop field officer verification)
- Evacuation priority ranking & safe detour route planning
- 7-Phase modular roadmap for scaling to multimodal satellite SAR and live IoT telemetry

---

## 🚀 2. Live Application Routes & Feature Tour

| Route | View | Description |
|---|---|---|
| `/login` | **Official Command Portal Sign In** | Official authentication screen with district credential inputs, security badges, and direct launch into the operations room. |
| `/dashboard` | **Command Center Console** | Regional GIS map (Leaflet + OpenStreetMap) with pulsing critical markers, 4 Top KPIs (High Risk Zones: 18, Critical: 6, Active Alerts: 7, Field Reports: 24), Current Conditions panel, and clickable high-priority locations. |
| `/location/:id` | **Location Intelligence** | Deep-dive telemetry for specific sectors (e.g. East Khasi Hills at 82/100 Critical risk), explainable factor contributions (Rainfall 42%, Slope 28%, Soil Moisture 18%, Historical 12%), side-by-side Before/Current satellite terrain anomaly comparison, and operational recommendations. |
| `/simulator` | **Risk Intelligence (What-If Simulator)** | Interactive sensitivity sliders for Rainfall (50 - 300 mm) and Soil Moisture (20 - 100%) with locked slope, real-time deterministic risk re-calculation, risk change delta (+9), affected road counts, and Recharts baseline comparison. |
| `/alerts` | **Early Warning Center** | CAP-compliant multi-stakeholder alert cards with filters (All, Critical, High, Moderate, Resolved), escalation controls, and Warning Preview drawer with test broadcast simulation. |
| `/field-reports` | **Field & Ground Verification Console** | Interactive ground markers map, photographic & video evidence cards, status workflows (Under Verification → Verified → Escalated → Resolved), and `[+ New Field Report]` geotagged submission modal. |
| `/response` | **Response & Route Intelligence** | Tactical GIS route map showing high-risk escarpments (red), affected valleys (orange), designated safer detour routes (emerald green SH-4 bypass), roadblocks, settlements, and automated Response Plan generator. |
| `/model` | **Model & System Intelligence** | Multi-layer ingestion architecture diagram, Random Forest prototype baseline model card (with strict validation notice), capability status matrix, and 7-phase AI evolution roadmap. |

---

## 🧭 3. 15-Step Hackathon Demonstration Storyline

For a **3 to 4 minute demonstration video or live jury presentation**, follow this exact user journey:

1. **Step 1: Sign In (`/login`)**  
   Review the official SIH 2026 PSID: 260001 briefing, click **Sign In** with preloaded district authority credentials.
2. **Step 2: Command Center (`/dashboard`)**  
   Inspect the regional GIS multi-hazard map of North Eastern India. Point out the top 4 KPIs and the live status indicators.
3. **Step 3: Identify Critical Escarpment Zone**  
   Observe the pulsing red marker on **East Khasi Hills** (Score: 82/100 • Critical).
4. **Step 4: Drill Down to Location Intelligence (`/location/east-khasi-hills`)**  
   Click the zone marker or the "Analyze" button to open detailed sector intelligence.
5. **Step 5: Inspect Explainability Factor Attribution**  
   Review the "Why is the Risk High?" breakdown: Recent rainfall (42%), Slope (28%), Soil moisture saturation (18%), and Historical events (12%).
6. **Step 6: Review Simulated Satellite Anomaly Detection**  
   Examine the Before vs Current terrain panels with the highlighted red detachment ROI and NDVI loss indicators.
7. **Step 7: Launch What-If Simulator (`/simulator`)**  
   Navigate to Risk Intelligence to test extreme precipitation scenarios.
8. **Step 8: Simulate Extreme Weather Stress**  
   Drag the Rainfall slider from 186 mm up to 260 mm and click **RUN SIMULATION**.
9. **Step 9: Review Simulated Risk Delta**  
   Witness the risk score climb to 91 (+9 pts), increasing additional affected zones (+3) and road segments (+2).
10. **Step 10: Dispatch Early Warning (`/alerts`)**  
    Open Early Warnings, select the Critical Alert for East Khasi Hills, and click **Preview & Send**.
11. **Step 11: Execute Test Early Warning Broadcast**  
    Click **SEND TEST ALERT** and observe the real-time operational toast notification confirming queued broadcast to the DDMA, SDRF, and Village Council.
12. **Step 12: Ingest Ground Truth (`/field-reports`)**  
    Navigate to Field Reports. Click **[+ New Field Report]**, use the auto-fill coordinates button to geotag a tension crack, and click **Submit Report**.
13. **Step 13: Verify Ground Evidence**  
    Click **Verify** on Report #FR-1042 to validate field officer evidence into the training loop.
14. **Step 14: Route & Response Planning (`/response`)**  
    View the blocked NH-106 corridor, examine the alternative green SH-4 bypass, and click **Generate Response Plan** to generate deployment orders.
15. **Step 15: AI Evolution Architecture (`/model`)**  
    Review the end-to-end ingestion pipeline, inspect the baseline Random Forest model card, and conclude with the 7-phase future roadmap.

---

## 🛠️ 4. Technical Architecture

- **Frontend Core:** React 19, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS v4, Custom Palantir/Command Center dark palette (`#07111F`, `#0B1728`, `#101D2E`, subtle borders `#1E2E44`, Cyan `#06B6D4`, Violet `#8B5CF6`)
- **Interactive Mapping (GIS):** Leaflet, React Leaflet, OpenStreetMap / CartoDB dark basemaps with tactical SVG DivIcons and pulsing circle buffers
- **Data Visualizations:** Recharts (responsive bar charts, risk delta comparisons)
- **Icons:** Lucide React
- **Service Layer:** `src/services/api.ts` with clean decoupled mock interfaces designed for direct drop-in replacement with production REST/GraphQL backends.

---

## 💻 5. Local Setup & Execution

### Prerequisites
- Node.js (v18 or higher, tested on v24)
- npm (v9 or higher)

### Run in Development Mode
```bash
# Clone or navigate to the directory
cd landSlide-sih

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

Open your browser at:  
👉 **`http://localhost:5173/`**

### Build for Production
```bash
npm run build
npm run preview
```

---

## ⚖️ 6. Hackathon Disclaimer & Transparency Notice

> **Prototype Notice:** GeoGuard NER is an educational and operational prototype developed for Smart India Hackathon 2026. Environmental readings, satellite comparisons, and sensor counts use simulated baseline data designed to showcase real-world operational flows. Live government feeds (IMD, GSI, NRSC/ISRO) and validated machine learning models are slated for deployment in subsequent roadmap phases.
