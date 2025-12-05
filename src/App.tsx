import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MonitorsView } from './components/MonitorsView';
import { MonitorDetail } from './components/MonitorDetail';
import { IntegrationsView } from './components/IntegrationsView';
import { AlertsView } from './components/AlertsView';

export interface QualityCheck {
  id: string;
  name: string;
  type: string;
  status: 'passing' | 'failing' | 'warning';
  lastRun: string;
  description: string;
  threshold?: string;
}

export interface Monitor {
  id: string;
  name: string;
  table: string;
  database: string;
  status: 'active' | 'inactive' | 'error';
  lastRun: string;
  checks: QualityCheck[];
  passRate: number;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'error' | 'syncing';
  lastSync: string;
  recordsSynced: number;
  icon: string;
}

export interface Alert {
  id: string;
  monitorId: string;
  monitorName: string;
  table: string;
  database: string;
  checkName: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'resolved' | 'acknowledged';
  message: string;
  timestamp: string;
  affectedRows: number;
  threshold: string;
  actualValue: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'monitors' | 'integrations' | 'alerts'>('monitors');
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {currentView === 'monitors' ? (
          selectedMonitor ? (
            <MonitorDetail 
              monitor={selectedMonitor} 
              onBack={() => setSelectedMonitor(null)}
            />
          ) : (
            <MonitorsView onSelectMonitor={setSelectedMonitor} />
          )
        ) : currentView === 'integrations' ? (
          <IntegrationsView />
        ) : (
          <AlertsView />
        )}
      </main>
    </div>
  );
}