import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LocationDetail } from './pages/LocationDetail';
import { Simulator } from './pages/Simulator';
import { Alerts } from './pages/Alerts';
import { FieldReports } from './pages/FieldReports';
import { ResponsePlanning } from './pages/ResponsePlanning';
import { ModelIntelligence } from './pages/ModelIntelligence';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Main Authenticated Command Center Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/field-reports" element={<FieldReports />} />
            <Route path="/response" element={<ResponsePlanning />} />
            <Route path="/model" element={<ModelIntelligence />} />
            {/* Fallback default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
