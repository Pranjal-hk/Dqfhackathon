import { CheckCircle2, XCircle, AlertTriangle, Clock, Database, Table } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Monitor } from '../App';

interface MonitorCardProps {
  monitor: Monitor;
  onClick: () => void;
}

export function MonitorCard({ monitor, onClick }: MonitorCardProps) {
  const getStatusIcon = () => {
    if (monitor.status === 'inactive') {
      return <Clock className="w-4 h-4" />;
    }
    if (monitor.passRate === 100) {
      return <CheckCircle2 className="w-4 h-4" />;
    }
    if (monitor.passRate >= 80) {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <XCircle className="w-4 h-4" />;
  };

  const getStatusColor = () => {
    if (monitor.status === 'inactive') return 'bg-gray-100 text-gray-600 border-gray-200';
    if (monitor.passRate === 100) return 'bg-green-100 text-green-700 border-green-200';
    if (monitor.passRate >= 80) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const passingChecks = monitor.checks.filter(c => c.status === 'passing').length;
  const totalChecks = monitor.checks.length;

  return (
    <Card 
      className="p-5 hover:shadow-md transition-all cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{monitor.name}</h3>
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
        <Badge className={`${getStatusColor()} border`}>
          <span className="flex items-center gap-1">
            {getStatusIcon()}
            {monitor.status === 'inactive' ? 'Inactive' : `${monitor.passRate}%`}
          </span>
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>Quality Checks</span>
            <span>{passingChecks} / {totalChecks} passing</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                monitor.passRate === 100 ? 'bg-green-500' :
                monitor.passRate >= 80 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${(passingChecks / totalChecks) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-gray-500">Last run: {monitor.lastRun}</span>
          <span className="text-blue-600 hover:text-blue-700">View details →</span>
        </div>
      </div>
    </Card>
  );
}
