import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RiskZone, AlertItem, FieldReport } from '../types';
import { api } from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  login: (id: string) => void;
  logout: () => void;
  riskZones: RiskZone[];
  alerts: AlertItem[];
  fieldReports: FieldReport[];
  isLoading: boolean;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  addNewReport: (report: Omit<FieldReport, 'id' | 'time' | 'date'>) => Promise<FieldReport>;
  updateReportStatus: (id: string, status: FieldReport['status']) => Promise<void>;
  updateAlertStatus: (id: string, status: AlertItem['status']) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default authenticated for ease of hackathon demo inspection
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [fieldReports, setFieldReports] = useState<FieldReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [zones, alts, reports] = await Promise.all([
        api.getRiskZones(),
        api.getAlerts(),
        api.getFieldReports()
      ]);
      setRiskZones(zones);
      setAlerts(alts);
      setFieldReports(reports);
    } catch (err) {
      console.error('Failed to load initial data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const login = (id: string) => {
    setIsAuthenticated(true);
    addToast('Authenticated', `Session initialized for official ID: ${id || 'NER-DDMA-04'}`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast('Signed Out', 'Disaster command session concluded.', 'info');
  };

  const addNewReport = async (reportData: Omit<FieldReport, 'id' | 'time' | 'date'>) => {
    const created = await api.createFieldReport(reportData);
    setFieldReports((prev) => [created, ...prev]);
    addToast('Report Logged', `Field report #${created.id} submitted with GPS coordinates.`, 'success');
    return created;
  };

  const updateReportStatus = async (id: string, status: FieldReport['status']) => {
    await api.updateFieldReportStatus(id, status);
    setFieldReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addToast('Verification Updated', `Report #${id} marked as ${status}.`, 'info');
  };

  const updateAlertStatus = async (id: string, status: AlertItem['status']) => {
    await api.updateAlertStatus(id, status);
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    addToast('Alert Status Updated', `Alert ${id} updated to ${status}.`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        riskZones,
        alerts,
        fieldReports,
        isLoading,
        toasts,
        addToast,
        removeToast,
        addNewReport,
        updateReportStatus,
        updateAlertStatus,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
