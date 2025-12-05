import { AlertTriangle, Database, Table, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

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

interface MonitorAlertCardProps {
  monitor: MonitorWithAlerts;
  onClick: () => void;
}

export function MonitorAlertCard({ monitor, onClick }: MonitorAlertCardProps) {
  return (
    <Card 
      className="p-5 hover:shadow-md transition-all cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{monitor.monitorName}</h3>
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              <span>{monitor.database}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Table className="w-3.5 h-3.5" />
              <span>{monitor.table}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <Badge className="bg-red-100 text-red-700 border border-red-200">
            {monitor.alertCount} Alert{monitor.alertCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {monitor.criticalCount > 0 && (
            <Badge className="bg-red-100 text-red-700 border border-red-200">
              {monitor.criticalCount} Critical
            </Badge>
          )}
          {monitor.highCount > 0 && (
            <Badge className="bg-orange-100 text-orange-700 border border-orange-200">
              {monitor.highCount} High
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last alert: {monitor.lastAlert}</span>
          </div>
          <span className="text-blue-600 hover:text-blue-700">View alerts →</span>
        </div>
      </div>
    </Card>
  );
}
