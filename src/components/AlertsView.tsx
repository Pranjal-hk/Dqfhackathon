import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MonitorAlertCard } from './MonitorAlertCard';
import { MonitorAlertsDetail } from './MonitorAlertsDetail';
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

const mockAlerts: Alert[] = [
  {
    id: 'a1',
    monitorId: '1',
    monitorName: 'Customer Data Quality',
    table: 'customers',
    database: 'production_db',
    checkName: 'Null Check - Email',
    severity: 'high',
    status: 'open',
    message: 'Email column has 150 null values exceeding threshold',
    timestamp: '10 minutes ago',
    affectedRows: 150,
    threshold: '< 1%',
    actualValue: '1.5%'
  },
  {
    id: 'a2',
    monitorId: '1',
    monitorName: 'Customer Data Quality',
    table: 'customers',
    database: 'production_db',
    checkName: 'Format Validation - Phone',
    severity: 'medium',
    status: 'open',
    message: 'Phone numbers not matching expected format',
    timestamp: '25 minutes ago',
    affectedRows: 320,
    threshold: '> 98%',
    actualValue: '96.8%'
  },
  {
    id: 'a3',
    monitorId: '2',
    monitorName: 'Transaction Integrity',
    table: 'transactions',
    database: 'production_db',
    checkName: 'Referential Integrity',
    severity: 'critical',
    status: 'open',
    message: 'Foreign key violations detected in transaction records',
    timestamp: '5 minutes ago',
    affectedRows: 45,
    threshold: '100%',
    actualValue: '99.5%'
  },
  {
    id: 'a4',
    monitorId: '2',
    monitorName: 'Transaction Integrity',
    table: 'transactions',
    database: 'production_db',
    checkName: 'Range Check - Amount',
    severity: 'high',
    status: 'acknowledged',
    message: 'Transaction amounts outside acceptable range',
    timestamp: '1 hour ago',
    affectedRows: 12,
    threshold: '> 0',
    actualValue: '-12 records'
  },
  {
    id: 'a5',
    monitorId: '4',
    monitorName: 'User Activity Logs',
    table: 'activity_logs',
    database: 'analytics_db',
    checkName: 'Timestamp Validation',
    severity: 'low',
    status: 'resolved',
    message: 'Timestamp format inconsistencies found',
    timestamp: '2 hours ago',
    affectedRows: 8,
    threshold: '100%',
    actualValue: '99.9%'
  }
];

// Group alerts by monitor
const groupAlertsByMonitor = (alerts: Alert[]): MonitorWithAlerts[] => {
  const grouped = alerts.reduce((acc, alert) => {
    if (!acc[alert.monitorId]) {
      acc[alert.monitorId] = {
        monitorId: alert.monitorId,
        monitorName: alert.monitorName,
        table: alert.table,
        database: alert.database,
        alerts: []
      };
    }
    acc[alert.monitorId].alerts.push(alert);
    return acc;
  }, {} as Record<string, { monitorId: string; monitorName: string; table: string; database: string; alerts: Alert[] }>);

  return Object.values(grouped).map(group => ({
    monitorId: group.monitorId,
    monitorName: group.monitorName,
    table: group.table,
    database: group.database,
    alertCount: group.alerts.length,
    criticalCount: group.alerts.filter(a => a.severity === 'critical').length,
    highCount: group.alerts.filter(a => a.severity === 'high').length,
    lastAlert: group.alerts.sort((a, b) => {
      // Sort by timestamp (most recent first)
      return 0; // Simplified for mock data
    })[0].timestamp
  }));
};

export function AlertsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonitorId, setSelectedMonitorId] = useState<string | null>(null);

  const monitorsWithAlerts = groupAlertsByMonitor(mockAlerts);
  
  const filteredMonitors = monitorsWithAlerts.filter(monitor =>
    monitor.monitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monitor.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monitor.database.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedMonitorId) {
    const selectedMonitor = monitorsWithAlerts.find(m => m.monitorId === selectedMonitorId);
    const monitorAlerts = mockAlerts.filter(a => a.monitorId === selectedMonitorId);
    
    if (selectedMonitor) {
      return (
        <MonitorAlertsDetail
          monitor={selectedMonitor}
          alerts={monitorAlerts}
          onBack={() => setSelectedMonitorId(null)}
        />
      );
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">Alerts</h1>
            <p className="text-gray-500">Monitor and manage data quality alerts</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search monitors with alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredMonitors.map(monitor => (
            <MonitorAlertCard
              key={monitor.monitorId}
              monitor={monitor}
              onClick={() => setSelectedMonitorId(monitor.monitorId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
