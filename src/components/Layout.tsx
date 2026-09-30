import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ToastContainer } from './ToastContainer';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'NER Landslide Risk Command Center',
          subtitle: 'Multi-hazard spatial surveillance and situational awareness'
        };
      case '/simulator':
        return {
          title: 'Risk Intelligence • What-If Stress Simulator',
          subtitle: 'Interactive sensitivity exploration for precipitation & pore-water parameters'
        };
      case '/alerts':
        return {
          title: 'Early Warning Center & CAP Dispatch',
          subtitle: 'Active hazard advisories and multi-stakeholder alert management'
        };
      case '/field-reports':
        return {
          title: 'Field & Ground Verification Console',
          subtitle: 'Human-in-the-loop ground truth ingestion and geotagged photographic verification'
        };
      case '/response':
        return {
          title: 'Response & Route Intelligence Desk',
          subtitle: 'Tactical evacuation route optimization, roadblock management, and resource staging'
        };
      case '/model':
        return {
          title: 'Model & System Intelligence Matrix',
          subtitle: 'Decision pipeline architecture, Random Forest baseline, and AI evolution roadmap'
        };
      default:
        if (location.pathname.startsWith('/location/')) {
          return {
            title: 'Location Intelligence & Contributing Factor Breakdown',
            subtitle: 'Micro-watershed geotechnical risk factors and satellite anomaly detection'
          };
        }
        return {
          title: 'GeoGuard NER Command Platform',
          subtitle: 'AI-Based Early Warning & Landslide Risk Monitoring System'
        };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col antialiased">
      {/* Persistent Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Area (offset by sidebar width on lg+ screens) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Topbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Floating Toast Alerts */}
        <ToastContainer />
      </div>
    </div>
  );
};
