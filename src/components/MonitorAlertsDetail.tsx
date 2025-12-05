import { ArrowLeft, Database, Table } from 'lucide-react';
import { Button } from './ui/button';
import { AlertCard } from './AlertCard';
import { AlertDetailDialog } from './AlertDetailDialog';
import { useState } from 'react';
import type { Alert } from '../App';

interface MonitorWithAlerts {
  monitorId: string;
  monitorName: string;
  table: string;
  database: string;
  alertCount: number;
  criticalCount: number;
  highCount: number;
  lastAlert: string;
}

interface MonitorAlertsDetailProps {
  monitor: MonitorWithAlerts;
  alerts: Alert[];
  onBack: () => void;
}

export function MonitorAlertsDetail({ monitor, alerts, onBack }: MonitorAlertsDetailProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const openAlerts = alerts.filter(a => a.status === 'open');
  const acknowledgedAlerts = alerts.filter(a => a.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Alerts
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">{monitor.monitorName}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                <span>{monitor.database}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Table className="w-4 h-4" />
                <span>{monitor.table}</span>
              </div>
              <span>•</span>
              <span>{monitor.alertCount} active alert{monitor.alertCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        {openAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">Open Alerts ({openAlerts.length})</h2>
            <div className="space-y-3">
              {openAlerts.map(alert => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                />
              ))}
            </div>
          </div>
        )}

        {acknowledgedAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">Acknowledged Alerts ({acknowledgedAlerts.length})</h2>
            <div className="space-y-3">
              {acknowledgedAlerts.map(alert => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                />
              ))}
            </div>
          </div>
        )}

        {resolvedAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">Resolved Alerts ({resolvedAlerts.length})</h2>
            <div className="space-y-3">
              {resolvedAlerts.map(alert => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AlertDetailDialog
        alert={selectedAlert}
        open={selectedAlert !== null}
        onOpenChange={(open) => !open && setSelectedAlert(null)}
      />
    </div>
  );
}
